import { test, expect } from "@playwright/test";
declare global { interface Window { catalogueLoadCLS: number } }
test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
for (const prefix of ["", "/en", "/es"]) test(`catalogue hydration keeps the first screen stable in ${prefix || "ru"}`, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.catalogueLoadCLS = 0;
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!shift.hadRecentInput) window.catalogueLoadCLS += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  const response = await page.goto(`${prefix}/slots/`); expect(response?.status()).toBe(200);
  await expect(page.locator(".catalog-game")).toHaveCount(18);
  await expect(page.locator(".catalog-loading")).toHaveCount(0);
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
  const score = await page.evaluate(() => window.catalogueLoadCLS);
  console.log(JSON.stringify({ locale: prefix || "ru", syntheticLoadCLS: score }));
  expect(score).toBeLessThan(0.05);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.locator("#catalog-q").fill("Reactoonz");
  await expect(page.locator('.catalog-game h2 a[href$="/slots/reactoonz/"]')).toHaveText("Reactoonz");
  await expect.poll(() => page.locator(".catalog-game").count()).toBeLessThan(18);
});
