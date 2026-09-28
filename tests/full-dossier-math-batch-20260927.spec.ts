import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Mighty Hot Amazonia preserves Wazdan's baseline and adjustable volatility provenance", () => {
  const slot = getSlot("mighty-hot-amazonia");
  const metrics = getVerifiedSlotMetrics("mighty-hot-amazonia");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Wazdan");
  expect(slot?.rtp).toBe("96,22%");
  expect(slot?.volatility).toBe("Настраиваемая");
  expect(slot?.source).toBe("https://wazdan.com/games/mighty-hot-amazonia");
  expect(slot?.note).toContain("Low-Medium");
  expect(metrics?.source).toBe("https://wazdan.com/games/mighty-hot-amazonia");
  expect(metrics?.maxWin).toBe("1 500x");
  expect(metrics?.rtpVariants).toEqual(["96,22%"]);
  expect(metrics?.note).toContain("Volatility: Low-Medium");
  expect(metrics?.note).toContain("Volatility Levels");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "официальная страница Mighty Hot Amazonia с описанием выбора волатильности",
      url: "https://wazdan.com/mighty-hot-amazonia",
    },
    {
      label: "официальное описание Wazdan Volatility Levels™",
      url: "https://wazdan.com/news/new-releases-updates/wazdans-new-jersey-entry-bolstered-with-the-introduction-of-volatility-levels-feature",
    },
  ]);
});

test("Mummyland Treasures keeps Belatra's published math profile", () => {
  const slot = getSlot("mummyland-treasures");
  const metrics = getVerifiedSlotMetrics("mummyland-treasures");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Belatra Games");
  expect(slot?.rtp).toBe("96,37%");
  expect(slot?.volatility).toBe("Высокая");
  expect(metrics?.source).toBe("https://belatragames.com/en/games/game/mummyland-treasures");
  expect(metrics?.maxWin).toBe("25 000x");
  expect(metrics?.rtpVariants).toEqual(["96,37%"]);
});

test("Troy SuperWays keeps Yggdrasil's full RTP ladder and max multiplier", () => {
  const slot = getSlot("troy-superways");
  const metrics = getVerifiedSlotMetrics("troy-superways");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Yggdrasil Gaming");
  expect(slot?.rtp).toBe("96,00%");
  expect(slot?.volatility).toBe("Высокая");
  expect(metrics?.source).toBe("https://yggdrasilgaming.com/games/troy-superways");
  expect(metrics?.maxWin).toBe("35 336x");
  expect(metrics?.rtpVariants).toEqual(["96,00%", "94,00%", "90,50%"]);
});

test("three enriched dossiers render their first-party math on public pages", async ({ page }) => {
  await page.goto("/slots/mighty-hot-amazonia");
  await expect(page.locator("#math-profile")).toContainText("1 500x");
  await expect(page.locator(".slot-intro")).toContainText("Настраиваемая");
  await expect(page.locator("#facts")).toContainText("Low-Medium");
  await expect(page.locator("#facts")).toContainText("Volatility Levels");
  await expect(page.locator("#facts")).toContainText("wazdan.com");

  await page.goto("/slots/mummyland-treasures");
  await expect(page.locator("#math-profile")).toContainText("25 000x");
  await expect(page.locator("#facts")).toContainText("belatragames.com");

  await page.goto("/slots/troy-superways");
  await expect(page.locator("#math-profile")).toContainText("35 336x");
  await expect(page.locator("#math-profile")).toContainText("96,00% · 94,00% · 90,50%");
  await expect(page.locator("#facts")).toContainText("yggdrasilgaming.com");
});