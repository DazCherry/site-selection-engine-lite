import {getStore} from '@netlify/blobs';
import {mailConfig,runMail} from '../../server/owner-mail.mjs';
export default async(req,context)=>{
 try{const config=mailConfig(process.env,context.deploy.context);if(!config)return new Response(null,{status:204});
 await runMail(getStore({name:'sitebuddy-submissions-v1',consistency:'strong'}),config);
 return new Response(null,{status:204});
 }catch{console.warn('sitebuddy_mail_worker_failed');return new Response(null,{status:503});}
};
// Five-minute bounded recovery; first run after midnight prepares the previous UTC day.
export const config={schedule:'*/5 * * * *'};
