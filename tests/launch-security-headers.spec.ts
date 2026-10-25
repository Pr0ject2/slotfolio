import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

test("static hosting policy hardens all routes without weakening existing robots and cache rules", () => {
  const headers = readFileSync("public/_headers", "utf8").replaceAll("\r\n", "\n");
  const global = headers.split(/\r?\n\r?\n/)[0];
  expect(global.split(/\r?\n/)[0]).toBe("/*");
  for (const line of [
    "X-Content-Type-Options: nosniff",
    "Referrer-Policy: strict-origin-when-cross-origin",
    "X-Frame-Options: DENY",
    "frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'",
    "form-action 'self'", "upgrade-insecure-requests",
    "camera=()", "microphone=()", "geolocation=()", "payment=()", "usb=()",
    "Strict-Transport-Security: max-age=86400",
  ]) expect(global).toContain(line);
  // Static Next.js hydration uses inline scripts; this bounded policy does not
  // pretend to be a strict script CSP or break hydration with an invented nonce.
  expect(global).not.toMatch(/script-src|unsafe-eval|includeSubDomains|preload/);
  expect(headers).toContain("https://slotfolio.pages.dev/*\n  X-Robots-Tag: noindex");
  expect(headers).toContain("https://:deployment.slotfolio.pages.dev/*\n  X-Robots-Tag: noindex");
  for (const route of ["/slots/gates-of-1win/*", "/slots/1win-bonanza/*", "/en/slots/gates-of-1win/*", "/en/slots/1win-bonanza/*"])
    expect(headers).toContain(`${route}\n  Cache-Control: no-store`);
});

for (const locale of ["", "/en", "/es"]) {
  test(`game sources and commercial links isolate their new tabs in ${locale || "/"}`, async ({ page }) => {
    for (const route of ["/slots/gates-of-olympus/", "/slots/catalog/wazdan-mayan-ritual/"]) {
      await page.goto(locale + route);
      const links = page.locator('main a[target="_blank"]');
      expect(await links.count()).toBeGreaterThan(1);
      for (const link of await links.all()) {
        const rel = (await link.getAttribute("rel"))!.split(/\s+/);
        expect(rel).toContain("noopener");
        expect(rel).toContain("noreferrer");
        expect(await link.getAttribute("href")).toMatch(/^https:\/\//);
      }
    }
  });
}
