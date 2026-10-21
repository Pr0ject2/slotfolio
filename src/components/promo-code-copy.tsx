"use client";

import { useId, useState } from "react";
import styles from "./slot-casino-link.module.css";

const PROMO_CODE = "3DDD";
const copy = {
  ru: {
    label: "Промокод",
    action: "Копировать",
    actionLabel: "Скопировать промокод 3DDD",
    copied: "Скопировано",
    success: "Промокод 3DDD скопирован.",
    error: "Не удалось скопировать. Выделите 3DDD и скопируйте вручную.",
  },
  en: {
    label: "Promo code",
    action: "Copy",
    actionLabel: "Copy promo code 3DDD",
    copied: "Copied",
    success: "Promo code 3DDD copied.",
    error: "Could not copy. Select 3DDD and copy it manually.",
  },
  es: {
    label: "Código promocional",
    action: "Copiar",
    actionLabel: "Copiar el código promocional 3DDD",
    copied: "Copiado",
    success: "Código promocional 3DDD copiado.",
    error: "No se pudo copiar. Selecciona 3DDD y cópialo manualmente.",
  },
} as const;

export function PromoCodeCopy({ locale }: { locale: "ru" | "en" | "es" }) {
  const id = useId();
  const text = copy[locale];
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  async function copyCode() {
    setStatus("copying");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(PROMO_CODE);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.promo}>
      <div className={styles.promoRow}>
        <label className={styles.promoLabel} htmlFor={id}>{text.label}</label>
        <div className={styles.promoControls}>
          <input id={id} className={styles.promoCode} value={PROMO_CODE} readOnly spellCheck={false}
            data-promo-code="3DDD" onFocus={event => event.currentTarget.select()} aria-describedby={`${id}-status`} />
          <button className={styles.copyButton} type="button" onClick={copyCode}
            aria-label={text.actionLabel} aria-busy={status === "copying"} disabled={status === "copying"}>
            {status === "copied" ? text.copied : text.action}
          </button>
        </div>
      </div>
      <p id={`${id}-status`} className={styles.copyStatus} role="status" aria-live="polite" aria-atomic="true">
        {status === "copied" ? text.success : status === "error" ? text.error : ""}
      </p>
    </div>
  );
}
