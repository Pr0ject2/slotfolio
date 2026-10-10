import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-frozen-gems",
    "Frozen Gems",
    "Frozen Gems использует cascades с multiplier, который повышается на +1 после каждой дополнительной cascade и сбрасывается только при новом base spin."
  ],
  [
    "playn-go-fu-er-dai",
    "FU ER DAI",
    "FU ER DAI работает на пяти reels и десяти paylines."
  ],
  [
    "playn-go-fulong-88",
    "Fulong 88",
    "В Fulong 88 пять high-paying symbols можно активировать как Golden Symbols: их совпадающие symbols на reels превращаются в золотые версии и получают усиленные payouts."
  ],
  [
    "playn-go-game-of-gladiators",
    "Game of Gladiators",
    "Game of Gladiators использует 20 paylines и набор случайных Primus Attack features."
  ],
  [
    "playn-go-game-of-gladiators-uprising",
    "Game of Gladiators: Uprising",
    "Gladiators Oath запускается, когда на reels появляется Scatter или Wild, и может вызвать Re-Spins с соответствующим fighter."
  ],
  [
    "playn-go-gargantoonz",
    "Gargantoonz",
    "Gargantoonz работает на 7×7 cascading grid, где wins собираются clusters из 5+ symbols."
  ],
  [
    "playn-go-gates-of-troy",
    "Gates of Troy",
    "Три Scatter открывают Free Spins и переводят действие за стены Troy."
  ],
  [
    "playn-go-gemix",
    "Gemix",
    "Оригинальный Gemix — 7×7 cascading grid: cluster из 5+ соприкасающихся symbols оплачивается, winning symbols удаляются, а новые падают сверху до окончания cascade-chain."
  ],
  [
    "playn-go-gemix-100",
    "Gemix 100",
    "Gemix 100 сохраняет 7×7 cluster grid, но каждый выигрыш повышает Win Multiplier на +1 в рамках текущего round, максимум до x100."
  ],
  [
    "playn-go-gemix-2",
    "Gemix 2",
    "Gemix 2 снова использует 7×7 cluster cascades, но Crystal Charge разделён на два уровня."
  ],
  [
    "playn-go-gerards-gambit",
    "Gerard's Gambit",
    "Gerard’s Gambit начинается с 3×1 reel и одной payline и развивается через десять уровней."
  ],
  [
    "playn-go-ghost-of-dead",
    "Ghost of Dead",
    "Ghost of Dead использует Canopus Scatter, который может случайно появиться на spin и иногда превращается в Spectral Canopus Scatter."
  ],
  [
    "playn-go-gigantoonz",
    "Gigantoonz",
    "Gigantoonz строится вокруг Mega Symbols и Quantumeter."
  ],
  [
    "playn-go-gnawn-gold",
    "Gnaw'n Gold",
    "Gnaw’n Gold использует Persistent Trail уже в Base Game."
  ],
  [
    "playn-go-gold-king",
    "Gold King",
    "Gold King работает на 20 paylines и использует Super Stack на каждом spin: каждый reel получает stack случайного обычного symbol."
  ],
  [
    "playn-go-gold-of-fortune-god",
    "Gold of Fortune God",
    "Gold of Fortune God — 5×3 video slot с Dragon’s Fortune Multiplier Wheel."
  ],
  [
    "playn-go-gold-trophy-2",
    "Gold Trophy 2",
    "Gold Trophy 2 использует поле 5×3 и до 20 paylines."
  ],
  [
    "playn-go-gold-volcano",
    "Gold Volcano",
    "Gold Volcano — cascading grid slot, где cluster из 4+ соседних symbols создаёт win."
  ],
  [
    "playn-go-golden-caravan",
    "Golden Caravan",
    "Golden Caravan использует Caravan Master Wild, который заменяет обычные reel symbols, кроме Scatters."
  ],
  [
    "playn-go-golden-colts",
    "Golden Colts",
    "Golden Colts открывает Bonus Game тремя Scatters."
  ]
] as const;
test("Wave 76: 20 published Play’n GO /slots artworks",async({page})=>{for(const [slug,name] of cases){await page.goto(`/slots/?q=${encodeURIComponent(name)}`);const card=page.locator(`[data-slot="${slug}"]`);await expect(card).toBeVisible();const art=card.locator(".catalog-game-art .game-image");await expect(art).toBeVisible();await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));await expect(art).not.toHaveAttribute("src",/unavailable\\.svg/);await art.scrollIntoViewIfNeeded();await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);}});
