import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-perfect-gems", "Perfect Spins"],
  ["playn-go-phoenix-reborn", "Phoenix Wild"],
  ["playn-go-photo-safari", "Film Strip Spins"],
  ["playn-go-piggy-bank-farm", "Piggy Bank Spins"],
  ["playn-go-piggy-blitz", "Blitz Spinz"],
  ["playn-go-piggy-blitz-casino-gold", "Bonus Game Multiplier"],
  ["playn-go-piggy-blitz-disco-gold", "Gold Piggy"],
  ["playn-go-piggy-heist", "Stethoscope Wild Meter"],
  ["playn-go-pilgrim-of-dead", "Special Expanding Symbol"],
  ["playn-go-pimped", "Win Spins"],
  ["playn-go-piranha-pays", "Piranha Trail"],
  ["playn-go-planet-fortune", "Magnetic Mayhem"],
  ["playn-go-playn-go-buffalo-of-wealth", "5×8"],
  ["playn-go-playn-go-mole-digger", "Feature Pots"],
  ["playn-go-playn-go-wrappin-gold", "Triggering Symbols"],
  ["playn-go-potion-of-madness", "Sticky Wilds"],
  ["playn-go-primal-rampage", "Primal Wheel"],
  ["playn-go-prism-of-gems", "MULTIPLIER REEL"],
  ["playn-go-prissy-princess", "Treasure Chest"],
  ["playn-go-prosperity-palace", "Golden Buddha"]
] as const;

test("wave 49 Play'n GO cards render full game-specific dossiers and loaded artwork", async ({ page }) => {
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
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
