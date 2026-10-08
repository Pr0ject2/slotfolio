import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-fruit-mania-deluxe",
    "В Fruit Mania Deluxe девять независимых барабано"
  ],
  [
    "wazdan-fruits-go-bananas",
    "Fruits Go Bananas переносит пять барабанов и пят"
  ],
  [
    "wazdan-gem-splitter",
    "Gem Splitter использует пять барабанов и 243 спо"
  ],
  [
    "wazdan-golden-sphinx",
    "Golden Sphinx строится на двадцати линиях и двух"
  ],
  [
    "wazdan-good-luck-40",
    "Good Luck 40 выделяется сорока линиями на пяти б"
  ],
  [
    "wazdan-great-book-of-magic",
    "Great Book of Magic сочетает двадцать линий с кн"
  ],
  [
    "wazdan-great-book-of-magic-deluxe",
    "Great Book of Magic Deluxe повторяет структуру 2"
  ],
  [
    "wazdan-haunted-coins-x1000",
    "Haunted Coins x1000 использует 16 независимых по"
  ],
  [
    "wazdan-haunted-hospital",
    "Haunted Hospital сочетает тесную трёхбарабанную "
  ],
  [
    "wazdan-highschool-manga",
    "Highschool Manga — трёхбарабанный слот на пять л"
  ],
  [
    "wazdan-highway-to-hell",
    "Highway To Hell использует грузовик как расширяю"
  ],
  [
    "wazdan-highway-to-hell-deluxe",
    "Highway to Hell Deluxe получила обновлённое офор"
  ],
  [
    "wazdan-hot-777",
    "Hot 777 — трёхбарабанная классика с пятью линиям"
  ],
  [
    "wazdan-hot-777-deluxe",
    "Hot 777 Deluxe меняет структуру бонуса по сравне"
  ],
  [
    "wazdan-hot-party",
    "Hot Party — пляжный пятибарабанный слот с двадца"
  ],
  [
    "wazdan-hot-party-deluxe",
    "Hot Party Deluxe сохраняет пять барабанов и двад"
  ],
  [
    "wazdan-hot-slot-777-cash-out-extremely-light",
    "Hot Slot: 777 Cash Out Extremely Light сохраняет"
  ],
  [
    "wazdan-hot-slot-777-cash-out-grand-diamond-edition",
    "Grand Diamond Edition увеличивает максимальный в"
  ],
  [
    "wazdan-hot-slot-777-cash-out-grand-gold-edition",
    "Grand Gold Edition повышает Grand Jackpot относи"
  ],
  [
    "wazdan-hot-slot-777-cash-out-grand-platinum-edition",
    "Grand Platinum Edition расширяет знакомую Cash O"
  ]
] as const;
test("wave 59 Wazdan dossiers have complete game-specific template and loaded artwork",async({page})=>{for(const [slug,phrase] of cases){
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
