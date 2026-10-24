import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { providerProfiles, slots, providerSlug } from "../src/lib/data";
import { providerReadingNotes } from "../src/lib/profile-content";
import { providerReadingNotesV129 } from "../src/lib/provider-reading-v129";
import { spanishProvider, spanishProviderSlugs } from "../src/lib/spanish-entities";
import { spanishProviderRouteSlugs } from "../src/lib/spanish-provider-routes";
import englishCopy from "../src/lib/english-provider-copy.json" with {type:"json"};
import spanishCopy from "../src/lib/spanish-provider-copy.json" with {type:"json"};
import { languageAlternates } from "../src/lib/locales";
const numbers=(text:string)=>text.match(/\d+(?:[.,]\d+)?/g)??[];
const escapeHtml=(text:string)=>text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");
test("all 18 Spanish providers retain complete source copy and reading-note identities",()=>{
  expect([...spanishProviderSlugs].sort()).toEqual(providerProfiles.map(p=>p.slug).sort());
  expect([...spanishProviderRouteSlugs].sort()).toEqual([...spanishProviderSlugs].sort());
  for(const slug of spanishProviderSlugs){
    const original=englishCopy[slug as keyof typeof englishCopy];const copy=spanishCopy[slug as keyof typeof spanishCopy];
    expect(Object.keys(copy).sort()).toEqual(Object.keys(original).sort());
    const html=readFileSync(join(process.cwd(),"out/es/providers",slug,"index.html"),"utf8");
    for(const[key,before]of Object.entries(original)){const after=(copy as Record<string,string>)[key];expect(after).not.toMatch(/[А-Яа-яЁё]/);expect(numbers(after)).toEqual(numbers(before));expect(after.length/before.length).toBeGreaterThan(.55);expect(after.length/before.length).toBeLessThan(2.1);expect(html).toContain(escapeHtml(after));}
    const reading=providerReadingNotesV129[slug]??providerReadingNotes[slug];expect(spanishProvider(slug)?.reading?.compare).toEqual(reading?.compare);
    expect(languageAlternates(`/providers/${slug}`)).toEqual({ru:`/providers/${slug}`,en:`/en/providers/${slug}`,es:`/es/providers/${slug}`});
    for(const prefix of ["","en/"]){const counterpart=readFileSync(join(process.cwd(),"out",prefix,"providers",slug,"index.html"),"utf8");expect(counterpart).toMatch(new RegExp(`hrefLang="es"[^>]+href="[^"]*/es/providers/${slug}/?"`));}
  }
});
for(const [i,slug]of spanishProviderSlugs.entries())for(const width of i===0?[320,375,390,768,1024,1440]:[390]){
  test(`Spanish provider ${slug} retains complete profile and game membership at ${width}px`,async({page},testInfo)=>{
    const p=spanishProvider(slug)!;const games=slots.filter(game=>providerSlug(game.provider)===slug);
    await page.setViewportSize({width,height:1000});expect((await page.goto(`/es/providers/${slug}/`))?.status()).toBe(200);await expect(page.locator("html")).toHaveAttribute("lang","es");await expect(page.locator("h1")).toHaveText(p.name);
    for(const text of [p.profileIntro,p.profileBody,p.signoff,...(p.reading?[p.reading.title,p.reading.text]:[])])await expect(page.locator("main")).toContainText(text);
    await expect(page.locator("#games .game-row")).toHaveCount(games.length);await expect(page.locator(".entity-featured article")).toHaveCount(Math.min(2,games.length));
    expect(await page.locator("#games .row-main h3 a").evaluateAll(links=>links.map(link=>link.getAttribute("href")))).toEqual(games.map(game=>`/es/slots/${game.slug}/`));
    const first=page.locator(".entity-featured img").first();if(games.length){await first.scrollIntoViewIfNeeded();await expect.poll(()=>first.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);}else await expect(page.locator("main")).toContainText("Esta selección no incluye actualmente guías completas de este proveedor.");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",new RegExp(`/es/providers/${slug}/?$`));
    expect(await page.locator('main a[href*="/en/"]').evaluateAll(links=>links.filter(link=>!/en inglés/i.test(link.textContent??"")).map(link=>link.getAttribute("href")))).toEqual([]);
    await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
    if(width===320||width===1440||i===8){await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:testInfo.outputPath(`${slug}-${width}.png`),fullPage:false});}
  });
}
for(const width of [320,375,390,768,1024,1440])test(`Spanish provider index stays readable at ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:1000});await page.goto("/es/providers/");await expect(page.locator(".provider-index-row")).toHaveCount(18);await expect(page.locator("h1")).toHaveText("¿Quién crea los juegos?");expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);if(width===320||width===1440)await page.screenshot({path:testInfo.outputPath(`providers-${width}.png`),fullPage:false});
});
test("Spanish home, guide, provider and catalogue form a working keyboard path",async({page})=>{
  await page.goto("/es/");await expect(page.locator('main a[href^="/en/slots/"]')).toHaveCount(0);const cover=page.locator(".cover-art");await cover.focus();await cover.press("Enter");await expect(page).toHaveURL(/\/es\/slots\/gates-of-olympus\/?$/);
  const profile=page.getByRole("link",{name:"Perfil del proveedor ↗",exact:true});await profile.focus();await profile.press("Enter");await expect(page).toHaveURL(/\/es\/providers\/pragmatic-play\/?$/);
  const catalogue=page.locator(".entity-jump").getByRole("link",{name:"Ver en el catálogo ↗",exact:true});await catalogue.focus();expect(await catalogue.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");await catalogue.press("Enter");await expect(page).toHaveURL(/\/es\/slots\/?\?provider=pragmatic-play$/);await expect(page.locator(".catalog-game").first()).toBeVisible();
});
