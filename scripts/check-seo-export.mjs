import { readFileSync, readdirSync } from "node:fs";
import { resolve, join, sep } from "node:path";
import { pathToFileURL } from "node:url";

const attributes = (text) =>
  Object.fromEntries(
    [...text.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [
      m[1].toLowerCase(),
      m[2].replaceAll("&amp;", "&"),
    ]),
  );
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "gi"))].map((m) =>
    attributes(m[1]),
  );
const ensure = (condition, message) => {
  if (!condition) throw Error(message);
};
export function checkSeoExport(
  directory,
  {
    indexable = false,
    origin = process.env.NEXT_PUBLIC_SITE_URL || "https://slotfolio.org",
    expectedCatalogRecords = 900,
    expectedDossiers = 100,
  } = {},
) {
  const root = resolve(directory),
    site = origin.replace(/\/$/, "");
  ensure(
    !indexable || site === "https://slotfolio.org",
    "Only the approved primary hostname may be indexed",
  );
  ensure(
    expectedCatalogRecords > 0 &&
      expectedCatalogRecords <= 900 &&
      expectedDossiers > 0 &&
      expectedDossiers <= 100,
    "Invalid expected game counts",
  );
  const file = (path) => {
    const target = resolve(root, "." + path, "index.html");
    ensure(target.startsWith(root + sep), "Unsafe export path");
    return readFileSync(target, "utf8");
  };
  const metas = (html) =>
    tags(html, "meta").filter((m) =>
      ["robots", "googlebot"].includes(m.name?.toLowerCase()),
    );
  const closed = (html, label) => {
    const values = metas(html);
    ensure(
      values.some((m) => /noindex/i.test(m.content)),
      label + ": missing noindex",
    );
    ensure(
      values.every((m) => /noindex/i.test(m.content)),
      label + ": contradictory crawler directives",
    );
  };
  const xml = readFileSync(join(root, "sitemap.xml"), "utf8");
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    url: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.replaceAll("&amp;", "&"),
    links: [...m[1].matchAll(/<xhtml:link\b([^>]*)\/?\s*>/g)].map((a) =>
      attributes(a[1]),
    ),
  }));
  const urls = entries.map((e) => e.url);
  ensure(
    urls.length > 0 && new Set(urls).size === urls.length,
    "Sitemap has empty or duplicate URLs",
  );
  const counts = { ru: 0, en: 0, es: 0 },
    dossiers = { ru: 0, en: 0, es: 0 };
  for (const entry of entries) {
    const url = new URL(entry.url);
    ensure(
      url.origin === new URL(site).origin && !url.search && !url.hash,
      "Unexpected sitemap hostname or parameters",
    );
    let path = url.pathname;
    const base = new URL(site).pathname.replace(/\/$/, "");
    if (base) path = path.slice(base.length) || "/";
    const locale = /^\/(en|es)(\/|$)/.exec(path)?.[1] || "ru";
    counts[locale]++;
    if (/\/slots\/[^/]+\/$/.test(path)) dossiers[locale]++;
    ensure(
      !/\/(search|compare|go|404)(\/|$)|\/slots\/catalog\/|\/slots\/(gates-of-1win|1win-bonanza)\//.test(
        path,
      ),
      "Excluded page in sitemap: " + path,
    );
    const html = file(path),
      links = tags(html, "link"),
      canonical = links.filter((l) => l.rel === "canonical");
    ensure(
      canonical.length === 1 && canonical[0].href === entry.url,
      "Canonical mismatch: " + path,
    );
    ensure(
      tags(html, "meta").some(
        (m) => m.name === "description" && m.content.trim(),
      ),
      "Missing description: " + path,
    );
    ensure(/<title>[^<]+<\/title>/.test(html), "Missing title: " + path);
    if (indexable) {
      ensure(
        metas(html).some((m) => /\bindex\b/.test(m.content)) &&
          !metas(html).some((m) => /noindex/i.test(m.content)),
        "Indexable page is closed: " + path,
      );
    } else closed(html, path);
    ensure(
      entry.links.length === 3 &&
        new Set(entry.links.map((l) => l.hreflang)).size === 3,
      "Sitemap must contain three language alternatives: " + path,
    );
    for (const alternative of entry.links) {
      ensure(
        ["ru", "en", "es"].includes(alternative.hreflang) &&
          urls.includes(alternative.href),
        "Missing language target: " + path,
      );
      ensure(
        links.some(
          (l) =>
            l.rel === "alternate" &&
            l.hreflang === alternative.hreflang &&
            l.href === alternative.href,
        ),
        "HTML/XML hreflang mismatch: " + path,
      );
      const reciprocal = entries.find((e) => e.url === alternative.href);
      ensure(
        reciprocal.links.some(
          (l) => l.hreflang === locale && l.href === entry.url,
        ),
        "Non-reciprocal hreflang: " + path,
      );
    }
  }
  ensure(
    counts.ru === counts.en && counts.en === counts.es,
    "Unequal language coverage",
  );
  ensure(
    Object.values(dossiers).every((n) => n === expectedDossiers),
    "Published dossier set changed",
  );
  let catalog = 0;
  for (const locale of ["", "/en", "/es"]) {
    const directory = join(root, locale, "slots/catalog");
    const records = readdirSync(directory, { withFileTypes: true }).filter(
      (e) => e.isDirectory(),
    );
    ensure(
      records.length === expectedCatalogRecords,
      "Published catalogue set changed",
    );
    for (const record of records) {
      closed(file(locale + "/slots/catalog/" + record.name + "/"), record.name);
      catalog++;
    }
    for (const route of [
      "/search/",
      "/compare/",
      "/slots/gates-of-1win/",
      "/slots/1win-bonanza/",
    ])
      closed(file(locale + route), locale + route);
  }
  // Existing explicit routes are /404/ and /es/404/. English missing URLs use
  // the shared static fallback, not a separate /en/404/ content page.
  for (const path of ["/404/", "/es/404/"]) closed(file(path), path);
  const fallback = readFileSync(join(root, "404.html"), "utf8");
  closed(fallback, "Shared 404");
  for (const locale of ["ru", "en", "es"])
    ensure(
      fallback.includes(`data-not-found-locale="${locale}"`),
      "Missing shared 404 language: " + locale,
    );
  const robots = readFileSync(join(root, "robots.txt"), "utf8");
  if (indexable) {
    ensure(
      !/^Disallow:\s*\/\s*$/im.test(robots) &&
        /^Allow:\s*\/\s*$/im.test(robots) &&
        robots.includes("Sitemap: " + site + "/sitemap.xml"),
      "Production robots blocks crawling or points elsewhere",
    );
  } else ensure(/^Disallow:\s*\/\s*$/im.test(robots), "Preview robots is open");
  const headers = readFileSync(join(root, "_headers"), "utf8").replaceAll(
    "\r\n",
    "\n",
  );
  for (const pattern of [
    "https://slotfolio.pages.dev/*",
    "https://:deployment.slotfolio.pages.dev/*",
  ])
    ensure(
      headers.includes(pattern + "\n  X-Robots-Tag: noindex"),
      "Pages alias is unprotected",
    );
  return {
    indexable,
    urls: urls.length,
    languages: counts,
    dossiers,
    catalogNoindex: catalog,
  };
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const flag =
    process.argv.find((a) => a.startsWith("--indexable="))?.split("=")[1] ||
    "false";
  ensure(["true", "false"].includes(flag), "Invalid indexing mode");
  console.log(
    JSON.stringify(
      checkSeoExport(process.argv[2] || "out", { indexable: flag === "true" }),
    ),
  );
}
