import Link from "next/link";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What RTP means in slot games",
  description: "Understand return to player, why 96% RTP does not guarantee a session outcome, and how to check the setting of the game you are playing.",
  path: "/en/journal/understanding-rtp",
  openGraphType: "article",
});

export default function EnglishRtpGuide() {
  return (
    <>
      <EnglishBreadcrumbs items={[{ label: "Understanding RTP" }]} />
      <header className="article-heading">
        <span className="eyebrow accent">Guide / Slot mathematics without myths</span>
        <h1>96% RTP does not mean<br />you get 96% back</h1>
        <p className="deck">What this percentage describes, what it cannot predict, and why the game's actual rules and configuration matter.</p>
        <div className="article-meta"><span>Slotfolio editorial team</span><span>4-minute read</span></div>
      </header>
      <div className="article-layout">
        <nav className="article-toc" aria-label="On this page">
          <span className="eyebrow">On this page</span>
          <a href="#meaning">The long-run average</a>
          <a href="#session">Individual sessions</a>
          <a href="#version">Versions and settings</a>
        </nav>
        <article className="prose">
          <section id="meaning">
            <h2>A theoretical return over many bets</h2>
            <p>Return to Player (RTP) describes the theoretical proportion of total stakes returned as prizes over a very large number of plays. It is a feature of the game's mathematical design, not a promise made to any individual player.</p>
            <p>For example, a theoretical RTP of 96% corresponds to 96 units returned for every 100 units staked in aggregate over a long run. Those stakes include money wagered again after earlier wins, not just an initial deposit.</p>
          </section>
          <section id="session">
            <h2>Your session can be very different</h2>
            <p>Short-term outcomes can deviate substantially from the theoretical average. You may lose the entire amount set aside or finish ahead. The RTP percentage cannot tell you which outcome to expect next.</p>
            <blockquote>RTP is not a countdown to a win that is somehow due.</blockquote>
            <p>Volatility adds another dimension: it describes variation in prize outcomes. Two games with similar RTP can feel very different because their wins occur at different frequencies and sizes.</p>
          </section>
          <section id="version">
            <h2>Check the actual game configuration</h2>
            <p>A single title can have multiple RTP settings. A reference value in a catalogue therefore needs to be checked against the help or paytable of the version offered by your particular operator.</p>
            <div className="margin-note">
              <strong>Where to look</strong>
              <p>Open the game's help, paytable, or information menu. If the percentage is not given, do not fill in the missing value with an assumption.</p>
            </div>
            <p>RTP does not remove the risk of losing money.</p>
            <Link className="text-link" href="/en/responsible-gaming">Safer gambling guidance ↗</Link>
          </section>
        </article>
      </div>
    </>
  );
}
