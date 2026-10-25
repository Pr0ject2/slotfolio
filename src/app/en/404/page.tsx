import { NotFoundContent } from "@/components/not-found-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "Find a game by name or return to the Slotfolio homepage.",
  path: "/en/404",
  noIndex: true,
});

export default function Page() {
  return <NotFoundContent locale="en" />;
}
