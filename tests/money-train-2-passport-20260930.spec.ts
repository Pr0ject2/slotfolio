import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.relax-gaming.com/products/casino/moneytrain2";
const passportSource =
  "https://www.relax-gaming.com/news/2020/08/relax-gaming-to-roll-out-biggest-release-of-the-year-with-money-train-2";

test("Money Train 2 keeps the Relax Gaming launch passport without changing its current math source", () => {
  const slot = getSlot("money-train-2");
  const passport = getVerifiedSlotPassport("money-train-2");
  const metrics = getVerifiedSlotMetrics("money-train-2");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Relax Gaming");
  expect(slot?.year).toBe(2020);
  expect(slot?.field).toBe("5 × 4");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "2 сентября 2020",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный анонс Relax Gaming с датой запуска 02.09.2020",
  });

  expect(metrics?.maxWin).toBe("50 000x");
  expect(metrics?.source).toBe(gameSource);
  expect(metrics?.note).toContain("German RTP 90%");
  expect(metrics?.note).toContain("не формирует");
});

test("Money Train 2 renders verified release date, game type and separate first-party passport provenance", async ({ page }) => {
  await page.goto("/slots/money-train-2");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("2 сентября 2020");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Slot");
  await expect(summary).toContainText("50 000x");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", {
      name: /официальный анонс Relax Gaming с датой запуска 02\.09\.2020/,
    }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
  await expect(facts).toContainText("German RTP 90%");
});
