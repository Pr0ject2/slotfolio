import { expect, test } from "@playwright/test";
import { affiliateUrl } from "../src/lib/affiliate";

test("affiliate redirects are disabled unless approved HTTPS host is configured", () => {
  const previousUrl = process.env.AFFILIATE_1WIN_URL;
  const previousAllow = process.env.AFFILIATE_1WIN_ALLOWED_HOSTS;
  try {
    process.env.AFFILIATE_1WIN_URL = "https://legitimate.example/campaign";
    delete process.env.AFFILIATE_1WIN_ALLOWED_HOSTS;
    expect(affiliateUrl()).toBeNull();

    process.env.AFFILIATE_1WIN_ALLOWED_HOSTS = "legitimate.example";
    expect(affiliateUrl()).toBe("https://legitimate.example/campaign");
    process.env.AFFILIATE_1WIN_URL = "https://legitimate.example.evil.test/redirect";
    expect(affiliateUrl()).toBeNull();
    process.env.AFFILIATE_1WIN_URL = "https://user:pass@legitimate.example/redirect";
    expect(affiliateUrl()).toBeNull();
    process.env.AFFILIATE_1WIN_URL = "http://legitimate.example/redirect";
    expect(affiliateUrl()).toBeNull();
    process.env.AFFILIATE_1WIN_URL = "https://legitimate.example:444/redirect";
    expect(affiliateUrl()).toBeNull();
  } finally {
    if (previousUrl === undefined) delete process.env.AFFILIATE_1WIN_URL;
    else process.env.AFFILIATE_1WIN_URL = previousUrl;
    if (previousAllow === undefined) delete process.env.AFFILIATE_1WIN_ALLOWED_HOSTS;
    else process.env.AFFILIATE_1WIN_ALLOWED_HOSTS = previousAllow;
  }
});
