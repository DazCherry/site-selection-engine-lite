import {getStore} from '@netlify/blobs';
import {expireSubmissions} from '../../server/submissions.mjs';
export default async()=>{for(const name of ['sitebuddy-submissions-v1','sitebuddy-submissions-preview-v1'])await expireSubmissions(getStore({name,consistency:'strong'}));return new Response(null,{status:204});};
export const config={schedule:'37 3 * * *'};
