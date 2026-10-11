import { expect, test } from "@playwright/test";

const cases = [
  {
    "old": "nolimit-city-bowel-of-beelzebub",
    "slug": "playn-go-reactoonz-100",
    "name": "Reactoonz 100"
  },
  {
    "old": "nolimit-city-fire-in-the-hole-4",
    "slug": "playn-go-rich-wilde-and-the-book-of-dead",
    "name": "Rich Wilde and the Book of Dead"
  },
  {
    "old": "playn-go-def-leppard-hysteria",
    "slug": "playn-go-rise-of-olympus-100",
    "name": "Rise of Olympus 100"
  }
] as const;

test("Three substitutions remain visible in /slots while replaced slugs are absent", async ({ page }) => {
 for (const { old, slug, name } of cases) {
  await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
  const card = page.locator(`[data-slot="${slug}"]`);
  await expect(card).toBeVisible();
  const art = card.locator(".catalog-game-art .game-image");
  await expect(art).toBeVisible();
  await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
  await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  await art.scrollIntoViewIfNeeded();
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  await page.goto(`/slots/?q=${encodeURIComponent(old)}`);
  await expect(page.locator(`[data-slot="${old}"]`)).toHaveCount(0);
 }
});
