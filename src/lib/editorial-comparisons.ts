import type { SiteLocale } from "./locales";
import type { editorialComparisonSlugs } from "./editorial-comparison-routes";
type ComparisonCopy = {
  title: string; description: string; question: string;
  rows: [string, string, string][]; takeaway: string; checks: string[];
};
export type EditorialComparison = {
  slug: (typeof editorialComparisonSlugs)[number]; games: [string, string];
  sources: [string, string]; copy: Record<SiteLocale, ComparisonCopy>;
};

export const editorialComparisons: EditorialComparison[] = [
  { slug: "gates-of-olympus-vs-sweet-bonanza", games: ["gates-of-olympus", "sweet-bonanza"],
    sources: ["https://www.pragmaticplay.com/en/games/gates-of-olympus/", "https://www.pragmaticplay.com/en/games/sweet-bonanza-slot/"], copy: {
    ru: { title: "Gates of Olympus и Sweet Bonanza: различия правил", description: "Обе игры считают совпадения по всему полю. Сравните, как работают каскады и что происходит с множителем в бонусе.", question: "Одинаковая схема выплат — одинаковый бонус?",
      rows: [["Комбинации", "Совпадения по всему полю", "Совпадения по всему полю"], ["После выплаты", "Выигрышные символы заменяются", "Выигрышные символы заменяются"], ["Множитель бонуса", "Накапливается в течение бонусного раунда", "Суммируется для выигрышной tumble-последовательности"]],
      takeaway: "Главное различие для чтения бонуса — период действия множителя. Поэтому одинаковый значок x не позволяет переносить расчёт из одной игры в другую. Это сравнение правил, а не прогноз выплат или рейтинг выгодности.",
      checks: ["Откройте раздел свободных вращений обеих игр и найдите момент применения множителя.", "Отдельно отметьте, когда накопленное значение сбрасывается.", "Сверьте полное название: версии 1000 и Super Scatter не входят в это сравнение."] },
    en: { title: "Gates of Olympus vs Sweet Bonanza: rules compared", description: "Both games count matches anywhere on the grid. Compare their tumbles and what happens to the multiplier during free spins.", question: "Does the same payout pattern mean the same bonus?",
      rows: [["Combinations", "Matches anywhere on the grid", "Matches anywhere on the grid"], ["After a payout", "Winning symbols are replaced", "Winning symbols are replaced"], ["Bonus multiplier", "Accumulates through the bonus round", "Added for the winning tumble sequence"]],
      takeaway: "The useful distinction is the multiplier's lifetime. The same x symbol does not make the calculation interchangeable between games. This compares rules, not expected session results or which game is more profitable.",
      checks: ["Open both free-spin sections and find when the multiplier is applied.", "Mark separately when the accumulated value resets.", "Check the full title: 1000 and Super Scatter versions are outside this comparison."] },
    es: { title: "Gates of Olympus vs Sweet Bonanza: diferencias de reglas", description: "Ambos juegos cuentan coincidencias en cualquier posición. Compara sus cascadas y qué ocurre con el multiplicador durante los giros gratis.", question: "¿El mismo sistema de premios implica el mismo bonus?",
      rows: [["Combinaciones", "Coincidencias en cualquier posición", "Coincidencias en cualquier posición"], ["Tras el premio", "Se sustituyen los símbolos ganadores", "Se sustituyen los símbolos ganadores"], ["Multiplicador del bonus", "Se acumula durante el bonus", "Se suma para la secuencia ganadora de cascadas"]],
      takeaway: "La diferencia útil es cuánto dura el multiplicador. El mismo símbolo x no permite trasladar el cálculo de un juego al otro. Se comparan reglas, no resultados de sesiones ni rentabilidad.",
      checks: ["Abre los apartados de giros gratis y busca cuándo se aplica el multiplicador.", "Anota por separado cuándo se reinicia el valor acumulado.", "Comprueba el título completo: las versiones 1000 y Super Scatter quedan fuera de esta comparación."] }
  }},
  { slug: "gates-of-olympus-vs-1000", games: ["gates-of-olympus", "gates-of-olympus-1000"],
    sources: ["https://www.pragmaticplay.com/en/games/gates-of-olympus/", "https://www.pragmaticplay.com/en/games/gates-of-olympus-1000/"], copy: {
    ru: { title: "Gates of Olympus и Gates of Olympus 1000: что отличается", description: "Сравнение оригинала и версии 1000: общая логика каскадов, диапазон множителей и проверка названия запущенной игры.", question: "Что означает 1000 в названии версии?",
      rows: [["Условие выплаты", "Совпадения в любых позициях", "Совпадения в любых позициях"], ["Каскады", "Символы заменяются после выплаты", "Символы заменяются после выплаты"], ["Предел множителя символа", "До 500x по странице разработчика", "До 1000x по странице разработчика"]],
      takeaway: "Число относится к версии с другим пределом множителя, а не к обещанному результату. Оно не означает удвоенный RTP, частоту выигрышей или возврат за сессию. Сходное оформление не заменяет проверку полного названия.",
      checks: ["Сверьте название на загрузочном экране и в справке: Gates of Olympus либо Gates of Olympus 1000.", "Найдите правила множителей именно в этой версии.", "Проверьте RTP в запущенной игре; не выводите его из числа 1000."] },
    en: { title: "Gates of Olympus vs Gates of Olympus 1000: differences", description: "Original versus 1000: shared tumble rules, the multiplier limit and how to identify the game version you have opened.", question: "What does 1000 in the title mean?",
      rows: [["Payout condition", "Matches in any positions", "Matches in any positions"], ["Tumbles", "Symbols replaced after a payout", "Symbols replaced after a payout"], ["Symbol multiplier limit", "Up to 500x on the publisher's page", "Up to 1000x on the publisher's page"]],
      takeaway: "The number identifies a version with a different multiplier limit, not a promised outcome. It does not mean twice the RTP, win frequency or session return. Similar artwork does not replace checking the full title.",
      checks: ["Match the loading screen and help title: Gates of Olympus or Gates of Olympus 1000.", "Read multiplier rules for that exact version.", "Check RTP inside the opened game; do not infer it from the number 1000."] },
    es: { title: "Gates of Olympus vs Gates of Olympus 1000: diferencias", description: "Original frente a 1000: reglas comunes de cascadas, límite del multiplicador y cómo identificar la versión abierta.", question: "¿Qué significa 1000 en el nombre?",
      rows: [["Condición de premio", "Coincidencias en cualquier posición", "Coincidencias en cualquier posición"], ["Cascadas", "Símbolos sustituidos tras el premio", "Símbolos sustituidos tras el premio"], ["Límite del multiplicador de símbolo", "Hasta 500x en la página del proveedor", "Hasta 1000x en la página del proveedor"]],
      takeaway: "La cifra identifica una versión con otro límite de multiplicador, no un resultado prometido. No significa duplicar el RTP, la frecuencia de premios ni el retorno de una sesión. Un diseño parecido no sustituye comprobar el título.",
      checks: ["Contrasta el título de carga y la ayuda: Gates of Olympus o Gates of Olympus 1000.", "Lee las reglas de multiplicadores de esa versión concreta.", "Comprueba el RTP dentro del juego abierto; no lo deduzcas del número 1000."] }
  }},
  { slug: "reactoonz-vs-jammin-jars", games: ["reactoonz", "jammin-jars"],
    sources: ["https://www.playngo.com/games/reactoonz", "https://www.pushgaming.com/games/jammin-jars.html"], copy: {
    ru: { title: "Reactoonz и Jammin’ Jars: кластеры и дополнительные функции", description: "Обе игры используют группы соседних символов. Сравните энергию Reactoonz и участие wild-банок в Jammin’ Jars.", question: "Почему две кластерные игры читаются по-разному?",
      rows: [["Выигрышная группа", "Кластер соседних символов", "Кластер соседних символов"], ["Каскад", "Новые символы заменяют выигрышную группу", "Новые символы заменяют выигрышную группу"], ["За чем следить", "Энергия и активированные эффекты", "Участие wild-банок и их множители"]],
      takeaway: "Кластер объясняет образование выплаты, но не всю игру. В Reactoonz следите за энергией функций; в Jammin’ Jars — за банками, участвующими в группе. Размер поля сам по себе не показывает вероятность выигрыша.",
      checks: ["Выделите одну выигрышную группу, не объединяя соседние несвязанные символы.", "В Reactoonz сопоставьте группу с изменением энергии.", "В Jammin’ Jars отметьте только банки, участвующие в конкретном выигрыше."] },
    en: { title: "Reactoonz vs Jammin’ Jars: clusters and extra features", description: "Both games use neighbouring symbol groups. Compare Reactoonz energy with the role of Wild jars in Jammin’ Jars.", question: "Why do two cluster games need different reading?",
      rows: [["Winning group", "Cluster of neighbouring symbols", "Cluster of neighbouring symbols"], ["Cascade", "New symbols replace the winning group", "New symbols replace the winning group"], ["What to follow", "Energy and activated effects", "Participating Wild jars and their multipliers"]],
      takeaway: "A cluster explains how a payout forms, not the whole game. Follow feature energy in Reactoonz and contributing jars in Jammin’ Jars. Grid size alone does not establish the probability of a win.",
      checks: ["Identify one winning group without merging nearby unconnected symbols.", "In Reactoonz, connect the group with the change in energy.", "In Jammin’ Jars, mark only jars contributing to that particular win."] },
    es: { title: "Reactoonz vs Jammin’ Jars: grupos y funciones adicionales", description: "Ambos usan grupos de símbolos contiguos. Compara la energía de Reactoonz con el papel de los tarros Wild de Jammin’ Jars.", question: "¿Por qué se leen de forma distinta dos juegos de grupos?",
      rows: [["Grupo ganador", "Grupo de símbolos contiguos", "Grupo de símbolos contiguos"], ["Cascada", "Nuevos símbolos sustituyen al grupo ganador", "Nuevos símbolos sustituyen al grupo ganador"], ["Qué observar", "Energía y efectos activados", "Tarros Wild participantes y sus multiplicadores"]],
      takeaway: "El grupo explica cómo se forma un premio, no el juego entero. Observa la energía en Reactoonz y los tarros participantes en Jammin’ Jars. El tamaño del tablero no determina por sí solo la probabilidad de ganar.",
      checks: ["Identifica un grupo ganador sin unir símbolos cercanos que no estén conectados.", "En Reactoonz, relaciona el grupo con el cambio de energía.", "En Jammin’ Jars, marca solo los tarros que participan en ese premio concreto."] }
  }}
];
