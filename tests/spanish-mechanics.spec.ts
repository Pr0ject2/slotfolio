import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mechanics, slots, slotMechanics } from "../src/lib/data";
import { mechanicGuides } from "../src/lib/profile-content";
import { spanishMechanic, spanishMechanicSlugs } from "../src/lib/spanish-entities";
import englishCopy from "../src/lib/english-mechanic-copy.json" with {type:"json"};
import spanishCopy from "../src/lib/spanish-mechanic-copy.json" with {type:"json"};
import { languageAlternates } from "../src/lib/locales";

const numbers=(text:string)=>text.match(/\d+(?:[.,]\d+)?/g)??[];
const escapeHtml=(text:string)=>text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");
test("all five Spanish mechanics preserve complete copy, examples, related rules and numbers",()=>{
  expect([...spanishMechanicSlugs].sort()).toEqual(mechanics.map(m=>m.slug).sort());
  for(const slug of spanishMechanicSlugs){
    const m=spanishMechanic(slug)!;const source=mechanicGuides[slug];
    expect(m.example).toBe(source.example);expect(m.related).toEqual(source.related);
    const original=englishCopy[slug as keyof typeof englishCopy];const copy=spanishCopy[slug as keyof typeof spanishCopy];
    expect(Object.keys(copy).sort()).toEqual(Object.keys(original).sort());
    const html=readFileSync(join(process.cwd(),"out/es/mechanics",slug,"index.html"),"utf8");
    for(const key of Object.keys(original) as (keyof typeof original)[]){
      const before=Array.isArray(original[key])?original[key]:[original[key]];
      const after=Array.isArray(copy[key])?copy[key]:[copy[key]];
      expect(after.length,`${slug}.${key}`).toBe(before.length);
      after.forEach((value,i)=>{expect(value,`${slug}.${key}`).not.toMatch(/[А-Яа-яЁё]/);expect(value.length/before[i].length).toBeGreaterThan(.55);expect(value.length/before[i].length).toBeLessThan(2.1);expect(numbers(value)).toEqual(numbers(before[i]));expect(html).toContain(escapeHtml(value));});
    }
    expect(languageAlternates(`/mechanics/${slug}`)).toEqual({ru:`/mechanics/${slug}`,en:`/en/mechanics/${slug}`,es:`/es/mechanics/${slug}`});
    for(const prefix of ["","en/"]){const counterpart=readFileSync(join(process.cwd(),"out",prefix,"mechanics",slug,"index.html"),"utf8");expect(counterpart).toMatch(new RegExp(`hrefLang="es"[^>]+href="[^"]*/es/mechanics/${slug}/?"`));}
  }
});
for(const slug of spanishMechanicSlugs)for(const width of [320,375,390,768,1024,1440]){
  test(`Spanish mechanic ${slug} preserves content and layout at ${width}px`,async({page},testInfo)=>{
    const m=spanishMechanic(slug)!;const original=mechanics.find(item=>item.slug===slug)!;const games=slots.filter(game=>slotMechanics(game).includes(original.name));
    await page.setViewportSize({width,height:1000});expect((await page.goto(`/es/mechanics/${slug}/`))?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang","es");await expect(page.locator("h1")).toHaveText(m.name);
    for(const text of [...m.principle,...m.sequence,...m.watch,m.contrast,m.appeal,m.tradeoff,m.exampleNote])await expect(page.locator("main")).toContainText(text);
    await expect(page.locator("#games .game-row")).toHaveCount(games.length);
    expect(await page.locator("#games .row-main h3 a").evaluateAll(links=>links.map(link=>link.getAttribute("href")))).toEqual(games.map(game=>`/es/slots/${game.slug}/`));
    await page.locator("#example img").scrollIntoViewIfNeeded();
    await expect.poll(()=>page.locator("#example img").evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",new RegExp(`/es/mechanics/${slug}/?$`));
    const leaks=await page.locator('main a[href*="/en/"]').evaluateAll(links=>links.filter(link=>!/en inglés/i.test(link.textContent??"")).map(link=>link.getAttribute("href")));expect(leaks).toEqual([]);
    expect(await page.locator('script[type="application/ld+json"]').evaluateAll(scripts=>scripts.some(script=>JSON.parse(script.textContent!)["@graph"]?.some((item:{inLanguage?:string})=>item.inLanguage==="es")))).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
    if(width===1440){
      const rows=await page.locator("aside.article-toc > a").evaluateAll(links=>links.map(link=>{const box=link.getBoundingClientRect();return {top:box.top,bottom:box.bottom,height:box.height};}));
      expect(rows).toHaveLength(6);rows.forEach((row,i)=>{expect(row.height).toBeGreaterThanOrEqual(44);if(i)expect(row.top).toBeGreaterThanOrEqual(rows[i-1].bottom-1);});
    }
    if(width===320||width===1440){
      if(width===320)for(const img of await page.locator("main img").all()){
        await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
      }
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:testInfo.outputPath(`${slug}-${width}.png`),fullPage:width===320});
    }
  });
}
test("Spanish mechanics remain reachable by keyboard and retain comparison selection",async({page})=>{
  await page.goto("/es/slots/gates-of-olympus/");const entry=page.getByRole("link",{name:"Más sobre cascadas ↗",exact:true});await entry.focus();await entry.press("Enter");await expect(page).toHaveURL(/\/es\/mechanics\/cascades\/?$/);
  const contents=page.locator('aside a[href="#watch"]');await contents.focus();await contents.press("Enter");await expect(page).toHaveURL(/#watch$/);
  const button=page.locator("#example .compare-button");await expect(button).toHaveAccessibleName(/^Añadir/);await button.focus();expect(await button.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");await button.press("Enter");await expect(button).toHaveAttribute("aria-pressed","true");await expect(button).toHaveAccessibleName(/^Quitar/);
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("slotfolio-compare")??"[]"))).toContain("gates-of-olympus");
  await page.goto("/es/compare/");await expect(page.locator("h1")).toHaveText("Comparar juegos");await expect(page.locator(".comparison-selection")).toContainText("Gates of Olympus");
});
