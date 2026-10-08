import { expect, test } from "@playwright/test";
const slots = [
  [
    "push-gaming-masked-mayhem",
    "Masked Mayhem"
  ],
  [
    "push-gaming-mystery-mission-to-the-moon",
    "Mystery Mission - To The Moon"
  ],
  [
    "push-gaming-mystery-museum",
    "Mystery Museum"
  ],
  [
    "push-gaming-mystery-of-the-nile",
    "Mystery of the Nile"
  ],
  [
    "push-gaming-neon-cash-city",
    "Neon Cash City"
  ],
  [
    "push-gaming-olympus-unleashed",
    "Olympus Unleashed"
  ],
  [
    "push-gaming-power-paws",
    "Power Paws"
  ],
  [
    "push-gaming-power-vault",
    "Power Vault"
  ],
  [
    "push-gaming-rat-king",
    "Rat King"
  ],
  [
    "push-gaming-razor-returns",
    "Razor Returns"
  ],
  [
    "push-gaming-razor-shark-jackpots",
    "Razor Shark Jackpots"
  ],
  [
    "push-gaming-razor-ways",
    "Razor Ways"
  ],
  [
    "push-gaming-red-hot-multipliers",
    "Red Hot Multipliers"
  ],
  [
    "push-gaming-regal-knights",
    "Regal Knights"
  ],
  [
    "push-gaming-retro-sweets",
    "Retro Sweets"
  ],
  [
    "push-gaming-retroverse",
    "RetroVerse"
  ],
  [
    "push-gaming-samurais-katana",
    "Samurai's Katana"
  ],
  [
    "push-gaming-santa-hopper",
    "Santa Hopper"
  ],
  [
    "push-gaming-santas-vault",
    "Santa's Vault"
  ],
  [
    "push-gaming-sea-of-spirits",
    "Sea of Spirits"
  ]
] as const;

test("wave 53 reviewed artwork loads in the catalog listing", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), {timeout: 15_000}).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), {timeout: 15_000}).toBeGreaterThan(0);
  }
});
