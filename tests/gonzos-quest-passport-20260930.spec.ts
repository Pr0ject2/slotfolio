import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const netentSource = "https://netent.com/games/gonzos-quest";
const evolutionSource = "https://games.evolution.com/slots/gonzos-quest/";

test("Gonzo's Quest keeps the canonical NetEnt release passport and existing max-win conflict", () => {
  const slot = getSlot("gonzos-quest");
  const passport = getVerifiedSlotPassport("gonzos-quest");
  const metrics = getVerifiedSlotMetrics("gonzos-quest");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("NetEnt");
  expect(slot?.year).toBe(2010);
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.rtp).toBe("95,97%");
  expect(slot?.source).toBe(netentSource);
  expect(passport).toEqual({
    releaseDate: "15 марта 2010",
    gameType: "Video Slot",
    source: netentSource,
    sourceLabel: "каноническая официальная страница NetEnt",
  });

  expect(metrics?.maxWin).toBe("2 200x");
  expect(metrics?.source).toBe(netentSource);
  expect(metrics?.note).toContain("maximum win 2 500x");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "страница Evolution / NetEnt с конфликтующим максимумом 2 500x",
      url: evolutionSource,
    },
  ]);
});

test("Gonzo's Quest renders verified release passport without hiding first-party max-win conflict", async ({ page }) => {
  await page.goto("/slots/gonzos-quest");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("15 марта 2010");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Video Slot");
  await expect(summary).toContainText("2 200x");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${netentSource}']`)).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
  await expect(facts.getByRole("link", { name: /конфликтующим максимумом 2 500x/ })).toHaveCount(1);

  const mathProfile = page.locator("#math-profile");
  await expect(mathProfile).toContainText("2 200x");
  await expect(mathProfile).toContainText("2 500x");
});
