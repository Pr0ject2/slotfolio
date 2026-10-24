import { test, expect } from "@playwright/test";
import { createComparisonIndex } from "../src/lib/catalog-index";
import { createSpanishComparisonIndex } from "../src/lib/spanish-comparison";
import { spanishFullDossiers, spanishMetricLabel } from "../src/lib/spanish-full-dossiers";
import { spanishCatalogFact } from "../src/lib/spanish-catalog-facts";
import { englishComparisonCopy } from "../src/lib/english-comparison-copy";
import copy from "../src/lib/spanish-comparison-copy.json" with {type:"json"};
test("Spanish comparison preserves every existing identity, value, edition and source caveat",()=>{
  const source=createComparisonIndex(),translated=createSpanishComparisonIndex();expect(translated).toHaveLength(100);expect(Object.keys(copy).sort()).toEqual(Object.keys(englishComparisonCopy).sort());
  expect(translated.map(game=>game.slug)).toEqual(source.map(game=>game.slug));
  for(const original of source){const game=translated.find(item=>item.slug===original.slug)!;const text=spanishFullDossiers[game.slug];
    for(const key of ["name","provider","providerSlug","year","image","rtpValue"]as const)expect(game[key]).toEqual(original[key]);
    for(const key of ["rtp","field","volatility"]as const)expect(game[key]).toBe(spanishCatalogFact(original[key]));
    expect(game.mechanics.map(m=>m.slug)).toEqual(original.mechanics.map(m=>m.slug));expect(game.mechanics.map(m=>m.name)).toEqual(original.mechanics.map(m=>spanishCatalogFact(m.name)));expect(game.tags).toEqual(original.tags.map(spanishCatalogFact));
    expect(game.providerQualification).toBe(text.attributionNote);expect(game.feature).toBe(text.feature);expect(game.note).toBe(text.note);
    expect(game.metrics?.maxWin).toBe(original.metrics?.maxWin&&spanishCatalogFact(original.metrics.maxWin));expect(game.metrics?.rtpVariants).toEqual(original.metrics?.rtpVariants?.map(spanishCatalogFact));expect(game.metrics?.note).toBe(original.metrics?text.metricsNote:undefined);if(original.metrics)expect(game.metrics?.maxWinLabel).toBe(spanishMetricLabel(original.metrics.maxWinLabel,"Máximo documentado"));
    expect(JSON.stringify(game)).not.toMatch(/[А-Яа-яЁё]/);
  }
});
for(const width of [320,375,390,768,1024,1440])test(`Spanish comparison keeps both columns keyboard reachable at ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:1000});await page.goto("/es/compare/");await expect(page.locator("h1")).toHaveText("Comparar juegos");await expect(page.locator("html")).toHaveAttribute("lang","es");await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",/\/es\/compare\/?$/);
  const preset=page.locator(".comparison-presets button").first();await preset.focus();await preset.press("Enter");await expect(page.locator(".comparison-selection")).toBeFocused();await expect(page.locator(".comparison-table")).toContainText("Gates of Olympus");await expect(page.locator(".comparison-table")).toContainText("Sweet Bonanza");await expect(page.locator(".comparison-table")).toContainText("Notas de las fuentes");
  for(const img of await page.locator(".comparison-selection img").all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);await expect(img).toHaveAttribute("alt",/^Imagen de /);}
  const scroll=page.getByRole("region",{name:"Tabla comparativa con desplazamiento horizontal",exact:true});await scroll.focus();await expect(scroll).toBeFocused();expect(await scroll.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe("none");if(width<=390){await scroll.press("ArrowRight");await expect.poll(()=>scroll.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);}
  await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);await expect(page.locator('main a[href*="/en/"]')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);await page.screenshot({path:testInfo.outputPath(`comparison-${width}.png`),fullPage:false});
});
test("Spanish comparison supports selection, limits, seed, removal and RU/EN/ES persistence",async({page})=>{
  await page.goto("/es/compare/");for(const slug of ["fury-of-anubis","sweet-bonanza-1000"]){await page.getByLabel("Añadir un juego",{exact:true}).selectOption(slug);await page.getByRole("button",{name:"Añadir",exact:true}).click();}
  await expect(page.getByLabel("Añadir un juego",{exact:true})).toBeDisabled();await expect(page.locator(".comparison-table")).toContainText("6 × 5");await expect(page.locator(".comparison-table")).toContainText(/potencial declarado/i);
  await page.goto("/es/compare/?seed=reactoonz");await expect(page.getByRole("status")).toHaveText("Quita un juego seleccionado antes de añadir este.");await expect(page.locator(".comparison-selection article")).toHaveCount(2);
  for(const locale of ["en",""]){await page.goto(`${locale?"/"+locale:""}/compare/`);await expect(page.locator(".comparison-selection article")).toHaveCount(2);}
  await page.goto("/es/compare/");await page.getByRole("button",{name:"Quitar Sweet Bonanza 1000 de la comparación",exact:true}).click();await expect(page.locator(".comparison-selection article")).toHaveCount(1);await page.goto("/es/compare/?seed=reactoonz");await expect(page.locator(".comparison-selection article")).toHaveCount(2);await expect.poll(()=>new URL(page.url()).searchParams.has("seed")).toBe(false);await page.getByRole("button",{name:"Borrar comparación",exact:true}).click();await expect(page.locator(".comparison-table")).toHaveCount(0);
});
test("every Spanish preset opens the same two published games and focuses their selection",async({page})=>{
  const pairs=[["gates-of-olympus","sweet-bonanza"],["book-of-dead","reactoonz"],["san-quentin-xways","fire-in-the-hole"],["gonzos-quest","gates-of-olympus"],["starburst","book-of-99"],["sugar-rush","jammin-jars"],["wanted-dead-or-a-wild","le-bandit"],["money-train-2","big-bass-bonanza"]];
  await page.goto("/es/compare/");await expect(page.locator(".comparison-presets button")).toHaveCount(8);
  for(const[i,pair]of pairs.entries()){await page.locator(".comparison-presets button").nth(i).click();await expect(page.locator(".comparison-selection")).toBeFocused();expect(await page.locator(".comparison-selection h3 a").evaluateAll(links=>links.map(link=>link.getAttribute("href")))).toEqual(pair.map(slug=>`/es/slots/${slug}/`));}
});
