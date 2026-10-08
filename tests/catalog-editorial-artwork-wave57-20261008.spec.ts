import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-black-horse-cash-out-edition",
    "Sticky Cash Out остаётся"
  ],
  [
    "wazdan-black-horse-deluxe",
    "Multi Level Wins убирает"
  ],
  [
    "wazdan-book-of-faith",
    "Collector переносит значения"
  ],
  [
    "wazdan-bumba-meu-boi-coin",
    "Magic Coin появляется"
  ],
  [
    "wazdan-burning-reels",
    "Пожарный в экипировке"
  ],
  [
    "wazdan-burning-stars",
    "звёздных Scatter"
  ],
  [
    "wazdan-burning-stars-3",
    "матрице 3×3"
  ],
  [
    "wazdan-burning-sun",
    "16 независимых барабанов"
  ],
  [
    "wazdan-burning-sun-extremely-light",
    "облегчённых изображениях"
  ],
  [
    "wazdan-butterfly-lovers",
    "Синие бабочки наполняют"
  ],
  [
    "wazdan-captain-shark",
    "Отдельные Scatter и Wild"
  ],
  [
    "wazdan-cash-grotto",
    "24 отдельных барабанах"
  ],
  [
    "wazdan-choco-reels",
    "46 656"
  ],
  [
    "wazdan-clover-lady",
    "Direwolf на верхнем"
  ],
  [
    "wazdan-colin-the-cat",
    "четырёх барабанах"
  ],
  [
    "wazdan-corrida-romance",
    "матадор Wild"
  ],
  [
    "wazdan-corrida-romance-deluxe",
    "только на среднем барабане"
  ],
  [
    "wazdan-crazy-cars",
    "пять линий"
  ],
  [
    "wazdan-criss-cross-81",
    "81 линию"
  ],
  [
    "wazdan-cube-mania",
    "Три Scatter дают 15"
  ]
] as const;
test("wave 57 Wazdan dossiers match full template, text and loaded first-party artwork", async ({ page }) => {
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
    await expect(art).not.toHaveAttribute("src",/unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
    await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
  }
});
