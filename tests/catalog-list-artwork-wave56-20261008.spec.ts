import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-9-coins",
    "9 Coins"
  ],
  [
    "wazdan-9-coins-1000-edition",
    "9 Coins 1000 Edition"
  ],
  [
    "wazdan-9-coins-extremely-light",
    "9 Coins Extremely Light"
  ],
  [
    "wazdan-9-coins-grand-diamond-edition",
    "9 Coins Grand Diamond Edition"
  ],
  [
    "wazdan-9-coins-grand-gold-edition",
    "9 Coins Grand Gold Edition"
  ],
  [
    "wazdan-9-coins-grand-platinum-edition",
    "9 Coins Grand Platinum Edition"
  ],
  [
    "wazdan-9-lions",
    "9 Lions"
  ],
  [
    "wazdan-9-lions-hold-the-jackpot",
    "9 Lions Hold the Jackpot"
  ],
  [
    "wazdan-9-tigers",
    "9 Tigers"
  ],
  [
    "wazdan-arcade",
    "Arcade"
  ],
  [
    "wazdan-back-to-the-70s",
    "Back to the 70's"
  ],
  [
    "wazdan-bars7s",
    "BARs&7s"
  ],
  [
    "wazdan-beach-party",
    "Beach Party"
  ],
  [
    "wazdan-beach-party-hot",
    "Beach Party Hot"
  ],
  [
    "wazdan-beauty-fruity",
    "Beauty Fruity"
  ],
  [
    "wazdan-bell-wizard",
    "Bell Wizard"
  ],
  [
    "wazdan-bells-of-fortune",
    "Bells of Fortune"
  ],
  [
    "wazdan-black-hawk",
    "Black Hawk"
  ],
  [
    "wazdan-black-hawk-deluxe",
    "Black Hawk Deluxe"
  ],
  [
    "wazdan-black-horse",
    "Black Horse"
  ]
] as const;

test("wave 56 Wazdan /slots artwork loads after lazy scrolling and pagination", async ({ page })=>{
  for(const [slug,name] of cases){
    const card=page.locator(`[data-slot="${slug}"]`);
    let found=false;
    for(let pageNumber=1;pageNumber<=40;pageNumber++){
      await page.goto(`/slots/?q=${encodeURIComponent(name)}&sort=name&page=${pageNumber}`);
      await expect(page.locator("#catalog-q")).toHaveValue(name);
      if(await card.count()){ found=true; break; }
      const next=page.getByRole("button",{name:"Следующая страница"});
      if(!(await next.count()) || await next.isDisabled()) break;
    }
    expect(found,`The published catalog must list ${name} (${slug}) on some page`).toBe(true);
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
