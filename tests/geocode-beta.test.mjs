import test from 'node:test';import assert from 'node:assert/strict';
import {geocodioDecision,geocodeHandler} from '../server/geocodio.mjs';
import {serverGeocode} from '../dist/geocode-client.mjs';
const input='120 Example Avenue, Sample City, CA 90001';
const row=()=>({source:'Synthetic county',address_components:{number:'120',formatted_street:'Example Ave',city:'Sample City',state_province:'CA',postal_code:'90001',country:'US'},location:{lat:34,lng:-118},accuracy:1,accuracy_type:'rooftop',match_type:'building_centroid'});
test('source-level containment withholds maximum-confidence points without address exceptions',()=>{
 for(const source of ['Connecticut Geospatial Information Systems Council','CONNECTICUT GEOSPATIAL INFORMATION SYSTEMS COUNCIL','City of Portland (Public Domain Dedication and License (PDDL) v1.0)',null,'']){
  const r=row();r.source=source;const result=geocodioDecision({results:[r]},input);assert.equal(result.state,'uncertain');assert.deepEqual(result.candidates,[]);assert.ok(!JSON.stringify(result).includes('34'));
 }
 const r=row();r.source='Connecticut Geospatial Information Systems Council';assert.equal(geocodioDecision({results:[row(),r]},input).state,'uncertain');
});
test('candidate, uncertain and no-match are distinct; failures remain errors',async()=>{
 assert.equal(geocodioDecision({results:[row()]},input).state,'candidate');
 const r=row();r.accuracy_type='range_interpolation';assert.equal(geocodioDecision({results:[r]},input).state,'uncertain');
 assert.equal(geocodioDecision({results:[]},input).state,'no_match');
 assert.throws(()=>geocodioDecision({results:null},input),/provider_schema/);
 for(const state of ['uncertain','no_match'])assert.deepEqual(await serverGeocode(input,{fetchImpl:async()=>new Response(JSON.stringify({state,candidates:[]}))}),{state,candidates:[]});
 await assert.rejects(serverGeocode(input,{fetchImpl:async()=>new Response(JSON.stringify({state:'uncertain',candidates:[row()]}))}));
});
test('HTTP boundary cannot leak a held source point into browser scoring',async()=>{
 const r=row();r.source='Connecticut Geospatial Information Systems Council';
 const handler=geocodeHandler({enabled:true,key:'synthetic',reserve:async()=>true,fetchImpl:async()=>new Response(JSON.stringify({results:[{response:{results:[r]}}]}))});
 const response=await handler(new Request('https://example.test/api/geocode',{method:'POST',headers:{origin:'https://example.test','content-type':'application/json'},body:JSON.stringify({address:input})}));
 assert.equal(response.status,200);assert.deepEqual(await response.json(),{state:'uncertain',reason:'source_review',candidates:[]});
});
