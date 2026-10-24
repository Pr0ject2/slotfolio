import Link from "next/link";
import { CompareButton } from "./compare-button";
import { GameImage } from "./editorial-client";
import type { CatalogItem } from "@/lib/catalog-query";
import { getCatalogArtwork } from "@/lib/catalog-artwork";
import styles from "./catalog-game-card.module.css";
import { hasEnglishDossier } from "@/lib/english-dossier-routes";
import { hasEnglishCatalogRecord } from "@/lib/english-catalog-record-routes";
import { englishCatalogFact } from "@/lib/english-catalog-facts";
import { spanishCatalogFact } from "@/lib/spanish-catalog-facts";
import type { SiteLocale } from "@/lib/locales";
import { SlotArtwork } from "./slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { hasSpanishCatalogRecord } from "@/lib/spanish-catalog-record-routes";
import { hasSpanishDossier } from "@/lib/spanish-dossier-routes";

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

function displayFacts(item: CatalogItem, locale: SiteLocale): DisplayFact[] {
  if (locale === "es") {
    const labels: Record<string, string> = { Type: "Tipo", Grid: "Tablero", RTP: "RTP", "Max. win": "Premio máx.", Volatility: "Volatilidad", Release: "Lanzamiento" };
    return displayFacts(item, "en").map(fact => ({ label: labels[fact.label], value: spanishCatalogFact(fact.value) }));
  }
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

export function CatalogGameCard({ item, number, locale = "ru" }: { item: CatalogItem; number: number; locale?: SiteLocale }) {
  const href = item.coverage === "dossier" ? `/slots/${item.slug}` : `/slots/catalog/${item.slug}`;
  const englishDossier = locale !== "ru" && hasEnglishDossier(item.slug);
  const englishCatalogRecord = locale !== "ru" && item.coverage === "catalog" && hasEnglishCatalogRecord(item.slug);
  const spanish = locale === "es";
  const spanishRecord = spanish && item.coverage === "catalog" && hasSpanishCatalogRecord(item.slug);
  const spanishDossier = spanish && item.coverage === "dossier" && hasSpanishDossier(item.slug);
  const spanishReady = spanishRecord || spanishDossier;
  if (spanish && !spanishReady) throw new Error(`Missing complete Spanish game: ${item.slug}`);
  const destination = spanishDossier ? `/es/slots/${item.slug}` : spanishRecord ? `/es/slots/catalog/${item.slug}` : englishDossier ? `/en/slots/${item.slug}` : englishCatalogRecord ? `/en/slots/catalog/${item.slug}` : href;
  const openLabel = spanish ? `Abrir ${item.name}${spanishReady ? "" : " (en inglés)"}` : locale === "en" ? `Open ${item.name}${englishDossier || englishCatalogRecord ? "" : " (Russian)"}` : `Открыть ${item.name}`;
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
      {hasArtwork ? <Link className={`catalog-game-art ${styles.art}`} href={destination} aria-label={openLabel}>{spanish ? <SlotArtwork className="game-image" src={withBasePath(resolvedImage)} alt={`Imagen de ${item.name}`} width={500} height={280} loading="lazy" decoding="async" /> : <GameImage slot={{ ...item, image: resolvedImage }} />}</Link> : null}

      <div className={`catalog-game-copy ${styles.copy}`}>
        <div className={styles.metaRow}>
          <span className={styles.number} aria-label={spanish ? `Juego ${number}` : locale === "en" ? `Catalogue entry ${number}` : `Номер карточки ${number}`}>№ {number}</span>
          <span className="eyebrow">
            {item.provider}{year ? ` / ${year}` : ""}
          </span>
        </div>

        <h2><Link href={destination} aria-label={spanish ? openLabel : undefined}>{item.name}</Link></h2>
        {spanish && !spanishReady && <span className="eyebrow" lang="es">Ficha del juego en inglés</span>}
        {locale === "en" && !englishDossier && !englishCatalogRecord ? <span className="eyebrow" lang="en">Game details in Russian</span> : null}

        {item.coverage === "dossier" && (
          spanish ? <p lang="es">Consulta las reglas, las funciones del bonus y la información del juego.</p> : locale === "en" && englishDossier
            ? <p lang="en">Read about the rules, bonus features and game information.</p>
            : <p lang={locale === "en" ? "ru" : undefined}>{item.description}</p>
        )}

        {item.mechanics.length ? (
          <div className={styles.mechanics} aria-label={spanish ? "Mecánicas" : locale === "en" ? "Mechanics" : "Механики"}>
            {item.mechanics.map((mechanic) => {
              const label = spanish ? spanishCatalogFact(mechanic) : locale === "en" ? englishCatalogFact(mechanic) : mechanic;
              return <span key={mechanic} lang={locale === "en" && /[А-Яа-яЁё]/.test(label) ? "ru" : undefined}>{label}</span>;
            })}
          </div>
        ) : null}

        {facts.length > 0 && <dl className={styles.facts} aria-label={spanish ? "Características" : locale === "en" ? "Game details" : "Характеристики"}>
          {facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>}

        {item.coverage === "dossier" && item.tags.length ? (
          <div className={`catalog-game-tags ${styles.tags}`} aria-label={spanish ? "Funciones del juego" : locale === "en" ? "Game features" : "Особенности игры"}>
            {item.tags.slice(0, 3).map((tag) => {
              const label = spanish ? spanishCatalogFact(tag) : locale === "en" ? (englishTags[tag] ?? englishCatalogFact(tag)) : tag;
              return <span key={tag} lang={locale === "en" && /[А-Яа-яЁё]/.test(label) ? "ru" : undefined}>{label}</span>;
            })}
          </div>
        ) : null}

        <div className={`catalog-game-data ${styles.actions}`}>
          {item.coverage === "dossier" ? (
            <CompareButton slug={item.slug} name={item.name} locale={locale} />
          ) : (
            <Link className={styles.openRecord} href={destination}>{spanish ? spanishRecord ? "Ver juego ↗" : "Ver juego (en inglés) ↗" : locale === "en" ? (englishCatalogRecord ? "Game details ↗" : "Game details (Russian) ↗") : "Подробнее об игре ↗"}</Link>
          )}
        </div>
      </div>

      <Link className="catalog-open" href={destination} aria-label={openLabel}>↗</Link>
    </article>
  );
}
