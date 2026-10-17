import Link from "next/link";
import { englishMechanicSlugs, englishMechanic } from "@/lib/english-entities";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Slot mechanics: paylines, clusters, cascades and collection",
  description:
    "How slot payouts form, how grids change and what to check in each game's rules. Examples from the existing game guides.",
  path: "/en/mechanics",
});
export default function Page() {
  return (
    <>
      <EnglishBreadcrumbs items={[{ label: "Mechanics" }]} />
      <div className="page-heading">
        <div>
          <span className="eyebrow accent">Rules reference</span>
          <h1>How the game works</h1>
        </div>
        <p>
          Follow how wins form
          <br />
          and what happens next.
        </p>
      </div>
      <div className="hub-lead">
        <p className="big-serif">
          What happens after you press <em>Spin?</em>
        </p>
        <div className="hub-lead-copy">
          <p>
            Different-looking games can use the same payout rule. Similar reels
            can conceal different rules.
          </p>
          <p>
            Start by identifying how combinations form, how symbols change and
            what triggers the bonus. A mechanic does not, by itself, tell you
            the RTP or the chance of winning.
          </p>
        </div>
      </div>
      <div className="hub-list">
        {englishMechanicSlugs.map((slug, i) => {
          const m = englishMechanic(slug)!;
          return (
            <Link key={slug} href={`/en/mechanics/${slug}`}>
              <span className="number">{String(i + 1).padStart(2, "0")}</span>
              <h2>{m.name}</h2>
              <p>{m.text}</p>
              <b aria-hidden="true">↗</b>
            </Link>
          );
        })}
      </div>
    </>
  );
}
