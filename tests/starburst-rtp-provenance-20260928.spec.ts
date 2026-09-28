import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const netentSource = "https://netent.com/games/starburst";
const evolutionSource = "https://games.evolution.com/slots/starburst/";

test("Starburst keeps canonical NetEnt 96.08% and preserves Evolution's 96.09% conflict", () => {
  const slot = getSlot("starburst");
  const metrics = getVerifiedSlotMetrics("starburst");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("NetEnt");
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.rtp).toBe("96,08%");
  expect(slot?.source).toBe(netentSource);

  expect(metrics?.source).toBe(netentSource);
  expect(metrics?.maxWin).toBe("800x");
  expect(metrics?.rtpVariants).toEqual(["96,08%"]);
  expect(metrics?.note).toContain("RTP 96,08%");
  expect(metrics?.note).toContain("RTP 96,09%");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "страница Evolution / NetEnt с конфликтующим RTP 96,09%",
      url: evolutionSource,
    },
  ]);
});

test("Starburst dossier renders the RTP conflict without changing primary math", async ({ page }) => {
  await page.goto("/slots/starburst");

  await expect(page.locator(".facts")).toContainText("96,08%");
  await expect(page.locator(".facts")).toContainText("800x");
  await expect(page.locator("#math-profile")).toContainText("RTP 96,08%");
  await expect(page.locator("#math-profile")).toContainText("RTP 96,09%");
  await expect(page.locator("#facts")).toContainText(
    "страница Evolution / NetEnt с конфликтующим RTP 96,09%",
  );
});
