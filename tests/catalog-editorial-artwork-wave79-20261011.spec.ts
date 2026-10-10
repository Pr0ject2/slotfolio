import { expect, test } from "@playwright/test";

const cases = [
  [
    "playn-go-jade-magician",
    "Jade Magician",
    "https://www.playngo.com/games/jade-magician",
    "Два символа Jade Magician могут открыть Second Chance: игрок"
  ],
  [
    "playn-go-jewel-box",
    "Jewel Box",
    "https://www.playngo.com/games/jewel-box",
    "Три Jewel Box Scatter открывают pick-and-click: игрок выбира"
  ],
  [
    "playn-go-joker-flip",
    "Joker Flip",
    "https://www.playngo.com/games/joker-flip",
    "Три Scatter открывают двенадцать Casino Free Spins, где Walk"
  ],
  [
    "playn-go-jolly-roger",
    "Jolly Roger",
    "https://www.playngo.com/games/jolly-roger",
    "Три и более Chest symbols на активной линии запускают отдель"
  ],
  [
    "playn-go-jolly-roger-2",
    "Jolly Roger 2",
    "https://www.playngo.com/games/jolly-roger-2",
    "Собранная карта может открыть Sea Compass multiplier wheel л"
  ],
  [
    "playn-go-jolly-roger-wild-kraken",
    "Jolly Roger Wild Kraken",
    "https://www.playngo.com/games/jolly-roger-wild-kraken",
    "Шесть и более Cannonballs запускают Cannon Free Spins. Krake"
  ],
  [
    "playn-go-journey-to-paris",
    "Journey to Paris",
    "https://www.playngo.com/games/journey-to-paris",
    "Bonus Game открывается при полном очищении ячеек над скрытым"
  ],
  [
    "playn-go-king-of-sweets",
    "King of Sweets",
    "https://www.playngo.com/games/king-of-sweets",
    "Выигрышные кластеры наполняют Sweet-o-meter. Его уровни откр"
  ],
  [
    "playn-go-kings-mask",
    "King's Mask",
    "https://www.playngo.com/games/king's-mask",
    "Каждый из трёх вариантов связан со своим bonus multiplier: р"
  ],
  [
    "playn-go-kings-mask-eclipse-of-gods",
    "King's Mask Eclipse of Gods",
    "https://www.playngo.com/games/king's-mask-eclipse-of-gods",
    "Три Scatter запускают Free Spins, перед началом которых игро"
  ],
  [
    "playn-go-kingdom-below",
    "Kingdom Below",
    "https://www.playngo.com/games/kingdom-below",
    "В Slide n Grab Beast проходит по нескольким барабанам, собир"
  ],
  [
    "3-oaks-gaming-rush-for-gold",
    "Rush for Gold",
    "https://3oaks.com/game/rush_for_gold",
    "Progress symbols заполняют три Cart Metres над барабанами, о"
  ],
  [
    "3-oaks-gaming-sky-pearls",
    "Sky Pearls",
    "https://3oaks.com/game/sky_pearls",
    "Шесть Bonus Pearls запускают три respins, новые жемчужины фи"
  ],
  [
    "3-oaks-gaming-space-coins",
    "Space Coins",
    "https://3oaks.com/game/space_coins",
    "Бонус начинается с трёх респинов: каждый новый символ сбрасы"
  ],
  [
    "3-oaks-gaming-sun-of-egypt",
    "Sun of Egypt",
    "https://3oaks.com/game/sun_of_egypt",
    "В Hold & Win встречаются фиксированные Mini и Major; заполне"
  ],
  [
    "3-oaks-gaming-sun-of-egypt-2",
    "Sun of Egypt 2",
    "https://3oaks.com/game/sun_of_egypt_2",
    "Mystery Symbol может раскрыть фиксированный Mini, Minor либо"
  ],
  [
    "3-oaks-gaming-sun-of-egypt-3",
    "Sun of Egypt 3",
    "https://3oaks.com/game/sun_of_egypt_3",
    "Super Bonus может открыться от пяти Bonus Symbols вместе с о"
  ],
  [
    "3-oaks-gaming-sun-of-egypt-4",
    "Sun of Egypt 4",
    "https://3oaks.com/game/sun_of_egypt_4",
    "Шесть Bonus, Jackpot или Mystery Symbols дают три респина с "
  ],
  [
    "3-oaks-gaming-sun-of-egypt-5",
    "Sun of Egypt 5",
    "https://3oaks.com/game/sun_of_egypt_5",
    "Шесть Bonus либо Power Suns активируют Hold & Win. Сбор симв"
  ],
  [
    "3-oaks-gaming-sunlight-princess",
    "Sunlight Princess",
    "https://3oaks.com/game/sunlight_princess",
    "Заполнение Sun Meter даёт альтернативный вход в Hold & Win. "
  ]
] as const;

test("Wave 79: twenty published first-party dossiers with three distinct verified features", async ({ page }) => {
  for (const [slug, name, source, phrase] of cases) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator("h1")).toContainText(name);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    const functions = page.locator("#functions");
    await expect(functions.locator("h2")).toHaveText("Основные функции");
    const cards = functions.locator(".dossier-feature-card");
    await expect(cards).toHaveCount(3);
    const titles = await cards.locator("h3").allTextContents();
    expect(new Set(titles.map(t => t.trim())).size).toBe(3);
    await expect(functions).toContainText(phrase);
    const descriptions = await cards.locator("p").allTextContents();
    expect(descriptions.every(s => s.trim().length >= 68)).toBeTruthy();
    await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
    await expect(page.locator('#facts a').filter({ hasText: "Официальный каталог игры" })).toHaveAttribute("href", source);
    await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
    expect(await page.locator("#faq details").count()).toBeGreaterThan(0);
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
