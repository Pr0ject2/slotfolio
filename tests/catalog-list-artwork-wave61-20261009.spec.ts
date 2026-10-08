import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-infinity-hero",
    "Infinity Hero"
  ],
  [
    "wazdan-jack-on-hold",
    "Jack On Hold"
  ],
  [
    "wazdan-jacks-ride",
    "Jack’s Ride"
  ],
  [
    "wazdan-jackpot-builders",
    "Jackpot Builders"
  ],
  [
    "wazdan-jelly-reels",
    "Jelly Reels"
  ],
  [
    "wazdan-joker-explosion",
    "Joker Explosion"
  ],
  [
    "wazdan-juicy-reels",
    "Juicy Reels"
  ],
  [
    "wazdan-jumping-fruits",
    "Jumping Fruits"
  ],
  [
    "wazdan-kick-off",
    "Kick Off"
  ],
  [
    "wazdan-larry-the-leprechaun",
    "Larry the Leprechaun"
  ],
  [
    "wazdan-los-muertos",
    "Los Muertos"
  ],
  [
    "wazdan-los-muertos-ii",
    "Los Muertos II"
  ],
  [
    "wazdan-lost-treasure",
    "Lost Treasure"
  ],
  [
    "wazdan-lucky-9",
    "Lucky 9"
  ],
  [
    "wazdan-lucky-fish",
    "Lucky Fish"
  ],
  [
    "wazdan-lucky-fortune",
    "Lucky Fortune"
  ],
  [
    "wazdan-lucky-queen",
    "Lucky Queen"
  ],
  [
    "wazdan-lucky-reels",
    "Lucky Reels"
  ],
  [
    "wazdan-magic-eggs",
    "Magic Eggs"
  ],
  [
    "wazdan-magic-fruit-cherries",
    "Magic Fruit Cherries"
  ]
] as const;
test("wave 61 Wazdan: twenty exact /slots artworks load",async({page})=>{for(const [slug,name] of cases){
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
