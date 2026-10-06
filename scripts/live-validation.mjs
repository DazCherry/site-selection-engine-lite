// Opt-in, serialized network acceptance check using public civic addresses only.
// Run with --live; results are not automatically checked in or used as fixtures.
import {createProviders} from '../dist/providers.mjs';
import {assessRecords} from '../dist/model.mjs';
import {writeFile} from 'node:fs/promises';
if(!process.argv.includes('--live'))throw new Error('Explicit --live is required to contact public providers.');
const cases=[
 ['San Francisco','1 Dr Carlton B Goodlett Place, San Francisco, USA'],
 ['Chicago','121 North LaSalle Street, Chicago, USA'],
 ['Seattle','600 4th Avenue, Seattle, USA'],
 ['Boston','1 City Hall Square, Boston, USA'],
 ['Honolulu','530 South King Street, Honolulu, USA'],
 ['Anchorage','632 West 6th Avenue, Anchorage, USA'],
 ['Burlington','149 Church Street, Burlington, Vermont, USA']
];
const results=[];
for(const [city,address] of cases){
 const start=Date.now();const p=createProviders();
 try{
  const locations=await p.geocode(address),location=locations.find(l=>l.label.includes(city));
  if(!location)throw Error('No matching address-level candidate; manual review required.');
  const context=await p.context(location.origin),assessment=assessRecords(context.records,location.origin);
  const snapshot={schemaVersion:1,kind:'public',label:location.label,origin:location.origin,...context,modelVersion:assessment.modelVersion,normalizationVersion:'overture-lite-1',assessment};
  const result={city,label:location.label,origin:location.origin,score:assessment.score,availableDimensions:assessment.availableDimensions,release:context.release,records:context.records.length,seconds:(Date.now()-start)/1000,transport:context.transport};results.push(result);console.log(JSON.stringify(result));
  const directory=process.env.LIVE_SNAPSHOT_DIR;if(directory)await writeFile(`${directory}/${city.toLowerCase().replaceAll(' ','-')}.json`,JSON.stringify(snapshot));
 }catch(e){results.push({city,error:e.message,seconds:(Date.now()-start)/1000});console.log(JSON.stringify(results.at(-1)));}
 await new Promise(r=>setTimeout(r,5500));
}
if(results.some(r=>r.error||r.score===null))process.exitCode=1;
