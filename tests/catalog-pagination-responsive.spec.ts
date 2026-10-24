import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`catalog pagination is readable and works at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots?page=28");

    const nav = page.getByRole("navigation", { name: "Страницы каталога" });
    const back = nav.getByRole("button", { name: "Предыдущая страница" });
    const forward = nav.getByRole("button", { name: "Следующая страница" });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("combobox", { name: "Перейти к странице" })).toHaveValue("28");
    await expect(nav.locator("select option")).toHaveCount(56);
    await expect(nav.locator(".catalog-range")).toHaveText("487–504 из 1000");

    if (width >= 951) {
      const numbered = nav.locator(".catalog-page-numbers");
      await expect(numbered).toBeVisible();
      await expect(numbered.locator('[aria-current="page"]')).toHaveText("28");
      await expect(numbered.locator(".catalog-page-gap")).toHaveCount(2);
      await expect(numbered.getByRole("button", { name: "Перейти на страницу 56" })).toBeVisible();
      await expect(nav.locator(".catalog-page-status")).toBeHidden();
    } else {
      await expect(nav.locator(".catalog-page-numbers")).toBeHidden();
      await expect(nav.getByRole("combobox", { name: "Перейти к странице" })).toBeVisible();
      await expect(nav.getByRole("combobox", { name: "Перейти к странице" }).locator("option:checked")).toHaveText("28");
    }

    for (const control of [back, forward]) {
      const box = await control.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    await forward.click();
    await expect(nav.locator(".catalog-range")).toHaveText("505–522 из 1000");
    await expect(page).toHaveURL(/page=29/);
    await expect(page.locator(".results")).toBeFocused();
    await back.click();
    await expect(nav.locator(".catalog-range")).toHaveText("487–504 из 1000");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  });
}

test("numbered pagination reaches last page, marks it active and disables next", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/slots");

  const nav = page.getByRole("navigation", { name: "Страницы каталога" });
  const numbered = nav.locator(".catalog-page-numbers");
  await expect(numbered.locator('[aria-current="page"]')).toHaveText("1");
  await expect(nav.getByRole("button", { name: "Предыдущая страница" })).toBeDisabled();
  await numbered.getByRole("button", { name: "Перейти на страницу 56" }).click();
  await expect(nav.locator(".catalog-range")).toHaveText("991–1000 из 1000");
  await expect(numbered.locator('[aria-current="page"]')).toHaveText("56");
  await expect(nav.getByRole("button", { name: "Следующая страница" })).toBeDisabled();
});

test("one filtered result does not show pagination", async ({ page }) => {
  await page.goto("/slots?q=Mayan%20Ritual");
  await expect(page.locator(".results-count")).toHaveText("Найдено 1 из 1000");
  await expect(page.getByRole("navigation", { name: "Страницы каталога" })).toHaveCount(0);
});
