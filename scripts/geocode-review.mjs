// Offline acceptance gate. Provider metadata never certifies a location.
export function reviewGeocodeResults(rows,reviews){
 if(!Array.isArray(rows)||rows.length<30||new Set(rows.map(x=>x.id)).size!==rows.length)throw Error('invalid_sample');
 if(!Array.isArray(reviews)||new Set(reviews.map(x=>x.id)).size!==reviews.length||reviews.some(x=>!rows.some(r=>r.id===x.id)))throw Error('invalid_reviews');
 const counts={accurate:0,incorrect:0,unresolved:0,provider_error:0,unverified:0};
 for(const row of rows){
  if(row.status==='provider_error'){counts.provider_error++;continue;}
  if(!row.candidates?.length){counts.unresolved++;continue;}
  const review=reviews.find(x=>x.id===row.id);
  if(!review||!['accurate','incorrect'].includes(review.outcome)||!review.evidence?.length){counts.unverified++;continue;}
  // Every candidate offered to a visitor needs review, not just the top result.
  if(review.candidateCount!==row.candidates.length){counts.unverified++;continue;}
  counts[review.outcome]++;
 }
 return {tested:rows.length,counts,locationGate:counts.incorrect||counts.unverified||counts.provider_error?'FAIL':'REVIEW_REQUIRED',
  note:'No automatic release PASS: coverage, original incident, licensing, staging and production gates remain separate.'};
}

// Beta coverage may be bounded; every emitted candidate still needs independent evidence.
export function reviewBetaGeocodeResults(rows,reviews,{minimum=30}={}){
 if(!Array.isArray(rows)||rows.length<minimum||new Set(rows.map(x=>x.id)).size!==rows.length)throw Error('invalid_sample');
 if(!Array.isArray(reviews)||new Set(reviews.map(x=>x.id)).size!==reviews.length||reviews.some(x=>!rows.some(r=>r.id===x.id)))throw Error('invalid_reviews');
 const counts={accurate:0,uncertain:0,no_match:0,incorrect:0,provider_error:0,unverified:0,known_wrong_withheld:0};
 for(const row of rows){
  const state=row.state??row.status,review=reviews.find(x=>x.id===row.id);
  if(state==='provider_error'){counts.provider_error++;continue;}
  if(['uncertain','no_match'].includes(state)&&Array.isArray(row.candidates)&&row.candidates.length===0){counts[state]++;if(review?.knownWrong===true&&review.evidence?.length)counts.known_wrong_withheld++;continue;}
  if(state!=='candidate'||!row.candidates?.length||!review||!['accurate','incorrect'].includes(review.outcome)||!review.evidence?.length||review.candidateCount!==row.candidates.length){counts.unverified++;continue;}
  counts[review.outcome]++;
 }
 return {tested:rows.length,counts,locationGate:counts.incorrect||counts.unverified||counts.provider_error?'FAIL':'PASS',note:'Location sample only. Withheld is not accurate; production, incident and other release gates remain separate.'};
}
