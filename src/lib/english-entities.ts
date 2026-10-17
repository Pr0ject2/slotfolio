import providerCopy from "./english-provider-copy.json" with { type: "json" };
import mechanicCopy from "./english-mechanic-copy.json" with { type: "json" };
import { providerProfiles, mechanics } from "./data";
import { mechanicGuides, providerReadingNotes } from "./profile-content";
import { providerReadingNotesV129 } from "./provider-reading-v129";

export const englishProviderSlugs = Object.keys(providerCopy);
export const englishMechanicSlugs = Object.keys(mechanicCopy);
export function englishProvider(slug: string) {
  const original = providerProfiles.find((item) => item.slug === slug);
  const copy = providerCopy[slug as keyof typeof providerCopy];
  if (!original || !copy) return undefined;
  const reading = providerReadingNotesV129[slug] ?? providerReadingNotes[slug];
  const extended = copy as typeof copy & {
    readingTitle?: string;
    readingText?: string;
  };
  return {
    ...original,
    ...copy,
    reading:
      reading && extended.readingTitle && extended.readingText
        ? {
            ...reading,
            title: extended.readingTitle,
            text: extended.readingText,
          }
        : undefined,
  };
}
export function englishMechanic(slug: string) {
  const original = mechanics.find((item) => item.slug === slug);
  const copy = mechanicCopy[slug as keyof typeof mechanicCopy];
  const guide = mechanicGuides[slug];
  if (!original || !copy || !guide) return undefined;
  return { ...original, ...guide, ...copy };
}
