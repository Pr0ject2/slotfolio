import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-xmas-drop", "Wild Gift"],
  ["hacksaw-gaming-ze-zeus", "Divine Squares"],
  ["hacksaw-gaming-zeus-ze-zecond", "Wonder Reels"],
  ["nolimit-city-bowel-of-beelzebub", "механика Bowel Of Beelzebub"],
  ["nolimit-city-ding-dong-death", "Death Meter"],
  ["nolimit-city-duck-hunters-2", "x16 384"],
  ["nolimit-city-fire-in-the-hole-4", "механику Fire In The Hole 4"],
  ["nolimit-city-gator-hunters-2", "Fire Zone"],
  ["nolimit-city-six-feet-under", "Shovel"],
  ["playn-go-nsync-pop", "Encore Spin"],
] as const;

test("wave 27 cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight)).toBeGreaterThan(0);
  }
});
