import { expect, test } from "@playwright/test";
const cases = [
  [
    "wazdan-magic-fruit-oranges",
    "Magic Fruit$: Oranges использует девять независи"
  ],
  [
    "wazdan-magic-fruits",
    "Magic Fruits — оригинальная трёхбарабанная фрукт"
  ],
  [
    "wazdan-magic-fruits-27",
    "Magic Fruits 27 сохраняет три барабана, но расши"
  ],
  [
    "wazdan-magic-fruits-4",
    "Magic Fruits 4 меняет классическую трёхбарабанну"
  ],
  [
    "wazdan-magic-fruits-4-deluxe",
    "Magic Fruits 4 Deluxe обновляет оформление четвё"
  ],
  [
    "wazdan-magic-fruits-81",
    "Magic Fruits 81 использует четыре барабана; в оп"
  ],
  [
    "wazdan-magic-fruits-deluxe",
    "Magic Fruits Deluxe обновляет визуал трёхбарабан"
  ],
  [
    "wazdan-magic-fruits-dice",
    "Magic Fruits Dice — самостоятельная новинка 2026"
  ],
  [
    "wazdan-magic-hot",
    "Magic Hot — простая трёхбарабанная машина с пять"
  ],
  [
    "wazdan-magic-hot-4",
    "Magic Hot 4 расширяет старую Magic Hot до четырё"
  ],
  [
    "wazdan-magic-hot-4-deluxe",
    "Magic Hot 4 Deluxe переносит четыре барабана и д"
  ],
  [
    "wazdan-magic-of-the-ring",
    "Magic Of The Ring строится на пяти барабанах и д"
  ],
  [
    "wazdan-magic-of-the-ring-deluxe",
    "Magic of the Ring Deluxe переоформляет исходный "
  ],
  [
    "wazdan-magic-stars",
    "Magic Stars — первоначальная трёхбарабанная косм"
  ],
  [
    "wazdan-magic-stars-3",
    "Magic Stars 3 сохраняет три барабана и пять лини"
  ],
  [
    "wazdan-magic-stars-5",
    "Magic Stars 5 увеличивает поле серии до пяти бар"
  ],
  [
    "wazdan-magic-stars-6",
    "Magic Stars 6 переносит космические символы на ш"
  ],
  [
    "wazdan-magic-stars-9",
    "Magic Stars 9 использует девять отдельных позици"
  ],
  [
    "wazdan-magic-target",
    "Magic Target переносит фруктовую ретро-сетку на "
  ],
  [
    "wazdan-magic-target-deluxe",
    "Magic Target Deluxe полностью обновляет аудиовиз"
  ]
] as const;
test("wave 62 Wazdan dossier regression verifies complete game-specific sections and official WebP",async({page})=>{for(const [slug,phrase] of cases){
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
