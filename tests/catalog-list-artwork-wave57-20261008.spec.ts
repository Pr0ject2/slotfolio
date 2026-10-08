import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-black-horse-cash-out-edition",
    "Black Horse Cash Out Edition"
  ],
  [
    "wazdan-black-horse-deluxe",
    "Black Horse Deluxe"
  ],
  [
    "wazdan-book-of-faith",
    "Book of Faith"
  ],
  [
    "wazdan-bumba-meu-boi-coin",
    "Bumba Meu Boi Coin"
  ],
  [
    "wazdan-burning-reels",
    "Burning Reels"
  ],
  [
    "wazdan-burning-stars",
    "Burning Stars"
  ],
  [
    "wazdan-burning-stars-3",
    "Burning Stars 3"
  ],
  [
    "wazdan-burning-sun",
    "Burning Sun"
  ],
  [
    "wazdan-burning-sun-extremely-light",
    "Burning Sun Extremely Light"
  ],
  [
    "wazdan-butterfly-lovers",
    "Butterfly Lovers"
  ],
  [
    "wazdan-captain-shark",
    "Captain Shark"
  ],
  [
    "wazdan-cash-grotto",
    "Cash Grotto"
  ],
  [
    "wazdan-choco-reels",
    "Choco Reels"
  ],
  [
    "wazdan-clover-lady",
    "Clover Lady"
  ],
  [
    "wazdan-colin-the-cat",
    "Colin the Cat"
  ],
  [
    "wazdan-corrida-romance",
    "Corrida Romance"
  ],
  [
    "wazdan-corrida-romance-deluxe",
    "Corrida Romance Deluxe"
  ],
  [
    "wazdan-crazy-cars",
    "Crazy Cars"
  ],
  [
    "wazdan-criss-cross-81",
    "Criss Cross 81"
  ],
  [
    "wazdan-cube-mania",
    "Cube Mania"
  ]
] as const;
test("wave 57 Wazdan catalog list loads all twenty exact game icons", async ({ page }) => {
  for (const [slug,name] of cases) {
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
  }
});
