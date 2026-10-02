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

type CatalogEditorial = { features: EditorialFeature[] };

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
  "3-oaks-gaming-3-hot-chillies": {
    features: [
      { title: "Перцы заполняют шкалы", description: "Зелёные, жёлтые и красные перцы являются бонусными символами и заполняют три шкалы над барабанами. Они запускают Hold & Win с фиксирующимися символами и респинами." },
      { title: "Три режима усиления", description: "Перец, который запускает бонус, определяет функцию: Ultra добавляет множители к символам, Extra Spins увеличивает число респинов до четырёх, Double Reels открывает второе поле с дублированием бонусных символов." },
      { title: "Джекпоты в бонусе", description: "В Hold & Win доступны MINI, MINOR и MAJOR. Полностью заполненное поле может принести Grand Jackpot 1 000x ставки, а все три усиления могут сработать одновременно." },
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
          {editorial ? <a href="#functions">Функции и бонусы</a> : null}
          {details ? <a href="#math-profile">Математический профиль</a> : null}
          <a href="#editorial">Взгляд редакции</a>
          <a href="#catalog-comparison">Сравнение с каталогом</a>
          <a href="#facts">Факты и источники</a>
          <a href="#faq">Вопросы об игре</a>
          {providerItems.length || mechanicItems.length ? <a href="#related">Похожие игры</a> : null}
          <Link href="/slots">Весь каталог ↗</Link>
        </aside>
        <article className="prose">
          {editorial ? <section id="functions"><span className="eyebrow accent">Функции и бонусы</span><h2>Что реально меняет ход раунда</h2><div className="dossier-feature-grid">{editorial.features.map((feature, index) => <article className={`dossier-feature-card ${index === 0 ? "is-primary" : ""}`} key={feature.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></section> : null}
          <section id="editorial"><span className="eyebrow accent">Взгляд редакции</span><h2>На что смотреть перед запуском</h2><p>Сначала проверьте игровое поле, список механик и таблицу выплат в правилах оператора. Эти параметры показывают структуру раунда, но не гарантируют результат отдельной сессии.</p></section>
          <section id="catalog-comparison"><span className="eyebrow accent">Сравнение с каталогом</span><h2>Где искать похожие игры</h2><p>В каталоге можно отобрать игры того же провайдера или перейти к карточкам с совпадающими механиками. Так сравнение остаётся привязанным к подтверждённым данным, а не к предположениям.</p><Link className="text-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>Все игры {slot.provider} ↗</Link></section>
          {details ? <section id="math-profile"><span className="eyebrow accent">Математический профиль</span><h2>Цифры без ложной точности</h2><div className="dossier-metric-grid">
            {details.rtp ? <div><span>RTP, справочно</span><strong>{details.rtp}</strong><small>Параметр из официального источника</small></div> : null}
            {details.maxWin ? <div><span>Максимальная выплата</span><strong>{details.maxWin}</strong><small>Формулировка из официального источника</small></div> : null}
            {details.volatility ? <div><span>Волатильность</span><strong>{details.volatility}</strong><small>Категория разработчика</small></div> : null}
            {details.field ? <div><span>Игровое поле</span><strong>{details.field}</strong><small>{mechanics.join(" · ")}</small></div> : null}
          </div><p className="metric-caveat">Параметры могут отличаться у конкретного оператора. Неуказанные значения не подставляются.</p></section> : null}
          <section id="facts"><span className="eyebrow accent">Факты и источники</span><h2>Как читать числа</h2><p className="source-note">Основной источник: <a href={source} target="_blank" rel="noreferrer">Официальный каталог ↗</a>.</p>{sources.length > 1 ? <p className="source-note">Дополнительные официальные источники: {sources.slice(1).map((item, index) => <span key={item}>{index ? " · " : ""}<a href={item} target="_blank" rel="noreferrer">страница разработчика ↗</a></span>)}.</p> : null}<p>Если параметра здесь нет, он не был добавлен без надёжного подтверждения. Для запущенной версии всегда сверяйте правила оператора.</p></section>
          <section id="faq"><span className="eyebrow accent">Вопросы об игре</span><h2>Что нужно знать</h2><details><summary>Какие параметры подтверждены?</summary><p>На странице показаны только значения и механики, для которых указан источник. Пустые поля не заполняются оценками.</p></details><details><summary>Почему значения могут отличаться у оператора?</summary><p>Оператор может запускать другую конфигурацию игры. Перед ставкой сверяйте таблицу выплат и правила в самом казино.</p></details></section>
        </article>
      </div>
      {providerItems.length || mechanicItems.length ? <section id="related">
        {providerItems.length ? <><div className="section-title"><h2>Ещё у {slot.provider}</h2><Link className="text-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>Все игры {slot.provider} ↗</Link></div><div>{providerItems.map((item, index) => <Link className="game-row" href={itemHref(item)} key={item.slug}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{item.name}</h3><p>{item.provider}</p></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></> : null}
        {mechanicItems.length ? <><div className="section-title"><h2>Похожие по механике</h2><Link className="text-link" href={`/slots?mechanic=${encodeURIComponent(mechanics[0])}`}>Открыть фильтр ↗</Link></div><div>{mechanicItems.map((item, index) => <Link className="game-row" href={itemHref(item)} key={item.slug}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{item.name}</h3><p>{item.provider}</p></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></> : null}
      </section> : null}
    </>
  );
}
