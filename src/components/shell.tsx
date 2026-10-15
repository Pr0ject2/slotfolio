"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./shell.module.css";
import { isEnglishPath, languageHref } from "@/lib/locales";
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const english = isEnglishPath(path);
  useEffect(() => { document.documentElement.lang = english ? "en" : "ru"; }, [english]);
  const to = (route: string) => english ? languageHref(route, "en") : route;
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 601px)");
    const reset = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  const links = english
    ? [["/en", "Home"], ["/en/journal/understanding-rtp", "RTP guide"], ["/en/about", "About"], ["/en/editorial-policy", "Editorial policy"]]
    : [["/slots", "Слоты"], ["/mechanics", "Механики"], ["/journal", "Разборы"], ["/collections", "Подборки"]];
  return (
    <header lang={english ? "en" : "ru"} className={`header ${styles.header}`} onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className="masthead">
        <Link href={to("/")} className="brand" aria-label={english ? "Slotfolio home" : "Slotfolio — главная"}>
          slotfolio<span className="brand-dot">.</span>
        </Link>
        <span className="tagline">
          {english ? "Games, guides" : "Каталог, разборы"}
          <br />{english ? "and mechanics" : "и механики игр"}
        </span>
        <span className="header-edition">
          {english ? "GAMES · GUIDES · COMPARISONS" : "КАТАЛОГ · РАЗБОРЫ · СРАВНЕНИЕ"} <span>18+</span>
        </span>
        <Link className="header-search" href="/search" aria-label={english ? "Game search (Russian)" : "Найти игру"}>
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
          <span>{english ? "Search (RU)" : "Найти игру"}</span>
        </Link>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? (english ? "Close" : "Закрыть") : (english ? "Menu" : "Меню")} <span>{open ? "×" : "☰"}</span>
        </button>
      </div>
      <div
        className={"nav-line " + (open ? "is-open" : "")}
        id="main-navigation"
      >
        <nav aria-label={english ? "Main navigation" : "Основная навигация"}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href || (href !== "/en" && path.startsWith(href + "/")) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="secondary-nav">
          <Link href={english ? "/slots" : "/providers"} onClick={() => setOpen(false)}>
            {english ? "Catalogue (RU)" : "Провайдеры"}
          </Link>
          <Link href={english ? "/en/responsible-gaming" : "/compare"} onClick={() => setOpen(false)}>
            {english ? "Safer gambling" : "Сравнить игры"} <span>↗</span>
          </Link>
          <Link href={languageHref(path, english ? "ru" : "en")} hrefLang={english ? "ru" : "en"} lang={english ? "ru" : "en"}
            className={styles.languageSwitch} onClick={() => setOpen(false)}>
            {english ? "RU" : "EN"}
          </Link>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  const english = isEnglishPath(usePathname());
  if (english) return (
    <footer className="footer" lang="en">
      <div className="footer-main">
        <div>
          <Link href="/en" className="brand">slotfolio<span className="brand-dot">.</span></Link>
          <p>Explore the rules.<br />Understand the risks.</p>
        </div>
        <div>
          <span className="eyebrow">Read</span>
          <Link href="/en">Home</Link>
          <Link href="/en/journal/understanding-rtp">Understanding RTP</Link>
          <Link href="/slots">Game catalogue (Russian)</Link>
        </div>
        <div>
          <span className="eyebrow">About Slotfolio</span>
          <Link href="/en/about">About</Link>
          <Link href="/en/editorial-policy">Editorial policy</Link>
          <Link href="/en/privacy">Privacy</Link>
          <Link href="/en/disclosure">Affiliate disclosure</Link>
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
        <Link href="/en/disclosure">Disclosure</Link>
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
          <Link href="/regions">Страны и доступность</Link>
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
        <Link href="/disclosure">Партнёрские отношения</Link>
      </div>
    </footer>
  );
}
