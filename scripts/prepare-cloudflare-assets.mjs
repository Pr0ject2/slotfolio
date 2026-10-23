import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import { resolve, join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

export const catalogPayloadRule="/es/slots/catalog/:slug/__next._full.txt /es/slots/catalog/:slug/index.txt 200";
const marker="# Slotfolio: identical Spanish catalogue full RSC payloads";
/** @param {string} directory @returns {string[]} */
function filesIn(directory){return readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{if(entry.isSymbolicLink())throw new Error("Symlinks are not allowed in the export");const file=join(directory,entry.name);if(entry.isDirectory())return filesIn(file);if(!entry.isFile())throw new Error(`Unsupported export entry: ${file}`);return [file];});}

/** Validate every invariant before changing the generated artifact. The CLI
 * always uses the production defaults: exactly 900 records, at most 20000 files.
 * @param {string} directory
 * @param {{expectedRecords?:number,fileLimit?:number}} [options] */
export function planCloudflareAssets(directory,{expectedRecords=900,fileLimit=20000}={}){
  if(!Number.isInteger(expectedRecords)||expectedRecords<1||expectedRecords>900)throw new Error("Unexpected catalogue record limit");
  if(!Number.isInteger(fileLimit)||fileLimit<1||fileLimit>20000)throw new Error("File limit cannot exceed 20000");
  const root=resolve(directory),files=filesIn(root),name=file=>relative(root,file).replaceAll("\\","/");
  const pages=files.filter(file=>/^es\/slots\/catalog\/[^/]+\/index\.html$/.test(name(file)));
  const full=files.filter(file=>/^es\/slots\/catalog\/[^/]+\/__next\._full\.txt$/.test(name(file)));
  if(pages.length!==expectedRecords||full.length!==expectedRecords)throw new Error(`Expected exactly ${expectedRecords} Spanish catalogue pages and full payloads; found ${pages.length}/${full.length}`);
  const proof=full.map(file=>{const target=join(dirname(file),"index.txt"),html=join(dirname(file),"index.html");if(!existsSync(target)||!existsSync(html))throw new Error(`Missing target/page for ${name(file)}`);const bytes=readFileSync(file);if(!bytes.equals(readFileSync(target)))throw new Error(`RSC payload differs from index.txt: ${name(file)}`);return {path:name(file),target:name(target),sha256:createHash("sha256").update(bytes).digest("hex")};});
  const redirects=join(root,"_redirects"),previous=existsSync(redirects)?readFileSync(redirects,"utf8"):"";
  if(previous.includes("__next._full.txt"))throw new Error("Existing full-payload rules require review");
  const after=files.length-full.length+(existsSync(redirects)?0:1);if(after>fileLimit)throw new Error(`Export exceeds file limit after packing: ${after} > ${fileLimit}`);
  return {root,before:files.length,after,duplicates:full.length,fileLimit,proof,redirects,previous};
}
/** Only the 900 verified copies in the generated Cloudflare artifact are removed.
 * Every original RSC URL remains available through the single internal 200 rule.
 * @param {string} directory
 * @param {{expectedRecords?:number,fileLimit?:number}} [options] */
export function prepareCloudflareAssets(directory,options){
  const plan=planCloudflareAssets(directory,options);
  writeFileSync(plan.redirects,`${marker}\n${catalogPayloadRule}\n${plan.previous}`);
  for(const entry of plan.proof)unlinkSync(join(plan.root,entry.path));
  return plan;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const result=process.argv.includes("--check")?planCloudflareAssets(process.argv[2]||"out"):prepareCloudflareAssets(process.argv[2]||"out");
  console.log(JSON.stringify({before:result.before,after:result.after,duplicates:result.duplicates,fileLimit:result.fileLimit,checkOnly:process.argv.includes("--check")}));
}
