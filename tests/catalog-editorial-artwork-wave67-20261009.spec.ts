import { expect, test } from "@playwright/test";
const cases = [
  ["3-oaks-gaming-coin-volcano-2","Coin Volcano 2 расширяет вулканический слот до"],
  ["3-oaks-gaming-egypt-fire-2","Egypt Fire 2 возвращает фараонов на поле 5×4 с"],
  ["3-oaks-gaming-egypt-power-x1000","Egypt Power x1000 использует каскады на египет"],
  ["3-oaks-gaming-fortune-globe","Fortune Globe — мистический слот на поле 5×4 и"],
  [
    "3-oaks-gaming-hit-the-gold",
    "Hit the Gold! отправляет на золотой прииск с пол"
  ],
  [
    "3-oaks-gaming-hot-fire-fruits",
    "Hot Fire Fruits — классический фруктовый слот 3×"
  ],
  [
    "3-oaks-gaming-joker-glitz-x1000",
    "Joker Glitz x1000 использует поле 6×5 и выплаты "
  ],
  [
    "3-oaks-gaming-lady-fortune",
    "Lady Fortune — китайский слот 6×5 с Scatter Pays"
  ],
  [
    "3-oaks-gaming-lava-coins",
    "Lava Coins строится на сетке 3×3 с пятью линиями"
  ],
  [
    "3-oaks-gaming-lava-coins-2",
    "Lava Coins 2 увеличивает число оплачиваемых лини"
  ],
  [
    "3-oaks-gaming-little-farm",
    "Little Farm использует 5×4 поле и двадцать пять "
  ],
  [
    "3-oaks-gaming-lord-of-thunder",
    "Lord of Thunder сочетает сетку 3×5 на пятнадцати"
  ],
  [
    "3-oaks-gaming-lucky-apple-x1000",
    "Lucky Apple x1000 — сказочный Scatter Pays на по"
  ],
  [
    "3-oaks-gaming-lucky-penny",
    "Lucky Penny строится на каскадной ирландской сет"
  ],
  [
    "3-oaks-gaming-lucky-penny-2",
    "Lucky Penny 2 сохраняет каскадные выплаты за вос"
  ],
  [
    "3-oaks-gaming-lucky-penny-3-pots-super-wheel",
    "Lucky Penny 3 Pots: Super Wheel меняет формат се"
  ],
  [
    "3-oaks-gaming-lucky-penny-power-scatter",
    "Lucky Penny Power Scatter возвращается к каскадн"
  ],
  [
    "3-oaks-gaming-magic-apple",
    "Magic Apple — сказочная игра на поле 5×4 с тридц"
  ],
  [
    "3-oaks-gaming-magic-apple-2",
    "Magic Apple 2 отличается от оригинала двадцатью "
  ],
  [
    "3-oaks-gaming-magic-clovers",
    "Magic Clovers использует пять барабанов, три ряд"
  ]
] as const;
test("wave 67 final 3 Oaks researched dossiers and strict artwork",async({page})=>{for(const [slug,phrase] of cases){
await page.goto(`/slots/catalog/${slug}`);
await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
await expect(page.locator("#how-it-works")).toContainText(phrase);
await expect(page.locator("#functions h2")).toHaveText("Основные функции");
expect(await page.locator("#functions .dossier-feature-card").count()).toBeGreaterThanOrEqual(3);
await expect(page.locator("#math-profile .eyebrow")).toHaveText("Цифры без ложной точности");
await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
await expect(page.locator("#catalog-comparison h2")).toHaveText("Сравнение с другими играми");
await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
expect(await page.locator("#facts a").count()).toBeGreaterThan(0);
await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
await expect(page.locator("#faq details").first()).toContainText("Что главное в механике");
const art=page.locator(".slot-figure .catalog-dossier-art");
await expect(art).toBeVisible();
await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
await expect(art).not.toHaveAttribute("src",/unavailable\\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}});
