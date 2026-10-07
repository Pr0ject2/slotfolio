import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-imperial-opera", "Showcase"],
  ["playn-go-infernal-trinity-go-guaranteed", "GO Guaranteed"],
  ["playn-go-inferno-joker", "reel 3"],
  ["playn-go-inferno-star", "Raging Suns"],
  ["playn-go-invading-vegas", "Lock On Re-Spin"],
  ["playn-go-invading-vegas-revenge-on-mars", "Mystery Symbols"],
  ["playn-go-invading-vegas-las-christmas", "Mystery Symbols"],
  ["playn-go-irish-gold", "Pot of Gold"],
  ["playn-go-iron-girl", "Villain Collection Meter"],
  ["playn-go-jade-magician", "Second Chance"],
  ["playn-go-jewel-box", "pick-and-click"],
  ["playn-go-joker-flip", "Walking Wild"],
  ["playn-go-jolly-roger", "Treasure Chest"],
  ["playn-go-jolly-roger-2", "Treasure Map Hunt"],
  ["playn-go-jolly-roger-wild-kraken", "Cannon Free Spins"],
  ["playn-go-journey-to-paris", "Scatter Pays"],
  ["playn-go-king-of-sweets", "Sweet-o-meter"],
  ["playn-go-kings-mask", "15, 10 или 5 spins"],
  ["playn-go-kings-mask-eclipse-of-gods", "eclipse features"],
  ["playn-go-kingdom-below", "Slide n Grab"]
] as const;

test("wave 44 Play'n GO cards render full game-specific dossiers and loaded artwork", async ({ page }) => {
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
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
