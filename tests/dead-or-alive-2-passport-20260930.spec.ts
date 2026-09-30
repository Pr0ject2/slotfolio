import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const canonicalSource = "https://netent.com/games/dead-or-alive-2";
const evolutionSource = "https://games.evolution.com/slots/dead-or-alive-2/";

test("Dead or Alive 2 keeps the canonical NetEnt release passport", () => {
  const slot = getSlot("dead-or-alive-2");
  const passport = getVerifiedSlotPassport("dead-or-alive-2");
  const metrics = getVerifiedSlotMetrics("dead-or-alive-2");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("NetEnt");
  expect(slot?.year).toBe(2019);
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.source).toBe(canonicalSource);
  expect(passport).toEqual({
    releaseDate: "23 апреля 2019",
    gameType: "Slot",
    source: canonicalSource,
    sourceLabel: "каноническая официальная страница NetEnt",
  });

  expect(metrics?.maxWin).toBe("100 000x");
  expect(metrics?.additionalSources).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ url: canonicalSource }),
    ]),
  );
  expect(metrics?.source).toBe(evolutionSource);
});

test("Dead or Alive 2 renders verified release date and game type without hiding max-win provenance", async ({ page }) => {
  await page.goto("/slots/dead-or-alive-2");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("23 апреля 2019");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Slot");
  await expect(summary).toContainText("100 000x");

  const facts = page.locator("#facts");
  await expect(facts).toContainText("Дата релиза и тип игры сверены по той же официальной странице.");
  await expect(facts.locator(`a[href='${canonicalSource}']`)).toHaveCount(2);
  await expect(facts.locator(`a[href='${evolutionSource}']`)).toHaveCount(1);
  await expect(facts).toContainText("карточка NetEnt с конфликтующим metadata-полем");
});
