import Link from "next/link";
import { notFound } from "next/navigation";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import styles from "@/components/information-page.module.css";
import { englishSystemPages } from "@/lib/english-system-pages";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(englishSystemPages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const data = englishSystemPages[page];
  return data
    ? pageMetadata({ title: data.title, description: data.intro, path: `/en/${page}` })
    : pageMetadata({ title: "Page not found", description: "No such page is available in English.", path: "/en", noIndex: true });
}

export default async function EnglishInformationPage({ params }: { params: Promise<{ page: string }> }) {
  const data = englishSystemPages[(await params).page];
  if (!data) notFound();
  return (
    <div className={styles.page}>
      <EnglishBreadcrumbs items={[{ label: data.eyebrow }]} />
      <header className="simple-heading">
        <span className="eyebrow accent">{data.eyebrow}</span>
        <h1>{data.title}</h1>
        <p>{data.intro}</p>
      </header>
      <div className="article-layout">
        <nav className="article-toc" aria-label="On this page">
          <span className="eyebrow">On this page</span>
          {data.sections.map((section, i) => (
            <a key={section.title} href={`#section-${i}`}>{section.title}</a>
          ))}
        </nav>
        <article className="prose">
          {data.sections.map((section, i) => (
            <section key={section.title} id={`section-${i}`}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
              {section.steps && <ul>{section.steps.map((step) => <li key={step}>{step}</li>)}</ul>}
              {section.links && (
                <ul className={styles.links}>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("/")
                        ? <Link href={link.href}>{link.label}</Link>
                        : <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
