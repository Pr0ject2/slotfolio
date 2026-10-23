import Link from "next/link";
import { getSlot } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { retiredSlotLinks, type RetiredSlotSlug } from "@/lib/retired-slot-links";
import { SpanishBreadcrumbs } from "./spanish-breadcrumbs";
import { SpanishGameRow } from "./spanish-entity-profile";
export function spanishRetiredSlotMetadata(slug:RetiredSlotSlug){const entry=retiredSlotLinks[slug];return pageMetadata({title:`${entry.series}: elige una edición del juego`,description:`Abre la edición exacta de ${entry.series} para comprobar sus reglas y funciones.`,path:`/es/slots/${slug}`,noIndex:true});}
export function SpanishRetiredSlotLink({slug}:{slug:RetiredSlotSlug}){const entry=retiredSlotLinks[slug];return <>
  <SpanishBreadcrumbs items={[{label:"Catálogo",href:"/es/slots"},{label:entry.name}]} />
  <div className="page-heading utility-heading"><div><span className="eyebrow accent">{entry.series}</span><h1>Elige una edición del juego</h1></div><p>El enlace antiguo «{entry.name}» ya no se utiliza. Estas son ediciones distintas de {entry.series}; abre el título exacto para comprobar sus reglas.</p></div>
  <div className="game-list entity-games" aria-label="Ediciones disponibles del juego">{entry.games.map((slug,index)=>{const game=getSlot(slug);if(!game)throw new Error(`Missing published edition for retired link: ${slug}`);return <SpanishGameRow key={slug} game={game} index={index} />;})}</div>
  <p className="source-note"><Link className="text-link" href="/es/slots">Explorar todos los juegos ↗</Link></p>
</>;}
