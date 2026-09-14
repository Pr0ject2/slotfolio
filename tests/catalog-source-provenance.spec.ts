import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

const separatelySourced = [
  {
    slug: "push-gaming-razor-shark-jackpots",
    primary: "https://www.pushgaming.com/games/razor-shark-jackpots.html",
    release:
      "https://www.pushgaming.com/blog/push-gaming-redefines-staple-slot-series-release-razor-shark-jackpots.html",
  },
  {
    slug: "push-gaming-red-hot-multipliers",
    primary: "https://www.pushgaming.com/games/red-hot-multipliers.html",
    release:
      "https://www.pushgaming.com/blog/reel-hot-games-continues-2026-momentum-release-diamonds-4-win.html",
  },
] as const;

test("catalog records expose separate official evidence when release timing has its own source", async ({ page }) => {
  for (const item of separatelySourced) {
    await page.goto(`/slots/catalog/${item.slug}`);
    const facts = page.locator(".catalog-record-facts");

    await expect(facts).toContainText("Источник параметров");
    await expect(facts).toContainText("Источник даты релиза");
    await expect(facts.locator(`a[href="${item.primary}"]`)).toHaveCount(1);
    await expect(facts.locator(`a[href="${item.release}"]`)).toHaveCount(1);
    await expect(facts.locator(`a[href="${item.primary}"]`)).toHaveText("Официальный каталог ↗");
    await expect(facts.locator(`a[href="${item.release}"]`)).toHaveText("Официальная публикация ↗");
  }
});

test("ordinary catalog records keep one source row without duplicate provenance", async ({ page }) => {
  await page.goto("/slots/catalog/wazdan-mayan-ritual");
  const facts = page.locator(".catalog-record-facts");

  await expect(facts.locator("dt", { hasText: /^Источник$/ })).toHaveCount(1);
  await expect(facts.locator("dt", { hasText: "Источник параметров" })).toHaveCount(0);
  await expect(facts.locator("dt", { hasText: "Источник даты релиза" })).toHaveCount(0);
  await expect(facts.locator('a[href="https://wazdan.com/games/mayan-ritual"]')).toHaveCount(1);
});
