import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-danny-dollar", "Progressive Global Multiplier"],
  ["hacksaw-gaming-dark-spiral", "Summoning Symbols"],
  ["hacksaw-gaming-dark-summoning", "Lost Soul"],
  ["hacksaw-gaming-dawn-of-kings", "Triple Book of Dawn"],
  ["hacksaw-gaming-deal-with-death", "Poker Mode"],
  ["hacksaw-gaming-death-becomes-you", "Duel With Death"],
  ["hacksaw-gaming-densho", "Progression Trackers"],
  ["hacksaw-gaming-divine-drop", "Vitality"],
  ["hacksaw-gaming-donny-and-danny", "Cash Board"],
  ["hacksaw-gaming-donny-dough", "Multi-Dough"],
] as const;

test("wave 17 Hacksaw cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toHaveAttribute("src", new RegExp(slug));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  }
});
