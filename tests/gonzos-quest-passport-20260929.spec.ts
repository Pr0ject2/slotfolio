import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const canonicalSource = "https://netent.com/games/gonzos-quest";
const evolutionSource = "https://games.evolution.com/slots/gonzos-quest/";

test("Gonzo's Quest keeps the canonical NetEnt release passport", () => {
  const slot = getSlot("gonzos-quest");
  const passport = getVerifiedSlotPassport("gonzos-quest");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("NetEnt");
  expect(slot?.source).toBe(canonicalSource);
  expect(passport).toEqual({
    releaseDate: "15 марта 2010",
    gameType: "Video Slot",
    source: canonicalSource,
    sourceLabel: "каноническая официальная страница NetEnt",
  });
});

test("Gonzo's Quest renders verified passport without hiding the existing NetEnt conflict", async ({ page }) => {
  await page.goto("/slots/gonzos-quest");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("15 марта 2010");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Video Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${canonicalSource}']`)).toHaveCount(1);
  await expect(facts.locator(`a[href='${evolutionSource}']`)).toHaveCount(1);
  await expect(facts).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
  await expect(facts).toContainText(
    "страница Evolution / NetEnt с конфликтующим максимумом 2 500x",
  );
});
