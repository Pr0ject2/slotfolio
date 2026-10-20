"use client";
import { useEffect, useRef, type ImgHTMLAttributes } from "react";
import { withBasePath } from "@/lib/base-path";
import { hasReviewedGameArtwork } from "@/lib/artwork-availability";

export function SlotArtwork(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  function fallbackImage(image: HTMLImageElement) {
    const fallback = withBasePath("/images/unavailable.svg");
    if (image.getAttribute("src") !== fallback) {
      image.removeAttribute("srcset");
      image.src = fallback;
    }
  }
  useEffect(() => {
    // An eager server-rendered image may fail before React attaches onError.
    if (ref.current?.complete && !ref.current.naturalWidth) fallbackImage(ref.current);
  }, [props.src]);
  if (!hasReviewedGameArtwork(props.src)) return null;
  return <img {...props} ref={ref} onError={(event) => fallbackImage(event.currentTarget)} />;
}
