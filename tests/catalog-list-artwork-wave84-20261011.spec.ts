import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-le-fisherman",
    "name": "Le Fisherman"
  },
  {
    "slug": "hacksaw-gaming-le-hooligan",
    "name": "Le Hooligan"
  },
  {
    "slug": "hacksaw-gaming-le-king",
    "name": "Le King"
  },
  {
    "slug": "hacksaw-gaming-le-prechaun",
    "name": "Le Prechaun"
  },
  {
    "slug": "hacksaw-gaming-le-santa",
    "name": "Le Santa"
  },
  {
    "slug": "hacksaw-gaming-le-sortudo",
    "name": "Le Sortudo"
  },
  {
    "slug": "hacksaw-gaming-le-viking",
    "name": "Le Viking"
  },
  {
    "slug": "hacksaw-gaming-le-zeus",
    "name": "Le Zeus"
  },
  {
    "slug": "hacksaw-gaming-magic-piggy-og",
    "name": "Magic Piggy OG"
  },
  {
    "slug": "hacksaw-gaming-marlin-masters",
    "name": "Marlin Masters"
  },
  {
    "slug": "hacksaw-gaming-marlin-masters-atlantis",
    "name": "Marlin Masters Atlantis"
  },
  {
    "slug": "hacksaw-gaming-marlin-masters-og",
    "name": "Marlin Masters OG"
  },
  {
    "slug": "hacksaw-gaming-marlin-masters-the-big-haul",
    "name": "Marlin Masters: The Big Haul"
  },
  {
    "slug": "hacksaw-gaming-mayan-stackways",
    "name": "Mayan Stackways"
  },
  {
    "slug": "hacksaw-gaming-miami-mayhem",
    "name": "Miami Mayhem"
  },
  {
    "slug": "hacksaw-gaming-mighty-masks",
    "name": "Mighty Masks"
  },
  {
    "slug": "hacksaw-gaming-munchy-milo",
    "name": "Munchy Milo"
  },
  {
    "slug": "hacksaw-gaming-octo-attack",
    "name": "Octo Attack"
  },
  {
    "slug": "hacksaw-gaming-orb-of-destiny",
    "name": "Orb of Destiny"
  },
  {
    "slug": "hacksaw-gaming-phoenix-duelreels",
    "name": "Phoenix DuelReels"
  }
] as const;

test("Wave 84: twenty /slots published cards load original local artwork", async ({ page }) => {
  for (const { slug, name } of cases) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
