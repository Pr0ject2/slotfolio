import { expect, type Page } from "@playwright/test";

export async function openLanguagePicker(page: Page) {
  const picker = page.locator("header details");
  if (!(await picker.getAttribute("open"))) {
    // Boolean HTML attributes have an empty value when present.
    if (
      !(await picker.evaluate(
        (element) => (element as HTMLDetailsElement).open,
      ))
    ) {
      await picker.locator("summary").click();
    }
  }
  await expect(picker).toHaveAttribute("open", "");
}

export async function chooseLanguage(page: Page, language: "RU" | "EN" | "ES") {
  await openLanguagePicker(page);
  await page.getByRole("link", { name: language, exact: true }).click();
}
