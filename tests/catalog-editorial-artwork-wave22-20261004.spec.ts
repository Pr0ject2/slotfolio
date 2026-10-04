import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-le-sortudo", "Rainbow Fortune Hold & Win"],
  ["hacksaw-gaming-le-viking", "Magic Cauldron"],
  ["hacksaw-gaming-le-zeus", "Mystery Reels"],
  ["hacksaw-gaming-magic-piggy-og", "Magic Hat"],
  ["hacksaw-gaming-marlin-masters", "Marlin Progress Bar"],
  ["hacksaw-gaming-marlin-masters-atlantis", "Jackpot Marlins"],
  ["hacksaw-gaming-marlin-masters-og", "LootLine"],
  ["hacksaw-gaming-marlin-masters-the-big-haul", "Golden Marlin"],
  ["hacksaw-gaming-mayan-stackways", "100 000 ways"],
  ["hacksaw-gaming-miami-mayhem", "Wanted Level"],
] as const;

test("wave 22 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
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
