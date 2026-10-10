import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-demon",
    "Demon",
    "https://www.playngo.com/games/demon",
    "Amulet Wild на барабанах 1 и 5 вместе с Mask "
  ],
  [
    "playn-go-derby-wheel",
    "Derby Wheel",
    "https://www.playngo.com/games/derby-wheel",
    "В скачках No Bet гарантирует x40 без прогноза"
  ],
  [
    "playn-go-diamond-vortex",
    "Diamond Vortex",
    "https://www.playngo.com/games/diamond-vortex",
    "Core Wild постоянно расположен в центре grid."
  ],
  [
    "playn-go-diamonds-of-the-realm",
    "Diamonds of the Realm",
    "https://www.playngo.com/games/diamonds-of-the-realm",
    "Три или более Diamond Scatter дают пять Free "
  ],
  [
    "playn-go-dio-killing-the-dragon",
    "Dio Killing the Dragon",
    "https://www.playngo.com/games/dio-killing-the-dragon",
    "Три дракона Murray Scatter запускают Free Spi"
  ],
  [
    "playn-go-disco-diamonds",
    "Disco Diamonds",
    "https://www.playngo.com/games/disco-diamonds",
    "Три Bonus Scatter на барабанах 1, 3, 5 включа"
  ],
  [
    "playn-go-divina-commedia-i-nove-cerchi",
    "Divina Commedia I Nove Cerchi",
    "https://www.playngo.com/games/divina-commedia-i-nove-cerchi",
    "Lanterns улучшают Souls до более ценных форм "
  ],
  [
    "playn-go-divine-showdown",
    "Divine Showdown",
    "https://www.playngo.com/games/divine-showdown",
    "Три Scatter начинают Free Spins с тремя lives"
  ],
  [
    "playn-go-doom-of-egypt",
    "Doom of Egypt",
    "https://www.playngo.com/games/doom-of-egypt",
    "Перед Free Spins выбирается один из девяти об"
  ],
  [
    "3-oaks-gaming-super-china-pots",
    "Super China Pots",
    "https://3oaks.com/game/super_china_pots",
    "Boost повышает случайные значения до x10 и мо"
  ],
  [
    "3-oaks-gaming-super-hot-chilli",
    "Super Hot Chilli",
    "https://3oaks.com/game/super_hot_chilli",
    "Дополнительный верхний ряд Hold & Win содержи"
  ],
  [
    "3-oaks-gaming-super-hot-teapots",
    "Super Hot Teapots",
    "https://3oaks.com/game/super_hot_teapots",
    "Boost повышает видимые значения, Extra открыв"
  ],
  [
    "3-oaks-gaming-super-hotfire-diamonds",
    "Super Hotfire Diamonds",
    "https://3oaks.com/game/super_hotfire_diamonds",
    "В Hold & Win на центральном барабане может за"
  ],
  [
    "3-oaks-gaming-super-sticky-piggy",
    "Super Sticky Piggy",
    "https://3oaks.com/game/super_sticky_piggy",
    "Заполнение основной шкалы Scatter запускает S"
  ],
  [
    "3-oaks-gaming-supreme-diamond-xxl",
    "Supreme Diamond XXL",
    "https://3oaks.com/game/supreme_diamond_xxl",
    "В Hold & Win на втором барабане могут закрепл"
  ],
  [
    "3-oaks-gaming-thunder-tiger",
    "Thunder Tiger",
    "https://3oaks.com/game/thunder_tiger",
    "Шесть Linear Bonus Symbols открывают отдельны"
  ],
  [
    "3-oaks-gaming-tiger-gems",
    "Tiger Gems",
    "https://3oaks.com/game/tiger_gems",
    "В Hold & Win Boost собирает значения всех вид"
  ],
  [
    "3-oaks-gaming-tiger-jungle",
    "Tiger Jungle",
    "https://3oaks.com/game/tiger_jungle",
    "Отдельные Free Spins используют Wild Symbols,"
  ],
  [
    "3-oaks-gaming-wolf-night",
    "Wolf Night",
    "https://3oaks.com/game/wolf_night",
    "В Hold & Win могут появиться Mini, Minor или "
  ],
  [
    "bgaming-the-godfather-3-pillars-of-power",
    "The Godfather: 3 Pillars of Power",
    "https://bgaming.com/games/the-godfather-3-pillars-of-power",
    "Серебряные Tokens активируют Hold & Win с Ins"
  ]
] as const;
test("Wave 80: researched published dossiers retain their official sources and local art", async ({page})=>{for(const [slug,name,source,phrase] of cases){await page.goto(`/slots/catalog/${slug}`);await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");await expect(page.locator("h1")).toContainText(name);await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");const section=page.locator("#functions");await expect(section.locator("h2")).toHaveText("Основные функции");const cards=section.locator(".dossier-feature-card");await expect(cards).toHaveCount(3);const headings=await cards.locator("h3").allTextContents();expect(new Set(headings.map(x=>x.trim())).size).toBe(3);await expect(section).toContainText(phrase);await expect(page.locator("#facts h2")).toHaveText("Факты и источники");await expect(page.locator("#facts a").filter({hasText:"Официальный каталог игры"})).toHaveAttribute("href",source);await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");expect(await page.locator("#faq details").count()).toBeGreaterThan(0);const art=page.locator(".slot-figure .catalog-dossier-art");await expect(art).toBeVisible();await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));await expect(art).not.toHaveAttribute("src",/unavailable\.svg/);await art.scrollIntoViewIfNeeded();await expect.poll(async()=>art.evaluate(x=>(x as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);await expect.poll(async()=>art.evaluate(x=>(x as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);}});
