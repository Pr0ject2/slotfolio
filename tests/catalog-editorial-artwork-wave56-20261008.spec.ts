import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-9-coins",
    "девяти независимых позиций"
  ],
  [
    "wazdan-9-coins-1000-edition",
    "Grand Jackpot вырос с 500x до 1000x"
  ],
  [
    "wazdan-9-coins-extremely-light",
    "более лёгкая версия игры"
  ],
  [
    "wazdan-9-coins-grand-diamond-edition",
    "Cash Out копит значения"
  ],
  [
    "wazdan-9-coins-grand-gold-edition",
    "Grand Jackpot этой версии составляет 1500x"
  ],
  [
    "wazdan-9-coins-grand-platinum-edition",
    "Grand Jackpot 2500x ставки"
  ],
  [
    "wazdan-9-lions",
    "Lions Bonus и Dragons Bonus"
  ],
  [
    "wazdan-9-lions-hold-the-jackpot",
    "9 Lions Bonus использует One Click 2 Grand"
  ],
  [
    "wazdan-9-tigers",
    "три барабана и восемь линий"
  ],
  [
    "wazdan-arcade",
    "Reels Blocking"
  ],
  [
    "wazdan-back-to-the-70s",
    "бонусный символ расширяется на барабан"
  ],
  [
    "wazdan-bars7s",
    "представлены только BAR и семёрка"
  ],
  [
    "wazdan-beach-party",
    "до 15 бесплатных вращений"
  ],
  [
    "wazdan-beach-party-hot",
    "пляжный мяч выступает Scatter"
  ],
  [
    "wazdan-beauty-fruity",
    "для выигрыша нужны хотя бы четыре одинаковых символа"
  ],
  [
    "wazdan-bell-wizard",
    "Значок шута выступает Wild"
  ],
  [
    "wazdan-bells-of-fortune",
    "шестнадцати самостоятельных позициях"
  ],
  [
    "wazdan-black-hawk",
    "четырёхбарабанный слот с 54"
  ],
  [
    "wazdan-black-hawk-deluxe",
    "Белая мистическая сфера становится Wild"
  ],
  [
    "wazdan-black-horse",
    "Сбор девяти золотых монет даёт 15 Free Spins"
  ]
] as const;

test("wave 56 Wazdan full dossiers and first-party artwork", async ({ page }) => {
  for(const [slug,phrase] of cases){
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
  }
});
