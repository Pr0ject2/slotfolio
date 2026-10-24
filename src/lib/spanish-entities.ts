import mechanicCopy from "./spanish-mechanic-copy.json" with { type: "json" };
import providerCopy from "./spanish-provider-copy.json" with { type: "json" };
import { mechanics, providerProfiles } from "./data";
import { mechanicGuides, providerReadingNotes } from "./profile-content";
import { providerReadingNotesV129 } from "./provider-reading-v129";

export const spanishProviderSlugs=Object.keys(providerCopy);
export function spanishProvider(slug:string){
  const original=providerProfiles.find(item=>item.slug===slug);const copy=providerCopy[slug as keyof typeof providerCopy];if(!original||!copy)return undefined;
  const reading=providerReadingNotesV129[slug]??providerReadingNotes[slug];
  const extended=copy as typeof copy & {readingTitle?:string;readingText?:string};
  return {...original,...copy,reading:reading&&extended.readingTitle&&extended.readingText?{...reading,title:extended.readingTitle,text:extended.readingText}:undefined};
}

export const spanishMechanicSlugs = Object.keys(mechanicCopy);
export function spanishMechanic(slug: string) {
  const original = mechanics.find(item => item.slug === slug);
  const copy = mechanicCopy[slug as keyof typeof mechanicCopy];
  const guide = mechanicGuides[slug];
  if (!original || !copy || !guide) return undefined;
  return { ...original, ...guide, ...copy };
}
