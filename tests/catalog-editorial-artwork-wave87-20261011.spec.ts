import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "bgaming-alien-fruits-3",
    "name": "Alien Fruits 3",
    "source": "https://bgaming.com/games/alien-fruits-3",
    "phrase": "Метки в выигравших кластерах запускают п"
  },
  {
    "slug": "bgaming-train-heist-johnny-cash",
    "name": "Train Heist Johnny Cash",
    "source": "https://bgaming.com/games/train-heist-johnny-cash",
    "phrase": "Подсвеченные клетки могут раскрыть Coin "
  },
  {
    "slug": "endorphina-3-golden-chests",
    "name": "3 Golden Chests",
    "source": "https://endorphina.com/games/3-golden-chests/play",
    "phrase": "Красный Boost в Hold & Win прибавляет к "
  },
  {
    "slug": "endorphina-burning-coins-100",
    "name": "Burning Coins 100",
    "source": "https://endorphina.com/games/burning-coins-100/play",
    "phrase": "Синий Burning Coin открывает Hot Hold Co"
  },
  {
    "slug": "endorphina-burning-coins-20-dice",
    "name": "Burning Coins 20 Dice",
    "source": "https://endorphina.com/games/burning-coins-20-dice/play",
    "phrase": "Шесть или более Burning Dice запускают F"
  },
  {
    "slug": "endorphina-chance-machine-90s",
    "name": "Chance Machine 90s",
    "source": "https://endorphina.com/games/chance-machine-90s/play",
    "phrase": "Bonus Symbols появляются только на бараб"
  },
  {
    "slug": "endorphina-druids-fortune",
    "name": "Druids Fortune",
    "source": "https://endorphina.com/games/druids-fortune/play",
    "phrase": "В самостоятельном Heart of Harmony Bonus"
  },
  {
    "slug": "endorphina-fortune-bankers",
    "name": "Fortune Bankers",
    "source": "https://endorphina.com/games/fortune-bankers/play",
    "phrase": "Token Symbols закрывают позиции в основн"
  },
  {
    "slug": "endorphina-fortune-chests-dice",
    "name": "Fortune Chests Dice",
    "source": "https://endorphina.com/games/fortune-chests-dice/play",
    "phrase": "У двух из трёх Fortune Chests самостояте"
  },
  {
    "slug": "endorphina-gift-of-midas",
    "name": "Gift of Midas",
    "source": "https://endorphina.com/games/gift-of-midas/play",
    "phrase": "Token Symbols в базовой игре и Free Game"
  },
  {
    "slug": "endorphina-groovin-tiger",
    "name": "Groovin Tiger",
    "source": "https://endorphina.com/games/groovin-tiger/play",
    "phrase": "Над барабанами три разноцветные bucket h"
  },
  {
    "slug": "endorphina-hell-hot-1000",
    "name": "Hell Hot 1000",
    "source": "https://endorphina.com/games/hell-hot-1000/play",
    "phrase": "Wild может выпадать стопкой в основной и"
  },
  {
    "slug": "endorphina-moofo",
    "name": "MooFo",
    "source": "https://endorphina.com/games/moofo/play",
    "phrase": "Зелёные, красные и фиолетовые Cow Tokens"
  },
  {
    "slug": "endorphina-zalatar",
    "name": "Zalatar",
    "source": "https://endorphina.com/games/zalatar/play",
    "phrase": "Три независимые Pile-аккумулятора открыв"
  },
  {
    "slug": "nolimit-city-ding-dong-death",
    "name": "Ding Dong Death",
    "source": "https://nolimitcity.com/games/ding-dong-death",
    "phrase": "Каждая третья avalanche открывает очеред"
  },
  {
    "slug": "nolimit-city-duck-hunters-2",
    "name": "Duck Hunters 2",
    "source": "https://nolimitcity.com/games/duck-hunters-2",
    "phrase": "Выигрыш за восемь и более одинаковых сим"
  },
  {
    "slug": "nolimit-city-gator-hunters-2",
    "name": "Gator Hunters 2",
    "source": "https://nolimitcity.com/games/gator-hunters-2",
    "phrase": "Перед вращением случайная Fire Zone разм"
  },
  {
    "slug": "hacksaw-gaming-death-becomes-you",
    "name": "Death Becomes You",
    "source": "https://www.hacksawgaming.com/games/death-becomes-you",
    "phrase": "Выигрышный VS Symbol расширяется в Wild "
  },
  {
    "slug": "hacksaw-gaming-le-football-fan",
    "name": "Le Football Fan",
    "source": "https://www.hacksawgaming.com/games/le-football-fan",
    "phrase": "Выигрыш формирует Marked Squares. Rainbo"
  },
  {
    "slug": "hacksaw-gaming-le-pharaoh",
    "name": "Le Pharaoh",
    "source": "https://www.hacksawgaming.com/games/le-pharaoh",
    "phrase": "После Sticky Re-drops Rainbow активирует"
  }
] as const;

test("Wave 87: twenty selected first-party dossiers have 3 distinct features and local artwork", async ({ page }) => {
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
  const descriptions = await cards.locator("p").allTextContents();
  expect(new Set(titles.map(x => x.trim())).size).toBe(3);
  expect(new Set(descriptions.map(x => x.trim())).size).toBe(3);
  expect(descriptions.every(x => x.trim().length >= 82)).toBeTruthy();
  await expect(section).toContainText(phrase);
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
