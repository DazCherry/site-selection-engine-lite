import {createMeasurement} from './analytics-client.mjs';
import {acquisitionChannel} from './analytics-schema.mjs';
const consent=document.getElementById('analytics-consent'),status=document.getElementById('analytics-status');
const messages={off:'Optional measurement is off.',on:'Optional anonymous measurement is on for this page.',received:'Anonymous action count received. You can turn measurement off anytime.',unavailable:'Measurement is unavailable. Analysis and sharing still work.'};
const tracker=createMeasurement({channel:acquisitionChannel(location.href,document.referrer),uuid:()=>crypto.randomUUID(),onState:s=>{status.textContent=messages[s];},send:async(data,signal)=>{const response=await fetch('/api/measure',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal,credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store'});if(!response.ok)return false;const receipt=await response.json();return ['recorded','duplicate'].includes(receipt.code);}});
consent.disabled=false;status.textContent=messages.off;
consent.addEventListener('change',()=>tracker.setEnabled(consent.checked));
window.addEventListener('sitebuddy:event',e=>{if(e.detail&&typeof e.detail==='object')tracker.event(e.detail.event,e.detail);});
window.addEventListener('pagehide',()=>tracker.setEnabled(false),{once:true});
