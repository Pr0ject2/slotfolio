import { test } from "@playwright/test";

const games = [
  [
    "rise-of-fortuna",
    "https://www.hacksawgaming.com/games/rise-of-fortuna"
  ],
  [
    "rise-of-ymir",
    "https://www.hacksawgaming.com/games/rise-of-ymir"
  ],
  [
    "ronin-stackways",
    "https://www.hacksawgaming.com/games/ronin-stackways"
  ],
  [
    "rusty-and-curly",
    "https://www.hacksawgaming.com/games/rusty-and-curly"
  ],
  [
    "sand-and-ashes",
    "https://www.hacksawgaming.com/games/sand-and-ashes"
  ],
  [
    "shaolin-master",
    "https://www.hacksawgaming.com/games/shaolin-master"
  ],
  [
    "sixsixsix",
    "https://www.hacksawgaming.com/games/sixsixsix"
  ],
  [
    "slayers-inc",
    "https://www.hacksawgaming.com/games/slayers-inc"
  ],
  [
    "smoking-dragon",
    "https://www.hacksawgaming.com/games/smoking-dragon"
  ],
  [
    "snow-slingers",
    "https://www.hacksawgaming.com/games/snow-slingers"
  ]
] as const;

for (const [key, url] of games) {
  test(`temporary probe ${key}`, async ({ page }) => {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    const texts = await page.locator("h1,h2,h3,p,li").evaluateAll((nodes) => {
      const seen = new Set<string>();
      const out: string[] = [];
      for (const node of nodes) {
        const text = (node.textContent || "").replace(/\s+/g, " ").trim();
        if (!text || seen.has(text)) continue;
        seen.add(text);
        out.push(text);
      }
      return out;
    });
    const leaves = await page.locator("body *").evaluateAll((nodes) => {
      const out: string[] = [];
      const seen = new Set<string>();
      for (const node of nodes) {
        if (node.children.length) continue;
        const text = (node.textContent || "").replace(/\s+/g, " ").trim();
        if (!text || text.length > 700 || seen.has(text)) continue;
        seen.add(text);
        out.push(text);
      }
      return out;
    });
    const images = await page.locator("img").evaluateAll((nodes) =>
      nodes.map((node) => ({
        alt: node.getAttribute("alt"),
        src: (node as HTMLImageElement).currentSrc || node.getAttribute("src"),
      }))
    );
    console.log(`W24_${key.toUpperCase().replace(/-/g,"_")}_TEXT=` + JSON.stringify(texts));
    console.log(`W24_${key.toUpperCase().replace(/-/g,"_")}_LEAVES=` + JSON.stringify(leaves));
    console.log(`W24_${key.toUpperCase().replace(/-/g,"_")}_IMAGES=` + JSON.stringify(images));
  });
}
