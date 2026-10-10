import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-demon",
    "Demon"
  ],
  [
    "playn-go-derby-wheel",
    "Derby Wheel"
  ],
  [
    "playn-go-diamond-vortex",
    "Diamond Vortex"
  ],
  [
    "playn-go-diamonds-of-the-realm",
    "Diamonds of the Realm"
  ],
  [
    "playn-go-dio-killing-the-dragon",
    "Dio Killing the Dragon"
  ],
  [
    "playn-go-disco-diamonds",
    "Disco Diamonds"
  ],
  [
    "playn-go-divina-commedia-i-nove-cerchi",
    "Divina Commedia I Nove Cerchi"
  ],
  [
    "playn-go-divine-showdown",
    "Divine Showdown"
  ],
  [
    "playn-go-doom-of-egypt",
    "Doom of Egypt"
  ],
  [
    "3-oaks-gaming-super-china-pots",
    "Super China Pots"
  ],
  [
    "3-oaks-gaming-super-hot-chilli",
    "Super Hot Chilli"
  ],
  [
    "3-oaks-gaming-super-hot-teapots",
    "Super Hot Teapots"
  ],
  [
    "3-oaks-gaming-super-hotfire-diamonds",
    "Super Hotfire Diamonds"
  ],
  [
    "3-oaks-gaming-super-sticky-piggy",
    "Super Sticky Piggy"
  ],
  [
    "3-oaks-gaming-supreme-diamond-xxl",
    "Supreme Diamond XXL"
  ],
  [
    "3-oaks-gaming-thunder-tiger",
    "Thunder Tiger"
  ],
  [
    "3-oaks-gaming-tiger-gems",
    "Tiger Gems"
  ],
  [
    "3-oaks-gaming-tiger-jungle",
    "Tiger Jungle"
  ],
  [
    "3-oaks-gaming-wolf-night",
    "Wolf Night"
  ],
  [
    "bgaming-the-godfather-3-pillars-of-power",
    "The Godfather: 3 Pillars of Power"
  ]
] as const;
test("Wave 80: /slots catalog art is local and fully loaded",async({page})=>{for(const [slug,name] of cases){await page.goto(`/slots/?q=${encodeURIComponent(name)}`);const card=page.locator(`[data-slot="${slug}"]`);await expect(card).toBeVisible();const art=card.locator(".catalog-game-art .game-image");await expect(art).toBeVisible();await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));await expect(art).not.toHaveAttribute("src",/unavailable\.svg/);await art.scrollIntoViewIfNeeded();await expect.poll(async()=>art.evaluate(x=>(x as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);await expect.poll(async()=>art.evaluate(x=>(x as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);}});
