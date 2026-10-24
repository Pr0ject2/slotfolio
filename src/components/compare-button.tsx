"use client";

import Link from "next/link";
import type { SiteLocale } from "@/lib/locales";
import { useEffect, useState } from "react";

export const MAX_COMPARE = 2;
let memorySelection: string[] = [];

export function normalizeSelection(value: unknown): string[] {
  return Array.isArray(value)
    ? [...new Set(value.filter((slug): slug is string => typeof slug === "string" && slug.trim().length > 0))].slice(0, MAX_COMPARE)
    : [];
}

export function readSelection() {
  try {
    return normalizeSelection(JSON.parse(localStorage.getItem("slotfolio-compare") || "[]"));
  } catch {
    return memorySelection;
  }
}

export function saveSelection(value: string[]) {
  memorySelection = normalizeSelection(value);
  try {
    localStorage.setItem("slotfolio-compare", JSON.stringify(memorySelection));
  } catch {
    /* The current tab remains usable when storage is unavailable. */
  }
  window.dispatchEvent(new Event("comparison-change"));
  return memorySelection;
}

export function useSelection() {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSelected(readSelection());
    sync();
    window.addEventListener("comparison-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("comparison-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return selected;
}

export function CompareButton({ slug, name, locale = "ru" }: { slug: string; name?: string; locale?: SiteLocale }) {
  const english = locale === "en";
  const spanish = locale === "es";
  const selected = useSelection();
  const [message, setMessage] = useState("");
  const included = selected.includes(slug);
  const label = name || slug;

  function toggle() {
    const previous = readSelection();
    if (previous.includes(slug)) saveSelection(previous.filter((item) => item !== slug));
    else if (previous.length < MAX_COMPARE) saveSelection([...previous, slug]);
    else {
      setMessage(spanish ? "Ya hay dos juegos seleccionados. Quita uno antes de añadir otro." : english ? "Two games are already selected. Remove one first." : "В сравнении уже 2 игры. Удалите одну.");
      return;
    }
    setMessage("");
  }

  return (
    <div className="compare-control">
      <button
        type="button"
        className={`compare-button ${included ? "selected" : ""}`}
        aria-pressed={included}
        aria-label={spanish ? `${included ? "Quitar" : "Añadir"} ${label} ${included ? "de" : "a"} la comparación` : english ? `${included ? "Remove" : "Add"} ${label} ${included ? "from" : "to"} comparison` : `${included ? "Убрать" : "Добавить"} ${label} ${included ? "из сравнения" : "в сравнение"}`}
        onClick={toggle}
      >
        {spanish ? included ? "✓ Seleccionado" : "+ Comparar" : english ? included ? "✓ Selected" : "+ Compare" : included ? "✓ В сравнении" : "+ Сравнить"}
      </button>
      {message && selected.length >= MAX_COMPARE && (
        <small role="status">{message} <Link href={spanish ? "/es/compare" : english ? "/en/compare" : "/compare"}>{spanish ? "Ver comparación" : english ? "Open comparison" : "Открыть"}</Link></small>
      )}
    </div>
  );
}
