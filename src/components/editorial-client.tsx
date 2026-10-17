import { withBasePath } from "@/lib/base-path";
import { SlotArtwork } from "./slot-artwork";
export function GameImage({ slot, locale = "ru" }: { slot: { name: string; image: string }; locale?: "ru" | "en" }) {
  return (
    <SlotArtwork
      className="game-image"
      src={withBasePath(slot.image)}
      alt={locale === "en" ? `${slot.name} artwork` : `Иллюстрация ${slot.name}`}
      width="500"
      height="280"
      loading="lazy"
      decoding="async"
    />
  );
}
