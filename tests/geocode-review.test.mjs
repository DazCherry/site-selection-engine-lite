import test from 'node:test';import assert from 'node:assert/strict';
import {reviewGeocodeResults} from '../scripts/geocode-review.mjs';
const rows=()=>Array.from({length:30},(_,i)=>({id:`synthetic-${i}`,candidates:[{accuracy:1,accuracy_type:'rooftop',match_type:'building_centroid'}]}));
const reviews=()=>rows().map(x=>({id:x.id,outcome:'accurate',candidateCount:1,evidence:['synthetic independent property reference']}));
test('high-confidence wrong-building finding blocks acceptance; metadata cannot self-certify',()=>{
 assert.equal(reviewGeocodeResults(rows(),[]).counts.unverified,30);
 const r=reviews();r[2].outcome='incorrect';const result=reviewGeocodeResults(rows(),r);assert.equal(result.locationGate,'FAIL');assert.equal(result.counts.incorrect,1);assert.equal(result.counts.accurate,29);
});
test('all offered candidates require evidence; unresolved and failures remain in denominator',()=>{
 const x=rows(),r=reviews();x[0].candidates.push({});x[1].candidates=[];x[2].status='provider_error';const result=reviewGeocodeResults(x,r);assert.deepEqual(result.counts,{accurate:27,incorrect:0,unresolved:1,provider_error:1,unverified:1});assert.equal(result.tested,30);
 assert.equal(reviewGeocodeResults(rows(),reviews()).locationGate,'REVIEW_REQUIRED');
 assert.throws(()=>reviewGeocodeResults(rows(),[...r,r[0]]),/invalid_reviews/);
});

import {reviewBetaGeocodeResults} from '../scripts/geocode-review.mjs';
test('Beta gate allows explicit withholding without treating it as accuracy or hiding known wrong inputs',()=>{
 const x=rows().map(r=>({...r,state:'candidate'})),r=reviews();x[0]={id:x[0].id,state:'uncertain',candidates:[]};r[0].knownWrong=true;x[1]={id:x[1].id,state:'no_match',candidates:[]};
 const result=reviewBetaGeocodeResults(x,r);assert.equal(result.locationGate,'PASS');assert.deepEqual(result.counts,{accurate:28,uncertain:1,no_match:1,incorrect:0,provider_error:0,unverified:0,known_wrong_withheld:1});
 x[0].candidates=[{}];assert.equal(reviewBetaGeocodeResults(x,r).locationGate,'FAIL');x[0].candidates=[];r[2].outcome='incorrect';assert.equal(reviewBetaGeocodeResults(x,r).locationGate,'FAIL');
 assert.equal(reviewBetaGeocodeResults(rows().slice(0,10).map(x=>({...x,state:'candidate'})),reviews().slice(0,10),{minimum:10}).counts.accurate,10);
});
