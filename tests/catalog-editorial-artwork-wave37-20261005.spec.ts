// Wave 37 Play’n GO dossier regression coverage.
import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-def-leppard-hysteria", "Pour Some Sugar on Me"],
  ["playn-go-demon", "One Helluva Night"],
  ["playn-go-derby-wheel", "Bonus Wheel"],
  ["playn-go-diamond-vortex", "Sticky Wilds"],
  ["playn-go-diamonds-of-the-realm", "Random Win Multiplier"],
  ["playn-go-dio-killing-the-dragon", "Lock Up the Wolves"],
  ["playn-go-disco-diamonds", "Disco Wild"],
  ["playn-go-divina-commedia-i-nove-cerchi", "Modifier Wheel"],
  ["playn-go-divine-showdown", "Multiplier Reel"],
  ["playn-go-doom-of-egypt", "Sacred Scarab"],
] as const;

test("wave 37 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
