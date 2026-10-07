import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-merlin-realm-of-charm", "риск-игра с картами"],
  ["playn-go-merlin-journey-of-flame", "шестой барабан"],
  ["playn-go-merlins-grimoire", "до всех пяти барабанов"],
  ["playn-go-mermaids-diamond", "720 способов выигрыша"],
  ["playn-go-merry-xmas", "два новых Wild"],
  ["playn-go-midnight-gold", "символа доставки"],
  ["playn-go-miner-donkey-trouble", "Золотые самородки"],
  ["playn-go-mirror-joker", "зеркальный респин"],
  ["playn-go-mission-cash", "движущийся прицел"],
  ["playn-go-monkey-battle-for-the-scrolls", "четыре персонажа"],
  ["playn-go-moon-princess", "Love, Star и Storm"],
  ["playn-go-moon-princess-100", "достигать 100"],
  ["playn-go-moon-princess-extreme", "множитель растёт"],
  ["playn-go-moon-princess-origins", "усиленные состояния принцесс"],
  ["playn-go-moon-princess-power-of-love", "шкалу любви"],
  ["playn-go-moon-princess-stargazing", "подсвечивает от трёх до десяти позиций"],
  ["playn-go-moon-princess-trinity", "Полная очистка поля"],
  ["playn-go-moon-princess-christmas-kingdom", "праздничное поле 5×5"],
  ["playn-go-motley-crue", "пентаграмме"],
  ["playn-go-mount-m", "пять собранных орбов"]
] as const;

test("wave 47 Play'n GO cards render full game-specific dossiers and loaded artwork", async ({ page }) => {
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
