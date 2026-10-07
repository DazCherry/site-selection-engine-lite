export const EVENTS=['page_view','analysis_started','address_submitted','address_confirmed','analysis_succeeded','analysis_withheld','analysis_failed','repeat_analysis','share_clicked','share_copied','share_manual','deeper_analysis_clicked','feedback_submitted','early_access_submitted','capability_interest'];
export const CHANNELS=['direct','github','producthunt','hackernews','community','outreach','search','shared','other','qa'];
export const CATEGORIES=['none','demographics','competition','footfall','trade_area','feasibility','restaurant','retail','beauty'];
export const FAILURES=['none','input','geocoding','context','integration'];
const keys=['v','id','event','kind','channel','category','failure'];
export function validEvent(x){return !!x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k))&&x.v===1&&typeof x.id==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(x.id)&&EVENTS.includes(x.event)&&['none','public','synthetic'].includes(x.kind)&&CHANNELS.includes(x.channel)&&CATEGORIES.includes(x.category)&&FAILURES.includes(x.failure);}
export function acquisitionChannel(url,referrer=''){
 try{const u=new URL(url);if(u.hash.startsWith('#sb='))return 'shared';const source=u.searchParams.get('utm_source');if(source)return CHANNELS.includes(source)&&source!=='direct'?source:'other';if(!referrer)return 'direct';const host=new URL(referrer).hostname;if(host==='github.com')return 'github';if(host==='news.ycombinator.com')return 'hackernews';if(host==='www.producthunt.com'||host==='producthunt.com')return 'producthunt';if(['www.google.com','www.bing.com','duckduckgo.com'].includes(host))return 'search';return host===u.hostname?'direct':'other';}catch{return 'other';}
}
export function countKey(x){return [x.event,x.kind,x.channel,x.category,x.failure].join('|');}
