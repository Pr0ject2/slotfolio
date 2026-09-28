import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const productSource = "https://www.pushgaming.com/games/retro-tapes.html";
const rtpSource =
  "https://www.pushgaming.com/blog/push-gaming-wins-most-watched-most-streamed-slot-award-february-tier-2-category.html";

test("Retro Tapes keeps both first-party RTP configurations with explicit provenance", () => {
  const slot = getSlot("retro-tapes");
  const metrics = getVerifiedSlotMetrics("retro-tapes");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Push Gaming");
  expect(slot?.rtp).toBe("96,47%");

  expect(metrics?.source).toBe(productSource);
  expect(metrics?.rtpVariants).toEqual(["96,47%", "94,46%"]);
  expect(metrics?.maxWin).toBeUndefined();
  expect(metrics?.observedWin).toBe("10 000x");
  expect(metrics?.note).toContain("RTP 94,46%–96,47%");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "официальный материал Push Gaming с RTP 94,46%–96,47%",
      url: rtpSource,
    },
  ]);
});

test("Retro Tapes dossier renders alternate RTP provenance without inventing a fixed cap", async ({ page }) => {
  await page.goto("/slots/retro-tapes");

  await expect(page.locator(".facts")).toContainText("96,47%");
  await expect(page.locator("#math-profile")).toContainText("94,46%");
  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(page.locator("#facts")).toContainText(
    "официальный материал Push Gaming с RTP 94,46%–96,47%",
  );
});
