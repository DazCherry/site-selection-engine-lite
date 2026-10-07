export const INTERESTS=['demographics','competition','footfall','trade_area','feasibility','restaurant','retail','beauty','other'];
export const ROLES=['multi_location','operator','franchise','broker','consultant','independent','other','prefer_not'];
export function validSubmission(x){
 if(!x||typeof x!=='object'||Array.isArray(x)||x.v!==1||typeof x.id!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(x.id)||!['public','synthetic'].includes(x.kind)||typeof x.website!=='string'||x.website.length!==0)return false;
 const common=['v','id','type','kind','website'];
 const fields=x.type==='feedback'?['useful','sense','decision','missing']:x.type==='interest'?['role','interests','email','contactConsent']:[];
 if(!fields.length||Object.keys(x).length!==common.length+fields.length||![...common,...fields].every(k=>Object.hasOwn(x,k)))return false;
 if(x.type==='feedback')return ['yes','somewhat','no','unsure'].includes(x.useful)&&['yes','partly','no','unsure'].includes(x.sense)&&['yes','exploring','no','prefer_not'].includes(x.decision)&&['none',...INTERESTS].includes(x.missing);
 return ROLES.includes(x.role)&&Array.isArray(x.interests)&&x.interests.length>=1&&x.interests.length<=3&&new Set(x.interests).size===x.interests.length&&x.interests.every(i=>INTERESTS.includes(i))&&typeof x.email==='string'&&x.email.length<=254&&typeof x.contactConsent==='boolean'&&(x.email===''?x.contactConsent===false:x.contactConsent===true&&/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}$/.test(x.email)&&!x.email.includes('..'));
}
