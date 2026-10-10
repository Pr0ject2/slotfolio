import {expect,test} from "@playwright/test";
const cases=[
  [
    "bgaming-3-lucky-monkeys-hold-and-win",
    "3 Lucky Monkeys Hold & Win"
  ],
  [
    "bgaming-bonanza-billion-merge-uptm",
    "Bonanza Billion"
  ],
  [
    "bgaming-book-of-hidden-tombs",
    "Book of Hidden Tombs"
  ],
  [
    "bgaming-cats-love-yummy",
    "Cats Love Yummy"
  ],
  [
    "bgaming-chicken-fire",
    "Chicken Fire"
  ],
  [
    "bgaming-divine-queen-power-of-sun",
    "Divine Queen: Power of Sun"
  ],
  [
    "bgaming-dusty-duel",
    "Dusty Duel"
  ],
  [
    "bgaming-fortune-trio-minions-of-fu",
    "Fortune Trio: Minions Of Fu"
  ],
  [
    "bgaming-frenzy-clusters",
    "Frenzy Clusters"
  ],
  [
    "bgaming-fruit-million-respin",
    "Fruit Million Respin"
  ],
  [
    "bgaming-johnny-vs-chicken",
    "Johnny vs Chicken"
  ],
  [
    "bgaming-miss-cherry-wild-frames",
    "Miss Cherry Wild Frames"
  ],
  [
    "bgaming-money-maker",
    "Money Maker"
  ],
  [
    "bgaming-multi-rush",
    "Multi Rush"
  ],
  [
    "bgaming-mystic-reels",
    "Mystic Reels"
  ],
  [
    "bgaming-red-hot-chilli-chickens",
    "Red Hot Chilli Chickens"
  ],
  [
    "bgaming-reel-of-ra",
    "Reel of Ra"
  ],
  [
    "bgaming-st-patricks-pots-hold-and-win",
    "St. Patrick's Pots Hold and Win"
  ],
  [
    "bgaming-stars-and-stripes-hold-and-win",
    "Stars & Stripes Hold and Win"
  ],
  [
    "bgaming-sweet-samurai",
    "Sweet Samurai"
  ]
] as const;
test("Wave 69: all twenty BGaming cards load exact artwork in /slots",async({page})=>{
for(const [slug,searchTerm] of cases){
await page.goto(`/slots/?q=${encodeURIComponent(searchTerm)}`);
const card=page.locator(`[data-slot="${slug}"]`);
await expect(card).toBeVisible();
const art=card.locator(".catalog-game-art .game-image");
await expect(art).toBeVisible();
await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
await expect(art).not.toHaveAttribute("src",/unavailable\\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}
});
