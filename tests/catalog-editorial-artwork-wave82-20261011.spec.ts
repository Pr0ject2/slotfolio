import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-dark-summoning",
    "name": "Dark Summoning",
    "source": "https://www.hacksawgaming.com/games/dark-summoning",
    "phrase": "Три Unholy, собранные в одном базовом раунде, открыв"
  },
  {
    "slug": "hacksaw-gaming-dawn-of-kings",
    "name": "Dawn of Kings",
    "source": "https://www.hacksawgaming.com/games/dawn-of-kings",
    "phrase": "Три Book запускают десять Free Spins с одним выбранн"
  },
  {
    "slug": "hacksaw-gaming-deal-with-death",
    "name": "Deal With Death",
    "source": "https://www.hacksawgaming.com/games/deal-with-death",
    "phrase": "Обычный Joker заменяет карту наиболее выгодной для с"
  },
  {
    "slug": "hacksaw-gaming-densho",
    "name": "Densho",
    "source": "https://www.hacksawgaming.com/games/densho",
    "phrase": "В бонусе над каждым барабаном расположен собственный"
  },
  {
    "slug": "hacksaw-gaming-divine-drop",
    "name": "Divine Drop",
    "source": "https://www.hacksawgaming.com/games/divine-drop",
    "phrase": "Heart запускает Aphrodite’s Love и восстанавливает в"
  },
  {
    "slug": "hacksaw-gaming-donny-and-danny",
    "name": "Donny and Danny",
    "source": "https://www.hacksawgaming.com/games/donny-and-danny",
    "phrase": "Danny после расчёта обычных выигрышей расширяется вв"
  },
  {
    "slug": "hacksaw-gaming-donny-dough",
    "name": "Donny Dough",
    "source": "https://www.hacksawgaming.com/games/donny-dough",
    "phrase": "Три FS запускают десять вращений Sticky Dough. Multi"
  },
  {
    "slug": "hacksaw-gaming-donut-division",
    "name": "Donut Division",
    "source": "https://www.hacksawgaming.com/games/donut-division",
    "phrase": "В Warehouse вместо обычных символов скрыты множители"
  },
  {
    "slug": "hacksaw-gaming-dorks-of-the-deep",
    "name": "Dorks of the Deep",
    "source": "https://www.hacksawgaming.com/games/dorks-of-the-deep",
    "phrase": "В Deep Blue Treasure Chest расширяется независимо от"
  },
  {
    "slug": "hacksaw-gaming-dragons-domain",
    "name": "Dragon's Domain",
    "source": "https://www.hacksawgaming.com/games/dragons-domain",
    "phrase": "Когда каскады закончились, Dragon выжигает обычные с"
  },
  {
    "slug": "hacksaw-gaming-dropem",
    "name": "Drop'em",
    "source": "https://www.hacksawgaming.com/games/drop-em",
    "phrase": "Три FS открывают десять Drop Spins. Дополнительные F"
  },
  {
    "slug": "hacksaw-gaming-duel-at-dawn",
    "name": "Duel at Dawn",
    "source": "https://www.hacksawgaming.com/games/duel-at-dawn",
    "phrase": "Outlaw при появлении расширяется в отдельный Wild-ба"
  },
  {
    "slug": "hacksaw-gaming-dusk-princess",
    "name": "Dusk Princess",
    "source": "https://www.hacksawgaming.com/games/dusk-princess",
    "phrase": "Попадания в выигрыш наполняют Blessing Bar; полная ш"
  },
  {
    "slug": "hacksaw-gaming-dynasty-of-death",
    "name": "Dynasty of Death",
    "source": "https://www.hacksawgaming.com/games/dynasty-of-death",
    "phrase": "К одному из дуэлянтов может быть привязано отдельное"
  },
  {
    "slug": "hacksaw-gaming-epic-bullets-and-bounty",
    "name": "Epic Bullets and Bounty",
    "source": "https://www.hacksawgaming.com/games/epic-bullets-and-bounty",
    "phrase": "Три FS запускают True Grit с выбором между Gamble и "
  },
  {
    "slug": "hacksaw-gaming-epic-ze-zeus",
    "name": "Epic Ze Zeus",
    "source": "https://www.hacksawgaming.com/games/epic-ze-zeus",
    "phrase": "Zap of Zeus увеличивает значения монет и Vessel of W"
  },
  {
    "slug": "hacksaw-gaming-eternal-duel",
    "name": "Eternal Duel",
    "source": "https://www.hacksawgaming.com/games/eternal-duel",
    "phrase": "Три и более FS превращаются в FS DuelReels, на котор"
  },
  {
    "slug": "hacksaw-gaming-evil-eyes",
    "name": "Evil Eyes",
    "source": "https://www.hacksawgaming.com/games/evil-eyes",
    "phrase": "В Wicked Night глаз смотрит в разные стороны и собир"
  },
  {
    "slug": "hacksaw-gaming-eye-of-medusa",
    "name": "Eye of Medusa",
    "source": "https://www.hacksawgaming.com/games/eye-of-medusa",
    "phrase": "Победившие high-paying символы рядом с Medusa камене"
  },
  {
    "slug": "hacksaw-gaming-eye-of-the-panda",
    "name": "Eye of the Panda",
    "source": "https://www.hacksawgaming.com/games/eye-of-the-panda",
    "phrase": "В этом бонусе Wild Pandas без выигрыша уходят в Pand"
  }
] as const;

test("Wave 82: 20 published first-party Hacksaw dossiers preserve provenance and have three distinct features", async ({ page }) => {
  for (const { slug, name, source, phrase } of cases) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator("h1")).toContainText(name);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    const section = page.locator("#functions");
    await expect(section.locator("h2")).toHaveText("Основные функции");
    const cards = section.locator(".dossier-feature-card");
    await expect(cards).toHaveCount(3);
    const titles = await cards.locator("h3").allTextContents();
    expect(new Set(titles.map(x => x.trim())).size).toBe(3);
    await expect(section).toContainText(phrase);
    const descriptions = await cards.locator("p").allTextContents();
    expect(descriptions.every(x => x.trim().length >= 85)).toBeTruthy();
    await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
    await expect(page.locator("#facts a").filter({ hasText: "Официальный каталог игры" })).toHaveAttribute("href", source);
    await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");
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
