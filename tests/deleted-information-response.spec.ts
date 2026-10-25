import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { onRequest, retiredInformationPath, securityHeaders } from "../functions/[[path]].js";

const testBaseURL = process.env.AUDIT_BASE_URL || "http://localhost:3000";
test.use({ baseURL: testBaseURL });

test("Function invocation is restricted to the retired sections in three languages", () => {
  const routes = JSON.parse(readFileSync("public/_routes.json", "utf8"));
  expect(routes).toEqual({ version: 1, include: [
    "/disclosure", "/disclosure/*", "/regions", "/regions/*",
    "/en/disclosure", "/en/disclosure/*", "/en/regions", "/en/regions/*",
    "/es/disclosure", "/es/disclosure/*", "/es/regions", "/es/regions/*",
  ], exclude: [] });
  expect(JSON.parse(readFileSync("out/_routes.json", "utf8"))).toEqual(routes);
  const headers = readFileSync("public/_headers", "utf8");
  for (const [name, value] of Object.entries(securityHeaders)) expect(headers).toContain(`${name}: ${value}`);
});

test("retired pages always return uncached 404 with current error content and security headers", async () => {
  for (const prefix of ["", "/en", "/es"]) for (const route of ["/disclosure/", "/regions/", "/regions/great-britain/"]) {
    let assetPath = "";
    const response = await onRequest({
      request: new Request("https://slotfolio.org" + prefix + route),
      env: { ASSETS: { fetch: async request => {
        assetPath = new URL(request.url).pathname;
        return new Response("<!doctype html><h1>Current 404</h1>", { status: 404, headers: {
          "Content-Type": "text/html", "Cache-Control": "public,s-maxage=604800", Age: "90000", ETag: "old", "Set-Cookie": "old=value",
        } });
      } } },
      next: async () => { throw Error("Must not fetch the cached retired path"); },
    });
    expect(assetPath).toBe(prefix + "/404/");
    expect(response.status).toBe(404);
    expect(await response.text()).toContain("Current 404");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    expect(response.headers.get("x-slotfolio-route-state")).toBe("removed");
    for (const name of ["age", "etag", "set-cookie", "location", "last-modified"]) expect(response.headers.has(name)).toBe(false);
    for (const [name, value] of Object.entries(securityHeaders)) expect(response.headers.get(name)).toBe(value);
  }
});

test("HEAD stays bodyless and does not fetch an asset", async () => {
  const response = await onRequest({ request: new Request("https://slotfolio.org/regions/", { method: "HEAD" }),
    env: { ASSETS: { fetch: async () => { throw Error("HEAD must not fetch"); } } },
    next: async () => { throw Error("HEAD must not fall through"); },
  });
  expect(response.status).toBe(404);
  expect(await response.text()).toBe("");
  expect(response.headers.get("cache-control")).toBe("no-store");
});

test("query and visitor headers cannot affect the internal asset request", async () => {
  const response = await onRequest({ request: new Request("https://slotfolio.org/en/disclosure/?next=https://example.com&x=%3Cscript%3E", {
    headers: { Cookie: "private=value", Authorization: "Bearer private", "If-None-Match": "old", Accept: "text/x-component" },
  }), env: { ASSETS: { fetch: async request => {
    expect(request.url).toBe("https://slotfolio.org/en/404/");
    expect(Object.fromEntries(request.headers)).toEqual({ accept: "text/html" });
    return new Response("<h1>404</h1>", { status: 404, headers: { "Content-Type": "text/html" } });
  } } }, next: async () => new Response("Must not fall through") });
  expect(response.status).toBe(404);
  expect(await response.text()).toBe("<h1>404</h1>");
});

test("asset errors retain a localized safe 404 without falling back to stale content", async () => {
  for (const [prefix, expected] of [["", "Страница не найдена"], ["/en", "Page not found"], ["/es", "Página no encontrada"]]) {
    const response = await onRequest({ request: new Request(`https://slotfolio.org${prefix}/regions/?x=%3Cscript%3E`),
      env: { ASSETS: { fetch: async () => { throw Error("Unavailable asset"); } } }, next: async () => new Response("Old page"),
    });
    expect(response.status).toBe(404);
    const body = await response.text();
    expect(body).toContain(expected);
    expect(body).not.toMatch(/<script>|Old page/);
  }
});

test("active pages, search and similar names pass through unchanged", async () => {
  for (const path of ["/", "/en/", "/es/slots/", "/slots/catalog/regions-of-ra/", "/regions-of-ra/", "/disclosure-notes/", "/search/?q=regions"]) {
    expect(retiredInformationPath.test(new URL(path, "https://slotfolio.org").pathname)).toBe(false);
    const original = new Response("Unchanged static response", { status: 200 });
    expect(await onRequest({ request: new Request("https://slotfolio.org" + path),
      env: { ASSETS: { fetch: async () => { throw Error("Must not fetch 404"); } } }, next: async () => original,
    })).toBe(original);
  }
});

test("localized 404 assets hydrate and navigate home without React errors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const [prefix, locale] of [["", "ru"], ["/en", "en"], ["/es", "es"]]) {
    await page.goto(prefix + "/404/");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("main h1:visible")).toHaveCount(1);
    const robots = page.locator('meta[name="robots"]');
    expect(await robots.count()).toBeGreaterThan(0);
    for (const directive of await robots.all()) await expect(directive).toHaveAttribute("content", /noindex/);
    await page.locator("header .brand").click();
    await expect(page).toHaveURL(testBaseURL.replace(/\/$/, "") + prefix + "/");
    await expect(page.getByRole("heading", { level: 1, name: "Gates of Olympus", exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  }
});
