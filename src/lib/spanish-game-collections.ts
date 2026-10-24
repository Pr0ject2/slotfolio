import type { GameCollection } from "./collections";
export const spanishGameCollections:GameCollection[]=[
  {
    slug:"beyond-lines",title:"Más allá de las líneas de pago",
    question:"¿Cuándo pueden pagar los símbolos iguales sin alinearse?",
    introduction:"Sweet Bonanza y Gates of Olympus cuentan los símbolos iguales en todo el tablero. Reactoonz exige símbolos adyacentes. Compara qué constituye un premio y qué ocurre al retirar esos símbolos.",
    selection:"Tres juegos sin líneas de pago fijas, todos con cascadas. Dos cuentan los símbolos iguales en toda la zona de juego; el tercero exige grupos vecinos. Las cascadas rellenan el tablero después de un premio, pero no determinan qué símbolos cumplen los requisitos iniciales.",
    checklist:["¿Los símbolos iguales deben ser adyacentes?","¿Cuántos símbolos iguales forman una combinación premiada?","¿Cuándo se aplica un multiplicador y cuándo se reinicia?"],
    games:[
      {slug:"sweet-bonanza",note:"Los símbolos iguales cuentan en todo el tablero. Después de un premio desaparecen y otros nuevos rellenan los huecos. Durante los giros gratis pueden aparecer símbolos multiplicadores.",check:"Busca en la tabla de pagos el número mínimo de símbolos iguales y comprueba cuándo se aplican los multiplicadores del bonus."},
      {slug:"reactoonz",note:"Los premios requieren grupos de símbolos vecinos. Los grupos ganadores cargan un medidor de energía que puede activar efectos adicionales en el tablero.",check:"Confirma qué posiciones cuentan como vecinas y qué activa cada etapa del medidor de energía."},
      {slug:"gates-of-olympus",note:"Como en Sweet Bonanza, los símbolos iguales cuentan en todo el tablero. Una diferencia importante es el multiplicador de los giros gratis, que puede acumularse y afectar a premios posteriores del bonus.",check:"Compara las reglas del multiplicador en la base con las de los giros gratis."}
    ]
  },
  {
    slug:"cluster-features",title:"Grupos: ¿qué cambia después de un premio?",
    question:"¿Por qué funcionan de forma tan distinta los juegos que pagan por símbolos adyacentes?",
    introduction:"Reactoonz, Jammin’ Jars y Le Bandit utilizan grupos y cascadas. Sus capas adicionales difieren: un medidor de energía, tarros comodín móviles y casillas doradas. Explora qué partes del tablero importan en cada juego.",
    selection:"Tres juegos de premios por grupos de estudios distintos, todos con símbolos en cascada. La comparación se centra en lo que hacen sus funciones adicionales, no en el potencial de premio anunciado.",
    checklist:["¿Qué símbolos desaparecen después de un grupo ganador?","¿Qué permanece en el tablero entre cascadas?","¿Qué activa una función adicional?"],
    games:[
      {slug:"reactoonz",note:"Los grupos ganadores cargan un medidor de energía. Para entender el siguiente efecto, observa tanto los símbolos como la etapa actual del medidor.",check:"Lee el orden de los efectos del medidor y los requisitos de activación de cada uno."},
      {slug:"jammin-jars",note:"En su tablero de 8 × 8, los tarros comodín participan en los grupos. Después de contribuir a un premio, un tarro puede moverse y aumentar su multiplicador.",check:"Sigue un tarro comodín: ¿cuándo se mueve y cuándo crece su multiplicador?"},
      {slug:"le-bandit",note:"Un grupo ganador inicia una supercascada que también retira los símbolos iguales del mismo tipo. Las casillas doradas se vinculan después a efectos de monedas, tréboles y calderos de oro.",check:"Separa los premios normales por grupos de los efectos adicionales vinculados a las casillas doradas."}
    ]
  },
  {
    slug:"wild-symbols",title:"Comodines: fijos, móviles o de rodillo completo",
    question:"¿Qué puede hacer un comodín además de sustituir a otro símbolo?",
    introduction:"The Dog House utiliza comodines fijos, Jammin’ Jars tiene tarros comodín móviles y Wanted Dead or a Wild puede convertir símbolos especiales en rodillos comodín. Compara dónde funcionan las sustituciones y cómo afectan los multiplicadores a los premios válidos.",
    selection:"Tres usos distintos de los comodines, tanto en líneas de pago como en premios por grupos. Compartir el nombre de un símbolo no significa que los juegos calculen los premios de la misma forma.",
    checklist:["¿Qué símbolos puede sustituir el comodín?","¿Cuánto tiempo permanece en juego?","¿Qué premios pueden recibir su multiplicador?"],
    games:[
      {slug:"the-dog-house",note:"Durante los giros gratis, los comodines pueden permanecer en su sitio hasta que termine el bonus. Las líneas premiadas siguen necesitando pasar por combinaciones de símbolos válidas.",check:"Compara un comodín normal con uno fijo durante el bonus, incluida la forma en que se combinan los multiplicadores."},
      {slug:"jammin-jars",note:"Los tarros comodín actúan en un tablero de grupos. Después de contribuir a un premio, un tarro puede moverse y aumentar su multiplicador; importa su posición entre los símbolos adyacentes.",check:"Identifica el evento exacto que mueve un tarro y aumenta su multiplicador."},
      {slug:"wanted-dead-or-a-wild",note:"DuelReels puede convertir símbolos VS en rodillos comodín. Sus multiplicadores se suman para una línea de pago válida.",check:"Busca el activador de DuelReels y la regla del multiplicador cuando una línea ganadora cruza varios de esos rodillos."}
    ]
  },
  {
    slug:"five-by-three-bonuses",title:"Un tablero de 5 × 3, tres bonus diferentes",
    question:"¿Por qué una disposición idéntica de rodillos dice tan poco sobre el bonus?",
    introduction:"Book of Dead, The Dog House y Big Bass Bonanza utilizan una disposición de 5 × 3. Sus funciones de giros gratis son distintas: símbolos expansivos, comodines fijos y recogida de valores monetarios.",
    selection:"Tres juegos con el mismo tamaño de tablero y giros gratis. Mantener constante la disposición ayuda a aislar las reglas de las funciones en lugar de la forma de los rodillos.",
    checklist:["¿Qué activa los giros gratis?","¿Qué reglas cambian al comenzar la función?","¿Qué concede giros adicionales o aumenta un multiplicador?"],
    games:[
      {slug:"book-of-dead",note:"Durante los giros gratis, un símbolo seleccionado puede expandirse hasta ocupar un rodillo. Hay que distinguir esa función de un premio normal por línea.",check:"Comprueba qué permite expandirse al símbolo seleccionado y cómo se calcula después el premio."},
      {slug:"the-dog-house",note:"Los comodines pueden permanecer en los rodillos hasta que termine el bonus. El tablero evoluciona, pero los premios siguen dependiendo de combinaciones válidas.",check:"Comprueba qué rodillos pueden contener comodines fijos y cómo se aplican sus multiplicadores."},
      {slug:"big-bass-bonanza",note:"En los giros gratis, el pescador recoge los valores de los símbolos monetarios. Sus apariciones repetidas pueden hacer avanzar un medidor hacia giros adicionales y multiplicadores.",check:"Separa los premios normales por líneas, la recogida de valores monetarios y el progreso del medidor del bonus."}
    ]
  }
];
