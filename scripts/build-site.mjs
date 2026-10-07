import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {siteMetadata} from './site-metadata.mjs';
const out=new URL('../build/',import.meta.url);
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});await cp(new URL('../dist/',import.meta.url),out,{recursive:true});
const isProduction=process.env.CONTEXT==='production'&&process.env.SITEBUDDY_PUBLIC_RELEASE==='1';
const origin=process.env.SITEBUDDY_PUBLIC_ORIGIN||process.env.URL;
if(isProduction&&!origin)throw Error('Production origin is required.');
let html=await readFile(new URL('index.html',out),'utf8'),headers=await readFile(new URL('_headers',out),'utf8');
if(origin){const metadata=siteMetadata(origin);html=html.replace('<!-- SITE_METADATA -->',metadata.html).replace("script-src 'self'",`script-src 'self' 'sha256-${metadata.hash}'`);headers=headers.replace("script-src 'self'",`script-src 'self' 'sha256-${metadata.hash}'`);}
if(!isProduction){html=html.replace('<head>','<head>\n<meta name="robots" content="noindex,nofollow">');headers+='\n/*\n  X-Robots-Tag: noindex, nofollow\n';}
await writeFile(new URL('index.html',out),html);await writeFile(new URL('_headers',out),headers);
// Crawling must be allowed for robots to read the preview noindex response header.
await writeFile(new URL('robots.txt',out),'User-agent: *\nAllow: /\n'+(isProduction?`Sitemap: ${new URL(origin).origin}/sitemap.xml\n`:''));
if(isProduction)await writeFile(new URL('sitemap.xml',out),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/privacy','/credits'].map(path=>`<url><loc>${new URL(origin).origin}${path}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${isProduction?'production':'non-indexed preview'} assets.`);
