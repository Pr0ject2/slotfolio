import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-kiss-reels-of-rock", "Encore Free Spin"],
  ["playn-go-lab-of-madness-its-a-wild", "Monster Wild"],
  ["playn-go-lady-of-fortune", "Pick-a-Prize"],
  ["playn-go-lady-of-fortune-destiny-spins", "Persistent Crystal Ball"],
  ["playn-go-lady-of-fortune-remastered", "Ouija Planchette"],
  ["playn-go-lawn-n-disorder", "Wheel of Rewards"],
  ["playn-go-legacy-of-dynasties", "Nested Spins"],
  ["playn-go-legacy-of-egypt", "Wheel of the Gods"],
  ["playn-go-legacy-of-gems-blitzways", "Blitzways"],
  ["playn-go-legacy-of-inca", "Wheel of the Gods"],
  ["playn-go-legacy-of-undead-dragon-abyssways", "Dragon's Wrath"],
  ["playn-go-legend-of-the-ice-dragon", "Hailstorm"],
  ["playn-go-legion-gold", "Mega Coin"],
  ["playn-go-legion-gold-and-the-sphinx-of-dead", "3×3 Mega Symbol"],
  ["playn-go-legion-gold-and-the-throne-of-dead", "Coin Chest"],
  ["playn-go-legion-gold-reckoning", "GO Ultra"],
  ["playn-go-legion-gold-unleashed", "three initial re-spins"],
  ["playn-go-legion-gold-victory", "Instant Prize Coins"],
  ["playn-go-leprechaun-goes-egypt", "Cleopatra"],
  ["playn-go-leprechaun-goes-wild", "Luck of the Irish"]
] as const;

test("wave 45 Play'n GO cards render full game-specific dossiers and loaded artwork", async ({ page }) => {
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
