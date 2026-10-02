type CatalogCoverInput = {
  slug: string;
  name: string;
  provider: string;
};

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  }[char] ?? char));
}

function colorIndex(value: string) {
  return Array.from(value).reduce((total, char) => (total * 31 + char.codePointAt(0)!) >>> 0, 7);
}

export function getCatalogCover({ slug, name, provider }: CatalogCoverInput) {
  const palettes = [
    ["#dc482f", "#1f2624", "#f4c873"],
    ["#4f68b0", "#191c34", "#d9e7ff"],
    ["#478d68", "#172b25", "#d7ffcf"],
    ["#9b4372", "#2b1b32", "#ffd4e8"],
    ["#af742d", "#2b2415", "#fff0bb"],
  ];
  const [start, end, accent] = palettes[colorIndex(slug) % palettes.length];
  const fontSize = name.length > 25 ? 38 : name.length > 16 ? 48 : 62;
  const title = escapeXml(name);
  const label = escapeXml(provider.toUpperCase());

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-label="${title}">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${start}"/><stop offset="1" stop-color="${end}"/></linearGradient></defs>
    <rect width="960" height="540" fill="url(#g)"/>
    <circle cx="820" cy="118" r="165" fill="${accent}" fill-opacity=".18"/>
    <circle cx="738" cy="470" r="235" fill="${accent}" fill-opacity=".11"/>
    <path d="M0 420 C180 320 310 560 520 420 S790 270 960 390 V540 H0Z" fill="#fff" fill-opacity=".08"/>
    <text x="54" y="76" fill="#fff" fill-opacity=".9" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2">${label}</text>
    <text x="54" y="388" fill="#fff" font-family="Georgia, serif" font-size="${fontSize}" font-weight="400">${title}</text>
    <text x="54" y="450" fill="#fff" fill-opacity=".72" font-family="Arial, sans-serif" font-size="16" letter-spacing="1.5">SLOTFOLIO · КАТАЛОГ ИГР</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
