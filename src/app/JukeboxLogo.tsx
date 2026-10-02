// Marca personal "Jukeboxdev": la jukebox y el logotipo horizontal.
// Los colores son los de la marca (no los del tema de la web) para que el logo se vea siempre igual.

export const brand = {
  ink: "#1A1033",
  body: "#B48CFF",
  accent: "#FF3DBE",
  yellow: "#FFC83D",
  teal: "#3FC1C9",
  tile: "#E4D6FF",
};

type MarkProps = { size?: number; className?: string; title?: string };

// Jukebox completa: arcos de luces, ventana con el vinilo y rejilla del altavoz (para tamaños grandes).
export function JukeboxMark({ size = 100, className, title = "Jukebox" }: MarkProps) {
  return (
    <svg className={className} width={size} height={size * 1.2} viewBox="0 0 200 240" role="img" aria-label={title}>
      <path d="M30 228 V100 A70 70 0 0 1 170 100 V228 Z" fill={brand.body} stroke={brand.ink} strokeWidth="6" strokeLinejoin="round" />
      <path d="M50 102 A50 50 0 0 1 150 102" fill="none" stroke={brand.accent} strokeWidth="10" strokeLinecap="round" />
      <path d="M66 104 A34 34 0 0 1 134 104" fill="none" stroke={brand.yellow} strokeWidth="10" strokeLinecap="round" />
      <path d="M82 106 A18 18 0 0 1 118 106" fill="none" stroke={brand.teal} strokeWidth="10" strokeLinecap="round" />
      <rect x="56" y="126" width="88" height="48" rx="4" fill="#FFFFFF" stroke={brand.ink} strokeWidth="5" />
      <circle cx="100" cy="150" r="15" fill={brand.ink} />
      <circle cx="100" cy="150" r="5" fill={brand.accent} />
      <rect x="58" y="186" width="84" height="6" rx="2" fill={brand.ink} />
      <rect x="58" y="198" width="84" height="6" rx="2" fill={brand.ink} />
      <rect x="58" y="210" width="84" height="6" rx="2" fill={brand.ink} />
      <rect x="18" y="224" width="164" height="14" rx="3" fill={brand.accent} stroke={brand.ink} strokeWidth="5" />
    </svg>
  );
}

// Versión simplificada para tamaños pequeños (navegación, pie): menos detalle, trazos más gruesos.
export function JukeboxMarkSmall({ size = 30, className }: Omit<MarkProps, "title">) {
  return (
    <svg className={className} width={size} height={size * 1.2} viewBox="0 0 200 240" aria-hidden="true">
      <path d="M30 228 V100 A70 70 0 0 1 170 100 V228 Z" fill={brand.body} stroke={brand.ink} strokeWidth="12" strokeLinejoin="round" />
      <path d="M54 104 A46 46 0 0 1 146 104" fill="none" stroke={brand.accent} strokeWidth="18" strokeLinecap="round" />
      <rect x="56" y="130" width="88" height="44" rx="4" fill="#FFFFFF" stroke={brand.ink} strokeWidth="10" />
      <rect x="18" y="218" width="164" height="20" rx="3" fill={brand.accent} stroke={brand.ink} strokeWidth="10" />
    </svg>
  );
}

// Logotipo horizontal: jukebox + JUKEBOX + etiqueta "dev".
export function JukeboxLogo({ className }: { className?: string }) {
  return (
    <span className={`jukebox-logo ${className ?? ""}`}>
      <JukeboxMarkSmall className="jukebox-logo-mark" />
      <span className="jukebox-logo-word">JUKEBOX</span>
      <span className="jukebox-logo-badge">dev</span>
    </span>
  );
}
