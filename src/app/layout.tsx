import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/shell";
import { JsonLd } from "@/components/json-ld";
import { SITE_DESCRIPTION, SITE_NAME, indexingEnabled, siteUrl } from "@/lib/seo";
import "./globals.css";
import "./v127-overrides.css";
import "./catalog-card-polish.css";
import "./fact-layout-polish.css";
import "./typography-readability.css";

const golos = localFont({
  variable: "--font-golos",
  display: "swap",
  src: [
    { path: "../../public/fonts/golos-0.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/golos-1.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/golos-2.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/golos-3.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/golos-4.ttf", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl()}/`),
  title: {
    default: "Slotfolio — игры, механики и контекст",
    template: "%s — Slotfolio",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  robots: indexingEnabled()
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={golos.variable}>
      <body>
        {/* Sync the top-level document language for static /en and /es pages without
            request headers, middleware or runtime locale negotiation. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang = /^\\/en(?:\\/|$)/.test(location.pathname.replace(/^\\/slotfolio(?=\\/|$)/, '')) ? 'en' : /^\\/es(?:\\/|$)/.test(location.pathname.replace(/^\\/slotfolio(?=\\/|$)/, '')) ? 'es' : 'ru';" }} />
        {/* Save an explicit language click even before React has hydrated the header. */}
        <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('click', function(event) {
          var link = event.target instanceof Element ? event.target.closest('a[data-language-choice]') : null;
          var locale = link && link.getAttribute('data-language-choice');
          if (locale === 'ru' || locale === 'en' || locale === 'es') {
            try { localStorage.setItem('slotfolio-language', locale); } catch {}
            var destination = new URL(link.href, location.href);
            if (destination.origin === location.origin) {
              destination.search = location.search;
              destination.hash = location.hash;
              link.href = destination.toString();
            }
          }
        }, true);` }} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: siteUrl(),
            description: SITE_DESCRIPTION,
            inLanguage: ["ru", "en", "es"],
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: siteUrl(),
            },
          }}
        />
        <a href="#main" className="skip-link" data-locale="ru" lang="ru">
          Перейти к содержимому
        </a>
        <a href="#main" className="skip-link" data-locale="en" lang="en">
          Skip to content
        </a>
        <a href="#main" className="skip-link" data-locale="es" lang="es">Saltar al contenido</a>
        <div className="site">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
