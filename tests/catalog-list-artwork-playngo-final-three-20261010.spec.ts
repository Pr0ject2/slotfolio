import { expect, test } from "@playwright/test";

const cases = [
  [
    "playn-go-raging-rex-3",
    "Raging Rex 3"
  ],
  [
    "playn-go-rainforest-magic",
    "Rainforest Magic"
  ],
  [
    "playn-go-rally-4-riches",
    "Rally 4 Riches"
  ]
] as const;

test("Play’n GO: three remaining published /slots artwork cards", async ({ page }) => {
  for (const [slug, name] of cases) {
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
  }
});
