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

test("Jammin Jars distinguishes its fixed cap from the current highest-observed value", () => {
  const metrics = getVerifiedSlotMetrics("jammin-jars");

  expect(metrics?.maxWin).toBe("20 000x");
  expect(metrics?.maxWinLabel).toBe("Максимальная выплата");
  expect(metrics?.rtpVariants).toEqual(["96,83%", "94,25%"]);
  expect(metrics?.source).toBe("https://www.pushgaming.com/games/jammin-jars.html");
  expect(metrics?.note).toContain("Highest Observed Win 19 998,5x");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "интервью Push Gaming о Jammin’ Jars 2",
      url: "https://www.pushgaming.com/blog/interview-game-producer-amit-samji-speaks-newslotgames-our-latest-release-jammin-jars-2.html",
    },
  ]);
});

test("Razor Shark stays uncapped instead of turning an observed win into maxWin", () => {
  const metrics = getVerifiedSlotMetrics("razor-shark");

  expect(metrics?.maxWin).toBeUndefined();
  expect(metrics?.rtpVariants).toEqual(["96,70%", "94,06%"]);
  expect(metrics?.source).toBe("https://www.pushgaming.com/games/razor-shark.html");
  expect(metrics?.note).toContain("нет фиксированного max-win cap");
  expect(metrics?.note).toContain("85 475,4x");
  expect(metrics?.additionalSources?.[0]?.url).toBe(
    "https://www.pushgaming.com/blog/q-marketing-director-darren-stephenson-speaks-kongebonus.html",
  );
});
