import Link from "next/link";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Great Britain: checking an operator's gambling licence",
  description: "How to consult the Gambling Commission's register for a business operating in England, Scotland or Wales, and what else to confirm before registering.",
  path: "/en/regions/great-britain",
  previewOnly: true,
});

export default function EnglishGreatBritain() {
  return (
    <>
      <EnglishBreadcrumbs items={[
        { label: "Countries", href: "/en/regions" },
        { label: "Great Britain" },
      ]} />
      <div className="simple-heading geo-heading">
        <span className="eyebrow accent">Gambling in Great Britain</span>
        <h1>Great Britain:<br />check the operator first</h1>
        <p>How to research a gambling business serving England, Scotland and Wales using the official public register. This guide is not about Northern Ireland, which has a different legal framework.</p>
      </div>
      <div className="article-layout">
        <nav className="article-toc" aria-label="On this page">
          <span className="eyebrow">On this page</span>
          <a href="#register">The public register</a>
          <a href="#conditions">Terms to check</a>
          <a href="#operators">Brands and domains</a>
          <a href="#sources">Official sources</a>
        </nav>
        <article className="prose">
          <section id="register">
            <h2>Start with the official register</h2>
            <p>The Gambling Commission maintains a searchable register of gambling businesses. You can check an operator's recorded legal name, trading name, licence status and associated domains. The brand on a website may differ from its registered legal entity.</p>
            <p>Compare the operator's legal information with the regulator's entry. A logo in the footer is not proof of authorisation. Verify the current status and the relevant business and domain details. Information about trading names and domains is supplied by businesses, so it is important to read the regulator's qualifications too.</p>
            <a className="text-link" href="https://www.gamblingcommission.gov.uk/public-register/businesses/" target="_blank" rel="noopener noreferrer">Search the official business register ↗</a>
          </section>
          <section id="conditions">
            <h2>What to check before registering</h2>
            <div className="table-wrap">
              <table>
                <caption className="sr-only">Checks for a gambling operator in Great Britain</caption>
                <thead><tr><th>Question</th><th>Where to check</th></tr></thead>
                <tbody>
                  <tr><td>Who runs this website?</td><td>Legal information and the public business register</td></tr>
                  <tr><td>Can it accept customers where I live?</td><td>Territories listed in the operator's current terms</td></tr>
                  <tr><td>Which identity documents are required?</td><td>Identity and age-verification requirements</td></tr>
                  <tr><td>How do payments, withdrawals and limits work?</td><td>Payment policy, terms and account controls</td></tr>
                  <tr><td>Which game configuration is offered?</td><td>In-game rules, including its RTP setting where disclosed</td></tr>
                </tbody>
              </table>
            </div>
            <p>Being able to open a website does not establish that the service may lawfully accept you as a customer. If something is unclear, ask the operator before depositing money.</p>
          </section>
          <section id="operators">
            <h2>A familiar brand is not enough</h2>
            <p>Brands may operate under different legal arrangements in different places. Look up the specific company running the domain and check its details in the official register.</p>
            <div className="margin-note">
              <strong>Match the website address</strong>
              <p>Compare the exact domain with the registered business details. Similar branding, a lookalike address or a regulator logo is not sufficient evidence on its own.</p>
            </div>
          </section>
          <section id="sources">
            <h2>Official sources</h2>
            <p><a href="https://www.gamblingcommission.gov.uk/public-register/businesses/" target="_blank" rel="noopener noreferrer">Gambling Commission public register</a> and <a href="https://www.gamblingcommission.gov.uk/public-and-players" target="_blank" rel="noopener noreferrer">information for consumers</a>. The business register is updated; check the live entry for current details.</p>
            <p className="source-note">General information only, not individual legal advice. A licence entry does not guarantee a particular site's safety or suitability. Verify the operator and current conditions yourself.</p>
            <Link className="text-link" href="/en/responsible-gaming">Safer gambling guidance ↗</Link>
          </section>
        </article>
      </div>
    </>
  );
}
