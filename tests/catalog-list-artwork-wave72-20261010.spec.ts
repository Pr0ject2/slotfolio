import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-boat-bonanza-croconile",
    "Boat Bonanza CrocoNile!"
  ],
  [
    "playn-go-boat-bonanza-down-under",
    "Boat Bonanza Down Under"
  ],
  [
    "playn-go-book-of-dead-go-collect",
    "Book of Dead GO Collect"
  ],
  [
    "playn-go-bubblin-riches",
    "Bubblin' Riches"
  ],
  [
    "playn-go-buildin-bucks",
    "Buildin' Bucks"
  ],
  [
    "playn-go-buildin-even-more-bucks",
    "Buildin' Even More Bucks"
  ],
  [
    "playn-go-buildin-more-bucks",
    "Buildin' More Bucks"
  ],
  [
    "playn-go-bull-in-a-china-shop",
    "Bull in a China Shop"
  ],
  [
    "playn-go-bull-in-a-rodeo",
    "Bull in a Rodeo"
  ],
  [
    "playn-go-bullion-xpress",
    "Bullion Xpress"
  ],
  [
    "playn-go-candy-island-princess",
    "Candy Island Princess"
  ],
  [
    "playn-go-canine-carnage",
    "Canine Carnage"
  ],
  [
    "playn-go-captain-glum-pirate-hunter",
    "Captain Glum: Pirate Hunter"
  ],
  [
    "playn-go-captain-xenos-earth-adventure",
    "Captain Xeno's Earth Adventure"
  ],
  [
    "playn-go-cash-of-command",
    "Cash of Command"
  ],
  [
    "playn-go-cash-pump",
    "Cash Pump"
  ],
  [
    "playn-go-cash-vandal",
    "Cash Vandal"
  ],
  [
    "playn-go-cash-a-cabana",
    "Cash-a-Cabana"
  ],
  [
    "playn-go-cashin-joker",
    "Cashin' Joker"
  ],
  [
    "playn-go-cat-wilde-and-the-doom-of-dead",
    "Cat Wilde and the Doom of Dead"
  ]
] as const;
test("Wave 72: 20 Play’n GO /slots artworks",async({page})=>{for(const [slug,name] of cases){
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