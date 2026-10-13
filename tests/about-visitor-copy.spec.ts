import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

test("about page explains Slotfolio to readers without development notes", async ({ page }) => {
  await page.goto("/about");

  await expect(page).toHaveTitle(/О Slotfolio — каталог слотов и сравнение игр/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("У каждой игры");
  await expect(page.locator(".prose h2")).toHaveText([
    "Что такое Slotfolio",
    "Что здесь можно найти",
    "Можно ли доверять характеристикам?",
    "Важно помнить",
    "Партнёрские ссылки",
  ]);
  await expect(page.locator(".prose")).toContainText("1000 слотов");
  await expect(page.locator(".prose")).toContainText("не заменяем их догадками");
  await expect(page.locator(".prose")).toContainText("Ни одна игра не обещает выигрыш");

  for (const phrase of [
    "контентный проект",
    "механика связей",
    "страновые разделы",
    "перед запуском",
    "1win",
    "проверяемого каталога",
  ]) {
    await expect(page.locator("article.prose")).not.toContainText(phrase);
  }

  for (const path of [
    "/slots",
    "/mechanics",
    "/compare",
    "/responsible-gaming",
    "/editorial-policy",
    "/disclosure",
  ]) {
    await expect(page.locator(`a[href="${path}"]`).first()).toBeVisible();
  }
});

test("reader-friendly About page remains readable at narrow widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    await expect(page.locator("h1.about-statement")).toBeVisible();
    await expect(page.locator("article.prose")).toBeVisible();
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(width + 1);
  }
});
