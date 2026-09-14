import type { ReactNode } from "react";
import styles from "./catalog-record-layout.module.css";

export default function CatalogRecordLayout({ children }: { children: ReactNode }) {
  return <div className={styles.route}>{children}</div>;
}
