import styles from "@/components/localized-layout.module.css";
export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="es" className={styles.layout}>{children}</div>;
}
