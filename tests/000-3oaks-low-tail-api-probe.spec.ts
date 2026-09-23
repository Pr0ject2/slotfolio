import { expect, test } from "@playwright/test";

const targets = [
  "coinup_volcano",
  "book_of_sun_multichance",
];

test.only("probe remaining released low-score 3 Oaks API records", async ({ request }) => {
  const rows = [];
  for (const name of targets) {
    const url = `https://3oaks.com/api/v1/games/${name}`;
    const response = await request.get(url, { timeout: 30_000 });
    rows.push({
      name,
      url,
      status: response.status(),
      body: (await response.text()).slice(0, 30_000),
    });
  }

  console.log("THREE_OAKS_LOW_TAIL_API", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
