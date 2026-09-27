import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const promoUrl =
  "https://forum.1win.com/topic/359-%E2%80%8B%F0%9F%96%A4%E2%80%8B-up-to-x10000-in-house-of-sins/";

test("House of Sins uses the game-specific 1win evidence without promoting operator math", () => {
  const slot = getSlot("house-of-sins");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe(promoUrl);
  expect(slot?.field).toBe("6 × 8");
  expect(slot?.mechanics).toEqual(expect.arrayContaining(["Кластеры", "Каскады"]));
  expect(slot?.tags).toEqual(expect.arrayContaining(["Sticky Wild", "Свободные вращения"]));
  expect(slot?.feature).toContain("10 000x");
  expect(slot?.note).toContain("RTP на этой странице не опубликовано");
  expect(slot?.availability).toEqual([
    expect.objectContaining({
      operator: "1win",
      verifiedAt: "2026-09-07",
      source: promoUrl,
    }),
  ]);

  expect(getVerifiedSlotMetrics("house-of-sins")).toBeUndefined();
});

test("House of Sins dossier links the specific operator source but keeps x10 000 out of verified math", async ({ page }) => {
  await page.goto("/slots/house-of-sins");

  const source = page.locator(`#facts .source-note a[href="${promoUrl}"]`);
  await expect(source).toHaveText("forum.1win.com ↗");
  await expect(page.locator("body")).toContainText("10 000x");
  await expect(page.locator("#math-profile")).not.toContainText("10 000x");
});
