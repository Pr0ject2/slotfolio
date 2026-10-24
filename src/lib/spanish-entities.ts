import mechanicCopy from "./spanish-mechanic-copy.json" with { type: "json" };
import { mechanics } from "./data";
import { mechanicGuides } from "./profile-content";

export const spanishMechanicSlugs = Object.keys(mechanicCopy);
export function spanishMechanic(slug: string) {
  const original = mechanics.find(item => item.slug === slug);
  const copy = mechanicCopy[slug as keyof typeof mechanicCopy];
  const guide = mechanicGuides[slug];
  if (!original || !copy || !guide) return undefined;
  return { ...original, ...guide, ...copy };
}
