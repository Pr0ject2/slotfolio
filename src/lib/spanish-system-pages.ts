import type { InformationSection } from "./system-pages";

type SpanishInformationPage = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: InformationSection[];
};

export const spanishSystemPages: Record<string, SpanishInformationPage> = {
  "editorial-policy": {
    title: "Cómo comprobamos los datos de los juegos",
    eyebrow: "Criterios editoriales",
    intro: "De dónde procede la información, cómo interpretar las cifras y qué comprobar cuando las fuentes no coinciden.",
    sections: [
      {
        title: "Empieza por las reglas del proveedor",
        text: "Slotfolio utiliza las reglas del juego y los materiales del proveedor para describir sus mecánicas y características. El nombre y la versión importan: una secuela o una configuración distinta pueden tener otras reglas aunque sus imágenes se parezcan.",
        steps: [
          "Confirma el nombre exacto del juego y su proveedor antes de comparar cifras.",
          "Busca el RTP, las fechas de lanzamiento y el premio máximo en los documentos correspondientes. Pueden publicarse por separado.",
          "La fecha de última comprobación indica cuándo revisamos un dato, no que vaya a permanecer igual para siempre.",
        ],
        links: [{ label: "Consultar el catálogo", href: "/es/slots" }],
      },
      {
        title: "Cuando las cifras no coinciden",
        text: "Un casino puede ofrecer una de varias versiones del mismo juego. Consulta la ayuda o la tabla de pagos de la versión que tengas delante. No calcules un promedio entre cifras incompatibles ni supongas que la configuración del catálogo se aplica en todos los sitios.",
        steps: [
          "Comprueba el juego, la versión y las unidades. Un premio máximo expresado como múltiplo de la apuesta no es una cantidad fija de dinero.",
          "Distingue entre un RTP concreto y un intervalo de configuraciones disponibles.",
          "Trata como desconocido cualquier parámetro que no puedas verificar. Un campo vacío no significa cero.",
        ],
        links: [{ label: "Qué significa realmente el RTP", href: "/es/journal/understanding-rtp" }],
      },
      {
        title: "Datos, explicaciones y limitaciones",
        text: "Las reglas de pago, la distribución del tablero y las condiciones de los bonos se pueden contrastar con la documentación. Cuando explicamos el ritmo o la complejidad de un juego, interpretamos sus reglas documentadas. Esa explicación no afirma que sea rentable ni verifica cómo paga un casino.",
        links: [
          { label: "Juego responsable", href: "/es/responsible-gaming" },
        ],
      },
    ],
  },
  privacy: {
    title: "Privacidad y datos del navegador",
    eyebrow: "Privacidad",
    intro: "No necesitas una cuenta para consultar Slotfolio. Aquí explicamos qué puede guardar tu navegador y cómo borrarlo.",
    sections: [
      {
        title: "Juegos guardados para comparar",
        text: "La selección de juegos para comparar se guarda localmente en el navegador de este dispositivo. La lista no se sincroniza automáticamente con otro navegador u ordenador.",
        steps: [
          "Utiliza la opción de borrar de la vista de comparación para quitar los juegos seleccionados.",
          "Para eliminar otros datos locales, busca Slotfolio en los ajustes de datos de sitios web de tu navegador y borra su entrada.",
          "La navegación privada o el bloqueo del almacenamiento pueden hacer que la selección desaparezca al cerrar la ventana.",
        ],
        links: [{ label: "Abrir la comparación", href: "/es/compare" }],
      },
      {
        title: "Búsquedas, filtros e historial",
        text: "Las búsquedas y los filtros pueden aparecer en la dirección de una página. Quien reciba el enlace puede verlos; la dirección también puede quedar en el historial del navegador y en los registros del alojamiento.",
        steps: [
          "No escribas contraseñas, datos de pago u otra información sensible en el buscador del sitio.",
          "Para compartir un enlace sin filtros, usa la página del juego o la dirección del catálogo sin lo que aparece después del signo de interrogación.",
          "Borrar la lista de comparación no borra el historial. Si lo necesitas, elimina esas visitas por separado.",
        ],
        links: [{ label: "Consultar el catálogo", href: "/es/slots" }],
      },
      {
        title: "Tu elección de idioma",
        text: "El selector RU/EN/ES guarda tu elección en el navegador de este dispositivo. La elección guardada tiene prioridad sobre el idioma del navegador. Puedes cambiarla con el selector o borrarla eliminando los datos de Slotfolio en los ajustes del navegador. Si una página todavía no tiene traducción, una preferencia guardada no debe ocultarte el enlace directo a su versión disponible.",
      },
      {
        title: "Al cargar páginas y visitar otros sitios",
        text: "Tu navegador envía solicitudes al proveedor de alojamiento cuando visitas el sitio. Las imágenes y las fuentes se sirven junto con las páginas. Los enlaces a proveedores de juegos, servicios de ayuda u operadores llevan a sitios independientes con sus propias prácticas de privacidad. Borrar los datos de Slotfolio no elimina los datos guardados allí.",
      },
    ],
  },
  "responsible-gaming": {
    title: "Juego responsable y ayuda",
    eyebrow: "Juego responsable · 18+",
    intro: "Si el juego afecta a tu economía, tus relaciones o tu capacidad para parar, puedes buscar apoyo y poner límites prácticos.",
    sections: [
      {
        title: "Si necesitas parar ahora",
        text: "Cierra el juego y evita hacer otro ingreso para recuperar pérdidas. Haber perdido antes no hace más seguro un premio en la siguiente tirada.",
        steps: [
          "Busca una opción de pausa o autoexclusión en la cuenta del operador, o pregunta a su equipo de atención.",
          "Desactiva las notificaciones promocionales y elimina las aplicaciones que te animen a volver.",
          "Pregunta a tu banco si ofrece un bloqueo de pagos relacionados con el juego.",
          "Habla con alguien de confianza. No tienes que esperar a tener deudas para pedir ayuda.",
        ],
      },
      {
        title: "Comprueba qué limita cada herramienta",
        text: "Algunos operadores ofrecen límites de ingresos, pérdidas o tiempo. Un límite de ingresos restringe las recargas, pero no necesariamente el total apostado o perdido. Lee cómo funciona cada límite y cuándo entra en vigor. No juegues con dinero necesario para la vivienda, la comida, las facturas o el pago de deudas.",
      },
      {
        title: "Servicios de apoyo y autoexclusión",
        text: "En Gran Bretaña, GamCare ofrece apoyo a personas afectadas por el juego y a sus allegados. GAMSTOP permite la autoexclusión de los operadores de juego en línea participantes. Comprueba en sus sitios la cobertura y los requisitos. Estos servicios no constituyen una solución universal para todos los países: fuera de esa jurisdicción, busca los recursos locales y consulta al regulador correspondiente.",
        links: [
          { label: "Apoyo de GamCare (Gran Bretaña, en inglés)", href: "https://www.gamcare.org.uk/" },
          { label: "Autoexclusión con GAMSTOP (Gran Bretaña, en inglés)", href: "https://www.gamstop.co.uk/" },
        ],
      },
      {
        title: "A quién se dirige el sitio",
        text: "Slotfolio está dirigido a personas de 18 años o más. Los requisitos de edad y las normas sobre el juego dependen del lugar. Slotfolio no acepta apuestas ni administra cuentas de juego; solo el operador o su equipo de atención pueden suspender una cuenta.",
      },
    ],
  },
};
