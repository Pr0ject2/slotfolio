import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-sun-princess",
    "name": "Sun Princess"
  },
  {
    "slug": "hacksaw-gaming-superstar-sevens",
    "name": "Superstar Sevens"
  },
  {
    "slug": "hacksaw-gaming-supreme-zeus",
    "name": "Supreme Zeus"
  },
  {
    "slug": "hacksaw-gaming-tai-the-toad",
    "name": "Tai the Toad"
  },
  {
    "slug": "hacksaw-gaming-temple-of-torment",
    "name": "Temple of Torment"
  },
  {
    "slug": "hacksaw-gaming-the-count",
    "name": "The Count"
  },
  {
    "slug": "hacksaw-gaming-the-luxe",
    "name": "The Luxe"
  },
  {
    "slug": "hacksaw-gaming-the-wildwood-curse",
    "name": "The Wildwood Curse"
  },
  {
    "slug": "hacksaw-gaming-tiger-legends",
    "name": "Tiger Legends"
  },
  {
    "slug": "hacksaw-gaming-toshi-ways-club",
    "name": "Toshi Ways Club"
  },
  {
    "slug": "hacksaw-gaming-twisted-lab",
    "name": "Twisted Lab"
  },
  {
    "slug": "hacksaw-gaming-ultimate-slot-of-america",
    "name": "Ultimate Slot of America"
  },
  {
    "slug": "hacksaw-gaming-vending-machine",
    "name": "Vending Machine"
  },
  {
    "slug": "hacksaw-gaming-wings-of-horus",
    "name": "Wings of Horus"
  },
  {
    "slug": "hacksaw-gaming-wishbringer",
    "name": "Wishbringer"
  },
  {
    "slug": "hacksaw-gaming-xmas-drop",
    "name": "Xmas Drop"
  },
  {
    "slug": "hacksaw-gaming-ze-zeus",
    "name": "Ze Zeus"
  },
  {
    "slug": "hacksaw-gaming-zeus-ze-zecond",
    "name": "Zeus Ze Zecond"
  },
  {
    "slug": "bgaming-yokai",
    "name": "Yokai"
  },
  {
    "slug": "bgaming-wincent-wolf",
    "name": "Wincent Wolf"
  }
] as const;

test("Wave 86: twenty published /slots cards load original localized artwork", async ({ page }) => {
  for (const { slug, name } of cases) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
