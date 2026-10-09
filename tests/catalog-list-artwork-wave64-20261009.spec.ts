import {expect,test} from "@playwright/test";
const cases = [
  [
    "wazdan-throne-of-elements-platinum",
    "Throne of Elements: Platinum"
  ],
  [
    "wazdan-night-club-81",
    "Night Club 81"
  ],
  [
    "wazdan-one-coin",
    "One Coin"
  ],
  [
    "wazdan-ox-coin",
    "Ox Coin"
  ],
  [
    "wazdan-power-of-gods-egypt",
    "Power of Gods: Egypt"
  ],
  [
    "wazdan-power-of-gods-hades",
    "Power of Gods: Hades"
  ],
  [
    "wazdan-power-of-gods-medusa",
    "Power of Gods: Medusa"
  ],
  [
    "wazdan-power-of-gods-medusa-extremely-light",
    "Power of Gods: Medusa Extremely Light"
  ],
  [
    "wazdan-power-of-gods-the-pantheon",
    "Power of Gods: The Pantheon"
  ],
  [
    "wazdan-power-of-gods-valhalla",
    "Power of Gods: Valhalla"
  ],
  [
    "wazdan-power-of-gods-valhalla-extremely-light",
    "Power of Gods: Valhalla Extremely Light"
  ],
  [
    "wazdan-power-of-sun-svarog",
    "Power of Sun: Svarog"
  ],
  [
    "wazdan-prosperity-pearls",
    "Prosperity Pearls"
  ],
  [
    "wazdan-prosperity-reels",
    "Prosperity Reels"
  ],
  [
    "wazdan-reel-hero",
    "Reel Hero"
  ],
  [
    "wazdan-reel-joke",
    "Reel Joke"
  ],
  [
    "wazdan-relic-hunters-and-the-book-of-faith",
    "Relic Hunters and the Book of Faith"
  ],
  [
    "wazdan-santas-gifts-frenzy",
    "Santa's Gifts Frenzy"
  ],
  [
    "wazdan-sizzling-777",
    "Sizzling 777"
  ],
  [
    "wazdan-sizzling-777-deluxe",
    "Sizzling 777 Deluxe"
  ]
] as const;
test("wave 64 Wazdan catalog artwork: twenty precise loaded WebPs",async({page})=>{for(const [slug,name] of cases){
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
