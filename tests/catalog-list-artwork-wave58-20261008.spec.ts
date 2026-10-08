import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-cube-mania-deluxe",
    "Cube Mania Deluxe"
  ],
  [
    "wazdan-demon-jack-27",
    "Demon Jack 27"
  ],
  [
    "wazdan-dino-reels-81",
    "Dino Reels 81"
  ],
  [
    "wazdan-double-tigers",
    "Double Tigers"
  ],
  [
    "wazdan-draculas-castle",
    "Dracula`s Castle"
  ],
  [
    "wazdan-dragons-lucky-8",
    "Dragons Lucky 8"
  ],
  [
    "wazdan-dwarfs-fortune",
    "Dwarfs Fortune"
  ],
  [
    "wazdan-easter-coins",
    "Easter Coins"
  ],
  [
    "wazdan-eggs-of-fortune",
    "Eggs of Fortune"
  ],
  [
    "wazdan-fenix-play",
    "Fenix"
  ],
  [
    "wazdan-fenix-play-27",
    "Fenix Play 27"
  ],
  [
    "wazdan-fenix-play-27-deluxe",
    "Fenix Play 27 Deluxe"
  ],
  [
    "wazdan-fenix-play-deluxe",
    "Fenix Play Deluxe"
  ],
  [
    "wazdan-fire-bird",
    "Fire Bird"
  ],
  [
    "wazdan-fishermans-luck",
    "Fisherman`s Luck"
  ],
  [
    "wazdan-football-mania",
    "Football Mania"
  ],
  [
    "wazdan-football-mania-deluxe",
    "Football Mania Deluxe"
  ],
  [
    "wazdan-fortune-reels",
    "Fortune Reels"
  ],
  [
    "wazdan-fruit-fiesta",
    "Fruit Fiesta"
  ],
  [
    "wazdan-fruit-mania",
    "Fruit Mania"
  ]
] as const;
test("wave 58 Wazdan /slots catalog: twenty correct and loaded game images", async ({ page }) => {
  for (const [slug, name] of cases) {
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
