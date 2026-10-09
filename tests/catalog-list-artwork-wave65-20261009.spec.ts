import { expect, test } from "@playwright/test";
const cases=[
  [
    "wazdan-mighty-wild-panther-grand-diamond-edition",
    "Mighty Wild: Panther Grand Diamond Edition"
  ],
  [
    "wazdan-sizzling-eggs",
    "Sizzling Eggs"
  ],
  [
    "wazdan-sizzling-eggs-extremely-light",
    "Sizzling Eggs Extremely Light"
  ],
  [
    "wazdan-sizzling-eggs-grand-gold-edition",
    "Sizzling Eggs Grand Gold Edition"
  ],
  [
    "wazdan-sizzling-eggs-grand-platinum-edition",
    "Sizzling Eggs Grand Platinum Edition"
  ],
  [
    "wazdan-sizzling-kingdom-bison",
    "Sizzling Kingdom: Bison"
  ],
  [
    "wazdan-sizzling-moon",
    "Sizzling Moon"
  ],
  [
    "wazdan-slot-jam",
    "Slot Jam"
  ],
  [
    "wazdan-sonic-reels",
    "Sonic Reels"
  ],
  [
    "wazdan-space-gem",
    "Space Gem"
  ],
  [
    "wazdan-space-spins",
    "Space Spins"
  ],
  [
    "wazdan-spectrum",
    "Spectrum"
  ],
  [
    "wazdan-sun-of-fortune",
    "Sun of Fortune"
  ],
  [
    "wazdan-super-hot",
    "Super Hot"
  ],
  [
    "wazdan-telly-reels",
    "Telly Reels"
  ],
  [
    "wazdan-throne-of-elements-platinum",
    "Throne of Elements: Platinum"
  ],
  [
    "wazdan-triple-star",
    "Triple Star"
  ],
  [
    "wazdan-turbo-play",
    "Turbo Play"
  ],
  [
    "wazdan-unicorn-reels",
    "Unicorn Reels"
  ],
  [
    "wazdan-valentines-coins",
    "Valentine’s Coins"
  ]
] as const;
test("wave 65 /slots catalog artwork loads for 20 reviewed games",async({page})=>{for(const [slug,name] of cases){
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
