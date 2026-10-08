import {coordinate} from './model.mjs';
import {validateAddress,ProviderError,fetchJSON} from './providers.mjs';
export async function serverGeocode(input,{fetchImpl=fetch}={}){
 const address=validateAddress(input);
 const raw=await fetchJSON('/api/geocode',{fetchImpl:async(url,options)=>fetchImpl(url,{...options,headers:{...options.headers,'Content-Type':'application/json'}}),method:'POST',body:JSON.stringify({address}),timeoutMs:15000,maxBytes:20000});
 if(!['candidate','uncertain','no_match'].includes(raw?.state)||!Array.isArray(raw?.candidates)||raw.candidates.length>5||(raw.state==='candidate')!==(raw.candidates.length>0))throw new ProviderError('Address service returned an invalid response. No location was selected.');
 const candidates=raw.candidates.map(c=>{
  const safe=s=>typeof s==='string'&&s.length<=400&&!/[<>\x00-\x1f\x7f]/.test(s);
  if(!safe(c.label)||c.source!=='Geocodio'||!safe(c.precision)||!Array.isArray(c.corrections)||c.corrections.length>3||!c.corrections.every(safe))throw new ProviderError('Address service returned an invalid candidate.');
  return {label:c.label,origin:coordinate(c.origin),source:c.source,precision:c.precision,corrections:c.corrections};
 });
 return {state:raw.state,candidates};
}
