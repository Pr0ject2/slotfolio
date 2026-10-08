import { expect, test } from "@playwright/test";

const cases = [
  [
    "push-gaming-shamrock-saints",
    "Shamrock Saints"
  ],
  [
    "push-gaming-tarot-treasures",
    "Tarot Treasures"
  ],
  [
    "push-gaming-the-grand-show",
    "The Grand Show"
  ],
  [
    "push-gaming-the-great-banker",
    "The Great Banker"
  ],
  [
    "push-gaming-tiki-tumble",
    "Tiki Tumble"
  ],
  [
    "push-gaming-tricky-treats",
    "Tricky Treats"
  ],
  [
    "push-gaming-triple-rampage",
    "Triple Rampage"
  ],
  [
    "push-gaming-vegas-vault",
    "Vegas Vault"
  ],
  [
    "push-gaming-viva-lock-vegas",
    "Viva Lock Vegas"
  ],
  [
    "push-gaming-wild-swarm",
    "Wild Swarm"
  ],
  [
    "push-gaming-wild-swarm-2",
    "Wild Swarm 2"
  ],
  [
    "push-gaming-wild-swarm-3-chocolate-eggs",
    "Wild Swarm 3 Chocolate Eggs"
  ],
  [
    "push-gaming-wild-swarm-triple-hive",
    "Wild Swarm Triple Hive"
  ],
  [
    "wazdan-12-bells",
    "12 Bells"
  ],
  [
    "wazdan-12-coins",
    "12 Coins"
  ],
  [
    "wazdan-12-coins-grand-diamond-edition",
    "12 Coins Grand Diamond Edition"
  ],
  [
    "wazdan-12-coins-grand-gold-edition",
    "12 Coins Grand Gold Edition"
  ],
  [
    "wazdan-12-coins-grand-platinum-edition",
    "12 Coins Grand Platinum Edition"
  ],
  [
    "wazdan-15-coins",
    "15 Coins"
  ],
  [
    "wazdan-15-coins-grand-diamond-edition",
    "15 Coins Grand Diamond Edition"
  ]
] as const;

test("wave 54 /slots artwork loads in catalog listing", async ({ page }) => {
  for(const [slug, name] of cases){
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const image = card.locator(".catalog-game-art .game-image");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(image).not.toHaveAttribute("src", /unavailable\.svg/);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
