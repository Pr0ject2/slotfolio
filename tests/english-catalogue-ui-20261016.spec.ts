import { test, expect } from "@playwright/test";

test("English catalogue and search preserve the 1,000-game index", async ({ page }) => {
  await page.goto("/en/slots/");
  await expect(page.getByRole("heading", { name: /Explore the slot catalogue/ })).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Find a game" })).toBeVisible();
  await expect(page.getByRole("status").first()).toContainText("1000 games");
  await expect(page.getByText("The game descriptions and detailed reviews are currently available in Russian.")).toBeVisible();
  await expect(page.locator(".catalog-results")).toHaveAttribute("lang", "ru");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.goto("/en/search/");
  await expect(page.getByRole("heading", { name: "Search the catalogue" })).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Find a game" })).toBeVisible();
});
