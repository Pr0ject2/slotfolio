import { expect, test } from "@playwright/test";

const cases = [
  [
    "playn-go-house-of-doom",
    "House of Doom",
    "https://www.playngo.com/games/house-of-doom",
    "Три House Scatter на барабанах 1, 3 и 5 запускают десят"
  ],
  [
    "playn-go-house-of-doom-2-the-crypt",
    "House of Doom 2: The Crypt",
    "https://www.playngo.com/games/house-of-doom-2%3A-the-crypt",
    "Fire Mistress добавляет множители x2, x3, x5 либо x10; "
  ],
  [
    "playn-go-hugo",
    "Hugo",
    "https://www.playngo.com/games/hugo",
    "Три и более Afskylia Scatter позволяют выбрать пять, де"
  ],
  [
    "playn-go-hugo-2",
    "Hugo 2",
    "https://www.playngo.com/games/hugo-2",
    "На железнодорожном пути bags и coins могут добавить ext"
  ],
  [
    "playn-go-hugo-carts",
    "Hugo Carts",
    "https://www.playngo.com/games/hugo-carts",
    "Три, четыре или пять Dynamite Scatter запускают соответ"
  ],
  [
    "playn-go-hugo-goal",
    "Hugo Goal",
    "https://www.playngo.com/games/hugo-goal",
    "Два одинаковых character symbols на невыигрышном вращен"
  ],
  [
    "playn-go-hugo-legacy",
    "Hugo Legacy",
    "https://www.playngo.com/games/hugo-legacy",
    "Персонажи могут добавить 5–8 Wilds, улучшить 2–5 младши"
  ],
  [
    "playn-go-hugos-adventure",
    "Hugo's Adventure",
    "https://www.playngo.com/games/hugo's-adventure",
    "Air Race даёт двадцать Free Spins и одну стартовую life"
  ],
  [
    "playn-go-ice-joker",
    "Ice Joker",
    "https://www.playngo.com/games/ice-joker",
    "Snowflakes на барабанах 1, 3 и 5 запускают Winter’s Whe"
  ],
  [
    "playn-go-idol-of-fortune",
    "Idol of Fortune",
    "https://www.playngo.com/games/idol-of-fortune",
    "В бонусе игрок выбирает сочетание количества Free Spins"
  ],
  [
    "playn-go-immortails-of-egypt",
    "ImmorTails of Egypt",
    "https://www.playngo.com/games/immortails-of-egypt",
    "Во Free Spins игровое поле расширяется с 5×3 до 5×4. До"
  ],
  [
    "playn-go-imperial-opera",
    "Imperial Opera",
    "https://www.playngo.com/games/imperial-opera",
    "Crescendo случайно превращает один–два барабана целиком"
  ],
  [
    "playn-go-infernal-trinity-go-guaranteed",
    "Infernal Trinity GO Guaranteed",
    "https://www.playngo.com/games/infernal-trinity-go-guaranteed",
    "Blue Phoenix расширяет барабаны, Red увеличивает значен"
  ],
  [
    "playn-go-inferno-joker",
    "Inferno Joker",
    "https://www.playngo.com/games/inferno-joker",
    "Во время бонуса Inferno Joker становится Scatter: бараб"
  ],
  [
    "playn-go-inferno-star",
    "Inferno Star",
    "https://www.playngo.com/games/inferno-star",
    "Новые Sun symbols становятся Raging Suns и удерживают с"
  ],
  [
    "playn-go-invading-vegas",
    "Invading Vegas",
    "https://www.playngo.com/games/invading-vegas",
    "Если барабаны 1 и 2 полностью заполнены одинаковыми сте"
  ],
  [
    "playn-go-invading-vegas-revenge-on-mars",
    "Invading Vegas Revenge on Mars",
    "https://www.playngo.com/games/invading-vegas-revenge-on-mars",
    "Двигающийся Wild оставляет после себя Mystery Symbols. "
  ],
  [
    "playn-go-invading-vegas-las-christmas",
    "Invading Vegas: Las Christmas",
    "https://www.playngo.com/games/invading-vegas%3A-las-christmas",
    "Три Scatter в базовой игре запускают двенадцать Free Sp"
  ],
  [
    "playn-go-irish-gold",
    "Irish Gold",
    "https://www.playngo.com/games/irish-gold",
    "Один Pot of Gold в выигрышной комбинации умножает её вы"
  ],
  [
    "playn-go-iron-girl",
    "Iron Girl",
    "https://www.playngo.com/games/iron-girl",
    "Восемь собранных Sticky Villains добавляют два Iron Gir"
  ]
] as const;

test("Wave 78: 20 published Play’n GO dossiers have three source-backed distinct features", async ({ page }) => {
  for (const [slug, name, source, phrase] of cases) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");
    await expect(page.locator("h1")).toContainText(name);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    const section = page.locator("#functions");
    await expect(section.locator("h2")).toHaveText("Основные функции");
    const cards = section.locator(".dossier-feature-card");
    await expect(cards).toHaveCount(3);
    const headings = await cards.locator("h3").allTextContents();
    expect(new Set(headings.map(x => x.trim())).size).toBe(3);
    await expect(section).toContainText(phrase);
    const bodies = await cards.locator("p").allTextContents();
    expect(bodies.every(x => x.trim().length > 65)).toBeTruthy();
    await expect(page.locator("#facts h2")).toHaveText("Факты и источники");
    await expect(page.locator('#facts a').filter({ hasText: "Официальный каталог игры" })).toHaveAttribute("href", source);
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
