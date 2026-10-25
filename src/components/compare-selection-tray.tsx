"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { siteLocale } from "@/lib/locales";
import {
  MAX_COMPARE,
  readSelection,
  saveSelection,
  useSelection,
} from "./compare-button";
import styles from "./compare-selection-tray.module.css";

const copy = {
  ru: {
    region: "Игры для сравнения",
    selected: "Выбрано",
    one: "Выберите ещё одну игру",
    ready: "Всё готово к сравнению",
    open: "К сравнению",
    compare: "Сравнить игры",
    clear: "Очистить",
    remove: (name: string) => `Убрать ${name} из набора`,
    of: "из",
  },
  en: {
    region: "Games to compare",
    selected: "Selected",
    one: "Choose one more game",
    ready: "Ready to compare",
    open: "Open comparison",
    compare: "Compare games",
    clear: "Clear",
    remove: (name: string) => `Remove ${name} from selection`,
    of: "of",
  },
  es: {
    region: "Juegos para comparar",
    selected: "Elegidos",
    one: "Elige otro juego",
    ready: "Listo para comparar",
    open: "Ver comparación",
    compare: "Comparar juegos",
    clear: "Vaciar",
    remove: (name: string) => `Quitar ${name} de la selección`,
    of: "de",
  },
};

function keepChoiceVisible(panel: HTMLElement) {
  const active = document.activeElement;
  if (
    active instanceof HTMLElement &&
    active.matches("[data-compare-slug]") &&
    active.getBoundingClientRect().bottom >
      panel.getBoundingClientRect().top - 12
  ) {
    active.scrollIntoView({ block: "center", behavior: "instant" });
  }
}

export function CompareSelectionTray({
  games,
}: {
  games: { slug: string; name: string }[];
}) {
  const path = usePathname();
  const locale = siteLocale(path);
  const text = copy[locale];
  const selected = useSelection();
  const names = useMemo(
    () => new Map(games.map((game) => [game.slug, game.name])),
    [games],
  );
  const valid = selected.filter((slug) => names.has(slug));
  const signature = valid.join("|");
  const onComparison = /(?:^|\/)compare\/?$/.test(path);
  const visible = valid.length > 0 && !onComparison;
  const panel = useRef<HTMLElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  const restoreFocus = useRef(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const remember = () => {
      const active = document.activeElement;
      if (
        active instanceof HTMLElement &&
        active.matches("[data-compare-slug]")
      )
        origin.current = active;
    };
    window.addEventListener("comparison-change", remember);
    return () => window.removeEventListener("comparison-change", remember);
  }, []);

  useEffect(() => {
    if (selected.some((slug) => !names.has(slug)))
      saveSelection(selected.filter((slug) => names.has(slug)));
  }, [selected, names]);

  useLayoutEffect(() => {
    if (!visible || !panel.current) return;
    const element = panel.current;
    const measure = () => {
      const size = Math.ceil(element.getBoundingClientRect().height);
      setHeight(size);
      document.documentElement.style.setProperty(
        "--comparison-tray-height",
        `${size}px`,
      );
      keepChoiceVisible(element);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--comparison-tray-height");
    };
  }, [visible, signature, locale]);

  useEffect(() => {
    if (visible && panel.current) keepChoiceVisible(panel.current);
  }, [signature, visible]);

  useEffect(() => {
    if (!restoreFocus.current) return;
    restoreFocus.current = false;
    if (valid.length && panel.current)
      panel.current
        .querySelector<HTMLButtonElement>("[data-remove-game]")
        ?.focus();
    else if (origin.current?.isConnected) origin.current.focus();
    else document.getElementById("main")?.focus({ preventScroll: true });
  }, [signature]);

  function remove(slug?: string) {
    restoreFocus.current = true;
    saveSelection(slug ? readSelection().filter((item) => item !== slug) : []);
  }

  if (!visible) return null;
  return (
    <>
      <div className={styles.reserve} aria-hidden="true" style={{ height }} />
      <aside
        ref={panel}
        className={styles.tray}
        lang={locale}
        aria-label={text.region}
        data-compare-tray
      >
        <div className={styles.inner}>
          <div className={styles.summary}>
            <p aria-live="polite" aria-atomic="true">
              <strong>
                {text.selected}: {valid.length} {text.of} {MAX_COMPARE}
              </strong>
            </p>
            <p>{valid.length < MAX_COMPARE ? text.one : text.ready}</p>
          </div>
          <ul className={styles.games}>
            {valid.map((slug) => (
              <li key={slug}>
                <button
                  type="button"
                  data-remove-game={slug}
                  title={names.get(slug)}
                  aria-label={text.remove(names.get(slug)!)}
                  onClick={() => remove(slug)}
                >
                  <span>{names.get(slug)}</span>
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Link
              className={styles.open}
              href={`${locale === "ru" ? "" : "/" + locale}/compare`}
              data-compare-open
            >
              {valid.length < MAX_COMPARE ? text.open : text.compare}{" "}
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className={styles.clear}
              onClick={() => remove()}
            >
              {text.clear}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
