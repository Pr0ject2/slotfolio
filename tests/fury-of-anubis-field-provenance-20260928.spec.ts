import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const structuredSource = "https://www.pragmaticplay.com/en/campaign/fury-of-anubis/";
const conflictingGamePage = "https://www.pragmaticplay.com/en/games/fury-of-anubis/";
const releaseSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-unleashes-the-power-of-ancient-egypt-in-fury-of-anubis/";

test("Fury of Anubis uses the structured 6x5 profile and preserves the 5x6 first-party conflict", () => {
  const slot = getSlot("fury-of-anubis");
  const metrics = getVerifiedSlotMetrics("fury-of-anubis");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.field).toBe("6 × 5");
  expect(slot?.rtp).toBe("96,52%");
  expect(slot?.source).toBe(structuredSource);
  expect(slot?.description).toContain("Поле 6 × 5");
  expect(slot?.note).toContain("Reels x Rows 6 x 5");
  expect(slot?.note).toContain("game page одновременно пишет 5×6");

  expect(metrics?.source).toBe(structuredSource);
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.maxWinLabel).toBe("Заявленный потенциал");
  expect(metrics?.rtpVariants).toEqual(["96,52%"]);
  expect(metrics?.note).toContain("6 × 5");
  expect(metrics?.note).toContain("5×6");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "текущая game page Pragmatic Play с конфликтующим 5×6",
      url: conflictingGamePage,
    },
    {
      label: "официальный релиз Pragmatic Play с 6×5 и потенциалом 10 000x",
      url: releaseSource,
    },
  ]);
});

test("Fury of Anubis dossier renders the corrected field, math and conflicting official page", async ({ page }) => {
  await page.goto("/slots/fury-of-anubis");

  await expect(page.locator(".facts")).toContainText("6 × 5");
  await expect(page.locator(".facts")).toContainText("96,52%");
  await expect(page.locator(".facts")).toContainText("10 000x");
  await expect(page.locator("#math-profile")).toContainText("Заявленный потенциал");
  await expect(page.locator("#math-profile")).toContainText("5×6");
  await expect(page.locator("#facts")).toContainText("текущая game page Pragmatic Play с конфликтующим 5×6");
  await expect(page.locator("#facts")).toContainText("официальный релиз Pragmatic Play с 6×5 и потенциалом 10 000x");
});
