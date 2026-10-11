import { expect, test } from "@playwright/test";

const cases = [
  [
    "hacksaw-gaming-2-wild-2-die",
    "2 Wild 2 Die",
    "https://www.hacksawgaming.com/games/2-wild-2-die",
    "Три FS Scatter запускают Most Wanted! с тремя восс"
  ],
  [
    "hacksaw-gaming-3-cursed-chests-hold-and-win",
    "3 Cursed Chests: Hold & Win",
    "https://www.hacksawgaming.com/games/3-cursed-chests%3A-hold-%26-win",
    "Green Chest открывает Cursed Wilds Respin; Red Che"
  ],
  [
    "hacksaw-gaming-aiko-and-the-wind-spirit",
    "Aiko and the Wind Spirit",
    "https://www.hacksawgaming.com/games/aiko-and-the-wind-spirit",
    "Zephyr Crest рядом с Expanded Wild Spirit даёт Res"
  ],
  [
    "hacksaw-gaming-arizona-james-and-the-lost-relics",
    "Arizona James and The Lost Relics",
    "https://www.hacksawgaming.com/games/arizona-james-and-the-lost-relics",
    "Reload возвращает каждому Pistol Cylinder от двух "
  ],
  [
    "hacksaw-gaming-army-of-ares",
    "Army of Ares",
    "https://www.hacksawgaming.com/games/army-of-ares",
    "Три FS запускают десять Free Spins: в каждом гаран"
  ],
  [
    "hacksaw-gaming-bash-bros",
    "Bash Bros",
    "https://www.hacksawgaming.com/games/bash-bros",
    "Oskar может удалить символы с барабана и заменить "
  ],
  [
    "hacksaw-gaming-beam-boys",
    "Beam Boys",
    "https://www.hacksawgaming.com/games/beam-boys",
    "Переключатель позволяет выбирать Low или Extreme v"
  ],
  [
    "hacksaw-gaming-beast-below",
    "Beast Below",
    "https://www.hacksawgaming.com/games/beast-below",
    "Три FS дают десять Sirens’ Call Spins. Pink Sirens"
  ],
  [
    "hacksaw-gaming-benny-the-beer",
    "Benny the Beer",
    "https://www.hacksawgaming.com/games/benny-the-beer",
    "В десяти Free Spins выбираются два Special Symbols"
  ],
  [
    "hacksaw-gaming-booze-bash",
    "Booze Bash",
    "https://www.hacksawgaming.com/games/booze-bash",
    "Половины x и числа создают Global Multiplier до x2"
  ],
  [
    "hacksaw-gaming-bouncy-bombs",
    "Bouncy Bombs",
    "https://www.hacksawgaming.com/games/bouncy-bombs",
    "Normal Bomb сразу показывает x2–x4, Revealing Bomb"
  ],
  [
    "hacksaw-gaming-bullets-and-bounty",
    "Bullets and Bounty",
    "https://www.hacksawgaming.com/games/Bullets-and-bounty",
    "Три FS ведут к выбору True Grit или Gamble. В True"
  ],
  [
    "hacksaw-gaming-cash-crew",
    "Cash Crew",
    "https://www.hacksawgaming.com/games/cash-crew",
    "Три FS запускают шесть Spins: каждая клетка с выпа"
  ],
  [
    "hacksaw-gaming-chaos-crew-3",
    "Chaos Crew 3",
    "https://www.hacksawgaming.com/games/chaos-crew-3",
    "Три FS запускают бонус с тремя refilling lives. Но"
  ],
  [
    "hacksaw-gaming-circle-of-life",
    "Circle of Life",
    "https://www.hacksawgaming.com/games/circle-of-life",
    "Полностью выросшее дерево активирует колесо с addi"
  ],
  [
    "hacksaw-gaming-cloud-princess",
    "Cloud Princess",
    "https://www.hacksawgaming.com/games/cloud-princess",
    "Normal увеличивается на +1 при каскаде, Super на +"
  ],
  [
    "hacksaw-gaming-cursed-crypt",
    "Cursed Crypt",
    "https://www.hacksawgaming.com/games/cursed-crypt",
    "Три FS дают десять Spins с повышенной вероятностью"
  ],
  [
    "hacksaw-gaming-dandy-diamonds",
    "Dandy Diamonds",
    "https://www.hacksawgaming.com/games/dandy-diamonds",
    "Группа Diamonds квадратом 2×2 или больше объединяе"
  ],
  [
    "hacksaw-gaming-danny-dollar",
    "Danny Dollar",
    "https://www.hacksawgaming.com/games/danny-dollar",
    "Nudge Symbol сдвигает расширившийся Dollar-Reel на"
  ],
  [
    "hacksaw-gaming-dark-spiral",
    "Dark Spiral",
    "https://www.hacksawgaming.com/games/dark-spiral",
    "Wild непосредственно выше либо ниже Summoning Symb"
  ]
] as const;

test("Wave 81: 20 published Hacksaw dossiers have distinct first-party features and verified art", async ({ page }) => {
  for (const [slug, name, source, phrase] of cases) {
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
    expect(bodies.every(x => x.trim().length >= 70)).toBeTruthy();
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
