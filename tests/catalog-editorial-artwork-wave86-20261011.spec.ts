import { expect, test } from "@playwright/test";

const cases = [
  {
    "slug": "hacksaw-gaming-sun-princess",
    "name": "Sun Princess",
    "source": "https://www.hacksawgaming.com/games/sun-princess",
    "phrase": "Три FS запускают десять вращений Solaris Grove с"
  },
  {
    "slug": "hacksaw-gaming-superstar-sevens",
    "name": "Superstar Sevens",
    "source": "https://www.hacksawgaming.com/games/superstar-sevens",
    "phrase": "Три FS Scatter запускают десять бесплатных враще"
  },
  {
    "slug": "hacksaw-gaming-supreme-zeus",
    "name": "Supreme Zeus",
    "source": "https://www.hacksawgaming.com/games/supreme-zeus",
    "phrase": "Три FS запускают десять вращений Thunder Reign с"
  },
  {
    "slug": "hacksaw-gaming-tai-the-toad",
    "name": "Tai the Toad",
    "source": "https://www.hacksawgaming.com/games/tai-the-toad",
    "phrase": "Три FS запускают десять Free Spins. Dragon добав"
  },
  {
    "slug": "hacksaw-gaming-temple-of-torment",
    "name": "Temple of Torment",
    "source": "https://www.hacksawgaming.com/games/temple-of-torment",
    "phrase": "Три–пять соответствующих FS запускают Anguish of"
  },
  {
    "slug": "hacksaw-gaming-the-count",
    "name": "The Count",
    "source": "https://www.hacksawgaming.com/games/the-count",
    "phrase": "Три FS Scatter запускают Bat to the Bone: десять"
  },
  {
    "slug": "hacksaw-gaming-the-luxe",
    "name": "The Luxe",
    "source": "https://www.hacksawgaming.com/games/the-luxe",
    "phrase": "Три FS запускают Black and Gold на десять вращен"
  },
  {
    "slug": "hacksaw-gaming-the-wildwood-curse",
    "name": "The Wildwood Curse",
    "source": "https://www.hacksawgaming.com/games/the-wildwood-curse",
    "phrase": "Psycho Cluster меняет multiplier на каждом respi"
  },
  {
    "slug": "hacksaw-gaming-tiger-legends",
    "name": "Tiger Legends",
    "source": "https://www.hacksawgaming.com/games/tiger-legends",
    "phrase": "Три FS Scatter запускают десять бесплатных враще"
  },
  {
    "slug": "hacksaw-gaming-toshi-ways-club",
    "name": "Toshi Ways Club",
    "source": "https://www.hacksawgaming.com/games/toshi-ways-club",
    "phrase": "Три FS Scatter дают десять вращений Retro Reboot"
  },
  {
    "slug": "hacksaw-gaming-twisted-lab",
    "name": "Twisted Lab",
    "source": "https://www.hacksawgaming.com/games/twisted-lab",
    "phrase": "Три FS Scatter дают десять Free Spins Unleash th"
  },
  {
    "slug": "hacksaw-gaming-ultimate-slot-of-america",
    "name": "Ultimate Slot of America",
    "source": "https://www.hacksawgaming.com/games/ultimate-slot-of-america",
    "phrase": "Три FS запускают десять вращений Spin-dependence"
  },
  {
    "slug": "hacksaw-gaming-vending-machine",
    "name": "Vending Machine",
    "source": "https://www.hacksawgaming.com/games/vending-machine",
    "phrase": "Когда после остановки барабанов не образовалось "
  },
  {
    "slug": "hacksaw-gaming-wings-of-horus",
    "name": "Wings of Horus",
    "source": "https://www.hacksawgaming.com/games/wings-of-horus",
    "phrase": "Когда младшие символы составляют слово HORUS по "
  },
  {
    "slug": "hacksaw-gaming-wishbringer",
    "name": "Wishbringer",
    "source": "https://www.hacksawgaming.com/games/wishbringer",
    "phrase": "Три, четыре, пять и шесть FS Scatter запускают с"
  },
  {
    "slug": "hacksaw-gaming-xmas-drop",
    "name": "Xmas Drop",
    "source": "https://www.hacksawgaming.com/games/xmas-drop",
    "phrase": "Три FS Scatter запускают десять вращений Night B"
  },
  {
    "slug": "hacksaw-gaming-ze-zeus",
    "name": "Ze Zeus",
    "source": "https://www.hacksawgaming.com/games/ze-zeus",
    "phrase": "Три FS запускают бонус, где Divine Squares сохра"
  },
  {
    "slug": "hacksaw-gaming-zeus-ze-zecond",
    "name": "Zeus Ze Zecond",
    "source": "https://www.hacksawgaming.com/games/zeus-ze-zecond",
    "phrase": "В Gates of Hades все появившиеся Wonder Symbols "
  },
  {
    "slug": "bgaming-yokai",
    "name": "Yokai",
    "source": "https://bgaming.com/games/yokai",
    "phrase": "Перед Free Spins самурай открывает девять лун с "
  },
  {
    "slug": "bgaming-wincent-wolf",
    "name": "Wincent Wolf",
    "source": "https://bgaming.com/games/wincent-wolf",
    "phrase": "Wild Symbols на барабанах 2, 3 и 4 заменяют любы"
  }
] as const;

test("Wave 86: twenty selected published dossiers have distinct source-backed features and reviewed art", async ({ page }) => {
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
    await expect(art).not.toHaveAttribute("src", /unavailable\\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate(el => (el as HTMLImageElement).naturalHeight), { timeout: 15000 }).toBeGreaterThan(0);
  }
});
