import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-hot-slot-777-coins",
    "Hot Slot: 777 Coins объединяет двадцать линий"
  ],
  [
    "wazdan-hot-slot-777-coins-extremely-light",
    "Extremely Light сохраняет механику 777 Coins,"
  ],
  [
    "wazdan-hot-slot-777-crown-extremely-light",
    "Hot Slot: 777 Crown Extremely Light предлагае"
  ],
  [
    "wazdan-hot-slot-777-diamond-crown",
    "В Diamond Crown пять барабанов и десять линий"
  ],
  [
    "wazdan-hot-slot-777-gold-crown",
    "Gold Crown ставит корону Scatter в центр деся"
  ],
  [
    "wazdan-hot-slot-777-hold-the-jackpot",
    "Hot Slot: 777 Hold the Jackpot сочетает десят"
  ],
  [
    "wazdan-hot-slot-777-platinum-crown",
    "Platinum Crown сохраняет пять барабанов и дес"
  ],
  [
    "wazdan-hot-slot-777-rubies",
    "777 Rubies заменяет бонусные монеты рубинами:"
  ],
  [
    "wazdan-hot-slot-777-rubies-extremely-light",
    "777 Rubies Extremely Light переносит Magic Re"
  ],
  [
    "wazdan-hot-slot-777-stars",
    "Hot Slot: 777 Stars строится вокруг красных з"
  ],
  [
    "wazdan-hot-slot-777-stars-extremely-light",
    "777 Stars Extremely Light сохраняет пятибараб"
  ],
  [
    "wazdan-hot-slot-diamond-coins",
    "Diamond Coins объединяет пятнадцать независим"
  ],
  [
    "wazdan-hot-slot-gold-coins",
    "Gold Coins соединяет пятнадцать позиций Coins"
  ],
  [
    "wazdan-hot-slot-great-book-of-magic",
    "Hot Slot: Great Book of Magic соединяет книжн"
  ],
  [
    "wazdan-hot-slot-magic-bombs",
    "Magic Bombs использует десять линий с фруктам"
  ],
  [
    "wazdan-hot-slot-magic-pearls",
    "Magic Pearls переносит Hot Slot в двадцатипят"
  ],
  [
    "wazdan-hot-slot-mystery-jackpot-joker",
    "Mystery Jackpot Joker выглядит как простой тр"
  ],
  [
    "wazdan-hot-slot-platinum-coins",
    "Platinum Coins использует пятнадцать позиций "
  ],
  [
    "wazdan-hungry-shark",
    "Hungry Shark — подводный слот на пяти барабан"
  ],
  [
    "wazdan-in-the-forest",
    "In The Forest строит жуткую лесную тему на пя"
  ]
] as const;
test("wave 60 Wazdan dossier template and twenty real official images", async ({page}) => {
for (const [slug, phrase] of cases) {
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
