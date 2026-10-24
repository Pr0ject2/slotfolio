import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const languagePages = [
  { path: "/disclosure/", phrase: "партнёрская ссылка на общую подборку казино", disallow: "нет действующих партнёрских предложений" },
  { path: "/en/disclosure/", phrase: "affiliate link to a general selection of casinos", disallow: "does not currently display any active casino affiliate offers" },
  { path: "/es/disclosure/", phrase: "selección general", disallow: "no muestra enlaces" },
] as const;

for (const entry of languagePages) {
  test(`prelaunch: ${entry.path} accurately describes active casino referrals`, async ({ page }) => {
    await page.goto(entry.path);
    await expect(page.getByText(entry.phrase, { exact: false })).toBeVisible();
    await expect(page.getByText(entry.disallow, { exact: false })).toHaveCount(0);
  });
}

test("prelaunch: disclosure agrees with the actual tagged casino link", async () => {
  const content = readFileSync("src/components/slot-casino-link.tsx", "utf8");
  expect(content).toContain('href="https://viazento.link/slotfolio"');
  expect(content).toContain('rel="sponsored nofollow noopener noreferrer"');
  for (const [path, statement] of [
    ["src/lib/system-pages.ts", "партнёрская ссылка на общую подборку казино"],
    ["src/lib/english-system-pages.ts", "affiliate link to a general selection of casinos"],
    ["src/lib/spanish-system-pages.ts", "selección general"],
  ] as const) {
    expect(readFileSync(path, "utf8")).toContain(statement);
  }
});

test("prelaunch: the English about page links to translated catalogue and comparison", async ({ page }) => {
  await page.goto("/en/about/");
  await expect(page.getByRole("link", {name: "Open the English catalogue"})).toHaveAttribute("href", /\/en\/slots\/?$/);
  await expect(page.getByRole("link", {name: "Open the English comparison"})).toHaveAttribute("href", /\/en\/compare\/?$/);
  await expect(page.getByRole("link", {name: /catalogue \(Russian\)|comparison \(Russian\)/i})).toHaveCount(0);
});

test("prelaunch: English editorial policy no longer routes to Russian catalogue", async ({page}) => {
  await page.goto("/en/editorial-policy/");
  await expect(page.getByRole("link", {name: "Browse the English catalogue"})).toHaveAttribute("href", "/en/slots");
});
