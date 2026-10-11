import { expect, test } from "@playwright/test";

const slug = "nolimit-city-six-feet-under";
const officialSource = "https://nolimitcity.com/games/six-feet-under";

test("Six Feet Under: four distinct mechanics grounded in Nolimit City's published rules", async ({ page }) => {
  await page.goto(`/slots/catalog/${slug}`);
  await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
  await expect(page.locator("h1")).toContainText("Six Feet Under");
  await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
  const section = page.locator("#functions");
  await expect(section.locator("h2")).toHaveText("Основные функции");
  const cards = section.locator(".dossier-feature-card");
  await expect(cards).toHaveCount(4);
  const titles = await cards.locator("h3").allTextContents();
  const descriptions = await cards.locator("p").allTextContents();
  expect(new Set(titles.map(x => x.trim())).size).toBe(4);
  expect(new Set(descriptions.map(x => x.trim())).size).toBe(4);
  expect(descriptions.every(x => x.trim().length >= 82)).toBeTruthy();
  for (const phrase of ["Cascading Reels", "Gasoline", "Toolbox", "The Descent"]) {
    await expect(section).toContainText(phrase);
  }
  await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
  await expect(page.locator("#facts a").filter({ hasText: "Официальный каталог игры" })).toHaveAttribute("href", officialSource);
  await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
  expect(await page.locator("#faq details").count()).toBeGreaterThan(0);
  const art = page.locator(".slot-figure .catalog-dossier-art");
  await expect(art).toBeVisible();
  await expect(art).toHaveAttribute("src", /\/images\/catalog\/nolimit-city-six-feet-under\.webp$/);
  await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  await art.scrollIntoViewIfNeeded();
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
  await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
});
