import { NotFoundContent } from "@/components/not-found-content";
import styles from "@/components/not-found-content.module.css";
export const metadata = { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } };
export default function NotFound(){return <div>{(["ru","en","es"] as const).map(locale=><NotFoundContent key={locale} locale={locale} className={styles.localized} />)}</div>;}
