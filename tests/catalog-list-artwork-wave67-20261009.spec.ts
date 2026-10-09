import { expect, test } from "@playwright/test";
const cases = [
  [
    "3-oaks-gaming-hit-the-gold",
    "Hit the Gold!"
  ],
  [
    "3-oaks-gaming-hot-fire-fruits",
    "Hot Fire Fruits"
  ],
  [
    "3-oaks-gaming-joker-glitz-x1000",
    "Joker Glitz x1000"
  ],
  [
    "3-oaks-gaming-lady-fortune",
    "Lady Fortune"
  ],
  [
    "3-oaks-gaming-lava-coins",
    "Lava Coins"
  ],
  [
    "3-oaks-gaming-lava-coins-2",
    "Lava Coins 2"
  ],
  [
    "3-oaks-gaming-little-farm",
    "Little Farm"
  ],
  [
    "3-oaks-gaming-lord-of-thunder",
    "Lord of Thunder"
  ],
  [
    "3-oaks-gaming-lucky-apple-x1000",
    "Lucky Apple x1000"
  ],
  [
    "3-oaks-gaming-lucky-penny",
    "Lucky Penny"
  ],
  [
    "3-oaks-gaming-lucky-penny-2",
    "Lucky Penny 2"
  ],
  [
    "3-oaks-gaming-lucky-penny-3-pots-super-wheel",
    "Lucky Penny 3 Pots: Super Wheel"
  ],
  [
    "3-oaks-gaming-lucky-penny-power-scatter",
    "Lucky Penny Power Scatter"
  ],
  [
    "3-oaks-gaming-magic-apple",
    "Magic Apple"
  ],
  [
    "3-oaks-gaming-magic-apple-2",
    "Magic Apple 2"
  ],
  [
    "3-oaks-gaming-magic-clovers",
    "Magic Clovers"
  ]
] as const;
test("wave 67 /slots catalog artwork regression final fourteen",async({page})=>{for(const [slug,name] of cases){
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
