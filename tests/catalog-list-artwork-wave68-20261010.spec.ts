import { expect, test } from "@playwright/test";

const cases = [
  [
    "3-oaks-gaming-buddha-megaways",
    "Buddha Megaways"
  ],
  [
    "3-oaks-gaming-chili-coins",
    "Chili Coins"
  ],
  [
    "3-oaks-gaming-china-festival",
    "China Festival"
  ],
  [
    "3-oaks-gaming-coin-express",
    "Coin Express"
  ],
  [
    "3-oaks-gaming-coin-lamp",
    "Coin Lamp"
  ],
  [
    "3-oaks-gaming-coin-princess-x1000",
    "Coin Princess x1000"
  ],
  [
    "3-oaks-gaming-coin-volcano",
    "Coin Volcano"
  ],
  [
    "3-oaks-gaming-crystal-scarabs",
    "Crystal Scarabs"
  ],
  [
    "3-oaks-gaming-dancing-joker",
    "Dancing Joker"
  ],
  [
    "3-oaks-gaming-dj-tiger-x1000",
    "DJ Tiger x1000"
  ],
  [
    "3-oaks-gaming-gold-express",
    "Gold Express"
  ],
  [
    "3-oaks-gaming-gold-nuggets",
    "Gold Nuggets"
  ],
  [
    "3-oaks-gaming-golden-teapot",
    "Golden Teapot"
  ],
  [
    "3-oaks-gaming-grab-more-gold",
    "Grab more Gold!"
  ],
  [
    "3-oaks-gaming-moon-sisters",
    "Moon Sisters"
  ],
  [
    "3-oaks-gaming-more-magic-apple",
    "More Magic Apple"
  ],
  [
    "3-oaks-gaming-power-sun",
    "Power Sun"
  ],
  [
    "3-oaks-gaming-power-sun-xxl",
    "Power Sun XXL"
  ],
  [
    "3-oaks-gaming-purple-diamond",
    "Purple Diamond"
  ],
  [
    "3-oaks-gaming-rio-gems",
    "Rio Gems"
  ]
] as const;

test("Wave 68: twenty 3 Oaks /slots artwork cards", async ({ page }) => {
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
