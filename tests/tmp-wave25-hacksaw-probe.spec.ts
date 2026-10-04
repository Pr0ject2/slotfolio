import { test } from "@playwright/test";

const games = [
  [
    "spear-of-athena",
    "https://www.hacksawgaming.com/games/spear-of-athena"
  ],
  [
    "spinman",
    "https://www.hacksawgaming.com/games/spinman"
  ],
  [
    "steamrunners",
    "https://www.hacksawgaming.com/games/steamrunners"
  ],
  [
    "stormborn",
    "https://www.hacksawgaming.com/games/stormborn"
  ],
  [
    "strength-of-hercules",
    "https://www.hacksawgaming.com/games/strength-of-hercules"
  ],
  [
    "sun-princess",
    "https://www.hacksawgaming.com/games/sun-princess"
  ],
  [
    "superstar-sevens",
    "https://www.hacksawgaming.com/games/superstar-sevens"
  ],
  [
    "supreme-zeus",
    "https://www.hacksawgaming.com/games/supreme-zeus"
  ],
  [
    "tai-the-toad",
    "https://www.hacksawgaming.com/games/tai-the-toad"
  ],
  [
    "temple-of-torment",
    "https://www.hacksawgaming.com/games/temple-of-torment"
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
    const bodyText = (await page.locator("body").innerText()).replace(/\r/g, "");
    const images = await page.locator("img").evaluateAll((nodes) =>
      nodes.map((node) => ({
        alt: node.getAttribute("alt"),
        src: (node as HTMLImageElement).currentSrc || node.getAttribute("src"),
      }))
    );
    console.log(`W25_${key.toUpperCase().replace(/-/g,"_")}_TEXT=` + JSON.stringify(texts));
    console.log(`W25_${key.toUpperCase().replace(/-/g,"_")}_LEAVES=` + JSON.stringify(leaves));
    console.log(`W25_${key.toUpperCase().replace(/-/g,"_")}_BODY=` + JSON.stringify(bodyText));
    console.log(`W25_${key.toUpperCase().replace(/-/g,"_")}_IMAGES=` + JSON.stringify(images));
  });
}
