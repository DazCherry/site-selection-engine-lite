import {validEvent,countKey} from '../dist/analytics-schema.mjs';
const headers={'Cache-Control':'no-store','Content-Type':'application/json','X-Content-Type-Options':'nosniff'};
const reply=(status,code)=>new Response(JSON.stringify({code}),{status,headers});
export async function recordEvent(store,event,now=Date.now()){
 const day=new Date(now).toISOString().slice(0,10),key=`daily/${day}.json`;
 for(let attempt=0;attempt<5;attempt++){
  const prior=await store.getWithMetadata(key,{type:'json',consistency:'strong'});
  const data=prior?.data??{schema:1,day,events:0,counts:{},ids:[]};
  if(data.ids.includes(event.id))return 'duplicate';
  if(data.events>=10000)return 'full';
  const counter=countKey(event),next={...data,events:data.events+1,counts:{...data.counts,[counter]:(data.counts[counter]??0)+1},ids:[...data.ids,event.id]};
  const result=await store.setJSON(key,next,prior?{onlyIfMatch:prior.etag}:{onlyIfNew:true});
  if(result.modified)return 'recorded';
 }
 return 'busy';
}
export function measurementHandler(storeFactory,{now=Date.now}={}){return async req=>{
 if(req.method!=='POST')return reply(405,'method');
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply(403,'origin');
 if(req.headers.get('content-type')?.split(';')[0]!=='application/json')return reply(415,'type');
 if(Number(req.headers.get('content-length')??0)>1024)return reply(413,'size');
 let event;
 try{const reader=req.body?.getReader();if(!reader)return reply(400,'payload');let bytes=0,parts=[];while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>1024){await reader.cancel();return reply(413,'size');}parts.push(value);}const body=new Uint8Array(bytes);let offset=0;for(const p of parts){body.set(p,offset);offset+=p.length;}event=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(body));}catch{return reply(400,'payload');}
 if(!validEvent(event))return reply(400,'schema');
 try{const result=await recordEvent(storeFactory(),event,now());return result==='recorded'||result==='duplicate'?reply(200,result):reply(429,'capacity');}catch{return reply(503,'unavailable');}
};}
export async function expireAggregates(store,now=Date.now()){
 const cutoff=new Date(now-30*86400000).toISOString().slice(0,10);let removed=0;
 for await(const page of store.list({prefix:'daily/',paginate:true})){
  for(const {key} of page.blobs){const match=/^daily\/(\d{4}-\d{2}-\d{2})\.json$/.exec(key);if(match&&match[1]<=cutoff){await store.delete(key);removed++;}}
 }
 return removed;
}
