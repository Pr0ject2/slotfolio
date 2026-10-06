import { expect, test } from "@playwright/test";

for (const slug of ["playn-go-nsync-pop"]) {
  test(`catalog ${slug} uses the dossier template with verified first-party artwork`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading")).toBeVisible();
    await expect(page.locator(".slot-intro")).toBeVisible();
    const artwork = page.locator(".slot-figure .catalog-dossier-art");
    await expect(artwork).toBeVisible();
    await expect(artwork).toHaveAttribute("src", /playn-go-nsync-pop\.webp$/);
    await artwork.scrollIntoViewIfNeeded();
    await expect.poll(async () => artwork.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect(page.locator(".article-layout")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Основные параметры" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Сравнение с другими играми" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Факты и источники" })).toBeVisible();
    await expect(page.locator("#editorial")).toBeVisible();
    await expect(page.locator("#how-it-works")).toContainText("Encore Spin");
    await expect(page.getByRole("heading", { name: "Ответы на частые вопросы" })).toBeVisible();
    await expect(page.locator("#facts")).toBeVisible();
    await expect(page.locator(".catalog-record-page")).toHaveCount(0);
  });
}

test("catalog dossier renders approved game artwork", async ({ page }) => {
  await page.goto("/slots/catalog/3-oaks-gaming-3-clover-pots-extra");
  const artwork = page.locator(".slot-figure .catalog-dossier-art");
  await expect(artwork).toBeVisible();
  await expect(artwork).toHaveAttribute("src", /3-oaks-gaming-3-clover-pots-extra\.webp$/);
});


test("3 Aztec Temples shows only its own translated mechanics details", async ({ page }) => {
  await page.goto("/slots/catalog/3-oaks-gaming-3-aztec-temples");
  await expect(page.getByRole("heading", { name: "Шесть бонусных монет" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Три храмовые шкалы" })).toBeVisible();
  await expect(page.locator("#functions")).not.toContainText("Дополнительная функция меняет сценарий игрового раунда.");
  await expect(page.locator("#how-it-works")).toContainText("условия запуска важнее одиночного выигрыша по линии");
  await expect(page.locator("#editorial")).toContainText("состояние трёх храмовых шкал");
  await expect(page.locator("#catalog-comparison")).toContainText("Сравнение с другими играми");
});

for (const [slug, title, text] of [
  ["3-oaks-gaming-3-clover-pots-extra", "Rainbow Coin в Hold & Win", "Rainbow Coin может открыть ещё одну функцию горшка"],
  ["3-oaks-gaming-3-coin-volcanoes", "Life, Multi и Grow", "Grow открывает две дополнительные строки"],
  ["3-oaks-gaming-3-coins", "Алмаз x100–x500", "алмаз с множителем от x100 до x500"],
  ["3-oaks-gaming-3-egypt-chests", "Multi, Extra и Double", "Double удваивает игровое поле"],
  ["3-oaks-gaming-3-jewel-crowns", "Короны открывают семь фриспинов", "Заполненные шкалы запускают семь бесплатных вращений"],
] as const) {
  test(`catalog ${slug} shows its own Russian mechanics`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#functions")).toBeVisible();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.locator("#functions")).toContainText(text);
    await expect(page.locator("#functions")).not.toContainText("Дополнительная функция меняет сценарий игрового раунда.");
  });
}

for (const [slug, title] of [
  ["3-oaks-gaming-3-olymp-fortunes", "Super Wheel перед бонусом"],
  ["3-oaks-gaming-3-pots-of-egypt", "Collect, Boost и Multi"],
  ["3-oaks-gaming-3-super-coin-volcanoes", "Super Wheel и Gold Volcano"],
  ["3-oaks-gaming-3-super-hot-teapots", "Super Wheel даёт старт"],
  ["3-oaks-gaming-4-african-drums", "Master Drum в респинах"],
] as const) {
  test(`catalog ${slug} keeps source-specific Russian feature cards`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#functions")).toBeVisible();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  });
}

for (const [slug, title] of [
  ["3-oaks-gaming-4-clover-pots", "Super Pot 10 000x"],
  ["3-oaks-gaming-4-fairy-flowers", "Magic Bonus четвёртого цветка"],
  ["3-oaks-gaming-4-fortune-clovers", "Fortune Situation"],
  ["3-oaks-gaming-4-pots-of-egypt", "Четыре функции горшков"],
  ["3-oaks-gaming-4-wolf-drums", "Master Drum"],
] as const) {
  test(`catalog ${slug} keeps source-specific Russian feature cards`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#functions")).toBeVisible();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  });
}

for (const [slug, title] of [
  ["3-oaks-gaming-777-fruity-coins", "Три Collect и Grand"],
  ["3-oaks-gaming-777-gems-respin", "Полный экран Gems x2"],
  ["3-oaks-gaming-amazonia-wins", "Win + Collect забирают награду"],
  ["3-oaks-gaming-aztec-fire", "Расширение до 40 позиций"],
  ["3-oaks-gaming-aztec-fire-2", "Восемь рядов в Hold & Win"],
] as const) {
  test(`catalog ${slug} keeps source-specific Russian feature cards`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#functions")).toBeVisible();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  });
}


for (const [slug, intro, editorial] of [
  ["3-oaks-gaming-3-olymp-fortunes", "Super Wheel гарантирует дополнительную награду", "зависит и от горшков, и от Super Wheel"],
  ["3-oaks-gaming-3-pots-of-egypt", "цветные специальные монеты", "какие горшки успели заполниться"],
  ["3-oaks-gaming-3-super-coin-volcanoes", "Три вулканические функции", "Gold Volcano даёт множители x5"],
  ["3-oaks-gaming-3-super-hot-teapots", "цветные символы заполняют три чайника", "повторные множители растут на +1"],
  ["3-oaks-gaming-4-african-drums", "алмазы заполняют четыре шкалы барабанов", "Master Drum"],
] as const) {
  test(`catalog ${slug} has distinct game-specific dossier copy`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works")).toContainText(intro);
    await expect(page.locator("#editorial")).toContainText(editorial);
  });
}


for (const [slug, intro, editorial] of [
  ["3-oaks-gaming-4-clover-pots", "Четвёртый большой горшок", "два уровня бонуса"],
  ["3-oaks-gaming-4-fairy-flowers", "Четвёртый цветок", "пробуждение четвёртого цветка"],
  ["3-oaks-gaming-4-fortune-clovers", "Fortune Situation", "до шести"],
  ["3-oaks-gaming-4-pots-of-egypt", "четыре шкалы-горшка", "включаются одновременно"],
  ["3-oaks-gaming-4-wolf-drums", "Master Drum", "недостающую функцию"],
  ["3-oaks-gaming-777-fruity-coins", "Collect с 777", "утроить Grand Jackpot"],
  ["3-oaks-gaming-777-gems-respin", "два заполненных одинаковыми Gems", "третий"],
  ["3-oaks-gaming-amazonia-wins", "Extra Board", "связкой Win и Collect"],
  ["3-oaks-gaming-aztec-fire", "шесть огненных метеоров", "40 позиций"],
  ["3-oaks-gaming-aztec-fire-2", "шесть метеоров", "до восьми рядов"],
] as const) {
  test(`catalog ${slug} has its own full dossier copy`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works")).toContainText(intro);
    await expect(page.locator("#editorial")).toContainText(editorial);
  });
}
