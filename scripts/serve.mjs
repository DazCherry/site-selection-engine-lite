import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
export function createServer(){return http.createServer(async(req,res)=>{
 const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control':'no-store','X-Frame-Options':'DENY'};
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,headers);return res.end('Method not allowed');}
 let path;try{path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400,headers);return res.end('Bad request');}
 const file=resolve(root,'.'+(path==='/'?'/index.html':path));
 if(!file.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403,headers);return res.end('Forbidden');}
 const types={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
 try{const body=await readFile(file);res.writeHead(200,{...headers,'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(404,headers);res.end('Not found');}
});}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||4173);createServer().listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));}
