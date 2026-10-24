import { expect, test } from "@playwright/test";
import { spanishReadyPaths } from "../src/lib/spanish-routes";
import { englishSystemPages } from "../src/lib/english-system-pages";
import { spanishSystemPages } from "../src/lib/spanish-system-pages";
import { hasTranslation, languageAlternates, languageHref, siteLocale } from "../src/lib/locales";
import { createCatalogModel } from "../src/lib/catalog-index";
import { slots } from "../src/lib/data";
import { spanishDossierSlugs } from "../src/lib/spanish-dossier-routes";
import { spanishCatalogRecordSlugs } from "../src/lib/spanish-catalog-record-routes";

test("Spanish readiness exposes complete translations and preserves the published game set", () => {
  expect(slots).toHaveLength(100);
  expect(createCatalogModel().items).toHaveLength(1000);
  expect(siteLocale("/es/about")).toBe("es");
  expect(siteLocale("/escalera")).toBe("ru");
  expect(languageHref("/en/about", "es")).toBe("/es/about");
  expect(languageHref("/es/about", "en")).toBe("/en/about");
  expect(languageHref("/es/about", "ru")).toBe("/about");
  expect(languageAlternates("/es/about")).toEqual({ ru: "/about", en: "/en/about", es: "/es/about" });
  expect(hasTranslation("/slots/gates-of-olympus", "es")).toBe(true);
  expect(languageAlternates("/slots/gates-of-olympus")).toHaveProperty("es", "/es/slots/gates-of-olympus");
  expect(languageHref("/slots/gates-of-olympus", "es")).toBe("/es/slots/gates-of-olympus");
  expect(hasTranslation("/slots/not-published", "es")).toBe(false);
  expect(languageAlternates("/slots/not-published")).not.toHaveProperty("es");
  expect(languageHref("/slots/not-published", "es")).toBe("/es");
  for (const [slug, data] of Object.entries(spanishSystemPages)) {
    expect(data.sections).toHaveLength(englishSystemPages[slug].sections.length);
    data.sections.forEach((section, index) => {
      expect(section.text.length).toBeGreaterThan(90);
      expect(section.steps?.length ?? 0).toBe(englishSystemPages[slug].sections[index].steps?.length ?? 0);
    });
  }
});

test("Spanish game coverage matches all 1000 published games without extra routes", () => {
  const items = createCatalogModel().items;
  expect(spanishDossierSlugs).toHaveLength(100);
  expect(spanishCatalogRecordSlugs).toHaveLength(900);
  expect([...spanishDossierSlugs].sort()).toEqual(slots.map(game => game.slug).sort());
  expect([...spanishCatalogRecordSlugs].sort()).toEqual(items.filter(game => game.coverage === "catalog").map(game => game.slug).sort());
  expect(new Set([...spanishDossierSlugs, ...spanishCatalogRecordSlugs]).size).toBe(1000);
  for (const game of items) {
    const path = `/slots/${game.coverage === "catalog" ? "catalog/" : ""}${game.slug}`;
    expect(hasTranslation(path, "es"), path).toBe(true);
    expect(languageAlternates(path), path).toHaveProperty("es", `/es${path}`);
  }
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`complete Spanish foundation pages remain readable at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 1000 });
    // Short recovery/edition utilities have exact route, edition, artwork and
    // keyboard assertions in spanish-completion.spec.ts. Keep the original
    // long-form completeness threshold for all existing foundation pages.
    for (const path of spanishReadyPaths.filter(path => !["/404", "/slots/gates-of-1win", "/slots/1win-bonanza"].includes(path))) {
      const route = path === "/" ? "/es" : `/es${path}`;
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(page.locator("main > div[lang='es']")).toBeVisible();
      await expect(page.locator("header").first()).toHaveAttribute("lang", "es");
      await expect(page.locator("footer")).toHaveAttribute("lang", "es");
      await expect(page.locator("main h1")).toHaveCount(1);
      // Catalogue/search hydrate their results after the shared shell appears.
      // Keep the same completeness threshold, but wait for that content first.
      await expect.poll(async () => (await page.locator("main").innerText()).split(/\s+/).length).toBeGreaterThan(100);
      const text = await page.locator("main").innerText();
      expect(text).not.toMatch(/[А-Яа-яЁё]{3,}/);
      expect(text.split(/\s+/).length).toBeGreaterThan(100);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_ES");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      const spanish = await page.locator('link[rel="alternate"][hreflang="es"]').getAttribute("href");
      expect(spanish).toBe(canonical);
      await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveCount(1);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
      const leaks = await page.locator("main a[href^='/en']").evaluateAll(links => links
        .map(link => `${link.textContent} ${link.getAttribute("aria-label") ?? ""}`)
        .filter(text => !/en inglés/i.test(text)));
      expect(leaks).toEqual([]);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(width + 1);
      if (path === "/" || path === "/about" || path.includes("understanding-rtp")) {
        await page.screenshot({ path: testInfo.outputPath(`${path === "/" ? "home" : path.split("/").pop()}-${width}.png`), fullPage: true });
      }
    }
  });
}

test("Spanish, English and Russian switch between real counterparts and retain query and anchor", async ({ page }) => {
  await page.goto("/en/about?language-check=1#verify");
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/about\/?\?language-check=1#verify$/);
  await expect(page.locator("h1")).toHaveText("Cómo usar Slotfolio");
  expect(await page.evaluate(() => localStorage.getItem("slotfolio-language"))).toBe("es");
  await page.getByRole("link", { name: "RU", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Как пользоваться Slotfolio");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("How to use Slotfolio");
});

test("Spanish browser detection respects unknown links and opens completed legacy counterparts", async ({ browser }) => {
  const context = await browser.newContext({ locale: "es-MX" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/es\/?$/);
  await page.evaluate(() => localStorage.setItem("slotfolio-language", "es"));
  expect(hasTranslation("/slots/not-published", "es")).toBe(false);
  expect(languageHref("/slots/not-published", "es")).toBe("/es");
  expect(languageAlternates("/slots/not-published")).not.toHaveProperty("es");
  expect(hasTranslation("/slots/gates-of-1win", "es")).toBe(true);
  await page.goto("/en/slots/gates-of-1win/");
  await expect(page.locator("h1")).toHaveText("Elige una edición del juego");
  await expect(page).toHaveURL(/\/es\/slots\/gates-of-1win\/?$/);
  await expect(page.locator('link[hreflang="es"]')).toHaveCount(1);
  await expect(page.getByRole("link", { name: "EN", exact: true })).toHaveAttribute("href", /\/en\/slots\/gates-of-1win\/?$/);
  await page.goto("/en/slots/gates-of-olympus/");
  await expect(page).toHaveURL(/\/es\/slots\/gates-of-olympus\/?$/);
  await expect(page.locator("h1")).toHaveText("Gates of Olympus");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/slots\/gates-of-olympus\/?$/);
  expect(await page.evaluate(() => localStorage.getItem("slotfolio-language"))).toBe("en");
  await context.close();
});

test("Spanish choice persists before hydration and explicit language boundaries work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ locale: "ru-RU" });
  await context.route("**/_next/static/chunks/**", route => route.abort());
  const page = await context.newPage();
  await page.goto("/about/");
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Cómo usar Slotfolio");
  expect(await page.evaluate(() => localStorage.getItem("slotfolio-language"))).toBe("es");
  await context.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const plain = await noJs.newPage();
  await plain.goto("/es/about/");
  await expect(plain.locator('main > div[lang="es"]')).toBeVisible();
  await expect(plain.locator('a.skip-link[data-locale="es"]')).toHaveCSS("display", "block");
  await plain.locator('main a[href$="/es/editorial-policy/"]').click();
  await expect(plain.locator("h1")).toHaveText("Cómo comprobamos los datos de los juegos");
  await noJs.close();
});

test("Spanish mobile menu keeps keyboard focus and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/es/about/");
  const button = page.getByRole("button", { name: /^Menú/ });
  await button.focus();
  await button.press("Enter");
  await expect(page.getByRole("button", { name: /^Cerrar/ })).toHaveAttribute("aria-expanded", "true");
  const english = page.getByRole("link", { name: "EN", exact: true });
  await english.focus();
  expect(await english.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
  await english.press("Escape");
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});
