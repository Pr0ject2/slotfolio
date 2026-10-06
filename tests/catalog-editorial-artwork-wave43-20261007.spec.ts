import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-holiday-spirits", "Ebenezer’s Clock"],
  ["playn-go-holy-moo-extreme-power", "Divine Moo-ment"],
  ["playn-go-honey-rush", "Rush Meter"],
  ["playn-go-honey-rush-100", "Overcharge Meter"],
  ["playn-go-honey-rush-black-and-yellow", "Walking Wilds"],
  ["playn-go-hooligan-hustle", "Dynamic Payways"],
  ["playn-go-hope-unleashed-fortune-rises", "Magic Circle"],
  ["playn-go-hot-dog-heist", "Who’s a Good Doggie"],
  ["playn-go-hotel-yeti-way", "262 144"],
  ["playn-go-house-of-doom", "Hellgate"],
  ["playn-go-house-of-doom-2-the-crypt", "Spirit Gate"],
  ["playn-go-hugo", "Treasure bonus"],
  ["playn-go-hugo-2", "Beaver Cleaver"],
  ["playn-go-hugo-carts", "Dynamite Scatters"],
  ["playn-go-hugo-goal", "Penalty Shoot-Out"],
  ["playn-go-hugo-legacy", "15 Charges"],
  ["playn-go-hugos-adventure", "Air Race"],
  ["playn-go-ice-joker", "Winter’s Wheel"],
  ["playn-go-idol-of-fortune", "Wild Prize"],
  ["playn-go-immortails-of-egypt", "Bastet, Mafdet и Sekhmet"]
] as const;

test("wave 43 Play'n GO cards render full game-specific dossiers and loaded artwork", async ({ page }) => {
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
