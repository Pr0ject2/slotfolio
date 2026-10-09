import {expect,test} from "@playwright/test";
const cases = [
  [
    "wazdan-throne-of-elements-platinum",
    "Throne of Elements: Platinum собирает энергию сти"
  ],
  [
    "wazdan-night-club-81",
    "Night Club 81 использует четыре барабана и ретро-"
  ],
  [
    "wazdan-one-coin",
    "One Coin отличается от привычных Hold the Jackpot"
  ],
  [
    "wazdan-ox-coin",
    "В Ox Coin основное действие начинается с централь"
  ],
  [
    "wazdan-power-of-gods-egypt",
    "Power of Gods: Egypt использует пять барабанов и "
  ],
  [
    "wazdan-power-of-gods-hades",
    "Power of Gods: Hades проводит через подземный мир"
  ],
  [
    "wazdan-power-of-gods-medusa",
    "Power of Gods: Medusa размещает персонажей мифа н"
  ],
  [
    "wazdan-power-of-gods-medusa-extremely-light",
    "Medusa Extremely Light сохраняет пять барабанов, "
  ],
  [
    "wazdan-power-of-gods-the-pantheon",
    "The Pantheon объединяет двадцать линий и сразу тр"
  ],
  [
    "wazdan-power-of-gods-valhalla",
    "Power of Gods: Valhalla переносит Hold the Jackpo"
  ],
  [
    "wazdan-power-of-gods-valhalla-extremely-light",
    "Valhalla Extremely Light оформляет скандинавский "
  ],
  [
    "wazdan-power-of-sun-svarog",
    "Power of Sun: Svarog использует славянский миф о "
  ],
  [
    "wazdan-prosperity-pearls",
    "Prosperity Pearls посвящена жемчужинам в азиатско"
  ],
  [
    "wazdan-prosperity-reels",
    "Prosperity Reels предлагает шесть барабанов с 46 "
  ],
  [
    "wazdan-reel-hero",
    "Reel Hero соединяет пятибарабанную сетку с геройс"
  ],
  [
    "wazdan-reel-joke",
    "Reel Joke использует ретро-шутовскую тему и обычн"
  ],
  [
    "wazdan-relic-hunters-and-the-book-of-faith",
    "Relic Hunters and the Book of Faith строится вокр"
  ],
  [
    "wazdan-santas-gifts-frenzy",
    "Santa's Gifts Frenzy использует подарочную рождес"
  ],
  [
    "wazdan-sizzling-777",
    "Sizzling 777 использует пять барабанов и двадцать"
  ],
  [
    "wazdan-sizzling-777-deluxe",
    "Sizzling 777 Deluxe обновляет оформление оригинал"
  ]
] as const;
test("wave 64 Wazdan dossiers: game-specific sections and exact downloaded official artwork",async({page})=>{for(const [slug,phrase] of cases){
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
