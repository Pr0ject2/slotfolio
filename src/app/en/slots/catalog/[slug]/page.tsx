import Link from "next/link";
import { notFound } from "next/navigation";
import { SlotArtwork } from "@/components/slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { createCatalogModel } from "@/lib/catalog-index";
import { pageMetadata } from "@/lib/seo";
import { englishCatalogRecordSlugs, hasEnglishCatalogRecord } from "@/lib/english-catalog-record-routes";
import type { CatalogItem } from "@/lib/catalog-query";

export const dynamicParams = false;

const catalog = createCatalogModel();
const published = new Map(catalog.items.filter((item) => item.coverage === "catalog").map((item) => [item.slug, item]));

const mechanicsInEnglish: Record<string, string> = {
  "Каскады": "Cascades",
  "Кластеры": "Cluster pays",
  "Линии": "Paylines",
  "Способы": "Ways to win",
  "Сбор символов": "Symbol collection",
};
const volatilityInEnglish: Record<string, string> = {
  "Низкая": "Low",
  "Средняя": "Medium",
  "Высокая": "High",
  "Очень высокая": "Very high",
  "Экстремальная": "Extreme",
  "Настраиваемая": "Configurable",
};

export function generateStaticParams() {
  return englishCatalogRecordSlugs.map((slug) => ({ slug }));
}

function getRecord(slug: string): CatalogItem | undefined {
  return hasEnglishCatalogRecord(slug) ? published.get(slug) : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = getRecord(slug);
  return pageMetadata({
    title: record ? `${record.name} | Catalogue facts and original source` : "Catalogue record unavailable",
    description: record
      ? `${record.name} by ${record.provider}: source-linked catalogue facts. Unverified game characteristics are deliberately omitted.`
      : "No verified English catalogue record is available.",
    path: `/en/slots/catalog/${slug}`,
    noIndex: true,
    image: record?.image === "/images/unavailable.svg" ? undefined : record?.image,
  });
}

export default async function EnglishCatalogRecord({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRecord(slug);
  if (!item) notFound();

  const facts = [
    ["Publisher", item.provider],
    ["Game type", item.gameType],
    ["Grid", item.field],
    ["Published RTP (where verified)", item.verifiedRtp],
    ["Published maximum win (where verified)", item.maxWin],
    ["Volatility (where verified)", volatilityInEnglish[item.verifiedVolatility] ?? item.verifiedVolatility],
    ["Release date (where verified)", item.releaseDate],
  ].filter(([, value]) => Boolean(value));

  return (
    <>
      <nav aria-label="Breadcrumbs" className="breadcrumbs" lang="en">
        <Link href="/en">Home</Link> / <Link href="/en/slots">Catalogue</Link> / <span aria-current="page">{item.name}</span>
      </nav>
      <div className="slot-heading">
        <div>
          <span className="eyebrow accent">Source-linked catalogue record</span>
          <h1>{item.name}</h1>
          <p>{item.provider}</p>
        </div>
      </div>
      <div className="slot-intro">
        <figure className="slot-figure">
          <SlotArtwork src={withBasePath(item.image)} alt={`${item.name} game artwork`} width={600} height={420} loading="lazy" />
          <figcaption>Catalogue artwork · {item.name}</figcaption>
        </figure>
        <div className="slot-summary">
          <span className="eyebrow">Documented details only</span>
          <p className="slot-deck">
            {item.name} is a game listed by {item.provider}. This English record includes only characteristics
            supported by the existing Slotfolio research. Blank fields are not estimates.
          </p>
          {facts.length > 0 ? (
            <dl className="facts">
              {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          ) : <p>Additional technical characteristics are not yet verified for this catalogue record.</p>}
          {item.mechanics.length > 0 && (
            <div>
              <h2>Documented mechanics</h2>
              <ul>
                {item.mechanics.map((mechanic) => {
                  const translated = mechanicsInEnglish[mechanic];
                  return <li key={mechanic} lang={translated ? "en" : "ru"}>{translated ?? mechanic}</li>;
                })}
              </ul>
            </div>
          )}
          <p className="data-note">
            RTP and other figures can vary by game configuration and operator. Check the in-game paytable.
            A published figure cannot predict the result of a playing session.
          </p>
        </div>
      </div>
      <div className="article-layout slot-body">
        <article className="prose">
          <section>
            <h2>What this record covers</h2>
            <p>This is an English technical summary, not a translated full review. No bonus rules, RTP options,
              release dates or maximum wins are inferred where source-backed information is missing.</p>
            <p><Link href={`/slots/catalog/${slug}`} hrefLang="ru">Read the extended original record (Russian) ↗</Link></p>
          </section>
          <section>
            <h2>Source and verification</h2>
            <p>Slotfolio's published catalogue entry links to the provider reference below. Any game details
              should be checked against the version offered by your operator.</p>
            {item.source && <p><a href={item.source} target="_blank" rel="noopener noreferrer">Open the recorded publisher source ↗</a></p>}
            <p><Link href="/en/editorial-policy">Editorial policy</Link> · <Link href="/en/responsible-gaming">Safer gambling</Link></p>
          </section>
        </article>
      </div>
    </>
  );
}
