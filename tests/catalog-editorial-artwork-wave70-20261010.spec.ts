import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-nsync-pop",
    "*NSYNC Pop",
    "Базовая сетка имеет форму 2-3-4-3-2. О"
  ],
  [
    "playn-go-1001-mystery-genie-fortunes",
    "1001 Mystery Genie Fortunes",
    "Mystery Symbols могут раскрыть обычные"
  ],
  [
    "playn-go-13th-trial-hercules-abyssways",
    "13th Trial Hercules Abyssways",
    "Will of Zeus может превратить участвую"
  ],
  [
    "playn-go-15-crystal-roses-a-tale-of-love",
    "15 Crystal Roses: A Tale of Love",
    "Crystal Rose работает как Scatter и от"
  ],
  [
    "playn-go-24k-dragon",
    "24k Dragon",
    "Базовая игра использует 1024 ways. Gol"
  ],
  [
    "playn-go-3-blades-and-blessings",
    "3 Blades & Blessings",
    "Green, Purple и Red Coins визуально со"
  ],
  [
    "playn-go-3-clown-monty",
    "3 Clown Monty",
    "Когда Multiplier Meter активен, Wilds "
  ],
  [
    "playn-go-3-clown-monty-ii",
    "3 Clown Monty II",
    "В базовой игре Wilds могут случайно по"
  ],
  [
    "playn-go-5x-magic",
    "5x Magic",
    "5x symbol является Wild и заменяет обы"
  ],
  [
    "playn-go-7-sins",
    "7 Sins",
    "Lucky 7 Wild появляется на барабанах 1"
  ],
  [
    "playn-go-ace-of-spades",
    "Ace of Spades",
    "Ace of Spades — классический трёхбараб"
  ],
  [
    "playn-go-agent-destiny",
    "Agent Destiny",
    "Linked Reels могут активироваться на л"
  ],
  [
    "playn-go-agent-of-hearts",
    "Agent of Hearts",
    "Выигрыши формируются cluster-ами от пя"
  ],
  [
    "playn-go-alice-cooper-and-the-tome-of-madness",
    "Alice Cooper and the Tome of Madness",
    "Выигрыш создаётся cluster-ом из четырё"
  ],
  [
    "playn-go-animal-madness",
    "Animal Madness",
    "На сетке 5x5 выигрыши образуют cluster"
  ],
  [
    "playn-go-ankh-of-anubis",
    "Ankh of Anubis",
    "Anubis Wilds может случайно активирова"
  ],
  [
    "playn-go-ankh-of-anubis-awakening",
    "Ankh of Anubis Awakening",
    "Anubis Wilds снова может случайно доба"
  ],
  [
    "playn-go-annihilator",
    "Annihilator",
    "В базовой игре случайная feature расши"
  ],
  [
    "playn-go-athena-ascending",
    "Athena Ascending",
    "Три Owl Scatter запускают Free Spins. "
  ],
  [
    "playn-go-aztec-idols",
    "Aztec Idols",
    "Три Pyramid Bonus symbols запускают Pi"
  ]
] as const;
test("Wave 70: twenty Play’n GO dossiers and localized artwork",async({page})=>{for(const [slug,,phrase] of cases){
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
