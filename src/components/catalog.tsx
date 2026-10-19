"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CatalogGameCard } from "./catalog-game-card";
import { englishCatalogueCopy as en } from "@/lib/english-catalogue-copy";
import { englishCatalogFact } from "@/lib/english-catalog-facts";
import {
  filterCatalogItems,
  sortCatalogItems,
  type CatalogModel,
} from "@/lib/catalog-query";

 
// Show nearby pages and both ends without rendering dozens of choices.
function paginationWindow(current: number, total: number): (number | null)[] {
  const candidates = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) for (let n = 2; n <= 4; n++) candidates.add(n);
  if (current >= total - 2) for (let n = total - 3; n < total; n++) candidates.add(n);

  const pages = [...candidates].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const window: (number | null)[] = [];
  for (let index = 0; index < pages.length; index++) {
    if (index > 0 && pages[index] - pages[index - 1] > 1) window.push(null);
    window.push(pages[index]);
  }
  return window;
}


function useUrlFilter(name: string, initial: string) {
  const [value, setValue] = useState(initial);
  useEffect(() => setValue(initial), [initial]);
  function update(next: string) {
    setValue(next);
    const url = new URL(window.location.href);
    if (next && !(name === "sort" && next === "editorial")) url.searchParams.set(name, next);
    else url.searchParams.delete(name);
    if (name !== "page" && name !== "view") url.searchParams.delete("page");
    const method = name === "page" ? "pushState" : "replaceState";
    window.history[method](null, "", url.pathname + url.search + url.hash);
  }
  return [value, update] as const;
}

export function CatalogFromUrl({ model, locale = "ru" }: { model: CatalogModel; locale?: "ru" | "en" }) {
  const params = useSearchParams();
  return (
    <Catalog
      locale={locale}
      model={model}
      initialQ={params.get("q") || ""}
      initialProvider={params.get("provider") || ""}
      initialMechanic={params.get("mechanic") || ""}
      initialVolatility={params.get("volatility") || ""}
      initialRtp={params.get("rtp") || ""}
      initialFeature={params.get("feature") || ""}
      initialSort={params.get("sort") || "editorial"}
      initialPage={params.get("page") || "1"}
      initialView={params.get("view") || "list"}
    />
  );
}

export function Catalog({
  model,
  locale = "ru",
  initialQ = "",
  initialProvider = "",
  initialMechanic = "",
  initialVolatility = "",
  initialRtp = "",
  initialFeature = "",
  initialSort = "editorial",
  initialPage = "1",
  initialView = "list",
}: {
  model: CatalogModel;
  locale?: "ru" | "en";
  initialQ?: string;
  initialProvider?: string;
  initialMechanic?: string;
  initialVolatility?: string;
  initialRtp?: string;
  initialFeature?: string;
  initialSort?: string;
  initialPage?: string;
  initialView?: string;
}) {
  const PAGE_SIZE = 18;
  const [q, setQ] = useUrlFilter("q", initialQ);
  const [provider, setProvider] = useUrlFilter("provider", initialProvider);
  const [mechanic, setMechanic] = useUrlFilter("mechanic", initialMechanic);
  const [volatility, setVolatility] = useUrlFilter("volatility", initialVolatility);
  const [rtp, setRtp] = useUrlFilter("rtp", initialRtp);
  const [feature, setFeature] = useUrlFilter("feature", initialFeature);
  const [sort, setSort] = useUrlFilter("sort", initialSort);
  const [viewValue, setView] = useUrlFilter("view", initialView);
  const view = viewValue === "covers" ? "covers" : "list";
  const [pageValue, setPage] = useUrlFilter("page", initialPage);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollAfterCollapse = useRef(false);
  useEffect(() => {
    if (!filtersOpen && scrollAfterCollapse.current) {
      scrollAfterCollapse.current = false;
      resultsRef.current?.scrollIntoView({ block: "start" });
    }
  }, [filtersOpen]);
  const deferredQ = useDeferredValue(q);

  const catalogNumbers = useMemo(() => new Map(model.items.map((item, index) => [item.slug, index + 1])), [model.items]);

  const results = useMemo(
    () =>
      sortCatalogItems(
        filterCatalogItems(model.items, {
          q: deferredQ,
          provider,
          mechanic,
          volatility,
          rtp,
          feature,
        }),
        sort,
      ),
    [model.items, deferredQ, provider, mechanic, volatility, rtp, feature, sort],
  );

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const requestedPage = /^\d+$/.test(pageValue) ? Number(pageValue) : 1;
  const page = Math.max(1, Math.min(pageCount, Number.isSafeInteger(requestedPage) ? requestedPage : 1));
  const offset = (page - 1) * PAGE_SIZE;
  const visibleResults = results.slice(offset, offset + PAGE_SIZE);
  function showPage(next: number) {
    setPage(String(next));
    resultsRef.current?.scrollIntoView({ block: "start" });
  }
  const selectedProvider = model.facets.providers.find((item) => item.slug === provider);
  const hasFilters = Boolean(q.trim() || provider || mechanic || volatility || rtp || feature);

  function reset() {
    setQ("");
    setProvider("");
    setMechanic("");
    setVolatility("");
    setRtp("");
    setFeature("");
    setSort("editorial");
  }

  return (
    <div className="catalog">
      <form className="catalog-search" onSubmit={(e) => e.preventDefault()} role="search">
        <label htmlFor="catalog-q">{locale === "en" ? en.search : "Найти игру"}</label>
        <div>
          <input
            type="search"
            id="catalog-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={locale === "en" ? en.searchPlaceholder : "Название, провайдер, механика или особенность"}
          />
          <span aria-hidden="true">↗</span>
        </div>
      </form>

      <div className="catalog-layout">
        <aside className="filter-panel">
          <button
            className="filter-toggle"
            aria-expanded={filtersOpen}
            aria-controls="catalog-filters"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            {locale === "en" ? en.filters : "Фильтры"} {hasFilters ? (locale === "en" ? "· active" : "· активны") : ""}
            <span>{filtersOpen ? "−" : "+"}</span>
          </button>
          <div id="catalog-filters" className={filtersOpen ? "filters open" : "filters"}>
            <div className="filter-heading">{locale === "en" ? en.refine : "Уточнить выбор"}</div>
            <label htmlFor="provider">{locale === "en" ? en.publisher : "Провайдер"}</label>
            <select id="provider" value={provider} onChange={(e) => setProvider(e.target.value)}>
              <option value="">{locale === "en" ? en.allPublishers : "Все провайдеры"} · {model.facets.total}</option>
              {model.facets.providers.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} · {item.count}
                </option>
              ))}
            </select>

            <fieldset>
              <legend>{locale === "en" ? en.mechanics : "Механика"}</legend>
              <label>
                <input type="radio" name="mechanic" checked={!mechanic} onChange={() => setMechanic("")} />
                {locale === "en" ? en.allMechanics : "Все механики"}
              </label>
              {model.facets.mechanics.map((item) => (
                <label key={item.slug}>
                  <input
                    type="radio"
                    name="mechanic"
                    checked={mechanic === item.name}
                    onChange={() => setMechanic(item.name)}
                  />
                  {locale === "en" ? englishCatalogFact(item.name) : item.name}
                  <span>{item.count}</span>
                </label>
              ))}
            </fieldset>

            <div className="filter-select-group">
              <label htmlFor="volatility">{locale === "en" ? en.volatility : "Волатильность"}</label>
              <select id="volatility" value={volatility} onChange={(e) => setVolatility(e.target.value)}>
                <option value="">{locale === "en" ? en.any : "Любая"}</option>
                {model.facets.volatility.map((item) => (
                  <option key={item.name} value={item.name}>
                    {locale === "en" ? englishCatalogFact(item.name) : item.name} · {item.count}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-select-group">
              <label htmlFor="rtp">{locale === "en" ? en.rtp : "RTP, справочно"}</label>
              <select id="rtp" value={rtp} onChange={(e) => setRtp(e.target.value)}>
                <option value="">{locale === "en" ? en.any : "Любой"}</option>
                <option value="96">{locale === "en" ? "At least 96.00%" : "Не ниже 96,00%"}</option>
                <option value="96.5">{locale === "en" ? "At least 96.50%" : "Не ниже 96,50%"}</option>
                <option value="97">{locale === "en" ? "At least 97.00%" : "Не ниже 97,00%"}</option>
              </select>
            </div>

            <div className="filter-select-group">
              <label htmlFor="feature">{locale === "en" ? en.feature : "Особенность"}</label>
              <select id="feature" value={feature} onChange={(e) => setFeature(e.target.value)}>
                <option value="">{locale === "en" ? en.any : "Любая"}</option>
                {model.facets.features.map((item) => (
                  <option key={item.name} value={item.name}>
                    {locale === "en" ? englishCatalogFact(item.name) : item.name} · {item.count}
                  </option>
                ))}
              </select>
            </div>

            <button className="reset-link" onClick={reset} disabled={!hasFilters && sort === "editorial"}>
              {locale === "en" ? en.reset : "Сбросить фильтры"} ↺
            </button>
            <p className="filter-note">
              {locale === "en" ? "Not sure where to start?" : "Не знаете, с чего начать?"}
              <br />
              <Link href="/collections/beyond-lines">{locale === "en" ? en.guideInRussian : "Посмотрите подборку редакции ↗"}</Link>
            </p>
            <button className="filter-apply" onClick={() => {
              scrollAfterCollapse.current = true;
              setFiltersOpen(false);
            }}>{locale === "en" ? en.showResults : "К результатам"} · {results.length} ↗</button>
          </div>
        </aside>

        <div className="results" ref={resultsRef}>
          <div className="results-toolbar">
            <div className="results-summary">
            <span className="results-count" role="status" aria-live="polite">
              {results.length === model.facets.total
                ? locale === "en" ? `${model.facets.total} games` : `${model.facets.total} игр`
                : locale === "en" ? `Found ${results.length} of ${model.facets.total}` : `Найдено ${results.length} из ${model.facets.total}`}
            </span>
            </div>
            <label>
              <span className="sr-only">{locale === "en" ? en.sort : "Сортировка"}</span>
              <select aria-label={locale === "en" ? en.sort : "Сортировка"} value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="editorial">{locale === "en" ? en.editorial : "Выбор редакции"}</option>
                <option value="name">{locale === "en" ? en.byName : "По названию"}</option>
                <option value="new">{locale === "en" ? en.newest : "Сначала новые"}</option>
                <option value="rtp">{locale === "en" ? en.highestRtp : "RTP: выше сначала"}</option>
              </select>
            </label>
            <div className="view-controls">
              <button aria-label={locale === "en" ? en.list : "Список"} aria-pressed={view === "list"} onClick={() => setView("list")}>
                ☷
              </button>
              <button aria-label={locale === "en" ? en.covers : "Обложки"} aria-pressed={view === "covers"} onClick={() => setView("covers")}>
                ▦
              </button>
            </div>
          </div>

          {hasFilters && (
            <div className="active-filters" aria-label={locale === "en" ? en.active : "Активные фильтры"}>
              <span>{locale === "en" ? en.active : "Отбор:"}</span>
              {q.trim() && <button onClick={() => setQ("")}>«{q.trim()}» <b>×</b></button>}
              {selectedProvider && <button onClick={() => setProvider("")}>{selectedProvider.name} <b>×</b></button>}
              {mechanic && <button onClick={() => setMechanic("")}>{locale === "en" ? englishCatalogFact(mechanic) : mechanic} <b>×</b></button>}
              {volatility && <button onClick={() => setVolatility("")}>{locale === "en" ? englishCatalogFact(volatility) : volatility} <b>×</b></button>}
              {rtp && <button onClick={() => setRtp("")}>RTP ≥ {locale === "en" ? rtp : rtp.replace(".", ",")}% <b>×</b></button>}
              {feature && <button onClick={() => setFeature("")}>{locale === "en" ? englishCatalogFact(feature) : feature} <b>×</b></button>}
              <button className="clear-all" onClick={reset}>{locale === "en" ? en.resetAll : "Сбросить всё"}</button>
            </div>
          )}

          {!results.length ? (
            <div className="empty-state">
              <span className="eyebrow">{locale === "en" ? en.noneFound : "Ничего не найдено"}</span>
              <h2>{locale === "en" ? en.noneFound : <>Такой игры пока нет<br />в нашем указателе.</>}</h2>
              <p>{locale === "en" ? en.noneFoundDescription : "Попробуйте часть названия или снимите один из фильтров."}</p>
              <button className="button" onClick={reset}>{locale === "en" ? en.showAll : "Показать все игры"}</button>
            </div>
          ) : (
            <>
              <div className={"catalog-results " + view} lang={locale === "en" ? "en" : undefined}>
                {visibleResults.map((item) => <CatalogGameCard item={item} number={catalogNumbers.get(item.slug) || 0} locale={locale} key={item.slug} />)}
              </div>

              {pageCount > 1 && (
                <nav className="catalog-pagination" aria-label={locale === "en" ? en.pages : "Страницы каталога"}>
                  <span className="catalog-range">{offset + 1}–{offset + visibleResults.length} {locale === "en" ? "of" : "из"} {results.length}</span>
                  <div className="catalog-page-controls">
                    <button className="catalog-page-previous" disabled={page === 1} onClick={() => showPage(page - 1)} aria-label={locale === "en" ? en.previous : "Предыдущая страница"}><span aria-hidden="true">←</span><span className="catalog-page-nav-label"> {locale === "en" ? en.previous : "Назад"}</span></button>
                    <div className="catalog-page-numbers" aria-label={locale === "en" ? "Choose page" : "Выбор страницы"}>
                      {paginationWindow(page, pageCount).map((number, index) =>
                        number === null ? (
                          <span key={`gap-${index}`} className="catalog-page-gap" aria-hidden="true">…</span>
                        ) : number === page ? (
                          <span key={number} className="catalog-page-current" aria-label={`${locale === "en" ? en.page : "Страница"} ${number}`} aria-current="page">{number}</span>
                        ) : (
                          <button key={number} onClick={() => showPage(number)} aria-label={`${locale === "en" ? en.goToPage : "Перейти на страницу"} ${number}`}>{number}</button>
                        ),
                      )}
                    </div>
                    <span className="catalog-page-status" aria-live="polite">{locale === "en" ? en.page : "Страница"} {page} {locale === "en" ? "of" : "из"} {pageCount}</span>
                    <button className="catalog-page-next" disabled={page === pageCount} onClick={() => showPage(page + 1)} aria-label={locale === "en" ? en.next : "Следующая страница"}><span className="catalog-page-nav-label">{locale === "en" ? en.next : "Далее"} </span><span aria-hidden="true">→</span></button>
                  </div>
                </nav>
              )}
            </>
          )}

          <div className="catalog-end">
            <Link href={locale === "en" ? "/en/compare" : "/compare"}>{locale === "en" ? en.compareInRussian : "Перейти к сравнению ↗"}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
