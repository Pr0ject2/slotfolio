import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const gamePage = "https://www.hacksawgaming.com/games/wanted-dead-or-a-wild";
const catalogPage = "https://www.hacksawgaming.com/games/slots";

test("Wanted keeps the detailed 4/5 rating while preserving the catalog 5/5 conflict", () => {
  const slot = getSlot("wanted-dead-or-a-wild");
  const metrics = getVerifiedSlotMetrics("wanted-dead-or-a-wild");

  expect(slot).toBeTruthy();
  expect(slot?.volatility).toBe("Высокая");
  expect(slot?.source).toBe(gamePage);

  expect(metrics?.source).toBe(gamePage);
  expect(metrics?.maxWin).toBe("12 500x");
  expect(metrics?.rtpVariants).toEqual(["96,38%", "94,55%", "92,33%", "88,42%"]);
  expect(metrics?.note).toContain("Volatility: 4 / 5");
  expect(metrics?.note).toContain("volatility meter 5/5");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "текущий каталог Hacksaw Gaming с конфликтующим volatility meter 5/5",
      url: catalogPage,
    },
  ]);
});

test("Wanted dossier renders both first-party volatility statements without changing its math", async ({ page }) => {
  await page.goto("/slots/wanted-dead-or-a-wild");

  await expect(page.locator(".facts")).toContainText("Высокая");
  await expect(page.locator(".facts")).toContainText("12 500x");
  await expect(page.locator("#math-profile")).toContainText("Volatility: 4 / 5");
  await expect(page.locator("#math-profile")).toContainText("volatility meter 5/5");
  await expect(page.locator("#facts")).toContainText(
    "текущий каталог Hacksaw Gaming с конфликтующим volatility meter 5/5",
  );
});
