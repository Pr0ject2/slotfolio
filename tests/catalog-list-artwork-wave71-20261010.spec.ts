import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-aztec-warrior-princess",
    "Aztec Warrior Princess"
  ],
  [
    "playn-go-bakers-treat",
    "Baker's Treat"
  ],
  [
    "playn-go-banana-rock",
    "Banana Rock"
  ],
  [
    "playn-go-banana-rush",
    "Banana Rush"
  ],
  [
    "playn-go-banquet-of-dead",
    "Banquet of Dead"
  ],
  [
    "playn-go-bao-shi",
    "Bao Shi"
  ],
  [
    "playn-go-barn-busters",
    "Barn Busters"
  ],
  [
    "playn-go-baron-lord-of-saturday",
    "Baron: Lord of Saturday"
  ],
  [
    "playn-go-battle-royal",
    "Battle Royal"
  ],
  [
    "playn-go-beasts-of-fire",
    "Beasts of Fire"
  ],
  [
    "playn-go-beasts-of-fire-maximum",
    "Beasts of Fire Maximum"
  ],
  [
    "playn-go-big-win-777",
    "Big Win 777"
  ],
  [
    "playn-go-big-win-cat",
    "Big Win Cat"
  ],
  [
    "playn-go-big-win-cat-pawsperity",
    "Big Win Cat Pawsperity"
  ],
  [
    "playn-go-black-mamba",
    "Black Mamba"
  ],
  [
    "playn-go-blazin-bullfrog",
    "Blazin' Bullfrog"
  ],
  [
    "playn-go-blinged",
    "Blinged"
  ],
  [
    "playn-go-boat-bonanza",
    "Boat Bonanza"
  ],
  [
    "playn-go-boat-bonanza-christmas",
    "Boat Bonanza Christmas"
  ],
  [
    "playn-go-boat-bonanza-colossal-catch",
    "Boat Bonanza Colossal Catch"
  ]
] as const;
test("Wave 71: twenty Play’n GO catalog list artwork regression",async({page})=>{for(const [slug,name] of cases){
await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
const card=page.locator(`[data-slot="${slug}"]`);
await expect(card).toBeVisible();
const art=card.locator(".catalog-game-art .game-image");
await expect(art).toBeVisible();
await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
await expect(art).not.toHaveAttribute("src",/unavailable\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}});
