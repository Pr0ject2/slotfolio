import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { englishJournalGuides } from "../src/lib/english-journal-guides";
import { journalGuides } from "../src/lib/journal-guides";
import { spanishJournalGuides } from "../src/lib/spanish-journal-guides";
import { languageAlternates } from "../src/lib/locales";
const numbers=(text:string)=>text.match(/\d+(?:[.,]\d+)?/g)??[];
const escapeHtml=(text:string)=>text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");
test("Spanish journal retains every source paragraph, example, checklist, number and reference",()=>{
  expect(spanishJournalGuides.map(g=>g.slug)).toEqual(englishJournalGuides.map(g=>g.slug));expect([...spanishJournalGuides.map(g=>g.slug)].sort()).toEqual(journalGuides.map(g=>g.slug).sort());
  for(const guide of spanishJournalGuides){
    const original=englishJournalGuides.find(g=>g.slug===guide.slug)!;const html=readFileSync(join(process.cwd(),"out/es/journal",guide.slug,"index.html"),"utf8");
    function check(before:unknown,after:unknown,key:string){
      if(Array.isArray(before)){expect(Array.isArray(after)).toBe(true);expect(after).toHaveLength(before.length);before.forEach((value,i)=>check(value,(after as unknown[])[i],key));}
      else if(before&&typeof before==="object"){expect(Object.keys(after as object).sort()).toEqual(Object.keys(before).sort());for(const[k,value]of Object.entries(before))check(value,(after as Record<string,unknown>)[k],k);}
      else if(typeof before==="string"){expect(typeof after).toBe("string");const translated=after as string;expect(translated).not.toMatch(/[А-Яа-яЁё]/);if(key==="slug"||key==="id")expect(translated).toBe(before);else if(key==="href"){expect(translated).toBe(before.replace(/^\/en(?=\/)/,"/es"));if(translated.startsWith("/"))expect(existsSync(join(process.cwd(),"out",translated.slice(1),"index.html")),translated).toBe(true);}else{expect(numbers(translated)).toEqual(numbers(before));expect(translated.length/before.length).toBeGreaterThan(.55);expect(translated.length/before.length).toBeLessThan(2.3);expect(html).toContain(escapeHtml(translated));}}
    }
    check(original,guide,"");expect(languageAlternates(`/journal/${guide.slug}`)).toEqual({ru:`/journal/${guide.slug}`,en:`/en/journal/${guide.slug}`,es:`/es/journal/${guide.slug}`});
  }
});
test("Spanish cascades feature retains every section, paragraph, table row, source and publication date",()=>{
  const read=(locale:string)=>readFileSync(join(process.cwd(),"out",locale,"journal/how-cascades-work/index.html"),"utf8");const before=read("en"),after=read("es");
  for(const id of ["one-spin","sequence","different","multiplier","rhythm","rules","conclusion"]){const section=new RegExp(`<section id="${id}">([\\s\\S]*?)</section>`);const en=before.match(section)?.[1],es=after.match(section)?.[1];expect(en,id).toBeTruthy();expect(es,id).toBeTruthy();expect(es!.match(/<p(?:\s|>)/g)?.length??0,id).toBe(en!.match(/<p(?:\s|>)/g)?.length??0);const text=(html:string)=>html.replace(/<[^>]+>/g," ").replace(/\s+/g," ");expect(text(es!).length/text(en!).length,id).toBeGreaterThan(.65);}
  for(const source of ["https://www.gamblingcommission.gov.uk/public-and-players/guide/return-to-player-how-much-gaming-machines-payout","https://www.pragmaticplay.com/en/games/sweet-bonanza/","https://www.pragmaticplay.com/en/games/gates-of-olympus/","https://www.playngo.com/games/reactoonz"]){expect(before).toContain(source);expect(after).toContain(source);}
  expect(after).toContain('"datePublished":"2026-09-07"');expect(after).toContain('"inLanguage":"es"');
});
const routes=[...spanishJournalGuides.map(g=>g.slug),"how-cascades-work","understanding-rtp",""];
for(const slug of routes)for(const width of [320,375,390,768,1024,1440])test(`Spanish journal ${slug||"index"} stays complete and readable at ${width}px`,async({page},testInfo)=>{
  const route=`/es/journal${slug?"/"+slug:""}/`;await page.setViewportSize({width,height:1000});expect((await page.goto(route))?.status()).toBe(200);await expect(page.locator("html")).toHaveAttribute("lang","es");await expect(page.locator("main h1")).toHaveCount(1);await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",new RegExp(`/es/journal${slug?"/"+slug:""}/?$`));await expect(page.locator('link[hreflang="es"]')).toHaveCount(1);
  const guide=spanishJournalGuides.find(g=>g.slug===slug);if(guide){await expect(page.locator("h1")).toHaveText(guide.title);for(const section of guide.sections)for(const text of [...section.paragraphs,...(section.checks??[]),...(section.example?[section.example.title,section.example.text]:[])])await expect(page.locator("main")).toContainText(text);}
  if(slug==="how-cascades-work"){await expect(page.locator(".prose > section")).toHaveCount(7);await expect(page.locator("#sequence tbody tr")).toHaveCount(4);await expect(page.locator("#sequence th")).toHaveCount(3);}
  if(guide||slug==="how-cascades-work")expect(await page.locator('script[type="application/ld+json"]').evaluateAll(scripts=>scripts.some(script=>JSON.parse(script.textContent!).inLanguage==="es"))).toBe(true);
  const leaks=await page.locator('main a[href^="/en/"], main a[href^="/slotfolio/en/"]').evaluateAll(links=>links.filter(link=>!/en inglés/i.test(`${link.textContent} ${link.getAttribute("aria-label")??""}`)).map(link=>link.getAttribute("href")));expect(leaks).toEqual([]);
  for(const img of await page.locator("main img").all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
  if(width===320||width===1440){await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:testInfo.outputPath(`${slug||"journal"}-${width}.png`),fullPage:false});}
});
test("Spanish article contents, sources and cascade table remain keyboard accessible",async({page})=>{
  await page.setViewportSize({width:320,height:1000});await page.goto("/es/journal/reading-paytables/");const units=page.locator('nav.article-toc a[href="#units"]');await units.focus();expect(await units.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");await units.press("Enter");await expect(page).toHaveURL(/#units$/);await expect(page.locator("#units")).toContainText("100 − 20 = +80");
  await page.goto("/es/journal/how-cascades-work/");const jump=page.locator('nav.article-toc a[href="#sequence"]');await jump.focus();await jump.press("Enter");await expect(page).toHaveURL(/#sequence$/);const table=page.getByRole("region",{name:"Secuencia de cascadas con desplazamiento horizontal",exact:true});await table.focus();await expect(table).toBeFocused();expect(await table.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");await table.press("ArrowRight");await expect.poll(()=>table.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
  const source=page.locator('#conclusion a[href="https://www.playngo.com/games/reactoonz"]');await expect(source).toHaveAttribute("target","_blank");await expect(source).toHaveAttribute("rel","noopener noreferrer");
});
