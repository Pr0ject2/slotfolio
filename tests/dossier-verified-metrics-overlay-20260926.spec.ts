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

test("Dead or Alive 2 uses the coherent official Evolution NetEnt max-win reference", () => {
  const metrics = getVerifiedSlotMetrics("dead-or-alive-2");

  expect(metrics?.maxWin).toBe("100 000x");
  expect(metrics?.maxWinLabel).toBe("Максимальная выплата");
  expect(metrics?.source).toBe("https://games.evolution.com/slots/dead-or-alive-2/");
  expect(metrics?.sourceLabel).toBe("официальная страница Evolution / NetEnt");
  expect(metrics?.note).toContain("Max payout 1 600x");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "карточка NetEnt с конфликтующим metadata-полем",
      url: "https://netent.com/games/dead-or-alive-2",
    },
  ]);
});

test("verified metric overlays preserve existing dossier metrics", () => {
  const existing = getVerifiedSlotMetrics("wanted-dead-or-a-wild");

  expect(existing?.maxWin).toBe("12 500x");
  expect(existing?.rtpVariants).toEqual(["96,38%", "94,55%", "92,33%", "88,42%"]);
});

test("Jammin Jars keeps its fixed cap separate from Highest Observed Win", () => {
  const metrics = getVerifiedSlotMetrics("jammin-jars");

  expect(metrics?.maxWin).toBe("20 000x");
  expect(metrics?.maxWinLabel).toBe("Максимальная выплата");
  expect(metrics?.observedWin).toBe("19 998,5x");
  expect(metrics?.observedWinLabel).toBe("Наблюдавшийся максимум");
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

test("Razor Shark stays uncapped and stores its documented player hit separately", () => {
  const metrics = getVerifiedSlotMetrics("razor-shark");

  expect(metrics?.maxWin).toBeUndefined();
  expect(metrics?.observedWin).toBe("85 475,4x");
  expect(metrics?.observedWinLabel).toBe("Задокументированный выигрыш");
  expect(metrics?.rtpVariants).toEqual(["96,70%", "94,06%"]);
  expect(metrics?.source).toBe("https://www.pushgaming.com/games/razor-shark.html");
  expect(metrics?.note).toContain("нет фиксированного max-win cap");
  expect(metrics?.additionalSources?.[0]?.url).toBe(
    "https://www.pushgaming.com/blog/q-marketing-director-darren-stephenson-speaks-kongebonus.html",
  );
});

test("Fat Rabbit treats 3 844x as observed rather than a fixed cap", () => {
  const metrics = getVerifiedSlotMetrics("fat-rabbit");

  expect(metrics?.maxWin).toBeUndefined();
  expect(metrics?.maxWinLabel).toBeUndefined();
  expect(metrics?.observedWin).toBe("3 844x");
  expect(metrics?.observedWinLabel).toBe("Наблюдавшийся максимум");
  expect(metrics?.rtpVariants).toEqual(["96,45%", "94,15%"]);
  expect(metrics?.source).toBe("https://www.pushgaming.com/games/fat-rabbit.html");
});

test("Retro Tapes treats 10 000x as observed rather than a fixed cap", () => {
  const metrics = getVerifiedSlotMetrics("retro-tapes");

  expect(metrics?.maxWin).toBeUndefined();
  expect(metrics?.maxWinLabel).toBeUndefined();
  expect(metrics?.observedWin).toBe("10 000x");
  expect(metrics?.observedWinLabel).toBe("Наблюдавшийся максимум");
  expect(metrics?.rtpVariants).toEqual(["96,47%", "94,46%"]);
  expect(metrics?.source).toBe("https://www.pushgaming.com/games/retro-tapes.html");
});

test("observed wins render as their own dossier metric", async ({ page }) => {
  await page.goto("/slots/fat-rabbit");

  await expect(page.locator(".facts")).toContainText("Наблюдавшийся максимум");
  await expect(page.locator(".facts")).toContainText("3 844x");
  await expect(page.locator("#math-profile")).toContainText("Наблюдавшийся максимум");
  await expect(page.locator("#math-profile")).toContainText(
    "Наблюдавшийся результат, не обязательно фиксированный cap",
  );
});

test("Jammin Jars renders both the fixed cap and observed value with provenance", async ({ page }) => {
  await page.goto("/slots/jammin-jars");

  await expect(page.locator(".facts")).toContainText("Максимальная выплата");
  await expect(page.locator(".facts")).toContainText("20 000x");
  await expect(page.locator(".facts")).toContainText("Наблюдавшийся максимум");
  await expect(page.locator(".facts")).toContainText("19 998,5x");
  await expect(page.locator("#facts")).toContainText("Дополнительные источники");
  await expect(page.locator("#facts")).toContainText("интервью Push Gaming о Jammin’ Jars 2");
});
