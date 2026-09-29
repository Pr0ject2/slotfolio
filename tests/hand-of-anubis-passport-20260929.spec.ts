import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const source = "https://www.hacksawgaming.com/news/new-game-release-april-summary";

test("Hand of Anubis keeps Hacksaw Gaming release passport", () => {
  const slot = getSlot("hand-of-anubis");
  const passport = getVerifiedSlotPassport("hand-of-anubis");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Hacksaw Gaming");
  expect(slot?.year).toBe(2022);
  expect(slot?.source).toBe(source);
  expect(passport).toEqual({
    releaseDate: "21 апреля 2022",
    gameType: "Cascading Cluster-based Slot",
    source,
    sourceLabel: "официальный релиз Hacksaw Gaming от 21.04.2022",
  });
});

test("Hand of Anubis renders verified release date, type and same-page provenance", async ({ page }) => {
  await page.goto("/slots/hand-of-anubis");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("21 апреля 2022");
  await expect(summary).toContainText("Cascading Cluster-based Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${source}']`)).toHaveCount(1);
  await expect(facts).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
