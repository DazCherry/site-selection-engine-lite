import {getStore} from '@netlify/blobs';
import {expireMail} from '../../server/owner-mail.mjs';
import {expireSubmissions} from '../../server/submissions.mjs';
export default async()=>{for(const name of ['sitebuddy-submissions-v1','sitebuddy-submissions-preview-v1','sitebuddy-mail-qa-v1']){const store=getStore({name,consistency:'strong'});await expireSubmissions(store);await expireMail(store);}return new Response(null,{status:204});};
export const config={schedule:'37 3 * * *'};
