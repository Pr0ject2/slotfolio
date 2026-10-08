import { expect, test } from "@playwright/test";

const cases = [
  [
    "push-gaming-shamrock-saints",
    "Shamrock Saints собирает"
  ],
  [
    "push-gaming-tarot-treasures",
    "Tarot Treasures делит"
  ],
  [
    "push-gaming-the-grand-show",
    "The Grand Show связывает"
  ],
  [
    "push-gaming-the-great-banker",
    "The Great Banker размещает"
  ],
  [
    "push-gaming-tiki-tumble",
    "Tiki Tumble использует"
  ],
  [
    "push-gaming-tricky-treats",
    "Tricky Treats строит"
  ],
  [
    "push-gaming-triple-rampage",
    "Triple Rampage размещает"
  ],
  [
    "push-gaming-vegas-vault",
    "Vegas Vault запускает"
  ],
  [
    "push-gaming-viva-lock-vegas",
    "Viva Lock Vegas складывает"
  ],
  [
    "push-gaming-wild-swarm",
    "Оригинальный Wild Swarm"
  ],
  [
    "push-gaming-wild-swarm-2",
    "Wild Swarm 2 считает"
  ],
  [
    "push-gaming-wild-swarm-3-chocolate-eggs",
    "Wild Swarm 3 Chocolate Eggs заменяет"
  ],
  [
    "push-gaming-wild-swarm-triple-hive",
    "Wild Swarm Triple Hive использует"
  ],
  [
    "wazdan-12-bells",
    "12 Bells отличается"
  ],
  [
    "wazdan-12-coins",
    "12 Coins использует"
  ],
  [
    "wazdan-12-coins-grand-diamond-edition",
    "12 Coins Grand Diamond Edition сохраняет"
  ],
  [
    "wazdan-12-coins-grand-gold-edition",
    "12 Coins Grand Gold Edition расширяет"
  ],
  [
    "wazdan-12-coins-grand-platinum-edition",
    "12 Coins Grand Platinum Edition добавляет"
  ],
  [
    "wazdan-15-coins",
    "15 Coins расширяет"
  ],
  [
    "wazdan-15-coins-grand-diamond-edition",
    "15 Coins Grand Diamond Edition возвращает"
  ]
] as const;

test("wave 54 complete provider dossiers with localized artwork", async ({ page }) => {
  for (const [slug, uniquePhrase] of cases) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#how-it-works")).toContainText(uniquePhrase);
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    expect(await page.locator("#functions .dossier-feature-card").count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator("#math-profile .eyebrow")).toHaveText("Цифры без ложной точности");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#catalog-comparison h2")).toHaveText("Сравнение с другими играми");
    await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
    expect(await page.locator("#facts a").count()).toBeGreaterThan(0);
    await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
    await expect(page.locator("#faq details").first()).toContainText("Что главное в механике");
    const image = page.locator(".slot-figure .catalog-dossier-art");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(image).not.toHaveAttribute("src", /unavailable\.svg/);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
