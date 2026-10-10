import { expect, test } from "@playwright/test";

const cases = [
  [
    "3-oaks-gaming-buddha-megaways",
    "Buddha Megaways",
    "Buddha Megaways меняет высоту шести барабанов"
  ],
  [
    "3-oaks-gaming-chili-coins",
    "Chili Coins",
    "Chili Coins использует фруктовое поле 3×3 с п"
  ],
  [
    "3-oaks-gaming-china-festival",
    "China Festival",
    "China Festival разворачивает Hold & Win на се"
  ],
  [
    "3-oaks-gaming-coin-express",
    "Coin Express",
    "Coin Express объединяет классическое фруктово"
  ],
  [
    "3-oaks-gaming-coin-lamp",
    "Coin Lamp",
    "Coin Lamp переносит механику накопления монет"
  ],
  [
    "3-oaks-gaming-coin-princess-x1000",
    "Coin Princess x1000",
    "Coin Princess x1000 платит за восемь и более "
  ],
  [
    "3-oaks-gaming-coin-volcano",
    "Coin Volcano",
    "Оригинальный Coin Volcano использует компактн"
  ],
  [
    "3-oaks-gaming-crystal-scarabs",
    "Crystal Scarabs",
    "Crystal Scarabs размещает синих и золотых ска"
  ],
  [
    "3-oaks-gaming-dancing-joker",
    "Dancing Joker",
    "Dancing Joker: Break & Win использует 5×3 и 4"
  ],
  [
    "3-oaks-gaming-dj-tiger-x1000",
    "DJ Tiger x1000",
    "DJ Tiger x1000 работает на поле 6×5: восемь о"
  ],
  [
    "3-oaks-gaming-gold-express",
    "Gold Express",
    "Gold Express возвращает Hold & Win к поезду и"
  ],
  [
    "3-oaks-gaming-gold-nuggets",
    "Gold Nuggets",
    "Gold Nuggets — шахтёрский Hold & Win 3×3: три"
  ],
  [
    "3-oaks-gaming-golden-teapot",
    "Golden Teapot",
    "Golden Teapot соединяет поле 5×4, Hold & Win "
  ],
  [
    "3-oaks-gaming-grab-more-gold",
    "Grab more Gold!",
    "Grab more Gold! продолжает шахтёрскую серию н"
  ],
  [
    "3-oaks-gaming-moon-sisters",
    "Moon Sisters",
    "Moon Sisters предлагает поле 5×3 с 25 линиями"
  ],
  [
    "3-oaks-gaming-more-magic-apple",
    "More Magic Apple",
    "More Magic Apple использует поле 5×4 с 25 лин"
  ],
  [
    "3-oaks-gaming-power-sun",
    "Power Sun",
    "Power Sun оформлен как фруктовый слот 3×3 с п"
  ],
  [
    "3-oaks-gaming-power-sun-xxl",
    "Power Sun XXL",
    "Power Sun XXL расширяет оригинальную серию до"
  ],
  [
    "3-oaks-gaming-purple-diamond",
    "Purple Diamond",
    "Purple Diamond развивает классический слот 5×"
  ],
  [
    "3-oaks-gaming-rio-gems",
    "Rio Gems",
    "Rio Gems переносит Hold & Win на карнавальное"
  ]
] as const;

test("Wave 68: twenty source-backed 3 Oaks dossiers and local artwork", async ({ page }) => {
  for (const [slug, , uniqueIntro] of cases) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#how-it-works")).toContainText(uniqueIntro);
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
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
