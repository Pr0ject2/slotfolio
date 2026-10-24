import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
test("operator source stays in evidence, not on public page", async ({ page }) => {
  expect(getSlot("crypto-genesys")?.source).toBe("https://forum.1win.com/23-slot-games/");
  await page.goto("/slots/crypto-genesys");
  await expect(page.locator("#facts a[href^='http']")).toHaveCount(0);
});
test("provider source stays in evidence, not on public page", async ({ page }) => {
  expect(getSlot("crown-coins")?.source).toBe("https://endorphina.com/games/crown-coins");
  await page.goto("/slots/crown-coins");
  await expect(page.locator("#facts a[href^='http']")).toHaveCount(0);
});
