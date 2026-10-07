import test from 'node:test';import assert from 'node:assert/strict';
import {addressParts,candidateAgrees} from '../dist/address.mjs';
import {validateAddress,normalizePhoton,createProviders} from '../dist/providers.mjs';
const p={housenumber:'42',street:'North Example Avenue',city:'Fictional City',state:'California',postcode:'99999',country:'United States',countrycode:'US'};
const f=properties=>({type:'Feature',geometry:{type:'Point',coordinates:[-120,35]},properties});
test('ordinary US formatting, abbreviations and suite removal retain match constraints',()=>{
 for(const q of ['42 N Example Ave, Fictional City, CA 99999','42 North Example Avenue Fictional City CA 99999','42 N Example Ave Suite 3, Fictional City CA 99999','42 N Example Ave, Fictional City, California','42 N Example Ave Fictional City CA']){assert.ok(validateAddress(q));assert.ok(candidateAgrees(p,q),q);}
 assert.equal(addressParts('42 N Example Ave Suite 3, Fictional City CA 99999').query,'42 N Example Ave, Fictional City CA 99999');
});
test('Alaska and Hawaii are normal states; mismatching number, street, locality or ZIP is rejected',()=>{
 for(const state of ['AK','HI'])assert.ok(candidateAgrees({...p,state},`42 N Example Ave, Fictional City, ${state} 99999`));
 const q='42 N Example Ave, Fictional City, CA 99999';
 for(const changes of [{housenumber:'43'},{street:'South Example Avenue'},{street:'North Other Avenue'},{city:'Other City'},{state:'Nevada'},{postcode:'99998'},{countrycode:'CA'},{state:undefined},{housenumber:undefined}])assert.equal(candidateAgrees({...p,...changes},q),false,JSON.stringify(changes));
});
test('candidate filtering never substitutes an adjacent number or centroid; label includes state/ZIP',()=>{
 const raw={type:'FeatureCollection',features:[f({...p,housenumber:'43'}),f({city:p.city}),f(p),f(p)]};
 const result=normalizePhoton(raw,'42 N Example Ave, Fictional City, CA 99999');assert.equal(result.length,1);assert.match(result[0].label,/California, 99999/);
});
test('control characters are rejected before whitespace normalization and unit query does not mutate input',async()=>{
 for(const q of ['42 Example Ave\nFictional City CA','42 Example Ave\tFictional City CA','42 Example Ave\u0000, CA'])assert.throws(()=>validateAddress(q));
 let url;const provider=createProviders({fetchImpl:async u=>{url=new URL(u);return new Response(JSON.stringify({type:'FeatureCollection',features:[f(p)]}));}});
 assert.equal((await provider.geocode('42 N Example Ave Unit 3, Fictional City CA 99999')).length,1);assert.equal(url.searchParams.get('limit'),'10');assert.equal(url.searchParams.get('q').includes('Unit'),false);
});
test('an explicit foreign country cannot be silently replaced, and Suite Road is not a unit',()=>{assert.equal(candidateAgrees(p,'42 N Example Ave, Fictional City, Canada'),false);assert.equal(candidateAgrees(p,'42 N Example Ave, Fictional City, CA 99999, USA'),true);assert.equal(addressParts('42 Suite Road, Fictional City, CA').query,'42 Suite Road, Fictional City, CA');});
