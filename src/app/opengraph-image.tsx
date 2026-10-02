import { ImageResponse } from "next/og";

// Imagen al compartir el enlace: la jukebox en su círculo de perfil sobre la cuadrícula morada de la marca.
export const alt = "Jukeboxdev · Cecilia Ferraz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><path d="M30 228 V100 A70 70 0 0 1 170 100 V228 Z" fill="#B48CFF" stroke="#1A1033" stroke-width="7" stroke-linejoin="round"/><path d="M50 102 A50 50 0 0 1 150 102" fill="none" stroke="#FF3DBE" stroke-width="11" stroke-linecap="round"/><path d="M66 104 A34 34 0 0 1 134 104" fill="none" stroke="#FFC83D" stroke-width="11" stroke-linecap="round"/><path d="M82 106 A18 18 0 0 1 118 106" fill="none" stroke="#3FC1C9" stroke-width="11" stroke-linecap="round"/><rect x="56" y="126" width="88" height="48" rx="4" fill="#FFFFFF" stroke="#1A1033" stroke-width="6"/><circle cx="100" cy="150" r="15" fill="#1A1033"/><circle cx="100" cy="150" r="5" fill="#FF3DBE"/><rect x="58" y="186" width="84" height="6" rx="2" fill="#1A1033"/><rect x="58" y="198" width="84" height="6" rx="2" fill="#1A1033"/><rect x="58" y="210" width="84" height="6" rx="2" fill="#1A1033"/><rect x="18" y="224" width="164" height="14" rx="3" fill="#FF3DBE" stroke="#1A1033" stroke-width="6"/></svg>`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#7B2FF7",
          backgroundImage: "linear-gradient(#9B5CFF 3px, transparent 3px), linear-gradient(90deg, #9B5CFF 3px, transparent 3px)",
          backgroundSize: "75px 75px",
        }}
      >
        <div
          style={{
            width: 450,
            height: 450,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#E4D6FF",
            border: "8px solid #1A1033",
            borderRadius: "50%",
            boxShadow: "15px 15px 0 #1A1033",
          }}
        >
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(mark)}`} width={255} height={306} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
