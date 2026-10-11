import { expect, test } from "@playwright/test";

const cases = [
  [
    "hacksaw-gaming-2-wild-2-die",
    "2 Wild 2 Die"
  ],
  [
    "hacksaw-gaming-3-cursed-chests-hold-and-win",
    "3 Cursed Chests: Hold & Win"
  ],
  [
    "hacksaw-gaming-aiko-and-the-wind-spirit",
    "Aiko and the Wind Spirit"
  ],
  [
    "hacksaw-gaming-arizona-james-and-the-lost-relics",
    "Arizona James and The Lost Relics"
  ],
  [
    "hacksaw-gaming-army-of-ares",
    "Army of Ares"
  ],
  [
    "hacksaw-gaming-bash-bros",
    "Bash Bros"
  ],
  [
    "hacksaw-gaming-beam-boys",
    "Beam Boys"
  ],
  [
    "hacksaw-gaming-beast-below",
    "Beast Below"
  ],
  [
    "hacksaw-gaming-benny-the-beer",
    "Benny the Beer"
  ],
  [
    "hacksaw-gaming-booze-bash",
    "Booze Bash"
  ],
  [
    "hacksaw-gaming-bouncy-bombs",
    "Bouncy Bombs"
  ],
  [
    "hacksaw-gaming-bullets-and-bounty",
    "Bullets and Bounty"
  ],
  [
    "hacksaw-gaming-cash-crew",
    "Cash Crew"
  ],
  [
    "hacksaw-gaming-chaos-crew-3",
    "Chaos Crew 3"
  ],
  [
    "hacksaw-gaming-circle-of-life",
    "Circle of Life"
  ],
  [
    "hacksaw-gaming-cloud-princess",
    "Cloud Princess"
  ],
  [
    "hacksaw-gaming-cursed-crypt",
    "Cursed Crypt"
  ],
  [
    "hacksaw-gaming-dandy-diamonds",
    "Dandy Diamonds"
  ],
  [
    "hacksaw-gaming-danny-dollar",
    "Danny Dollar"
  ],
  [
    "hacksaw-gaming-dark-spiral",
    "Dark Spiral"
  ]
] as const;

test("Wave 81: 20 published /slots cards display loaded reviewed artwork", async ({ page }) => {
  for (const [slug, name] of cases) {
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
