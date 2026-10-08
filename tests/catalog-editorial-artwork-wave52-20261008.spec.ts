import { expect, test } from "@playwright/test";
const slots = [
  [
    "push-gaming-fat-banker",
    "Fortune Link собирает"
  ],
  [
    "push-gaming-fat-drac",
    "Семь видимых"
  ],
  [
    "push-gaming-fat-santa",
    "Санта появляется на санях"
  ],
  [
    "push-gaming-fire-hopper",
    "Огненная лягушка"
  ],
  [
    "push-gaming-fire-pig-push-ways",
    "Hot Zones"
  ],
  [
    "push-gaming-fish-n-nudge",
    "Net Symbol"
  ],
  [
    "push-gaming-fish-n-nudge-big-catch",
    "Лодка"
  ],
  [
    "push-gaming-generous-jack",
    "Jack Symbols"
  ],
  [
    "push-gaming-giga-jar",
    "Snowball"
  ],
  [
    "push-gaming-goat-getter",
    "Coin Drop"
  ],
  [
    "push-gaming-happy-bamboo",
    "Panda Pot"
  ],
  [
    "push-gaming-hearts-highway",
    "Golden Hearts"
  ],
  [
    "push-gaming-henry-the-ape",
    "Gold Disks"
  ],
  [
    "push-gaming-iron-phoenix",
    "Phoenix Reel"
  ],
  [
    "push-gaming-jaguar-drop",
    "Second Chance"
  ],
  [
    "push-gaming-jammin-jars-2",
    "Gold Vinyl"
  ],
  [
    "push-gaming-jiggys-pot-o-gold",
    "Golden Clover"
  ],
  [
    "push-gaming-joker-troupe",
    "Hypermode"
  ],
  [
    "push-gaming-mad-blast",
    "Extra Life"
  ],
  [
    "push-gaming-mad-cars",
    "Scatter Car"
  ]
] as const;

test("wave 52 full Push Gaming editorial and artwork in dossiers", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    expect(await page.locator("#functions .dossier-feature-card").count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator("#math-profile .eyebrow")).toHaveText("Цифры без ложной точности");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#catalog-comparison h2")).toHaveText("Сравнение с другими играми");
    await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
    expect(await page.locator("#facts a").count()).toBeGreaterThan(0);
    await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
    await expect(page.locator("#faq details").first()).toContainText("Что главное в механике");
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
