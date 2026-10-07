import {validSubmission} from './interest-schema.mjs';
import {createSubmitter} from './submission-client.mjs';
const $=id=>document.getElementById(id);let kind='synthetic',epoch=0;
const track=(event,properties={})=>window.dispatchEvent(new CustomEvent('sitebuddy:event',{detail:{event,...properties}}));
const send=async(data,signal)=>{const response=await fetch('/api/interest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal,credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store'});if(!response.ok)return {code:'unavailable'};return response.json();};
const forms=['feedback','interest'];
for(const type of forms){const form=$(type+'-form'),submit=createSubmitter({uuid:()=>crypto.randomUUID(),send});form.querySelector('fieldset').disabled=false;form.addEventListener('submit',async e=>{
 e.preventDefault();const token=epoch,button=form.querySelector('button[type=submit]'),status=$(type+'-status');
 const value=name=>form.elements.namedItem(name).value;
 const data=type==='feedback'?{v:1,type,kind,website:value('website'),useful:value('useful'),sense:value('sense'),decision:value('decision'),missing:value('missing')}:{v:1,type,kind,website:value('website'),role:value('role'),interests:[...form.querySelectorAll('input[name=interests]:checked')].map(x=>x.value),email:value('email').trim(),contactConsent:form.elements.namedItem('contactConsent').checked};
 if(!validSubmission({...data,id:'00000000-0000-4000-8000-000000000000'})){status.textContent=type==='interest'?'Choose one to three interests. Leave email blank without contact consent, or enter a valid email and agree to contact.':'Please complete the four choices.';return;}
 button.disabled=true;status.textContent='Sending...';const result=await submit(data);if(token!==epoch){button.disabled=false;return;}
 if(result.ok){status.textContent=type==='feedback'?'Feedback received. Thank you.':'Interest received. These capabilities are not available yet; no launch date is promised.';track(type==='feedback'?'feedback_submitted':'early_access_submitted',{kind});if(type==='interest')for(const category of data.interests)track('capability_interest',{kind,category});form.querySelector('fieldset').disabled=true;}else{status.textContent='We could not confirm receipt. Your choices are still here; please try again. A retry will not duplicate the same submission.';button.disabled=false;}
 });}
$('deeper-analysis').disabled=false;
$('deeper-analysis').addEventListener('click',()=>{$('demand-panel').hidden=false;track('deeper_analysis_clicked',{kind});$('demand-title').focus();$('demand-panel').scrollIntoView({behavior:'smooth',block:'start'});});
window.addEventListener('sitebuddy:event',e=>{const d=e.detail;if(!d)return;if(d.event==='analysis_started'||d.event==='repeat_analysis'){epoch++;$('demand-panel').hidden=true;for(const type of forms){const form=$(type+'-form');form.reset();form.querySelector('fieldset').disabled=false;form.querySelector('button[type=submit]').disabled=false;$(type+'-status').textContent='';}}if(['analysis_succeeded','analysis_withheld'].includes(d.event))kind=d.kind;});
