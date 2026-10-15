import Link from "next/link";
import { notFound } from "next/navigation";
import { journalGuides } from "@/lib/journal-guides";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/editorial";
import { ArticleJsonLd } from "@/components/article-json-ld";
import styles from "../guides.module.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return journalGuides.map(({ slug }) => ({ slug }));
}
async function findGuide(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const guide = journalGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return guide;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guide = await findGuide(params);
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/journal/${guide.slug}`,
    openGraphType: "article",
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guide = await findGuide(params);
  return (
    <div className={styles.guide}>
      <ArticleJsonLd
        title={guide.title}
        description={guide.description}
        path={`/journal/${guide.slug}`}
      />
      <Breadcrumbs
        items={[{ label: "Разборы", href: "/journal" }, { label: guide.title }]}
      />
      <header className={styles.heading}>
        <span className="eyebrow accent">Гайд / {guide.category}</span>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <p className={styles.byline}>Редакция Slotfolio</p>
      </header>
      <div className="article-layout">
        <nav
          className={`article-toc ${styles.contents}`}
          aria-label="В материале"
        >
          <span className="eyebrow">В материале</span>
          {guide.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
          <a href="#sources">Источники и дальнейшее чтение</a>
        </nav>
        <article className={`prose ${styles.body}`}>
          {guide.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.example && (
                <aside
                  className={styles.example}
                  aria-label={section.example.title}
                >
                  <h3>{section.example.title}</h3>
                  <p>{section.example.text}</p>
                </aside>
              )}
              {section.checks && (
                <ul>
                  {section.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <section id="sources">
            <h2>Источники и дальнейшее чтение</h2>
            <p>
              Примеры объясняют правила, а не предсказывают результат игры.
              Условия конкретной версии сверяйте с её справкой.
            </p>
            <ul>
              {guide.sources.map((source) => (
                <li key={source.href}>
                  {source.href.startsWith("/") ? (
                    <Link href={source.href}>{source.label}</Link>
                  ) : (
                    <a href={source.href} rel="noreferrer" target="_blank">
                      {source.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <h3>Связанные материалы</h3>
            <ul>
              {guide.related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/journal">
              Все разборы и гайды ↗
            </Link>
          </section>
        </article>
      </div>
    </div>
  );
}
