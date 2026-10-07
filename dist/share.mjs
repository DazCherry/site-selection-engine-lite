import {MODEL_VERSION} from './model.mjs';
const keys=['v','model','kind','day','scores','total'];
const score=value=>value===null||(typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=10);
export function validateShared(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).sort().join(',')!==[...keys].sort().join(','))throw new Error('Invalid shared summary.');
 if(value.v!==1||value.model!==MODEL_VERSION||!['public','synthetic'].includes(value.kind))throw new Error('Unsupported shared summary.');
 if(typeof value.day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value.day)||!Number.isFinite(Date.parse(value.day))||new Date(value.day).toISOString().slice(0,10)!==value.day)throw new Error('Invalid summary date.');
 if(!Array.isArray(value.scores)||value.scores.length!==3||!value.scores.every(score)||!score(value.total))throw new Error('Invalid shared scores.');
 const total=value.scores.every(v=>v!==null)?Math.round(value.scores.reduce((a,b)=>a+b,0)/3*10)/10:null;
 if(value.total!==total)throw new Error('Inconsistent shared scores.');
 return {v:1,model:MODEL_VERSION,kind:value.kind,day:value.day,scores:[...value.scores],total:value.total};
}
export function createSummary(snapshot){
 if(!snapshot?.assessment||snapshot.modelVersion!==MODEL_VERSION)throw new Error('Generate a result before sharing.');
 return validateShared({v:1,model:snapshot.modelVersion,kind:snapshot.kind,day:snapshot.fetchedAt?.slice(0,10),scores:snapshot.assessment.dimensions.map(d=>d.score),total:snapshot.assessment.score});
}
export function shareURL(snapshot,base){
 const url=new URL(base);
 if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['127.0.0.1','localhost'].includes(url.hostname)))throw new Error('Sharing requires a secure SiteBuddy page.');
 url.username='';url.password='';url.pathname='/';url.search='';url.hash='sb='+encodeURIComponent(JSON.stringify(createSummary(snapshot)));return url.href;
}
export function readShared(hash){
 if(!hash||!hash.startsWith('#sb='))return null;
 if(hash.length>1500)throw new Error('Shared summary is too large.');
 let value;try{value=JSON.parse(decodeURIComponent(hash.slice(4)));}catch{throw new Error('This shared summary could not be read.');}
 return validateShared(value);
}
export function summaryText(summary){
 const s=validateShared(summary),label=s.total===null?'not enough mapped data':`${s.total.toFixed(1)}/10`;
 return `SiteBuddy ${s.kind==='synthetic'?'fictional example':'shared location summary'}: ${label}. Retail variety, everyday amenities and transit proximity. Sender-provided summary; not independently verified. No address included. Try your own public U.S. location.`;
}
// A bounded clipboard attempt never blocks the manual copy fallback.
export async function deliverShare({text,url,writeText,timeoutMs=2000}){
 if(!writeText)return 'manual';let timer;
 try{return await Promise.race([Promise.resolve().then(()=>writeText(`${text}\n${url}`)).then(()=>'copied',()=>'manual'),new Promise(resolve=>{timer=setTimeout(()=>resolve('manual'),timeoutMs);})]);}
 finally{clearTimeout(timer);}
}
