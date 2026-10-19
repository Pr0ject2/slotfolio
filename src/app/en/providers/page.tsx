import Link from "next/link";
import { providerProfiles, slots } from "@/lib/data";
import { catalogStats } from "@/lib/catalog-stats";
import { englishProvider } from "@/lib/english-entities";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Slot publishers and their games",
  description:
    "Compare the payout rules, grids and bonuses in Slotfolio's selected game guides by publisher.",
  path: "/en/providers",
});
export default function Page() {
  return (
    <>
      <EnglishBreadcrumbs
        items={[
          { label: "Catalogue", href: "/en/slots" },
          { label: "Publishers" },
        ]}
      />
      <div className="page-heading utility-heading provider-heading">
        <div>
          <span className="eyebrow accent">Studios and their games</span>
          <h1>Who makes the games?</h1>
        </div>
        <p>
          Choose a studio to explore its games
          <br />
          and compare their rules.
        </p>
      </div>
      <div className="provider-index-lead">
        <p className="big-serif">
          Games from one studio can work very differently.
        </p>
        <div>
          <p>
            Open a studio profile for its recurring mechanics and featured
            games. The guide counts refer to the games featured in each profile.
          </p>
          <Link href="/en/compare" className="text-link">
            Compare games from different studios ↗
          </Link>
        </div>
      </div>
      <div
        className="provider-index"
        aria-label="Publishers in the game-guide selection"
      >
        {providerProfiles.map((p, index) => {
          const copy = englishProvider(p.slug)!;
          const stats = catalogStats(
            slots.filter((game) => game.provider === p.name),
          );
          return (
            <Link
              key={p.slug}
              href={`/en/providers/${p.slug}`}
              className="provider-index-row"
            >
              <span className="provider-index-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="provider-index-name">
                <span className="eyebrow">Game publisher</span>
                <h2>{p.name}</h2>
              </div>
              <p>{copy.catalogSummary}</p>
              <div className="provider-index-stats">
                <span>
                  {stats.count} {stats.count === 1 ? "guide" : "guides"}
                </span>
                <span>{stats.mechanics.length} {stats.mechanics.length === 1 ? "mechanic" : "mechanics"}</span>
              </div>
              <b aria-hidden="true">↗</b>
            </Link>
          );
        })}
      </div>
    </>
  );
}
