import { expect, test } from "@playwright/test";
const slots = [
  [
    "push-gaming-fat-banker",
    "Fat banker"
  ],
  [
    "push-gaming-fat-drac",
    "Fat Drac"
  ],
  [
    "push-gaming-fat-santa",
    "Fat Santa"
  ],
  [
    "push-gaming-fire-hopper",
    "Fire Hopper"
  ],
  [
    "push-gaming-fire-pig-push-ways",
    "Fire Pig Push Ways"
  ],
  [
    "push-gaming-fish-n-nudge",
    "Fish 'n' Nudge"
  ],
  [
    "push-gaming-fish-n-nudge-big-catch",
    "Fish 'n' Nudge Big Catch"
  ],
  [
    "push-gaming-generous-jack",
    "Generous Jack"
  ],
  [
    "push-gaming-giga-jar",
    "Giga Jar"
  ],
  [
    "push-gaming-goat-getter",
    "Goat Getter"
  ],
  [
    "push-gaming-happy-bamboo",
    "Happy Bamboo"
  ],
  [
    "push-gaming-hearts-highway",
    "Hearts Highway"
  ],
  [
    "push-gaming-henry-the-ape",
    "Henry The Ape"
  ],
  [
    "push-gaming-iron-phoenix",
    "Iron Phoenix"
  ],
  [
    "push-gaming-jaguar-drop",
    "Jaguar Drop"
  ],
  [
    "push-gaming-jammin-jars-2",
    "Jammin' Jars 2"
  ],
  [
    "push-gaming-jiggys-pot-o-gold",
    "Jiggy’s Pot O’ Gold"
  ],
  [
    "push-gaming-joker-troupe",
    "Joker Troupe"
  ],
  [
    "push-gaming-mad-blast",
    "Mad Blast"
  ],
  [
    "push-gaming-mad-cars",
    "Mad Cars"
  ]
] as const;

test("wave 52 first-party catalog artwork loads in /slots", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
