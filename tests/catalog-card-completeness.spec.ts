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
  expect(threeOaks?.releaseDate).toBe("2025-05");
  expect(threeOaks?.mechanics).toEqual(["Линии"]);
  expect(threeOaks?.verifiedFacts).toBe(3);

  const thin = model.items.find((item) => item.slug === "playn-go-coin-club");
  expect(thin).toBeTruthy();
  expect(thin?.verifiedFacts).toBe(0);
  expect(thin?.field).toBe("");
  expect(thin?.verifiedRtp).toBe("");
  expect(thin?.maxWin).toBe("");
  expect(thin?.verifiedVolatility).toBe("");
  expect(thin?.releaseDate).toBe("");
});

test("verified catalog card presents every confirmed passport value", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/slots?q=Mayan%20Ritual");
  await page.waitForLoadState("networkidle");

  const card = page.locator('.catalog-game[data-coverage="catalog"]').filter({ hasText: "Mayan Ritual" });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Проверено");
  await expect(card).toContainText("Mayan Ritual");
  await expect(card).toContainText("релиз 2018");
  await expect(card).toContainText("5 барабанов · 40 линий");
  await expect(card).toContainText("96,29%");
  await expect(card).toContainText("850x");
  await expect(card).toContainText("Низкая–средняя");
  await expect(card).toContainText("03.09.2018");
  await expect(card.locator("dd").filter({ hasText: /^—$/ })).toHaveCount(0);
  await expect(card).not.toContainText("обложка на проверке");
  await expect(card).not.toContainText("undefined");
  await expect(card).not.toContainText("null");
});

test("empty catalog record still looks like a finished card without invented facts", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/slots?q=Coin%20Club");
  await page.waitForLoadState("networkidle");

  const card = page.locator('.catalog-game[data-coverage="catalog"]').filter({ hasText: "Coin Club" });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Coin Club");
  await expect(card).toContainText("официальная запись");
  await expect(card).toContainText("Механика уточняется");
  await expect(card.locator("dd").filter({ hasText: /^—$/ })).toHaveCount(0);
  await expect(card.locator("dl")).toHaveCount(0);
  await expect(card.getByText("Технические характеристики пока не подтверждены.", { exact: false })).toBeVisible();
  await expect(card.getByRole("button", { name: /сравнен/ })).toHaveCount(0);
  await expect(card.getByText("Открыть запись ↗", { exact: true })).toHaveCount(1);
  await expect(card).not.toContainText("undefined");
  await expect(card).not.toContainText("null");
});

test("cover view keeps two slot cards per row on 390px without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/slots?provider=wazdan&view=covers");
  await page.waitForLoadState("networkidle");

  const cards = page.locator(".catalog-results.covers .catalog-game");
  await expect(cards).toHaveCount(18);
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  expect(first).toBeTruthy();
  expect(second).toBeTruthy();
  expect(Math.abs((first?.y ?? 0) - (second?.y ?? 0))).toBeLessThan(4);
  expect((second?.x ?? 0)).toBeGreaterThan((first?.x ?? 0));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const width of [320, 390, 1440]) {
  test(`partial catalog passport shows only sourced facts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/slots?q=Dancing%20Joker');
    const card = page.locator('.catalog-game[data-coverage="catalog"]');
    await expect(card).toHaveCount(1);
    await expect(card.locator('dl')).toContainText('5×3 · 40 линий');
    await expect(card.locator('dl')).toContainText('05.2025');
    for (const label of ['RTP', 'Макс.', 'Волат.']) {
      await expect(card.locator('dt').filter({ hasText: new RegExp(`^${label.replace('.', '\\.')}$`) })).toHaveCount(0);
    }
    await expect(card.locator('dd').filter({ hasText: /^—$/ })).toHaveCount(0);
    await expect(card.getByText('Остальные характеристики не подтверждены.')).toBeVisible();
    await expect(card.getByRole('button', { name: /сравнен/ })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
