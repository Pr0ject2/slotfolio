import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-golden-legend",
    "Golden Legend"
  ],
  [
    "playn-go-golden-osiris",
    "Golden Osiris"
  ],
  [
    "playn-go-golden-ticket",
    "Golden Ticket"
  ],
  [
    "playn-go-golden-ticket-2",
    "Golden Ticket 2"
  ],
  [
    "playn-go-grannys-wild",
    "Granny's Wild"
  ],
  [
    "playn-go-grim-muerto",
    "Grim Muerto"
  ],
  [
    "playn-go-hammerfall",
    "HammerFall"
  ],
  [
    "playn-go-happy-halloween",
    "Happy Halloween"
  ],
  [
    "playn-go-helloween",
    "Helloween"
  ],
  [
    "playn-go-highway-legends",
    "Highway Legends"
  ],
  [
    "playn-go-holiday-season",
    "Holiday Season"
  ],
  [
    "playn-go-holiday-spirits",
    "Holiday Spirits"
  ],
  [
    "playn-go-holy-moo-extreme-power",
    "Holy Moo! Extreme Power"
  ],
  [
    "playn-go-honey-rush",
    "Honey Rush"
  ],
  [
    "playn-go-honey-rush-100",
    "Honey Rush 100"
  ],
  [
    "playn-go-honey-rush-black-and-yellow",
    "Honey Rush Black and Yellow"
  ],
  [
    "playn-go-hooligan-hustle",
    "Hooligan Hustle"
  ],
  [
    "playn-go-hope-unleashed-fortune-rises",
    "Hope Unleashed Fortune Rises"
  ],
  [
    "playn-go-hot-dog-heist",
    "Hot Dog Heist"
  ],
  [
    "playn-go-hotel-yeti-way",
    "Hotel Yeti-Way"
  ]
] as const;
test("Wave 77: local artwork for 20 published /slots search cards", async ({ page }) => {
for (const [slug, name] of cases) {
  await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
  const card = page.locator(`[data-slot="${slug}"]`);
  await expect(card).toBeVisible();
  const art = card.locator(".catalog-game-art .game-image");
  await expect(art).toBeVisible();
  await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
  await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  await art.scrollIntoViewIfNeeded();
  await expect.poll(async () => art.evaluate(node => (node as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
  await expect.poll(async () => art.evaluate(node => (node as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
}}
);
