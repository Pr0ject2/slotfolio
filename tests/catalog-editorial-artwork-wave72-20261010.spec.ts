import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-boat-bonanza-croconile",
    "Boat Bonanza CrocoNile!",
    "До двух лодок участвуют в Catch Featu"
  ],
  [
    "playn-go-boat-bonanza-down-under",
    "Boat Bonanza Down Under",
    "На поле 5×4 три и более Scatter запус"
  ],
  [
    "playn-go-book-of-dead-go-collect",
    "Book of Dead GO Collect",
    "Три и более Tomb Scatter запускают 10"
  ],
  [
    "playn-go-bubblin-riches",
    "Bubblin' Riches",
    "Шесть Coin Scatter запускают Lock’n G"
  ],
  [
    "playn-go-buildin-bucks",
    "Buildin' Bucks",
    "Специальный Scatter на среднем reel з"
  ],
  [
    "playn-go-buildin-even-more-bucks",
    "Buildin' Even More Bucks",
    "Два Scatter Symbols дают шанс изменит"
  ],
  [
    "playn-go-buildin-more-bucks",
    "Buildin' More Bucks",
    "Double Wheel предлагает Character Fea"
  ],
  [
    "playn-go-bull-in-a-china-shop",
    "Bull in a China Shop",
    "Benny the Bull работает как Wild и пр"
  ],
  [
    "playn-go-bull-in-a-rodeo",
    "Bull in a Rodeo",
    "На поле 5×5 Benny снова меняет механи"
  ],
  [
    "playn-go-bullion-xpress",
    "Bullion Xpress",
    "M-Counter собирает multipliers с симв"
  ],
  [
    "playn-go-candy-island-princess",
    "Candy Island Princess",
    "Три одинаковых Contestant symbols на "
  ],
  [
    "playn-go-canine-carnage",
    "Canine Carnage",
    "Три Scatter запускают Free Spins и от"
  ],
  [
    "playn-go-captain-glum-pirate-hunter",
    "Captain Glum: Pirate Hunter",
    "Ship Wilds двигаются по reels на кажд"
  ],
  [
    "playn-go-captain-xenos-earth-adventure",
    "Captain Xeno's Earth Adventure",
    "Игра использует Dynamic Payways: symb"
  ],
  [
    "playn-go-cash-of-command",
    "Cash of Command",
    "Cash of Command — grid slot с cascadi"
  ],
  [
    "playn-go-cash-pump",
    "Cash Pump",
    "Cash Pump использует четыре отдельных"
  ],
  [
    "playn-go-cash-vandal",
    "Cash Vandal",
    "Базовая игра использует четыре reels."
  ],
  [
    "playn-go-cash-a-cabana",
    "Cash-a-Cabana",
    "Copa Girls работают как Expanding Wil"
  ],
  [
    "playn-go-cashin-joker",
    "Cashin' Joker",
    "Вместо обычных paylines на reels выпа"
  ],
  [
    "playn-go-cat-wilde-and-the-doom-of-dead",
    "Cat Wilde and the Doom of Dead",
    "Expanding Wilds могут выпасть на любо"
  ]
] as const;
test("Wave 72: 20 Play’n GO source-backed dossiers and artwork",async({page})=>{for(const [slug,,phrase] of cases){
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
const art=page.locator(".slot-figure .catalog-dossier-art");
await expect(art).toBeVisible();
await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
await expect(art).not.toHaveAttribute("src",/unavailable\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}});