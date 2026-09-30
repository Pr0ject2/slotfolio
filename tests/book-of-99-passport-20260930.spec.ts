import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.relax-gaming.com/products/casino/bookof99";
const passportSource =
  "https://www.relax-gaming.com/news/2021/05/relax-gaming-rewrites-the-genre-with-book-of-99";

test("Book of 99 keeps the Relax Gaming release passport without changing its verified math", () => {
  const slot = getSlot("book-of-99");
  const passport = getVerifiedSlotPassport("book-of-99");
  const metrics = getVerifiedSlotMetrics("book-of-99");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Relax Gaming");
  expect(slot?.year).toBe(2021);
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "4 мая 2021",
    gameType: "Video Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Relax Gaming от 04.05.2021",
  });

  expect(metrics?.maxWin).toBe("5 000x");
  expect(metrics?.maxWinLabel).toBe("Заявленный потенциал");
  expect(metrics?.rtpVariants).toEqual(["99,00%"]);
  expect(metrics?.source).toBe(gameSource);
});

test("Book of 99 renders verified release date, game type and separate first-party passport provenance", async ({ page }) => {
  await page.goto("/slots/book-of-99");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("4 мая 2021");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Video Slot");
  await expect(summary).toContainText("5 000x");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", { name: /официальный релиз Relax Gaming от 04\.05\.2021/ }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");

  const mathProfile = page.locator("#math-profile");
  await expect(mathProfile).toContainText("Заявленный потенциал");
  await expect(mathProfile).toContainText("99,00%");
});
