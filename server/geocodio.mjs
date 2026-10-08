// Server-only adapter. Deployment requires an enabled flag and quota reservation.
import {addressParts,candidateAgrees,words} from '../dist/address.mjs';
import {coordinate} from '../dist/model.mjs';
import {validateAddress} from '../dist/providers.mjs';

export class GeocodeFailure extends Error {
 constructor(code){super(code);this.name='GeocodeFailure';this.code=code;}
}
const text=x=>typeof x==='string'&&x.length<=200&&!/[<>\x00-\x1f\x7f]/.test(x)?x.trim():'';
export function normalizeGeocodio(raw,input){
 if(!raw||!Array.isArray(raw.results)||raw.results.length>50)throw new GeocodeFailure('provider_schema');
 const candidates=[],seen=new Set(),a=addressParts(input);
 for(const r of raw.results){
  const p=r?.address_components;
  // Match score measures textual agreement, not spatial precision.
  if(!p||r.accuracy_type!=='rooftop'||!Number.isFinite(r.accuracy)||r.accuracy<0.8||r.accuracy>1||p.country!=='US')continue;
  let origin;try{origin=coordinate({lat:r.location?.lat,lon:r.location?.lng});}catch{continue;}
  const props={housenumber:text(p.number),street:text(p.formatted_street),city:text(p.city),state:text(p.state_province),postcode:text(p.postal_code),country:'United States',countrycode:'US'};
  if(!props.street||!props.city||!props.state||!/^\d{5}(?:-\d{4})?$/.test(props.postcode))continue;
  const corrections=[];
  const comparison={...props,postcode:a.zip||props.postcode};
  // A building's address range can include its explicitly supplied first door.
  // Do not infer an arbitrary number inside the range or change street parity.
  if(/^\d+-\d+$/.test(props.housenumber)&&props.housenumber.split('-')[0]===a.house){
   comparison.housenumber=a.house;corrections.push('Provider identifies a building address range. Confirm this is your intended building.');
  }
  const city=s=>words(s).replace(/^st /,'saint ');
  if(city(props.city)===city(a.city))comparison.city=a.city;
  // Complete omitted suffix/direction only with an exact supplied ZIP and locality.
  // A conflicting supplied direction or suffix remains a rejection.
  if(a.zip===props.postcode.slice(0,5)&&city(props.city)===city(a.city)&&words(props.street)!==words(a.street)){
   const supplied=words(a.street),actual=words(props.street);
   const tail=actual.startsWith(supplied+' ')?actual.slice(supplied.length+1):'';
   const hasSuffix=/\b(st|ave|rd|blvd|dr|ln|ct|cir|pl|pkwy|hwy|ter|trl|way)\b/.test(supplied);
   if(/^(n|s|e|w|ne|nw|se|sw)$/.test(tail)&&! /\b(n|s|e|w|ne|nw|se|sw)$/.test(supplied) || !hasSuffix&&/^(st|ave|rd|blvd|dr|ln|ct|cir|pl|pkwy|hwy|ter|trl|way)( (n|s|e|w|ne|nw|se|sw))?$/.test(tail)){
    comparison.street=a.street;corrections.push('Provider completed the street suffix or direction. Check the full street name before confirming.');
   }
  }
  if(!candidateAgrees(comparison,input))continue;
  if(r.match_type!=null&&!['building_centroid','parcel_centroid','unit'].includes(r.match_type))continue;
  if(a.zip&&a.zip!==props.postcode.slice(0,5))corrections.push('Provider proposes a different ZIP code; verify the full address before confirming.');
  const label=[props.housenumber+' '+props.street,props.city,props.state,props.postcode,'United States'].join(', ');
  const key=label+'|'+origin.lat.toFixed(6)+'|'+origin.lon.toFixed(6);if(seen.has(key))continue;seen.add(key);
  const precision={building_centroid:'Provider-reported building point',parcel_centroid:'Provider-reported parcel point',unit:'Provider-reported unit point'}[r.match_type]??'Provider address-level point on the parcel; building placement not specified';
  candidates.push({label,origin,source:'Geocodio',precision,corrections});
 }
 return candidates.slice(0,5);
}
// Temporary source-level containment after an independently confirmed wrong-building
// association. No address, coordinate or business-specific exception is used.
export function geocodioDecision(raw,input){
 if(!raw||!Array.isArray(raw.results)||raw.results.length>50)throw new GeocodeFailure('provider_schema');
 const usable=raw.results.filter(r=>r&&typeof r==='object');
 const sourceIssue=usable.some(r=>typeof r.source!=='string'||!r.source.trim()||/connecticut geospatial information systems council|^city of portland \(public domain dedication and license/i.test(r.source));
 if(sourceIssue)return {state:'uncertain',reason:'source_review',candidates:[]};
 const candidates=normalizeGeocodio(raw,input);
 if(candidates.length)return {state:'candidate',reason:'confirmation_required',candidates};
 return {state:usable.length?'uncertain':'no_match',reason:usable.length?'precision_or_consistency':'no_candidate',candidates:[]};
}
export async function geocodeGeocodio(input,{key,fetchImpl=fetch,timeoutMs=10000,maxBytes=100000,decision=false}={}){
 const address=validateAddress(input);
 if(typeof key!=='string'||!key||/[\s\x00-\x1f]/.test(key))throw new GeocodeFailure('configuration');
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{
  // One-item batch keeps the address and credentials out of the URL. No data appends.
  const r=await fetchImpl('https://api.geocod.io/v2/geocode',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify([address]),signal:controller.signal,redirect:'error'});
  if(!r.ok)throw new GeocodeFailure(r.status===429?'rate_limit':r.status===401||r.status===403?'authorization':'provider_unavailable');
  if(Number(r.headers.get('content-length'))>maxBytes)throw new GeocodeFailure('provider_schema');
  const reader=r.body?.getReader();if(!reader)throw new GeocodeFailure('provider_schema');
  let size=0,body='';const decoder=new TextDecoder('utf-8',{fatal:true});
  while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();throw new GeocodeFailure('provider_schema');}body+=decoder.decode(value,{stream:true});}body+=decoder.decode();
  const batch=JSON.parse(body);if(!Array.isArray(batch?.results)||batch.results.length!==1)throw new GeocodeFailure('provider_schema');
  return decision?geocodioDecision(batch.results[0]?.response,address):normalizeGeocodio(batch.results[0]?.response,address);
 }catch(e){if(e instanceof GeocodeFailure)throw e;throw new GeocodeFailure(controller.signal.aborted?'timeout':'provider_unavailable');}finally{clearTimeout(timer);}
}
export function geocodeHandler({enabled=false,key,reserve=async()=>false,fetchImpl}={}){return async req=>{
 const reply=(status,data)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
 if(!enabled)return reply(503,{code:'disabled'});
 if(req.method!=='POST')return reply(405,{code:'method'});
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply(403,{code:'origin'});
 if(req.headers.get('content-type')?.split(';')[0]!=='application/json')return reply(415,{code:'type'});
 let data;try{
  if(Number(req.headers.get('content-length'))>1024)return reply(413,{code:'size'});
  const reader=req.body?.getReader();if(!reader)return reply(400,{code:'input'});let bytes=0,body='';const decoder=new TextDecoder('utf-8',{fatal:true});
  while(true){const {value,done}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>1024){await reader.cancel();return reply(413,{code:'size'});}body+=decoder.decode(value,{stream:true});}body+=decoder.decode();
  data=JSON.parse(body);if(!data||Object.keys(data).length!==1||!Object.hasOwn(data,'address'))throw Error();validateAddress(data.address);
 }catch{return reply(400,{code:'input'});}
 try{if(!await reserve())return reply(429,{code:'quota'});return reply(200,await geocodeGeocodio(data.address,{key,fetchImpl,decision:true}));}
 catch(e){return reply(e.code==='rate_limit'?429:503,{code:e instanceof GeocodeFailure?e.code:'unavailable'});}
};}
