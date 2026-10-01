import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/editorial";
import { catalogSeeds, getCatalogSeed } from "@/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "@/lib/catalog-research-lookup";
import { getVerifiedCatalogDetails } from "@/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "@/lib/catalog-verified-game-type";
import { createCatalogModel } from "@/lib/catalog-index";
import type { CatalogItem } from "@/lib/catalog-query";
import { providerSlug } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
const catalogModel = createCatalogModel();

function date(value?: string) {
  return value ? value.split("-").reverse().join(".") : null;
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
  const gameType = getVerifiedCatalogGameType(slot.slug);
  const research = getVerifiedCatalogResearch(slot.slug);
  const mechanics = research?.mechanics ?? [];
  const source = details?.source ?? gameType?.source ?? research?.source ?? slot.source;
  const sources = Array.from(new Set([slot.source, details?.source, gameType?.source, research?.source].filter((value): value is string => Boolean(value))));
  const related = catalogModel.items
    .filter((item) => item.slug !== slot.slug && (item.provider === slot.provider || item.mechanics.some((mechanic) => mechanics.includes(mechanic))))
    .sort((a, b) => Number(b.provider === slot.provider) - Number(a.provider === slot.provider) || b.mechanics.length - a.mechanics.length || a.name.localeCompare(b.name, "ru"))
    .slice(0, 6);

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
        <div className="slot-summary">
          <span className="eyebrow">Подтверждённые сведения</span>
          <p className="slot-deck">В этой записи показаны только характеристики, подтверждённые страницами разработчика.</p>
          <dl className="facts">
            <div><dt>Провайдер</dt><dd><Link href={`/slots?provider=${providerSlug(slot.provider)}`}>{slot.provider}</Link></dd></div>
            {gameType ? <div><dt>Тип игры</dt><dd>{gameType.gameType}</dd></div> : null}
            {details?.field ? <div><dt>Игровое поле</dt><dd>{details.field}</dd></div> : null}
            {details?.rtp ? <div><dt>RTP, справочно</dt><dd>{details.rtp}</dd></div> : null}
            {details?.volatility ? <div><dt>Волатильность</dt><dd>{details.volatility}</dd></div> : null}
            {details?.maxWin ? <div><dt>Максимальная выплата</dt><dd>{details.maxWin}</dd></div> : null}
            {date(details?.releaseDate) ? <div><dt>Дата релиза</dt><dd>{date(details?.releaseDate)}</dd></div> : null}
            {mechanics.length ? <div className="facts-wide"><dt>Ключевые механики</dt><dd className="slot-tag-list">{mechanics.map((mechanic) => <Link href={`/slots?mechanic=${encodeURIComponent(mechanic)}`} key={mechanic}>{mechanic}</Link>)}</dd></div> : null}
          </dl>
          <p className="data-note">Отсутствующие характеристики не заменяются оценками. Версия у оператора может отличаться.</p>
        </div>
      </div>
      <div className="article-layout slot-body">
        <aside className="article-toc">
          <span className="eyebrow">В этой записи</span>
          {mechanics.length ? <a href="#mechanic">Механики</a> : null}
          {details ? <a href="#math-profile">Параметры игры</a> : null}
          <a href="#facts">Источники</a>
          {related.length ? <a href="#related">Похожие игры</a> : null}
          <Link href="/slots">Весь каталог ↗</Link>
        </aside>
        <article className="prose">
          {mechanics.length ? <section id="mechanic"><span className="eyebrow accent">Механики</span><h2>Что подтверждено у этой игры</h2><div className="dossier-feature-grid">{mechanics.map((mechanic, index) => <article className={`dossier-feature-card ${index === 0 ? "is-primary" : ""}`} key={mechanic}><span>{String(index + 1).padStart(2, "0")}</span><h3>{mechanic}</h3><p>Механика указана в официальном описании игры.</p></article>)}</div></section> : null}
          {details ? <section id="math-profile"><span className="eyebrow accent">Параметры игры</span><h2>Цифры без предположений</h2><div className="dossier-metric-grid">
            {details.rtp ? <div><span>RTP, справочно</span><strong>{details.rtp}</strong><small>Конфигурация из официального источника</small></div> : null}
            {details.maxWin ? <div><span>Максимальная выплата</span><strong>{details.maxWin}</strong><small>В единицах ставки</small></div> : null}
            {details.volatility ? <div><span>Волатильность</span><strong>{details.volatility}</strong><small>Формулировка разработчика</small></div> : null}
            {details.field ? <div><span>Игровое поле</span><strong>{details.field}</strong><small>Структура, указанная разработчиком</small></div> : null}
          </div></section> : null}
          <section id="facts"><span className="eyebrow accent">Факты и источники</span><h2>Проверяемая основа записи</h2><p className="source-note">Основной источник: <a href={source} target="_blank" rel="noreferrer">официальная страница разработчика ↗</a>.</p>{sources.length > 1 ? <p className="source-note">Дополнительные официальные источники: {sources.slice(1).map((item, index) => <span key={item}>{index ? " · " : ""}<a href={item} target="_blank" rel="noreferrer">страница разработчика ↗</a></span>)}.</p> : null}{research?.evidence ? <p>{research.evidence}</p> : null}<p>Если параметра здесь нет, он не был добавлен без надёжного подтверждения. Для запущенной версии всегда сверяйте правила оператора.</p></section>
        </article>
      </div>
      {related.length ? <section id="related"><div className="section-title"><h2>Продолжить знакомство</h2><Link className="text-link" href="/slots">В каталог ↗</Link></div><div>{related.map((item, index) => <Link className="game-row" href={itemHref(item)} key={item.slug}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{item.name}</h3><p>{item.provider}{item.mechanics.length ? <><span>·</span>{item.mechanics.join(" · ")}</> : null}</p></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></section> : null}
    </>
  );
}
