export const MODEL_VERSION='lite-map-context-1.0.0';
export const RADIUS_M=600;
export const MAX_AGE_MS=7*24*60*60*1000;
const retailGroups={food:['supermarket','convenience','greengrocer','bakery','butcher','seafood','deli'],clothing:['clothes','shoes','fashion_accessories'],home:['furniture','houseware','interior_decoration','bed','kitchen'],electronics:['electronics','computer','mobile_phone'],personal:['chemist','cosmetics','hairdresser','beauty'],books:['books','stationery','newsagent'],leisure:['sports','bicycle','outdoor','toys','games','music'],hardware:['hardware','doityourself','garden_centre'],gifts:['gift','florist','jewelry'],pets:['pet','pet_grooming'],general:['department_store','variety_store','mall'],repair:['car_repair','laundry','dry_cleaning','tailor']};
const serviceGroups={pharmacy:['pharmacy'],banking:['bank','atm'],postal:['post_office'],library:['library'],toilets:['toilets']};
export class DataError extends Error {constructor(message){super(message);this.name='DataError';}}
export function coordinate(p){if(!p||typeof p.lat!=='number'||typeof p.lon!=='number'||!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||Math.abs(p.lat)>90||Math.abs(p.lon)>180)throw new DataError('Invalid geographic coordinates.');return {lat:p.lat,lon:p.lon};}
export function distanceMeters(a,b){coordinate(a);coordinate(b);const rad=Math.PI/180;const dlat=(b.lat-a.lat)*rad;const dlon=(b.lon-a.lon)*rad;const h=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlon/2)**2;return 6371008.8*2*Math.asin(Math.sqrt(Math.max(0,Math.min(1,h))));}
export function validTime(t){if(typeof t!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(t)||!Number.isFinite(Date.parse(t)))throw new DataError('Missing or invalid source timestamp.');if(new Date(t).toISOString().slice(0,19)!==t.slice(0,19))throw new DataError('Invalid calendar timestamp.');return Date.parse(t);}
function category(value,groups){return Object.keys(groups).find(k=>groups[k].includes(value))||null;}
export function normalizeOverpass(raw,origin,{now=Date.now()}={}){
 coordinate(origin);if(!Number.isFinite(now))throw new DataError('Invalid evaluation time.');
 if(!raw||raw.remark||!Array.isArray(raw.elements)||raw.elements.length>10000)throw new DataError('Incomplete or oversized map response.');
 const sourceTime=raw.osm3s?.timestamp_osm_base;const age=now-validTime(sourceTime);
 if(age>MAX_AGE_MS||age < -300000)throw new DataError('Map source is stale or has an invalid future timestamp.');
 const seen=new Map();const records=[];
 for(const item of raw.elements){
  if(!item||!['node','way','relation'].includes(item.type)||!Number.isSafeInteger(item.id)||item.id<=0||!item.tags||typeof item.tags!=='object'||Array.isArray(item.tags))throw new DataError('Malformed map record.');
  const p=coordinate(item.type==='node'?item:item.center);const t=item.tags;
  const excluded=['disused','abandoned','demolished','construction'].some(k=>t[k]==='yes')||['no','private'].includes(t.access);
  const retail=excluded?null:category(t.shop,retailGroups);const service=excluded?null:category(t.amenity,serviceGroups);
  const transit=!excluded&&(t.highway==='bus_stop'||['station','halt','tram_stop'].includes(t.railway)||t.public_transport==='platform');
  const id=`${item.type}/${item.id}`;const record={id,...p,retail,service,transit};const serial=JSON.stringify(record);
  if(seen.has(id)){if(seen.get(id)!==serial)throw new DataError('Conflicting duplicate map records.');continue;}
  seen.set(id,serial);
  if(distanceMeters(origin,p)<=RADIUS_M&&(retail||service||transit))records.push(record);
 }
 records.sort((a,b)=>a.id.localeCompare(b.id,'en'));
 return {sourceTime,records};
}
export function assessRecords(records,origin){
 coordinate(origin);if(!Array.isArray(records)||records.length>10000)throw new DataError('Invalid normalized records.');
 const seen=new Map(),retail=new Set(),services=new Set();let nearest=null;
 for(const r of records){
  if(!r||typeof r.id!=='string'||! /^(?:(?:node|way|relation)\/[1-9]\d*|overture\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/.test(r.id)||!(r.retail===null||Object.hasOwn(retailGroups,r.retail))||!(r.service===null||Object.hasOwn(serviceGroups,r.service))||typeof r.transit!=='boolean')throw new DataError('Invalid normalized record.');
  coordinate(r);const signature=JSON.stringify([r.lat,r.lon,r.retail,r.service,r.transit]);if(seen.has(r.id)){if(seen.get(r.id)!==signature)throw new DataError('Conflicting normalized records.');continue;}seen.set(r.id,signature);
  const distance=distanceMeters(origin,r);if(distance>RADIUS_M)continue;
  if(r.retail)retail.add(r.retail);if(r.service)services.add(r.service);if(r.transit)nearest=nearest===null?distance:Math.min(nearest,distance);
 }
 const dimensions=[
  {id:'retail',name:'Retail variety',score:retail.size?Math.min(10,retail.size*2):null,value:retail.size||null,unit:'categories',categories:[...retail].sort(),explanation:retail.size?`${retail.size} mapped shop categories within 600 m. Variety is not demand.`:'No usable mapped shop categories. Actual retail presence is unknown.'},
  {id:'services',name:'Everyday amenities',score:services.size?services.size*2:null,value:services.size||null,unit:'categories',categories:[...services].sort(),explanation:services.size?`${services.size} of 5 everyday service categories mapped within 600 m.`:'No usable mapped service categories. Actual service availability is unknown.'},
  {id:'transit',name:'Transit proximity',score:nearest===null?null:Math.max(0,10*(1-nearest/750)),value:nearest===null?null:Math.round(nearest),unit:'meters',explanation:nearest===null?'No qualifying mapped stop within 600 m. Actual transit availability is unknown.':`Nearest mapped stop is approximately ${Math.round(nearest)} m away in a straight line. Routes and service frequency are unknown.`}
 ];
 const available=dimensions.filter(d=>d.score!==null).length;const score=available===3?Math.round(dimensions.reduce((s,d)=>s+d.score,0)/3*10)/10:null;
 const rating=score===null?'Insufficient mapped context':score>=7.5?'Strong':score>=5?'Good':score>=2.5?'Moderate':'Weak';
 return {modelVersion:MODEL_VERSION,radiusMeters:RADIUS_M,score,rating,availableDimensions:available,dimensions};
}
export function assess(raw,origin,options){const {sourceTime,records}=normalizeOverpass(raw,origin,options);return {...assessRecords(records,origin),sourceTime,records};}
