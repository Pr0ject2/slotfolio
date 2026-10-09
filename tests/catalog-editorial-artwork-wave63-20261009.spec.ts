import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-mayan-ritual",
    "Mayan Ritual разворачивается среди храмов майя:"
  ],
  [
    "wazdan-miami-beach",
    "Miami Beach использует пять барабанов и двадцат"
  ],
  [
    "wazdan-midnight-in-tokyo",
    "Midnight in Tokyo отправляет пять барабанов с 2"
  ],
  [
    "wazdan-mighty-crown-empire-of-gold",
    "Mighty Crown: Empire of Gold построена на трёх "
  ],
  [
    "wazdan-mighty-crown-legacy-of-mars",
    "Legacy of Mars — космическая версия Mighty Crow"
  ],
  [
    "wazdan-mighty-fish-blue-marlin",
    "Mighty Fish: Blue Marlin выстраивает бонус вокр"
  ],
  [
    "wazdan-mighty-hot-777",
    "Mighty Hot: 777 сохраняет фруктовую ретро-атмос"
  ],
  [
    "wazdan-mighty-symbols-crowns",
    "Mighty Symbols: Crowns строится вокруг Giant Cr"
  ],
  [
    "wazdan-mighty-symbols-diamonds",
    "Mighty Symbols: Diamonds заменяет корону брилли"
  ],
  [
    "wazdan-mighty-symbols-jokers",
    "Mighty Symbols: Jokers отходит от линий: пятнад"
  ],
  [
    "wazdan-mighty-symbols-sevens",
    "Mighty Symbols: Sevens использует пять барабано"
  ],
  [
    "wazdan-mighty-wild-gorilla",
    "Mighty Wild: Gorilla использует восемь базовых "
  ],
  [
    "wazdan-mighty-wild-jaguar",
    "Mighty Wild: Jaguar использует пятнадцать позиц"
  ],
  [
    "wazdan-mighty-wild-panther-grand-gold-edition",
    "Panther Grand Gold Edition работает на пятнадца"
  ],
  [
    "wazdan-mighty-wild-panther-grand-platinum-edition",
    "Panther Grand Platinum Edition повышает максиму"
  ],
  [
    "wazdan-moon-of-fortune",
    "Moon of Fortune использует шестнадцать позиций "
  ],
  [
    "wazdan-mystery-jack",
    "Mystery Jack переносит Дикий Запад на три бараб"
  ],
  [
    "wazdan-mystery-jack-deluxe",
    "Mystery Jack Deluxe сохранил три барабана и 27 "
  ],
  [
    "wazdan-mystery-kingdom-mystery-bells",
    "Mystery Kingdom: Mystery Bells использует двена"
  ],
  [
    "wazdan-neon-city",
    "Neon City размещает ретро-фрукты среди огней фу"
  ]
] as const;
test("wave 63 Wazdan dossiers have full research sections and valid artwork",async({page})=>{for(const [slug,phrase] of cases){
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
