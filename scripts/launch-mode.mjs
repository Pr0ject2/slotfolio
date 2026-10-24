import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
/** @param {Record<string, string | undefined>} env */
export function cloudflareLaunchIndexing(env = process.env) {
  const value = env.SLOTFOLIO_LAUNCH_INDEXING || "false";
  if (!["true", "false"].includes(value))
    throw Error("SLOTFOLIO_LAUNCH_INDEXING must be true or false");
  return (
    value === "true" && env.CF_PAGES === "1" && env.CF_PAGES_BRANCH === "main"
  );
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  console.log(String(cloudflareLaunchIndexing()));
