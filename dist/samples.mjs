// Independently generated fictional records; not an extract of any real location.
export function sample(kind='mixed'){
 if(!['mixed','sparse'].includes(kind))throw new Error('Unknown sample.');
 const origin={lat:0,lon:0};const tags=kind==='mixed'?[{shop:'supermarket'},{shop:'clothes'},{shop:'furniture'},{shop:'books'},{amenity:'pharmacy'},{amenity:'bank'},{amenity:'post_office'},{highway:'bus_stop'}]:[{shop:'convenience'}];
 const raw={osm3s:{timestamp_osm_base:'2026-01-01T00:00:00Z'},elements:tags.map((t,i)=>({type:'node',id:i+1,lat:0,lon:i===7?0.001:0.0001*(i+1),tags:t}))};
 return {label:kind==='mixed'?'18 Example Lane · Fictional mixed-use neighborhood':'42 Sample Road · Fictional sparse neighborhood',origin,raw,evaluationTime:'2026-01-01T00:00:00Z',kind:'synthetic'};
}
