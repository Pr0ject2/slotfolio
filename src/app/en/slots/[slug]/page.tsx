import Link from "next/link";
import { notFound } from "next/navigation";
import { getSlot } from "@/lib/data";
import { GameImage } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { englishDossierBatch } from "@/lib/english-dossier-batch-20261016";
import { englishDossierBatch25 } from "@/lib/english-dossier-batch25-20261016";
const englishDossiers: Record<string, { introduction?: string; rules: string; feature: string; perspective: string }> = { ...englishDossierBatch, ...englishDossierBatch25 };

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(englishDossiers).map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getSlot(slug);
  const copy = englishDossiers[slug];
  return pageMetadata({
    title: game && copy ? `${game.name}: rules, features and RTP explained` : "Game unavailable",
    description: game && copy ? (copy.introduction ?? copy.rules) : "No English guide is available for this game.",
    path: `/en/slots/${slug}`,
    openGraphType: "article",
    noIndex: true,
  });
}
export default async function EnglishGameDossier({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const copy = englishDossiers[slug];
  const game = getSlot(slug);
  if (!copy || !game) notFound();
  return (
    <>
      <nav aria-label="Breadcrumbs" className="breadcrumbs">
        <Link href="/en">Home</Link> / <Link href="/en/slots">Catalogue</Link> / <span aria-current="page">{game.name}</span>
      </nav>
      <div className="slot-heading">
        <div><span className="eyebrow accent">Game guide / {game.year}</span><h1>{game.name}</h1>
          <p>{game.provider}</p>
        </div>
      </div>
      <div className="slot-intro">
        <figure className="slot-figure"><GameImage slot={game} priority /><figcaption>Game artwork · {game.provider} · {game.name}</figcaption></figure>
        <div className="slot-summary">
          <span className="eyebrow">At a glance</span>
          <p className="slot-deck">{copy.introduction ?? copy.rules}</p>
          <dl className="facts">
            <div><dt>Publisher</dt><dd>{game.provider}</dd></div>
            <div><dt>Release year</dt><dd>{game.year}</dd></div>
            <div><dt>Grid</dt><dd>{game.field}</dd></div>
            <div><dt>Published RTP in Slotfolio</dt><dd>{game.rtp}</dd></div>
            <div><dt>Volatility</dt><dd>{({ "Низкая": "Low", "Средняя": "Medium", "Высокая": "High", "Очень высокая": "Very high", "Экстремальная": "Extreme" } as Record<string, string>)[game.volatility] ?? game.volatility}</dd></div>
          </dl>
          <p className="data-note">These figures describe the documented game version, not a guaranteed return. RTP may vary by configuration or operator. Check the rules and paytable of the version available to you.</p>
        </div>
      </div>
      <div className="article-layout slot-body">
        <aside className="article-toc" aria-label="On this page">
          <span className="eyebrow">Contents</span>
          <a href="#rules">How wins work</a>
          <a href="#feature">Key feature</a>
          <a href="#perspective">Editorial perspective</a>
          <a href="#source">Sources and risks</a>
        </aside>
        <article className="prose">
          <section id="rules"><h2>How wins work</h2><p>{copy.rules}</p></section>
          <section id="feature"><h2>Key feature</h2><p>{copy.feature}</p></section>
          <section id="perspective"><h2>Editorial perspective</h2><p>{copy.perspective}</p>
            <p>Volatility does not predict the result of any individual spin. A published RTP is a theoretical long-run figure, not a return promised to a player.</p>
          </section>
          <section id="source"><h2>Sources and risks</h2>
            <p>This guide uses the Slotfolio dossier and its recorded publisher reference. If the game has several RTP settings or variants, the applicable in-game rules take precedence.</p>
            <p>Gambling can result in losing the money you stake. <Link href="/en/responsible-gaming">Safer gambling information</Link> · <Link href="/en/editorial-policy">Editorial policy</Link></p>
          </section>
        </article>
      </div>
    </>
  );
}
