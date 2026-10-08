import { expect, test } from "@playwright/test";
const slots = [
  [
    "push-gaming-big-bite",
    "Big Bite"
  ],
  [
    "push-gaming-big-bite-push-ways",
    "Big Bite Push Ways"
  ],
  [
    "push-gaming-bison-battle",
    "Bison Battle"
  ],
  [
    "push-gaming-blaze-of-ra",
    "Blaze of Ra"
  ],
  [
    "push-gaming-boss-bear",
    "Boss Bear"
  ],
  [
    "push-gaming-candy-blast",
    "Candy Blast"
  ],
  [
    "push-gaming-cats-of-olympuss",
    "Cats of Olympuss"
  ],
  [
    "push-gaming-crystal-catcher",
    "Crystal Catcher"
  ],
  [
    "push-gaming-deadly-5",
    "Deadly 5"
  ],
  [
    "push-gaming-diamond-supernova-100",
    "Diamond Supernova 100"
  ],
  [
    "push-gaming-diamond-supernova-20",
    "Diamond Supernova 20"
  ],
  [
    "push-gaming-diamond-supernova-40",
    "Diamond Supernova 40"
  ],
  [
    "push-gaming-diamond-supernova-5",
    "Diamond Supernova 5"
  ],
  [
    "push-gaming-diamonds-4-the-win",
    "Diamonds 4 The Win"
  ],
  [
    "push-gaming-dino-p-d",
    "Dino P.D."
  ],
  [
    "push-gaming-dinopolis",
    "Dinopolis"
  ],
  [
    "push-gaming-dj-cat",
    "DJ Cat"
  ],
  [
    "push-gaming-dj-fox",
    "DJ Fox"
  ],
  [
    "push-gaming-dragon-hopper",
    "Dragon Hopper"
  ],
  [
    "push-gaming-fang-city",
    "Fang City"
  ]
] as const;

test("wave 51 all Push Gaming artwork is localized and loaded in /slots", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
