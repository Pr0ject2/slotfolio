import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pushgaming.com/games/jammin-jars.html";
const passportSource = "https://www.pushgaming.com/blog/push-gaming-get-groove-new-game-jammin-jars.html";

test("Jammin Jars keeps Push Gaming release passport", () => {
  const slot = getSlot("jammin-jars");
  const passport = getVerifiedSlotPassport("jammin-jars");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Push Gaming");
  expect(slot?.year).toBe(2018);
  expect(slot?.field).toBe("8 × 8");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "18 сентября 2018",
    gameType: "Cascading Cluster Pays",
    source: passportSource,
    sourceLabel: "официальный релиз Push Gaming от 18.09.2018",
  });
});

test("Jammin Jars renders verified release date, game type and separate passport provenance", async ({ page }) => {
  await page.goto("/slots/jammin-jars");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("18 сентября 2018");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Cascading Cluster Pays");
  await expect(page.locator(`#facts a[href='${gameSource}']`)).toHaveCount(1);
  await expect(page.locator(`#facts a[href='${passportSource}']`)).toHaveCount(1);
  await expect(page.locator("#facts")).toContainText("Дата релиза и тип игры сверены по");
  await expect(page.locator("#facts")).not.toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
