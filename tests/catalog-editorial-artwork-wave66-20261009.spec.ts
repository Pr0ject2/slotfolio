import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-valhalla",
    "Valhalla разворачивает скандинавский сюжет на"
  ],
  [
    "wazdan-vegas-hot",
    "Vegas Hot оставляет три барабана и всего пять"
  ],
  [
    "wazdan-vegas-hot-81",
    "Vegas Hot 81 меняет маленький трёхбарабанник "
  ],
  [
    "wazdan-vegas-reels-ii",
    "Vegas Reels II выделяется предельно узкой схе"
  ],
  [
    "wazdan-welcome-to-hell-81",
    "Welcome To Hell 81 использует четырёхбарабанн"
  ],
  [
    "wazdan-wild-girls",
    "Wild Girls использует три барабана с пятью ли"
  ],
  [
    "wazdan-wild-guns",
    "Wild Guns — ковбойский слот с пятью барабанам"
  ],
  [
    "wazdan-wild-jack",
    "Wild Jack — трёхбарабанная игра на 27 линиях,"
  ],
  [
    "wazdan-wild-jack-81",
    "Wild Jack 81 расширяет исходную версию до чет"
  ],
  [
    "wazdan-win-replay",
    "Win & Replay на трёх барабанах и пяти линиях "
  ],
  [
    "3-oaks-gaming-coin-up-volcano",
    "Coin UP Volcano переносит вулканическую тему "
  ],
  [
    "3-oaks-gaming-coin-up-hot-fire",
    "Coin UP: Hot Fire — компактный 3×3 слот с цен"
  ],
  [
    "3-oaks-gaming-coin-up-lightning",
    "Coin UP: Lightning использует электрическую с"
  ],
  [
    "3-oaks-gaming-dragon-pearls",
    "Dragon Pearls — оригинальная китайская игра н"
  ],
  [
    "3-oaks-gaming-fishin-bear",
    "Fishin' Bear — рыбалка на пяти барабанах и дв"
  ],
  [
    "3-oaks-gaming-grab-the-gold",
    "Grab the Gold! отправляет на золотой прииск с"
  ],
  [
    "3-oaks-gaming-grand",
    "Grand — фруктовая игра на пяти барабанах с пя"
  ],
  [
    "3-oaks-gaming-green-chilli",
    "Green Chilli разворачивает мексиканскую фиест"
  ],
  [
    "3-oaks-gaming-green-chilli-2",
    "Green Chilli 2 сохраняет пять барабанов и два"
  ],
  [
    "3-oaks-gaming-hit-more-gold",
    "Hit more Gold! использует расширенную шахтёрс"
  ]
] as const;
test("wave 66 dossiers have researched content and reviewed loaded artwork",async({page})=>{for(const [slug,phrase] of cases){
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
}});
