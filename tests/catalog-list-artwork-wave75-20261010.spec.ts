import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-eye-of-atum",
    "Eye of Atum",
    "Atum работает как Wild и на reels 2–4 расширяется на весь reel."
  ],
  [
    "playn-go-eye-of-the-kraken",
    "Eye of the Kraken",
    "На случайном spin Kraken может обхватить reels щупальцами и оставить после себя Wilds."
  ],
  [
    "playn-go-fangs-and-fire",
    "Fangs & Fire",
    "Link’n GO Golden Gongs активируются, когда два или больше Gongs лежат непрерывной горизонтальной линией: каждый Gong раскрывает number или arrow, а соседние Gongs объединяют свои значения и сразу выплачивают reward."
  ],
  [
    "playn-go-fat-frankies",
    "Fat Frankies",
    "Play’n GO описывает четыре отдельные bonus features."
  ],
  [
    "playn-go-fate-of-dead-blitzways",
    "Fate of Dead Blitzways",
    "Blitzways Dynamic Reels меняют высоту каждого reel от 2 до 7 symbols и дают до 16 807 ways to win."
  ],
  [
    "playn-go-fates-fortune",
    "Fate's Fortune",
    "Каждый Ulysses symbol в базе пополняет shield counter."
  ],
  [
    "playn-go-feline-fury",
    "Feline Fury",
    "Feline Wilds случайно активируются в base game и превращают один или несколько cat symbols в Wilds на текущий spin."
  ],
  [
    "playn-go-fire-joker-100",
    "Fire Joker 100",
    "Re-Spin of Fire запускается, если два reels полностью заняты одинаковым stacked symbol, но win не получен: эти stacks фиксируются, а третий reel получает повторный spin."
  ],
  [
    "playn-go-fire-joker-blitz",
    "Fire Joker Blitz",
    "Coin Scatters несут multiplier-values, а Pig Collect symbol собирает их при совместном выпадении."
  ],
  [
    "playn-go-fire-joker-freeze",
    "Fire Joker Freeze",
    "Ice Joker на проигрышном spin запускает Re-Spins of Ice: Joker фиксируется, превращается в stack на весь reel, после чего остальные reels переигрываются."
  ],
  [
    "playn-go-fire-toad",
    "Fire Toad",
    "Firefly Scatter одновременно работает как Wild."
  ],
  [
    "playn-go-fire-toad-2",
    "Fire Toad 2",
    "Fire Toad 2 сохраняет Toad Upgrade, но развивает его отдельно от первой части: ровно два Scatter в base game повышают все более слабые Toad symbols до выбранной формы."
  ],
  [
    "playn-go-firefly-frenzy",
    "Firefly Frenzy",
    "Firefly Wilds заменяют обычные symbols и могут нести multiplier x2 или x3."
  ],
  [
    "playn-go-forge-of-fortunes",
    "Forge of Fortunes",
    "Forge of Fortunes использует необычное поле 3×1."
  ],
  [
    "playn-go-forge-of-gems",
    "Forge of Gems",
    "Forge of Gems использует 5×3 grid с отдельным Forge Reel над основной сеткой."
  ],
  [
    "playn-go-fortune-teller",
    "Fortune Teller",
    "Crystal Ball работает как Wild и заменяет обычные symbols."
  ],
  [
    "playn-go-fortunes-of-ali-baba",
    "Fortunes of Ali Baba",
    "Ali Baba является Wild, Morgiana — Scatter."
  ],
  [
    "playn-go-fox-mayhem",
    "Fox Mayhem",
    "Fox Mayhem работает на 5×3 reels с 20 paylines."
  ],
  [
    "playn-go-free-reelin-joker",
    "Free Reelin' Joker",
    "Free Reelin’ Joker и Golden Joker работают как Wilds, но Golden Joker дополнительно удваивает win, если входит в winning line, и может появиться только один раз за game round."
  ],
  [
    "playn-go-free-reelin-joker-1000",
    "Free Reelin' Joker 1000",
    "В Free Reelin’ Joker 1000 payout формируется самим числом на reels: symbols 0, 1, 2 и 5 складываются в число слева направо."
  ]
] as const;
test("Wave 75: published Play’n GO list artwork",async({page})=>{for(const [slug,name] of cases){await page.goto(`/slots/?q=${encodeURIComponent(name)}`);const card=page.locator(`[data-slot="${slug}"]`);await expect(card).toBeVisible();const art=card.locator(".catalog-game-art .game-image");await expect(art).toBeVisible();await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));await art.scrollIntoViewIfNeeded();await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);}});
