import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const netentSource = "https://netent.com/games/gonzos-quest";
const evolutionSource = "https://games.evolution.com/slots/gonzos-quest/";

test("Gonzo's Quest keeps NetEnt 2 200x primary and preserves Evolution's 2 500x conflict", () => {
  const slot = getSlot("gonzos-quest");
  const metrics = getVerifiedSlotMetrics("gonzos-quest");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("NetEnt");
  expect(slot?.rtp).toBe("95,97%");
  expect(slot?.source).toBe(netentSource);

  expect(metrics?.source).toBe(netentSource);
  expect(metrics?.maxWin).toBe("2 200x");
  expect(metrics?.maxWinLabel).toBe("Максимальная выплата");
  expect(metrics?.rtpVariants).toEqual(["95,97%"]);
  expect(metrics?.note).toContain("Max payout 2 200x");
  expect(metrics?.note).toContain("maximum win 2 500x");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "страница Evolution / NetEnt с конфликтующим максимумом 2 500x",
      url: evolutionSource,
    },
  ]);
});

test("Gonzo's Quest dossier renders the first-party max-win conflict without changing primary math", async ({ page }) => {
  await page.goto("/slots/gonzos-quest");

  await expect(page.locator(".facts")).toContainText("2 200x");
  await expect(page.locator(".facts")).toContainText("95,97%");
  await expect(page.locator("#math-profile")).toContainText("2 200x");
  await expect(page.locator("#math-profile")).toContainText("2 500x");
  await expect(page.locator("#facts")).toContainText(
    "страница Evolution / NetEnt с конфликтующим максимумом 2 500x",
  );
});
