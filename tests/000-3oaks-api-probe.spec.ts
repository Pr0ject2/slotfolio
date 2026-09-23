import { expect, test } from "@playwright/test";

const mainScript = "https://3oaks.com/main.f140841883565265.js";

function snippets(text: string, pattern: string, limit = 20) {
  const rows: string[] = [];
  let from = 0;
  for (let count = 0; count < limit; count += 1) {
    const index = text.toLowerCase().indexOf(pattern.toLowerCase(), from);
    if (index < 0) break;
    rows.push(text.slice(Math.max(0, index - 320), Math.min(text.length, index + 700)));
    from = index + pattern.length;
  }
  return rows;
}

test.only("probe exact 3 Oaks API base and game routes", async ({ request }) => {
  const response = await request.get(mainScript, { timeout: 30_000 });
  const text = await response.text();

  const patterns = [
    "baseURL",
    "axios.create",
    "games/",
    "/games",
    "game/:name",
    "fetchItem(){let e=",
    "site-3oaks",
    "goreel.tech",
    "news/articles",
  ];

  for (const pattern of patterns) {
    console.log(`THREE_OAKS_PATTERN_${pattern.replace(/[^a-z0-9]+/gi, "_")}`, JSON.stringify(snippets(text, pattern)));
  }

  const likelyPaths = [...text.matchAll(/["'`]\/(?:games?|news|api)[A-Za-z0-9_?&=/${}.:-]*/g)]
    .map((match) => match[0])
    .filter((value, index, all) => all.indexOf(value) === index)
    .slice(0, 200);
  console.log("THREE_OAKS_LIKELY_PATHS", JSON.stringify(likelyPaths));

  expect(text.length).toBe(-1);
});
