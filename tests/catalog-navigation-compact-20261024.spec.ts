import { test, expect } from "@playwright/test";
import { openLanguagePicker, chooseLanguage } from "./language-picker-helpers";
test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
for (const locale of ["ru", "en", "es"])
  for (const width of [320, 375, 390, 768, 1024, 1440])
    test(`compact ${locale} catalogue and direct page access at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(
        (locale === "ru" ? "" : "/" + locale) + "/slots/?page=28",
      );
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(".catalog-game")).toHaveCount(18);
      await expect(page.locator(".page-heading .title-count")).toHaveCount(0);
      await expect(page.locator(".page-heading")).not.toContainText("1000");
      await expect(page.locator("#provider option").first()).not.toContainText(
        "1000",
      );
      expect(
        (await page.locator("#provider option").allTextContents()).every(
          (text) => !/\s·\s\d/.test(text),
        ),
      ).toBe(true);
      const picker = page.locator("[data-language-toggle]");
      await expect(picker).toBeVisible();
      const bounds = await picker.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      const card = page.locator(".catalog-game").first(),
        box = await card.boundingBox();
      expect(box!.height).toBeLessThan(width < 600 ? 450 : 380);
      if (width === 1440) {
        const second = await page.locator(".catalog-game").nth(1).boundingBox();
        expect(Math.abs(second!.y - box!.y)).toBeLessThan(2);
        expect(box!.width).toBeLessThan(600);
      }
      const nav = page.locator(".catalog-pagination"),
        jump = nav.locator("select");
      await jump.selectOption("56");
      await expect(page).toHaveURL(/page=56/);
      await expect(page.locator(".catalog-game")).toHaveCount(10);
      await expect(nav.locator(".catalog-page-next")).toBeDisabled();
      await expect(page.locator(".results")).toBeFocused();
      await page.goBack();
      await expect(jump).toHaveValue("28");
      await expect(page.locator(".catalog-game")).toHaveCount(18);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      // Exercise full dossiers too: their legacy CSS differs from catalogue-only cards.
      await page.goto((locale === "ru" ? "" : "/" + locale) + "/slots/");
      await page.evaluate(() => document.fonts.ready);
      const dossier = page.locator('.catalog-game[data-coverage="dossier"]').first();
      expect((await dossier.boundingBox())!.height).toBeLessThan(width < 600 ? 450 : 380);
      expect((await dossier.locator('.catalog-game-art').boundingBox())!.width).toBeGreaterThanOrEqual(80);
      for (const value of await dossier.locator('dl dd').all()) {
        expect((await value.boundingBox())!.width).toBeGreaterThanOrEqual(20);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    });
test("language picker works outside the mobile menu, names languages and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/slots/?provider=pragmatic-play&page=2&view=covers#main");
  const summary = page.locator("[data-language-toggle]");
  await summary.focus();
  await summary.press("Enter");
  await expect(page.locator("header details")).toHaveAttribute("open", "");
  await expect(page.locator("header details")).toContainText("Русский");
  await expect(page.getByRole("link", { name: "EN", exact: true })).toHaveText(
    "English",
  );
  const english = page.getByRole("link", { name: "EN", exact: true });
  await english.focus();
  expect(
    await english.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe("none");
  await english.press("Escape");
  await expect(summary).toBeFocused();
  await expect(page.locator("header details")).not.toHaveAttribute("open");
  await chooseLanguage(page, "ES");
  await expect(page).toHaveURL(
    /\/es\/slots\/?\?provider=pragmatic-play&page=2&view=covers#main$/,
  );
  await expect(page.locator("#provider")).toHaveValue("pragmatic-play");
  await expect(
    page.locator(".view-controls button[aria-pressed=true]"),
  ).toHaveText("▦");
  await openLanguagePicker(page);
  await page.locator(".results-count").click();
  await expect(page.locator("header details")).not.toHaveAttribute("open");
});
