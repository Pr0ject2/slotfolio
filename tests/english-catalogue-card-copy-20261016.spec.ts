import { test, expect } from "@playwright/test";

test("English catalogue links reviewed dossiers and labels untranslated records", async ({ page }) => {
  await page.goto("/en/slots/");
  const translated = page.locator('[data-slot="gates-of-olympus"]');
  await expect(translated).toBeVisible();
  await expect(translated.locator('h2 a')).toHaveAttribute("href", /\/en\/slots\/gates-of-olympus/);
  const untranslated = page.locator('.catalog-game').filter({ hasText: "Detailed review in Russian" }).first();
  await expect(untranslated).toBeVisible();
  await expect(untranslated.locator("dl")).toHaveAttribute("aria-label", "Game details");
  await expect(page.getByText("The game descriptions and detailed reviews are currently available in Russian.")).toBeVisible();
});

test("Gates of Olympus has a source-backed English game guide", async ({ page }) => {
  await page.goto("/en/slots/gates-of-olympus/");
  await expect(page.getByRole("heading", { name: "Gates of Olympus", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How wins are formed" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sources and limitations" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
