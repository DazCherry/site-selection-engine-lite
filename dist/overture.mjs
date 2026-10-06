import {PMTiles,ResolvedValueCache,VectorTile,PbfReader} from './vendor/tiles.mjs';
import {coordinate,distanceMeters,RADIUS_M,DataError,validTime} from './model.mjs';

export const CATALOG='https://stac.overturemaps.org/catalog.json';
export const TILE_ROOT='https://overturemaps-extras-us-west-2.s3.us-west-2.amazonaws.com/tiles/';
export const RELEASE_MAX_AGE_MS=45*86400000;
const RANGE_LIMIT=4*1024*1024, TOTAL_LIMIT=32*1024*1024, DECOMPRESSED_LIMIT=32*1024*1024;
const fail=message=>new DataError(message);

export function validateRelease(raw,now=Date.now()){
 const release=raw?.latest;
 if(typeof release!=='string'||release.length>30||!/^\d{4}-\d{2}-\d{2}\.\d+$/.test(release))throw fail('Unrecognized public data release. Assessment withheld.');
 const sourceTime=release.slice(0,10)+'T00:00:00Z',age=now-validTime(sourceTime);
 if(!Number.isFinite(now)||age<0||age>RELEASE_MAX_AGE_MS)throw fail('Public data release is stale or has an invalid future date.');
 return {release,sourceTime};
}

// The full spherical bounding box includes every point inside the assessment circle.
export function coveringTiles(origin,z){
 coordinate(origin);if(Math.abs(origin.lat)>84||![13,14].includes(z))throw fail('This location is outside supported map-tile coverage.');
 const rad=Math.PI/180,delta=RADIUS_M/6371008.8,dlat=delta/rad,dlon=Math.asin(Math.sin(delta)/Math.cos(origin.lat*rad))/rad,n=2**z;
 const tx=lon=>Math.floor((lon+180)/360*n),ty=lat=>Math.floor((1-Math.asinh(Math.tan(lat*rad))/Math.PI)/2*n);
 const result=[];for(let x=tx(origin.lon-dlon);x<=tx(origin.lon+dlon);x++)for(let y=ty(origin.lat+dlat);y<=ty(origin.lat-dlat);y++)result.push({z,x:(x%n+n)%n,y});
 if(result.length>32)throw fail('Assessment area exceeds the bounded tile budget.');return result;
}
export async function readBounded(stream,limit){
 if(!stream?.getReader)throw fail('Empty public data response.');const reader=stream.getReader(),chunks=[];let length=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>limit)throw fail('Public data exceeds the safety limit. Assessment withheld.');chunks.push(value);}}catch(e){await reader.cancel().catch(()=>{});throw e;}
 const out=new Uint8Array(length);let offset=0;for(const chunk of chunks){out.set(chunk,offset);offset+=chunk.byteLength;}return out.buffer;
}
export async function boundedDecompress(buffer,compression){
 if(buffer.byteLength>RANGE_LIMIT)throw fail('Compressed public data exceeds the safety limit.');
 if(compression===1)return buffer;if(compression!==2)throw fail('Unsupported public data compression.');
 return readBounded(new Blob([buffer]).stream().pipeThrough(new DecompressionStream('gzip')),DECOMPRESSED_LIMIT);
}
const delay=(ms,signal)=>new Promise((resolve,reject)=>{if(signal.aborted)return reject(fail('Public data request cancelled.'));const onAbort=()=>{clearTimeout(timer);reject(fail('Public data request cancelled.'));};const timer=setTimeout(()=>{signal.removeEventListener('abort',onAbort);resolve();},ms);signal.addEventListener('abort',onAbort,{once:true});});

// A single assessment owns the network budget and deadline. No global/browser cache of raw places.
export function createTileTransport({fetchImpl=fetch,signal=new AbortController().signal,sleep=delay}={}){
 let bytes=0,requests=0,retries=0;
 async function request(url,headers={},limit=RANGE_LIMIT){
  for(let attempt=0;attempt<2;attempt++){
   if(signal.aborted)throw fail('Public data request timed out or was cancelled.');if(++requests>100)throw fail('Public data request budget exceeded.');
   const timeout=AbortSignal.timeout(10000),combined=AbortSignal.any([signal,timeout]);let response;
   try{response=await fetchImpl(url,{headers,signal:combined,credentials:'omit',referrerPolicy:'no-referrer',redirect:'error'});}catch{
    if(attempt===0&&!signal.aborted&&retries<2){retries++;await sleep(700,signal);continue;}throw fail('Public data network request failed or timed out. No score was created.');
   }
   if(response.status===429){await response.body?.cancel();const error=fail('Public data is rate-limited. Please wait before retrying.');const value=response.headers.get('retry-after');const seconds=Number(value);error.retryAfterMs=Math.max(60000,Math.min(86400000,Number.isFinite(seconds)&&seconds>0?seconds*1000:(Date.parse(value)-Date.now())||60000));throw error;}
   if([502,503,504].includes(response.status)&&attempt===0&&retries<2){await response.body?.cancel();retries++;await sleep(700,signal);continue;}
   if(!response.ok){await response.body?.cancel();throw fail('Public data is unavailable. No score was created.');}
   if(Number(response.headers.get('content-length'))>limit){await response.body?.cancel();throw fail('Public data exceeds the safety limit.');}
   const data=await readBounded(response.body,limit);bytes+=data.byteLength;if(bytes>TOTAL_LIMIT)throw fail('Public data download budget exceeded.');return {response,data};
  }
 }
 return {request,source(url){let archiveEtag=null;return {getKey:()=>url,async getBytes(offset,length,unusedSignal,expectedEtag){
  if(!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(length)||length<=0||length>RANGE_LIMIT)throw fail('Invalid map archive range.');
  const {response,data}=await request(url,{Range:`bytes=${offset}-${offset+length-1}`},length);
  const range=response.headers.get('content-range'),match=/^bytes (\d+)-(\d+)\/(\d+)$/.exec(range||'');
  if(response.status!==206||!match||Number(match[1])!==offset||Number(match[2])!==offset+length-1||Number(match[3])<=Number(match[2])||data.byteLength!==length)throw fail('Map archive returned an incomplete or incorrect byte range.');
  const etag=response.headers.get('etag');if(!etag||(archiveEtag&&etag!==archiveEtag)||(expectedEtag&&etag!==expectedEtag))throw fail('Map archive changed during retrieval. Please retry.');archiveEtag=etag;return {data,etag};
 }};},stats:()=>({bytes,requests,retries})};
}
const retailGroups={food:['grocery_store','convenience_store','specialty_foods_store','butcher_shop','bakery'],clothing:['clothing_store','shoe_store','fashion_accessories_store'],home:['furniture_store','home_goods_store','home_decor_store','bedding_and_bath_store'],electronics:['electronics_store','mobile_phone_store'],personal:['beauty_supply_store','cosmetics_and_fragrance_store','hair_salon','beauty_salon'],books:['bookstore','stationery_store','newsstand'],leisure:['sporting_goods_store','bike_store','toy_store','musical_instrument_store'],hardware:['hardware_store','home_improvement_store','nursery_and_gardening_store'],gifts:['flowers_and_gifts_store','florist','gift_shop','jewelry_store'],pets:['pet_store','pet_grooming'],general:['department_store','variety_store','shopping_mall'],repair:['auto_repair','laundry_service','tailor']};
const serviceGroups={pharmacy:['pharmacy','drugstore'],banking:['bank','bank_or_credit_union','atm'],postal:['post_office'],library:['library'],toilets:['public_toilet','public_restroom']};
const matchGroup=(hierarchy,groups)=>Object.keys(groups).find(key=>groups[key].some(value=>hierarchy.includes(value)))||null;
function objectJSON(value){if(typeof value!=='string'||value.length>100000)throw fail('Invalid public category metadata.');try{const v=JSON.parse(value);if(!v||typeof v!=='object'||Array.isArray(v))throw 0;return v;}catch{throw fail('Invalid public category metadata.');}}
export function normalizeTileFeature(feature,layer,origin){
 const props=feature?.properties,geometry=feature?.geometry;if(!props||!geometry)throw fail('Malformed public map feature.');
 if(!['place','infrastructure'].includes(layer))return null;
 // Line and polygon clips cannot provide a trustworthy destination point; never invent one.
 if(geometry.type!=='Point')return null;
 const p=coordinate({lon:geometry.coordinates?.[0],lat:geometry.coordinates?.[1]});if(distanceMeters(origin,p)>RADIUS_M)return null;
 if(typeof props.id!=='string'||! /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(props.id))throw fail('Invalid public place identifier.');
 let retail=null,service=null,transit=false;
 if(layer==='place'){
  if(['permanently_closed','temporarily_closed','closed'].includes(props.operating_status))return null;
  if(props.taxonomy===undefined||props.taxonomy===null)return null;
  const taxonomy=objectJSON(props.taxonomy);const hierarchy=taxonomy.hierarchy;
  if(typeof taxonomy.primary!=='string'||!Array.isArray(hierarchy)||hierarchy.length>16||!hierarchy.every(s=>typeof s==='string'&&s.length<=100)||hierarchy.at(-1)!==taxonomy.primary)throw fail('Unsupported public category schema.');
  retail=matchGroup(hierarchy,retailGroups);service=matchGroup(hierarchy,serviceGroups);
  transit=['bus_station','train_station','subway_station','tram_station'].includes(taxonomy.primary);
 }else{
  const tags=props.source_tags?objectJSON(props.source_tags):{};
  if(['no','private'].includes(tags.access)||['disused','abandoned','demolished','construction'].some(k=>tags[k]==='yes'))return null;
  transit=props.subtype==='transit'&&['bus_stop','railway_station','subway_station','tram_stop','platform'].includes(props.class);
  service=props.subtype==='pedestrian'?(props.class==='toilets'?'toilets':props.class==='atm'?'banking':null):null;
 }
 return retail||service||transit?{id:`overture/${props.id}`,...p,retail,service,transit}:null;
}
export async function retrieveOverture(origin,{fetchImpl=fetch,now=Date.now(),signal:outerSignal,onProgress=()=>{}}={}){
 coordinate(origin);const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000);const signal=outerSignal?AbortSignal.any([controller.signal,outerSignal]):controller.signal;
 const transport=createTileTransport({fetchImpl,signal});
 try{
  onProgress('Finding the latest public map release…');
  const {data}=await transport.request(CATALOG,{},65536);let catalog;try{catalog=JSON.parse(new TextDecoder().decode(data));}catch{throw fail('Invalid public release catalog.');}
  const {release,sourceTime}=validateRelease(catalog,now),records=new Map();let featureCount=0,decompressedBytes=0;
  for(const [theme,layer,z] of [['places','place',14],['base','infrastructure',13]]){
   onProgress(theme==='places'?'Reading nearby retail and amenities…':'Reading nearby transit and public amenities…');
   const source=transport.source(`${TILE_ROOT}${release}/${theme}.pmtiles`),cache=new ResolvedValueCache(32,false,boundedDecompress),archive=new PMTiles(source,cache,boundedDecompress);
   const header=await archive.getHeader();if(header.tileType!==1||header.maxZoom!==z||header.specVersion!==3)throw fail('Unsupported map archive schema.');
   const metadata=await archive.getMetadata();if(!Array.isArray(metadata?.vector_layers)||!metadata.vector_layers.some(l=>l.id===layer&&l.maxzoom===z))throw fail('Unsupported map layer schema.');
   for(const tile of coveringTiles(origin,z)){
    if(signal.aborted)throw fail('Public data retrieval timed out. No score was created.');
    const content=await archive.getZxy(tile.z,tile.x,tile.y,signal);if(!content)continue;
    decompressedBytes+=content.data.byteLength;if(decompressedBytes>96*1024*1024)throw fail('Public decompression budget exceeded.');
    const parsed=new VectorTile(new PbfReader(new Uint8Array(content.data))),features=parsed.layers[layer];if(!features)continue;
    featureCount+=features.length;if(featureCount>100000)throw fail('Public feature budget exceeded. Assessment withheld.');
    for(let i=0;i<features.length;i++){
     const f=features.feature(i);if(f.type!==1)continue;
     const r=normalizeTileFeature(f.toGeoJSON(tile.x,tile.y,tile.z),layer,origin);if(!r)continue;
     const previous=records.get(r.id);if(previous&&JSON.stringify(previous)!==JSON.stringify(r))throw fail('Contradictory public map records. Assessment withheld.');records.set(r.id,r);
     if(records.size>10000)throw fail('Too many public map records.');
    }
   }
  }
  return {sourceTime,release,fetchedAt:new Date(now).toISOString(),records:[...records.values()].sort((a,b)=>a.id.localeCompare(b.id,'en')),provider:'Overture Maps Places and Base',license:'https://docs.overturemaps.org/attribution/',transport:transport.stats()};
 }catch(e){if(e instanceof DataError)throw e;throw fail('Public map data could not be validated. No score was created.');}finally{clearTimeout(timer);}
}
