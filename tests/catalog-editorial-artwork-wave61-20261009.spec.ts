import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-infinity-hero",
    "Infinity Hero оформляет шесть барабанов и двадцать"
  ],
  [
    "wazdan-jack-on-hold",
    "Jack On Hold возвращает фруктовый ретро-формат на "
  ],
  [
    "wazdan-jacks-ride",
    "Jack’s Ride переносит трёхбарабанный слот на трасс"
  ],
  [
    "wazdan-jackpot-builders",
    "Jackpot Builders использует четыре барабана с девя"
  ],
  [
    "wazdan-jelly-reels",
    "Jelly Reels использует восемь барабанов и 16 777 2"
  ],
  [
    "wazdan-joker-explosion",
    "Joker Explosion строится на четырёх барабанах и се"
  ],
  [
    "wazdan-juicy-reels",
    "Juicy Reels размещает фруктовую классику на шести "
  ],
  [
    "wazdan-jumping-fruits",
    "Jumping Fruits выглядит как трёхбарабанная машина "
  ],
  [
    "wazdan-kick-off",
    "Kick Off не использует обычные барабаны и линии: т"
  ],
  [
    "wazdan-larry-the-leprechaun",
    "Larry the Leprechaun использует 16 отдельных позиц"
  ],
  [
    "wazdan-los-muertos",
    "Los Muertos разворачивается на пяти барабанах и че"
  ],
  [
    "wazdan-los-muertos-ii",
    "Los Muertos II использует три барабана и пять лини"
  ],
  [
    "wazdan-lost-treasure",
    "Lost Treasure показывает поиски сокровищ на пяти б"
  ],
  [
    "wazdan-lucky-9",
    "Lucky 9 соединяет шесть барабанов и двадцать линий"
  ],
  [
    "wazdan-lucky-fish",
    "Lucky Fish работает на пяти барабанах с 243 способ"
  ],
  [
    "wazdan-lucky-fortune",
    "Lucky Fortune использует пять барабанов и двадцать"
  ],
  [
    "wazdan-lucky-queen",
    "Lucky Queen разворачивается вокруг затерянного хра"
  ],
  [
    "wazdan-lucky-reels",
    "Lucky Reels напоминает фруктовый автомат, но испол"
  ],
  [
    "wazdan-magic-eggs",
    "Magic Eggs использует пасхальную сетку из трёх бар"
  ],
  [
    "wazdan-magic-fruit-cherries",
    "Magic Fruit$: Cherries использует шестнадцать пози"
  ]
] as const;
test("wave 61 Wazdan: twenty individual dossier sections and real artwork",async({page})=>{for(const [slug,phrase] of cases){
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
