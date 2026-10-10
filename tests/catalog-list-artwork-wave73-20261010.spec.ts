import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-cat-wilde-and-the-incan-quest",
    "Cat Wilde and the Incan Quest",
    "Wild на одном из трёх центральных reels с каждым re-spin опускается на позицию ниже."
  ],
  [
    "playn-go-cat-wilde-and-the-lost-chapter",
    "Cat Wilde and the Lost Chapter",
    "Отдельный Free Spins режим Pyramid Spins использует случайно выбранный symbol на каждом spin."
  ],
  [
    "playn-go-cat-wilde-and-the-pyramids-of-dead",
    "Cat Wilde and the Pyramids of Dead",
    "В бонусе нужно открывать урны, пока не совпадут три spirit из двенадцати урн."
  ],
  [
    "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god",
    "Cat Wilde in the Eclipse of the Sun God",
    "Выигравшие символы удаляются и заменяются новыми в рамках одной цепочки."
  ],
  [
    "playn-go-cats-and-cash",
    "Cats and Cash",
    "Комбинация с Wild платит вдвое, кроме случаев со специальными gold fish, Wheel или Box."
  ],
  [
    "playn-go-chambers-of-ancients",
    "Chambers of Ancients",
    "Три одинаковых Key открывают связанную Chamber и её Hold and Spin."
  ],
  [
    "playn-go-champions-of-mithrune",
    "Champions of Mithrune",
    "Syn меняет high-paying symbols; Gorm, Silvana и Olc создают Wild-эффекты, а Anastina формирует cluster."
  ],
  [
    "playn-go-charlie-chance",
    "Charlie Chance",
    "Выигрыш с Wild подсвечивает reel; горизонтальный reel назначает multiplier всем wins через него."
  ],
  [
    "playn-go-charlie-chance-and-the-curse-of-cleopatra",
    "Charlie Chance and the Curse of Cleopatra",
    "Кластеры на сетке 6×6 участвуют в cascades, а synchronised reels помогают создавать крупные группы."
  ],
  [
    "playn-go-charlie-chance-in-hell-to-pay",
    "Charlie Chance in Hell to Pay",
    "Есть обычный Wild, x2 Multiplier Wild и x3 Multiplier Wild."
  ],
  [
    "playn-go-chinese-new-year",
    "Chinese New Year",
    "Tiger заменяет обычные symbols, но не Monkey и Dragon."
  ],
  [
    "playn-go-chronos-joker",
    "Chronos Joker",
    "Joker заменяет символы и может запустить multipliers x2, x4, x5 или x10."
  ],
  [
    "playn-go-city-of-sound",
    "City of Sound",
    "Шесть Gold Records активируют lock-режим с обновлением счётчика при новом Record."
  ],
  [
    "playn-go-clash-of-camelot",
    "Clash of Camelot",
    "Оба персонажа работают как Wild и могут расшириться на нужном reel."
  ],
  [
    "playn-go-cloud-quest",
    "Cloud Quest",
    "Перед раундом назначается строка; очистка пяти её ячеек открывает Bonus Round."
  ],
  [
    "playn-go-coils-of-cash",
    "Coils of Cash",
    "Шесть вертикальных reels дополнены горизонтальным Power Coil, всего 2304 Dynamic Payways."
  ],
  [
    "playn-go-colt-lightning",
    "Colt Lightning",
    "Эффект Colt Strike добавляет на reels новые Colt symbols."
  ],
  [
    "playn-go-colt-lightning-firestorm",
    "Colt Lightning Firestorm",
    "Horseshoe на третьем reel создаёт 3–20 Fire Frames и переводит symbols в high-paying variants."
  ],
  [
    "playn-go-colt-lightning-inferno",
    "Colt Lightning Inferno",
    "Horseshoe на третьем reel создаёт от 3 до 20 Fire Frames."
  ],
  [
    "playn-go-contact",
    "Contact",
    "Выигравшие clusters остаются; исчезают невыигравшие symbols."
  ]
] as const;
test("Wave 73: 20 Play’n GO /slots artworks",async({page})=>{for(const [slug,name] of cases){
await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
const card=page.locator(`[data-slot="${slug}"]`);
await expect(card).toBeVisible();
const art=card.locator(".catalog-game-art .game-image");
await expect(art).toBeVisible();
await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));
await expect(art).not.toHaveAttribute("src",/unavailable\.svg/);
await art.scrollIntoViewIfNeeded();
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);
}});
