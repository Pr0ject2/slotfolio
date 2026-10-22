import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { slots, relatedSlots, slotMechanics } from "../src/lib/data";
import { getVerifiedSlotMetrics, slotFeatureCards } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";
import { englishFullDossiers, englishDossierFeatureCards } from "../src/lib/english-full-dossiers";
import { spanishFullDossiers, spanishDossierFeatureCards, spanishMechanicExplanations, spanishMetricLabel, spanishReleaseDate } from "../src/lib/spanish-full-dossiers";
import { spanishDossierSlugs, hasSpanishDossier } from "../src/lib/spanish-dossier-routes";
import { spanishCatalogFact } from "../src/lib/spanish-catalog-facts";
import { hasTranslation, languageAlternates } from "../src/lib/locales";
import hashes from "../src/lib/spanish-full-dossier-source-hashes.json" with { type: "json" };

const numbers = (text: string) => text.replace(/(\d)[ ,\u00a0](?=\d{3}(?:\D|$))/g, "$1").match(/\d+(?:[.,]\d+)?/g)?.map(n => n.replace(",", ".")) ?? [];
const escapeHtml = (text: string) => text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");

test("complete Spanish dossiers preserve all existing content, numbers, caveats and source fingerprints", () => {
  expect(slots).toHaveLength(100);
  expect(Object.keys(spanishFullDossiers).sort()).toEqual([...spanishDossierSlugs].sort());
  expect(Object.keys(hashes).sort()).toEqual([...spanishDossierSlugs].sort());
  for (const slug of spanishDossierSlugs) {
    const game = slots.find(game => game.slug === slug)!;
    expect(game, slug).toBeTruthy();
    const source = englishFullDossiers[slug], copy = spanishFullDossiers[slug];
    const enCards = englishDossierFeatureCards(game), esCards = spanishDossierFeatureCards(game);
    const completeSource = {...source, cards: enCards.map(({title,text})=>({title,text}))};
    expect(createHash("sha256").update(JSON.stringify(completeSource)).digest("hex"), slug).toBe((hashes as Record<string,string>)[slug]);
    expect(esCards).toHaveLength(slotFeatureCards(game).length);
    expect(Boolean(copy.metricsNote)).toBe(Boolean(source.metricsNote));
    expect(Boolean(copy.attributionNote)).toBe(Boolean(source.attributionNote));
    expect(copy.additionalSourceLabels?.length ?? 0).toBe(source.additionalSourceLabels?.length ?? 0);
    const pairs = [
      ...(["description","feature","note","metricsNote","releaseDate","attributionNote","passportSourceLabel"] as const).filter(key => source[key]).map(key => [source[key]!, copy[key]!]),
      ...(source.additionalSourceLabels ?? []).map((text,index) => [text,copy.additionalSourceLabels![index]]),
      ...enCards.flatMap((card,index) => [[card.title,esCards[index].title],[card.text,esCards[index].text]]),
    ];
    const html = readFileSync(join(process.cwd(),"out/es/slots",slug,"index.html"),"utf8");
    for (const [en,es] of pairs) {
      expect(es,slug).toBeTruthy(); expect(es,slug).not.toMatch(/[А-Яа-яЁё]/);
      expect(numbers(es),`${slug}: ${es}`).toEqual(numbers(en));
      expect(es.length/en.length,slug).toBeGreaterThan(0.55);
      expect(es.length/en.length,slug).toBeLessThan(2.1);
      if (en.length>60) expect(es,slug).not.toBe(en);
      expect(html,`${slug}: missing translated content`).toContain(escapeHtml(es));
    }
    for (const name of slotMechanics(game)) expect(html).toContain(escapeHtml(spanishMechanicExplanations[name]));
    expect(hasTranslation(`/slots/${slug}`,"es")).toBe(true);
    expect(languageAlternates(`/slots/${slug}`)).toEqual({ru:`/slots/${slug}`,en:`/en/slots/${slug}`,es:`/es/slots/${slug}`});
    for (const prefix of ["", "en/"]) {
      const counterpart=readFileSync(join(process.cwd(),"out",prefix,"slots",slug,"index.html"),"utf8");
      expect(counterpart).toMatch(new RegExp(`hrefLang="es"[^>]+href="[^"]*/es/slots/${slug}/?"`));
    }
  }
});

// Preserve the original six-width matrix for all five template representatives.
// Further copy-only records each get a browser check at 390px and full export checks.
for (const [index,slug] of spanishDossierSlugs.entries()) for (const width of index<5 ? [320,375,390,768,1024,1440] : [390]) {
  test(`complete ES dossier ${slug} at ${width}px`, async ({page},testInfo) => {
    const game=slots.find(game=>game.slug===slug)!, copy=spanishFullDossiers[slug];
    const verified=getVerifiedSlotMetrics(slug), passport=getVerifiedSlotPassport(slug);
    await page.setViewportSize({width,height:1000});
    expect((await page.goto(`/es/slots/${slug}/`))?.status()).toBe(200);
    await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator("html")).toHaveAttribute("lang","es");
    await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
    await expect(page.locator("h1")).toHaveText(game.name);
    await expect(page.locator(".slot-deck")).toHaveText(copy.description);
    await expect(page.locator("#rules")).toContainText(copy.feature);
    await expect(page.locator("#perspective blockquote")).toHaveText(copy.note);
    await expect(page.locator("#feature .dossier-feature-card p")).toHaveText(copy.cards.map(card=>card.text));
    for (const value of [game.field,game.rtp,game.volatility,verified?.maxWin,verified?.observedWin].filter(Boolean)) await expect(page.locator(".facts")).toContainText(spanishCatalogFact(value!));
    if (passport) { await expect(page.locator(".facts")).toContainText(copy.releaseDate ?? spanishReleaseDate(passport.releaseDate)); await expect(page.locator(".facts")).toContainText(spanishCatalogFact(passport.gameType)); }
    if (verified?.maxWin) await expect(page.locator(".facts dt").filter({hasText:spanishMetricLabel(verified.maxWinLabel,"Máximo documentado")})).toHaveCount(1);
    if (verified?.observedWin) await expect(page.locator(".facts dt").filter({hasText:spanishMetricLabel(verified.observedWinLabel,"Premio observado")})).toHaveCount(1);
    if (verified?.note) await expect(page.locator(".metric-caveat")).toHaveText(copy.metricsNote!);
    const sources = new Set([game.source,passport?.source,verified?.source,...(verified?.additionalSources??[]).map(source=>source.url)].filter(Boolean));
    const rendered=await page.locator("#source a[href^='https://']").evaluateAll(links=>links.map(link=>link.getAttribute("href")));
    expect([...new Set(rendered)].sort()).toEqual([...sources].sort());
    const casino=page.locator('[data-slot-casino-link="es"]');
    await expect(casino).toHaveCount(1);
    expect(await casino.evaluate(el=>el.nextElementSibling?.matches("dl.facts"))).toBe(true);
    await expect(casino.getByRole("link")).toHaveAttribute("href","https://viazento.link/slotfolio");
    await expect(casino.getByRole("link")).toHaveAttribute("target","_blank");
    await expect(casino.getByRole("link")).toHaveAttribute("rel","sponsored nofollow noopener noreferrer");
    await expect(page.locator("#faq details")).toHaveCount(3);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",new RegExp(`/es/slots/${slug}/?$`));
    await expect.poll(()=>page.locator(".slot-figure img").evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0&&!img.currentSrc.endsWith("unavailable.svg"))).toBe(true);
    await expect(page.locator(".slot-figure img")).toHaveAttribute("alt",`Imagen de ${game.name}`);
    const leaks=await page.locator('main a[href^="/en/"], main a[href^="/slotfolio/en/"]').evaluateAll(links=>links.filter(link=>!/en inglés/i.test(`${link.textContent} ${link.getAttribute("aria-label")??""}`)).map(link=>link.getAttribute("href")));
    expect(leaks).toEqual([]);
    for (const item of relatedSlots(game,3)) await expect(page.locator("#related").getByRole("link",{name:`Abrir ${item.name}${hasSpanishDossier(item.slug)?"":" (en inglés)"}`,exact:true})).toHaveAttribute("href",new RegExp(`/${hasSpanishDossier(item.slug)?"es":"en"}/slots/${item.slug}/?$`));
    expect(await page.locator('script[type="application/ld+json"]').evaluateAll(scripts=>scripts.some(script=>{const data=JSON.parse(script.textContent!);return data["@type"]==="Article"&&data.inLanguage==="es";}))).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
    if (slug==="gates-of-olympus" || width===390) await page.screenshot({path:testInfo.outputPath(`${slug}-${width}.png`),fullPage:width<=390});
  });
}

test("Spanish dossiers stay reachable through catalogue, language links and keyboard controls", async ({page}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator,"clipboard",{value:{writeText:async(value:string)=>{(window as Window & {copiedPromo?:string}).copiedPromo=value;}}});
  });
  await page.setViewportSize({width:390,height:1000});
  await page.goto("/es/slots/?q=Gates%20of%20Olympus");
  const card=page.locator('[data-slot="gates-of-olympus"]');
  await expect(card.locator("h2 a")).toHaveAttribute("href",/\/es\/slots\/gates-of-olympus\/?$/);
  await expect(card).not.toContainText("Ficha del juego en inglés");
  await card.locator("h2 a").click();
  await expect(page).toHaveURL(/\/es\/slots\/gates-of-olympus\/?$/);
  const faq=page.locator("#faq summary").first();
  await faq.focus(); await expect(faq).toBeFocused();
  await faq.press("Enter"); await expect(page.locator("#faq details").first()).toHaveAttribute("open","");
  const link=page.locator('[data-slot-casino-link="es"] a');
  await link.focus(); await expect(link).toBeFocused();
  const focus=await link.evaluate(el=>({outline:getComputedStyle(el).outlineStyle,shadow:getComputedStyle(el).boxShadow}));
  expect(focus.outline!=="none"||focus.shadow!=="none").toBe(true);
  const copy=page.getByRole("button",{name:"Copiar el código promocional 3DDD",exact:true});
  await copy.focus(); await expect(copy).toBeFocused();
  await copy.press("Enter");
  await expect.poll(()=>page.evaluate(()=>(window as Window & {copiedPromo?:string}).copiedPromo)).toBe("3DDD");
  await expect(copy).toHaveText("Copiado");
  await expect(page.locator('[data-slot-casino-link="es"] [role="status"]')).toHaveText("Código promocional 3DDD copiado.");
});
