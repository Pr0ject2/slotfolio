import { expect, test } from "@playwright/test";

test("Six Feet Under: /slots published card retains reviewed local first-party artwork", async ({ page }) => {
  await page.goto("/slots/?q=Six%20Feet%20Under");
  const card = page.locator('[data-slot="nolimit-city-six-feet-under"]');
  await expect(card).toBeVisible();
  const art = card.locator(".catalog-game-art .game-image");
  await expect(art).toBeVisible();
  await expect(art).toHaveAttribute("src", /\/images\/catalog\/nolimit-city-six-feet-under\.webp$/);
  await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  await art.scrollIntoViewIfNeeded();
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
});
