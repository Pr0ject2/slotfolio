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

function itemHref(item: CatalogItem) {
  return item.coverage === "dossier" ? `/slots/${item.slug}` : `/slots/catalog/${item.slug}`;
}

function sortUsefulFirst(a: CatalogItem, b: CatalogItem) {
  if (a.coverage !== b.coverage) return a.coverage === "dossier" ? -1 : 1;
  if (a.mechanics.length !== b.mechanics.length) return b.mechanics.length - a.mechanics.length;
  return a.name.localeCompare(b.name, "ru");
}

function RelatedGames({ items }: { items: CatalogItem[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <Link className="game-row" href={itemHref(item)} key={item.slug}>
          <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
          <div className="row-main">
            <h3>{item.name}</h3>
            <p>
              {item.provider}
              {item.mechanics.length ? <><span>·</span>{item.mechanics.join(" · ")}</> : null}
            </p>
          </div>
          <span className="row-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}

function displayDate(value?: string) {
  return value ? value.split("-").reverse().join(".") : null;
}

export function generateStaticParams() {
  return catalogSeeds.map((slot) => ({ slug: slot.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slot = getCatalogSeed((await params).slug);
  if (!slot) {
    return pageMetadata({
      title: "Игра не найдена",
      description: "Такой записи нет в текущем каталоге Slotfolio.",
      path: "/slots",
      image: "/images/unavailable.svg",
      noIndex: true,
    });
  }

  const research = getVerifiedCatalogResearch(slot.slug);
  const details = getVerifiedCatalogDetails(slot.slug);
  const gameType = getVerifiedCatalogGameType(slot.slug);
  const mechanicsText = research?.mechanics.length
    ? ` Механики: ${research.mechanics.join(", ")}.`
    : "";
  const gameTypeText = gameType ? ` Тип игры: ${gameType.gameType}.` : "";
  const technicalText = details
    ? ` RTP ${details.rtp ?? "не указан"}${details.maxWin ? `, максимум ${details.maxWin}` : ""}${details.releaseDate ? `, релиз ${displayDate(details.releaseDate)}` : ""}.`
    : "";

  return pageMetadata({
    title: `${slot.name} от ${slot.provider}`,
    description: `${slot.name} от ${slot.provider}.${mechanicsText}${gameTypeText}${technicalText}`,
    path: `/slots/catalog/${slot.slug}`,
    image: "/images/unavailable.svg",
    noIndex: true,
  });
}

export default async function CatalogSlotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slot = getCatalogSeed((await params).slug);
  if (!slot) notFound();
  const research = getVerifiedCatalogResearch(slot.slug);
  const details = getVerifiedCatalogDetails(slot.slug);
  const gameType = getVerifiedCatalogGameType(slot.slug);
  const knownMechanics = research?.mechanics ?? [];
  const releaseDate = displayDate(details?.releaseDate);
  const primarySource = details?.source ?? gameType?.source ?? slot.source;
  const releaseDateSource = details?.releaseDateSource ?? null;
  const volatilitySource = details?.volatilitySource ?? null;
  const hasSeparateReleaseDateSource = Boolean(
    details?.releaseDate && releaseDateSource && releaseDateSource !== primarySource,
  );
  const hasSeparateVolatilitySource = Boolean(
    details?.volatility && volatilitySource && volatilitySource !== primarySource,
  );
  const hasSeparateParameterSource = hasSeparateReleaseDateSource || hasSeparateVolatilitySource;

  const providerItems = catalogModel.items
    .filter((item) => item.slug !== slot.slug && item.provider === slot.provider)
    .sort(sortUsefulFirst)
    .slice(0, 6);
  const providerItemSlugs = new Set(providerItems.map((item) => item.slug));
  const mechanicItems = knownMechanics.length
    ? catalogModel.items
        .filter(
          (item) =>
            item.slug !== slot.slug &&
            !providerItemSlugs.has(item.slug) &&
            item.mechanics.some((mechanic) => knownMechanics.includes(mechanic)),
        )
        .sort((a, b) => {
          const aOverlap = a.mechanics.filter((mechanic) => knownMechanics.includes(mechanic)).length;
          const bOverlap = b.mechanics.filter((mechanic) => knownMechanics.includes(mechanic)).length;
          return bOverlap - aOverlap || sortUsefulFirst(a, b);
        })
        .slice(0, 6)
    : [];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/slots" },
          { label: slot.name },
        ]}
      />
      <article className="catalog-record-page">
        <header className="catalog-record-heading">
          <h1>{slot.name}</h1>
          <Link className="provider-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>{slot.provider} ↗</Link>
        </header>

        <div className="catalog-record-body">
          <section aria-labelledby="record-facts">
            <h2 id="record-facts">Характеристики</h2>
            <dl className="catalog-record-facts">
              <div><dt>Название</dt><dd>{slot.name}</dd></div>
              <div><dt>Провайдер</dt><dd><Link href={`/slots?provider=${providerSlug(slot.provider)}`}>{slot.provider}</Link></dd></div>
              {gameType ? <div><dt>Тип игры</dt><dd>{gameType.gameType}</dd></div> : null}
              {knownMechanics.length ? (
                <div>
                  <dt>Механика</dt>
                  <dd>
                    {knownMechanics.map((mechanic, index) => (
                      <span key={mechanic}>
                        {index ? " · " : ""}
                        <Link href={`/slots?mechanic=${encodeURIComponent(mechanic)}`}>{mechanic}</Link>
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
              {details?.field ? <div><dt>Поле</dt><dd>{details.field}</dd></div> : null}
              {details?.rtp ? <div><dt>RTP</dt><dd>{details.rtp}</dd></div> : null}
              {details?.maxWin ? <div><dt>Макс. выигрыш</dt><dd>{details.maxWin}</dd></div> : null}
              {details?.volatility ? <div><dt>Волатильность</dt><dd>{details.volatility}</dd></div> : null}
              {releaseDate ? <div><dt>Дата релиза</dt><dd>{releaseDate}</dd></div> : null}
              <div>
                <dt>{hasSeparateParameterSource ? "Источник параметров" : "Источник"}</dt>
                <dd><a href={primarySource} rel="noreferrer">Официальный каталог ↗</a></dd>
              </div>
              {hasSeparateReleaseDateSource ? (
                <div>
                  <dt>Источник даты релиза</dt>
                  <dd><a href={releaseDateSource!} rel="noreferrer">Официальная публикация ↗</a></dd>
                </div>
              ) : null}
              {hasSeparateVolatilitySource ? (
                <div>
                  <dt>Источник волатильности</dt>
                  <dd><a href={volatilitySource!} rel="noreferrer">Официальный рейтинг ↗</a></dd>
                </div>
              ) : null}
            </dl>
          </section>
        </div>

        <nav className="catalog-record-next" aria-label="Продолжить изучение">
          <Link className="text-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>Все игры {slot.provider} ↗</Link>
          {knownMechanics.map((mechanic) => (
            <Link className="text-link" href={`/slots?mechanic=${encodeURIComponent(mechanic)}`} key={mechanic}>{mechanic} в каталоге ↗</Link>
          ))}
          <Link className="text-link" href="/slots">Весь каталог ↗</Link>
        </nav>

        {providerItems.length ? (
          <section aria-labelledby="provider-related">
            <div className="section-title">
              <h2 id="provider-related">Ещё у {slot.provider}</h2>
              <Link className="text-link" href={`/slots?provider=${providerSlug(slot.provider)}`}>Все игры ↗</Link>
            </div>
            <RelatedGames items={providerItems} />
          </section>
        ) : null}

        {mechanicItems.length ? (
          <section aria-labelledby="mechanic-related">
            <div className="section-title">
              <h2 id="mechanic-related">Похожие по механике</h2>
              <Link className="text-link" href={`/slots?mechanic=${encodeURIComponent(knownMechanics[0])}`}>Открыть фильтр ↗</Link>
            </div>
            <RelatedGames items={mechanicItems} />
          </section>
        ) : null}
      </article>
    </>
  );
}
