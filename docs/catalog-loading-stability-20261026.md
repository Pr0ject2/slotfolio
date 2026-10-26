# Catalogue first-screen stability

Synthetic mobile samples on the published catalogue showed CLS around 0.31–0.38 across RU/EN/ES. A subsequent observer run waited for actual cards and attributed a 0.376 shift to the footer: the short Suspense message placed the footer in the first viewport, then hydration replaced it with the 18-card list and moved the footer away. Font movement contributed about 0.001 in that sample.

The fix reserves one viewport for the existing loading state. The real 18-card list is taller than that minimum; filters, cards, compact model, URL state and RSC packaging do not change. Loading text is increased from 11px to 16px. This is a bounded loading-state fix, not a CSS cleanup or a replacement catalogue renderer.

Browser regressions use a 390×844 viewport, 4× CPU slowdown, 150ms latency and 200KB/s download throughput. They observe layout shifts through hydration/fonts, require 18 real cards and removal of the loading state, require CLS below 0.05, and verify search still works in RU/EN/ES. These synthetic observations are not field Core Web Vitals or an INP measurement.
