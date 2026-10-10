import { expect, test } from "@playwright/test";

const cases = [
  [
    "playn-go-jade-magician",
    "Jade Magician"
  ],
  [
    "playn-go-jewel-box",
    "Jewel Box"
  ],
  [
    "playn-go-joker-flip",
    "Joker Flip"
  ],
  [
    "playn-go-jolly-roger",
    "Jolly Roger"
  ],
  [
    "playn-go-jolly-roger-2",
    "Jolly Roger 2"
  ],
  [
    "playn-go-jolly-roger-wild-kraken",
    "Jolly Roger Wild Kraken"
  ],
  [
    "playn-go-journey-to-paris",
    "Journey to Paris"
  ],
  [
    "playn-go-king-of-sweets",
    "King of Sweets"
  ],
  [
    "playn-go-kings-mask",
    "King's Mask"
  ],
  [
    "playn-go-kings-mask-eclipse-of-gods",
    "King's Mask Eclipse of Gods"
  ],
  [
    "playn-go-kingdom-below",
    "Kingdom Below"
  ],
  [
    "3-oaks-gaming-rush-for-gold",
    "Rush for Gold"
  ],
  [
    "3-oaks-gaming-sky-pearls",
    "Sky Pearls"
  ],
  [
    "3-oaks-gaming-space-coins",
    "Space Coins"
  ],
  [
    "3-oaks-gaming-sun-of-egypt",
    "Sun of Egypt"
  ],
  [
    "3-oaks-gaming-sun-of-egypt-2",
    "Sun of Egypt 2"
  ],
  [
    "3-oaks-gaming-sun-of-egypt-3",
    "Sun of Egypt 3"
  ],
  [
    "3-oaks-gaming-sun-of-egypt-4",
    "Sun of Egypt 4"
  ],
  [
    "3-oaks-gaming-sun-of-egypt-5",
    "Sun of Egypt 5"
  ],
  [
    "3-oaks-gaming-sunlight-princess",
    "Sunlight Princess"
  ]
] as const;

test("Wave 79: twenty published /slots artworks load from checked-in files", async ({ page }) => {
  for (const [slug, name] of cases) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const image = card.locator(".catalog-game-art .game-image");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(image).not.toHaveAttribute("src", /unavailable\.svg/);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
