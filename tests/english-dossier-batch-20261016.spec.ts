import { test, expect } from "@playwright/test";

const translated = [
  "gates-of-olympus",
  "sweet-bonanza",
  "book-of-dead",
  "reactoonz",
  "the-dog-house",
  "big-bass-bonanza",
];

test("six English full dossiers expose real editorial copy and remain noindex", async ({ page }) => {
  for (const slug of translated) {
    await page.goto(`/en/slots/${slug}/`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "Editorial perspective" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("link", { name: /Safer gambling/i }).first()).toBeVisible();
  }
});
test("English catalogue leads to translated dossiers without changing the game count", async ({ page }) => {
  await page.goto("/en/slots/");
  await expect(page.getByRole("status").first()).toContainText("1000 games");
  for (const slug of translated) {
    await expect(page.locator(`[data-slot="${slug}"] h2 a`)).toHaveAttribute("href", new RegExp(`/en/slots/${slug}`));
  }
});
