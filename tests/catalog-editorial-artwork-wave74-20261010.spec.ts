import { expect, test } from "@playwright/test";
const cases = [
  [
    "playn-go-cops-n-robbers",
    "Cops ’n’ Robbers",
    "Символ банковского хранилища заменяет обычные символы и удваивает выигрыши с его участием."
  ],
  [
    "playn-go-count-jokula",
    "Count Jokula",
    "На невыигрышном вращении превращает некоторые символы в bat-themed Wild, создавая шанс на новую линию."
  ],
  [
    "playn-go-coywolf-cash",
    "Coywolf Cash",
    "Mask Scatter на третьем барабане включает горизонтальный Wild Reel над основным полем."
  ],
  [
    "playn-go-crabbys-gold",
    "Crabby’s Gold",
    "Мешочек на первом или шестом барабане собирает видимые монеты с множителями."
  ],
  [
    "playn-go-crabbys-gold-ii",
    "Crabby’s Gold II",
    "Мешочки на первом и шестом барабанах собирают видимые монеты; два мешочка собирают их дважды."
  ],
  [
    "playn-go-crazy-cows",
    "Crazy Cows",
    "Bull Wild заменяет обычные символы, а на третьем барабане расширяется целиком."
  ],
  [
    "playn-go-crystal-hall",
    "Crystal Hall",
    "Poker Chip на третьем барабане запускает Neon Frames, которые могут превращать позиции в дорогие символы."
  ],
  [
    "playn-go-crystal-sun",
    "Crystal Sun",
    "Десять фиксированных линий платят как слева направо, так и справа налево."
  ],
  [
    "playn-go-cursed-moon-power-collection",
    "Cursed Moon Power Collection",
    "Коллектор на внешнем барабане собирает видимые монеты и Instant Win symbols."
  ],
  [
    "playn-go-dansband-pa-turne",
    "Dansband På Turné",
    "Wild занимает целый барабан, а не только одну позицию."
  ],
  [
    "playn-go-dawn-of-egypt",
    "Dawn of Egypt",
    "Три и более Pyramid Scatter открывают Free Spins; колесо определяет количество до 15."
  ],
  [
    "playn-go-dr-toonz",
    "Dr. Toonz",
    "Каскады образуют новые выигрыши на сетке с максимумом 262 144 способов."
  ],
  [
    "playn-go-dragon-maiden",
    "Dragon Maiden",
    "Два Dragon Scatter фиксируются и запускают повторные вращения до прекращения появления новых драконов."
  ],
  [
    "playn-go-dragon-ship",
    "Dragon Ship",
    "Полностью заполненные Wild барабаны 1 и 5 одновременно запускают Free Spins."
  ],
  [
    "playn-go-dragonfates-favor",
    "Dragonfate’s Favor",
    "Goldar движется по барабанам и участвует в выигрышных комбинациях."
  ],
  [
    "playn-go-easter-eggs",
    "Easter Eggs",
    "Золотое яйцо заменяет обычные символы; после выигрыша отдельно доступен карточный Gamble."
  ],
  [
    "playn-go-easter-eggspedition",
    "Easter Eggspedition",
    "На обычных вращениях могут появляться гарантированные Scatter, приближающие бонус."
  ],
  [
    "playn-go-enchanted-crystals",
    "Enchanted Crystals",
    "Wild на барабанах 2–4 расширяется и фиксируется, а каждый новый Wild добавляет re-spin."
  ],
  [
    "playn-go-enchanted-meadow",
    "Enchanted Meadow",
    "На третьем барабане Tree Wild расширяется на весь reel."
  ],
  [
    "playn-go-energoonz",
    "Energoonz",
    "Три и более одинаковых символа по горизонтали или вертикали дают выигрыш; после падения новых растёт множитель."
  ]
] as const;
test("Wave 74: 20 Play’n GO dossiers and first-party artwork",async({page})=>{for(const [slug,,phrase] of cases){await page.goto(`/slots/catalog/${slug}`);await expect(page.locator(".slot-heading .eyebrow")).toContainText("Досье игры");await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");await expect(page.locator("#functions h2")).toHaveText("Основные функции");await expect(page.locator("#functions")).toContainText(phrase);expect(await page.locator("#functions .dossier-feature-card").count()).toBeGreaterThanOrEqual(3);await expect(page.locator("#math-profile .eyebrow")).toHaveText("Цифры без ложной точности");await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");await expect(page.locator("#facts h2")).toHaveText("Факты и источники");expect(await page.locator("#facts a").count()).toBeGreaterThan(0);await expect(page.locator("#faq h2")).toHaveText("Вопросы об игре");const art=page.locator(".slot-figure .catalog-dossier-art");await expect(art).toBeVisible();await expect(art).toHaveAttribute("src",new RegExp(`/images/catalog/${slug}\\.webp$`));await art.scrollIntoViewIfNeeded();await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);await expect.poll(async()=>art.evaluate(el=>(el as HTMLImageElement).naturalHeight),{timeout:15000}).toBeGreaterThan(0);}});
