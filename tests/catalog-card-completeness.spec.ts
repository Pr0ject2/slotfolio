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

  const minimal = model.items.find((item) => item.slug === "playn-go-rally-4-riches");
  expect(minimal).toBeTruthy();
  expect(minimal?.verifiedFacts).toBe(2);
  expect(minimal?.gameType).toBe("Video Slot");
  expect(minimal?.mechanics).toEqual(["Линии"]);
  expect(minimal?.field).toBe("");
  expect(minimal?.verifiedRtp).toBe("");
  expect(minimal?.maxWin).toBe("");
  expect(minimal?.verifiedVolatility).toBe("");
  expect(minimal?.releaseDate).toBe("");
});

test("verified catalog card presents every confirmed passport value", async ({ page }) => {
  await page.goto("/slots/catalog/wazdan-mayan-ritual");
  const main = page.locator("main");
  await expect(main).toContainText("Mayan Ritual");
  await expect(main).toContainText("5 барабанов · 40 линий");
  await expect(main).toContainText("96,29%");
  await expect(main).toContainText("Низкая–средняя");
  await expect(main).toContainText("850x");
  await expect(main).toContainText("2018-09-03");
  await expect(main).not.toContainText("RTP —");
});

test("minimal catalog record still looks finished without invented facts", async ({ page }) => {
  await page.goto("/slots/catalog/playn-go-rally-4-riches");
  const main = page.locator("main");
  await expect(main).toContainText("Rally 4 Riches");
  await expect(main).toContainText("Video Slot");
  await expect(main).toContainText("Линии");
  await expect(main).not.toContainText("RTP —");
  await expect(main).not.toContainText("Макс. выигрыш —");
  await expect(main).not.toContainText("Волатильность —");
});

test("cover view keeps two slot cards per row on 390px without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/slots?view=cover");
  await expect(page.locator("[data-slot-card]").first()).toBeVisible();
  const bodyWidth = await page.locator("body").evaluate((node) => node.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(390);
});

for (const width of [320, 390, 1440]) {
  test(`partial catalog passport shows only sourced facts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots/catalog/3-oaks-gaming-dancing-joker");
    const main = page.locator("main");
    await expect(main).toContainText("Dancing Joker");
    await expect(main).toContainText("5×3 · 40 линий");
    await expect(main).toContainText("Линии");
    await expect(main).not.toContainText("RTP —");
    await expect(main).not.toContainText("Макс. выигрыш —");
    await expect(main).not.toContainText("Волатильность —");
  });
}
