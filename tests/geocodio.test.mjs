import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeGeocodio,geocodeGeocodio,geocodeHandler} from '../server/geocodio.mjs';
import {createProviders} from '../dist/providers.mjs';
const input='120 Example Avenue, Sample City, CA 90001';
const row=()=>({source:'Synthetic county address reference',address_components:{number:'120',formatted_street:'Example Ave',city:'Sample City',state_province:'CA',postal_code:'90001',country:'US'},location:{lat:34, lng:-118},accuracy:1,accuracy_type:'rooftop',match_type:'building_centroid'});
const batch=r=>new Response(JSON.stringify({results:[{response:{results:r}}]}));
const req=(data={address:input},extra={})=>new Request('https://example.test/api/geocode',{method:'POST',headers:{Origin:'https://example.test','Content-Type':'application/json'},body:JSON.stringify(data),...extra});
test('precision gate rejects high-score centroids, interpolation and nearby rooftops',()=>{
 for(const type of ['place','county','state','street_center','range_interpolation','point','nearest_rooftop_match','intersection']){const r=row();r.accuracy_type=type;assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);}
 assert.equal(normalizeGeocodio({results:[row()]},input)[0].precision,'Provider-reported building point');
});
test('exact number, street, state and city remain mandatory; malformed coordinates cannot pass',()=>{
 for(const [field,value] of [['number','122'],['formatted_street','Other Ave'],['city','Other City'],['state_province','TX'],['country','CA']]){const r=row();r.address_components[field]=value;assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);}
 for(const lat of [NaN,91,null,'34']){const r=row();r.location.lat=lat;assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);}
});
test('ZIP corrections are explicit and never override house or street; parcel precision is labeled',()=>{
 const r=row();r.address_components.postal_code='90002';r.match_type='parcel_centroid';const [c]=normalizeGeocodio({results:[r]},input);assert.equal(c.corrections.length,1);assert.match(c.label,/90002/);assert.equal(c.precision,'Provider-reported parcel point');
 r.address_components.number='122';assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);
});
test('deduplication, bounded candidates and malformed provider schema fail safely',()=>{
 assert.equal(normalizeGeocodio({results:[row(),row()]},input).length,1);
 assert.throws(()=>normalizeGeocodio({results:Array(51).fill(row())},input),/provider_schema/);
 for(const accuracy of [0.7,2,'1']){const r=row();r.accuracy=accuracy;assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);}
 const r=row();r.address_components.city='<script>';assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);
});
test('server request uses one POST batch, bearer header, no URL key/address or data appends',async()=>{
 let calls=0;const candidates=await geocodeGeocodio(input,{key:'test-only',fetchImpl:async(url,options)=>{calls++;assert.equal(url,'https://api.geocod.io/v2/geocode');assert.equal(options.method,'POST');assert.equal(options.redirect,'error');assert.equal(options.headers.Authorization,'Bearer test-only');assert.deepEqual(JSON.parse(options.body),[input]);return batch([row()]);}});assert.equal(calls,1);assert.equal(candidates.length,1);
});
test('upstream auth/rate/outage/invalid JSON/oversize errors do not expose query or secret',async()=>{
 for(const status of [401,403,429,500])await assert.rejects(geocodeGeocodio(input,{key:'test-only',fetchImpl:async()=>new Response('sensitive upstream error',{status})}),e=>!e.message.includes('sensitive')&&!e.message.includes(input));
 await assert.rejects(geocodeGeocodio(input,{key:'test-only',maxBytes:4,fetchImpl:async()=>batch([row()])}),/provider_schema/);
 await assert.rejects(geocodeGeocodio(input,{key:'test-only',fetchImpl:async()=>new Response('not json')}),/provider_unavailable/);
 await assert.rejects(geocodeGeocodio(input,{key:'test-only',timeoutMs:2,fetchImpl:(_,o)=>new Promise((_,reject)=>o.signal.addEventListener('abort',()=>reject(Error('private'))))}),/timeout/);
});
test('HTTP integration is disabled by default, rejects cross-origin and invalid payload before quota or egress',async()=>{
 assert.equal((await geocodeHandler()(req())).status,503);let calls=0,reserved=0;
 const h=geocodeHandler({enabled:true,key:'test-only',reserve:async()=>{reserved++;return true;},fetchImpl:async()=>{calls++;return batch([row()]);}});
 assert.equal((await h(req({}, {headers:{Origin:'https://evil.test','Content-Type':'application/json'}}))).status,403);
 assert.equal((await h(req({address:input,recipient:'unwanted'}))).status,400);
 assert.equal((await h(req({address:'x'.repeat(1500)}))).status,413);
 assert.equal(reserved,0);assert.equal(calls,0);const response=await h(req());assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');assert.equal((await response.json()).candidates.length,1);assert.equal(calls,1);
 assert.equal((await geocodeHandler({enabled:true,key:'test-only'})(req())).status,429);
});
test('normalized candidate coordinates hand off unchanged to existing context adapter',async()=>{
 const [candidate]=normalizeGeocodio({results:[row()]},input);let actual;
 const p=createProviders({clock:()=>Date.parse('2026-01-02'),contextImpl:async origin=>{actual=origin;return {sourceTime:'2026-01-01T00:00:00Z'};}});
 await p.context(candidate.origin);assert.deepEqual(actual,{lat:34,lon:-118});
});

test('building ranges accept only the exact first door, never infer a nearby number',()=>{
 const r=row();r.address_components.number='120-28';const c=normalizeGeocodio({results:[r]},input);assert.equal(c.length,1);assert.match(c[0].corrections[0],/range/);
 for(const number of ['118-28','121-29','120A-128','12-128']){r.address_components.number=number;assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);}
});
test('omitted suffix or direction is disclosed; conflicting directions and postal/locality changes are rejected',()=>{
 const r=row();r.address_components.formatted_street='Example Ave NW';assert.equal(normalizeGeocodio({results:[r]},input)[0].corrections.length,1);
 assert.deepEqual(normalizeGeocodio({results:[r]},input.replace('Avenue','Avenue SE')),[]);
 r.address_components.postal_code='90002';assert.deepEqual(normalizeGeocodio({results:[r]},input),[]);
 r.address_components.postal_code='90001';r.address_components.formatted_street='Example Ave';assert.equal(normalizeGeocodio({results:[r]},input.replace('Example Avenue','Example')).length,1);
 r.address_components.city='Saint Example';assert.equal(normalizeGeocodio({results:[r]},input.replace('Sample City','St. Example')).length,1);
});
