import { test, expect } from "@playwright/test";

test("uses the browser language on first visit and keeps a manual choice", async ({ browser }) => {
  const context = await browser.newContext({ locale: "en-GB" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "RU", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.evaluate(() => localStorage.getItem("slotfolio-language"))).resolves.toBe("ru");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await context.close();
});

test("retains the English selection on a Russian URL", async ({ browser }) => {
  const context = await browser.newContext({ locale: "ru-RU" });
  await context.addInitScript(() => localStorage.setItem("slotfolio-language", "en"));
  const page = await context.newPage();
  await page.goto("/slots/");
  await expect(page).toHaveURL(/\/en\/slots\/?$/);
  await expect(page.getByRole("heading", { name: /Explore the slot catalogue/ })).toBeVisible();
  await context.close();
});
