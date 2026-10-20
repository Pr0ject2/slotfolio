import { isIP } from "node:net";

const assetPath = /^\/images\/(?:catalog|slots)\/[a-z0-9][a-z0-9_-]*\.webp$/;
const slugPattern = /^[a-z0-9][a-z0-9-]*$/;
const localHostSuffixes = [".localhost", ".local", ".internal", ".test", ".invalid"];

export function safeHttpsUrl(value, base) {
  if (typeof value !== "string" || !value.trim()) throw new Error("Missing source URL");
  const url = new URL(value, base);
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  const ipCandidate = host.startsWith("[") && host.endsWith("]") ? host.slice(1, -1) : host;
  if (url.protocol !== "https:" || url.username || url.password || !host ||
      host === "localhost" || isIP(ipCandidate) !== 0 ||
      localHostSuffixes.some((suffix) => host.endsWith(suffix))) {
    throw new Error("Source URL must use a public HTTPS hostname without credentials");
  }
  return url.toString();
}

export function validAssetLocal(entry) {
  if (!entry || typeof entry !== "object" || !slugPattern.test(entry.slug || "")) {
    throw new Error("Unsafe asset slug");
  }
  if (typeof entry.local !== "string" || !assetPath.test(entry.local)) {
    throw new Error("Asset destination must be an approved local image path");
  }
  if (entry.placeholder || entry.localize === "checked-in-placeholder") {
    throw new Error("Editorial placeholders are not approved game artwork");
  }
  return entry.local.slice(1);
}

export function validateAssetManifestEntry(entry) {
  validAssetLocal(entry);
  safeHttpsUrl(entry.page);
  if (entry.image) safeHttpsUrl(entry.image);
  return entry;
}

export async function readBounded(response, maxBytes) {
  const declared = Number(response.headers.get("content-length") || 0);
  if (declared > maxBytes) throw new Error("Source exceeds allowed download size");
  if (!response.body) throw new Error("Source body missing");
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw new Error("Source exceeds allowed download size");
      chunks.push(Buffer.from(value));
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks, size);
}
