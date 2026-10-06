import { expect, test } from "@playwright/test";

const researched = [
  ["playn-go-ghost-of-dead", "Ghost of Dead", "Canopus"],
  ["playn-go-gigantoonz", "Gigantoonz", "Quantumeter"],
  ["playn-go-golden-colts", "Golden Colts", "Ace High Gang"],
] as const;

test("researched catalog dossiers use the full dossier structure", async ({ page }) => {
  for (const [slug, name, phrase] of researched) {
    await page.goto(`/slots/catalog/${slug}`);

    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator(".slot-summary .slot-deck")).toContainText(phrase);
    await expect(page.locator(".slot-summary .slot-deck")).not.toHaveText(`${name} от Play’n GO.`);

    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#functions .dossier-feature-card")).toHaveCount(3);

    await expect(page.locator("#math-profile h2")).toHaveText("Параметры игры");
    await expect(page.locator("#math-profile .eyebrow")).toHaveText("Цифры без ложной точности");
    await expect(page.locator("#math-profile")).toContainText("Slotfolio не заполняет отсутствующие цифры предположениями");

    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#catalog-comparison h2")).toHaveText("Сравнение с другими играми");
    await expect(page.locator("#facts h2")).toHaveText("Параметры и источники");
    await expect(page.locator("#facts")).toContainText("официальная страница провайдера");
  }
});

test("unresearched catalog records do not receive fabricated editorial or metrics", async ({ page }) => {
  await page.goto("/slots/catalog/3-oaks-gaming-coin-up-volcano");

  await expect(page.locator("#how-it-works")).toHaveCount(0);
  await expect(page.locator("#functions")).toHaveCount(0);
  await expect(page.locator("#editorial")).toHaveCount(0);
  await expect(page.locator("#math-profile .metric-caveat")).toContainText("не заполняет отсутствующие цифры предположениями");
});
