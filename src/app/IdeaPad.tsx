"use client";

import { motion } from "motion/react";
import { type CSSProperties, type PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { JukeboxLogo } from "./JukeboxLogo";

type Idea = { title: string; text: string; label: string; color: string };

// Añade aquí nuevas ideas: cada una es una hoja del taco.
const ideas: Idea[] = [
  { title: "SuperFinder", text: "Una app colaborativa, estilo Waze, para encontrar productos en supermercados gracias a las ubicaciones compartidas por la comunidad.", label: "concepto de hackathon · en pausa", color: "var(--yellow)" },
  { title: "La siguiente…", text: "Todavía se está cocinando. Vuelve en un tiempo y probablemente haya otra hoja aquí.", label: "en el horno", color: "var(--mint)" },
];

type Torn = { id: number; idea: number; tilt: number };

// Teclado decorativo: tres filas de 14 teclas y una última con la barra espaciadora.
const keys = Array.from({ length: 42 }, (_, i) => i);

// Colores que va alternando la estela del puntero en la pantalla.
const trailColors = ["var(--coral)", "var(--yellow)", "var(--mint)", "var(--lilac)"];

// Iconos de la barra de tareas; la app de notas es la que está abierta (el taco de post-its).
const taskbarApps = [
  { glyph: "▤", label: "archivos", color: "var(--mint)" },
  { glyph: "◎", label: "navegador", color: "var(--lilac)" },
  { glyph: "</>", label: "editor", color: "var(--coral)" },
  { glyph: ">_", label: "terminal", color: "var(--paper)" },
  { glyph: "✎", label: "notas", color: "var(--yellow)", active: true },
];

// Ordenador con el texto de la sección (children) y un taco de post-its en la pantalla: al hacer click se arranca la hoja de arriba y cae, dejando ver la siguiente idea.
export default function IdeaPad({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [torn, setTorn] = useState<Torn[]>([]);
  const nextId = useRef(0);
  const trailRef = useRef<HTMLSpanElement>(null);
  const lastDot = useRef({ x: -99, y: -99, count: 0 });
  const [clock, setClock] = useState("");
  const pcRef = useRef<HTMLDivElement>(null);
  const [entrance, setEntrance] = useState<"idle" | "armed" | "in">("idle");

  // Entrada: el ordenador se queda oculto hasta que la sección aparece en pantalla y entonces se monta por partes.
  // Cuando sale del todo de la pantalla vuelve a ocultarse, así la animación se repite cada vez que se vuelve.
  useEffect(() => {
    const pc = pcRef.current;
    if (!pc || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEntrance("armed");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.3) setEntrance("in");
      else if (!entry.isIntersecting) setEntrance("armed");
    }, { threshold: [0, 0.3] });
    observer.observe(pc);
    return () => observer.disconnect();
  }, []);

  // Reloj de la barra de tareas: se rellena en el cliente para no chocar con el HTML del servidor.
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }));
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 15000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);
  const next = (index + 1) % ideas.length;

  const tear = () => {
    const tilt = Math.random() > 0.5 ? 1 : -1;
    setTorn((current) => [...current, { id: nextId.current++, idea: index, tilt }]);
    setIndex(next);
  };

  // Estela: cada ~10px de recorrido del ratón se añade un punto que se desvanece y se borra solo.
  const paintTrail = (event: PointerEvent<HTMLDivElement>) => {
    const layer = trailRef.current;
    if (!layer || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = layer.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (Math.hypot(x - lastDot.current.x, y - lastDot.current.y) < 10) return;
    const count = lastDot.current.count + 1;
    lastDot.current = { x, y, count };
    const dot = document.createElement("i");
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.background = trailColors[count % trailColors.length];
    dot.addEventListener("animationend", () => dot.remove());
    layer.appendChild(dot);
  };

  return (
    <div ref={pcRef} className={`idea-pc ${entrance === "idle" ? "" : "is-armed"} ${entrance === "in" ? "is-in" : ""}`}>
      <div className="pc-monitor">
        <div className="pc-screen" onPointerMove={paintTrail} onPointerLeave={() => { lastDot.current.x = -99; }}>
          <div className="pc-window-bar" aria-hidden="true">
            <span className="pc-dots"><i /><i /><i /></span>
            ideas_en_el_horno.txt
          </div>
          <div className="pc-desktop">
            {children}
            <button className="idea-pad" onClick={tear} aria-label={`Arrancar la hoja y ver la siguiente idea (${index + 1} de ${ideas.length})`}>
              <span className="idea-pad-edge" aria-hidden="true" />
              <IdeaSheet idea={ideas[next]} className="is-under" hidden />
              <IdeaSheet idea={ideas[index]} key={index} />
              {torn.map((sheet) => (
                <motion.div
                  key={sheet.id}
                  className="idea-sheet-fly"
                  aria-hidden="true"
                  style={{ transformOrigin: sheet.tilt > 0 ? "top left" : "top right" }}
                  initial={{ rotate: 0, y: 0, x: 0, opacity: 1 }}
                  animate={{ rotate: [0, -3 * sheet.tilt, 26 * sheet.tilt], y: [0, -10, 380], x: [0, 0, 70 * sheet.tilt], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.85, times: [0, 0.2, 1], ease: ["easeOut", "easeIn"] }}
                  onAnimationComplete={() => setTorn((current) => current.filter((item) => item.id !== sheet.id))}
                >
                  <IdeaSheet idea={ideas[sheet.idea]} />
                </motion.div>
              ))}
            </button>
          </div>
          <div className="pc-taskbar" aria-hidden="true">
            <span className="pc-start"><i /><i /><i /><i /></span>
            <span className="pc-search">buscar ideas…</span>
            <span className="pc-apps">
              {taskbarApps.map((app) => (
                <span key={app.label} className={`pc-app ${app.active ? "is-active" : ""}`} style={{ background: app.color }}>{app.glyph}</span>
              ))}
            </span>
            <span className="pc-tray">
              <svg viewBox="0 0 16 12" width="15" height="12"><path d="M1 4.5a10 10 0 0 1 14 0M3.5 7a6.5 6.5 0 0 1 9 0M6 9.5a3 3 0 0 1 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <svg viewBox="0 0 22 12" width="20" height="11"><rect x="1" y="1" width="17" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="3" width="10" height="6" rx="1" fill="var(--mint)" /><rect x="19" y="4" width="2" height="4" rx="1" fill="currentColor" /></svg>
              <span className="pc-clock">{clock}</span>
            </span>
          </div>
          <span className="pc-trail" ref={trailRef} aria-hidden="true" />
        </div>
        <span className="pc-power" aria-hidden="true" />
      </div>
      <span className="pc-neck" aria-hidden="true" />
      <span className="pc-base" aria-hidden="true" />
      <div className="pc-desk" aria-hidden="true">
        <DeskItems />
        <span className="pc-keyboard">
          {keys.map((key) => <i key={key} style={{ "--i": key } as CSSProperties} />)}
          <i /><i /><i /><i className="pc-space" /><i /><i /><i />
        </span>
        <span className="pc-mouse" />
      </div>
      <p className="idea-pad-hint" aria-live="polite">
        <span>{index + 1} / {ideas.length}</span> click para arrancar la hoja ↺
      </p>
    </div>
  );
}

const cubeColors = ["var(--coral)", "var(--yellow)", "var(--mint)", "var(--paper)", "var(--lilac)", "var(--coral)", "var(--mint)", "var(--yellow)", "var(--lilac)"];

type SpikeBurst = { id: number; spikes: { x: number; y: number; angle: number; spin: number }[] };

// Cosas frikis de la mesa: cactus y cubo de Rubik a la izquierda, libros con el patito de goma a la derecha.
function DeskItems() {
  const [bursts, setBursts] = useState<SpikeBurst[]>([]);
  const burstId = useRef(0);

  // Click en el cactus: lanza pinchitos en abanico hacia arriba que caen por gravedad y se borran al acabar.
  const shootSpikes = () => {
    const id = burstId.current++;
    const spikes = Array.from({ length: 12 }, (_, i) => {
      const angle = -190 + (i / 11) * 200 + (Math.random() - 0.5) * 14;
      const distance = 55 + Math.random() * 70;
      const radians = (angle * Math.PI) / 180;
      return { x: Math.cos(radians) * distance, y: Math.sin(radians) * distance, angle, spin: (Math.random() - 0.5) * 360 };
    });
    setBursts((current) => [...current, { id, spikes }]);
    setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== id)), 1100);
  };

  return (
    <>
      <span className="pc-desk-items pc-desk-left">
        <span className="pc-cactus" onClick={shootSpikes}>
          {bursts.map((burst) => (
            <span key={burst.id} className="pc-spikes">
              {burst.spikes.map((spike, i) => (
                <motion.i
                  key={i}
                  initial={{ x: 0, y: 0, rotate: spike.angle + 90, opacity: 1 }}
                  animate={{ x: [0, spike.x * 0.8, spike.x], y: [0, spike.y, spike.y + 70], rotate: spike.angle + 90 + spike.spin, opacity: [1, 1, 0] }}
                  transition={{ duration: 1, times: [0, 0.45, 1], ease: "easeOut" }}
                />
              ))}
            </span>
          ))}
          <svg viewBox="0 0 56 90" width="56" height="90">
            <path d="M20 44H14a5 5 0 0 1-5-5V27a4 4 0 0 1 8 0v9h3M36 36h6a5 5 0 0 0 5-5V20a4 4 0 0 0-8 0v8h-3" fill="var(--mint)" />
            <rect x="20" y="14" width="16" height="46" rx="8" fill="var(--mint)" />
            <path d="M25 24v4M31 32v4M25 42v4M31 50v3" fill="none" strokeWidth="2" />
            <circle cx="28" cy="12" r="4.5" fill="var(--coral)" />
            <path d="M11 64h34l-4 24H15z" fill="var(--lilac)" />
            <rect x="7" y="57" width="42" height="9" rx="2" fill="var(--lilac)" />
          </svg>
        </span>
        <svg className="pc-cube" viewBox="0 0 52 52" width="52" height="52">
          <rect x="2" y="2" width="48" height="48" rx="7" fill="var(--ink)" />
          {cubeColors.map((color, i) => <rect key={i} x={6 + (i % 3) * 14} y={6 + Math.floor(i / 3) * 14} width="12" height="12" rx="2.5" fill={color} strokeWidth="0" />)}
        </svg>
      </span>
      <span className="pc-desk-items pc-desk-right">
        <span className="pc-duck">
          <svg viewBox="0 0 64 56" width="64" height="56">
            <path d="M6 37c0-8 6-12 16-12h16c6 0 10-6 16-10 4 6 4 12 2 16 2 2 4 5 4 8 0 10-12 15-27 15S6 47 6 37z" fill="var(--yellow)" />
            <path d="M12 17 1 20.5 12 24z" fill="var(--coral)" />
            <circle cx="22" cy="18" r="11" fill="var(--yellow)" />
            <circle cx="18.5" cy="15.5" r="2" fill="var(--ink)" strokeWidth="0" />
            <path d="M27 40c5 6 15 6 19-2" fill="none" />
          </svg>
        </span>
        <svg className="pc-books" viewBox="0 0 98 46" width="98" height="46">
          <rect x="6" y="31" width="86" height="13" rx="2" fill="var(--mint)" />
          <rect x="12" y="17" width="78" height="14" rx="2" fill="var(--coral)" />
          <rect x="2" y="3" width="84" height="14" rx="2" fill="var(--lilac)" />
          <path d="M14 37.5h24M22 24h18M74 24h8M12 10h20" fill="none" strokeWidth="2" />
          <text x="62" y="14" strokeWidth="0" fill="var(--ink)">SQL</text>
          <text x="58" y="41" strokeWidth="0" fill="var(--ink)">JS</text>
        </svg>
      </span>
    </>
  );
}

function IdeaSheet({ idea, className = "", hidden = false }: { idea: Idea; className?: string; hidden?: boolean }) {
  return (
    <span className={`idea-sheet ${className}`} style={{ background: idea.color }} aria-hidden={hidden || undefined}>
      <JukeboxLogo className="idea-sheet-logo" />
      <strong>{idea.title}</strong>
      <span className="idea-sheet-text">{idea.text}</span>
      <span className="idea-sheet-label">{idea.label}</span>
    </span>
  );
}
