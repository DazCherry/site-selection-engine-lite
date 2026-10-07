import {getStore} from '@netlify/blobs';
import {expireAggregates} from '../../server/measurement.mjs';
export default async()=>{for(const name of ['sitebuddy-measurement-v1','sitebuddy-measurement-preview-v1'])await expireAggregates(getStore({name,consistency:'strong'}));return new Response(null,{status:204});};
export const config={schedule:'17 3 * * *'};
