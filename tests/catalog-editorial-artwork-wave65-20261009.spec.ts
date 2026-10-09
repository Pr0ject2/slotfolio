import { expect, test } from "@playwright/test";
const cases=[
  [
    "wazdan-mighty-wild-panther-grand-diamond-edition",
    "Mighty Wild: Panther Grand Diamond Edition испол"
  ],
  [
    "wazdan-sizzling-eggs",
    "В Sizzling Eggs пять барабанов и пять линий допо"
  ],
  [
    "wazdan-sizzling-eggs-extremely-light",
    "Sizzling Eggs Extremely Light сохраняет пять бар"
  ],
  [
    "wazdan-sizzling-eggs-grand-gold-edition",
    "Grand Gold Edition выводит Sizzling Eggs на боле"
  ],
  [
    "wazdan-sizzling-eggs-grand-platinum-edition",
    "Grand Platinum Edition повышает максимальную наг"
  ],
  [
    "wazdan-sizzling-kingdom-bison",
    "Sizzling Kingdom: Bison оформляет шесть барабано"
  ],
  [
    "wazdan-sizzling-moon",
    "В Sizzling Moon шестнадцать позиций без традицио"
  ],
  [
    "wazdan-slot-jam",
    "Slot Jam использует четыре барабана и девять лин"
  ],
  [
    "wazdan-sonic-reels",
    "Sonic Reels предлагает шесть барабанов и 729 спо"
  ],
  [
    "wazdan-space-gem",
    "Space Gem использует шесть барабанов и десять ли"
  ],
  [
    "wazdan-space-spins",
    "Space Spins переносит шесть барабанов и сорок ли"
  ],
  [
    "wazdan-spectrum",
    "В Spectrum драгоценные камни выпадают на пяти ба"
  ],
  [
    "wazdan-sun-of-fortune",
    "Sun of Fortune использует шестнадцать позиций вм"
  ],
  [
    "wazdan-super-hot",
    "Super Hot возвращает трёхбарабанный фруктовый ав"
  ],
  [
    "wazdan-telly-reels",
    "Telly Reels использует пять барабанов и двадцать"
  ],
  [
    "wazdan-throne-of-elements-platinum",
    "Throne of Elements: Platinum строит бонус вокруг"
  ],
  [
    "wazdan-triple-star",
    "Triple Star использует пять барабанов и двадцать"
  ],
  [
    "wazdan-turbo-play",
    "Turbo Play — редкий для каталога Wazdan трёхбара"
  ],
  [
    "wazdan-unicorn-reels",
    "Unicorn Reels начинает игру на пяти барабанах с "
  ],
  [
    "wazdan-valentines-coins",
    "Valentine’s Coins использует девять позиций 3×3 "
  ]
] as const;
test("wave 65 Wazdan dossiers: researched editorial and real provider art",async({page})=>{for(const [slug,phrase] of cases){
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
