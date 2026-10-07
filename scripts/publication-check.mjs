import {readFileSync,readdirSync,lstatSync} from 'node:fs';
import {resolve,relative,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const ROOT=fileURLToPath(new URL('../',import.meta.url));
const forbiddenHashes=new Set(['d84fc2efb1567e587fd0fed7cb76b3e1203282f96ab0cfd08be4da8a8e33e942']);
export function findings(text){
 const hits=[];const patterns=[['private filesystem path',new RegExp('/'+'(?:Users|home|mnt/data)/[^\\s]+','i')],['credential',new RegExp('(?:gh[pousr]_'+'[A-Za-z0-9]{20,}|github_pat_'+'[A-Za-z0-9_]{20,}|sk-'+'[A-Za-z0-9_-]{20,}|AKIA'+'[A-Z0-9]{16}|-----BEGIN '+'(?:RSA |EC |OPENSSH )?PRIVATE KEY-----)')],['assigned secret',new RegExp('(?:api[_-]?key|secret|password|token)\\s*[:=]\\s*["\x27][A-Za-z0-9_./+-]{16,}["\x27]','i')]];
 for(const [name,re] of patterns)if(re.test(text))hits.push(name);
 const words=text.normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}]+/gu)||[];
 for(let n=1;n<=4;n++)for(let i=0;i<=words.length-n;i++){const hash=createHash('sha256').update(words.slice(i,i+n).join(' ')).digest('hex');if(forbiddenHashes.has(hash))hits.push('forbidden customer term');}
 return [...new Set(hits)];
}
export function scan(root=ROOT){
 const errors=[];const ignore=new Set(['.git','.openai','.sites-runtime','node_modules','coverage','test-results','playwright-report','build']);
 const allowed=new Set(['.md','.mjs','.html','.css','.svg','.json','.yml','.yaml']);
 function walk(dir){for(const name of readdirSync(dir)){if(ignore.has(name))continue;const path=resolve(dir,name),rel=relative(root,path),stat=lstatSync(path);if(stat.isSymbolicLink()){errors.push(`${rel}: symbolic link prohibited`);continue;}if(stat.isDirectory()){walk(path);continue;}
 if(stat.size>250000){errors.push(`${rel}: oversized artifact`);continue;}
 if(!allowed.has(extname(name))&&!['.gitignore','LICENSE','Dockerfile','.dockerignore','_headers','netlify.toml'].includes(name)){errors.push(`${rel}: unapproved file type`);continue;}
 const content=readFileSync(path,'utf8');for(const f of findings(rel+'\n'+content))errors.push(`${rel}: ${f}`);
 }}walk(root);return errors;
}
export function scanHistory(root=ROOT){
 let objects;try{objects=execFileSync('git',['rev-list','--objects','--all'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split('\n').filter(Boolean);}catch{return [];}
 const errors=[];for(const entry of objects){const [sha,...path]=entry.split(' ');const type=execFileSync('git',['cat-file','-t',sha],{cwd:root,encoding:'utf8'}).trim();if(type!=='blob')continue;const body=execFileSync('git',['cat-file','-p',sha],{cwd:root,encoding:'utf8',maxBuffer:2000000});for(const f of findings(path.join(' ')+'\n'+body))errors.push(`history ${sha.slice(0,12)}: ${f}`);}return errors;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){const errors=[...scan(),...scanHistory()];if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log('Publication checks PASS: approved files, secret patterns, forbidden terms, private paths, history. Manual review still required.');}
