import Link from "next/link";
import { notFound } from "next/navigation";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { englishJournalGuides } from "@/lib/english-journal-guides";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/journal/guides.module.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return englishJournalGuides.map(({ slug }) => ({ slug }));
}
async function findGuide(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const guide = englishJournalGuides.find(item => item.slug === slug);
  if (!guide) notFound();
  return guide;
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = await findGuide(params);
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/en/journal/${guide.slug}`,
    openGraphType: "article",
    noIndex: true,
  });
}
export default async function EnglishJournalGuide({ params }: { params: Promise<{ slug: string }> }) {
  const guide = await findGuide(params);
  return (
    <div className={styles.guide}>
      <ArticleJsonLd title={guide.title} description={guide.description} path={`/en/journal/${guide.slug}`} />
      <EnglishBreadcrumbs items={[
        { label: "Journal and guides", href: "/en/journal" },
        { label: guide.title },
      ]} />
      <header className={styles.heading}>
        <span className="eyebrow accent">Guide / {guide.category}</span>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <p className={styles.byline}>Slotfolio editorial team</p>
      </header>
      <div className="article-layout">
        <nav className={`article-toc ${styles.contents}`} aria-label="On this page">
          <span className="eyebrow">On this page</span>
          {guide.sections.map(section => (
            <a href={`#${section.id}`} key={section.id}>{section.title}</a>
          ))}
          <a href="#sources">Sources and further reading</a>
        </nav>
        <article className={`prose ${styles.body}`}>
          {guide.sections.map(section => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.example && (
                <aside className={styles.example} aria-label={section.example.title}>
                  <h3>{section.example.title}</h3>
                  <p>{section.example.text}</p>
                </aside>
              )}
              {section.checks && <ul>{section.checks.map(check => <li key={check}>{check}</li>)}</ul>}
            </section>
          ))}
          <section id="sources">
            <h2>Sources and further reading</h2>
            <p>These illustrations explain game rules. They do not predict outcomes. Check the paytable for the actual game configuration you are using.</p>
            <ul>
              {guide.sources.map(source => (
                <li key={source.href}>
                  {source.href.startsWith("/") ? <Link href={source.href}>{source.label}</Link> :
                    <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>}
                </li>
              ))}
            </ul>
            <h3>Related guides</h3>
            <ul>{guide.related.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
            <Link href="/en/journal" className="text-link">All journal guides ↗</Link>
          </section>
        </article>
      </div>
    </div>
  );
}
