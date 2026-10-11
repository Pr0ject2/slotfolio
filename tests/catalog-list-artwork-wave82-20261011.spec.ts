import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-dark-summoning",
    "name": "Dark Summoning"
  },
  {
    "slug": "hacksaw-gaming-dawn-of-kings",
    "name": "Dawn of Kings"
  },
  {
    "slug": "hacksaw-gaming-deal-with-death",
    "name": "Deal With Death"
  },
  {
    "slug": "hacksaw-gaming-densho",
    "name": "Densho"
  },
  {
    "slug": "hacksaw-gaming-divine-drop",
    "name": "Divine Drop"
  },
  {
    "slug": "hacksaw-gaming-donny-and-danny",
    "name": "Donny and Danny"
  },
  {
    "slug": "hacksaw-gaming-donny-dough",
    "name": "Donny Dough"
  },
  {
    "slug": "hacksaw-gaming-donut-division",
    "name": "Donut Division"
  },
  {
    "slug": "hacksaw-gaming-dorks-of-the-deep",
    "name": "Dorks of the Deep"
  },
  {
    "slug": "hacksaw-gaming-dragons-domain",
    "name": "Dragon's Domain"
  },
  {
    "slug": "hacksaw-gaming-dropem",
    "name": "Drop'em"
  },
  {
    "slug": "hacksaw-gaming-duel-at-dawn",
    "name": "Duel at Dawn"
  },
  {
    "slug": "hacksaw-gaming-dusk-princess",
    "name": "Dusk Princess"
  },
  {
    "slug": "hacksaw-gaming-dynasty-of-death",
    "name": "Dynasty of Death"
  },
  {
    "slug": "hacksaw-gaming-epic-bullets-and-bounty",
    "name": "Epic Bullets and Bounty"
  },
  {
    "slug": "hacksaw-gaming-epic-ze-zeus",
    "name": "Epic Ze Zeus"
  },
  {
    "slug": "hacksaw-gaming-eternal-duel",
    "name": "Eternal Duel"
  },
  {
    "slug": "hacksaw-gaming-evil-eyes",
    "name": "Evil Eyes"
  },
  {
    "slug": "hacksaw-gaming-eye-of-medusa",
    "name": "Eye of Medusa"
  },
  {
    "slug": "hacksaw-gaming-eye-of-the-panda",
    "name": "Eye of the Panda"
  }
] as const;

test("Wave 82: 20 selected /slots search cards load checked local artwork", async ({ page }) => {
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
