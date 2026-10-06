import { expect, test } from "@playwright/test";

const researched = [
  { slug: "playn-go-golden-colts", name: "Golden Colts", phrase: "Ace High Gang" },
  { slug: "playn-go-gigantoonz", name: "Gigantoonz", phrase: "Quantumeter" },
  { slug: "3-oaks-gaming-15-dragon-pearls", name: "15 Dragon Pearls", phrase: "Hold & Win" },
] as const;

test("researched catalog records use the full dossier information architecture", async ({ page }) => {
  for (const slot of researched) {
    await page.goto(`/slots/catalog/${slot.slug}`);

    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator(".slot-summary .slot-deck")).toContainText(slot.phrase);
    await expect(page.locator(".compare-button")).toHaveAttribute("href", "#catalog-comparison");

    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    expect(await page.locator("#functions .dossier-feature-card").count()).toBeGreaterThanOrEqual(2);

    await expect(page.locator("#math-profile .eyebrow")).toHaveText("Цифры без ложной точности");
    await expect(page.locator("#math-profile h2")).toHaveText("Основные параметры");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");

    await expect(page.locator("#catalog-comparison h2")).toHaveText("Сравнение с другими играми");
    await expect(page.locator("#catalog-comparison .dossier-context-grid > div").first()).toBeVisible();

    await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
    expect(await page.locator("#facts .source-note").count()).toBeGreaterThanOrEqual(1);

    await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
    await expect(page.locator("#faq summary").first()).toContainText(slot.name);

    for (const href of await page.locator(".article-toc a[href^='#']").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")!))) {
      await expect(page.locator(href)).toHaveCount(1);
    }
  }
});

test("one-feature editorial records are expanded without removing their game-specific feature", async ({ page }) => {
  await page.goto("/slots/catalog/playn-go-golden-colts");
  const cards = page.locator("#functions .dossier-feature-card");
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(2);
  await expect(cards.first()).toContainText("Семь бонусных функций");
  const texts = await cards.allTextContents();
  expect(new Set(texts).size).toBe(count);
});

test("researched catalog metadata uses local reviewed artwork", async ({ page }) => {
  await page.goto("/slots/catalog/playn-go-gigantoonz");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/images\/catalog\/playn-go-gigantoonz\.webp/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
