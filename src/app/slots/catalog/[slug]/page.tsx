import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/editorial";
import { SlotArtwork } from "@/components/slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { catalogSeeds, getCatalogSeed } from "@/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "@/lib/catalog-research-lookup";
import { getVerifiedCatalogDetails } from "@/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "@/lib/catalog-verified-game-type";
import { createCatalogModel } from "@/lib/catalog-index";
import { getCatalogArtwork } from "@/lib/catalog-artwork";
import type { CatalogItem } from "@/lib/catalog-query";
import { providerSlug } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
const catalogModel = createCatalogModel();

function date(value?: string) {
  return value ? value.split("-").reverse().join(".") : null;
}

function russianGameType(gameType: string) {
  const translations: Record<string, string> = {
    "Slots": "Слот",
    "Video Slot": "Видеослот",
    "Grid Slot": "Слот с сеткой",
    "Cascading Cluster Pays": "Кластерный слот с каскадами",
  };
  return translations[gameType] ?? gameType;
}

type EditorialFeature = { title: string; description: string };

type CatalogEditorial = { intro?: string[]; editorial?: string; features: EditorialFeature[] };

const catalogEditorial: Record<string, CatalogEditorial> = {
  "3-oaks-gaming-15-dragon-pearls": {
    features: [
      { title: "Шесть респинов Hold & Win", description: "Шесть золотых жемчужин запускают бонус Hold & Win с шестью респинами. Символы, активировавшие режим, фиксируются, как и каждая новая жемчужина в ходе бонуса." },
      { title: "Зелёные и синие жемчужины", description: "Зелёная жемчужина собирает значения всех золотых жемчужин. Синяя собирает все видимые значения, включая значения других синих жемчужин." },
      { title: "Восемь бесплатных вращений", description: "Отдельный режим состоит из восьми бесплатных вращений только с высокооплачиваемыми символами и может запускаться повторно." },
    ],
  },
  "3-oaks-gaming-3-african-drums": {
    features: [
      { title: "Шкалы трёх барабанов", description: "Зелёные, красные и жёлтые символы прогресса заполняют соответствующие шкалы барабанов и активируют Hold & Win." },
      { title: "Джекпоты в Hold & Win", description: "В серии респинов могут появиться MINI, MINOR и MAJOR. Полностью заполненное поле приносит Grand Jackpot размером 2 000x ставки." },
      { title: "Collect, Double и Multi", description: "Collect собирает текущие значения, Double открывает второе поле, а Multi добавляет множители на случайные позиции. Все три функции могут включиться одновременно." },
    ],
  },
  "3-oaks-gaming-3-aztec-temples": {
    features: [
      { title: "Шесть бонусных монет", description: "Шесть золотых монет запускают Hold & Win с респинами. В бонусе могут появиться MINI, MINOR и MAJOR, а полное поле может дать Grand Jackpot." },
      { title: "Три храмовые шкалы", description: "Красные, синие и зелёные символы заполняют шкалы над барабанами. Заполненная шкала добавляет к Hold & Win одну из функций: Boost, Collect или Multi." },
      { title: "Mystery Symbol и Lucky Spin", description: "Таинственный символ в бонусе может открыть дополнительную функцию или джекпот. Lucky Spin запускает бонус с активной функцией; Super Bonus включает все три функции." },
    ],
  },
  "3-oaks-gaming-3-china-pots": {
    features: [
      { title: "Монеты и три горшка", description: "Синие, красные и фиолетовые монеты заполняют три шкалы-горшка и запускают Hold & Win с соответствующими Pot Features." },
      { title: "Extra, Multi и Double", description: "Extra даёт четыре респина вместо трёх, Multi добавляет множители к бонусным символам, Double открывает второе поле. Можно активировать две или все три функции." },
      { title: "Финал Hold & Win", description: "Бонус начинается с трёх респинов, а бонусные символы фиксируются. MINI, MINOR и MAJOR могут появиться в серии, а полное поле даёт Grand Jackpot 2 000x ставки." },
    ],
  },
  "3-oaks-gaming-3-clover-pots": {
    features: [
      { title: "Клеверный Hold & Win", description: "Золотые клеверы с различными значениями запускают Hold & Win. В бонусе могут появиться MINI, MINOR и MAJOR, а полное поле приносит Grand Jackpot 5 000x ставки." },
      { title: "Три Magic Pot Features", description: "Красный, зелёный и фиолетовый клевер включают свои усилители: Double удваивает значения, Mystery превращается в ценный бонусный символ или джекпот, Collect собирает все видимые значения." },
      { title: "Бесплатные вращения с Wild x2", description: "В режиме бесплатных вращений Wild несёт множитель x2." },
    ],
  },
  "3-oaks-gaming-3-clover-pots-extra": {
    features: [
      { title: "Rainbow Coin в Hold & Win", description: "Золотые клеверы запускают Hold & Win с MINI, MINOR и MAJOR. Во время респинов Rainbow Coin может открыть ещё одну функцию горшка, превратившись в специальный бонусный символ." },
      { title: "Три Magic Pot Features", description: "Зелёный, красный и фиолетовый клевер включают свои горшки: Boost прибавляет своё значение ко всем символам, Mystery открывает дорогой бонусный символ или джекпот, Collect собирает видимые значения." },
      { title: "Поле 5×4 и Wild x2", description: "В этой версии игровое поле расширено до 5×4 и 30 линий. Полное поле в Hold & Win может дать Grand Jackpot 5 000x ставки, а в бесплатных вращениях Wild имеет множитель x2." },
    ],
  },
  "3-oaks-gaming-3-coin-volcanoes": {
    features: [
      { title: "Три вулкана и респины", description: "Четыре символа на активной линии запускают три респина бонусной игры. Бонусные символы на линиях в базовой игре зажигают зелёный, красный и синий вулканы над барабанами." },
      { title: "Life, Multi и Grow", description: "Активные вулканы добавляют усилители: Life восстанавливает счётчик респинов, Multi объединяет множители в одной ячейке, Grow открывает две дополнительные строки." },
      { title: "Два главных джекпота", description: "Boost собирает все текущие значения, Mystery может открыть джекпот. Полное обычное поле даёт Grand Jackpot 500x, а заполненная расширенная сетка с Grow приносит Royal Jackpot 2 000x ставки." },
    ],
  },
  "3-oaks-gaming-3-coins": {
    features: [
      { title: "Полный стек в центре", description: "Бонус Hold & Win включается, когда средний барабан полностью заполнен серебряными и золотыми монетами. Их значения сразу прибавляются к счётчику выигрыша, после чего начинаются четыре респина." },
      { title: "Фиксированная средняя колонка", description: "Монеты на среднем барабане остаются на месте. Каждая новая монета прибавляет своё значение вместе со всеми видимыми значениями и заново запускает счётчик респинов." },
      { title: "Алмаз x100–x500", description: "После сбора значений монеты на первом и третьем барабанах освобождают позиции для новых символов. В бонусе может появиться алмаз с множителем от x100 до x500." },
    ],
  },
  "3-oaks-gaming-3-egypt-chests": {
    features: [
      { title: "Три сундука прогресса", description: "Синие, зелёные и жёлтые монеты заполняют соответствующие шкалы сундуков над барабанами. Заполненная хотя бы одна шкала запускает Hold & Win, где монеты становятся бонусными символами." },
      { title: "Multi, Extra и Double", description: "Цвет монеты, запустившей бонус, определяет усилители: Multi добавляет множители, Extra повышает число респинов до четырёх, Double удваивает игровое поле. За один спин могут сработать все три." },
      { title: "Два Grand Jackpot", description: "В респинах могут появиться MINI, MINOR и MAJOR, а Boost собирает все видимые значения. Заполненное поле даёт Grand Jackpot 5 000x ставки; с Double возможны два Grand Jackpot." },
    ],
  },
  "3-oaks-gaming-3-jewel-crowns": {
    features: [
      { title: "Короны открывают семь фриспинов", description: "Зелёные, красные и синие короны заполняют свои шкалы. Заполненные шкалы запускают семь бесплатных вращений и включают соответствующие усилители." },
      { title: "Extra Spins, Jackpot и Double Reels", description: "Extra Spins добавляет ещё семь фриспинов, Jackpot открывает MINI, MAJOR и GRAND, а Double Reels включает второе игровое поле. Все три функции могут работать вместе." },
      { title: "Растущие джекпоты", description: "Каждая выпавшая корона увеличивает случайный джекпот на размер текущей ставки до лимита. В режиме Jackpot Prize значения растут: Minor до 50x, Major до 250x, Grand до 5 000x ставки." },
    ],
  },
  "3-oaks-gaming-3-olymp-fortunes": {
    features: [
      { title: "Три горшка Олимпа", description: "Один или несколько заполненных горшков запускают Hold & Win. В бонусе доступны MINI, MINOR и MAJOR, а полная сетка приносит Grand Jackpot 1 000x ставки." },
      { title: "Extra, Multi и Double", description: "Extra увеличивает число респинов до четырёх, Multi добавляет множители к случайным символам с перемножением в одной ячейке, Double открывает вторую сетку и шанс на два Grand Jackpot." },
      { title: "Super Wheel перед бонусом", description: "Перед каждой бонусной игрой Super Wheel гарантирует награду: дополнительные бонусные символы, ещё одну функцию или мгновенный джекпот." },
    ],
  },
  "3-oaks-gaming-3-pots-of-egypt": {
    features: [
      { title: "Шесть золотых монет", description: "Шесть и более золотых монет запускают Hold & Win с респинами. Внутри могут выпасть MINI, MINOR и MAJOR." },
      { title: "Collect, Boost и Multi", description: "Синие, красные и зелёные специальные монеты заполняют шкалы горшков: Collect собирает значения, Boost прибавляет случайное значение ко всем символам, Multi умножает все значения до x5." },
      { title: "Mystery Symbol и Lucky Spin", description: "Во время респинов Mystery может открыть один из трёх усилителей или джекпот. Lucky Spin также запускает Hold & Win; полная сетка может дать Grand Jackpot 2 000x ставки." },
    ],
  },
  "3-oaks-gaming-3-super-coin-volcanoes": {
    features: [
      { title: "Четыре символа запускают Hold & Win", description: "Четыре совпадения на активной линии включают бонус. В нём доступны MINI, MINOR, MAJOR, Mystery, Mystery Jackpot и Collect; заполненная сетка может дать Grand Jackpot." },
      { title: "Life, Multi Volcano и Grow", description: "Life восстанавливает респины, Multi Volcano размещает от двух до шести множителей x2, а Grow добавляет две строки. С новым множителем в той же ячейке её суммарный множитель растёт на +1." },
      { title: "Super Wheel и Gold Volcano", description: "Super Wheel срабатывает перед бонусом. Gold Volcano является усиленной версией Multi Volcano: даёт множители x5 и прибавляет +5, если множитель попадает в занятую ячейку." },
    ],
  },
  "3-oaks-gaming-3-super-hot-teapots": {
    features: [
      { title: "Три чайника прогресса", description: "Красный, синий и фиолетовый чайники заполняются соответствующими символами. Полная шкала запускает Hold & Win с MINI, MINOR и MAJOR; заполненные 15 позиций дают Grand Jackpot." },
      { title: "Boost, Double и Multi", description: "Boost добавляет случайное значение ко всем видимым символам, Double открывает второе поле, Multi размещает множители в случайных ячейках. Повторное попадание увеличивает множитель ячейки на +1." },
      { title: "Super Wheel даёт старт", description: "Перед бонусной игрой Super Wheel гарантирует один из стартовых эффектов: джекпот, дополнительную функцию или бонусные символы." },
    ],
  },
  "3-oaks-gaming-4-african-drums": {
    features: [
      { title: "Шкалы четырёх барабанов", description: "Алмазы заполняют шкалы соответствующих барабанов и запускают Hold & Win. В бонусе могут выпасть MINI, MINOR, MAJOR и GRAND; полная сетка также может дать Grand Jackpot." },
      { title: "Collect, Multi и Extra", description: "Collect собирает значения, Multi добавляет множители к пустым ячейкам, Extra открывает две дополнительные строки и может дублировать символ между ними. Расширенная полная сетка приносит Extra Grand Jackpot." },
      { title: "Master Drum в респинах", description: "Master Drum может сработать в любой момент респинов и добавить до трёх бонусных символов, в том числе с джекпотами. В базовой игре он также может включать функции барабанов." },
    ],
  },
  "3-oaks-gaming-4-clover-pots": {
    features: [
      { title: "Три малых горшка", description: "Фиолетовый, синий и красный горшки заполняются клеверами и запускают Hold & Win. В бонусе доступны MINI, MINOR и MAJOR, а полное поле может дать Grand Jackpot." },
      { title: "Multi, Collect и Mystery", description: "Multi ставит множитель до x5 на пустую ячейку, Collect собирает текущие значения, Mystery может открыть дорогой бонусный символ или один из джекпотов от MINI до MAJOR." },
      { title: "Super Pot 10 000x", description: "Четвёртый большой горшок запускает Super Bonus с одной, двумя или тремя функциями и добавляет две строки. Заполнение всех 25 ячеек может принести Super Jackpot 10 000x ставки." },
    ],
  },
  "3-oaks-gaming-4-fairy-flowers": {
    features: [
      { title: "Три цветка запускают Hold & Win", description: "Красный, фиолетовый и зелёный цветки заполняются символами прогресса. Полностью раскрытый хотя бы один цветок включает Hold & Win с MINI, MINOR и MAJOR; полная сетка даёт Grand Jackpot." },
      { title: "Extra, Collect и Multi", description: "Extra открывает денежное значение, Collect собирает текущие значения, Multi даёт множители. Mystery Symbol может также включить неактивную функцию." },
      { title: "Magic Bonus четвёртого цветка", description: "Magic Progress Symbols пробуждают четвёртый цветок. Magic Bonus стартует хотя бы с одной функцией, расширяет поле на две строки, а фея может добавлять символы и восстанавливать респины." },
    ],
  },
  "3-oaks-gaming-4-fortune-clovers": {
    features: [
      { title: "Четыре шкалы клевера", description: "Совпадающие символы заполняют четыре шкалы и запускают Hold & Win. В бонусе могут появиться MINI, MINOR и MAJOR, а полная сетка клеверов даёт Grand Jackpot." },
      { title: "Expand, Multi, Boost и Collect", description: "Expand открывает дополнительные строки до сетки 5×6, Multi выдаёт множители, Boost прибавляет случайное значение до трём символам, Collect собирает все видимые призы." },
      { title: "Fortune Situation", description: "Перед бонусом Fortune Situation может нарастить дополнительные клеверы до шести бонусных символов и случайно включить дополнительные функции. Mystery Symbol тоже превращается в один из feature-символов." },
    ],
  },
  "3-oaks-gaming-4-pots-of-egypt": {
    features: [
      { title: "Четыре горшка и Hold & Win", description: "Четыре шкалы-горшка заполняются символами прогресса и запускают Hold & Win. Бонусные монеты могут содержать MINI, MINOR, MAXI, MAJOR или GRAND, а полное поле даёт Royal Jackpot." },
      { title: "Четыре функции горшков", description: "Boost увеличивает все значения, Collect собирает видимые значения, Multi применяет множитель ко всем символам, а Jackpot Feature добавляет от MINI до MAJOR к трём случайным символам." },
      { title: "Mystery в респинах", description: "Mystery Symbol в серии респинов превращается в одну из четырёх функций. Если заполнены все четыре шкалы, все функции запускаются одновременно." },
    ],
  },
  "3-oaks-gaming-4-wolf-drums": {
    features: [
      { title: "Три волчьих барабана", description: "Зелёная, синяя и красная шкалы заполняются бонусными символами и запускают Hold & Win. В бонусе доступны MINI, MINOR, MAJOR и GRAND; полная сетка также даёт Grand Jackpot." },
      { title: "Collect, Multi и Mirror", description: "Collect собирает значения, Multi добавляет множители в пустые ячейки и повышает их на +1 при повторном попадании. Mirror открывает две строки и может продублировать символ между ними." },
      { title: "Master Drum", description: "Master Drum может сработать в любой момент бонуса: добавить бонусные или jackpot-символы в пустые ячейки, сбросить респины либо включить неактивную функцию." },
    ],
  },

  "3-oaks-gaming-777-fruity-coins": {
    features: [
      { title: "Collect только на среднем барабане", description: "Монета Collect с 777 появляется только на среднем барабане и мгновенно собирает значения всех видимых бонусных монет." },
      { title: "Три респина на свежих барабанах", description: "Бонус запускается, если на первом и третьем барабанах есть бонусные символы, а в центре Collect. В респинах появляются только бонусные монеты, до трёх Collect и пустые позиции; каждый новый символ сбрасывает счётчик." },
      { title: "Три Collect и Grand", description: "Collect фиксируются и собирают окружающие значения. Специальные монеты несут MINI, MINOR, MAJOR или GRAND; три Collect вместе с Grand могут утроить Grand Jackpot до 3 000x ставки." },
    ],
  },
  "3-oaks-gaming-777-gems-respin": {
    features: [
      { title: "Респин двух заполненных барабанов", description: "Если на невыигрышном спине два барабана заполнены одинаковыми драгоценными символами, они фиксируются, а третий барабан получает респин." },
      { title: "Полный экран Gems x2", description: "Полный экран одинаковых Gems включает множитель x2 для этого выигрыша." },
      { title: "Пять линий с разными выплатами", description: "Выигрыш формируют три одинаковых символа на любой из пяти линий: красные семёрки платят 150x ставки, колокола 50x, Bars 10x, Gems 5x и X 1x." },
    ],
  },
  "3-oaks-gaming-amazonia-wins": {
    features: [
      { title: "Призы на Extra Board", description: "Над барабанами 2, 3 и 4 расположено Extra Board с денежными призами, MINI, MINOR, MAJOR, GRAND, Mystery и Mystery Jackpot. Они не участвуют в линиях сами по себе." },
      { title: "Win + Collect забирают награду", description: "Win на первом или пятом барабане вместе с Collect на одном из трёх центральных забирает приз над этим Collect. Три Collect могут забрать все три приза, а два Win удваивают каждый приз." },
      { title: "Пять бонусных спинов идола", description: "Golden Idol заполняется Bonus и Super Bonus с Extra Board и запускает пять бонусных вращений. В них появляются только Win и Collect, а множители Win составляют x1–x2 или x2–x5 в Super Bonus." },
    ],
  },
  "3-oaks-gaming-aztec-fire": {
    features: [
      { title: "Шесть метеоров для Hold & Win", description: "Шесть огненных метеоров с денежными значениями запускают Hold & Win. Бонус начинается с трёх респинов, а каждый новый липкий символ сбрасывает счётчик." },
      { title: "Расширение до 40 позиций", description: "Сбор бонусных символов открывает до четырёх дополнительных рядов. Заполнение всех 40 позиций на расширенном поле может дать Royal Jackpot 10 000x ставки." },
      { title: "Фриспины только с дорогими символами", description: "В бесплатных вращениях появляются только высокооплачиваемые символы, а дополнительные фриспины могут запускаться повторно." },
    ],
  },
  "3-oaks-gaming-aztec-fire-2": {
    features: [
      { title: "Восемь рядов в Hold & Win", description: "Шесть метеоров запускают Hold & Win с тремя респинами. После 10, 15, 20 и 25 бонусных символов открываются пятый, шестой, седьмой и восьмой ряды." },
      { title: "Множители в дополнительных рядах", description: "Каждый заполненный дополнительный ряд открывает множитель до x10 для символов этого ряда. Полное заполнение восьми рядов приносит Royal Jackpot 10 000x ставки." },
      { title: "Пять фиксированных джекпотов", description: "В бонусе доступны MINI 10x, MIDI 20x, MINOR 40x, MAJOR 100x и GRAND 1 000x ставки. Отдельная шкала бонусных символов также может запустить Hold & Win." },
    ],
  },
};

function getCatalogEditorial(slug: string) {
  return catalogEditorial[slug];
}

function russianMechanicTitle(mechanic: string) {
  const translations: Record<string, string> = {
    "Mystery Symbols": "Таинственные символы",
    "Free Spins": "Бесплатные вращения",
    "Wilds": "Вайлды",
    "Cascades": "Каскады",
    "Hold & Win": "Удержание и выигрыши",
    "Risk Game": "Риск-игра",
    "Jackpots": "Джекпоты",
  };
  return translations[mechanic] ?? mechanic;
}

function itemHref(item: CatalogItem) {
  return item.coverage === "dossier" ? `/slots/${item.slug}` : `/slots/catalog/${item.slug}`;
}

export function generateStaticParams() {
  return catalogSeeds.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slot = getCatalogSeed((await params).slug);
  if (!slot) return pageMetadata({ title: "Игра не найдена", description: "Такой записи нет в текущем каталоге Slotfolio.", path: "/slots", image: "/images/unavailable.svg", noIndex: true });
  const details = getVerifiedCatalogDetails(slot.slug);
  return pageMetadata({
    title: `${slot.name} от ${slot.provider}`,
    description: `${slot.name} от ${slot.provider}.${details?.rtp ? ` RTP ${details.rtp}.` : ""}`,
    path: `/slots/catalog/${slot.slug}`,
    image: "/images/unavailable.svg",
    noIndex: true,
  });
}

export default async function CatalogSlotPage({ params }: { params: Promise<{ slug: string }> }) {
  const slot = getCatalogSeed((await params).slug);
  if (!slot) notFound();
  const details = getVerifiedCatalogDetails(slot.slug);
  const artwork = getCatalogArtwork(slot.slug);
  const gameType = getVerifiedCatalogGameType(slot.slug);
  const research = getVerifiedCatalogResearch(slot.slug);
  const mechanics = research?.mechanics ?? [];
  const editorial = getCatalogEditorial(slot.slug);
  const editorialMechanics = editorial?.features.slice(0, 2) ?? [];
  const source = details?.source ?? gameType?.source ?? slot.source;
  const releaseSource = details?.releaseDateSource;
  const volatilitySource = details?.volatilitySource;
  const sources = Array.from(new Set([slot.source, details?.source, gameType?.source, research?.source, releaseSource, volatilitySource].filter((value): value is string => Boolean(value))));
  const providerItems = catalogModel.items.filter((item) => item.slug !== slot.slug && item.provider === slot.provider).sort((a, b) => b.mechanics.length - a.mechanics.length || a.name.localeCompare(b.name, "ru")).slice(0, 6);
  const providerSlugs = new Set(providerItems.map((item) => item.slug));
  const mechanicItems = mechanics.length ? catalogModel.items.filter((item) => item.slug !== slot.slug && !providerSlugs.has(item.slug) && item.mechanics.some((mechanic) => mechanics.includes(mechanic))).sort((a, b) => b.mechanics.filter((mechanic) => mechanics.includes(mechanic)).length - a.mechanics.filter((mechanic) => mechanics.includes(mechanic)).length).slice(0, 6) : [];

  return (
    <>
      <Breadcrumbs items={[{ label: "Каталог", href: "/slots" }, { label: slot.name }]} />
      <div className="slot-heading catalog-dossier-heading">
        <div>
          <span className="eyebrow accent">Запись каталога</span>
          <h1>{slot.name}</h1>
          <Link className="provider-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>{slot.provider} ↗</Link>
        </div>
      </div>
      <div className="slot-intro catalog-dossier-intro">
        {artwork ? <figure className="slot-figure">
          <SlotArtwork
            className="game-image catalog-dossier-art"
            src={withBasePath(artwork)}
            alt={`Игровая графика ${slot.name}`}
            width={960}
            height={540}
          />
          <figcaption>Игровая графика · {slot.provider} · {slot.name}</figcaption>
        </figure> : null}
        <div className="slot-summary">
          <span className="eyebrow">Суть игры</span>
          <p className="slot-deck">{`${slot.name} от ${slot.provider}.`}</p>
          <h2 className="catalog-facts-heading">Характеристики</h2>
          <dl className="facts catalog-record-facts">
            <div><dt>Провайдер</dt><dd><Link href={`/slots?provider=${providerSlug(slot.provider)}`}>{slot.provider}</Link></dd></div>
            {gameType ? <div><dt>Тип игры</dt><dd>{russianGameType(gameType.gameType)}</dd></div> : null}
            {details?.field ? <div><dt>Игровое поле</dt><dd>{details.field}</dd></div> : null}
            {details?.rtp ? <div><dt>RTP, справочно</dt><dd>{details.rtp}</dd></div> : null}
            {details?.volatility ? <div><dt>Волатильность</dt><dd>{details.volatility}</dd></div> : null}
            {details?.maxWin ? <div><dt>Максимальная выплата</dt><dd>{details.maxWin}</dd></div> : null}
            {date(details?.releaseDate) ? <div><dt>Дата релиза</dt><dd>{date(details?.releaseDate)}</dd></div> : null}
            {mechanics.length ? <div className="facts-wide"><dt>Ключевые механики</dt><dd className="slot-tag-list">{mechanics.map((mechanic) => <Link href={`/slots?mechanic=${encodeURIComponent(mechanic)}`} key={mechanic}>{russianMechanicTitle(mechanic)}</Link>)}</dd></div> : null}
          </dl>
        </div>
      </div>
      <div className="article-layout slot-body">
        <aside className="article-toc">
          <span className="eyebrow">В этом досье</span>
          {editorial ? <a href="#how-it-works">Как устроена игра</a> : null}
          {editorial ? <a href="#functions">Функции и бонусы</a> : null}
          {details ? <a href="#math-profile">Математический профиль</a> : null}
          {editorial ? <a href="#editorial">Взгляд редакции</a> : null}
          <a href="#catalog-comparison">Сравнение с каталогом</a>
          <a href="#facts">Факты и источники</a>
          <a href="#faq">Вопросы об игре</a>
          {providerItems.length || mechanicItems.length ? <a href="#related">Похожие игры</a> : null}
          <Link href="/slots">Весь каталог ↗</Link>
        </aside>
        <article className="prose">
          {editorial ? <section id="how-it-works"><h2>Как устроена игра</h2>{(editorial.intro ?? editorialMechanics.map((feature) => feature.description)).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section> : null}
          {editorial ? <section id="functions"><span className="eyebrow accent">Функции и бонусы</span><h2>Что реально меняет ход раунда</h2><div className="dossier-feature-grid">{editorial.features.map((feature, index) => <article className={`dossier-feature-card ${index === 0 ? "is-primary" : ""}`} key={feature.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></section> : null}
          {details ? <section id="math-profile"><span className="eyebrow accent">Математический профиль</span><h2>Цифры без ложной точности</h2><div className="dossier-metric-grid">
            {details.rtp ? <div><span>RTP в каталоге</span><strong>{details.rtp}</strong><small>Справочная конфигурация</small></div> : null}
            {details.maxWin ? <div><span>Максимальная выплата</span><strong>{details.maxWin}</strong><small>Заявлено провайдером</small></div> : null}
            {details.volatility ? <div><span>Волатильность</span><strong>{details.volatility}</strong><small>Справочная категория</small></div> : null}
            {details.field ? <div><span>Игровое поле</span><strong>{details.field}</strong><small>{mechanics.join(" · ")}</small></div> : null}
          </div></section> : null}
          {editorial ? <section id="editorial"><span className="eyebrow accent">Взгляд редакции</span><h2>{slot.name}: что важно в раунде</h2><blockquote>{editorial.editorial ?? editorial.features[0].description}</blockquote>{!editorial.editorial && editorial.features[2] ? <p>{editorial.features[2].description}</p> : null}</section> : null}
          <section id="catalog-comparison"><span className="eyebrow accent">Контекст каталога</span><h2>С чем сравнивать эту игру</h2><div className="dossier-metric-grid">
            {details?.field ? <div><span>Игровое поле</span><strong>{details.field}</strong><small>{mechanics.map(russianMechanicTitle).join(" · ")}</small></div> : null}
            <div><span>Провайдер</span><strong>{slot.provider}</strong><small>Другие игры с теми же механиками доступны в каталоге</small></div>
          </div><Link className="text-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>Все игры {slot.provider} ↗</Link></section>
          <section id="facts"><h2>Как читать параметры игры</h2><p>RTP описывает теоретическую долю возврата на большой дистанции. Волатильность показывает разброс результатов, но не позволяет предсказать следующий раунд.</p><p className="source-note">Базовый источник: <a href={source} target="_blank" rel="noreferrer">Официальный каталог игры ↗</a>.</p>{sources.length > 1 ? <p className="source-note">Дополнительные официальные источники: {sources.slice(1).map((item, index) => <span key={item}>{index ? " · " : ""}<a href={item} target="_blank" rel="noreferrer">страница разработчика ↗</a></span>)}.</p> : null}</section>
          <section id="faq"><span className="eyebrow accent">Вопросы об игре</span><h2>Что нужно знать перед запуском</h2><details><summary>Можно ли предсказать следующий результат?</summary><p>Нет. RTP и волатильность описывают игру на большой дистанции, а не исход следующего вращения.</p></details><details><summary>Почему RTP может отличаться у оператора?</summary><p>У одной игры бывают разные конфигурации. Перед запуском ориентируйтесь на таблицу выплат в выбранной версии.</p></details><details><summary>Что сравнивать перед выбором?</summary><p>Смотрите на игровое поле, механики, RTP, волатильность и максимальную выплату, если она указана провайдером.</p></details></section>
        </article>
      </div>
      {providerItems.length || mechanicItems.length ? <section id="related">
        {providerItems.length ? <><div className="section-title"><h2>Ещё у {slot.provider}</h2><Link className="text-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>Все игры {slot.provider} ↗</Link></div><div>{providerItems.map((item, index) => <Link className="game-row" href={itemHref(item)} key={item.slug}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{item.name}</h3><p>{item.provider}</p></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></> : null}
        {mechanicItems.length ? <><div className="section-title"><h2>Похожие по механике</h2><Link className="text-link" href={`/slots?mechanic=${encodeURIComponent(mechanics[0])}`}>Открыть фильтр ↗</Link></div><div>{mechanicItems.map((item, index) => <Link className="game-row" href={itemHref(item)} key={item.slug}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{item.name}</h3><p>{item.provider}</p></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></> : null}
      </section> : null}
    </>
  );
}
