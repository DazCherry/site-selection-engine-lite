import {validSubmission} from '../dist/interest-schema.mjs';
const headers={'Cache-Control':'no-store','Content-Type':'application/json','X-Content-Type-Options':'nosniff'};
const canonical=data=>JSON.stringify(Object.fromEntries(Object.entries(data).sort(([a],[b])=>a.localeCompare(b))));
const reply=(status,code)=>new Response(JSON.stringify({code}),{status,headers});
export function submissionHandler(storeFactory,{now=Date.now,onStored=()=>{},onPersistenceFailure=()=>{}}={}){return async req=>{
 if(req.method!=='POST')return reply(405,'method');
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply(403,'origin');
 if(req.headers.get('content-type')?.split(';')[0]!=='application/json')return reply(415,'type');
 if(Number(req.headers.get('content-length')??0)>2048)return reply(413,'size');
 let data;
 try{const reader=req.body?.getReader();if(!reader)return reply(400,'payload');let bytes=0,parts=[];while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.length;if(bytes>2048){await reader.cancel();return reply(413,'size');}parts.push(value);}const body=new Uint8Array(bytes);let offset=0;for(const p of parts){body.set(p,offset);offset+=p.length;}data=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(body));}catch{return reply(400,'payload');}
 if(!validSubmission(data))return reply(400,'schema');
 try{const store=storeFactory(),key=`${data.type}/${data.id}.json`,record={...data,receivedAt:new Date(now()).toISOString()};const result=await store.setJSON(key,record,{onlyIfNew:true});if(!result.modified){const existing=await store.get(key,{type:'json',consistency:'strong'});if(!existing)return reply(503,'unavailable');const {receivedAt,...original}=existing;if(canonical(original)!==canonical(data))return reply(409,'conflict');try{onStored(existing);}catch{}return reply(200,'duplicate');}try{onStored(record);}catch{}return reply(200,'received');}catch{try{onPersistenceFailure();}catch{}return reply(503,'unavailable');}
};}
export async function expireSubmissions(store,now=Date.now()){
 let removed=0;for await(const page of store.list({paginate:true})){for(const {key} of page.blobs){if(!/^(feedback|interest)\/[a-f0-9-]{36}\.json$/.test(key))continue;const data=await store.get(key,{type:'json',consistency:'strong'});if(data&&Date.parse(data.receivedAt)<=now-90*86400000){await store.delete(key);removed++;}}}return removed;
}
