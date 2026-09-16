import Link from "next/link";
import { CompareButton } from "./compare-button";
import { GameImage } from "./editorial-client";
import type { CatalogItem } from "@/lib/catalog-query";
import styles from "./catalog-game-card.module.css";

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

function factWord(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "параметр";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "параметра";
  return "параметров";
}

function coverageText(item: CatalogItem) {
  if (item.coverage === "dossier") return "Полное досье";
  if (item.verifiedFacts > 0) return `Проверено ${item.verifiedFacts} ${factWord(item.verifiedFacts)}`;
  return "Базовые данные проверены";
}

type DisplayFact = {
  label: string;
  value: string;
};

function displayFacts(item: CatalogItem): DisplayFact[] {
  const facts: DisplayFact[] = [
    { label: "Тип", value: item.gameType },
    { label: "Поле", value: item.field },
    { label: "RTP", value: item.verifiedRtp },
    { label: "Макс.", value: item.maxWin },
    { label: "Волат.", value: item.verifiedVolatility },
    { label: "Релиз", value: item.releaseDate ? displayRelease(item.releaseDate) : "" },
  ];

  return facts.filter((fact) => Boolean(fact.value));
}

export function CatalogGameCard({ item }: { item: CatalogItem }) {
  const href = item.coverage === "dossier" ? `/slots/${item.slug}` : `/slots/catalog/${item.slug}`;
  const year = displayYear(item);
  const facts = displayFacts(item);

  return (
    <article
      className={`catalog-game ${item.coverage === "catalog" ? "catalog-only" : ""} ${styles.card}`}
      data-coverage={item.coverage}
      data-verified-facts={item.verifiedFacts}
    >
      <Link className={`catalog-game-art ${styles.art}`} href={href} aria-label={`Открыть ${item.name}`}>
        {item.coverage === "dossier" ? (
          <GameImage slot={item} />
        ) : (
          <span className={styles.artFallback} aria-hidden="true">
            <span className={styles.artProvider}>{item.provider}</span>
            <strong className={styles.artTitle}>{item.name}</strong>
            <span className={styles.artNote}>{year ? `релиз ${year}` : "официальная запись"}</span>
          </span>
        )}
      </Link>

      <div className="catalog-game-copy">
        <div className={styles.metaRow}>
          <span className="eyebrow">
            {item.provider}{year ? ` / ${year}` : ""}
          </span>
          <span className={styles.coverage}>{coverageText(item)}</span>
        </div>

        <h2><Link href={href}>{item.name}</Link></h2>

        {item.coverage === "dossier" ? <p>{item.description}</p> : null}

        {item.mechanics.length ? (
          <div className={styles.mechanics} aria-label="Подтверждённые механики">
            {item.mechanics.map((mechanic) => <span key={mechanic}>{mechanic}</span>)}
          </div>
        ) : null}

        {facts.length > 0 && <dl className={styles.facts} aria-label="Подтверждённые характеристики">
          {facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>}

        {item.coverage === "catalog" && facts.length < 6 && (
          <p className={styles.pending}>
            {facts.length
              ? "Остальные характеристики не подтверждены."
              : "Технические характеристики пока не подтверждены."}
            {!item.mechanics.length && " Механика уточняется."}
          </p>
        )}

        {item.coverage === "dossier" && item.tags.length ? (
          <div className={`catalog-game-tags ${styles.tags}`} aria-label="Особенности игры">
            {item.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        ) : null}

        <div className={`catalog-game-data ${styles.actions}`}>
          {item.coverage === "dossier" ? (
            <CompareButton slug={item.slug} name={item.name} />
          ) : (
            <Link className={styles.openRecord} href={href}>Открыть запись ↗</Link>
          )}
        </div>
      </div>

      <Link className="catalog-open" href={href} aria-label={`Открыть ${item.name}`}>↗</Link>
    </article>
  );
}
