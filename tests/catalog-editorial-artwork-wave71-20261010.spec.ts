import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-aztec-warrior-princess",
    "Aztec Warrior Princess",
    "Три и более Aztec Warrior Princess sy"
  ],
  [
    "playn-go-bakers-treat",
    "Baker's Treat",
    "Triple Berry Layer Cake работает как "
  ],
  [
    "playn-go-banana-rock",
    "Banana Rock",
    "Два и более Rock ’n’ Rollin’ Wild зап"
  ],
  [
    "playn-go-banana-rush",
    "Banana Rush",
    "Три, четыре или пять Scatter запускаю"
  ],
  [
    "playn-go-banquet-of-dead",
    "Banquet of Dead",
    "Во Free Spins случайный обычный payin"
  ],
  [
    "playn-go-bao-shi",
    "Bao Shi",
    "Lioras Blessings может случайно срабо"
  ],
  [
    "playn-go-barn-busters",
    "Barn Busters",
    "Один или два Big Bell Scatter могут з"
  ],
  [
    "playn-go-baron-lord-of-saturday",
    "Baron: Lord of Saturday",
    "Random Wilds могут добавить 3–6 Wild "
  ],
  [
    "playn-go-battle-royal",
    "Battle Royal",
    "King Henry работает как Wild. Scatter"
  ],
  [
    "playn-go-beasts-of-fire",
    "Beasts of Fire",
    "Основная механика строится вокруг Buf"
  ],
  [
    "playn-go-beasts-of-fire-maximum",
    "Beasts of Fire Maximum",
    "Charging Fire Beasts может на любом s"
  ],
  [
    "playn-go-big-win-777",
    "Big Win 777",
    "В основной игре Big Win 777 используе"
  ],
  [
    "playn-go-big-win-cat",
    "Big Win Cat",
    "Big Win Cat работает как Wild. Если о"
  ],
  [
    "playn-go-big-win-cat-pawsperity",
    "Big Win Cat Pawsperity",
    "Coin Collection собирает каждый Coin "
  ],
  [
    "playn-go-black-mamba",
    "Black Mamba",
    "Выигрыши собираются из трёх и более s"
  ],
  [
    "playn-go-blazin-bullfrog",
    "Blazin' Bullfrog",
    "Blazin' Bullfrog использует поле 5×3 "
  ],
  [
    "playn-go-blinged",
    "Blinged",
    "Diamond Scatter появляется на reels 1"
  ],
  [
    "playn-go-boat-bonanza",
    "Boat Bonanza",
    "Три Scatter запускают Free Spins. В б"
  ],
  [
    "playn-go-boat-bonanza-christmas",
    "Boat Bonanza Christmas",
    "На поле 5×4 две Festive Fishing Boats"
  ],
  [
    "playn-go-boat-bonanza-colossal-catch",
    "Boat Bonanza Colossal Catch",
    "На поле 5×4 две Fishing Boats случайн"
  ]
] as const;
test("Wave 71: twenty Play’n GO dossier upgrades and official local artwork",async({page})=>{for(const [slug,,phrase] of cases){
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
await expect(art).not.toHaveAttribute("src",/unavailable\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}});
