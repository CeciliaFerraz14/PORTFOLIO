import { ImageResponse } from "next/og";

// Icono para "Añadir a pantalla de inicio" en iOS: la jukebox (variante 64 px) sobre la baldosa lila.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><path d="M30 228 V100 A70 70 0 0 1 170 100 V228 Z" fill="#B48CFF" stroke="#1A1033" stroke-width="12" stroke-linejoin="round"/><path d="M54 104 A46 46 0 0 1 146 104" fill="none" stroke="#FF3DBE" stroke-width="18" stroke-linecap="round"/><rect x="56" y="130" width="88" height="44" rx="4" fill="#FFFFFF" stroke="#1A1033" stroke-width="10"/><rect x="18" y="218" width="164" height="20" rx="3" fill="#FF3DBE" stroke="#1A1033" stroke-width="10"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#E4D6FF" }}>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(mark)}`} width={110} height={132} alt="" />
      </div>
    ),
    size,
  );
}
