import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-golden-legend",
    "Golden Legend",
    "Три Dragon запускают Free Spins. Каждый бонусный спин до"
  ],
  [
    "playn-go-golden-osiris",
    "Golden Osiris",
    "25 выигрышных символов заряжают Pyramid: выбранный симво"
  ],
  [
    "playn-go-golden-ticket",
    "Golden Ticket",
    "На последовательных каскадах растёт drop multiplier, а в"
  ],
  [
    "playn-go-golden-ticket-2",
    "Golden Ticket 2",
    "Полностью очищенная Bonus Row открывает выбор 5 Free Spi"
  ],
  [
    "playn-go-grannys-wild",
    "Granny's Wild",
    "Скретч-билет может открыть Turbo Scooter re-spin с липки"
  ],
  [
    "playn-go-grim-muerto",
    "Grim Muerto",
    "В Second Chance игрок выбирает одного из участников Mari"
  ],
  [
    "playn-go-hammerfall",
    "HammerFall",
    "25 выигрышных символов заряжают Hammer Meter до Song Fea"
  ],
  [
    "playn-go-happy-halloween",
    "Happy Halloween",
    "Три и более Witch Scatter дают x4 общей ставки и запуска"
  ],
  [
    "playn-go-helloween",
    "Helloween",
    "I’m Alive фиксирует и расширяет Wild, Future World превр"
  ],
  [
    "playn-go-highway-legends",
    "Highway Legends",
    "Money Bags на барабанах 1–4 несут денежные значения, а п"
  ],
  [
    "playn-go-holiday-season",
    "Holiday Season",
    "Три или более Champagne Scatter запускают пять Win Spins"
  ],
  [
    "playn-go-holiday-spirits",
    "Holiday Spirits",
    "Gift удваивает выданный multiplier, включая множители во"
  ],
  [
    "playn-go-holy-moo-extreme-power",
    "Holy Moo! Extreme Power",
    "Moo-ighty Zeus превращает frames в coin values и собирае"
  ],
  [
    "playn-go-honey-rush",
    "Honey Rush",
    "Выигрыши заполняют Rush Meter по четырём уровням, добавл"
  ],
  [
    "playn-go-honey-rush-100",
    "Honey Rush 100",
    "Sticky Wild после выигрышного кластера двигается к нижне"
  ],
  [
    "playn-go-honey-rush-black-and-yellow",
    "Honey Rush Black and Yellow",
    "Walking Wild остаётся на сетке после выигрышной cascade,"
  ],
  [
    "playn-go-hooligan-hustle",
    "Hooligan Hustle",
    "Ряд Rumble Row над барабанами может дать x2 Multiplier, "
  ],
  [
    "playn-go-hope-unleashed-fortune-rises",
    "Hope Unleashed Fortune Rises",
    "Повторный Magic Circle продолжает цепочку Re-Spins и спо"
  ],
  [
    "playn-go-hot-dog-heist",
    "Hot Dog Heist",
    "Rough Collie добавляет sticky block, Labrador множитель "
  ],
  [
    "playn-go-hotel-yeti-way",
    "Hotel Yeti-Way",
    "Bungee Jumping повышает шанс четырёх Stacked Wilds, а Su"
  ]
] as const;
test("Wave 77: Play’n GO dossier research, three features, official links and artwork", async ({ page }) => {
for (const [slug, name, phrase] of cases) {
  await page.goto(`/slots/catalog/${slug}`);
  await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
  await expect(page.locator("h1")).toContainText(name);
  await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
  await expect(page.locator("#functions h2")).toHaveText("Основные функции");
  const cards = page.locator("#functions .dossier-feature-card");
  await expect(cards).toHaveCount(3);
  const titles = await cards.locator("h3").allTextContents();
  expect(new Set(titles.map(title => title.trim())).size).toBe(3);
  await expect(page.locator("#functions")).toContainText(phrase);
  await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
  await expect(page.locator('#facts a[href^="https://www.playngo.com/games/"]').first()).toBeVisible();
  await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
  const image = page.locator(".slot-figure .catalog-dossier-art");
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
  await expect(image).not.toHaveAttribute("src", /unavailable\.svg/);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(async () => image.evaluate(node => (node as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
  await expect.poll(async () => image.evaluate(node => (node as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
}}
);
