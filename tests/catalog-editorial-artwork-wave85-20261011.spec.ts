import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-pray-for-six",
    "name": "Pray for Six",
    "source": "https://www.hacksawgaming.com/games/pray-for-six",
    "phrase": " наличии выигрыша и в конце каскадов зап"
  },
  {
    "slug": "hacksaw-gaming-pray-for-three",
    "name": "Pray for Three",
    "source": "https://www.hacksawgaming.com/games/pray-for-three",
    "phrase": "раняются в Total Win Bar. Если Wheel of "
  },
  {
    "slug": "hacksaw-gaming-rainbow-princess",
    "name": "Rainbow Princess",
    "source": "https://www.hacksawgaming.com/games/rainbow-princess",
    "phrase": "грыше Magic Frame удваивает значение для"
  },
  {
    "slug": "hacksaw-gaming-red-rascal",
    "name": "Red Rascal",
    "source": "https://www.hacksawgaming.com/games/red-rascal",
    "phrase": "т режим исхода Respins: Coin Mode превра"
  },
  {
    "slug": "hacksaw-gaming-reign-of-rome",
    "name": "Reign of Rome",
    "source": "https://www.hacksawgaming.com/games/reign-of-rome",
    "phrase": "ath to Power Spins, в которых чаще выпад"
  },
  {
    "slug": "hacksaw-gaming-rise-of-fortuna",
    "name": "Rise of Fortuna",
    "source": "https://www.hacksawgaming.com/games/rise-of-fortuna",
    "phrase": "eels объединяются в Cash Prize Bar, вклю"
  },
  {
    "slug": "hacksaw-gaming-rise-of-ymir",
    "name": "Rise of Ymir",
    "source": "https://www.hacksawgaming.com/games/rise-of-ymir",
    "phrase": "ирает значения всех существующих Ymir на"
  },
  {
    "slug": "hacksaw-gaming-ronin-stackways",
    "name": "Ronin Stackways",
    "source": "https://www.hacksawgaming.com/games/ronin-stackways",
    "phrase": "ёт более высокие стэки — от пяти до деся"
  },
  {
    "slug": "hacksaw-gaming-rusty-and-curly",
    "name": "Rusty & Curly",
    "source": "https://www.hacksawgaming.com/games/rusty-and-curly",
    "phrase": "riff? Rusty и Curly расширяются в закреп"
  },
  {
    "slug": "hacksaw-gaming-sand-and-ashes",
    "name": "Sand and Ashes",
    "source": "https://www.hacksawgaming.com/games/sand-and-ashes",
    "phrase": "ы на один барабан влево, изменяя положен"
  },
  {
    "slug": "hacksaw-gaming-shaolin-master",
    "name": "Shaolin Master",
    "source": "https://www.hacksawgaming.com/games/shaolin-master",
    "phrase": "ют The Student с десятью либо двенадцать"
  },
  {
    "slug": "hacksaw-gaming-sixsixsix",
    "name": "SixSixSix",
    "source": "https://www.hacksawgaming.com/games/sixsixsix",
    "phrase": "шестёрка на колесе открывает десять Spea"
  },
  {
    "slug": "hacksaw-gaming-slayers-inc",
    "name": "Slayers Inc",
    "source": "https://www.hacksawgaming.com/games/slayers-inc",
    "phrase": "дения VS может активироваться Slicer и п"
  },
  {
    "slug": "hacksaw-gaming-smoking-dragon",
    "name": "Smoking Dragon",
    "source": "https://www.hacksawgaming.com/games/smoking-dragon",
    "phrase": "множитель при каждом Row Cascade, в кото"
  },
  {
    "slug": "hacksaw-gaming-snow-slingers",
    "name": "Snow Slingers",
    "source": "https://www.hacksawgaming.com/games/snow-slingers",
    "phrase": "-volvers стреляют не по обычным символам"
  },
  {
    "slug": "hacksaw-gaming-spear-of-athena",
    "name": "Spear of Athena",
    "source": "https://www.hacksawgaming.com/games/spear-of-athena",
    "phrase": "in присутствует Fortune Symbol, Flaming "
  },
  {
    "slug": "hacksaw-gaming-spinman",
    "name": "Spinman",
    "source": "https://www.hacksawgaming.com/games/spinman",
    "phrase": "eel колесо раскрывает один из доступных "
  },
  {
    "slug": "hacksaw-gaming-steamrunners",
    "name": "Steamrunners",
    "source": "https://www.hacksawgaming.com/games/steamrunners",
    "phrase": "ышном срабатывании превращает в Wilds вс"
  },
  {
    "slug": "hacksaw-gaming-stormborn",
    "name": "Stormborn",
    "source": "https://www.hacksawgaming.com/games/stormborn",
    "phrase": "значения всех видимых Coins. Собственный"
  },
  {
    "slug": "hacksaw-gaming-strength-of-hercules",
    "name": "Strength of Hercules",
    "source": "https://www.hacksawgaming.com/games/strength-of-hercules",
    "phrase": "дном барабане соединяются, заполняя пром"
  }
] as const;

test("Wave 85: twenty selected published Hacksaw dossiers preserve first-party source and reviewed artwork", async ({ page }) => {
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
    expect(descriptions.every(x => x.trim().length >= 82)).toBeTruthy();
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
