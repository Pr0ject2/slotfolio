import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-fruit-mania-deluxe",
    "Fruit Mania Deluxe"
  ],
  [
    "wazdan-fruits-go-bananas",
    "Fruits Go Bananas"
  ],
  [
    "wazdan-gem-splitter",
    "Gem Splitter"
  ],
  [
    "wazdan-golden-sphinx",
    "Golden Sphinx"
  ],
  [
    "wazdan-good-luck-40",
    "Good Luck 40"
  ],
  [
    "wazdan-great-book-of-magic",
    "Great Book of Magic"
  ],
  [
    "wazdan-great-book-of-magic-deluxe",
    "Great Book of Magic Deluxe"
  ],
  [
    "wazdan-haunted-coins-x1000",
    "Haunted Coins x1000"
  ],
  [
    "wazdan-haunted-hospital",
    "Haunted Hospital"
  ],
  [
    "wazdan-highschool-manga",
    "Highschool Manga"
  ],
  [
    "wazdan-highway-to-hell",
    "Highway To Hell"
  ],
  [
    "wazdan-highway-to-hell-deluxe",
    "Highway to Hell Deluxe"
  ],
  [
    "wazdan-hot-777",
    "Hot 777"
  ],
  [
    "wazdan-hot-777-deluxe",
    "Hot 777 Deluxe"
  ],
  [
    "wazdan-hot-party",
    "Hot Party"
  ],
  [
    "wazdan-hot-party-deluxe",
    "Hot Party Deluxe"
  ],
  [
    "wazdan-hot-slot-777-cash-out-extremely-light",
    "Hot Slot: 777 Cash Out Extremely Light"
  ],
  [
    "wazdan-hot-slot-777-cash-out-grand-diamond-edition",
    "Hot Slot: 777 Cash Out Grand Diamond Edition"
  ],
  [
    "wazdan-hot-slot-777-cash-out-grand-gold-edition",
    "Hot Slot: 777 Cash Out Grand Gold Edition"
  ],
  [
    "wazdan-hot-slot-777-cash-out-grand-platinum-edition",
    "Hot Slot: 777 Cash Out Grand Platinum Edition"
  ]
] as const;
test("wave 59 Wazdan catalog exact twenty images render in /slots",async({page})=>{for(const [slug,name] of cases){
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
