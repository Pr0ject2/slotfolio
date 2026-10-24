import Link from "next/link";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/information-page.module.css";

export const metadata = pageMetadata({
  title: "About Slotfolio | How to explore games and their rules",
  description: "Learn how to explore Slotfolio's 1,000 game records, compare features, understand RTP, and interpret its editorial information and limitations.",
  path: "/en/about",
  absoluteTitle: true,
});

export default function AboutEnglish() {
  return (
    <div className={styles.page}>
      <EnglishBreadcrumbs items={[{ label: "About" }]} />
      <header className="simple-heading">
        <span className="eyebrow accent">About Slotfolio</span>
        <h1 className="about-statement">How to use Slotfolio</h1>
        <p>Find a game, learn how its rules work, and compare its features. Here is where to start and what the available figures can and cannot tell you.</p>
      </header>
      <div className="article-layout">
        <nav className="article-toc" aria-label="On this page">
          <span className="eyebrow">On this page</span>
          <a href="#find">Find a game</a>
          <a href="#compare">Compare games</a>
          <a href="#verify">Check a game's figures</a>
          <a href="#limits">Know the limitations</a>
          <a href="#links">External websites</a>
        </nav>
        <article className="prose">
          <section id="find">
            <h2>Find a game</h2>
            <p>Slotfolio currently lists 1,000 slot games. Search by name or choose a developer. Filters can help you narrow down mechanics and features if you do not know the title.</p>
            <p>Look at how wins are formed: along paylines, on adjacent reels, or across groups of symbols. Then read how any bonus is triggered and what it changes.</p>
            <p><Link href="/en/slots">Open the English catalogue</Link></p>
          </section>
          <section id="compare">
            <h2>Compare games</h2>
            <p>Use the Compare buttons to add two games to the comparison table. Games without this button can still be viewed individually.</p>
            <p>Compare pay rules, features and RTP configurations. Different studios may use different volatility scales, and a stated maximum win does not indicate how often it happens.</p>
            <p><Link href="/en/compare">Open the English comparison</Link></p>
          </section>
          <section id="verify">
            <h2>Check a game's figures</h2>
            <p>Use the game's own help menu or rules to verify the currently offered version. A published RTP such as 96% does not guarantee that the same setting is in use at every operator.</p>
            <p>When reliable information is missing, it is better to leave a value unknown than to guess.</p>
            <p><Link href="/en/journal/understanding-rtp">What RTP means</Link> · <Link href="/en/editorial-policy">Our editorial policy</Link></p>
          </section>
          <section id="limits">
            <h2>What this catalogue cannot tell you</h2>
            <p>Games do not promise wins. Catalogue statistics cannot predict the next spin or establish whether a casino is reliable, when withdrawals will arrive, or whether a game is available where you live.</p>
            <p>Slotfolio does not take wagers or run gaming accounts. Payment and account issues must be handled by the operator.</p>
            <p><Link href="/en/responsible-gaming">Safer gambling and support</Link></p>
          </section>
          <section id="links">
            <h2>External websites</h2>
            <p>Publishers' rules help verify information, but other sites have their own terms. Check the operator's domain, license and local restrictions before creating an account.</p>
            <p><Link href="/en/disclosure">Affiliate disclosure</Link> · <Link href="/en/privacy">Privacy and browser data</Link></p>
          </section>
        </article>
      </div>
    </div>
  );
}
