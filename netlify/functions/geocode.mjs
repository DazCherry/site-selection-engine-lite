import {getStore} from '@netlify/blobs';
import {geocodeHandler} from '../../server/geocodio.mjs';
import {reserveGeocode} from '../../server/geocode-quota.mjs';
export default (req,context)=>{
 const production=context.deploy.context==='production';
 return geocodeHandler({enabled:process.env.SITEBUDDY_GEOCODIO_ENABLED==='true',key:process.env.GEOCODIO_API_KEY,
 reserve:()=>reserveGeocode(getStore({name:production?'sitebuddy-geocoding-v1':'sitebuddy-geocoding-preview-v1',consistency:'strong'}),{limit:production?850:100})})(req);
};
export const config={path:'/api/geocode',rateLimit:{action:'rate_limit',aggregateBy:['domain','ip'],windowSize:60,windowLimit:8}};
