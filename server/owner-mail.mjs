import {createHash,randomUUID} from 'node:crypto';
import {validSubmission} from '../dist/interest-schema.mjs';
const DAY=86400000,WINDOW=23*3600000;
const hash=s=>createHash('sha256').update(s).digest('hex');
const email=s=>typeof s==='string'&&/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/.test(s)&&s.length<=254;
export function mailConfig(env,context){
 if(context!=='production'||env.SITEBUDDY_MAIL_ENABLED!=='1')return null;
 const since=Date.parse(env.SITEBUDDY_MAIL_ENABLED_SINCE);
 if(!email(env.SITEBUDDY_OWNER_EMAIL)||!email(env.SITEBUDDY_MAIL_FROM)||!env.RESEND_API_KEY||!Number.isFinite(since))throw Error('mail_configuration');
 return {to:env.SITEBUDDY_OWNER_EMAIL,from:env.SITEBUDDY_MAIL_FROM,key:env.RESEND_API_KEY,since};
}
export function submissionRecord(record){if(!record)return null;const {receivedAt,...data}=record;return Number.isFinite(Date.parse(receivedAt))&&validSubmission(data)?data:null;}
export const eligibleLead=r=>submissionRecord(r)&&r.type==='interest'&&r.kind==='public'&&r.contactConsent===true&&r.email!=='';
export async function queueLead(store,record,now=Date.now()){
 if(!eligibleLead(record))return false;
 const result=await store.setJSON(`mail/lead-${record.id}.json`,{v:1,id:`lead-${record.id}`,type:'lead',source:`interest/${record.id}.json`,createdAt:now,state:'queued',attempts:0,nextAt:now},{onlyIfNew:true});return result.modified;
}
export function summarize(records,day,warnings={}){
 const result={day,feedback:0,interest:0,contacts:0,roles:{},capabilities:{},usefulness:{},warnings};
 for(const r of records){if(!submissionRecord(r)||r.kind!=='public'||r.receivedAt.slice(0,10)!==day)continue;
  if(r.type==='feedback'){result.feedback++;result.usefulness[r.useful]=(result.usefulness[r.useful]??0)+1;}
  else {result.interest++;if(eligibleLead(r))result.contacts++;result.roles[r.role]=(result.roles[r.role]??0)+1;for(const c of r.interests)result.capabilities[c]=(result.capabilities[c]??0)+1;}
 }return result;
}
export async function queueDigest(store,summary,now=Date.now()){
 if(!summary.feedback&&!summary.interest&&!Object.values(summary.warnings).some(Number))return false;
 const id=`digest-${summary.day}`;return (await store.setJSON(`mail/${id}.json`,{v:1,id,type:'digest',summary,createdAt:now,state:'queued',attempts:0,nextAt:now},{onlyIfNew:true})).modified;
}
function message(job,record,config){
 const prefix=job.type==='lead'?'SiteBuddy — New Professional Interest':'SiteBuddy — Daily Feedback Summary';
 const text=job.type==='lead'?[
  'Voluntary professional interest; commercial qualification has not been assessed.',
  `Submitted: ${record.receivedAt} (UTC)`,`Role: ${record.role}`,`Requested future capabilities: ${record.interests.join(', ')}`,
  `Contact email: ${record.email}`,'Contact consent: granted',`Submission ID: ${record.id}`
 ].join('\n'):['UTC reporting day: '+job.summary.day,'Submission counts, not unique people. QA/synthetic submissions excluded.',JSON.stringify(job.summary,null,2)].join('\n');
 return {from:config.from,to:[config.to],subject:(config.qa?'[QA] ':'')+prefix,text};
}
// Every attempt consumes a reservation, including ambiguous attempts. There is no refund.
// One global CAS document enforces a conservative ceiling across concurrent functions.
async function reserveAttempt(store,now){
 for(let i=0;i<5;i++){
  const prior=await store.getWithMetadata('mail-control/budget.json',{type:'json',consistency:'strong'}),old=prior?.data??{},day=new Date(now).toISOString().slice(0,10),month=day.slice(0,7);
  const daily=old.day===day?old.daily:0,monthly=old.month===month?old.monthly:0;
  if(now<(old.nextAt??0))return 'rate';if(daily>=90||monthly>=2500)return 'quota';
  const next={day,month,daily:daily+1,monthly:monthly+1,nextAt:now+1100};
  if((await store.setJSON('mail-control/budget.json',next,prior?{onlyIfMatch:prior.etag}:{onlyIfNew:true})).modified)return 'ok';
 }return 'busy';
}
export async function resendSend(payload,{key,idempotencyKey,fetchImpl=fetch,timeoutMs=8000}){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{
  const response=await fetchImpl('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','Idempotency-Key':idempotencyKey},body:JSON.stringify(payload),signal:controller.signal});
  if(!response.ok)return {ok:false,retryable:response.status===429||response.status>=500,code:response.status===429?'rate_limit':response.status>=500?'provider_unavailable':'provider_rejected'};
  if(Number(response.headers.get('content-length'))>4096)return {ok:false,retryable:true,code:'ambiguous_response'};
  const reader=response.body?.getReader();if(!reader)return {ok:false,retryable:true,code:'ambiguous_response'};
  let text='',size=0;const decoder=new TextDecoder();while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>4096){await reader.cancel();return {ok:false,retryable:true,code:'ambiguous_response'};}text+=decoder.decode(value,{stream:true});}text+=decoder.decode();
  const body=JSON.parse(text);if(typeof body.id!=='string'||!body.id.match(/^[a-zA-Z0-9-]{1,100}$/))return {ok:false,retryable:true,code:'ambiguous_response'};
  return {ok:true,providerId:body.id};
 }catch{return {ok:false,retryable:true,code:'timeout_or_network'};}finally{clearTimeout(timer);}
}
export async function processJob(store,key,config,{now=Date.now(),send=resendSend}={}){
 if(!config)return 'disabled';
 const prior=await store.getWithMetadata(key,{type:'json',consistency:'strong'});if(!prior)return 'missing';const job=prior.data;
 if(!['queued','retry','sending'].includes(job.state)||now<job.nextAt)return job.state;
 if(job.createdAt<config.since)return 'before_activation';
 let record=null;if(job.type==='lead')record=await store.get(job.source,{type:'json',consistency:'strong'});
 const terminal=async reason=>{await store.setJSON(key,{...job,state:'terminal',reason,finishedAt:now}, {onlyIfMatch:prior.etag});return reason;};
 if(job.type==='lead'&&(!eligibleLead(record)||Date.parse(record.receivedAt)<config.since))return terminal('source_unavailable');
 if(now-job.createdAt>7*DAY)return terminal('queue_expired');
 if(job.firstAttemptAt!==undefined&&now-job.firstAttemptAt>=WINDOW)return terminal('ambiguous_window_expired');
 if(job.attempts>=6)return terminal('attempts_exhausted');
 const payload=message(job,record,config),fingerprint=hash(JSON.stringify(payload));
 if(job.fingerprint&&job.fingerprint!==fingerprint)return terminal('configuration_or_content_changed');
 const locked={...job,lease:randomUUID(),state:'sending',nextAt:now+60000,firstAttemptAt:job.firstAttemptAt??now,fingerprint,attempts:job.attempts+1};
 if(!(await store.setJSON(key,locked,{onlyIfMatch:prior.etag})).modified)return 'contended';
 const lease=await store.getWithMetadata(key,{type:'json',consistency:'strong'});
 if(lease?.data.lease!==locked.lease)return 'contended';
 const capacity=await reserveAttempt(store,now);
 if(capacity!=='ok'){
  // No provider request occurred. Preserve any existing ambiguity window, but do not start one for a blocked attempt.
  await store.setJSON(key,{...job,state:'retry',nextAt:now+(capacity==='quota'?3600000:60000),reason:capacity},{onlyIfMatch:lease.etag});return capacity;
 }
 let result;try{result=await send(payload,{key:config.key,idempotencyKey:'sitebuddy/'+job.id});}catch{result={ok:false,retryable:true,code:'provider_unavailable'};}
 const next=result.ok?{...locked,state:'accepted',providerId:result.providerId,acceptedAt:now,nextAt:0,reason:null}:{...locked,state:result.retryable?'retry':'terminal',reason:result.code,nextAt:now+Math.min(3600000,60000*2**(locked.attempts-1)),...(result.retryable?{}:{finishedAt:now})};
 await store.setJSON(key,next,{onlyIfMatch:lease.etag});return next.state;
}
export async function listRecords(store,prefix,limit=10000){const rows=[];for await(const page of store.list({prefix,paginate:true})){for(const {key} of page.blobs){if(rows.length>=limit)throw Error('scan_capacity');const data=await store.get(key,{type:'json',consistency:'strong'});if(data)rows.push({key,data});}}return rows;}
export async function runMail(store,config,{now=Date.now(),send=resendSend}={}){
 if(!config)return {disabled:true};
 const interests=await listRecords(store,'interest/'),feedback=await listRecords(store,'feedback/');
 for(const {data} of interests)if(Date.parse(data.receivedAt)>=Math.max(config.since,now-7*DAY)&&eligibleLead(data))await queueLead(store,data,Date.parse(data.receivedAt));
 const jobs=await listRecords(store,'mail/');const warnings={backlog:jobs.filter(x=>['queued','retry','sending'].includes(x.data.state)).length,terminal:jobs.filter(x=>x.data.state==='terminal').length};
 for(let age=1;age<=7;age++){if(age===1&&now%DAY<300000)continue;const day=new Date(now-age*DAY).toISOString().slice(0,10);if(Date.parse(day)+DAY<=config.since)continue;const health=await store.get(`ops/${day}.json`,{type:'json',consistency:'strong'});await queueDigest(store,summarize([...interests,...feedback].map(x=>x.data).filter(r=>Date.parse(r.receivedAt)>=config.since),day,{...(age===1?warnings:{}),persistenceFailures:health?.persistence_failed??0}),now);}
 let attempted=0;for(const {key,data} of await listRecords(store,'mail/')){if(attempted>=10)break;if(['queued','retry','sending'].includes(data.state)&&data.nextAt<=now){await processJob(store,key,config,{now,send});attempted++;}}

 return {examined:jobs.length,attempted,...warnings};
}

export async function recordHealth(store,event,now=Date.now()){
 if(!['persistence_failed','mail_deferred'].includes(event))throw Error('health_event');
 const key=`ops/${new Date(now).toISOString().slice(0,10)}.json`;
 for(let i=0;i<5;i++){const old=await store.getWithMetadata(key,{type:'json',consistency:'strong'}),data=old?.data??{};if((await store.setJSON(key,{...data,[event]:Math.min(100000,(data[event]??0)+1)},old?{onlyIfMatch:old.etag}:{onlyIfNew:true})).modified)return true;}return false;
}

export async function expireMail(store,now=Date.now()){
 let removed=0;for(const {key,data} of await listRecords(store,'mail/'))if(data.createdAt<=now-91*DAY){await store.delete(key);removed++;}
 for(const {key} of await listRecords(store,'ops/'))if(/^ops\/\d{4}-\d{2}-\d{2}\.json$/.test(key)&&Date.parse(key.slice(4,14))<=now-30*DAY){await store.delete(key);removed++;}return removed;
}
