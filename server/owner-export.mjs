import {submissionRecord,listRecords} from './owner-mail.mjs';
import {EVENTS,CHANNELS,CATEGORIES,FAILURES} from '../dist/analytics-schema.mjs';
const DAY=86400000;
export function csvCell(value){let s=String(value??'');if(/^[\s\u0000-\u001f\u007f]*[=+@-]/u.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function toCSV(headers,rows){return [headers,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n')+'\r\n';}
export async function exportSubmissions(store,type,{now=Date.now(),includeQA=false}={}){
 if(!['feedback','interest'].includes(type))throw Error('export_type');
 const records=(await listRecords(store,type+'/')).map(x=>x.data).filter(r=>submissionRecord(r)&&r.type===type&&(includeQA||r.kind==='public')&&Date.parse(r.receivedAt)>now-90*DAY&&Date.parse(r.receivedAt)<=now);
 const headers=type==='feedback'?['timestamp_utc','usefulness','intuitive_sense','decision_context','missing_capability','submission_id','kind']:['timestamp_utc','role','requested_capabilities','email','contact_consent','submission_id','kind'];
 return toCSV(headers,records.sort((a,b)=>a.receivedAt.localeCompare(b.receivedAt)).map(r=>type==='feedback'?[r.receivedAt,r.useful,r.sense,r.decision,r.missing,r.id,r.kind]:[r.receivedAt,r.role,r.interests.join(';'),r.contactConsent?r.email:'',r.contactConsent,r.id,r.kind]));
}
export async function exportAnalytics(store,{now=Date.now(),includeQA=false}={}){
 const rows=[],cutoff=new Date(now-30*DAY).toISOString().slice(0,10),today=new Date(now).toISOString().slice(0,10);
 for(const {data} of await listRecords(store,'daily/')){if(typeof data.day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(data.day)||data.day<=cutoff||data.day>today||!data.counts)continue;
  for(const [key,count] of Object.entries(data.counts)){const parts=key.split('|'),[event,kind,channel,category,failure]=parts;if(parts.length!==5||!EVENTS.includes(event)||!['none','public','synthetic'].includes(kind)||!CHANNELS.includes(channel)||!CATEGORIES.includes(category)||!FAILURES.includes(failure)||!Number.isSafeInteger(count)||count<0||(!includeQA&&(kind==='synthetic'||channel==='qa')))continue;rows.push([data.day,event,count,channel,kind,category,failure]);}
 }return toCSV(['reporting_date_utc','event','count','channel','kind','category','failure'],rows.sort((a,b)=>a.join('|').localeCompare(b.join('|'))));
}
export async function diagnostics(store,now=Date.now()){
 const counts={queued:0,retry:0,sending:0,accepted:0,terminal:0},jobs=await listRecords(store,'mail/');
 for(const {data} of jobs)if(Object.hasOwn(counts,data.state))counts[data.state]++;
 const budget=await store.get('mail-control/budget.json',{type:'json',consistency:'strong'});
 return {at:new Date(now).toISOString(),mail:counts,reservations:budget?{day:budget.day,daily:budget.daily,month:budget.month,monthly:budget.monthly}:null,note:'Accepted means provider acceptance, not inbox receipt. Client analytics cover consenting visits only.'};
}
