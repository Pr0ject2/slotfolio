import { expect, test } from "@playwright/test";

const cases = [
  {
    "old": "nolimit-city-bowel-of-beelzebub",
    "slug": "playn-go-reactoonz-100",
    "name": "Reactoonz 100",
    "source": "https://www.playngo.com/games/reactoonz-100",
    "phrase": "Заполнение отдельных Quantum Meters ставит в очередь",
    "featureCount": 4
  },
  {
    "old": "nolimit-city-fire-in-the-hole-4",
    "slug": "playn-go-rich-wilde-and-the-book-of-dead",
    "name": "Rich Wilde and the Book of Dead",
    "source": "https://www.playngo.com/games/rich-wilde-and-the-book-of-dead",
    "phrase": "Перед первым Free Spin случайно выбирается один обыч",
    "featureCount": 4
  },
  {
    "old": "playn-go-def-leppard-hysteria",
    "slug": "playn-go-rise-of-olympus-100",
    "name": "Rise of Olympus 100",
    "source": "https://www.playngo.com/games/rise-of-olympus-100",
    "phrase": "Заполненный charge meter запускает Hand of God. Hade",
    "featureCount": 3
  }
] as const;

test("Published replacement dossier: three verified Play'n GO games replace unreleased/undocumented seeds", async ({ page }) => {
 for (const { slug, name, source, phrase, featureCount } of cases) {
  await page.goto(`/slots/catalog/${slug}`);
  await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
  await expect(page.locator("h1")).toContainText(name);
  const section = page.locator("#functions");
  await expect(section.locator("h2")).toHaveText("Основные функции");
  const cards = section.locator(".dossier-feature-card");
  await expect(cards).toHaveCount(featureCount);
  const titles = await cards.locator("h3").allTextContents();
  const descriptions = await cards.locator("p").allTextContents();
  expect(new Set(titles.map(x => x.trim())).size).toBe(featureCount);
  expect(new Set(descriptions.map(x => x.trim())).size).toBe(featureCount);
  expect(descriptions.every(x => x.length >= 82)).toBeTruthy();
  await expect(section).toContainText(phrase);
  await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
  await expect(page.locator("#facts a").filter({ hasText: "Официальный каталог игры" })).toHaveAttribute("href", source);
  expect(await page.locator("#faq details").count()).toBeGreaterThan(0);
  const art = page.locator(".slot-figure .catalog-dossier-art");
  await expect(art).toBeVisible();
  await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
  await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  await art.scrollIntoViewIfNeeded();
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
 }
});
