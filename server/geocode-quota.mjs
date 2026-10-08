// One rolling counter; never store queries, coordinates, client IPs or identifiers.
export async function reserveGeocode(store,{now=Date.now(),limit=850}={}){
 if(!Number.isInteger(limit)||limit<1||limit>850)return false;
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 for(let attempt=0;attempt<5;attempt++){
  const prior=await store.getWithMetadata('current.json',{type:'json',consistency:'strong'});
  const count=prior?.data?.day===day?prior.data.count:0;
  if(!Number.isSafeInteger(count)||count<0||count>=limit)return false;
  const next={day,count:count+1};
  if((await store.setJSON('current.json',next,prior?{onlyIfMatch:prior.etag}:{onlyIfNew:true})).modified)return true;
 }
 return false;
}
