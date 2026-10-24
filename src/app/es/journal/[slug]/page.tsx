import Link from "next/link";
import { notFound } from "next/navigation";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { spanishJournalGuides } from "@/lib/spanish-journal-guides";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/journal/guides.module.css";
export const dynamicParams=false;
export function generateStaticParams(){return spanishJournalGuides.map(({slug})=>({slug}));}
async function findGuide(params:Promise<{slug:string}>){const {slug}=await params;const guide=spanishJournalGuides.find(item=>item.slug===slug);if(!guide)notFound();return guide;}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const guide=await findGuide(params);return pageMetadata({title:guide.title,description:guide.description,path:`/es/journal/${guide.slug}`,openGraphType:"article",previewOnly: true});}
export default async function SpanishJournalGuide({params}:{params:Promise<{slug:string}>}){const guide=await findGuide(params);return <div className={styles.guide}>
  <ArticleJsonLd title={guide.title} description={guide.description} path={`/es/journal/${guide.slug}`} locale="es" />
  <SpanishBreadcrumbs items={[{label:"Revista y guías",href:"/es/journal"},{label:guide.title}]} />
  <header className={styles.heading}><span className="eyebrow accent">Guía / {guide.category}</span><h1>{guide.title}</h1><p>{guide.description}</p><p className={styles.byline}>Equipo editorial de Slotfolio</p></header>
  <div className="article-layout"><nav className={`article-toc ${styles.contents}`} aria-label="En esta página"><span className="eyebrow">En esta página</span>{guide.sections.map(section=><a href={`#${section.id}`} key={section.id}>{section.title}</a>)}<a href="#sources">Fuentes y otras lecturas</a></nav>
    <article className={`prose ${styles.body}`}>{guide.sections.map(section=><section key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.example&&<aside className={styles.example} aria-label={section.example.title}><h3>{section.example.title}</h3><p>{section.example.text}</p></aside>}{section.checks&&<ul>{section.checks.map(check=><li key={check}>{check}</li>)}</ul>}</section>)}
      <section id="sources"><h2>Fuentes y otras lecturas</h2><p>Estos ejemplos explican las reglas del juego. No predicen los resultados. Consulta la tabla de pagos de la configuración concreta que utilizas.</p><ul>{guide.sources.map(source=><li key={source.href}>{source.href.startsWith("/")?<Link href={source.href}>{source.label}</Link>:<a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>}</li>)}</ul><h3>Guías relacionadas</h3><ul>{guide.related.map(link=><li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul><Link href="/es/journal" className="text-link">Todas las guías de la revista ↗</Link></section>
    </article>
  </div>
</div>;}
