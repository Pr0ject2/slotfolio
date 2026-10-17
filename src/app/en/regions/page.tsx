import Link from "next/link";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gambling availability and country-specific rules",
  description: "A game appearing in a catalogue does not establish its availability in your country. Check operator licensing, access conditions and official records.",
  path: "/en/regions",
  noIndex: true,
});

export default function EnglishRegions() {
  return (
    <>
      <EnglishBreadcrumbs items={[{ label: "Countries and availability" }]} />
      <div className="simple-heading">
        <span className="eyebrow accent">Rules vary by country</span>
        <h1>Same game.<br />Different access rules.</h1>
        <p>A game being listed in Slotfolio does not mean it is offered legally where you live. Check the relevant regulator, the operator's licence and its terms before making a decision.</p>
      </div>
      <div className="hub-list" style={{ marginTop: 40 }}>
        <Link href="/en/regions/great-britain">
          <span className="number">GB</span>
          <h2>Great Britain</h2>
          <p>England, Scotland and Wales: how to look up a gambling business in the Gambling Commission's public register.</p>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
      <p className="data-note">Licensing, local restrictions and consumer protections vary by territory. Check current official records rather than assuming that a website you can open is authorised to serve you.</p>
    </>
  );
}
