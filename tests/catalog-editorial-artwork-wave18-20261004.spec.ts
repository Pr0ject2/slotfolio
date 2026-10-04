import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-donut-division", "Gooey Gun"],
  ["hacksaw-gaming-dorks-of-the-deep", "Wild Reels"],
  ["hacksaw-gaming-dragons-domain", "Charred Land"],
  ["hacksaw-gaming-dropem", "Drop mechanic"],
  ["hacksaw-gaming-duel-at-dawn", "Outlaw Reels"],
  ["hacksaw-gaming-dusk-princess", "Blessing Bar"],
  ["hacksaw-gaming-dynasty-of-death", "Cash Prizes"],
  ["hacksaw-gaming-epic-bullets-and-bounty", "Bounty Hunter"],
  ["hacksaw-gaming-epic-ze-zeus", "Divine Squares"],
  ["hacksaw-gaming-eternal-duel", "FS DuelReels"],
] as const;

test("wave 18 Hacksaw cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(slug));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  }
});
