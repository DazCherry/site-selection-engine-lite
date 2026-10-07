// Conservative matching: suggestions must agree with supplied address components.
// Never infer a missing house number, geocode a locality, or fuzzy-match a street.
export const US_STATES=Object.freeze(Object.fromEntries('AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DE:Delaware|DC:District of Columbia|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming'.split('|').map(x=>x.split(':'))));
const aliases={street:'st',avenue:'ave',road:'rd',boulevard:'blvd',drive:'dr',lane:'ln',court:'ct',circle:'cir',place:'pl',parkway:'pkwy',highway:'hwy',terrace:'ter',trail:'trl',way:'way',north:'n',south:'s',east:'e',west:'w',northeast:'ne',northwest:'nw',southeast:'se',southwest:'sw'};
export const words=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[.,]/g,' ').trim().split(/\s+/).map(w=>aliases[w]??w).join(' ');
export function stateCode(s){const v=String(s??'').trim().toLowerCase();return Object.entries(US_STATES).find(([k,n])=>k.toLowerCase()===v||n.toLowerCase()===v)?.[0]??'';}
export function addressParts(text){
 const noUnit=text.replace(/(?:,?\s+)(?:suite|ste|unit|apt|apartment|#)\s*(?:[0-9][\w-]*|[A-Za-z])(?=\s*,|\s+[A-Za-z]|$)/i,'');
 const house=/^(\d+[A-Za-z]?(?:-\d+[A-Za-z]?)?)\s+/.exec(noUnit)?.[1]??'';
 const segments=noUnit.split(',').map(s=>s.trim());
 const last=segments.at(-1);let country=/[, ](?:USA|US|United States(?: of America)?)$/i.test(noUnit)?'US':'';
 if(!country&&segments.length>=3&&!stateCode(last)&&!/\d{5}/.test(last)&&!Object.keys(US_STATES).some(code=>new RegExp('\\b'+code+'$','i').test(last)))country=last;
 let rest=noUnit.replace(/,?\s+(?:USA|US|United States(?: of America)?)$/i,'').trim(),state='',zip='';
 const z=/\s+(\d{5})(?:-\d{4})?$/.exec(rest);if(z){zip=z[1];rest=rest.slice(0,z.index).trim();}
 for(const [code,name] of Object.entries(US_STATES)){const r=new RegExp('(?:,?\\s+)('+code+'|'+name+')$','i');const m=r.exec(rest);if(m){state=code;rest=rest.slice(0,m.index).trim();break;}}
 const remainder=rest.slice(house.length).trim();let street='',city='';
 if(remainder.includes(',')){[street,...rest]=remainder.split(',');city=(rest[0]??'').trim();}
 else if(state||zip){const m=/^(.+?\b(?:street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|court|ct|circle|cir|place|pl|parkway|pkwy|highway|hwy|terrace|ter|trail|trl|way)\.?)(?:\s+(N|S|E|W|NE|NW|SE|SW))?\s+(.+)$/i.exec(remainder);if(m){street=m[1]+(m[2]?' '+m[2]:'');city=m[3];}else street=remainder;}
 return {house,street:street.trim(),city,state,zip,country,query:noUnit};
}
export function candidateAgrees(properties,input){
 const a=addressParts(input),p=properties;
 if(!a.house||words(p.housenumber)!==words(a.house))return false;
 if(a.street&&words(p.street)!==words(a.street))return false;
 if(a.country){const canon=s=>/^(us|usa|united states(?: of america)?)$/i.test(String(s))?'us':String(s??'').toLowerCase();if(canon(p.country)!==canon(a.country)&&canon(p.countrycode)!==canon(a.country))return false;}
 if(a.state){if(stateCode(p.state)!==a.state)return false;if(p.countrycode&&String(p.countrycode).toUpperCase()!=='US')return false;}
 if(a.zip&&String(p.postcode??'').slice(0,5)!==a.zip)return false;
 if(a.city&&words(p.city??p.district)!==words(a.city))return false;
 return true;
}
