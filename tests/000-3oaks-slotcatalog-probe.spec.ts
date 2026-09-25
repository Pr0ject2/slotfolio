import { expect, test } from "@playwright/test";

test.only("probe SlotCatalog 3 Oaks provider index", async ({ request }) => {
  const url = "https://slotcatalog.com/en/soft/3-Oaks";
  const response = await request.get(url, {
    timeout: 30_000,
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const body = await response.text();
  const hrefs = [...body.matchAll(/href=["']([^"']*\/slots\/[^"'#?]+)["']/gi)]
    .map((match) => match[1])
    .filter((value, index, array) => array.indexOf(value) === index);
  const marker = body.toLowerCase().indexOf("15 dragon pearls");
  console.log("THREE_OAKS_SLOTCATALOG_INDEX", JSON.stringify({
    status: response.status(),
    length: body.length,
    hrefCount: hrefs.length,
    hrefs: hrefs.slice(0, 500),
    markerSnippet: marker >= 0 ? body.slice(Math.max(0, marker - 1000), marker + 3000) : null,
  }));
  expect(response.status()).toBe(-1);
});
