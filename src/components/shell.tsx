"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import styles from "./shell.module.css";
import { hasTranslation, languageHref, siteLocale, type SiteLocale } from "@/lib/locales";
import { withBasePath } from "@/lib/base-path";
import { SpanishFooter } from "./spanish-footer";
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const languagePicker = useRef<HTMLDetailsElement>(null);
  const [languageSuffix, setLanguageSuffix] = useState("");
  const path = usePathname();
  const router = useRouter();
  const locale = siteLocale(path);
  const english = locale === "en";
  const spanish = locale === "es";
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (languagePicker.current && !languagePicker.current.contains(event.target as Node)) languagePicker.current.open = false;
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  useEffect(() => {
    // Static hosting: language negotiation happens in the browser, not at the edge.
    // An explicit saved choice always wins over browser settings.
    let preference: SiteLocale | null = null;
    try {
      const stored = window.localStorage.getItem("slotfolio-language");
      if (stored === "ru" || stored === "en" || stored === "es") preference = stored;
    } catch { /* Storage may be disabled; browser language still works. */ }
    const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const firstLanguage = browserLanguages[0] || "";
    const browserLocale: SiteLocale = /^ru(?:-|$)/i.test(firstLanguage) ? "ru" : /^es(?:-|$)/i.test(firstLanguage) ? "es" : "en";
    // Treat an explicit deep-link language as intentional. Auto-detect on the
    // entry homepage; a previously saved manual choice still takes priority.
    const targetLocale = preference ?? (path === "/" ? browserLocale : siteLocale(path));
    // Keep a direct link when its requested translation is not available yet.
    if (!hasTranslation(path, targetLocale)) return;
    const target = languageHref(path, targetLocale);
    const current = path.replace(/\/$/, "") || "/";
    if (target !== current) {
      window.location.replace(withBasePath(target) + window.location.search + window.location.hash);
    }
  }, [path]);
  function chooseLanguage(locale: SiteLocale, event: MouseEvent<HTMLAnchorElement>) {
    try { window.localStorage.setItem("slotfolio-language", locale); }
    catch { /* Keep navigation functional when persistence is unavailable. */ }
    setOpen(false);
    if (languagePicker.current) languagePicker.current.open = false;
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      router.push(languageHref(path, locale) + window.location.search + window.location.hash);
    }
  }
  const to = (route: string) => languageHref(route, locale);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 601px)");
    const reset = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  const links = spanish
    ? [["/es/slots", "Catálogo"], ["/es/mechanics", "Mecánicas"], ["/es/journal", "Revista"], ["/es/collections", "Selecciones"]]
    : english
    ? [["/en/slots", "Catalogue"], ["/en/mechanics", "Mechanics"], ["/en/journal", "Journal"], ["/en/collections", "Collections"]]
    : [["/slots", "Слоты"], ["/mechanics", "Механики"], ["/journal", "Разборы"], ["/collections", "Подборки"]];
  return (
    <header lang={locale} className={`header ${styles.header}`} onKeyDown={(event) => {
      if (event.key === "Escape" && languagePicker.current?.open) {
        event.preventDefault();
        languagePicker.current.open = false;
        languagePicker.current.querySelector("summary")?.focus();
        return;
      }
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className="masthead">
        <Link href={to("/")} className="brand" aria-label={spanish ? "Slotfolio — inicio" : english ? "Slotfolio home" : "Slotfolio — главная"}>
          slotfolio<span className="brand-dot">.</span>
        </Link>
        <span className="tagline">
          {spanish ? "Reglas, guías" : english ? "Game rules, guides" : "Каталог, разборы"}
          <br />{spanish ? "y mecánicas de juego" : english ? "and mechanics" : "и механики игр"}
        </span>
        <span className="header-edition">
          {spanish ? "REGLAS · GUÍAS · RTP" : english ? "GAME RULES · GUIDES · RTP" : "КАТАЛОГ · РАЗБОРЫ · СРАВНЕНИЕ"} <span>18+</span>
        </span>
        <Link className="header-search" href={spanish ? "/es/search" : english ? "/en/search" : "/search"} aria-label={spanish ? "Buscar un juego" : english ? "Find a game" : "Найти игру"}>
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
          <span>{spanish ? "Buscar" : english ? "Search" : "Найти игру"}</span>
        </Link>
        <details ref={languagePicker} className={styles.languagePicker}
          onToggle={event => { if (event.currentTarget.open) setLanguageSuffix(window.location.search + window.location.hash); }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.open = false; }}>
          <summary data-language-toggle aria-label={spanish ? "Idioma: Español" : english ? "Language: English" : "Язык: Русский"}>
            <span className={styles.languageName}>{spanish ? "Español" : english ? "English" : "Русский"}</span>
            <span className={styles.languageCode}>{locale.toUpperCase()}</span><span aria-hidden="true">⌄</span>
          </summary>
          <div className={styles.languageChoices} role="group" aria-label={spanish ? "Idioma" : english ? "Language" : "Язык"}>
            {(["ru", "en", "es"] as const).map(target => target === locale ? (
              <span key={target} lang={target} aria-current="true">{target === "ru" ? "Русский" : target === "en" ? "English" : "Español"}<span aria-hidden="true">✓</span></span>
            ) : (
              <Link key={target} href={languageHref(path, target) + languageSuffix} hrefLang={target} lang={target}
                data-language-choice={target} aria-label={target.toUpperCase()}
                title={hasTranslation(path, target) ? undefined : target === "es" ? "Español: inicio" : target === "en" ? "English: home" : "Русский: главная"}
                className={styles.languageSwitch} onClick={event => chooseLanguage(target, event)}>
                {target === "ru" ? "Русский" : target === "en" ? "English" : "Español"}
              </Link>
            ))}
          </div>
        </details>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className={styles.menuLabel}>{open ? (spanish ? "Cerrar" : english ? "Close" : "Закрыть") : (spanish ? "Menú" : english ? "Menu" : "Меню")}</span> <span>{open ? "×" : "☰"}</span>
        </button>
      </div>
      <div
        className={"nav-line " + (open ? "is-open" : "")}
        id="main-navigation"
      >
        <nav aria-label={spanish ? "Navegación principal" : english ? "Main navigation" : "Основная навигация"}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={(english && ["/en/about", "/en/editorial-policy"].includes(href) || spanish && ["/es/about", "/es/editorial-policy"].includes(href)) ? styles.englishSecondaryLink : undefined}
              aria-current={path === href || (!(["/en", "/es"].includes(href)) && path.startsWith(href + "/")) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="secondary-nav">
          <Link href={spanish ? "/es/providers" : english ? "/en/providers" : "/providers"} onClick={() => setOpen(false)}>
            {spanish ? "Proveedores" : english ? "Publishers" : "Провайдеры"}
          </Link>
          <Link href={spanish ? "/es/compare" : english ? "/en/compare" : "/compare"} onClick={() => setOpen(false)}>
            {spanish ? "Comparar juegos" : english ? "Compare games" : "Сравнить игры"} <span>↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  const locale = siteLocale(usePathname());
  const english = locale === "en";
  if (locale === "es") return <SpanishFooter />;
  if (english) return (
    <footer className={`footer ${styles.englishFooter}`} lang="en">
      <div className="footer-main">
        <div>
          <Link href="/en" className="brand">slotfolio<span className="brand-dot">.</span></Link>
          <p>Explore the rules.<br />Understand the risks.</p>
        </div>
        <div>
          <span className="eyebrow">Read</span>
          <Link href="/en">Home</Link>
          <Link href="/en/journal/understanding-rtp">Understanding RTP</Link>
          <Link href="/en/slots">Game catalogue</Link>
          <Link href="/en/providers">Publishers</Link>
          <Link href="/en/mechanics">Mechanics</Link>
          <Link href="/en/compare">Compare games</Link>
          <Link href="/en/collections">Game collections</Link>
          <Link href="/en/journal">Journal and guides</Link>
        </div>
        <div>
          <span className="eyebrow">About Slotfolio</span>
          <Link href="/en/about">About</Link>
          <Link href="/en/editorial-policy">Editorial policy</Link>
          <Link href="/en/privacy">Privacy</Link>

        </div>
        <div className="footer-responsibility">
          <span className="age">18+</span>
          <p>Gambling involves a risk of losing money. Never treat it as a source of income.</p>
          <Link href="/en/responsible-gaming">Safer gambling ↗</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Slotfolio</span>
        <Link href="/en/privacy">Privacy</Link>

      </div>
    </footer>
  );
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link href="/" className="brand">
            slotfolio<span className="brand-dot">.</span>
          </Link>
          <p>
            Смотреть внимательнее.
            <br />
            Понимать больше.
          </p>
        </div>
        <div>
          <span className="eyebrow">Изучать</span>
          <Link href="/slots">Каталог слотов</Link>
          <Link href="/mechanics">Игровые механики</Link>
          <Link href="/providers">Провайдеры</Link>
          <Link href="/journal">Разборы и гайды</Link>
        </div>
        <div>
          <span className="eyebrow">Ориентироваться</span>

          <Link href="/bonuses">Как устроены бонусы</Link>
          <Link href="/about">О проекте</Link>
          <Link href="/editorial-policy">Редакционная политика</Link>
        </div>
        <div className="footer-responsibility">
          <span className="age">18+</span>
          <p>
            Азартные игры связаны с риском потери денег. Не рассматривайте игру
            как источник дохода.
          </p>
          <Link href="/responsible-gaming">Ответственная игра ↗</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Slotfolio</span>
        <Link href="/privacy">Конфиденциальность</Link>

      </div>
    </footer>
  );
}
