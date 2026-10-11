import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-le-fisherman",
    "name": "Le Fisherman",
    "source": "https://www.hacksawgaming.com/games/le-fisherman",
    "phrase": "cket собирает Coins и ранее активированные сбо"
  },
  {
    "slug": "hacksaw-gaming-le-hooligan",
    "name": "Le Hooligan",
    "source": "https://www.hacksawgaming.com/games/le-hooligan",
    "phrase": "ускают восемь Luck of the Fan Spins. Отмеченны"
  },
  {
    "slug": "hacksaw-gaming-le-king",
    "name": "Le King",
    "source": "https://www.hacksawgaming.com/games/le-king",
    "phrase": "ot собирает значения всех видимых Coins и друг"
  },
  {
    "slug": "hacksaw-gaming-le-prechaun",
    "name": "Le Prechaun",
    "source": "https://www.hacksawgaming.com/games/le-prechaun",
    "phrase": "ld, вошедшего в выигрыш, получает множитель x2"
  },
  {
    "slug": "hacksaw-gaming-le-santa",
    "name": "Le Santa",
    "source": "https://www.hacksawgaming.com/games/le-santa",
    "phrase": "s собирают значения видимых Coins и других Sac"
  },
  {
    "slug": "hacksaw-gaming-le-sortudo",
    "name": "Le Sortudo",
    "source": "https://www.hacksawgaming.com/games/le-sortudo",
    "phrase": "ый Rainbow запускает режим Hold & Win с тремя "
  },
  {
    "slug": "hacksaw-gaming-le-viking",
    "name": "Le Viking",
    "source": "https://www.hacksawgaming.com/games/le-viking",
    "phrase": " Spins Coins и Diamonds раскрывают призовые зн"
  },
  {
    "slug": "hacksaw-gaming-le-zeus",
    "name": "Le Zeus",
    "source": "https://www.hacksawgaming.com/games/le-zeus",
    "phrase": "el переводит раскрытие в денежную фазу с Coins"
  },
  {
    "slug": "hacksaw-gaming-magic-piggy-og",
    "name": "Magic Piggy OG",
    "source": "https://www.hacksawgaming.com/games/magic-piggy-og",
    "phrase": "ся Bill Stacks дают значения, которые суммирую"
  },
  {
    "slug": "hacksaw-gaming-marlin-masters",
    "name": "Marlin Masters",
    "source": "https://www.hacksawgaming.com/games/marlin-masters",
    "phrase": "собирает все Marlin cash values на сетке и мож"
  },
  {
    "slug": "hacksaw-gaming-marlin-masters-atlantis",
    "name": "Marlin Masters Atlantis",
    "source": "https://www.hacksawgaming.com/games/marlin-masters-atlantis",
    "phrase": "захватывает обычные Marlin и Jackpot Marlin с "
  },
  {
    "slug": "hacksaw-gaming-marlin-masters-og",
    "name": "Marlin Masters OG",
    "source": "https://www.hacksawgaming.com/games/marlin-masters-og",
    "phrase": "получает значения всех Marlin на поле и примен"
  },
  {
    "slug": "hacksaw-gaming-marlin-masters-the-big-haul",
    "name": "Marlin Masters: The Big Haul",
    "source": "https://www.hacksawgaming.com/games/marlin-masters-the-big-haul",
    "phrase": "sherman собирает все Marlins с множителем до x"
  },
  {
    "slug": "hacksaw-gaming-mayan-stackways",
    "name": "Mayan Stackways",
    "source": "https://www.hacksawgaming.com/games/mayan-stackways",
    "phrase": "ins попадание специального символа активирует "
  },
  {
    "slug": "hacksaw-gaming-miami-mayhem",
    "name": "Miami Mayhem",
    "source": "https://www.hacksawgaming.com/games/miami-mayhem",
    "phrase": "ускает Mission с тремя Respins и Target Symbol"
  },
  {
    "slug": "hacksaw-gaming-mighty-masks",
    "name": "Mighty Masks",
    "source": "https://www.hacksawgaming.com/games/mighty-masks",
    "phrase": " запускает колесо, которое устанавливает глоба"
  },
  {
    "slug": "hacksaw-gaming-munchy-milo",
    "name": "Munchy Milo",
    "source": "https://www.hacksawgaming.com/games/munchy-milo",
    "phrase": " Jolt пересекает такой же символ, на нём может"
  },
  {
    "slug": "hacksaw-gaming-octo-attack",
    "name": "Octo Attack",
    "source": "https://www.hacksawgaming.com/games/octo-attack",
    "phrase": "o на поле с Ink Stains захватывает случайный с"
  },
  {
    "slug": "hacksaw-gaming-orb-of-destiny",
    "name": "Orb of Destiny",
    "source": "https://www.hacksawgaming.com/games/orb-of-destiny",
    "phrase": "вает число от одного до трёх и добавляет столь"
  },
  {
    "slug": "hacksaw-gaming-phoenix-duelreels",
    "name": "Phoenix DuelReels",
    "source": "https://www.hacksawgaming.com/games/phoenix-duelreels",
    "phrase": "бом DuelReel проиграл Phoenix, запускается Res"
  }
] as const;

test("Wave 84: twenty published first-party Hacksaw dossiers with distinct features and local art", async ({ page }) => {
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
    expect(descriptions.every(x => x.trim().length >= 75)).toBeTruthy();
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
