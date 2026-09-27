import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("777 Coins keeps x6 000 as provider-stated bonus potential", () => {
  const slot = getSlot("777-coins");
  const metrics = getVerifiedSlotMetrics("777-coins");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("3 Oaks Gaming");
  expect(slot?.field).toBe("3 × 3");
  expect(metrics?.source).toBe("https://3oaks.com/game/777_coins");
  expect(metrics?.maxWin).toBe("6 000x");
  expect(metrics?.maxWinLabel).toBe("Заявленный потенциал");
  expect(metrics?.rtpVariants).toBeUndefined();
  expect(metrics?.note).toContain("GRAND JACKPOT x2 000");
  expect(metrics?.note).toContain("x6 000");
  expect(metrics?.note).toContain("не как независимо опубликованный fixed max-win cap");
});

test("777 Coins dossier renders the provider-stated bonus potential with first-party provenance", async ({ page }) => {
  await page.goto("/slots/777-coins");

  await expect(page.locator("#math-profile")).toContainText("6 000x");
  await expect(page.locator("#math-profile")).toContainText("Заявленный потенциал");
  await expect(page.locator("#facts")).toContainText("3oaks.com");
});
