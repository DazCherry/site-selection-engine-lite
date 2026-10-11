// Operator-supplied public cases stay outside Git. Output contains case IDs, never queries/coordinates.
import {readFile} from 'node:fs/promises';
import {retrieveOverture} from '../dist/overture.mjs';
import {assessRecords} from '../dist/model.mjs';
const [input,base]=process.argv.slice(2);
if(!input||!base)throw Error('Usage: node scripts/regional-acceptance.mjs PRIVATE_CASES_JSON DEPLOYMENT_ORIGIN');
const url=new URL(base);if(url.protocol!=='https:'||!url.hostname.endsWith('.netlify.app'))throw Error('Use an HTTPS Netlify deployment origin.');
const cases=JSON.parse(await readFile(input,'utf8'));if(!Array.isArray(cases)||cases.length>30)throw Error('Expected at most 30 approved public cases.');
let failures=0,mapRequests=0,responseContentLengthBytes=0;
const trackingFetch=async(...args)=>{mapRequests++;const r=await fetch(...args);responseContentLengthBytes+=Number(r.headers.get('content-length'))||0;return r;};
for(const c of cases){
 if(!/^[a-z0-9-]{1,50}$/.test(c.id)||typeof c.address!=='string')throw Error('Invalid case.');
 const row={id:c.id},start=performance.now();let mapStart=0;mapRequests=0;responseContentLengthBytes=0;
 try{
  const response=await fetch(new URL('/api/geocode',url),{method:'POST',headers:{'Content-Type':'application/json',Origin:url.origin},body:JSON.stringify({address:c.address}),signal:AbortSignal.timeout(15000),redirect:'error'});
  row.http=response.status;if(!response.ok)throw Error('Geocoding HTTP failure');const result=await response.json();row.geocode=result.state;row.reason=result.reason;row.geocodeMs=Math.round(performance.now()-start);
  if(result.state==='candidate'){
   mapStart=performance.now();row.map='retrieving';const context=await retrieveOverture(result.candidates[0].origin,{fetchImpl:trackingFetch}),assessment=assessRecords(context.records,result.candidates[0].origin);
   row.map='complete';row.mapMs=Math.round(performance.now()-mapStart);row.release=context.release;row.resources=context.transport;row.score=assessment.score;row.dimensions=assessment.availableDimensions;
  }else row.map='not_requested';
  if(c.expectedState&&row.geocode!==c.expectedState)throw Error('Unexpected geocoding state');
  if(c.expectScore&&row.score===null)throw Error('Expected score withheld');
 }catch(e){row.error=e.message;if(mapStart){row.map='failed';row.mapMs=Math.round(performance.now()-mapStart);row.observedResponses={requests:mapRequests,declaredBytes:responseContentLengthBytes};}failures++;}
 row.elapsedMs=Math.round(performance.now()-start);console.log(JSON.stringify(row));
 if(/rate.limit|requested a pause/i.test(row.error||''))break;
}
if(failures)process.exitCode=1;
