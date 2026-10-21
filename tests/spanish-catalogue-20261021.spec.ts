import { expect, test } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";
import { spanishCatalogFact } from "../src/lib/spanish-catalog-facts";
import { catalogItemMatchesSearch, normalizeCatalogSearch } from "../src/lib/catalog-query";
import { hasEnglishDossier } from "../src/lib/english-dossier-routes";
import { hasEnglishCatalogRecord } from "../src/lib/english-catalog-record-routes";

test("Spanish catalogue translates labels without inventing facts or changing the game set", () => {
  const { items, facets } = createCatalogModel();
  expect(items).toHaveLength(1000);
  expect(items.filter(item => item.coverage === "dossier")).toHaveLength(100);
  expect(new Set(items.map(item => item.slug)).size).toBe(1000);
  expect(spanishCatalogFact("")).toBe("");
  expect(spanishCatalogFact("96.50%")).toBe("96,50%");
  expect(spanishCatalogFact("29.10.2020")).toBe("29.10.2020");
  expect(spanishCatalogFact("Megaways")).toBe("Megaways");
  expect(spanishCatalogFact("Hold and Win")).toBe("Hold and Win");
  expect(spanishCatalogFact("Not published")).toBe("No publicado");
  expect(spanishCatalogFact("Not recorded")).toBe("Sin dato confirmado");
  const untranslated = new Set<string>();
  for (const item of items) {
    expect(item.coverage === "dossier" ? hasEnglishDossier(item.slug) : hasEnglishCatalogRecord(item.slug), item.slug).toBe(true);
    for (const value of [item.field, item.gameType, item.verifiedRtp, item.maxWin, item.volatility, item.verifiedVolatility, ...item.mechanics, ...item.tags]) {
      const translated = spanishCatalogFact(value);
      if (/[А-Яа-яЁё]/.test(translated)) untranslated.add(`${value} => ${translated}`);
      expect(translated.match(/\d+/g), value).toEqual(value.match(/\d+/g));
    }
  }
  for (const facet of [...facets.mechanics, ...facets.features, ...facets.volatility]) {
    if (/[А-Яа-яЁё]/.test(spanishCatalogFact(facet.name))) untranslated.add(facet.name);
  }
  expect([...untranslated]).toEqual([]);
});

test("Spanish searches use the same existing mechanics as English aliases", () => {
  const { items } = createCatalogModel();
  for (const [es, en] of [["cascadas", "cascades"], ["comodín", "wild"], ["comodin", "wild"], ["comodines", "wild"], ["giros gratis", "free spins"], ["formas de ganar", "ways"], ["botes", "jackpot"]]) {
    const matches = (query: string) => items.filter(item => catalogItemMatchesSearch(item, query)).map(item => item.slug);
    expect(matches(es), es).toEqual(matches(en));
    expect(matches(es).length).toBeGreaterThan(0);
  }
  expect(normalizeCatalogSearch("comodín")).toBe("comodin");
  expect(normalizeCatalogSearch("й ё")).toBe("й е");
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`Spanish catalogue and search support list and covers at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/es/slots/", "/es/search/"]) {
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(page.getByRole("searchbox", { name: "Buscar un juego" })).toBeVisible();
      await expect(page.locator(".results-count")).toHaveText("1000 juegos");
      await expect(page.locator(".catalog-game")).toHaveCount(18);
      for (const view of ["list", "covers"]) {
        await page.getByRole("button", { name: view === "list" ? "Vista de lista" : "Vista de portadas", exact: true }).click();
        await expect(page.locator(".catalog-results")).toHaveClass(new RegExp(view));
        await page.locator(".catalog-game img").evaluateAll(images => images.forEach(image => { (image as HTMLImageElement).loading = "eager"; }));
        await expect.poll(() => page.locator(".catalog-game img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
        expect(await page.locator("main").innerText()).not.toMatch(/[А-Яа-яЁё]{3,}/);
        const unmarked = await page.locator("main a[href*='/en/slots/']").evaluateAll(links => links.filter(link => !/en inglés/i.test(`${link.textContent} ${link.getAttribute("aria-label") ?? ""}`)).map(link => link.getAttribute("href")));
        expect(unmarked).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
        await page.locator(".results-toolbar").scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`${route.includes("search") ? "search" : "catalogue"}-${view}-${width}.png`) });
      }
    }
  });
}

test("Spanish filters, pagination, URL state and empty results remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es/slots/");
  await page.locator(".filter-toggle").click();
  await expect(page.locator(".filter-toggle")).toHaveAttribute("aria-expanded", "true");
  await page.getByLabel("Proveedor", { exact: true }).selectOption("pragmatic-play");
  await page.getByLabel("RTP (orientativo)", { exact: true }).selectOption("96");
  await page.getByRole("button", { name: /^Ver resultados/ }).click();
  await expect(page.locator(".filter-toggle")).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".results-count")).toHaveText(/Encontrados \d+ de 1000/);
  await expect(page).toHaveURL(/provider=pragmatic-play.*rtp=96/);
  await page.getByRole("button", { name: "Borrar todos", exact: true }).click();
  await expect(page.locator(".results-count")).toHaveText("1000 juegos");
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.locator(".catalog-game").first()).toHaveAttribute("data-card-number", "19");
  await page.goBack();
  await expect(page.locator(".catalog-game").first()).toHaveAttribute("data-card-number", "1");
  await page.getByRole("searchbox", { name: "Buscar un juego" }).fill("ningun-juego-xyz-987654");
  await expect(page.getByRole("heading", { name: "No hay juegos que coincidan" })).toBeVisible();
  await page.getByRole("button", { name: "Ver todos los juegos", exact: true }).click();
  await expect(page.locator(".results-count")).toHaveText("1000 juegos");
  await page.getByLabel("Ordenar juegos", { exact: true }).selectOption("name");
  await expect(page).toHaveURL(/sort=name/);
  await page.reload();
  await expect(page.getByLabel("Ordenar juegos", { exact: true })).toHaveValue("name");
});

test("Spanish search and comparison controls work with the keyboard", async ({ page }) => {
  await page.goto("/es/search/?q=cascadas");
  await expect(page.getByRole("searchbox", { name: "Buscar un juego" })).toHaveValue("cascadas");
  await expect(page.locator(".results-count")).toHaveText(/Encontrados [1-9]\d* de 1000/);
  const card = page.locator('.catalog-game[data-coverage="dossier"]').first();
  const button = card.getByRole("button", { name: /^Añadir/ });
  await button.focus();
  await expect(button).toBeFocused();
  expect(await button.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(card.getByRole("button", { name: /^Quitar/ })).toContainText("Seleccionado");
  await page.reload();
  await expect(card.getByRole("button", { name: /^Quitar/ })).toBeVisible();
  await card.getByRole("button", { name: /^Quitar/ }).click();
  await expect(card.getByRole("button", { name: /^Añadir/ })).toBeVisible();
});
