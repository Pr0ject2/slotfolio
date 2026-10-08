import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-muerto-en-mictlan", "последовательность уровней"],
  ["playn-go-multifruit-81", "81 способом выигрыша"],
  ["playn-go-mystery-egg-surprise", "Три корзины со скаттерами"],
  ["playn-go-mystery-genie-fortunes-of-the-lamp", "Sand Rewind"],
  ["playn-go-mystery-joker", "три таких символа"],
  ["playn-go-mystery-joker-6000", "Super Meter"],
  ["playn-go-myth", "комбинация с Wild"],
  ["playn-go-myth-of-dead", "Coronation Path"],
  ["playn-go-naughty-nicks-book", "дополнительный шестой барабан"],
  ["playn-go-new-year-riches", "множителем x2"],
  ["playn-go-ninja-fruits", "Сюрикены на барабанах 3–5"],
  ["playn-go-nugget-n-nonsense", "Шесть монет"],
  ["playn-go-oasis-of-dead", "До пяти скаттеров"],
  ["playn-go-octopus-treasure", "ключ на третьем барабане"],
  ["playn-go-odin-protector-of-realms", "шестиугольную сетку из 37 позиций"],
  ["playn-go-pack-and-cash", "1024 способа выигрыша"],
  ["playn-go-pandastic-adventure", "путешествия к храму"],
  ["playn-go-pandoras-box-of-evil", "Mystery Symbol"],
  ["playn-go-pearl-lagoon", "двойном размере"],
  ["playn-go-pearls-of-india", "два независимых скаттера"]
] as const;

test("wave 48 Play'n GO cards render full game-specific dossiers and loaded artwork", async ({ page }) => {
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
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
