import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-leprechauns-diamond-dig", "Mega Blast"],
  ["playn-go-leprechauns-vault", "Sticky Wild"],
  ["playn-go-lion-saga-odyssey", "Special Expanding Symbol"],
  ["playn-go-loot-and-labyrinths", "Random Encounter"],
  ["playn-go-lord-merlin-and-the-lady-of-the-lake", "Nested Free Spins"],
  ["playn-go-lordi-reel-monsters", "Charge Metre"],
  ["playn-go-love-is-in-the-fair", "Love Map"],
  ["playn-go-love-joker", "Love Re-Spins"],
  ["playn-go-luchamigos", "Power Chili Spins"],
  ["playn-go-lucky-diamonds", "Diamond Wild"],
  ["playn-go-madame-ink", "Wild Ink"],
  ["playn-go-mafia-gold", "Drive-By"],
  ["playn-go-mahjong-88", "Seasonal Wilds"],
  ["playn-go-manta-mayhem", "Pearl Collection"],
  ["playn-go-matsuri", "Paper Lantern"],
  ["playn-go-medusas-madness", "Other World Free Round"],
  ["playn-go-mega-don", "трансформации символов"],
  ["playn-go-mega-don-triple-threat", "Hangry Meters"],
  ["playn-go-mega-don-feeding-frenzy", "Snack Time"],
  ["playn-go-merlin-and-the-ice-queen-morgana", "Morgana Special Wild"]
] as const;

test("wave 46 Play'n GO cards render full game-specific dossiers and loaded artwork", async ({ page }) => {
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
