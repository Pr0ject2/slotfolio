import Link from "next/link";
import type { SiteLocale } from "@/lib/locales";
const copy={
  ru:{label:"404 / Не найдено",title:<>Эта страница<br />вне каталога.</>,text:"Возможно, адрес изменился или в нём опечатка. Найдите игру по названию или начните с главной страницы.",search:"Найти игру ↗",home:"На главную"},
  en:{label:"404 / Not found",title:<>This page is<br />outside the catalogue.</>,text:"The address may have changed or contain a typo. Find a game by name or start from the homepage.",search:"Find a game ↗",home:"Home"},
  es:{label:"404 / Página no encontrada",title:<>Esta página está<br />fuera del catálogo.</>,text:"Puede que la dirección haya cambiado o contenga una errata. Busca un juego por su nombre o empieza por la página de inicio.",search:"Buscar un juego ↗",home:"Inicio"},
};
export function NotFoundContent({locale,className=""}:{locale:SiteLocale;className?:string}){const text=copy[locale],prefix=locale==="ru"?"":`/${locale}`;return <div lang={locale} data-not-found-locale={locale} className={`not-found ${className}`}><span className="eyebrow accent">{text.label}</span><h1>{text.title}</h1><p>{text.text}</p><Link className="button" href={`${prefix}/search`}>{text.search}</Link><Link className="text-link" href={prefix||"/"} style={{marginLeft:25}}>{text.home}</Link></div>;}
