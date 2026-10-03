import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-benny-the-beer", "Book of Stackways"],
  ["hacksaw-gaming-booze-bash", "Match-2-Win"],
  ["hacksaw-gaming-bouncy-bombs", "Cascading Dynamite Bomb"],
  ["hacksaw-gaming-bullets-and-bounty", "Wild DuelReel"],
  ["hacksaw-gaming-cash-crew", "Grab ’em"],
  ["hacksaw-gaming-chaos-crew", "Cranky Cat"],
  ["hacksaw-gaming-chaos-crew-2", "Epic Drop"],
  ["hacksaw-gaming-chaos-crew-3", "Glitch Dogs"],
  ["hacksaw-gaming-circle-of-life", "Tree of Life"],
  ["hacksaw-gaming-cloud-princess", "Progressive Divine Multiplier"],
] as const;

test("wave 16 Hacksaw cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator(".slot-figure .catalog-dossier-art")).toHaveAttribute("src", new RegExp(slug));
  }
});
