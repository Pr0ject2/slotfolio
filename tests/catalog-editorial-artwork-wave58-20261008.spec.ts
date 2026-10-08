import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-cube-mania-deluxe",
    "В Cube Mania Deluxe девять линий работают в обе с"
  ],
  [
    "wazdan-demon-jack-27",
    "В Demon Jack 27 всего три барабана, но 27 линий: "
  ],
  [
    "wazdan-dino-reels-81",
    "Dino Reels 81 использует Ти-рекса как Wild: офици"
  ],
  [
    "wazdan-double-tigers",
    "Double Tigers противопоставляет синего и огненног"
  ],
  [
    "wazdan-draculas-castle",
    "В Dracula`s Castle сам Дракула служит расширяющим"
  ],
  [
    "wazdan-dragons-lucky-8",
    "Dragons Lucky 8 выделяется сохраняющимся Variable"
  ],
  [
    "wazdan-dwarfs-fortune",
    "В Dwarfs Fortune главный маршрут ведёт к Hold the"
  ],
  [
    "wazdan-easter-coins",
    "В Easter Coins пасхальные монеты заполняют поле и"
  ],
  [
    "wazdan-eggs-of-fortune",
    "Eggs of Fortune объединяет два разных Cash Out в "
  ],
  [
    "wazdan-fenix-play",
    "Fenix в каталоге Wazdan опубликован под официальн"
  ],
  [
    "wazdan-fenix-play-27",
    "Fenix Play 27 — не копия оригинального Fenix: те "
  ],
  [
    "wazdan-fenix-play-27-deluxe",
    "Fenix Play 27 Deluxe сохраняет три барабана и 27 "
  ],
  [
    "wazdan-fenix-play-deluxe",
    "Fenix Play Deluxe освежает оформление исходного F"
  ],
  [
    "wazdan-fire-bird",
    "Fire Bird — самостоятельная короткая ретро-игра н"
  ],
  [
    "wazdan-fishermans-luck",
    "В Fisherman`s Luck Gainer собирает значения Cash "
  ],
  [
    "wazdan-football-mania",
    "Football Mania строится на девяти барабанах и дву"
  ],
  [
    "wazdan-football-mania-deluxe",
    "Football Mania Deluxe меняет оформление и располо"
  ],
  [
    "wazdan-fortune-reels",
    "Fortune Reels совмещает 46 656 способов выигрыша "
  ],
  [
    "wazdan-fruit-fiesta",
    "В Fruit Fiesta мексиканский оркестр из фруктов иг"
  ],
  [
    "wazdan-fruit-mania",
    "Fruit Mania отличается от Fruit Fiesta девятью не"
  ]
] as const;
test("wave 58 Wazdan dossiers: complete template and real first-party artwork", async ({ page }) => {
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
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
