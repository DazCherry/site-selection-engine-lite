import {getStore} from '@netlify/blobs';
import {measurementHandler} from '../../server/measurement.mjs';
export default (req,context)=>measurementHandler(()=>getStore({name:context.deploy.context==='production'?'sitebuddy-measurement-v1':'sitebuddy-measurement-preview-v1',consistency:'strong'}))(req);
export const config={path:'/api/measure',rateLimit:{action:'rate_limit',aggregateBy:['domain','ip'],windowSize:60,windowLimit:60}};
