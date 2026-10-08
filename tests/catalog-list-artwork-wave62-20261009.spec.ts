import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-magic-fruit-oranges",
    "Magic Fruit$: Oranges"
  ],
  [
    "wazdan-magic-fruits",
    "Magic Fruits"
  ],
  [
    "wazdan-magic-fruits-27",
    "Magic Fruits 27"
  ],
  [
    "wazdan-magic-fruits-4",
    "Magic Fruits 4"
  ],
  [
    "wazdan-magic-fruits-4-deluxe",
    "Magic Fruits 4 Deluxe"
  ],
  [
    "wazdan-magic-fruits-81",
    "Magic Fruits 81"
  ],
  [
    "wazdan-magic-fruits-deluxe",
    "Magic Fruits Deluxe"
  ],
  [
    "wazdan-magic-fruits-dice",
    "Magic Fruits Dice"
  ],
  [
    "wazdan-magic-hot",
    "Magic Hot"
  ],
  [
    "wazdan-magic-hot-4",
    "Magic Hot 4"
  ],
  [
    "wazdan-magic-hot-4-deluxe",
    "Magic Hot 4 Deluxe"
  ],
  [
    "wazdan-magic-of-the-ring",
    "Magic Of The Ring"
  ],
  [
    "wazdan-magic-of-the-ring-deluxe",
    "Magic of the Ring Deluxe"
  ],
  [
    "wazdan-magic-stars",
    "Magic Stars"
  ],
  [
    "wazdan-magic-stars-3",
    "Magic Stars 3"
  ],
  [
    "wazdan-magic-stars-5",
    "Magic Stars 5"
  ],
  [
    "wazdan-magic-stars-6",
    "Magic Stars 6"
  ],
  [
    "wazdan-magic-stars-9",
    "Magic Stars 9"
  ],
  [
    "wazdan-magic-target",
    "Magic Target"
  ],
  [
    "wazdan-magic-target-deluxe",
    "Magic Target Deluxe"
  ]
] as const;
test("wave 62 Wazdan catalog exact artwork: twenty natural-size rendered images",async({page})=>{for(const [slug,name] of cases){
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
