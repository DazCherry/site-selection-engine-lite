// Private, owner-authorized live evaluation. No production activation.
import {readFile,writeFile,realpath} from 'node:fs/promises';
import {resolve,dirname,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {geocodeGeocodio} from '../server/geocodio.mjs';
const root=await realpath(resolve(dirname(fileURLToPath(import.meta.url)),'..'));
const outside=async p=>{const path=resolve(p),parent=await realpath(dirname(path));const rel=relative(root,parent);if(!(rel==='..'||rel.startsWith('../')))throw Error('private_path_required');return path;};
try{
 if(process.argv.length!==4||!process.env.GEOCODIO_API_KEY)throw Error('authorized_key_and_private_paths_required');
 const input=await outside(process.argv[2]),output=await outside(process.argv[3]);
 const samples=JSON.parse(await readFile(input,'utf8'));
 if(!Array.isArray(samples)||samples.length<30||samples.length>60||new Set(samples.map(x=>x.id)).size!==samples.length||new Set(samples.map(x=>x.state)).size<8||new Set(samples.map(x=>x.format)).size<3||samples.some(x=>!x.id||!x.address||!x.state||!x.format||!/^https:\/\//.test(x.source)||x.addressVerified!==true))throw Error('verified_diverse_sample_required');
 const rows=[];for(const sample of samples){const start=performance.now();try{
  const decision=await geocodeGeocodio(sample.address,{key:process.env.GEOCODIO_API_KEY,decision:true});
  const {candidates,state}=decision;
  rows.push({...sample,status:state,state,candidates,elapsedMs:Math.round(performance.now()-start)});
 }catch(e){rows.push({...sample,status:'provider_error',code:e.code??'input',elapsedMs:Math.round(performance.now()-start)});}}
 await writeFile(output,JSON.stringify({at:new Date().toISOString(),note:'Candidate precision is not independent verification. Review location against original authoritative evidence; retain inaccurate and unresolved outcomes in denominator.',rows},null,2),{flag:'wx',mode:0o600});
 const counts={};for(const r of rows)counts[r.status]=(counts[r.status]??0)+1;console.log(JSON.stringify({tested:rows.length,counts}));
}catch{console.error('Acceptance not complete. Check approved key, verified sample and private paths. No address, key or provider payload logged.');process.exitCode=1;}
