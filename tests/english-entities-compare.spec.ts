import { test, expect } from "@playwright/test";
import {
  providerProfiles,
  mechanics,
  slots,
  providerSlug,
  slotMechanics,
} from "../src/lib/data";
import {
  englishProviderSlugs,
  englishMechanicSlugs,
  englishProvider,
  englishMechanic,
} from "../src/lib/english-entities";
import { mechanicGuides } from "../src/lib/profile-content";
import { createComparisonIndex } from "../src/lib/catalog-index";
import { createEnglishComparisonIndex } from "../src/lib/english-comparison";
import { englishFullDossiers } from "../src/lib/english-full-dossiers";
import { englishCatalogFact } from "../src/lib/english-catalog-facts";
import { translatedCounterpart } from "../src/lib/locales";

test("all existing publisher profiles and mechanic guides have complete English counterparts", () => {
  expect(englishProviderSlugs.sort()).toEqual(
    providerProfiles.map((p) => p.slug).sort(),
  );
  expect(englishMechanicSlugs.sort()).toEqual(
    mechanics.map((m) => m.slug).sort(),
  );
  for (const slug of englishProviderSlugs) {
    const p = englishProvider(slug)!;
    for (const field of [
      "catalogSummary",
      "profileIntro",
      "profileBody",
      "signoff",
    ] as const) {
      expect(p[field].length).toBeGreaterThan(40);
      expect(p[field]).not.toMatch(/[А-Яа-яЁё]/);
    }
    expect(translatedCounterpart(`/providers/${slug}`)).toBe(
      `/en/providers/${slug}`,
    );
  }
  for (const slug of englishMechanicSlugs) {
    const m = englishMechanic(slug)!;
    const source = mechanicGuides[slug];
    expect(m.principle).toHaveLength(source.principle.length);
    expect(m.sequence).toHaveLength(source.sequence.length);
    expect(m.watch).toHaveLength(source.watch.length);
    expect(m.example).toBe(source.example);
    expect(m.related).toEqual(source.related);
    for (const value of [
      ...m.principle,
      ...m.sequence,
      ...m.watch,
      m.contrast,
      m.appeal,
      m.tradeoff,
      m.exampleNote,
    ])
      expect(value).not.toMatch(/[А-Яа-яЁё]/);
    expect(translatedCounterpart(`/mechanics/${slug}`)).toBe(
      `/en/mechanics/${slug}`,
    );
  }
});
test("English comparison preserves all 100 identities, factual values, configurations and qualifications", () => {
  const source = createComparisonIndex(),
    translated = createEnglishComparisonIndex();
  expect(translated.map((g) => g.slug)).toEqual(source.map((g) => g.slug));
  expect(translated).toHaveLength(100);
  for (const original of source) {
    const game = translated.find((g) => g.slug === original.slug)!;
    expect(game.providerQualification).toBe(
      englishFullDossiers[game.slug].attributionNote,
    );
    for (const key of [
      "name",
      "provider",
      "providerSlug",
      "year",
      "image",
      "rtpValue",
    ] as const)
      expect(game[key]).toEqual(original[key]);
    for (const key of ["rtp", "field", "volatility"] as const)
      expect(game[key]).toBe(englishCatalogFact(original[key]));
    expect(game.mechanics.map((m) => m.slug)).toEqual(
      original.mechanics.map((m) => m.slug),
    );
    expect(game.tags).toEqual(original.tags.map(englishCatalogFact));
    expect(game.metrics?.maxWin).toBe(
      original.metrics?.maxWin && englishCatalogFact(original.metrics.maxWin),
    );
    expect(game.metrics?.rtpVariants).toEqual(
      original.metrics?.rtpVariants?.map(englishCatalogFact),
    );
    expect(game.metrics?.note).toBe(
      original.metrics ? englishFullDossiers[game.slug].metricsNote : undefined,
    );
    expect(JSON.stringify(game)).not.toMatch(/[А-Яа-яЁё]/);
  }
});
const routes = [
  ...englishProviderSlugs.map((slug) => ({
    route: `providers/${slug}`,
    games: slots.filter((g) => providerSlug(g.provider) === slug),
    heading: englishProvider(slug)!.name,
  })),
  ...englishMechanicSlugs.map((slug) => ({
    route: `mechanics/${slug}`,
    games: slots.filter((g) =>
      slotMechanics(g).includes(mechanics.find((m) => m.slug === slug)!.name),
    ),
    heading: englishMechanic(slug)!.name,
  })),
];
for (const { route, games, heading } of routes) {
  test(`English profile preserves game membership and locale metadata: ${route}`, async ({
    page,
  }) => {
    await page.goto(`/en/${route}/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
    expect(await page.locator("#games .game-row").count()).toBe(games.length);
    if (route.startsWith("providers/")) {
      await expect(page.locator(".entity-featured article")).toHaveCount(
        Math.min(2, games.length),
      );
      await expect(
        page.getByRole("heading", {
          level: 2,
          name:
            games.length === 1 ? "A game example" : "Two examples to compare",
          exact: true,
        }),
      ).toBeVisible();
    }
    expect(
      await page
        .locator("#games .row-main h3 a")
        .evaluateAll((links) => links.map((a) => a.getAttribute("href"))),
    ).toEqual(games.map((g) => `/en/slots/${g.slug}/`));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`/en/${route}/?$`),
    );
    expect(
      await page.locator('meta[name="robots"]').getAttribute("content"),
    ).toContain("noindex");
    await expect(
      page.locator('link[rel="alternate"][hreflang="ru"]'),
    ).toHaveAttribute("href", new RegExp(`/${route}/?$`));
    const graphs = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(
      graphs.some((s) => {
        const j = JSON.parse(s);
        return j["@graph"]?.some(
          (x: {
            inLanguage?: string;
            mainEntity?: { numberOfItems: number };
          }) =>
            x.inLanguage === "en" &&
            x.mainEntity?.numberOfItems === games.length,
        );
      }),
    ).toBe(true);
  });
}
test("English comparison supports picker, presets, removal, seed and RU/EN persistence", async ({
  page,
}) => {
  await page.goto("/en/compare/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Compare games",
  );
  await page
    .getByLabel("Add a game", { exact: true })
    .selectOption("fury-of-anubis");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page
    .getByLabel("Add a game", { exact: true })
    .selectOption("sweet-bonanza-1000");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.locator(".comparison-table")).toContainText(
    "stated potential",
  );
  await expect(page.locator(".comparison-table")).toContainText("6 × 5");
  await expect(
    page.locator(".comparison-table tbody tr").first(),
  ).toContainText("Pragmatic Play");
  await expect(page.locator(".comparison-table")).toContainText("5×6");
  await expect(page.locator(".comparison-table")).toContainText(
    "do not publish RTP or volatility values",
  );
  await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
  await expect(page.getByLabel("Add a game", { exact: true })).toBeDisabled();
  await page.goto("/compare/");
  await expect(page.locator(".comparison-selection article")).toHaveCount(2);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Сравнить игры",
  );
  await page.goto("/en/compare/");
  await page
    .getByRole("button", {
      name: "Remove Sweet Bonanza 1000 from comparison",
      exact: true,
    })
    .click();
  await expect(page.locator(".comparison-selection article")).toHaveCount(1);
  await page.goto("/en/compare/?seed=reactoonz");
  await expect(page.locator(".comparison-selection article")).toHaveCount(2);
  await expect
    .poll(() => new URL(page.url()).searchParams.has("seed"))
    .toBe(false);
  await page
    .getByRole("button", { name: "Clear comparison", exact: true })
    .click();
  await expect(page.locator(".comparison-table")).toHaveCount(0);
  await page.locator(".comparison-presets button").nth(1).click();
  await expect(page.locator(".comparison-selection")).toBeFocused();
  await expect(page.locator(".comparison-table")).toContainText("Book of Dead");
  await expect(page.locator(".comparison-table")).toContainText("Reactoonz");
});
test("English mechanic links keep raw filters while rendering English choices and chips", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/en/mechanics/clusters/");
  await page.locator("#games .section-title a").click();
  await expect
    .poll(() => new URL(page.url()).searchParams.get("mechanic"))
    .toBe("Кластеры");
  await page.locator(".filter-toggle").click();
  await expect(
    page.getByRole("radio", { name: /^Cluster pays/ }),
  ).toBeChecked();
  await expect(page.locator("#catalog-filters")).not.toContainText(
    /[А-Яа-яЁё]/,
  );
  await expect(page.locator(".active-filters")).toContainText("Cluster pays");
  await page.locator("#volatility").selectOption("Высокая");
  await page.locator("#feature").selectOption("Каскады");
  await expect
    .poll(() => new URL(page.url()).searchParams.get("volatility"))
    .toBe("Высокая");
  await expect
    .poll(() => new URL(page.url()).searchParams.get("feature"))
    .toBe("Каскады");
  await expect(page.locator(".active-filters")).toContainText("High");
  await expect(page.locator(".active-filters")).toContainText("Cascades");
  await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
  await expect(page.locator('[data-slot="reactoonz"]')).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(391);
});
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`English profiles and comparison remain usable with keyboard at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "providers",
      "providers/pragmatic-play",
      "mechanics",
      "mechanics/clusters",
      "compare",
    ]) {
      await page.goto(`/en/${route}/`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      if (route === "compare") {
        await page.locator(".comparison-presets button").first().click();
        await expect(page.locator(".comparison-table")).toBeVisible();
        const scroll = page.getByRole("region", {
          name: "Comparison table, scrolls horizontally",
        });
        await page.keyboard.press("Tab");
        await scroll.focus();
        await expect(scroll).toBeFocused();
        expect(
          await scroll.evaluate((e) => getComputedStyle(e).outlineStyle),
        ).not.toBe("none");
        if (width <= 390) {
          await page.keyboard.press("ArrowRight");
          await expect
            .poll(() => scroll.evaluate((e) => e.scrollLeft))
            .toBeGreaterThan(0);
        }
      }
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
      await page.screenshot({
        path: testInfo.outputPath(`${route.replaceAll("/", "-")}-${width}.png`),
        fullPage: true,
      });
    }
    await page.goto("/en/providers/pragmatic-play/");
    const jump = page.locator('.entity-jump a[href="#games"]');
    await expect(page.locator(".entity-profile")).toBeVisible();
    await expect(jump).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.keyboard.press("Tab");
    await jump.focus();
    await expect(jump).toBeFocused();
    expect((await jump.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    if (width <= 390) {
      const heading = (await page
        .locator("#games .section-title h2")
        .boundingBox())!;
      const catalogueLink = (await page
        .locator("#games .section-title .text-link")
        .boundingBox())!;
      expect(heading.y + heading.height).toBeLessThanOrEqual(catalogueLink.y);
      expect(
        (await page.locator(".editorial-signoff p").boundingBox())!.width,
      ).toBeGreaterThanOrEqual(width - 49);
    }
    expect(
      await jump.evaluate((e) => getComputedStyle(e).outlineStyle),
    ).not.toBe("none");
    await page.keyboard.press("Enter");
    await expect.poll(() => new URL(page.url()).hash).toBe("#games");
  });
}
