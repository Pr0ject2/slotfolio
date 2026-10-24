import { test, expect } from "@playwright/test";
import sitemap from "../src/app/sitemap";
import { siteUrl, indexingEnabled } from "../src/lib/seo";
import { cloudflareLaunchIndexing } from "../scripts/launch-mode.mjs";
import { checkSeoExport } from "../scripts/check-seo-export.mjs";
import { readFileSync } from "node:fs";

test("international sitemap contains reciprocal indexable RU EN ES pages and 100 guides per language", () => {
  const entries = sitemap();
  expect(entries).toHaveLength(435);
  expect(new Set(entries.map((e) => e.url)).size).toBe(435);
  for (const locale of ["ru", "en", "es"]) {
    const localized = entries.filter((e) => {
      const path = new URL(e.url).pathname.replace(/^\/slotfolio(?=\/|$)/, "");
      return locale === "ru"
        ? !/^\/(en|es)(\/|$)/.test(path)
        : path === "/" + locale || path.startsWith("/" + locale + "/");
    });
    expect(localized).toHaveLength(145);
    expect(
      localized.filter((e) => /\/slots\/[^/]+\/?$/.test(e.url)),
    ).toHaveLength(100);
  }
  for (const entry of entries) {
    expect(entry.url).not.toMatch(
      /\/slots\/catalog\/|\/(search|compare|404)\//,
    );
    expect(Object.keys(entry.alternates!.languages!)).toEqual([
      "ru",
      "en",
      "es",
    ]);
    for (const target of Object.values(entry.alternates!.languages!)) {
      const counterpart = entries.find((e) => e.url === target)!;
      expect(counterpart, entry.url).toBeTruthy();
      expect(Object.values(counterpart.alternates!.languages!)).toContain(
        entry.url,
      );
    }
  }
});
test("launch requires explicit approval switch and Cloudflare main context", () => {
  const approved = {
    SLOTFOLIO_LAUNCH_INDEXING: "true",
    CF_PAGES: "1",
    CF_PAGES_BRANCH: "main",
  };
  expect(cloudflareLaunchIndexing(approved)).toBe(true);
  for (const env of [
    {},
    { ...approved, SLOTFOLIO_LAUNCH_INDEXING: "false" },
    { ...approved, CF_PAGES_BRANCH: "feature/seo" },
    { ...approved, CF_PAGES_BRANCH: undefined },
    { ...approved, CF_PAGES: undefined },
  ])
    expect(cloudflareLaunchIndexing(env)).toBe(false);
  expect(() =>
    cloudflareLaunchIndexing({ ...approved, SLOTFOLIO_LAUNCH_INDEXING: "yes" }),
  ).toThrow(/true or false/);
});
test("metadata keeps backup hosts and feature branches noindex despite an accidental indexing variable", () => {
  const keys = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_BASE_PATH",
    "NEXT_PUBLIC_INDEXABLE",
    "CF_PAGES",
    "CF_PAGES_BRANCH",
  ];
  const saved = keys.map((k) => process.env[k]);
  try {
    process.env.NEXT_PUBLIC_INDEXABLE = "true";
    process.env.NEXT_PUBLIC_BASE_PATH = "";
    delete process.env.CF_PAGES;
    for (const url of [
      "https://pr0ject2.github.io/slotfolio",
      "https://slotfolio.pages.dev",
      "https://abc.slotfolio.pages.dev",
    ]) {
      process.env.NEXT_PUBLIC_SITE_URL = url;
      expect(indexingEnabled()).toBe(false);
    }
    process.env.NEXT_PUBLIC_SITE_URL = "https://slotfolio.org";
    process.env.CF_PAGES = "1";
    process.env.CF_PAGES_BRANCH = "feature";
    expect(indexingEnabled()).toBe(false);
    process.env.CF_PAGES_BRANCH = "main";
    expect(indexingEnabled()).toBe(true);
  } finally {
    keys.forEach((k, i) => {
      if (saved[i] === undefined) delete process.env[k];
      else process.env[k] = saved[i];
    });
  }
});
test("actual export has matching canonical hreflang and crawl controls without opening protected pages", () => {
  const result = checkSeoExport("out", {
    origin: process.env.CI ? "https://example.invalid" : siteUrl(),
    indexable: indexingEnabled(),
  });
  expect(result.urls).toBe(435);
  expect(result.catalogNoindex).toBe(2700);
  expect(result.dossiers).toEqual({ ru: 100, en: 100, es: 100 });
});
test("Pages aliases have host-specific HTTP noindex without blocking the custom hostname", () => {
  const headers = readFileSync("public/_headers", "utf8");
  expect(headers).toContain("https://slotfolio.pages.dev/*");
  expect(headers).toContain("https://:deployment.slotfolio.pages.dev/*");
  expect(headers).not.toMatch(
    /https:\/\/slotfolio\.org\/\*[\s\r\n]+X-Robots-Tag:\s*noindex/,
  );
});
for (const locale of ["ru", "en", "es"])
  test(`search engines receive self canonical and reciprocal languages in ${locale} HTML`, async ({
    page,
    request,
  }) => {
    const prefix = locale === "ru" ? "" : "/" + locale;
    const path = prefix + "/slots/gates-of-olympus/";
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const source = await response.text();
    for (const language of ["ru", "en", "es"])
      expect(source).toMatch(new RegExp(`hrefLang="${language}"`));
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(path + "$"),
    );
    await expect(page.locator("link[hreflang]")).toHaveCount(3);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      indexingEnabled() ? /^index, follow$/ : /noindex/,
    );
  });
