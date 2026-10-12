import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

for (const path of ["/slots", "/search"]) {
  test(`catalog avoids internal coverage labels on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(path);

    await expect(page.locator(".results-count")).toHaveText("1000 игр");
    await expect(page.locator(".results-composition")).toHaveCount(0);
    await expect(page.locator(".data-note")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("RTP показывается только там");
    await expect(page.locator("body")).not.toContainText("У конкретного оператора конфигурация RTP может отличаться");
    await expect(page.getByRole("link", { name: "Как читать RTP" })).toHaveCount(0);
    await expect(page.locator(".catalog-end")).not.toContainText("Страница ");
    await expect(page.locator(".catalog-end")).not.toContainText("Показаны все игры");
    await expect(page.locator(".catalog-end").getByRole("link", { name: /сравнению/ })).toBeVisible();

    await page.getByRole("button", { name: /Фильтры/ }).click();
    const mechanics = page.getByRole("group", { name: "Механика" });
    await expect(mechanics.getByRole("radio", { name: "Все механики" })).toBeChecked();
    await expect(mechanics.getByRole("radio", { name: "Все механики" }).locator("..")).toHaveText("Все механики");
    await expect(mechanics).not.toContainText("Механика подтверждена");
    await expect(mechanics.locator("label").nth(1).locator("span")).toHaveCount(1);
  });
}

test("useful result counts, filters and pagination remain", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/slots");

  const pagination = page.getByRole("navigation", { name: "Страницы каталога" });
  await expect(pagination).toBeVisible();
  await expect(pagination.locator(".catalog-range")).toContainText("1–18 из 1000");
  await pagination.getByRole("button", { name: "Следующая страница" }).click();
  await expect(pagination.locator(".catalog-range")).toContainText("19–36 из 1000");

  await page.goto("/slots?q=Mayan%20Ritual");
  await expect(page.locator(".results-count")).toHaveText("Найдено 1 из 1000");
  await expect(page.locator('.catalog-game[data-slot="wazdan-mayan-ritual"]')).toBeVisible();
  await expect(page.locator(".catalog-end")).toContainText("Перейти к сравнению");
});
