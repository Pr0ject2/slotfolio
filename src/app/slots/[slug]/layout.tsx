import type { ReactNode } from "react";
import styles from "./dossier-layout.module.css";

export default function SlotDossierLayout({ children }: { children: ReactNode }) {
  return <div className={styles.route}>{children}</div>;
}
