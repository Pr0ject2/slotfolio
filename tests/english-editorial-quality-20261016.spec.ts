import { expect, test } from "@playwright/test";
import { englishTerminology } from "../src/lib/english-terminology";

test("English editorial terminology does not promise returns or invent mechanics", () => {
  expect(englishTerminology.rtp).toBe("return to player (RTP)");
  expect(englishTerminology.volatility).toBe("volatility");
  expect(englishTerminology.wagering).toBe("wagering requirements");
  expect(englishTerminology.saferGambling).toBe("safer gambling");
  const glossary = Object.values(englishTerminology).join(" ").toLowerCase();
  expect(glossary).not.toMatch(/guaranteed|profit|risk.free|refund/);
});

test("English shell and metadata use British editorial English and accessible language switch", async ({ page }) => {
  await page.goto("/en/about");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_GB");
  await expect(page.locator('html')).toHaveAttribute("lang", "en");
  await expect(page.locator('.skip-link[data-locale="en"]')).toHaveText("Skip to content");
  await expect(page.locator('.skip-link[data-locale="ru"]')).toBeHidden();
  await expect(page.locator('.skip-link[data-locale="en"]')).not.toBeHidden();
  await expect(page.locator('a[href="/en/privacy"]').first()).toBeVisible();
  await page.goto("/about");
  await expect(page.locator('.skip-link[data-locale="en"]')).toBeHidden();
  await expect(page.locator('.skip-link[data-locale="ru"]')).not.toBeHidden();
});

test("RTP guide explains stakes without treating RTP as an individual refund", async ({ page }) => {
  await page.goto("/en/journal/understanding-rtp");
  await expect(page.locator("main")).toContainText("total value of bets");
  await expect(page.locator("main")).toContainText("earlier wins");
  await expect(page.locator("main")).toContainText("RTP");
  await expect(page.locator("main")).not.toContainText(/guaranteed win|win is due|money back after every spin/i);
});
