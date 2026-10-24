import { expect, test } from "@playwright/test";
import { absoluteUrl, indexingEnabled, siteUrl } from "../src/lib/seo";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";

test("slotfolio.org static-root preview generates canonical and sitemap URLs without indexing", () => {
  const vars = ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_BASE_PATH", "NEXT_PUBLIC_INDEXABLE", "GITHUB_ACTIONS", "SLOTFOLIO_STATIC_EXPORT"] as const;
  const saved = vars.map((key) => process.env[key]);
  try {
    process.env.NEXT_PUBLIC_SITE_URL = "https://slotfolio.org";
    process.env.NEXT_PUBLIC_BASE_PATH = "";
    process.env.NEXT_PUBLIC_INDEXABLE = "false";
    // Cloudflare Pages is not a GitHub Actions runtime. Exercise its opt-in export mode.
    delete process.env.GITHUB_ACTIONS;
    process.env.SLOTFOLIO_STATIC_EXPORT = "true";

    expect(siteUrl()).toBe("https://slotfolio.org");
    expect(absoluteUrl("/")).toBe("https://slotfolio.org/");
    expect(absoluteUrl("/slots")).toBe("https://slotfolio.org/slots/");
    expect(absoluteUrl("/slots?page=2#results")).toBe("https://slotfolio.org/slots/?page=2#results");
    expect(absoluteUrl("/sitemap.xml")).toBe("https://slotfolio.org/sitemap.xml");
    expect(indexingEnabled()).toBe(false);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });

    const urls = sitemap().map((entry) => entry.url);
    expect(urls.length).toBeGreaterThan(100);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://slotfolio.org/"))).toBe(true);
    expect(urls.some((url) => url.includes("github.io") || url.includes("/slotfolio/slotfolio"))).toBe(false);
    expect(urls.filter((url) => /\/slots\/[^/]+\/$/.test(url))).toHaveLength(300);
    expect(urls.some((url) => /\/slots\/catalog\/|\/search\/|\/compare\//.test(url))).toBe(false);
  } finally {
    vars.forEach((key, i) => {
      if (saved[i] === undefined) delete process.env[key];
      else process.env[key] = saved[i];
    });
  }
});
