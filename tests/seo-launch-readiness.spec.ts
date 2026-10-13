import { test, expect } from "@playwright/test";
import { absoluteUrl, siteUrl, indexingEnabled } from "../src/lib/seo";
import sitemap from "../src/app/sitemap";

test("SEO URLs support a future root domain and the Pages subpath without duplicates", () => {
  const keys = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_BASE_PATH",
    "NEXT_PUBLIC_INDEXABLE",
    "GITHUB_ACTIONS",
  ];
  const saved = keys.map((key) => process.env[key]);
  try {
    process.env.NEXT_PUBLIC_SITE_URL = "https://Pr0ject2.github.io/slotfolio/";
    process.env.NEXT_PUBLIC_BASE_PATH = "/slotfolio";
    process.env.GITHUB_ACTIONS = "true";
    expect(siteUrl()).toBe("https://pr0ject2.github.io/slotfolio");
    expect(absoluteUrl("/slots")).toBe(
      "https://pr0ject2.github.io/slotfolio/slots/",
    );
    expect(absoluteUrl("/slots?page=2#results")).toBe(
      "https://pr0ject2.github.io/slotfolio/slots/?page=2#results",
    );
    expect(absoluteUrl("/sitemap.xml")).toBe(
      "https://pr0ject2.github.io/slotfolio/sitemap.xml",
    );
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.example.com";
    process.env.NEXT_PUBLIC_BASE_PATH = "";
    process.env.NEXT_PUBLIC_INDEXABLE = "true";
    expect(indexingEnabled()).toBe(true);
    expect(absoluteUrl("/slots")).toBe("https://www.example.com/slots/");
    const urls = sitemap().map((item) => item.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.filter((url) => /\/slots\/[^/]+\/$/.test(url))).toHaveLength(
      100,
    );
    expect(
      urls.every((url) => url.startsWith("https://www.example.com/")),
    ).toBe(true);
    expect(
      urls.some((url) =>
        /\/(search|compare|go|slots\/catalog)(\/|$)/.test(url),
      ),
    ).toBe(false);
    for (const invalid of [
      "http://www.example.com",
      "https://localhost",
      "https://127.0.0.1",
      "https://example.invalid",
      "https://example.test",
    ]) {
      process.env.NEXT_PUBLIC_SITE_URL = invalid;
      expect(() => indexingEnabled()).toThrow();
    }
    process.env.NEXT_PUBLIC_INDEXABLE = "false";
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(indexingEnabled()).toBe(false);
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.example.com/?preview=1";
    expect(() => siteUrl()).toThrow();
  } finally {
    keys.forEach((key, i) => {
      if (saved[i] === undefined) delete process.env[key];
      else process.env[key] = saved[i];
    });
  }
});

function flatten(value: any): any[] {
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (value?.["@graph"]) return flatten(value["@graph"]);
  return [value];
}

test("editorial pages have one truthful Article and one breadcrumb trail in rendered HTML", async ({
  page,
}) => {
  for (const path of [
    "/journal/how-cascades-work",
    "/journal/understanding-rtp",
    "/collections/beyond-lines",
  ]) {
    await page.goto(path);
    const nodes = (
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).flatMap((s) => flatten(JSON.parse(s)));
    const articles = nodes.filter((n) => n["@type"] === "Article");
    expect(articles).toHaveLength(1);
    const article = articles[0];
    expect(article.url).toBe(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
    );
    expect(article.author.name).toBe("Редакция Slotfolio");
    expect(article.description).toBe(
      await page.locator('meta[name="description"]').getAttribute("content"),
    );
    expect(article.dateModified).toBeUndefined();
    if (path.endsWith("how-cascades-work"))
      expect(article.datePublished).toBe("2026-09-07");
    else expect(article.datePublished).toBeUndefined();
    const breadcrumbs = nodes.filter((n) => n["@type"] === "BreadcrumbList");
    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs[0].itemListElement).toHaveLength(3);
    for (const item of breadcrumbs[0].itemListElement) {
      expect(await page.locator(".breadcrumbs").textContent()).toContain(
        item.name,
      );
    }
  }
});

test("shared breadcrumbs do not duplicate existing dossier or profile schemas", async ({
  page,
}) => {
  for (const path of [
    "/slots",
    "/slots/gates-of-olympus",
    "/providers/pragmatic-play",
    "/mechanics/cascades",
    "/slots/catalog/playn-go-reactoonz-100",
  ]) {
    await page.goto(path);
    const nodes = (
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).flatMap((s) => flatten(JSON.parse(s)));
    expect(nodes.filter((n) => n["@type"] === "BreadcrumbList")).toHaveLength(
      1,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("query variants canonicalize to the clean catalogue and utility pages stay noindex", async ({
  page,
}) => {
  await page.goto("/slots?provider=Pragmatic+Play&page=2&view=covers");
  const canonical = new URL(
    (await page.locator('link[rel="canonical"]').getAttribute("href"))!,
  );
  expect(canonical.search).toBe("");
  expect(canonical.pathname).toMatch(/\/slots\/?$/);
  for (const path of [
    "/search?q=reactoonz",
    "/compare",
    "/slots/catalog/playn-go-reactoonz-100",
  ]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  }
});
