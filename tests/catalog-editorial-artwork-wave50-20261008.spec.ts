import { expect, test } from "@playwright/test";
const slots = [
  ["playn-go-puebla-parade", "танцующих Wild"],
  ["playn-go-queens-day-tilt", "Queen's Day Tilt"],
  ["playn-go-ras-reckoning", "Mega Drop"],
  ["playn-go-rabbit-hole-riches", "Tower Power"],
  ["playn-go-rabbit-hole-riches-court-of-hearts", "Cheshire Cat"],
  ["playn-go-rage-to-riches", "последовательность 10"],
  ["playn-go-raging-rex", "Rampage"],
  ["playn-go-raging-rex-2", "Hatchling Mania"],
  ["push-gaming-10-cash-bisons", "Cash Collect"],
  ["push-gaming-10-flaming-bisons", "Jackpot Bison"],
  ["push-gaming-10-pharaohs", "Scarab"],
  ["push-gaming-10-santas-reindeers", "Bell Symbols"],
  ["push-gaming-10-swords", "Shield"],
  ["push-gaming-3-liberty-eagles", "Eagle Pots"],
  ["push-gaming-3-magic-pots", "Magic Reels"],
  ["push-gaming-bait-n-bank", "Chest Collector"],
  ["push-gaming-bamboo-ways", "Mystery Symbols"],
  ["push-gaming-big-bam-book", "Golden Mystery Bamboo"],
  ["push-gaming-big-bamboo", "Gamble Wheel"],
  ["push-gaming-big-bamboo-2", "Lucky Bamboo"],
] as const;

test("wave 50 complete reviewed dossiers and real artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
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
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
