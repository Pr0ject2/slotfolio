import Link from "next/link";
import { CompareButton } from "./compare-button";
import { GameImage } from "./editorial-client";
import type { CatalogItem } from "@/lib/catalog-query";
import { getCatalogArtwork } from "@/lib/catalog-artwork";
import styles from "./catalog-game-card.module.css";
import { hasEnglishDossier } from "@/lib/english-dossier-routes";
import { hasEnglishCatalogRecord } from "@/lib/english-catalog-record-routes";
import { englishCatalogFact } from "@/lib/english-catalog-facts";

function displayRelease(value: string) {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[1]}.${parts[0]}`;
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

function displayYear(item: CatalogItem) {
  if (item.year) return String(item.year);
  return /^\d{4}/.test(item.releaseDate) ? item.releaseDate.slice(0, 4) : "";
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

const englishVolatility: Record<string, string> = {
  "Низкая": "Low", "Средняя": "Medium", "Высокая": "High",
  "Очень высокая": "Very high", "Экстремальная": "Extreme",
};
const englishTags: Record<string, string> = {
  "Свободные вращения": "Free spins", "Множители": "Multipliers",
  "Каскады": "Cascades", "Шкала прогресса": "Progress meter",
  "Преобразование символов": "Symbol transformations",
  "Расширяющийся символ": "Expanding symbol", "Book-бонус": "Book bonus",
  "Закрепляющийся wild": "Sticky wild", "Сбор значений": "Value collection",
  "Золотые клетки": "Golden positions",
};
type DisplayFact = {
  label: string;
  value: string;
};

function displayFacts(item: CatalogItem, locale: "ru" | "en"): DisplayFact[] {
  const facts: DisplayFact[] = [
    { label: locale === "en" ? "Type" : "Тип", value: locale === "en" ? item.gameType : russianGameType(item.gameType) },
    { label: locale === "en" ? "Grid" : "Поле", value: item.field },
    { label: "RTP", value: item.verifiedRtp },
    { label: locale === "en" ? "Max. win" : "Макс.", value: item.maxWin },
    { label: locale === "en" ? "Volatility" : "Волат.", value: locale === "en" ? (englishVolatility[item.verifiedVolatility] ?? item.verifiedVolatility) : item.verifiedVolatility },
    { label: locale === "en" ? "Release" : "Релиз", value: item.releaseDate ? displayRelease(item.releaseDate) : "" },
  ];

  return facts.filter((fact) => Boolean(fact.value)).map(fact =>
    locale === "en" ? { ...fact, value: englishCatalogFact(fact.value) } : fact);
}

export function CatalogGameCard({ item, number, locale = "ru" }: { item: CatalogItem; number: number; locale?: "ru" | "en" }) {
  const href = item.coverage === "dossier" ? `/slots/${item.slug}` : `/slots/catalog/${item.slug}`;
  const englishDossier = locale === "en" && hasEnglishDossier(item.slug);
  const englishCatalogRecord = locale === "en" && item.coverage === "catalog" && hasEnglishCatalogRecord(item.slug);
  const destination = englishDossier ? `/en/slots/${item.slug}` : englishCatalogRecord ? `/en/slots/catalog/${item.slug}` : href;
  const year = displayYear(item);
  const facts = displayFacts(item, locale);
  const mappedArtwork = item.coverage === "catalog" ? getCatalogArtwork(item.slug) : null;
  const resolvedImage = mappedArtwork ?? item.image;
  const hasArtwork = item.coverage === "dossier" || resolvedImage !== "/images/unavailable.svg";

  return (
    <article
      className={`catalog-game ${item.coverage === "catalog" ? "catalog-only" : ""} ${styles.card}`}
      data-slot={item.slug}
      data-card-number={number}
      data-coverage={item.coverage}
      data-verified-facts={item.verifiedFacts}
    >
      {hasArtwork ? <Link className={`catalog-game-art ${styles.art}`} href={destination} aria-label={locale === "en" ? `Open ${item.name}${(englishDossier || englishCatalogRecord) ? "" : " (Russian)"}` : `Открыть ${item.name}`}><GameImage slot={{ ...item, image: resolvedImage }} /></Link> : null}

      <div className="catalog-game-copy">
        <div className={styles.metaRow}>
          <span className={styles.number} aria-label={locale === "en" ? `Catalogue entry ${number}` : `Номер карточки ${number}`}>№ {number}</span>
          <span className="eyebrow">
            {item.provider}{year ? ` / ${year}` : ""}
          </span>
        </div>

        <h2><Link href={destination}>{item.name}</Link></h2>
        {locale === "en" && !englishDossier && !englishCatalogRecord ? <span className="eyebrow" lang="en">Game details in Russian</span> : null}

        {item.coverage === "dossier" && (
          locale === "en" && englishDossier
            ? <p lang="en">Read about the rules, bonus features and game information.</p>
            : <p lang={locale === "en" ? "ru" : undefined}>{item.description}</p>
        )}

        {item.mechanics.length ? (
          <div className={styles.mechanics} aria-label={locale === "en" ? "Mechanics" : "Механики"}>
            {item.mechanics.map((mechanic) => {
              const label = locale === "en" ? englishCatalogFact(mechanic) : mechanic;
              return <span key={mechanic} lang={locale === "en" && /[А-Яа-яЁё]/.test(label) ? "ru" : undefined}>{label}</span>;
            })}
          </div>
        ) : null}

        {facts.length > 0 && <dl className={styles.facts} aria-label={locale === "en" ? "Game details" : "Характеристики"}>
          {facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>}

        {item.coverage === "dossier" && item.tags.length ? (
          <div className={`catalog-game-tags ${styles.tags}`} aria-label={locale === "en" ? "Game features" : "Особенности игры"}>
            {item.tags.slice(0, 3).map((tag) => {
              const label = locale === "en" ? (englishTags[tag] ?? englishCatalogFact(tag)) : tag;
              return <span key={tag} lang={locale === "en" && /[А-Яа-яЁё]/.test(label) ? "ru" : undefined}>{label}</span>;
            })}
          </div>
        ) : null}

        <div className={`catalog-game-data ${styles.actions}`}>
          {item.coverage === "dossier" ? (
            <CompareButton slug={item.slug} name={item.name} locale={locale} />
          ) : (
            <Link className={styles.openRecord} href={destination}>{locale === "en" ? (englishCatalogRecord ? "Game details ↗" : "Game details (Russian) ↗") : "Подробнее об игре ↗"}</Link>
          )}
        </div>
      </div>

      <Link className="catalog-open" href={destination} aria-label={locale === "en" ? `Open ${item.name}${englishDossier || englishCatalogRecord ? "" : " (Russian)"}` : `Открыть ${item.name}`}>↗</Link>
    </article>
  );
}
