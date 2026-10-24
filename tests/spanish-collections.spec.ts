import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gameCollections } from "../src/lib/collections";
import { englishGameCollections } from "../src/lib/english-game-collections";
import { spanishGameCollections } from "../src/lib/spanish-game-collections";
import { languageAlternates } from "../src/lib/locales";
const numbers=(text:string)=>text.match(/\d+(?:[.,]\d+)?/g)??[];
const escapeHtml=(text:string)=>text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");
test("Spanish selections preserve every game, explanation, check and source number",()=>{
  expect(spanishGameCollections.map(c=>c.slug)).toEqual(gameCollections.map(c=>c.slug));
  for(const collection of spanishGameCollections){
    const original=englishGameCollections.find(c=>c.slug===collection.slug)!;
    expect(collection.games.map(g=>g.slug)).toEqual(gameCollections.find(c=>c.slug===collection.slug)!.games.map(g=>g.slug));
    const html=readFileSync(join(process.cwd(),"out/es/collections",collection.slug,"index.html"),"utf8");
    function check(before:unknown,after:unknown,key:string){
      if(Array.isArray(before)){expect(Array.isArray(after)).toBe(true);expect(after).toHaveLength(before.length);before.forEach((value,i)=>check(value,(after as unknown[])[i],key));}
      else if(before&&typeof before==="object"){expect(Object.keys(after as object).sort()).toEqual(Object.keys(before).sort());for(const[k,value]of Object.entries(before))check(value,(after as Record<string,unknown>)[k],k);}
      else if(typeof before==="string"){expect(typeof after).toBe("string");const translated=after as string;expect(translated).not.toMatch(/[А-Яа-яЁё]/);if(key==="slug")expect(translated).toBe(before);else{expect(numbers(translated)).toEqual(numbers(before));expect(translated.length/before.length).toBeGreaterThan(.55);expect(translated.length/before.length).toBeLessThan(2.3);if(key!=="question")expect(html).toContain(escapeHtml(translated));}}
    }
    check(original,collection,"");expect(languageAlternates(`/collections/${collection.slug}`)).toEqual({ru:`/collections/${collection.slug}`,en:`/en/collections/${collection.slug}`,es:`/es/collections/${collection.slug}`});
  }
});
for(const slug of ["",...spanishGameCollections.map(c=>c.slug)])for(const width of [320,375,390,768,1024,1440])test(`Spanish selection ${slug||"index"} is complete and readable at ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:1000});expect((await page.goto(`/es/collections/${slug?slug+"/":""}`))?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang","es");await expect(page.locator("main h1")).toHaveCount(1);await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);await expect(page.locator('link[hreflang="es"]')).toHaveCount(1);
  const collection=spanishGameCollections.find(c=>c.slug===slug);
  if(collection){await expect(page.locator("h1")).toHaveText(collection.title);await expect(page.locator(".collection-entry")).toHaveCount(collection.games.length);for(const entry of collection.games){await expect(page.locator("main")).toContainText(entry.note);await expect(page.locator("main")).toContainText(entry.check);await expect(page.locator(`.collection-entry h2 a[href="/es/slots/${entry.slug}/"],.collection-entry h2 a[href="/es/slots/${entry.slug}"]`)).toHaveCount(1);}for(const item of collection.checklist)await expect(page.locator("main")).toContainText(item);
    expect(await page.locator('script[type="application/ld+json"]').evaluateAll(scripts=>scripts.some(s=>JSON.parse(s.textContent!).inLanguage==="es"))).toBe(true);
  }else for(const item of spanishGameCollections){await expect(page.locator("main")).toContainText(item.question);await expect(page.locator(`article#${item.slug}`)).toHaveCount(1);}
  await expect(page.locator('main a[href^="/en/"]')).toHaveCount(0);
  for(const img of await page.locator("main img").all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
  if(width===320||width===1440){await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:testInfo.outputPath(`${slug||"collections"}-${width}.png`),fullPage:false});}
});
test("Spanish selections support keyboard navigation and comparison",async({page})=>{
  await page.setViewportSize({width:320,height:1000});await page.goto("/es/collections/");const link=page.getByRole("link",{name:"Explorar esta selección ↗"}).first();await link.focus();expect(await link.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");await link.press("Enter");await expect(page).toHaveURL(/\/es\/collections\/beyond-lines\/?$/);
  const buttons=page.locator(".compare-button");await buttons.nth(0).focus();await buttons.nth(0).press("Enter");await buttons.nth(1).focus();await buttons.nth(1).press("Enter");const compare=page.getByRole("link",{name:"tabla comparativa",exact:true});await compare.focus();await compare.press("Enter");await expect(page).toHaveURL(/\/es\/compare\/?$/);await expect(page.locator(".comparison-selection article")).toHaveCount(2);
});

