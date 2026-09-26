import { expect, test } from "@playwright/test";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Money Train 2 keeps its official Relax Gaming max win", () => {
  const metrics = getVerifiedSlotMetrics("money-train-2");

  expect(metrics).toBeTruthy();
  expect(metrics!.maxWin).toBe("50 000x");
  expect(metrics!.maxWinLabel).toBe("Максимальная выплата");
  expect(metrics!.source).toBe("https://www.relax-gaming.com/products/casino/moneytrain2");
  expect(metrics!.sourceLabel).toBe("официальная страница Relax Gaming");
});

test("verified metric overlays preserve existing dossier metrics", () => {
  const existing = getVerifiedSlotMetrics("wanted-dead-or-a-wild");

  expect(existing?.maxWin).toBe("12 500x");
  expect(existing?.rtpVariants).toEqual(["96,38%", "94,55%", "92,33%", "88,42%"]);
});
