import { expect, test } from "@playwright/test";

const cases = [
  [
    "playn-go-house-of-doom",
    "House of Doom"
  ],
  [
    "playn-go-house-of-doom-2-the-crypt",
    "House of Doom 2: The Crypt"
  ],
  [
    "playn-go-hugo",
    "Hugo"
  ],
  [
    "playn-go-hugo-2",
    "Hugo 2"
  ],
  [
    "playn-go-hugo-carts",
    "Hugo Carts"
  ],
  [
    "playn-go-hugo-goal",
    "Hugo Goal"
  ],
  [
    "playn-go-hugo-legacy",
    "Hugo Legacy"
  ],
  [
    "playn-go-hugos-adventure",
    "Hugo's Adventure"
  ],
  [
    "playn-go-ice-joker",
    "Ice Joker"
  ],
  [
    "playn-go-idol-of-fortune",
    "Idol of Fortune"
  ],
  [
    "playn-go-immortails-of-egypt",
    "ImmorTails of Egypt"
  ],
  [
    "playn-go-imperial-opera",
    "Imperial Opera"
  ],
  [
    "playn-go-infernal-trinity-go-guaranteed",
    "Infernal Trinity GO Guaranteed"
  ],
  [
    "playn-go-inferno-joker",
    "Inferno Joker"
  ],
  [
    "playn-go-inferno-star",
    "Inferno Star"
  ],
  [
    "playn-go-invading-vegas",
    "Invading Vegas"
  ],
  [
    "playn-go-invading-vegas-revenge-on-mars",
    "Invading Vegas Revenge on Mars"
  ],
  [
    "playn-go-invading-vegas-las-christmas",
    "Invading Vegas: Las Christmas"
  ],
  [
    "playn-go-irish-gold",
    "Irish Gold"
  ],
  [
    "playn-go-iron-girl",
    "Iron Girl"
  ]
] as const;

test("Wave 78: twenty published /slots cards retain their first-party local artwork", async ({ page }) => {
  for (const [slug, name] of cases) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const image = card.locator(".catalog-game-art .game-image");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(image).not.toHaveAttribute("src", /unavailable\.svg/);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => image.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
