import Link from "next/link";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { englishJournalGuides } from "@/lib/english-journal-guides";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/journal/guides.module.css";

export const metadata = pageMetadata({
  title: "Slotfolio journal: game rules and practical guides",
  description: "Practical explainers about paytables, payout systems and RTP, with sourced examples and no promises about future winnings.",
  path: "/en/journal",
  previewOnly: true,
});

export default function EnglishJournal() {
  return (
    <>
      <EnglishBreadcrumbs items={[{ label: "Journal and guides" }]} />
      <div className="page-heading">
        <div>
          <span className="eyebrow accent">Mechanics, paytables and RTP</span>
          <h1>Journal and guides</h1>
        </div>
        <p>Understand how slot games work, what RTP can and cannot tell you, and which rules are worth checking.</p>
      </div>
      <section className="feature-band" style={{ marginTop: 0 }}>
        <div className="feature-band-title">
          <span className="eyebrow">Featured explanation</span>
          <h2><Link href="/en/journal/how-cascades-work">One spin.<br /><em>Several events.</em></Link></h2>
          <p>What happens when matching symbols are removed and one paid round continues through cascades.</p>
          <Link className="text-link" href="/en/journal/how-cascades-work">Read the cascades feature ↗</Link>
        </div>
        <div className="cascade-art" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div className="cascade-column" key={i}>
              <span>◆</span><span className={i === 1 ? "falling" : ""}>{i === 1 ? "↓" : "✦"}</span><span>◆</span>
            </div>
          ))}
          <small>BEHIND THE RULES</small>
        </div>
      </section>
      <section className={styles.index} aria-labelledby="rules-guides">
        <h2 id="rules-guides">Getting to grips with the rules</h2>
        <div className={styles.list}>
          {englishJournalGuides.map(guide => (
            <article className={styles.item} key={guide.slug}>
              <span className="eyebrow accent">{guide.category}</span>
              <h3><Link href={`/en/journal/${guide.slug}`}>{guide.title}</Link></h3>
              <p>{guide.description}</p>
              <Link className="text-link" href={`/en/journal/${guide.slug}`}>Read guide ↗</Link>
            </article>
          ))}
        </div>
      </section>
      <div className="hub-list">
        <Link href="/en/journal/understanding-rtp">
          <span className="number">Guide</span>
          <h2>What RTP actually means</h2>
          <p>Why a 96% theoretical return does not mean you'll recover 96% of a deposit in one session.</p>
          <b aria-hidden="true">↗</b>
        </Link>
        <Link href="/en/mechanics">
          <span className="number">Explore</span>
          <h2>Game mechanics</h2>
          <p>Find explanations of paylines, clusters, cascades and other documented rules.</p>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
      <p className="data-note">All five practical journal guides, the RTP explainer and the in-depth cascades feature are now available in English.</p>
    </>
  );
}
