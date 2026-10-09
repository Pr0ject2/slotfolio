import { expect, test } from "@playwright/test";
const cases=[
  [
    "wazdan-valhalla",
    "Valhalla"
  ],
  [
    "wazdan-vegas-hot",
    "Vegas Hot"
  ],
  [
    "wazdan-vegas-hot-81",
    "Vegas Hot 81"
  ],
  [
    "wazdan-vegas-reels-ii",
    "Vegas Reels II"
  ],
  [
    "wazdan-welcome-to-hell-81",
    "Welcome To Hell 81"
  ],
  [
    "wazdan-wild-girls",
    "Wild Girls"
  ],
  [
    "wazdan-wild-guns",
    "Wild Guns"
  ],
  [
    "wazdan-wild-jack",
    "Wild Jack"
  ],
  [
    "wazdan-wild-jack-81",
    "Wild Jack 81"
  ],
  [
    "wazdan-win-replay",
    "Win & Replay"
  ],
  [
    "3-oaks-gaming-coin-up-volcano",
    "Coin UP Volcano"
  ],
  [
    "3-oaks-gaming-coin-up-hot-fire",
    "Coin UP: Hot Fire"
  ],
  [
    "3-oaks-gaming-coin-up-lightning",
    "Coin UP: Lightning"
  ],
  [
    "3-oaks-gaming-dragon-pearls",
    "Dragon Pearls"
  ],
  [
    "3-oaks-gaming-fishin-bear",
    "Fishin' Bear"
  ],
  [
    "3-oaks-gaming-grab-the-gold",
    "Grab the Gold!"
  ],
  [
    "3-oaks-gaming-grand",
    "Grand"
  ],
  [
    "3-oaks-gaming-green-chilli",
    "Green Chilli"
  ],
  [
    "3-oaks-gaming-green-chilli-2",
    "Green Chilli 2"
  ],
  [
    "3-oaks-gaming-hit-more-gold",
    "Hit more Gold!"
  ]
] as const;
test("wave 66 /slots exact artwork regression twenty real images",async({page})=>{for(const [slug,name] of cases){
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
