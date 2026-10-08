import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-15-coins-grand-gold-edition",
    "15 Coins Grand Gold Edition"
  ],
  [
    "wazdan-15-coins-grand-platinum-edition",
    "15 Coins Grand Platinum Edition"
  ],
  [
    "wazdan-16-coins",
    "16 Coins"
  ],
  [
    "wazdan-16-coins-grand-gold-edition",
    "16 Coins Grand Gold Edition"
  ],
  [
    "wazdan-16-coins-grand-platinum-edition",
    "16 Coins Grand Platinum Edition"
  ],
  [
    "wazdan-16-coins-x5000",
    "16 Coins x5000"
  ],
  [
    "wazdan-20-coins",
    "20 Coins"
  ],
  [
    "wazdan-20-coins-grand-gold-edition",
    "20 Coins Grand Gold Edition"
  ],
  [
    "wazdan-24-coins",
    "24 Coins"
  ],
  [
    "wazdan-25-coins",
    "25 Coins"
  ],
  [
    "wazdan-25-coins-grand-gold-edition",
    "25 Coins Grand Gold Edition"
  ],
  [
    "wazdan-25-coins-x3000",
    "25 Coins X3000"
  ],
  [
    "wazdan-30-coins",
    "30 Coins"
  ],
  [
    "wazdan-30-coins-grand-gold-edition",
    "30 Coins Grand Gold Edition"
  ],
  [
    "wazdan-36-coins",
    "36 Coins"
  ],
  [
    "wazdan-36-coins-grand-gold-edition",
    "36 Coins Grand Gold Edition"
  ],
  [
    "wazdan-9-balls",
    "9 Balls"
  ],
  [
    "wazdan-9-bells",
    "9 Bells"
  ],
  [
    "wazdan-9-burning-dragons",
    "9 Burning Dragons"
  ],
  [
    "wazdan-9-burning-stars",
    "9 Burning Stars"
  ]
] as const;

test("wave 55 Wazdan /slots images load after lazy scrolling", async ({ page })=>{
  for(const [slug,name] of cases){
    const card=page.locator(`[data-slot="${slug}"]`);
    let found=false;
    for(let pageNumber=1;pageNumber<=40;pageNumber++){
      await page.goto(`/slots/?q=${encodeURIComponent(name)}&sort=name&page=${pageNumber}`);
      await expect(page.locator("#catalog-q")).toHaveValue(name);
      if(await card.count()){
        found=true;
        break;
      }
      const next=page.getByRole("button",{name:"Следующая страница"});
      if(!(await next.count()) || await next.isDisabled()) break;
    }
    expect(found, `Catalog search must list ${name} (${slug}) on some results page`).toBe(true);
    await expect(card).toBeVisible();
    const image=card.locator(".catalog-game-art .game-image");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(image).not.toHaveAttribute("src",/unavailable\.svg/);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
    await expect.poll(async()=>image.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
  }
});
