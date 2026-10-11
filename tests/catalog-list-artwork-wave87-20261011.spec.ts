import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "bgaming-alien-fruits-3",
    "name": "Alien Fruits 3"
  },
  {
    "slug": "bgaming-train-heist-johnny-cash",
    "name": "Train Heist Johnny Cash"
  },
  {
    "slug": "endorphina-3-golden-chests",
    "name": "3 Golden Chests"
  },
  {
    "slug": "endorphina-burning-coins-100",
    "name": "Burning Coins 100"
  },
  {
    "slug": "endorphina-burning-coins-20-dice",
    "name": "Burning Coins 20 Dice"
  },
  {
    "slug": "endorphina-chance-machine-90s",
    "name": "Chance Machine 90s"
  },
  {
    "slug": "endorphina-druids-fortune",
    "name": "Druids Fortune"
  },
  {
    "slug": "endorphina-fortune-bankers",
    "name": "Fortune Bankers"
  },
  {
    "slug": "endorphina-fortune-chests-dice",
    "name": "Fortune Chests Dice"
  },
  {
    "slug": "endorphina-gift-of-midas",
    "name": "Gift of Midas"
  },
  {
    "slug": "endorphina-groovin-tiger",
    "name": "Groovin Tiger"
  },
  {
    "slug": "endorphina-hell-hot-1000",
    "name": "Hell Hot 1000"
  },
  {
    "slug": "endorphina-moofo",
    "name": "MooFo"
  },
  {
    "slug": "endorphina-zalatar",
    "name": "Zalatar"
  },
  {
    "slug": "nolimit-city-ding-dong-death",
    "name": "Ding Dong Death"
  },
  {
    "slug": "nolimit-city-duck-hunters-2",
    "name": "Duck Hunters 2"
  },
  {
    "slug": "nolimit-city-gator-hunters-2",
    "name": "Gator Hunters 2"
  },
  {
    "slug": "hacksaw-gaming-death-becomes-you",
    "name": "Death Becomes You"
  },
  {
    "slug": "hacksaw-gaming-le-football-fan",
    "name": "Le Football Fan"
  },
  {
    "slug": "hacksaw-gaming-le-pharaoh",
    "name": "Le Pharaoh"
  }
] as const;

test("Wave 87: twenty published /slots cards load reviewed local WebP", async ({ page }) => {
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
