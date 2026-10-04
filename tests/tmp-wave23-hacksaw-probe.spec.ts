import { test } from "@playwright/test";

const games = [
  [
    "mighty-masks",
    "https://www.hacksawgaming.com/games/mighty-masks"
  ],
  [
    "munchy-milo",
    "https://www.hacksawgaming.com/games/munchy-milo"
  ],
  [
    "octo-attack",
    "https://www.hacksawgaming.com/games/octo-attack"
  ],
  [
    "orb-of-destiny",
    "https://www.hacksawgaming.com/games/orb-of-destiny"
  ],
  [
    "phoenix-duelreels",
    "https://www.hacksawgaming.com/games/phoenix-duelreels"
  ],
  [
    "pray-for-six",
    "https://www.hacksawgaming.com/games/pray-for-six"
  ],
  [
    "pray-for-three",
    "https://www.hacksawgaming.com/games/pray-for-three"
  ],
  [
    "rainbow-princess",
    "https://www.hacksawgaming.com/games/rainbow-princess"
  ],
  [
    "red-rascal",
    "https://www.hacksawgaming.com/games/red-rascal"
  ],
  [
    "reign-of-rome",
    "https://www.hacksawgaming.com/games/reign-of-rome"
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
    const images = await page.locator("img").evaluateAll((nodes) =>
      nodes.map((node) => ({
        alt: node.getAttribute("alt"),
        src: (node as HTMLImageElement).currentSrc || node.getAttribute("src"),
      }))
    );
    console.log(`W23_${key.toUpperCase().replace(/-/g,"_")}_TEXT=` + JSON.stringify(texts));
    console.log(`W23_${key.toUpperCase().replace(/-/g,"_")}_IMAGES=` + JSON.stringify(images));
  });
}
