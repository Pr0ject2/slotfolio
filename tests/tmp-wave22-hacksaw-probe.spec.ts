import { test } from "@playwright/test";

const games = [
  [
    "le-sortudo",
    "https://www.hacksawgaming.com/games/le-sortudo"
  ],
  [
    "le-viking",
    "https://www.hacksawgaming.com/games/le-viking"
  ],
  [
    "le-zeus",
    "https://www.hacksawgaming.com/games/le-zeus"
  ],
  [
    "magic-piggy-og",
    "https://www.hacksawgaming.com/games/magic-piggy-og"
  ],
  [
    "marlin-masters",
    "https://www.hacksawgaming.com/games/marlin-masters"
  ],
  [
    "marlin-masters-atlantis",
    "https://www.hacksawgaming.com/games/marlin-masters-atlantis"
  ],
  [
    "marlin-masters-og",
    "https://www.hacksawgaming.com/games/marlin-masters-og"
  ],
  [
    "marlin-masters-the-big-haul",
    "https://www.hacksawgaming.com/games/marlin-masters-the-big-haul"
  ],
  [
    "mayan-stackways",
    "https://www.hacksawgaming.com/games/mayan-stackways"
  ],
  [
    "miami-mayhem",
    "https://www.hacksawgaming.com/games/miami-mayhem"
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
    console.log(`W22_${key.toUpperCase().replace(/-/g,"_")}_TEXT=` + JSON.stringify(texts));
    console.log(`W22_${key.toUpperCase().replace(/-/g,"_")}_IMAGES=` + JSON.stringify(images));
  });
}
