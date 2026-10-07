// Run only after the owner has authorized Resend, sender identity and synthetic inbox testing.
import {getStore} from '@netlify/blobs';
import {mailConfig,queueLead,processJob} from '../server/owner-mail.mjs';
const id='00000000-0000-4000-8000-000000000001',key=`mail/lead-${id}.json`;
try{
 const env=process.env;if(!env.NETLIFY_AUTH_TOKEN||!env.SITEBUDDY_SITE_ID)throw Error('authorization_required');
 const config=mailConfig(env,'production');if(!config)throw Error('mail_disabled');config.qa=true;
 const store=getStore({name:'sitebuddy-mail-qa-v1',siteID:env.SITEBUDDY_SITE_ID,token:env.NETLIFY_AUTH_TOKEN,consistency:'strong'});
 const action=process.argv[2];
 if(action==='--send'){
  const record={v:1,id,type:'interest',kind:'public',website:'',role:'operator',interests:['competition'],email:'qa@example.com',contactConsent:true,receivedAt:new Date().toISOString()};
  await store.setJSON(`interest/${id}.json`,record,{onlyIfNew:true});
  await queueLead(store,await store.get(`interest/${id}.json`,{type:'json',consistency:'strong'}));
  console.log(await processJob(store,key,config));
 }else if(action==='--confirm-receipt'){
  const old=await store.getWithMetadata(key,{type:'json',consistency:'strong'});if(old?.data.state!=='accepted')throw Error('not_provider_accepted');
  await store.setJSON(key,{...old.data,ownerVerifiedReceiptAt:new Date().toISOString()},{onlyIfMatch:old.etag});console.log('Owner inbox receipt confirmation recorded.');
 }else throw Error('usage');
}catch{console.error('QA operation failed. Check approved credentials/configuration and the operations guide; no secret was logged.');process.exitCode=1;}
