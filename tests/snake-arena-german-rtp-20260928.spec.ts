import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const relaxMathSource = "https://www.relax-gaming.com/products/casino/snakearena";
const relaxReleaseSource =
  "https://www.relax-gaming.com/news/2020/01/relax-gaming-launches-actionpacked-new-slot-snake-arena-across-network";

test("Snake Arena preserves the 96.25% main RTP and adds the official German 90% variant", () => {
  const slot = getSlot("snake-arena");
  const metrics = getVerifiedSlotMetrics("snake-arena");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Relax Gaming");
  expect(slot?.field).toBe("5 × 5");
  expect(slot?.rtp).toBe("96,25%");
  expect(slot?.source).toBe(relaxReleaseSource);

  expect(metrics?.source).toBe(relaxMathSource);
  expect(metrics?.maxWin).toBe("2 758,8x");
  expect(metrics?.rtpVariants).toEqual(["96,25%", "90,00%"]);
  expect(metrics?.note).toContain("основной RTP 96,25%");
  expect(metrics?.note).toContain("German RTP 90%");
});

test("Snake Arena dossier renders the German RTP variant without changing the reference RTP", async ({ page }) => {
  await page.goto("/slots/snake-arena");

  await expect(page.locator(".facts")).toContainText("96,25%");
  await expect(page.locator(".facts")).toContainText("2 758,8x");
  await expect(page.locator("#math-profile")).toContainText("96,25%");
  await expect(page.locator("#math-profile")).toContainText("90,00%");
  await expect(page.locator("#math-profile")).toContainText("German RTP 90%");
});
