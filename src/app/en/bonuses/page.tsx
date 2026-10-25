import Link from "next/link";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Understanding casino bonus terms",
  description: "Read wagering requirements, expiry dates, maximum bets, game exclusions and withdrawal restrictions before considering a casino bonus.",
  path: "/en/bonuses",
  openGraphType: "article",
  previewOnly: true,
});

export default function EnglishBonusTerms() {
  return (
    <>
      <EnglishBreadcrumbs items={[
        { label: "Editorial guides", href: "/en/journal/understanding-rtp" },
        { label: "Bonus terms" },
      ]} />
      <div className="simple-heading">
        <span className="eyebrow accent">Before you consider an offer</span>
        <h1>Read the terms<br />before the headline</h1>
        <p>The amount advertised is only one part of a casino bonus. Here is what to check before accepting any offer.</p>
      </div>
      <div className="article-layout">
        <nav className="article-toc" aria-label="On this page">
          <span className="eyebrow">In this guide</span>
          <a href="#wager">Wagering requirements</a>
          <a href="#limits">Limits and exclusions</a>
          <a href="#decision">Before accepting</a>
        </nav>
        <article className="prose">
          <section id="wager">
            <h2>What does the wagering requirement apply to?</h2>
            <p>A wagering requirement may apply only to the bonus amount, or to your deposit and the bonus combined. The same advertised multiplier can therefore mean very different amounts of eligible wagering.</p>
            <p>Illustrative calculation, <strong>not a live offer</strong>: a bonus of 100 units with a 10× requirement on the bonus alone means 1,000 units of qualifying wagers. That is wagering turnover, not an additional deposit requirement. Meeting it without losing money is not guaranteed.</p>
          </section>
          <section id="limits">
            <h2>Restrictions can change the offer</h2>
            <p>Check the expiry date, the maximum stake allowed during wagering, how different games contribute and whether bonus-funded withdrawals are capped. Some games may not count at all. Breaking a condition can result in the bonus or related winnings being cancelled.</p>
            <div className="margin-note">
              <strong>Keep a copy of the full terms</strong>
              <p>Read the complete terms before you accept. A short banner cannot explain every restriction or exception.</p>
            </div>
          </section>
          <section id="decision">
            <h2>Decide before pressing accept</h2>
            <p>If the rules are unclear, do not activate the bonus automatically. Check whether you can play without it, which balance is used first and what happens if you decline the offer.</p>
            <p>Do not judge the offer by its largest number alone. The terms on stakes, timing and withdrawals can matter much more than the advertised amount.</p>

            <p>Gambling can result in the loss of the money you stake. <Link href="/en/responsible-gaming">Read our safer gambling guidance</Link>.</p>
          </section>
        </article>
      </div>
    </>
  );
}
