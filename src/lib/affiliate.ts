// Only explicitly configured HTTPS destinations can become commercial links.
import { withBasePath } from "./base-path";
export const operators = {
  "1win": {
    name: "1win",
    url: process.env.AFFILIATE_1WIN_URL || "",
    disclosure:
      "Партнёрская ссылка. Редакция может получить вознаграждение за переход или регистрацию.",
  },
};
export function affiliateUrl() {
  // Fail closed until explicit trusted partner hostnames have been configured.
  const allowlist = (process.env.AFFILIATE_1WIN_ALLOWED_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter((host) => /^[a-z0-9][a-z0-9.-]*$/.test(host));
  if (!allowlist.length) return null;
  try {
    const u = new URL(process.env.AFFILIATE_1WIN_URL || "");
    if (u.protocol !== "https:" || u.username || u.password || u.port ||
        !allowlist.includes(u.hostname.toLowerCase())) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function affiliateHref(context: string) {
  return process.env.GITHUB_ACTIONS === "true"
    ? affiliateUrl()!
    : withBasePath(`/go/1win?context=${encodeURIComponent(context)}`);
}
