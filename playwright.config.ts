import { defineConfig } from "@playwright/test";
import { availableParallelism } from "node:os";
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  fullyParallel: false,
  // Keep the complete suite within the existing CI job budget as coverage grows.
  // Files use isolated browser contexts and read the same immutable export.
  workers: process.env.CI ? Math.min(3, availableParallelism()) : 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    // Existing Russian-site regressions run in their original language.
    // English browser detection is exercised separately with en-GB contexts.
    locale: "ru-RU",
    headless: true,
    launchOptions: {
      executablePath:
        process.env.CHROME_PATH ||
        "C:/Program Files/Google/Chrome/Application/chrome.exe",
    },
  },
});

