import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-15-coins-grand-gold-edition",
    "15 Coins Grand Gold Edition сохраняет"
  ],
  [
    "wazdan-15-coins-grand-platinum-edition",
    "15 Coins Grand Platinum Edition дополняет"
  ],
  [
    "wazdan-16-coins",
    "16 Coins переводит"
  ],
  [
    "wazdan-16-coins-grand-gold-edition",
    "16 Coins Grand Gold Edition сохраняет"
  ],
  [
    "wazdan-16-coins-grand-platinum-edition",
    "16 Coins Grand Platinum Edition использует"
  ],
  [
    "wazdan-16-coins-x5000",
    "16 Coins x5000 начинает"
  ],
  [
    "wazdan-20-coins",
    "20 Coins увеличивает"
  ],
  [
    "wazdan-20-coins-grand-gold-edition",
    "20 Coins Grand Gold Edition использует"
  ],
  [
    "wazdan-24-coins",
    "24 Coins стала"
  ],
  [
    "wazdan-25-coins",
    "25 Coins использует"
  ],
  [
    "wazdan-25-coins-grand-gold-edition",
    "25 Coins Grand Gold Edition дополняет"
  ],
  [
    "wazdan-25-coins-x3000",
    "25 Coins x3000 запускает"
  ],
  [
    "wazdan-30-coins",
    "30 Coins добавляет"
  ],
  [
    "wazdan-30-coins-grand-gold-edition",
    "30 Coins Grand Gold Edition сохраняет"
  ],
  [
    "wazdan-36-coins",
    "36 Coins разворачивает"
  ],
  [
    "wazdan-36-coins-grand-gold-edition",
    "36 Coins Grand Gold Edition использует"
  ],
  [
    "wazdan-9-balls",
    "9 Balls превращает"
  ],
  [
    "wazdan-9-bells",
    "9 Bells объединяет"
  ],
  [
    "wazdan-9-burning-dragons",
    "9 Burning Dragons работает"
  ],
  [
    "wazdan-9-burning-stars",
    "9 Burning Stars запускает"
  ]
] as const;

test("wave 55 Wazdan full dossiers and first-party artwork", async ({ page }) => {
  for(const [slug, phrase] of cases){
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
    const image=page.locator(".slot-figure .catalog-dossier-art");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(image).not.toHaveAttribute("src",/unavailable\.svg/);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
    await expect.poll(async()=>image.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
  }
});
