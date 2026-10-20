import Link from "next/link";
import { getSlot } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { retiredSlotLinks, type RetiredSlotSlug } from "@/lib/retired-slot-links";
import { GameRow } from "./editorial";
import { EnglishGameRow } from "./english-entity-profile";

type Locale = "ru" | "en";

export function retiredSlotMetadata(slug: RetiredSlotSlug, locale: Locale) {
  const entry = retiredSlotLinks[slug];
  return pageMetadata({
    title: locale === "en" ? `${entry.series}: choose a game edition` : `${entry.series}: выберите версию игры`,
    description: locale === "en" ? `Open the exact ${entry.series} edition to check its rules and features.` : `Выберите точное издание ${entry.series}, чтобы проверить его правила и особенности.`,
    path: `${locale === "en" ? "/en" : ""}/slots/${slug}`,
    noIndex: true,
  });
}

export function RetiredSlotLink({ slug, locale }: { slug: RetiredSlotSlug; locale: Locale }) {
  const entry = retiredSlotLinks[slug];
  const en = locale === "en";
  const catalog = en ? "/en/slots" : "/slots";
  return (
    <>
      <nav className="breadcrumbs" aria-label={en ? "Breadcrumbs" : "Хлебные крошки"}>
        <Link href={en ? "/en" : "/"}>{en ? "Home" : "Главная"}</Link>
        <span aria-hidden="true">/</span>
        <Link href={catalog}>{en ? "Catalog" : "Каталог"}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{entry.name}</span>
      </nav>
      <div className="page-heading utility-heading">
        <div>
          <span className="eyebrow accent">{entry.series}</span>
          <h1>{en ? "Choose a game edition" : "Выберите версию игры"}</h1>
        </div>
        <p>{en
          ? `The old link “${entry.name}” is no longer used. These are distinct ${entry.series} editions; open the exact title to check its rules.`
          : `Старая ссылка «${entry.name}» больше не используется. Ниже — разные издания ${entry.series}. Выберите точное название, чтобы проверить его правила.`}</p>
      </div>
      <div className="game-list" aria-label={en ? "Available game editions" : "Доступные издания игры"}>
        {entry.games.map((gameSlug, index) => {
          const game = getSlot(gameSlug);
          if (!game) throw new Error(`Missing published edition for retired link: ${gameSlug}`);
          return en ? <EnglishGameRow key={gameSlug} game={game} index={index} compare={false} /> : <GameRow key={gameSlug} slot={game} index={index} />;
        })}
      </div>
      <p className="source-note"><Link className="text-link" href={catalog}>{en ? "Browse all games ↗" : "Смотреть все игры ↗"}</Link></p>
    </>
  );
}
