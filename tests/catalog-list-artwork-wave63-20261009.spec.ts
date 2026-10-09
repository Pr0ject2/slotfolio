import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-mayan-ritual",
    "Mayan Ritual"
  ],
  [
    "wazdan-miami-beach",
    "Miami Beach"
  ],
  [
    "wazdan-midnight-in-tokyo",
    "Midnight in Tokyo"
  ],
  [
    "wazdan-mighty-crown-empire-of-gold",
    "Mighty Crown Empire of Gold"
  ],
  [
    "wazdan-mighty-crown-legacy-of-mars",
    "Mighty Crown: Legacy of Mars"
  ],
  [
    "wazdan-mighty-fish-blue-marlin",
    "Mighty Fish Blue Marlin"
  ],
  [
    "wazdan-mighty-hot-777",
    "Mighty Hot: 777"
  ],
  [
    "wazdan-mighty-symbols-crowns",
    "Mighty Symbols: Crowns"
  ],
  [
    "wazdan-mighty-symbols-diamonds",
    "Mighty Symbols: Diamonds"
  ],
  [
    "wazdan-mighty-symbols-jokers",
    "Mighty Symbols: Jokers"
  ],
  [
    "wazdan-mighty-symbols-sevens",
    "Mighty Symbols: Sevens"
  ],
  [
    "wazdan-mighty-wild-gorilla",
    "Mighty Wild: Gorilla"
  ],
  [
    "wazdan-mighty-wild-jaguar",
    "Mighty Wild: Jaguar"
  ],
  [
    "wazdan-mighty-wild-panther-grand-gold-edition",
    "Mighty Wild: Panther Grand Gold Edition"
  ],
  [
    "wazdan-mighty-wild-panther-grand-platinum-edition",
    "Mighty Wild: Panther Grand Platinum Edition"
  ],
  [
    "wazdan-moon-of-fortune",
    "Moon of Fortune"
  ],
  [
    "wazdan-mystery-jack",
    "Mystery Jack"
  ],
  [
    "wazdan-mystery-jack-deluxe",
    "Mystery Jack Deluxe"
  ],
  [
    "wazdan-mystery-kingdom-mystery-bells",
    "Mystery Kingdom: Mystery Bells"
  ],
  [
    "wazdan-neon-city",
    "Neon City"
  ]
] as const;
test("wave 63 Wazdan /slots artwork exact paths and natural dimensions",async({page})=>{for(const [slug,name] of cases){
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
