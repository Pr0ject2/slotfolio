import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-pray-for-six",
    "name": "Pray for Six"
  },
  {
    "slug": "hacksaw-gaming-pray-for-three",
    "name": "Pray for Three"
  },
  {
    "slug": "hacksaw-gaming-rainbow-princess",
    "name": "Rainbow Princess"
  },
  {
    "slug": "hacksaw-gaming-red-rascal",
    "name": "Red Rascal"
  },
  {
    "slug": "hacksaw-gaming-reign-of-rome",
    "name": "Reign of Rome"
  },
  {
    "slug": "hacksaw-gaming-rise-of-fortuna",
    "name": "Rise of Fortuna"
  },
  {
    "slug": "hacksaw-gaming-rise-of-ymir",
    "name": "Rise of Ymir"
  },
  {
    "slug": "hacksaw-gaming-ronin-stackways",
    "name": "Ronin Stackways"
  },
  {
    "slug": "hacksaw-gaming-rusty-and-curly",
    "name": "Rusty & Curly"
  },
  {
    "slug": "hacksaw-gaming-sand-and-ashes",
    "name": "Sand and Ashes"
  },
  {
    "slug": "hacksaw-gaming-shaolin-master",
    "name": "Shaolin Master"
  },
  {
    "slug": "hacksaw-gaming-sixsixsix",
    "name": "SixSixSix"
  },
  {
    "slug": "hacksaw-gaming-slayers-inc",
    "name": "Slayers Inc"
  },
  {
    "slug": "hacksaw-gaming-smoking-dragon",
    "name": "Smoking Dragon"
  },
  {
    "slug": "hacksaw-gaming-snow-slingers",
    "name": "Snow Slingers"
  },
  {
    "slug": "hacksaw-gaming-spear-of-athena",
    "name": "Spear of Athena"
  },
  {
    "slug": "hacksaw-gaming-spinman",
    "name": "Spinman"
  },
  {
    "slug": "hacksaw-gaming-steamrunners",
    "name": "Steamrunners"
  },
  {
    "slug": "hacksaw-gaming-stormborn",
    "name": "Stormborn"
  },
  {
    "slug": "hacksaw-gaming-strength-of-hercules",
    "name": "Strength of Hercules"
  }
] as const;

test("Wave 85: twenty /slots search cards load existing local WebP artwork", async ({ page }) => {
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
