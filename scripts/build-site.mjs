import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),out=new URL('../build/',import.meta.url);
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});await cp(new URL('../dist/',import.meta.url),out,{recursive:true});
// Public promotion requires an explicit, reviewed environment setting. Previews never index.
const isProduction=process.env.CONTEXT==='production'&&process.env.SITEBUDDY_PUBLIC_RELEASE==='1';
if(!isProduction){
 const html=await readFile(new URL('index.html',out),'utf8');await writeFile(new URL('index.html',out),html.replace('<head>','<head>\n<meta name="robots" content="noindex,nofollow">'));
 const headers=await readFile(new URL('_headers',out),'utf8');await writeFile(new URL('_headers',out),headers+'\n/*\n  X-Robots-Tag: noindex, nofollow\n');
}
await writeFile(new URL('robots.txt',out),isProduction?'User-agent: *\nAllow: /\n':'User-agent: *\nDisallow: /\n');
console.log(`Built ${isProduction?'production':'non-indexed preview'} assets.`);
