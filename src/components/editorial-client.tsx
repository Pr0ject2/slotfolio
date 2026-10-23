import { withBasePath } from "@/lib/base-path";
import { SlotArtwork } from "./slot-artwork";
import type { SiteLocale } from "@/lib/locales";
export function GameImage({ slot, locale = "ru" }: { slot: { name: string; image: string }; locale?: SiteLocale }) {
  return (
    <SlotArtwork
      className="game-image"
      src={withBasePath(slot.image)}
      alt={locale === "es" ? `Imagen de ${slot.name}` : locale === "en" ? `${slot.name} artwork` : `Иллюстрация ${slot.name}`}
      width="500"
      height="280"
      loading="lazy"
      decoding="async"
    />
  );
}
