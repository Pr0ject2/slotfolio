import { expect, test } from "@playwright/test";

const targets = [
  "https://3oaks.com/",
  "https://3oaks.com/game/3_super_hot_teapots",
  "https://3oaks.com/news/new-release-3-super-hot-teapots",
];

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

test.only("probe 3 Oaks public frontend for official data endpoints", async ({ request }) => {
  const scriptUrls: string[] = [];
  for (const url of targets) {
    const response = await request.get(url, { timeout: 30_000 });
    const html = await response.text();
    console.log("THREE_OAKS_HTML", JSON.stringify({ url, status: response.status(), length: html.length, head: html.slice(0, 1200) }));
    const matches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((match) => match[1]);
    for (const src of matches) scriptUrls.push(new URL(src, url).href);
  }

  const scripts = unique(scriptUrls);
  console.log("THREE_OAKS_SCRIPTS", JSON.stringify(scripts));

  const endpointStrings = new Set<string>();
  const apiSnippets: Array<{ script: string; snippet: string }> = [];
  for (const script of scripts.slice(0, 30)) {
    const response = await request.get(script, { timeout: 30_000 });
    const text = await response.text();
    console.log("THREE_OAKS_SCRIPT_META", JSON.stringify({ script, status: response.status(), length: text.length }));

    for (const match of text.matchAll(/https?:\\?\/\\?\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+/g)) {
      const value = match[0].replace(/\\\//g, "/");
      if (/3oaks|api|graphql|backend|game|news/i.test(value)) endpointStrings.add(value.slice(0, 500));
    }
    for (const pattern of ["api", "graphql", "backend", "3_super_hot_teapots", "/game/", "/news/"]) {
      let from = 0;
      for (let count = 0; count < 8; count += 1) {
        const index = text.toLowerCase().indexOf(pattern.toLowerCase(), from);
        if (index < 0) break;
        apiSnippets.push({ script, snippet: text.slice(Math.max(0, index - 220), Math.min(text.length, index + 420)) });
        from = index + pattern.length;
      }
    }
  }

  console.log("THREE_OAKS_ENDPOINTS", JSON.stringify([...endpointStrings]));
  console.log("THREE_OAKS_API_SNIPPETS", JSON.stringify(apiSnippets.slice(0, 80)));
  expect(scripts.length).toBe(-1);
});
