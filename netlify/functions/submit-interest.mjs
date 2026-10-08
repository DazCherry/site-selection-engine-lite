import {getStore} from '@netlify/blobs';
import {submissionHandler} from '../../server/submissions.mjs';
export default (req,context)=>{
 const store=()=>getStore({name:context.deploy.context==='production'?'sitebuddy-submissions-v1':'sitebuddy-submissions-preview-v1',consistency:'strong'});
 const health=event=>context.waitUntil(import('../../server/owner-mail.mjs').then(({recordHealth})=>recordHealth(store(),event)).catch(()=>console.warn('sitebuddy_operational_count_unavailable')));
 return submissionHandler(store,{onPersistenceFailure:()=>{console.warn('sitebuddy_submission_storage_failed');health('persistence_failed');},onStored:record=>context.waitUntil((async()=>{
  // Load optional mail runtime only after persistence. A mail dependency fault cannot break acknowledgement.
  const {mailConfig,queueLead,processJob}=await import('../../server/owner-mail.mjs');
  const config=mailConfig(process.env,context.deploy.context);if(!config)return;
  if(await queueLead(store(),record))await processJob(store(),`mail/lead-${record.id}.json`,config);
 })().catch(()=>{console.warn('sitebuddy_mail_deferred');health('mail_deferred');}))})(req);
};
export const config={path:'/api/interest',rateLimit:{action:'rate_limit',aggregateBy:['domain','ip'],windowSize:60,windowLimit:10}};
