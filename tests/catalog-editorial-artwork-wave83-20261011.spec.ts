import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-feel-the-beat",
    "name": "Feel the Beat",
    "source": "https://www.hacksawgaming.com/games/feel-the-beat",
    "phrase": "При наличии выигрыша X Symbol раскрывает множите"
  },
  {
    "slug": "hacksaw-gaming-fighter-pit",
    "name": "Fighter Pit",
    "source": "https://www.hacksawgaming.com/games/fighter-pit",
    "phrase": "Три FS открывают десять Showdown Free Spins. За "
  },
  {
    "slug": "hacksaw-gaming-fire-my-laser",
    "name": "Fire my Laser",
    "source": "https://www.hacksawgaming.com/games/fire-my-laser",
    "phrase": "Защитные Shields требуют нескольких попаданий, н"
  },
  {
    "slug": "hacksaw-gaming-fist-of-destruction",
    "name": "Fist of Destruction",
    "source": "https://www.hacksawgaming.com/games/fist-of-destruction",
    "phrase": "Три FS дают десять Throwdown Spins. Удары принос"
  },
  {
    "slug": "hacksaw-gaming-freds-food-truck",
    "name": "Freds Food Truck",
    "source": "https://www.hacksawgaming.com/games/freds-food-truck",
    "phrase": "Число Chili на символе определяет доступные множ"
  },
  {
    "slug": "hacksaw-gaming-frkn-bananas",
    "name": "FRKN Bananas",
    "source": "https://www.hacksawgaming.com/games/frkn-bananas",
    "phrase": "Три FS запускают десять BANANZA Spins: здесь чащ"
  },
  {
    "slug": "hacksaw-gaming-get-the-cheese",
    "name": "Get the CHEESE",
    "source": "https://www.hacksawgaming.com/games/get-the-cheese",
    "phrase": "После каскада Wild перескакивает на новую клетку"
  },
  {
    "slug": "hacksaw-gaming-great-game-rockies",
    "name": "Great Game Rockies",
    "source": "https://www.hacksawgaming.com/games/great-game-rockies",
    "phrase": "Trap собирает значения всех Coins и других Traps"
  },
  {
    "slug": "hacksaw-gaming-grug-make-fire",
    "name": "Grug Make Fire",
    "source": "https://www.hacksawgaming.com/games/grug-make-fire",
    "phrase": "FS Symbols несут число будущих вращений, и при з"
  },
  {
    "slug": "hacksaw-gaming-hot-ross",
    "name": "Hot Ross",
    "source": "https://www.hacksawgaming.com/games/hot-ross",
    "phrase": "возникает множитель для всех выигрышей с новым Wild Reel"
  },
  {
    "slug": "hacksaw-gaming-hounds-of-hell",
    "name": "Hounds of Hell",
    "source": "https://www.hacksawgaming.com/games/hounds-of-hell",
    "phrase": "Горизонтально соседние Hellhounds образуют Roari"
  },
  {
    "slug": "hacksaw-gaming-immortal-desire",
    "name": "Immortal Desire",
    "source": "https://www.hacksawgaming.com/games/immortal-desire",
    "phrase": "Blood Moon начинается с десяти Free Spins: появи"
  },
  {
    "slug": "hacksaw-gaming-invictus",
    "name": "Invictus",
    "source": "https://www.hacksawgaming.com/games/invictus",
    "phrase": "Когда выигрывают high-paying или Wild Symbols, о"
  },
  {
    "slug": "hacksaw-gaming-jaws-of-justice",
    "name": "Jaws of Justice",
    "source": "https://www.hacksawgaming.com/games/jaws-of-justice",
    "phrase": "Три Force Fields по краям поля отражают луч и пр"
  },
  {
    "slug": "hacksaw-gaming-jelly-slice",
    "name": "Jelly Slice",
    "source": "https://www.hacksawgaming.com/games/jelly-slice",
    "phrase": "Каждая получившаяся часть учитывается как отдель"
  },
  {
    "slug": "hacksaw-gaming-keepem",
    "name": "Keep'em",
    "source": "https://www.hacksawgaming.com/games/keep-em",
    "phrase": "На барабанах 3 и 4 появление Cash, FS либо GET’E"
  },
  {
    "slug": "hacksaw-gaming-klowns",
    "name": "Klowns",
    "source": "https://www.hacksawgaming.com/games/klowns",
    "phrase": "После выигрышного спина Adding Klown прибавляет "
  },
  {
    "slug": "hacksaw-gaming-le-bunny",
    "name": "Le Bunny",
    "source": "https://www.hacksawgaming.com/games/le-bunny",
    "phrase": "Выигравшие клетки подсвечиваются как Golden Squa"
  },
  {
    "slug": "hacksaw-gaming-le-cowboy",
    "name": "Le Cowboy",
    "source": "https://www.hacksawgaming.com/games/le-cowboy",
    "phrase": "Reload заново заряжает все цилиндры; повторный в"
  },
  {
    "slug": "hacksaw-gaming-le-digger",
    "name": "Le Digger",
    "source": "https://www.hacksawgaming.com/games/le-digger",
    "phrase": "На третьем Layer вместо обычных символов раскрыв"
  }
] as const;

test("Wave 83: published official Hacksaw dossiers and local artwork", async ({ page }) => {
  for (const { slug, name, source, phrase } of cases) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator("h1")).toContainText(name);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    const functions = page.locator("#functions");
    await expect(functions.locator("h2")).toHaveText("Основные функции");
    const cards = functions.locator(".dossier-feature-card");
    await expect(cards).toHaveCount(3);
    const titles = await cards.locator("h3").allTextContents();
    expect(new Set(titles.map(x => x.trim())).size).toBe(3);
    await expect(functions).toContainText(phrase);
    const bodies = await cards.locator("p").allTextContents();
    expect(bodies.every(x => x.trim().length >= 75)).toBeTruthy();
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
