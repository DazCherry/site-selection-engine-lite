import {coordinate,DataError,normalizeOverpass,validTime,MAX_AGE_MS} from './model.mjs';
export const ENDPOINTS=Object.freeze({geocode:'https://photon.komoot.io/api/',context:'https://overpass.private.coffee/api/interpreter'});
export class ProviderError extends Error{constructor(message,retryAfterMs=0){super(message);this.name='ProviderError';this.retryAfterMs=retryAfterMs;}}
export function validateAddress(value){if(typeof value!=='string')throw new DataError('Enter a street number, street, city, and country.');const text=value.normalize('NFKC').trim().replace(/\s+/g,' ');if(text.length<8||text.length>200||!/[0-9]/.test(text)||!/[\p{L}]/u.test(text)||!text.includes(',')||/[<>\x00-\x1f\x7f]/.test(text)||/https?:\/\//i.test(text))throw new DataError('Enter a street number and street, followed by city and country, separated by commas.');return text;}
function clean(value){return typeof value==='string'?value.trim().slice(0,200):'';}
export function normalizePhoton(raw){
 if(!raw||raw.type!=='FeatureCollection'||!Array.isArray(raw.features)||raw.features.length>20)throw new ProviderError('The geocoder returned an invalid response.');
 const result=[],seen=new Set();
 for(const f of raw.features){
  const p=f?.properties,c=f?.geometry?.coordinates;
  if(f?.geometry?.type!=='Point'||!Array.isArray(c)||c.length<2||!p)continue;
  let origin;try{origin=coordinate({lat:c[1],lon:c[0]});}catch{continue;}
  const house=clean(p.housenumber),street=clean(p.street),city=clean(p.city)||clean(p.district),country=clean(p.country);
  if(!house||!street||!city||!country)continue;
  const label=[house+' '+street,city,country].join(', ');
  const key=[label.toLowerCase().replace(/[^\p{L}\p{N}]/gu,''),origin.lat.toFixed(4),origin.lon.toFixed(4)].join('|');
  if(seen.has(key))continue;seen.add(key);result.push({label,origin,source:'Photon / OpenStreetMap',precision:'Address point or building center; confirm before assessment.'});
 }
 return result.slice(0,5);
}
export function overpassQuery(origin){const {lat,lon}=coordinate(origin);return `[out:json][timeout:20][maxsize:8388608];(nwr(around:600,${lat},${lon})[shop];nwr(around:600,${lat},${lon})[amenity~"^(pharmacy|bank|atm|post_office|library|toilets)$"];nwr(around:600,${lat},${lon})[highway=bus_stop];nwr(around:600,${lat},${lon})[railway~"^(station|halt|tram_stop)$"];nwr(around:600,${lat},${lon})[public_transport=platform];);out center 10001;`;}
export async function fetchJSON(url,{fetchImpl=fetch,timeoutMs=25000,maxBytes=1500000,method='GET',body}={}){
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{
  const response=await fetchImpl(url,{method,body,signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer',headers:{Accept:'application/json'}});
  if(!response.ok)throw new ProviderError(response.status===429?'The public provider is rate-limiting requests. Wait at least a minute before trying again.':'The public provider is unavailable. Try again later; no score has been invented.',response.status===429?Math.max(60000,Math.min(86400000,(Number(response.headers.get('retry-after'))||60)*1000)):0);
  if(Number(response.headers.get('content-length'))>maxBytes)throw new ProviderError('Provider response is too large. Assessment withheld.');
  const reader=response.body?.getReader();if(!reader)throw new ProviderError('Empty provider response.');
  let size=0,text='';const decoder=new TextDecoder();
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();throw new ProviderError('Provider response is too large. Assessment withheld.');}text+=decoder.decode(value,{stream:true});}
  text+=decoder.decode();try{return JSON.parse(text);}catch{throw new ProviderError('Provider returned unreadable data. Assessment withheld.');}
 }catch(error){if(error instanceof ProviderError)throw error;throw new ProviderError(controller.signal.aborted?'The public provider timed out. Try again later.':'Network request failed. Check your connection or try a synthetic example.');}finally{clearTimeout(timer);}
}
export function createProviders({fetchImpl=fetch,clock=()=>Date.now(),cooldownMs=5000}={}){
 const cache=new Map();let busy=false;const lastRequest=new Map(),blockedUntil=new Map();
 async function request(key,work){const now=clock();const cached=cache.get(key);if(cached&&now-cached.time<300000)return structuredClone(cached.value);if(busy)throw new ProviderError('A public request is already running.');const provider=key.split(':')[0];if(now<(blockedUntil.get(provider)||0))throw new ProviderError('The provider requested a pause. Please try again later.');if(now-(lastRequest.get(provider)??-Infinity)<cooldownMs)throw new ProviderError('Please wait a few seconds between public requests.');busy=true;lastRequest.set(provider,now);try{const value=await work();cache.set(key,{time:clock(),value:structuredClone(value)});if(cache.size>20)cache.delete(cache.keys().next().value);return value;}catch(error){if(error.retryAfterMs)blockedUntil.set(provider,clock()+error.retryAfterMs);throw error;}finally{busy=false;}}
 return {
  async geocode(address){const query=validateAddress(address);return request('address:'+query.toLowerCase(),async()=>{const u=new URL(ENDPOINTS.geocode);u.searchParams.set('q',query);u.searchParams.set('limit','5');return normalizePhoton(await fetchJSON(u.toString(),{fetchImpl}));});},
  async context(origin){coordinate(origin);const context=await request('context:'+origin.lat+','+origin.lon,async()=>{const fetchedAt=new Date(clock()).toISOString();const raw=await fetchJSON(ENDPOINTS.context,{fetchImpl,method:'POST',body:new URLSearchParams({data:overpassQuery(origin)})});const normalized=normalizeOverpass(raw,origin,{now:clock()});return {...normalized,fetchedAt,provider:ENDPOINTS.context,license:'https://opendatacommons.org/licenses/odbl/1-0/'};});const age=clock()-validTime(context.sourceTime);if(age>MAX_AGE_MS||age < -300000)throw new DataError('Cached map source is stale or has an invalid future timestamp.');return context;}
 };
}
