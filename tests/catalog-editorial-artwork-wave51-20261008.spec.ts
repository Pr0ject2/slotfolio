import { expect, test } from "@playwright/test";
const slots = [
  [
    "push-gaming-big-bite",
    "двух касаток"
  ],
  [
    "push-gaming-big-bite-push-ways",
    "шесть барабанов"
  ],
  [
    "push-gaming-bison-battle",
    "красных бизонов"
  ],
  [
    "push-gaming-blaze-of-ra",
    "40 линий"
  ],
  [
    "push-gaming-boss-bear",
    "Reveal Symbols"
  ],
  [
    "push-gaming-candy-blast",
    "Total Multiplier Meter"
  ],
  [
    "push-gaming-cats-of-olympuss",
    "Progressive Free Spins"
  ],
  [
    "push-gaming-crystal-catcher",
    "Wild Beetle"
  ],
  [
    "push-gaming-deadly-5",
    "Sheriff Badge"
  ],
  [
    "push-gaming-diamond-supernova-100",
    "100 линиями"
  ],
  [
    "push-gaming-diamond-supernova-20",
    "20 линий"
  ],
  [
    "push-gaming-diamond-supernova-40",
    "40 линий"
  ],
  [
    "push-gaming-diamond-supernova-5",
    "пять линий"
  ],
  [
    "push-gaming-diamonds-4-the-win",
    "Diamond Respin"
  ],
  [
    "push-gaming-dino-p-d",
    "пять любых монет"
  ],
  [
    "push-gaming-dinopolis",
    "3-4-4-4-3"
  ],
  [
    "push-gaming-dj-cat",
    "CD Symbols"
  ],
  [
    "push-gaming-dj-fox",
    "Vinyl Symbols"
  ],
  [
    "push-gaming-dragon-hopper",
    "Wild Dragon"
  ],
  [
    "push-gaming-fang-city",
    "семь Moon Symbols"
  ]
] as const;

test("wave 51 complete reviewed Push Gaming dossiers and real artwork", async ({ page }) => {
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
