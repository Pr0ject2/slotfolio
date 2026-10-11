import { test } from "node:test";
import assert from "node:assert/strict";
import { safeHttpsUrl, validAssetLocal, validateAssetManifestEntry, readBounded } from "../scripts/asset-security.mjs";

const good = { slug: "playn-go-reactoonz-100", local: "/images/catalog/playn-go-reactoonz-100.webp",
  page: "https://www.playngo.com/games/reactoonz-100" };

test("approved published local image paths and HTTPS sources", () => {
  assert.equal(validAssetLocal(good), "images/catalog/playn-go-reactoonz-100.webp");
  assert.equal(validateAssetManifestEntry(good), good);
  assert.equal(safeHttpsUrl("/media/image.webp", "https://www.playngo.com/games/foo"), "https://www.playngo.com/media/image.webp");
  assert.equal(validAssetLocal({ slug:"house-of-sins", local:"/images/slots/house-of-sins.svg", localize:"checked-in-placeholder" }), "images/slots/house-of-sins.svg");
});

test("traversal, path escapes and external file types are rejected", () => {
  for (const local of ["/images/slots/../../.github/workflows/ci.yml","//images/slots/x.webp",
    "/images/slots/evil.html", "/images/slots/sub/x.webp", "/images/slots/%2e%2e.webp",
    "/images/slots/evil.webp?x=1", "/private/slot.webp"]) {
    assert.throws(() => validAssetLocal({ ...good, local }));
  }
  for (const slug of ["../config","../", "x/y", "", "e%2f"]) {
    assert.throws(() => validAssetLocal({ ...good, slug }));
  }
  assert.throws(() => validAssetLocal({ slug:"house-of-sins", local:"/images/slots/house-of-sins.svg" }));
});

test("SSRF-prone, credential and non-HTTPS addresses are rejected", () => {
  for (const url of ["http://example.com/image.webp","file:///etc/passwd","https://localhost/x",
    "https://127.0.0.1/x", "https://169.254.169.254/latest/meta-data",
    "https://[::1]/x","https://[fe80::1]/x","https://x.internal/x", "https://x.local/x",
    "https://name:pass@example.com/x","https://example.invalid/x"]) {
    assert.throws(() => safeHttpsUrl(url), url);
  }
});

test("bounded stream rejects oversized remote responses", async () => {
  const response = new Response(new Uint8Array(2048), { headers: { "content-type": "image/webp" } });
  await assert.rejects(readBounded(response, 1024), /allowed download size/);
  const acceptable = new Response(new Uint8Array(20));
  assert.equal((await readBounded(acceptable, 1024)).length, 20);
});
