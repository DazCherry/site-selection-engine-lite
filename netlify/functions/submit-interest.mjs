import {getStore} from '@netlify/blobs';
import {submissionHandler} from '../../server/submissions.mjs';
export default (req,context)=>submissionHandler(()=>getStore({name:context.deploy.context==='production'?'sitebuddy-submissions-v1':'sitebuddy-submissions-preview-v1',consistency:'strong'}))(req);
export const config={path:'/api/interest',rateLimit:{action:'rate_limit',aggregateBy:['domain','ip'],windowSize:60,windowLimit:10}};
