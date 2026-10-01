import Image from "next/image";
import type { ReactNode } from "react";
import ArrowUpRight from "./ArrowUpRight";

export type Shot = { src: string; alt: string; width: number; height: number; label: string };

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
    id: "belchat",
    number: "01",
    title: "BelChat",
    status: { label: "En producción", tone: "live" },
    color: "coral",
    featured: true,
    summary: "WhatsApp Business convertido en un sistema de tickets con IA, seguimiento y un panel de atención en tiempo real.",
    tags: ["Meta API", "IA", "Webhooks", "Tiempo real"],
    visual: <div className="project-visual belchat-visual"><span className="cs-window bc-window-back"><span className="cs-bar"><i /><i /><i /><em>belchat · tickets</em></span><Image src="/imagenes/belchat/belchat-panel.png" alt="Panel de tickets de BelChat con la bandeja de pendientes" width={1910} height={955} sizes="(max-width: 760px) 65vw, 330px" /></span><span className="cs-window bc-window-front"><span className="cs-bar"><i /><i /><i /><em>/conversacion</em></span><Image src="/imagenes/belchat/belchat-conversacion.png" alt="Conversación de WhatsApp atendida desde BelChat" width={1913} height={952} sizes="(max-width: 760px) 60vw, 300px" /></span><span className="bc-phone"><Image src="/imagenes/belchat/belchat-movil-recorte.png" alt="BelChat en WhatsApp dando la bienvenida a un cliente" width={650} height={1290} sizes="130px" /></span><span className="cs-sticker bc-sticker">WhatsApp → tickets</span></div>,
    problem: "Las consultas de clientes llegaban por WhatsApp sin orden ni seguimiento: costaba saber qué estaba pendiente y quién se encargaba de cada una.",
    built: [
      "Integración con la API de WhatsApp Business de Meta mediante webhooks.",
      "Un asistente con IA que da la bienvenida y recoge la consulta del cliente.",
      "Cada conversación se convierte en un ticket con su estado y su historial.",
      "Panel de atención en tiempo real con la bandeja de pendientes.",
    ],
    shots: [
      { src: "/imagenes/belchat/belchat-panel.png", alt: "Panel de tickets de BelChat con la bandeja de pendientes", width: 1910, height: 955, label: "belchat · tickets" },
      { src: "/imagenes/belchat/belchat-conversacion.png", alt: "Conversación de WhatsApp atendida desde BelChat", width: 1913, height: 952, label: "/conversacion" },
      { src: "/imagenes/belchat/belchat-movil-recorte.png", alt: "BelChat en WhatsApp dando la bienvenida a un cliente", width: 650, height: 1290, label: "whatsapp" },
    ],
  },
  {
    id: "correseguro",
    number: "02",
    title: "CorreSeguro",
    status: { label: "En producción", tone: "live" },
    color: "ink",
    featured: true,
    summary: "Web de Belsué para contratar un seguro deportivo para runners: coberturas claras, contratación online en 7 pasos y un chat con IA disponible 24/7.",
    tags: ["JavaScript", "Formulario multipaso", "Chat IA", "Analytics"],
    visual: <div className="project-visual correseguro-visual"><span className="cs-window cs-window-back"><span className="cs-bar"><i /><i /><i /><em>correseguro.es</em></span><Image src="/imagenes/correseguro/correseguro-portada.png" alt="Portada de CorreSeguro: el seguro pensado por runners, para runners" width={1904} height={935} sizes="(max-width: 760px) 70vw, 380px" /></span><span className="cs-window cs-window-front"><span className="cs-bar"><i /><i /><i /><em>/contratar</em></span><Image src="/imagenes/correseguro/correseguro-contratacion.png" alt="Formulario de contratación en 7 pasos, empezando por los datos personales del asegurado" width={1328} height={909} sizes="(max-width: 760px) 60vw, 300px" /></span><span className="cs-chat"><Image src="/imagenes/correseguro/correseguro-chat.png" alt="Asistente CorreSeguro con IA saludando y mostrando preguntas frecuentes" width={495} height={729} sizes="120px" /></span><span className="cs-sticker">7 pasos + chat IA</span><a className="bib-link" href="https://correseguro.es" target="_blank" rel="noreferrer">correseguro.es <b><ArrowUpRight /></b></a></div>,
    problem: "Contratar un seguro deportivo suele ser lento y confuso. La idea era que un corredor entendiera las coberturas y pudiera contratar online sin tener que llamar a nadie.",
    built: [
      "Web de producto con las coberturas explicadas de forma clara.",
      "Formulario de contratación en 7 pasos, empezando por los datos del asegurado.",
      "Chat con IA disponible 24/7 para resolver las preguntas frecuentes.",
      "Analítica para entender cómo se usa la web.",
    ],
    shots: [
      { src: "/imagenes/correseguro/correseguro-portada.png", alt: "Portada de CorreSeguro: el seguro pensado por runners, para runners", width: 1904, height: 935, label: "correseguro.es" },
      { src: "/imagenes/correseguro/correseguro-contratacion.png", alt: "Formulario de contratación en 7 pasos, empezando por los datos personales del asegurado", width: 1328, height: 909, label: "/contratar" },
      { src: "/imagenes/correseguro/correseguro-chat.png", alt: "Asistente CorreSeguro con IA saludando y mostrando preguntas frecuentes", width: 495, height: 729, label: "chat IA" },
    ],
    link: { href: "https://correseguro.es", label: "correseguro.es" },
  },
  {
    id: "formador",
    number: "03",
    title: "El Formador",
    subtitle: "(Asistente Belsué)",
    status: { label: "En piloto", tone: "pilot" },
    color: "blue",
    featured: true,
    summary: "Un asistente interno que centraliza productos, compañías y cotizaciones, siempre citando sus fuentes.",
    tags: ["Next.js", "IA + RAG", "Vercel"],
    visual: <div className="project-visual formador-collage"><span className="cs-window fm-window-back"><span className="cs-bar"><i /><i /><i /><em>asistente belsué</em></span><Image src="/imagenes/formador/formador-portal.png" alt="Portal del Asistente Belsué con El Formador, Procedimientos internos y Administración" width={1908} height={763} sizes="(max-width: 760px) 65vw, 340px" /></span><span className="cs-window fm-window-front"><span className="cs-bar"><i /><i /><i /><em>/chat</em></span><Image src="/imagenes/formador/formador-chat.png" alt="Chat de El Formador respondiendo consultas con sus fuentes" width={1536} height={948} sizes="(max-width: 760px) 60vw, 300px" /></span><span className="cs-sticker fm-sticker">responde citando fuentes ✦</span></div>,
    problem: "La información sobre productos, compañías y cotizaciones estaba repartida en muchos sitios y encontrarla llevaba demasiado tiempo.",
    built: [
      "Portal interno con El Formador, Procedimientos internos y Administración.",
      "Asistente con IA + RAG que responde a partir de la documentación interna.",
      "Cada respuesta cita sus fuentes para poder comprobarla.",
      "Desplegado en Vercel y en fase piloto con el equipo.",
    ],
    shots: [
      { src: "/imagenes/formador/formador-portal.png", alt: "Portal del Asistente Belsué con El Formador, Procedimientos internos y Administración", width: 1908, height: 763, label: "asistente belsué" },
      { src: "/imagenes/formador/formador-chat.png", alt: "Chat de El Formador respondiendo consultas con sus fuentes", width: 1536, height: 948, label: "/chat" },
    ],
  },
  {
    id: "neurodate",
    number: "04",
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
    number: "05",
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
  {
    id: "belsue",
    number: "06",
    title: "Belsué Seguros",
    status: { label: "En producción", tone: "live" },
    color: "yellow",
    summary: "Web corporativa de la correduría: seguros y servicios, teléfonos de asistencia de cada compañía, blog de noticias y formulario de contacto.",
    tags: ["Web corporativa", "Responsive", "Buscador", "Formulario"],
    visual: <div className="project-visual belsue-visual"><span className="cs-window bs-window-back"><span className="cs-bar"><i /><i /><i /><em>belsue.es</em></span><Image src="/imagenes/belsue/belsue-inicio.png" alt="Portada de Belsué: En Belsué, cuidamos de ti" width={1899} height={957} sizes="(max-width: 760px) 65vw, 330px" /></span><span className="cs-window bs-window-front"><span className="cs-bar"><i /><i /><i /><em>/contacto</em></span><Image src="/imagenes/belsue/belsue-contacto.png" alt="Página de contacto de Belsué con los datos de atención y el formulario" width={1392} height={922} sizes="(max-width: 760px) 60vw, 300px" /></span><span className="bs-phone"><Image src="/imagenes/belsue/belsue-blog-movil.png" alt="Blog de Belsué en el móvil con el buscador y los filtros por categoría" width={400} height={857} sizes="120px" /></span><a className="bib-link" href="https://belsue.es" target="_blank" rel="noreferrer">belsue.es <b><ArrowUpRight /></b></a></div>,
    problem: "La correduría necesitaba una web que explicara sus seguros con claridad y en la que un cliente encontrara rápido el teléfono de asistencia de su compañía o una forma de contactar.",
    built: [
      "Portada con los datos clave de la correduría y accesos directos a asesoramiento y asistencia.",
      "Directorio de compañías aseguradoras con buscador y sus teléfonos de asistencia.",
      "Blog de noticias con buscador y filtros por categoría.",
      "Formulario de contacto con validación de los datos del cliente.",
      "Diseño adaptado a móvil.",
    ],
    shots: [
      { src: "/imagenes/belsue/belsue-inicio.png", alt: "Portada de Belsué: En Belsué, cuidamos de ti", width: 1899, height: 957, label: "belsue.es" },
      { src: "/imagenes/belsue/belsue-companias.png", alt: "Directorio de compañías aseguradoras con buscador y teléfono de asistencia", width: 1572, height: 987, label: "/companias" },
      { src: "/imagenes/belsue/belsue-contacto.png", alt: "Página de contacto de Belsué con los datos de atención y el formulario", width: 1392, height: 922, label: "/contacto" },
      { src: "/imagenes/belsue/belsue-blog-movil.png", alt: "Blog de Belsué en el móvil con el buscador y los filtros por categoría", width: 400, height: 857, label: "blog · móvil" },
    ],
    link: { href: "https://belsue.es", label: "belsue.es" },
  },
];
