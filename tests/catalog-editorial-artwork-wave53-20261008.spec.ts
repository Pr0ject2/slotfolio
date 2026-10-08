import { expect, test } from "@playwright/test";
const slots = [
  [
    "push-gaming-masked-mayhem",
    "Зона Win Zone"
  ],
  [
    "push-gaming-mystery-mission-to-the-moon",
    "Mystery Stacks занимают"
  ],
  [
    "push-gaming-mystery-museum",
    "Power Gamble"
  ],
  [
    "push-gaming-mystery-of-the-nile",
    "Golden Pharaoh"
  ],
  [
    "push-gaming-neon-cash-city",
    "сетка 8×8"
  ],
  [
    "push-gaming-olympus-unleashed",
    "Power-Up с тремя"
  ],
  [
    "push-gaming-power-paws",
    "Progression Meter"
  ],
  [
    "push-gaming-power-vault",
    "тремя барабанами"
  ],
  [
    "push-gaming-rat-king",
    "Collection Boxes"
  ],
  [
    "push-gaming-razor-returns",
    "Golden Shark"
  ],
  [
    "push-gaming-razor-shark-jackpots",
    "Shark Pot"
  ],
  [
    "push-gaming-razor-ways",
    "трёх активных рядах"
  ],
  [
    "push-gaming-red-hot-multipliers",
    "Hot Multiplier"
  ],
  [
    "push-gaming-regal-knights",
    "Golden Mystery"
  ],
  [
    "push-gaming-retro-sweets",
    "Wild Candy"
  ],
  [
    "push-gaming-retroverse",
    "Light Gun"
  ],
  [
    "push-gaming-samurais-katana",
    "Wild Stacks"
  ],
  [
    "push-gaming-santa-hopper",
    "дымоходов"
  ],
  [
    "push-gaming-santas-vault",
    "Vault Collector"
  ],
  [
    "push-gaming-sea-of-spirits",
    "Bronze Frames"
  ]
] as const;

test("wave 53 game-specific dossiers and original reviewed art", async ({ page }) => {
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
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), {timeout: 15_000}).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), {timeout: 15_000}).toBeGreaterThan(0);
  }
});
