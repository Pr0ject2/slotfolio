import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { languageAlternates } from "../src/lib/locales";
const routes=["bonuses","regions","regions/great-britain"];
test("Spanish practical guides retain all source sections, paragraphs, examples and official references",()=>{
  for(const route of routes){
    const read=(locale:string)=>readFileSync(join(process.cwd(),"out",locale,route,"index.html"),"utf8");const en=read("en"),es=read("es");
    for(const tag of ["section","h2","tbody","tr"]){const pattern=new RegExp(`<${tag}(?:\\s|>)`,"g");expect(es.match(pattern)?.length??0,`${route} ${tag}`).toBe(en.match(pattern)?.length??0);}
    const sections=[...en.matchAll(/<section id="([^"]+)">([\s\S]*?)<\/section>/g)];for(const section of sections){const translated=es.match(new RegExp(`<section id="${section[1]}">([\\s\\S]*?)</section>`))?.[1];expect(translated,`${route} ${section[1]}`).toBeTruthy();expect(translated!.match(/<p(?:\s|>)/g)?.length??0).toBe(section[2].match(/<p(?:\s|>)/g)?.length??0);const text=(value:string)=>value.replace(/<[^>]+>/g," ");expect(text(translated!).length/text(section[2]).length).toBeGreaterThan(.65);}
    const sources=(html:string)=>[...html.matchAll(/href="(https:\/\/www\.gamblingcommission\.gov\.uk[^"<]+)"/g)].map(m=>m[1]);expect(sources(es)).toEqual(sources(en));expect(languageAlternates(`/${route}`)).toEqual({ru:`/${route}`,en:`/en/${route}`,es:`/es/${route}`});
  }
  const bonus=readFileSync(join(process.cwd(),"out/es/bonuses/index.html"),"utf8");for(const value of ["100 unidades","10×","1,000 unidades","no es una oferta vigente","no de un depósito adicional","No está garantizado"])expect(bonus).toContain(value);
});
for(const route of routes)for(const width of [320,375,390,768,1024,1440])test(`Spanish practical ${route} is readable at ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:1000});expect((await page.goto(`/es/${route}/`))?.status()).toBe(200);await expect(page.locator("html")).toHaveAttribute("lang","es");await expect(page.locator("main h1")).toHaveCount(1);await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);await expect(page.locator('main a[href^="/en/"]')).toHaveCount(0);await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);await expect(page.locator('link[hreflang="es"]')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
  if(route==="regions/great-britain"){await expect(page.locator("tbody tr")).toHaveCount(5);await expect(page.locator("main")).toContainText("Irlanda del Norte");await expect(page.locator("main")).toContainText("no garantiza");for(const source of await page.locator('main a[href^="https://"]').all()){await expect(source).toHaveAttribute("target","_blank");await expect(source).toHaveAttribute("rel","noopener noreferrer");}}
  if(width===320||width===1440)await page.screenshot({path:testInfo.outputPath(`${route.replaceAll("/","-")}-${width}.png`),fullPage:false});
});
test("Spanish practical guide anchors, country selection and table are keyboard accessible",async({page})=>{
  await page.setViewportSize({width:320,height:1000});await page.goto("/es/bonuses/");const anchor=page.locator('nav.article-toc a[href="#limits"]');await anchor.focus();expect(await anchor.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");await anchor.press("Enter");await expect(page).toHaveURL(/#limits$/);
  await page.goto("/es/regions/");const country=page.locator('.hub-list a[href$="/regions/great-britain/"]');await country.focus();await country.press("Enter");await expect(page).toHaveURL(/\/es\/regions\/great-britain\/?$/);const table=page.getByRole("region",{name:"Comprobaciones del operador, tabla con desplazamiento horizontal"});await table.focus();await expect(table).toBeFocused();expect(await table.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");const scrollable=await table.evaluate(el=>el.scrollWidth>el.clientWidth);if(scrollable){await table.press("ArrowRight");await expect.poll(()=>table.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);}
});
