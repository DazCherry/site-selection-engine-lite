// Owner-only local CLI. Nothing here creates a public read endpoint.
import {getStore} from '@netlify/blobs';
import {mkdir,realpath,writeFile,rm} from 'node:fs/promises';
import {resolve,relative,dirname,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
import {exportSubmissions,exportAnalytics,diagnostics} from '../server/owner-export.mjs';
const repo=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const outside=(parent,path)=>{const rel=relative(parent,path);return rel!==''&&(rel==='..'||rel.startsWith('../')||isAbsolute(rel));};
export async function ownerExport({env=process.env,args=process.argv.slice(2),storeFactory=getStore}={}){
 if(!env.NETLIFY_AUTH_TOKEN||!env.SITEBUDDY_SITE_ID)throw Error('authorization_required');
 if(args.length!==2||args[0]!=='--out')throw Error('usage');
 const proposed=resolve(args[1]);if(!outside(repo,proposed))throw Error('output_inside_repository');
 await mkdir(proposed,{recursive:true,mode:0o700});const output=await realpath(proposed),root=await realpath(repo);if(!outside(root,output))throw Error('output_inside_repository');
 const options={siteID:env.SITEBUDDY_SITE_ID,token:env.NETLIFY_AUTH_TOKEN,consistency:'strong'},submissions=storeFactory({...options,name:'sitebuddy-submissions-v1'}),analytics=storeFactory({...options,name:'sitebuddy-measurement-v1'});
 // Finish authorized reads before writing; HTTP auth failures produce no partial export.
 const files={'feedback.csv':await exportSubmissions(submissions,'feedback'),'professional-interest.csv':await exportSubmissions(submissions,'interest'),'analytics-summary.csv':await exportAnalytics(analytics),'operations.json':JSON.stringify(await diagnostics(submissions),null,2)+'\n'};
 const written=[];try{for(const [name,data] of Object.entries(files)){const file=resolve(output,name);await writeFile(file,data,{flag:'wx',mode:0o600});written.push(file);}}catch(error){for(const file of written)await rm(file);throw error;}
 return Object.keys(files);
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const files=await ownerExport();console.log(`Export complete: ${files.join(', ')}. Keep private; delete after use.`);}catch(error){const known=['authorization_required','usage','output_inside_repository'];console.error(known.includes(error.message)?error.message:'export_failed');console.error('Usage: node scripts/owner-export.mjs --out /absolute/private/folder-outside-repository');process.exitCode=1;}
}
