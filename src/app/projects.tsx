import Image from "next/image";
import type { ReactNode } from "react";
import ArrowUpRight from "./ArrowUpRight";

// Si lleva video, src es la imagen de portada (poster) que se ve antes de darle al play y en la miniatura.
export type Shot = { src: string; alt: string; width: number; height: number; label: string; video?: string };

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  status: { label: string; tone?: "live" | "pilot" };
  color: "coral" | "ink" | "blue" | "pink" | "green" | "yellow";
  featured?: boolean;
  summary: string;
  tags: string[];
  visual: ReactNode;
  // Contenido de la ventana abierta (borrador: revisar y completar)
  problem: string;
  built: string[];
  shots: Shot[];
  link?: { href: string; label: string };
  // Para las apps que se pueden probar desde el navegador (PWA)
  tryIt?: { href: string; label: string; note: string; install: { platform: string; steps: string[] }[] };
};

export const projects: Project[] = [
  {
    id: "neurodate",
    number: "01",
    title: "Neurodate",
    status: { label: "Construido" },
    color: "pink",
    summary: "App de citas y conexiones para personas neurodivergentes y LGBTIQ+.",
    tags: ["React Native", "UX inclusiva"],
    visual: <div className="project-visual phone-visual neurodate-visual"><span className="neurodate-poster"><Image src="/imagenes/neurodate/neurodate-portada.png" alt="Portada de NeuroDate: Encuentra tu match mental" width={2000} height={2000} sizes="180px" /></span><span className="neurodate-screen"><Image src="/imagenes/neurodate/neurodate-app.jpg" alt="Pantalla de bienvenida de la app NeuroDate" width={739} height={1600} sizes="130px" /></span></div>,
    problem: "Las apps de citas no suelen estar pensadas para personas neurodivergentes ni para el colectivo LGBTIQ+.",
    built: [
      "App móvil desarrollada con React Native.",
      "Una experiencia de usuario inclusiva, clara y sin ruido.",
      "Conexiones por afinidad: «Encuentra tu match mental».",
    ],
    shots: [
      { src: "/imagenes/neurodate/neurodate-portada.png", alt: "Portada de NeuroDate: Encuentra tu match mental", width: 2000, height: 2000, label: "neurodate" },
      { src: "/imagenes/neurodate/neurodate-app.jpg", alt: "Pantalla de bienvenida de la app NeuroDate", width: 739, height: 1600, label: "bienvenida" },
    ],
  },
  {
    id: "homi",
    number: "02",
    title: "HOMI",
    status: { label: "En desarrollo" },
    color: "green",
    summary: "Organizar las tareas de casa en equipo, sin que todo dependa de una sola persona.",
    tags: ["React Native", "PWA", "Vercel"],
    visual: <div className="project-visual homi-visual"><span className="homi-phone"><Image src="/imagenes/homi/homi-app-portada.jpg" alt="Pantalla de carga de HOMI con la casita y el logo" width={600} height={1231} sizes="(max-width: 760px) 27vw, 140px" /></span><span className="homi-screen hs-inicio"><Image src="/imagenes/homi/homi-app-inicio.jpg" alt="Inicio de HOMI con las tareas para hoy y el resumen del hogar" width={600} height={1212} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="homi-screen hs-tareas"><Image src="/imagenes/homi/homi-app-tareas.jpg" alt="Tareas de HOMI con el calendario del mes" width={600} height={1176} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="homi-screen hs-ajustes"><Image src="/imagenes/homi/homi-app-perfil-ajustes.jpg" alt="Ajustes de HOMI con el perfil y las notificaciones" width={600} height={1170} sizes="(max-width: 760px) 25vw, 130px" /></span></div>,
    problem: "En muchas casas las tareas acaban recayendo siempre en la misma persona.",
    built: [
      "App móvil desarrollada con React Native.",
      "Inicio con las tareas del día y un resumen de cada hogar: tareas, lista de la compra y chat.",
      "Varios hogares por cuenta, con uno marcado como principal.",
      "Cada hogar tiene sus miembros con roles y sus módulos: tareas, lista de compra, chat, hucha y mascotas.",
      "Gestión del hogar: invitar a alguien, gestionar miembros, cambiar la foto y el nombre.",
      "Calendario de tareas con vista de hoy, semana y mes.",
      "Chat del hogar para coordinarse sin salir de la app.",
      "Notificaciones configurables para el chat, las tareas, la compra y los gastos de la hucha.",
      "Adaptada como PWA y desplegada en Vercel: se puede usar desde el navegador o instalar como una app más.",
    ],
    shots: [
      { src: "/imagenes/homi/homi-app-portada.jpg", video: "/imagenes/homi/homi-promo.mp4", alt: "Vídeo promocional de HOMI", width: 1080, height: 1920, label: "vídeo promo" },
      { src: "/imagenes/homi/homi-app-inicio.jpg", alt: "Inicio de HOMI con las tareas para hoy y el resumen del hogar", width: 600, height: 1212, label: "inicio" },
      { src: "/imagenes/homi/homi-app-tareas.jpg", alt: "Tareas de HOMI con el calendario del mes", width: 600, height: 1176, label: "tareas" },
      { src: "/imagenes/homi/homi-app-hogar-miembros.jpg", alt: "Página de un hogar en HOMI con sus miembros y los módulos de tareas, lista de compra, chat, hucha y mascotas", width: 600, height: 1212, label: "hogar" },
      { src: "/imagenes/homi/homi-app-hogar-menu.jpg", alt: "Opciones del hogar en HOMI: hogar principal, cambiar foto, editar nombre, gestionar miembros, invitar y eliminar", width: 600, height: 1212, label: "opciones del hogar" },
      { src: "/imagenes/homi/homi-app-perfil-ajustes.jpg", alt: "Ajustes de HOMI con el perfil y las notificaciones", width: 600, height: 1170, label: "ajustes" },
    ],
    tryIt: {
      href: "https://tareas-hogar-snowy.vercel.app/welcome",
      label: "Abrir HOMI",
      note: "Es una PWA: funciona directamente en el navegador y, si quieres, la puedes instalar en tu móvil como una app más.",
      install: [
        { platform: "iPhone / iPad", steps: ["Abre el enlace en Safari.", "Toca el botón Compartir (el cuadrado con la flecha hacia arriba).", "Elige «Añadir a pantalla de inicio» y confirma con «Añadir»."] },
        { platform: "Android", steps: ["Abre el enlace en Chrome.", "Toca el menú ⋮ de arriba a la derecha.", "Elige «Instalar app» (o «Añadir a pantalla de inicio») y confirma."] },
        { platform: "Ordenador", steps: ["Abre el enlace en Chrome o Edge.", "Pulsa el icono de instalar a la derecha de la barra de direcciones.", "Confirma con «Instalar»: se abrirá en su propia ventana."] },
      ],
    },
  },
];
