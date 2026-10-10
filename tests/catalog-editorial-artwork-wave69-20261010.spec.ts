import { expect, test } from "@playwright/test";

const cases = [
  [
    "bgaming-3-lucky-monkeys-hold-and-win",
    "3 Lucky Monkeys Hold & Win",
    "3 Lucky Monkeys Hold & Win — слот 5×3, в котором"
  ],
  [
    "bgaming-bonanza-billion-merge-uptm",
    "Bonanza Billion Merge Up™+",
    "Bonanza Billion Merge Up™+ сочетает фруктовую се"
  ],
  [
    "bgaming-book-of-hidden-tombs",
    "Book of Hidden Tombs",
    "Book of Hidden Tombs переосмысливает египетский "
  ],
  [
    "bgaming-cats-love-yummy",
    "Cats Love Yummy",
    "Cats Love Yummy переносит игру в кошачье кафе, г"
  ],
  [
    "bgaming-chicken-fire",
    "Chicken Fire",
    "Chicken Fire — вертикальный фруктовый слот 3×3 с"
  ],
  [
    "bgaming-divine-queen-power-of-sun",
    "Divine Queen: Power of Sun",
    "Divine Queen: Power of Sun использует выплаты за"
  ],
  [
    "bgaming-dusty-duel",
    "Dusty Duel",
    "Dusty Duel переносит Pay Anywhere и Refilling на"
  ],
  [
    "bgaming-fortune-trio-minions-of-fu",
    "Fortune Trio: Minions Of Fu",
    "Fortune Trio: Minions Of Fu делит бонусную систе"
  ],
  [
    "bgaming-frenzy-clusters",
    "Frenzy Clusters",
    "Frenzy Clusters — кластерный слот, в котором выи"
  ],
  [
    "bgaming-fruit-million-respin",
    "Fruit Million Respin",
    "Fruit Million Respin оставляет сто линий фруктов"
  ],
  [
    "bgaming-johnny-vs-chicken",
    "Johnny vs Chicken",
    "Johnny vs Chicken сталкивает героев Wild West и "
  ],
  [
    "bgaming-miss-cherry-wild-frames",
    "Miss Cherry Wild Frames",
    "Miss Cherry Wild Frames устроен вокруг десятиспи"
  ],
  [
    "bgaming-money-maker",
    "Money Maker",
    "Money Maker — трёхбарабанный степпер всего с одн"
  ],
  [
    "bgaming-multi-rush",
    "Multi Rush",
    "Multi Rush использует кластеры и накопление Cell"
  ],
  [
    "bgaming-mystic-reels",
    "Mystic Reels",
    "Mystic Reels строится на двадцати линиях и систе"
  ],
  [
    "bgaming-red-hot-chilli-chickens",
    "Red Hot Chilli Chickens",
    "Red Hot Chilli Chickens объединяет три отдельные"
  ],
  [
    "bgaming-reel-of-ra",
    "Reel of Ra",
    "Reel of Ra использует 243 способа выигрыша и отд"
  ],
  [
    "bgaming-st-patricks-pots-hold-and-win",
    "St. Patrick's Pots Hold and Win",
    "St. Patrick's Pots Hold and Win постепенно заряж"
  ],
  [
    "bgaming-stars-and-stripes-hold-and-win",
    "Stars & Stripes Hold and Win",
    "Stars & Stripes Hold and Win сочетает Trueways, "
  ],
  [
    "bgaming-sweet-samurai",
    "Sweet Samurai",
    "Sweet Samurai — фруктовый слот с асимметричными "
  ]
] as const;

test("Wave 69: 20 BGaming dossiers have researched editorial and strict local artwork",async({page})=>{
for(const [slug,,phrase] of cases){
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
await expect(page.locator("#faq details").first()).toContainText("Что главное в механике");
const art=page.locator(".slot-figure .catalog-dossier-art");
await expect(art).toBeVisible();
await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
await expect(art).not.toHaveAttribute("src",/unavailable\\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}
});
