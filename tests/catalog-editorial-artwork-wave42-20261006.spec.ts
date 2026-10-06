import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-ghost-of-dead", "Awakened Free Spins"],
  ["playn-go-gigantoonz", "Quantumeter"],
  ["playn-go-gnawn-gold", "Persistent Trail"],
  ["playn-go-gold-king", "Super Stack"],
  ["playn-go-gold-of-fortune-god", "Dragon’s Fortune"],
  ["playn-go-gold-trophy-2", "Prize Cheque"],
  ["playn-go-gold-volcano", "Eruption"],
  ["playn-go-golden-caravan", "Camel Scatters"],
  ["playn-go-golden-colts", "seven features"],
  ["playn-go-golden-legend", "Growing Wild Stacks"],
  ["playn-go-golden-osiris", "Pyramid"],
  ["playn-go-golden-ticket", "BONUS-column"],
  ["playn-go-golden-ticket-2", "Wild Meter"],
  ["playn-go-grannys-wild", "Scratch’n Win"],
  ["playn-go-grim-muerto", "Marco Siniestro"],
  ["playn-go-hammerfall", "Hammer Meter"],
  ["playn-go-happy-halloween", "Wild Pumpkins"],
  ["playn-go-helloween", "Keeper of the Seven Keys"],
  ["playn-go-highway-legends", "Cash Bags"],
  ["playn-go-holiday-season", "Win Spins"],
] as const;

test("wave 42 Play'n GO cards render game-specific copy and loaded artwork", async ({ page }) => {
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
