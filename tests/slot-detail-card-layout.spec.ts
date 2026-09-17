import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

test("full dossier summary keeps verified facts readable and artwork uncropped", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/slots/wanted-dead-or-a-wild");
    await page.waitForLoadState("networkidle");

    const summary = page.locator(".slot-intro");
    await expect(summary).toBeVisible();
    await expect(summary).toContainText("12 500x");
    await expect(summary).toContainText("96,38%");
    await expect(summary).toContainText("Высокая");
    await expect(summary.locator(".facts > div")).toHaveCount(6);

    const artwork = summary.locator(".slot-figure .game-image");
    await expect(artwork).toHaveCSS("object-fit", "contain");
    await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("full dossier fact passport switches from two columns to one on narrow phones", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/slots/wanted-dead-or-a-wild");
  await page.waitForLoadState("networkidle");
  const facts = page.locator(".slot-intro .facts");
  expect((await facts.evaluate((element) => getComputedStyle(element).gridTemplateColumns)).split(" ").length).toBe(1);
});

test("catalog-only record presents every available fact as a finished technical card", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/slots/catalog/wazdan-mayan-ritual");
    await page.waitForLoadState("networkidle");

    const facts = page.locator(".catalog-record-facts");
    await expect(facts).toBeVisible();
    await expect(facts).toContainText("5 барабанов · 40 линий");
    await expect(facts).toContainText("96,29%");
    await expect(facts).toContainText("850x");
    await expect(facts).toContainText("Низкая–средняя");
    await expect(facts).toContainText("03.09.2018");
    await expect(page.locator(".catalog-record-status")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Характеристики" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("catalog-only fact grid adapts without hiding available data", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/slots/catalog/wazdan-mayan-ritual");
  await page.waitForLoadState("networkidle");
  const facts = page.locator(".catalog-record-facts");
  expect((await facts.evaluate((element) => getComputedStyle(element).gridTemplateColumns)).split(" ").length).toBe(1);
  expect(await facts.locator("dd").count()).toBeGreaterThanOrEqual(8);
});
