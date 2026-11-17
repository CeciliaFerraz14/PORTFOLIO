import Image from "next/image";
import type { ReactNode } from "react";

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

// Same install steps for every PWA in the portfolio
const pwaInstall: NonNullable<Project["tryIt"]>["install"] = [
  { platform: "iPhone / iPad", steps: ["Abre el enlace en Safari.", "Toca el botón Compartir (el cuadrado con la flecha hacia arriba).", "Elige «Añadir a pantalla de inicio» y confirma con «Añadir»."] },
  { platform: "Android", steps: ["Abre el enlace en Chrome.", "Toca el menú ⋮ de arriba a la derecha.", "Elige «Instalar app» (o «Añadir a pantalla de inicio») y confirma."] },
  { platform: "Ordenador", steps: ["Abre el enlace en Chrome o Edge.", "Pulsa el icono de instalar a la derecha de la barra de direcciones.", "Confirma con «Instalar»: se abrirá en su propia ventana."] },
];

export const projects: Project[] = [
  {
    id: "neurodate",
    number: "01",
    title: "Neurodate",
    status: { label: "En desarrollo" },
    color: "pink",
    summary: "App de citas y conexiones para personas neurodivergentes.",
    tags: ["React Native", "Expo", "Supabase", "UX inclusiva"],
    visual: <div className="project-visual phone-visual neurodate-visual"><span className="neurodate-poster"><Image src="/imagenes/neurodate/neurodate-portada.png" alt="Portada de NeuroDate: Encuentra tu match mental" width={2000} height={2000} sizes="200px" /></span><span className="neurodate-screen"><Image src="/imagenes/neurodate/neurodate-app-explorar.png" alt="Explorar en NeuroDate: tarjeta de perfil con avatar, intereses y valores" width={384} height={838} sizes="130px" /></span></div>,
    problem: "Las apps de citas no suelen estar pensadas para personas neurodivergentes.",
    built: [
      "App móvil con React Native y Expo, con Supabase para la autenticación, la base de datos y el tiempo real.",
      "Avatares simbólicos en lugar de fotos: las fotos se desbloquean poco a poco según los días que lleváis hablando.",
      "Perfiles inclusivos con identidad de género, orientación, intereses y valores.",
      "Chat en tiempo real con indicador de «escribiendo», notificaciones y opciones para reportar y bloquear.",
      "Distancia aproximada sin exponer nunca la ubicación exacta, y opción de ocultarla.",
      "Comunidades por temas, con recomendaciones de Claude a partir de los intereses del perfil, sin leer los mensajes.",
      "Accesibilidad: modo oscuro, tamaño de fuente ajustable y etiquetas de accesibilidad en todos los elementos.",
    ],
    shots: [
      { src: "/imagenes/neurodate/neurodate-portada.png", alt: "Portada de NeuroDate: Encuentra tu match mental", width: 2000, height: 2000, label: "neurodate" },
      { src: "/imagenes/neurodate/neurodate-app-bienvenida.png", alt: "Pantalla de bienvenida de NeuroDate: conexiones auténticas, sin filtros superficiales", width: 386, height: 847, label: "bienvenida" },
      { src: "/imagenes/neurodate/neurodate-app-explorar.png", alt: "Explorar en NeuroDate: tarjeta de perfil con avatar, intereses y valores", width: 384, height: 838, label: "explorar" },
      { src: "/imagenes/neurodate/neurodate-app-perfil.png", alt: "Tarjeta de perfil en NeuroDate con identidad, distancia aproximada, intereses y valores", width: 382, height: 837, label: "perfil" },
      { src: "/imagenes/neurodate/neurodate-app-conexiones.png", alt: "Conexiones de NeuroDate con las conversaciones y sus estrellas", width: 383, height: 834, label: "conexiones" },
      { src: "/imagenes/neurodate/neurodate-app-chat-galeria.png", alt: "Chat de NeuroDate avisando de que la galería completa se ha desbloqueado", width: 384, height: 839, label: "galería desbloqueada" },
      { src: "/imagenes/neurodate/neurodate-app-galeria.png", alt: "Galería de NeuroDate con las fotos que se desbloquean por estrellas", width: 385, height: 834, label: "galería" },
      { src: "/imagenes/neurodate/neurodate-app-comunidades.png", alt: "Comunidades de NeuroDate recomendadas por Claude según tus intereses", width: 383, height: 834, label: "comunidades" },
      { src: "/imagenes/neurodate/neurodate-app-ajustes.png", alt: "Ajustes de NeuroDate con modo oscuro, tamaño de fuente y privacidad", width: 376, height: 845, label: "ajustes" },
    ],
  },
  {
    id: "homi",
    number: "02",
    title: "HOMI",
    status: { label: "En uso", tone: "live" },
    color: "green",
    summary: "Organizar las tareas de casa en equipo, sin que todo dependa de una sola persona.",
    tags: ["React Native", "PWA", "Vercel"],
    visual: <div className="project-visual phone-fan"><span className="fan-phone"><Image src="/imagenes/homi/homi-app-portada.jpg" alt="Pantalla de carga de HOMI con la casita y el logo" width={600} height={1231} sizes="(max-width: 760px) 27vw, 140px" /></span><span className="fan-screen fan-1"><Image src="/imagenes/homi/homi-app-inicio.jpg" alt="Inicio de HOMI con las tareas para hoy y el resumen del hogar" width={600} height={1212} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-2"><Image src="/imagenes/homi/homi-app-tareas.jpg" alt="Tareas de HOMI con el calendario del mes" width={600} height={1176} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-3"><Image src="/imagenes/homi/homi-app-perfil-ajustes.jpg" alt="Ajustes de HOMI con el perfil y las notificaciones" width={600} height={1170} sizes="(max-width: 760px) 25vw, 130px" /></span></div>,
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
      install: pwaInstall,
    },
  },
  {
    id: "troko",
    number: "03",
    title: "TrokoApp",
    subtitle: "Troko Bloco",
    status: { label: "En uso", tone: "live" },
    color: "blue",
    summary: "Red social privada para la escuela de batucada Troko Bloco: avisos, calendario y el muro de cada grupo.",
    tags: ["React", "Supabase", "PWA", "Vercel"],
    visual: <div className="project-visual phone-fan"><span className="fan-phone"><Image src="/imagenes/troko/troko-app-avisos.jpg" alt="Inicio de TrokoApp con la próxima clase y el tablón de avisos" width={600} height={1224} sizes="(max-width: 760px) 27vw, 140px" /></span><span className="fan-screen fan-1"><Image src="/imagenes/troko/troko-app-calendario.jpg" alt="Calendario de TrokoApp con las próximas clases y quedadas" width={600} height={1161} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-2"><Image src="/imagenes/troko/troko-app-grupo-muro.jpg" alt="Muro del grupo Bloco en TrokoApp con una canción de Spotify y reacciones" width={600} height={1161} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-3"><Image src="/imagenes/troko/troko-app-tienda.jpg" alt="Ficha de la camiseta de Troko Bloco en la tienda de la app" width={600} height={1151} sizes="(max-width: 760px) 25vw, 130px" /></span></div>,
    problem: "Una escuela de batucada con varios grupos necesita un sitio propio para los avisos, las clases y la vida de cada grupo.",
    built: [
      "App web instalable (PWA) con React, Vite, TypeScript y Tailwind CSS, desplegada en Vercel.",
      "Backend en Supabase: autenticación, Postgres con políticas RLS, Storage para fotos y Realtime.",
      "Tablón de avisos generales o por grupo, con avisos importantes, fotos y control de leídos.",
      "Calendario de clases y quedadas con repeticiones, asistencia («Voy») y la próxima cita en el inicio.",
      "Cada grupo tiene su muro, chat con fotos, galería y miembros; se puede compartir texto, fotos, vídeos y Spotify.",
      "Notificaciones push para avisos, mensajes del chat y felicitaciones de cumpleaños automáticas.",
      "Tienda de la escuela para pedir camisetas y otros productos.",
      "Panel de administración: aprobar cuentas, gestionar personas y grupos, y vigilar el uso del plan gratuito.",
    ],
    shots: [
      { src: "/imagenes/troko/troko-app-avisos.jpg", alt: "Inicio de TrokoApp con la próxima clase y el tablón de avisos", width: 600, height: 1224, label: "avisos" },
      { src: "/imagenes/troko/troko-app-calendario.jpg", alt: "Calendario de TrokoApp con las próximas clases y quedadas", width: 600, height: 1161, label: "calendario" },
      { src: "/imagenes/troko/troko-app-grupo-muro.jpg", alt: "Muro del grupo Bloco en TrokoApp con una canción de Spotify y reacciones", width: 600, height: 1161, label: "muro del grupo" },
      { src: "/imagenes/troko/troko-app-tienda.jpg", alt: "Ficha de la camiseta de Troko Bloco en la tienda de la app", width: 600, height: 1151, label: "tienda" },
      { src: "/imagenes/troko/troko-app-admin-resumen.jpg", alt: "Resumen de administración de TrokoApp con personas, uso del plan gratuito y contenido", width: 600, height: 1152, label: "admin" },
      { src: "/imagenes/troko/troko-app-admin-grupos.jpg", alt: "Gestión de grupos en TrokoApp con su horario y orden", width: 600, height: 1169, label: "grupos" },
    ],
  },
  {
    id: "faltapp",
    number: "04",
    title: "FaltApp",
    status: { label: "En uso", tone: "live" },
    color: "coral",
    summary: "Controla tus faltas en los módulos de FP y avisa antes de perder la evaluación continua.",
    tags: ["React", "PWA", "Claude API", "Expo"],
    visual: <div className="project-visual phone-fan"><span className="fan-phone"><Image src="/imagenes/faltapp/faltapp-inicio.jpg" alt="Inicio de FaltApp con el resumen de faltas y las clases de hoy" width={600} height={1196} sizes="(max-width: 760px) 27vw, 140px" /></span><span className="fan-screen fan-1"><Image src="/imagenes/faltapp/faltapp-modulos.jpg" alt="Asistencia al centro y faltas que quedan en cada módulo en FaltApp" width={600} height={1223} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-2"><Image src="/imagenes/faltapp/faltapp-escanear.jpg" alt="Escanear el horario en FaltApp a partir de una foto" width={600} height={1204} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-3"><Image src="/imagenes/faltapp/faltapp-ajustes.jpg" alt="Ajustes de FaltApp con el periodo lectivo, las prácticas en empresa y las reglas de faltas" width={600} height={1212} sizes="(max-width: 760px) 25vw, 130px" /></span></div>,
    problem: "En FP se pierde la evaluación continua al faltar al 15 % de las horas de un módulo, y llevar la cuenta a mano de cada módulo es fácil de olvidar.",
    built: [
      "PWA con React 19, TypeScript, Vite, Tailwind CSS y Motion, desplegada en Vercel.",
      "Escaneo del horario con una foto: una función de Vercel se la pasa a Claude, que devuelve las sesiones de cada módulo en JSON.",
      "Con el horario y las fechas del curso estima la duración de cada módulo y descuenta los periodos de prácticas en empresa.",
      "Aplica el Decreto 91/2024 de Aragón: el límite del 15 % por módulo y el aviso por días seguidos o acumulados sin venir.",
      "Inicio con las clases de hoy para apuntar una falta con un toque, o el día entero.",
      "Los datos se quedan en el móvil, sin cuentas; se pueden exportar e importar desde Ajustes.",
      "La API está protegida con un código de clase, un límite de lecturas por hora y un tamaño máximo de imagen.",
      "Versión nativa para iOS y Android con Expo y Expo Router, que importa las copias de la PWA.",
    ],
    shots: [
      { src: "/imagenes/faltapp/faltapp-inicio.jpg", alt: "Inicio de FaltApp con el resumen de faltas y las clases de hoy", width: 600, height: 1196, label: "inicio" },
      { src: "/imagenes/faltapp/faltapp-escanear.jpg", alt: "Escanear el horario en FaltApp a partir de una foto", width: 600, height: 1204, label: "escanear horario" },
      { src: "/imagenes/faltapp/faltapp-modulos.jpg", alt: "Asistencia al centro y faltas que quedan en cada módulo en FaltApp", width: 600, height: 1223, label: "módulos" },
      { src: "/imagenes/faltapp/faltapp-anadir.jpg", alt: "Menú Añadir de FaltApp: escanear horario o añadir módulo a mano", width: 600, height: 1212, label: "añadir" },
      { src: "/imagenes/faltapp/faltapp-nuevo-modulo.jpg", alt: "Formulario de nuevo módulo en FaltApp con nombre, color y duración", width: 600, height: 1208, label: "nuevo módulo" },
      { src: "/imagenes/faltapp/faltapp-ajustes.jpg", alt: "Ajustes de FaltApp con el periodo lectivo, las prácticas en empresa y las reglas de faltas", width: 600, height: 1212, label: "ajustes" },
    ],
    tryIt: {
      href: "https://ausencias-app-tau.vercel.app/",
      label: "Abrir FaltApp",
      note: "Es una PWA: funciona directamente en el navegador y, si quieres, la puedes instalar en tu móvil como una app más. Para escanear el horario hace falta el código de clase.",
      install: pwaInstall,
    },
  },
];
