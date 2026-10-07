import {validEvent} from './analytics-schema.mjs';
export function createMeasurement({send,uuid,channel,onState=()=>{}}){
 let enabled=false,viewed=false,pending=new Set();
 function event(name,{kind='none',category='none',failure='none'}={}){
  if(!enabled||pending.size>=8)return false;
  let data;try{data={v:1,id:uuid(),event:name,kind,channel,category,failure};}catch{return false;}
  if(!validEvent(data))return false;
  const controller=new AbortController();pending.add(controller);
  const timeout=setTimeout(()=>controller.abort(),3000);
  Promise.resolve().then(()=>send(data,controller.signal)).then(ok=>{if(enabled)onState(ok?'received':'unavailable');},()=>{if(enabled)onState('unavailable');}).finally(()=>{clearTimeout(timeout);pending.delete(controller);});
  return true;
 }
 return {event,setEnabled(value){enabled=!!value;if(!enabled){for(const c of pending)c.abort();pending.clear();onState('off');return;}onState('on');if(!viewed){viewed=true;event('page_view');}},isEnabled:()=>enabled};
}
