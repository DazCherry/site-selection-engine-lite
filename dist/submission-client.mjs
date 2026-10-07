export function createSubmitter({send,uuid,timeoutMs=5000}){
 let active=false,previous='',id='';
 return async payload=>{
  if(active)return {ok:false,code:'busy'};
  const fingerprint=JSON.stringify(payload);if(fingerprint!==previous){try{id=uuid();previous=fingerprint;}catch{return {ok:false,code:'unavailable'};}}
  active=true;const controller=new AbortController();let timer;
  try{const response=await Promise.race([Promise.resolve().then(()=>send({...payload,id},controller.signal)),new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('timeout'));},timeoutMs);})]);return response&&['received','duplicate'].includes(response.code)?{ok:true,code:response.code}:{ok:false,code:'unavailable'};}catch{return {ok:false,code:'unavailable'};}finally{clearTimeout(timer);active=false;}
 };
}
