import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-feel-the-beat",
    "name": "Feel the Beat"
  },
  {
    "slug": "hacksaw-gaming-fighter-pit",
    "name": "Fighter Pit"
  },
  {
    "slug": "hacksaw-gaming-fire-my-laser",
    "name": "Fire my Laser"
  },
  {
    "slug": "hacksaw-gaming-fist-of-destruction",
    "name": "Fist of Destruction"
  },
  {
    "slug": "hacksaw-gaming-freds-food-truck",
    "name": "Freds Food Truck"
  },
  {
    "slug": "hacksaw-gaming-frkn-bananas",
    "name": "FRKN Bananas"
  },
  {
    "slug": "hacksaw-gaming-get-the-cheese",
    "name": "Get the CHEESE"
  },
  {
    "slug": "hacksaw-gaming-great-game-rockies",
    "name": "Great Game Rockies"
  },
  {
    "slug": "hacksaw-gaming-grug-make-fire",
    "name": "Grug Make Fire"
  },
  {
    "slug": "hacksaw-gaming-hot-ross",
    "name": "Hot Ross"
  },
  {
    "slug": "hacksaw-gaming-hounds-of-hell",
    "name": "Hounds of Hell"
  },
  {
    "slug": "hacksaw-gaming-immortal-desire",
    "name": "Immortal Desire"
  },
  {
    "slug": "hacksaw-gaming-invictus",
    "name": "Invictus"
  },
  {
    "slug": "hacksaw-gaming-jaws-of-justice",
    "name": "Jaws of Justice"
  },
  {
    "slug": "hacksaw-gaming-jelly-slice",
    "name": "Jelly Slice"
  },
  {
    "slug": "hacksaw-gaming-keepem",
    "name": "Keep'em"
  },
  {
    "slug": "hacksaw-gaming-klowns",
    "name": "Klowns"
  },
  {
    "slug": "hacksaw-gaming-le-bunny",
    "name": "Le Bunny"
  },
  {
    "slug": "hacksaw-gaming-le-cowboy",
    "name": "Le Cowboy"
  },
  {
    "slug": "hacksaw-gaming-le-digger",
    "name": "Le Digger"
  }
] as const;

test("Wave 83: 20 published /slots listing cards show reviewed artwork", async ({ page }) => {
  for (const { slug, name } of cases) {
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
