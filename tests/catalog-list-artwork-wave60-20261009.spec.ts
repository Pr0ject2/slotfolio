import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-hot-slot-777-coins",
    "Hot Slot: 777 Coins"
  ],
  [
    "wazdan-hot-slot-777-coins-extremely-light",
    "Hot Slot: 777 Coins Extremely Light"
  ],
  [
    "wazdan-hot-slot-777-crown-extremely-light",
    "Hot Slot: 777 Crown Extremely Light"
  ],
  [
    "wazdan-hot-slot-777-diamond-crown",
    "Hot Slot: 777 Diamond Crown"
  ],
  [
    "wazdan-hot-slot-777-gold-crown",
    "Hot Slot: 777 Gold Crown"
  ],
  [
    "wazdan-hot-slot-777-hold-the-jackpot",
    "Hot Slot: 777 Hold the Jackpot"
  ],
  [
    "wazdan-hot-slot-777-platinum-crown",
    "Hot Slot: 777 Platinum Crown"
  ],
  [
    "wazdan-hot-slot-777-rubies",
    "Hot Slot: 777 Rubies"
  ],
  [
    "wazdan-hot-slot-777-rubies-extremely-light",
    "Hot Slot: 777 Rubies Extremely Light"
  ],
  [
    "wazdan-hot-slot-777-stars",
    "Hot Slot: 777 Stars"
  ],
  [
    "wazdan-hot-slot-777-stars-extremely-light",
    "Hot Slot: 777 Stars Extremely Light"
  ],
  [
    "wazdan-hot-slot-diamond-coins",
    "Hot Slot: Diamond Coins"
  ],
  [
    "wazdan-hot-slot-gold-coins",
    "Hot Slot: Gold Coins"
  ],
  [
    "wazdan-hot-slot-great-book-of-magic",
    "Hot Slot: Great Book of Magic"
  ],
  [
    "wazdan-hot-slot-magic-bombs",
    "Hot Slot: Magic Bombs"
  ],
  [
    "wazdan-hot-slot-magic-pearls",
    "Hot Slot: Magic Pearls"
  ],
  [
    "wazdan-hot-slot-mystery-jackpot-joker",
    "Hot Slot: Mystery Jackpot Joker"
  ],
  [
    "wazdan-hot-slot-platinum-coins",
    "Hot Slot: Platinum Coins"
  ],
  [
    "wazdan-hungry-shark",
    "Hungry Shark"
  ],
  [
    "wazdan-in-the-forest",
    "In The Forest"
  ]
] as const;
test("wave 60 Wazdan /slots listing shows exact loaded official image on twenty cards", async ({page}) => {
for (const [slug, name] of cases) {
await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
const card=page.locator(`[data-slot="${slug}"]`);
await expect(card).toBeVisible();
const art=card.locator(".catalog-game-art .game-image");
await expect(art).toBeVisible();
await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
await expect(art).not.toHaveAttribute("src",/unavailable\\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}});
