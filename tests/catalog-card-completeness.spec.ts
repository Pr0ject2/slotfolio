import { test, expect } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

const model = createCatalogModel();

test("catalog model exposes verified technical data to cards without promoting filter fields", () => {
  expect(model.items).toHaveLength(1000);
  expect(model.items.filter((item) => item.coverage === "dossier")).toHaveLength(100);
  expect(model.items.filter((item) => item.coverage === "catalog")).toHaveLength(900);

  const wazdan = model.items.find((item) => item.slug === "wazdan-mayan-ritual");
  expect(wazdan).toBeTruthy();
  expect(wazdan?.coverage).toBe("catalog");
  expect(wazdan?.field).toBe("5 барабанов · 40 линий");
  expect(wazdan?.verifiedRtp).toBe("96,29%");
  expect(wazdan?.verifiedVolatility).toBe("Низкая–средняя");
  expect(wazdan?.maxWin).toBe("850x");
  expect(wazdan?.releaseDate).toBe("2018-09-03");
  expect(wazdan?.year).toBeNull();
  expect(wazdan?.rtp).toBe("");
  expect(wazdan?.rtpValue).toBeNull();
  expect(wazdan?.volatility).toBe("");
  expect(wazdan?.verifiedFacts).toBeGreaterThanOrEqual(5);

  const threeOaks = model.items.find((item) => item.slug === "3-oaks-gaming-dancing-joker");
  expect(threeOaks).toBeTruthy();
  expect(threeOaks?.field).toBe("5×3 · 40 линий");
  expect(threeOaks?.releaseDate).toMatch(/^2025-05(?:$|-)/);
  expect(threeOaks?.verifiedRtp).toBeTruthy();
  expect(threeOaks?.maxWin).toBeTruthy();
  expect(threeOaks?.verifiedVolatility).toBeTruthy();
  expect(threeOaks?.mechanics).toContain("Линии");
  expect(threeOaks?.verifiedFacts).toBeGreaterThanOrEqual(6);

  const minimal = model.items.find((item) => item.slug === "playn-go-rally-4-riches");
  expect(minimal).toBeTruthy();
  expect(minimal?.verifiedFacts).toBeGreaterThanOrEqual(3);
  expect(minimal?.gameType).toBe("Video Slot");
  expect(minimal?.mechanics).toContain("Линии");
  expect(minimal?.releaseDate).toBe("2020-06-11");
});

test("catalog card presents every available passport value without workflow status", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/slots?q=Mayan%20Ritual");
  await page.waitForLoadState("networkidle");

  const card = page.locator('.catalog-game[data-coverage="catalog"]').filter({ hasText: "Mayan Ritual" });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Mayan Ritual");
  await expect(card).toContainText("Wazdan / 2018");
  await expect(card).toContainText("5 барабанов · 40 линий");
  await expect(card).toContainText("96,29%");
  await expect(card).toContainText("850x");
  await expect(card).toContainText("Низкая–средняя");
  await expect(card).toContainText("03.09.2018");
  await expect(card.locator("dd").filter({ hasText: /^—$/ })).toHaveCount(0);
  await expect(card).not.toContainText("Проверено");
  await expect(card).not.toContainText("не подтвержден");
  await expect(card).not.toContainText("обложка на проверке");
  await expect(card).not.toContainText("undefined");
  await expect(card).not.toContainText("null");
});

test("minimal catalog record still looks finished without invented facts or research notes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/slots?q=Rally%204%20Riches");
  await page.waitForLoadState("networkidle");

  const card = page.locator('.catalog-game[data-coverage="catalog"]').filter({ hasText: "Rally 4 Riches" });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Rally 4 Riches");
  await expect(card).toContainText("Видеослот");
  await expect(card).toContainText("Линии");
  await expect(card).toContainText("11.06.2020");
  await expect(card.locator("dd").filter({ hasText: /^—$/ })).toHaveCount(0);
  await expect(card).not.toContainText("не подтвержден");
  await expect(card).not.toContainText("уточняется");
  await expect(card.getByRole("button", { name: /сравнен/ })).toHaveCount(0);
  await expect(card.getByText("Подробнее об игре ↗", { exact: true })).toHaveCount(1);
  await expect(card).not.toContainText("undefined");
  await expect(card).not.toContainText("null");
});

test("cover view uses readable full-width cards at 390px and two columns at 600px", async ({ page }) => {
  for (const width of [390, 600]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/slots?provider=wazdan&view=covers");
    await page.waitForLoadState("networkidle");

    const cards = page.locator(".catalog-results.covers .catalog-game");
    await expect(cards).toHaveCount(18);
    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    expect(first, `first card at ${width}px`).toBeTruthy();
    expect(second, `second card at ${width}px`).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `no overflow at ${width}px`).toBe(true);

    if (width === 390) {
      // Narrow phones need space for real provider and RTP data, not 130px tiles.
      expect(first!.width).toBeGreaterThan(290);
      expect(Math.abs(first!.x - second!.x)).toBeLessThan(4);
      expect(second!.y).toBeGreaterThanOrEqual(first!.y + first!.height - 2);
    } else {
      // Preserve a useful compact grid as soon as the viewport is wide enough.
      expect(Math.abs(first!.y - second!.y)).toBeLessThan(4);
      expect(second!.x).toBeGreaterThan(first!.x + first!.width - 4);
    }

    const facts = cards.first().locator('dl[aria-label="Характеристики"] dd');
    expect(await facts.count()).toBeGreaterThan(0);
    const minFont = await facts.evaluateAll((els) =>
      Math.min(...els.map((el) => parseFloat(getComputedStyle(el).fontSize))),
    );
    expect(minFont).toBeGreaterThanOrEqual(12);
  }
});

for (const width of [320, 390, 1440]) {
  test(`completed 3 Oaks passport renders all core facts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/slots?q=Dancing%20Joker');
    const card = page.locator('.catalog-game[data-coverage="catalog"]');
    await expect(card).toHaveCount(1);
    await expect(card.locator('dl')).toContainText('5×3 · 40 линий');
    await expect(card.locator('dl')).toContainText(/(?:01\.05\.2025|05\.2025)/);
    for (const label of ['RTP', 'Макс.', 'Волат.']) {
      await expect(card.locator('dt').filter({ hasText: new RegExp(`^${label.replace('.', '\\.')}$`) })).toHaveCount(1);
    }
    await expect(card.locator('dd').filter({ hasText: /^—$/ })).toHaveCount(0);
    await expect(card).not.toContainText('не подтвержден');
    await expect(card).not.toContainText('уточняется');
    await expect(card.getByRole('button', { name: /сравнен/ })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("catalog list keeps approved artwork compact beside the card data", async ({ page }) => {
  for (const width of [320, 375, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/slots?q=3%20Coin%20Volcanoes");
    await page.evaluate(() => document.fonts.ready);

    const card = page.locator('[data-slot="3-oaks-gaming-3-coin-volcanoes"]');
    const art = card.locator(".catalog-game-art");
    const heading = card.getByRole("heading", { name: "3 Coin Volcanoes", exact: true });
    const facts = card.locator('dl[aria-label="Характеристики"]');
    await expect(art).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(facts).toBeVisible();

    // Measure rendered content: display:contents wrappers have no layout box.
    const [cardBox, artBox, headingBox, factsBox, providerBox] = await Promise.all([
      card.boundingBox(), art.boundingBox(), heading.boundingBox(), facts.boundingBox(),
      card.locator(".catalog-game-copy .eyebrow").boundingBox(),
    ]);
    expect(cardBox).toBeTruthy();
    expect(artBox).toBeTruthy();
    expect(headingBox).toBeTruthy();
    expect(factsBox).toBeTruthy();
    expect(providerBox).toBeTruthy();
    expect(artBox!.width).toBeGreaterThanOrEqual(80);
    expect(artBox!.width).toBeLessThanOrEqual(210);
    expect(headingBox!.width).toBeGreaterThan(artBox!.width);
    expect(headingBox!.x).toBeGreaterThanOrEqual(artBox!.x + artBox!.width);
    expect(providerBox!.x).toBeGreaterThanOrEqual(artBox!.x + artBox!.width);
    expect(providerBox!.y).toBeLessThan(artBox!.y + artBox!.height);
    expect(factsBox!.y).toBeGreaterThanOrEqual(artBox!.y + artBox!.height - 1);
    expect(factsBox!.y).toBeGreaterThanOrEqual(headingBox!.y + headingBox!.height - 1);
    expect(factsBox!.width).toBeGreaterThan(artBox!.width * 2);
    expect(cardBox!.height).toBeLessThan(width < 600 ? 450 : 380);
    for (const value of await facts.locator("dd").all()) {
      const box = await value.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(20);
      expect(box!.x + box!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});
