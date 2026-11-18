import Image from "next/image";
import type { ReactNode } from "react";
import type { Locale, Localized } from "./i18n/locale";

// With a video, src is the cover image (poster) shown before pressing play and in the thumbnail.
export type Shot = { src: string; alt: Localized; width: number; height: number; label: Localized; video?: string };

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle?: Localized;
  status: { label: Localized; tone?: "live" | "pilot" };
  color: "coral" | "ink" | "blue" | "pink" | "green" | "yellow";
  featured?: boolean;
  summary: Localized;
  tags: string[];
  visual: (locale: Locale) => ReactNode;
  problem: Localized;
  built: Localized[];
  shots: Shot[];
  link?: { href: string; label: Localized };
  // For apps that can be tried from the browser (PWA)
  tryIt?: { href: string; label: Localized; note: Localized; install: { platform: Localized; steps: Localized[] }[] };
};

// Same install steps for every PWA in the portfolio
const pwaInstall: NonNullable<Project["tryIt"]>["install"] = [
  {
    platform: { es: "iPhone / iPad", en: "iPhone / iPad" },
    steps: [
      { es: "Abre el enlace en Safari.", en: "Open the link in Safari." },
      { es: "Toca el botón Compartir (el cuadrado con la flecha hacia arriba).", en: "Tap the Share button (the square with the arrow pointing up)." },
      { es: "Elige «Añadir a pantalla de inicio» y confirma con «Añadir».", en: "Choose \"Add to Home Screen\" and confirm with \"Add\"." },
    ],
  },
  {
    platform: { es: "Android", en: "Android" },
    steps: [
      { es: "Abre el enlace en Chrome.", en: "Open the link in Chrome." },
      { es: "Toca el menú ⋮ de arriba a la derecha.", en: "Tap the ⋮ menu at the top right." },
      { es: "Elige «Instalar app» (o «Añadir a pantalla de inicio») y confirma.", en: "Choose \"Install app\" (or \"Add to Home screen\") and confirm." },
    ],
  },
  {
    platform: { es: "Ordenador", en: "Computer" },
    steps: [
      { es: "Abre el enlace en Chrome o Edge.", en: "Open the link in Chrome or Edge." },
      { es: "Pulsa el icono de instalar a la derecha de la barra de direcciones.", en: "Click the install icon at the right of the address bar." },
      { es: "Confirma con «Instalar»: se abrirá en su propia ventana.", en: "Confirm with \"Install\": it will open in its own window." },
    ],
  },
];

const neurodateShots: Shot[] = [
  { src: "/imagenes/neurodate/neurodate-portada.png", alt: { es: "Portada de NeuroDate: Encuentra tu match mental", en: "NeuroDate cover: Find your mental match" }, width: 2000, height: 2000, label: { es: "neurodate", en: "neurodate" } },
  { src: "/imagenes/neurodate/neurodate-app-bienvenida.png", alt: { es: "Pantalla de bienvenida de NeuroDate: conexiones auténticas, sin filtros superficiales", en: "NeuroDate welcome screen: authentic connections, no superficial filters" }, width: 386, height: 847, label: { es: "bienvenida", en: "welcome" } },
  { src: "/imagenes/neurodate/neurodate-app-explorar.png", alt: { es: "Explorar en NeuroDate: tarjeta de perfil con avatar, intereses y valores", en: "Explore in NeuroDate: profile card with avatar, interests and values" }, width: 384, height: 838, label: { es: "explorar", en: "explore" } },
  { src: "/imagenes/neurodate/neurodate-app-perfil.png", alt: { es: "Tarjeta de perfil en NeuroDate con identidad, distancia aproximada, intereses y valores", en: "NeuroDate profile card with identity, approximate distance, interests and values" }, width: 382, height: 837, label: { es: "perfil", en: "profile" } },
  { src: "/imagenes/neurodate/neurodate-app-conexiones.png", alt: { es: "Conexiones de NeuroDate con las conversaciones y sus estrellas", en: "NeuroDate connections with the conversations and their stars" }, width: 383, height: 834, label: { es: "conexiones", en: "connections" } },
  { src: "/imagenes/neurodate/neurodate-app-chat-galeria.png", alt: { es: "Chat de NeuroDate avisando de que la galería completa se ha desbloqueado", en: "NeuroDate chat announcing that the full gallery has been unlocked" }, width: 384, height: 839, label: { es: "galería desbloqueada", en: "gallery unlocked" } },
  { src: "/imagenes/neurodate/neurodate-app-galeria.png", alt: { es: "Galería de NeuroDate con las fotos que se desbloquean por estrellas", en: "NeuroDate gallery with photos that unlock through stars" }, width: 385, height: 834, label: { es: "galería", en: "gallery" } },
  { src: "/imagenes/neurodate/neurodate-app-comunidades.png", alt: { es: "Comunidades de NeuroDate recomendadas por Claude según tus intereses", en: "NeuroDate communities recommended by Claude based on your interests" }, width: 383, height: 834, label: { es: "comunidades", en: "communities" } },
  { src: "/imagenes/neurodate/neurodate-app-ajustes.png", alt: { es: "Ajustes de NeuroDate con modo oscuro, tamaño de fuente y privacidad", en: "NeuroDate settings with dark mode, font size and privacy" }, width: 376, height: 845, label: { es: "ajustes", en: "settings" } },
];

const homiShots: Shot[] = [
  { src: "/imagenes/homi/homi-app-portada.jpg", video: "/imagenes/homi/homi-promo.mp4", alt: { es: "Vídeo promocional de HOMI", en: "HOMI promo video" }, width: 1080, height: 1920, label: { es: "vídeo promo", en: "promo video" } },
  { src: "/imagenes/homi/homi-app-inicio.jpg", alt: { es: "Inicio de HOMI con las tareas para hoy y el resumen del hogar", en: "HOMI home with today's tasks and the household summary" }, width: 600, height: 1212, label: { es: "inicio", en: "home" } },
  { src: "/imagenes/homi/homi-app-tareas.jpg", alt: { es: "Tareas de HOMI con el calendario del mes", en: "HOMI tasks with the month calendar" }, width: 600, height: 1176, label: { es: "tareas", en: "tasks" } },
  { src: "/imagenes/homi/homi-app-hogar-miembros.jpg", alt: { es: "Página de un hogar en HOMI con sus miembros y los módulos de tareas, lista de compra, chat, hucha y mascotas", en: "A household page in HOMI with its members and the tasks, shopping list, chat, piggy bank and pets modules" }, width: 600, height: 1212, label: { es: "hogar", en: "household" } },
  { src: "/imagenes/homi/homi-app-hogar-menu.jpg", alt: { es: "Opciones del hogar en HOMI: hogar principal, cambiar foto, editar nombre, gestionar miembros, invitar y eliminar", en: "Household options in HOMI: main household, change photo, edit name, manage members, invite and delete" }, width: 600, height: 1212, label: { es: "opciones del hogar", en: "household options" } },
  { src: "/imagenes/homi/homi-app-perfil-ajustes.jpg", alt: { es: "Ajustes de HOMI con el perfil y las notificaciones", en: "HOMI settings with the profile and notifications" }, width: 600, height: 1170, label: { es: "ajustes", en: "settings" } },
];

const trokoShots: Shot[] = [
  { src: "/imagenes/troko/troko-app-avisos.jpg", alt: { es: "Inicio de TrokoApp con la próxima clase y el tablón de avisos", en: "TrokoApp home with the next class and the notice board" }, width: 600, height: 1224, label: { es: "avisos", en: "notices" } },
  { src: "/imagenes/troko/troko-app-calendario.jpg", alt: { es: "Calendario de TrokoApp con las próximas clases y quedadas", en: "TrokoApp calendar with the upcoming classes and meetups" }, width: 600, height: 1161, label: { es: "calendario", en: "calendar" } },
  { src: "/imagenes/troko/troko-app-grupo-muro.jpg", alt: { es: "Muro del grupo Bloco en TrokoApp con una canción de Spotify y reacciones", en: "Bloco group wall in TrokoApp with a Spotify song and reactions" }, width: 600, height: 1161, label: { es: "muro del grupo", en: "group wall" } },
  { src: "/imagenes/troko/troko-app-tienda.jpg", alt: { es: "Ficha de la camiseta de Troko Bloco en la tienda de la app", en: "Troko Bloco T-shirt page in the app's shop" }, width: 600, height: 1151, label: { es: "tienda", en: "shop" } },
  { src: "/imagenes/troko/troko-app-admin-resumen.jpg", alt: { es: "Resumen de administración de TrokoApp con personas, uso del plan gratuito y contenido", en: "TrokoApp admin overview with people, free plan usage and content" }, width: 600, height: 1152, label: { es: "admin", en: "admin" } },
  { src: "/imagenes/troko/troko-app-admin-grupos.jpg", alt: { es: "Gestión de grupos en TrokoApp con su horario y orden", en: "Group management in TrokoApp with their schedule and order" }, width: 600, height: 1169, label: { es: "grupos", en: "groups" } },
];

const faltappShots: Shot[] = [
  { src: "/imagenes/faltapp/faltapp-inicio.jpg", alt: { es: "Inicio de FaltApp con el resumen de faltas y las clases de hoy", en: "FaltApp home with the absence summary and today's classes" }, width: 600, height: 1196, label: { es: "inicio", en: "home" } },
  { src: "/imagenes/faltapp/faltapp-escanear.jpg", alt: { es: "Escanear el horario en FaltApp a partir de una foto", en: "Scanning the timetable in FaltApp from a photo" }, width: 600, height: 1204, label: { es: "escanear horario", en: "scan timetable" } },
  { src: "/imagenes/faltapp/faltapp-modulos.jpg", alt: { es: "Asistencia al centro y faltas que quedan en cada módulo en FaltApp", en: "School attendance and remaining absences for each module in FaltApp" }, width: 600, height: 1223, label: { es: "módulos", en: "modules" } },
  { src: "/imagenes/faltapp/faltapp-anadir.jpg", alt: { es: "Menú Añadir de FaltApp: escanear horario o añadir módulo a mano", en: "FaltApp Add menu: scan timetable or add a module by hand" }, width: 600, height: 1212, label: { es: "añadir", en: "add" } },
  { src: "/imagenes/faltapp/faltapp-nuevo-modulo.jpg", alt: { es: "Formulario de nuevo módulo en FaltApp con nombre, color y duración", en: "New module form in FaltApp with name, colour and duration" }, width: 600, height: 1208, label: { es: "nuevo módulo", en: "new module" } },
  { src: "/imagenes/faltapp/faltapp-ajustes.jpg", alt: { es: "Ajustes de FaltApp con el periodo lectivo, las prácticas en empresa y las reglas de faltas", en: "FaltApp settings with the school term, work placements and absence rules" }, width: 600, height: 1212, label: { es: "ajustes", en: "settings" } },
];

const crmShots: Shot[] = [
  { src: "/imagenes/crm/crm-dashboard.jpg", alt: { es: "Dashboard del CRM con el objetivo de pipeline, el reparto por fase y la expansión territorial", en: "CRM dashboard with the pipeline goal, the breakdown by stage and the territorial expansion" }, width: 1400, height: 867, label: { es: "dashboard", en: "dashboard" } },
  { src: "/imagenes/crm/crm-pipeline.jpg", alt: { es: "Pipeline de oportunidades del CRM en tablero kanban por fases", en: "CRM opportunity pipeline as a kanban board by stage" }, width: 1400, height: 867, label: { es: "pipeline", en: "pipeline" } },
  { src: "/imagenes/crm/crm-empresas.jpg", alt: { es: "Listado de empresas del CRM con sus personas, oportunidades y empleados", en: "CRM company list with their people, opportunities and employees" }, width: 1400, height: 867, label: { es: "empresas", en: "companies" } },
  { src: "/imagenes/crm/crm-ventas.jpg", alt: { es: "Panel de ventas del CRM con lo vendido, borradores y tasa de aceptación", en: "CRM sales panel with what has been sold, drafts and acceptance rate" }, width: 1400, height: 867, label: { es: "ventas", en: "sales" } },
  { src: "/imagenes/crm/crm-presupuestos.jpg", alt: { es: "Listado de presupuestos del CRM con su estado y total", en: "CRM quote list with their status and total" }, width: 1400, height: 867, label: { es: "presupuestos", en: "quotes" } },
  { src: "/imagenes/crm/crm-facturacion.jpg", alt: { es: "Panel de facturación del CRM con ingresos, gastos, IVA y gastos por categoría", en: "CRM invoicing panel with income, expenses, VAT and expenses by category" }, width: 1400, height: 867, label: { es: "facturación", en: "invoicing" } },
  { src: "/imagenes/crm/crm-rrhh.jpg", alt: { es: "Módulo de RRHH del CRM con la plantilla, el fichaje y el check de inicio", en: "CRM HR module with the staff, clock-in and start-of-day check" }, width: 1400, height: 867, label: { es: "rrhh", en: "hr" } },
  { src: "/imagenes/crm/crm-webs.jpg", alt: { es: "Módulo de webs del CRM con las webs de clientes y su estado", en: "CRM websites module with the client websites and their status" }, width: 1400, height: 867, label: { es: "webs", en: "websites" } },
  { src: "/imagenes/crm/crm-web-publicada.jpg", alt: { es: "Web de ejemplo creada y publicada desde el módulo de webs del CRM", en: "Sample website created and published from the CRM websites module" }, width: 1400, height: 867, label: { es: "web publicada", en: "published website" } },
];

const homiCoverAlt: Localized = { es: "Pantalla de carga de HOMI con la casita y el logo", en: "HOMI loading screen with the little house and the logo" };

export const projects: Project[] = [
  {
    id: "neurodate",
    number: "01",
    title: "Neurodate",
    status: { label: { es: "En desarrollo", en: "In development" } },
    color: "pink",
    summary: { es: "App de citas y conexiones para personas neurodivergentes.", en: "Dating and connections app for neurodivergent people." },
    tags: ["React Native", "Expo", "Supabase", "UX inclusiva"],
    visual: (locale) => <div className="project-visual phone-visual neurodate-visual"><span className="neurodate-poster"><Image src={neurodateShots[0].src} alt={neurodateShots[0].alt[locale]} width={2000} height={2000} sizes="200px" /></span><span className="neurodate-screen"><Image src={neurodateShots[2].src} alt={neurodateShots[2].alt[locale]} width={384} height={838} sizes="130px" /></span></div>,
    problem: { es: "Las apps de citas no suelen estar pensadas para personas neurodivergentes.", en: "Dating apps are rarely designed with neurodivergent people in mind." },
    built: [
      { es: "App móvil con React Native y Expo, con Supabase para la autenticación, la base de datos y el tiempo real.", en: "Mobile app with React Native and Expo, using Supabase for authentication, the database and real time." },
      { es: "Avatares simbólicos en lugar de fotos: las fotos se desbloquean poco a poco según los días que lleváis hablando.", en: "Symbolic avatars instead of photos: photos unlock little by little depending on how many days you have been talking." },
      { es: "Perfiles inclusivos con identidad de género, orientación, intereses y valores.", en: "Inclusive profiles with gender identity, orientation, interests and values." },
      { es: "Chat en tiempo real con indicador de «escribiendo», notificaciones y opciones para reportar y bloquear.", en: "Real-time chat with a \"typing\" indicator, notifications and options to report and block." },
      { es: "Distancia aproximada sin exponer nunca la ubicación exacta, y opción de ocultarla.", en: "Approximate distance without ever exposing the exact location, and an option to hide it." },
      { es: "Comunidades por temas, con recomendaciones de Claude a partir de los intereses del perfil, sin leer los mensajes.", en: "Communities by topic, with recommendations from Claude based on the profile's interests, without reading the messages." },
      { es: "Accesibilidad: modo oscuro, tamaño de fuente ajustable y etiquetas de accesibilidad en todos los elementos.", en: "Accessibility: dark mode, adjustable font size and accessibility labels on every element." },
    ],
    shots: neurodateShots,
  },
  {
    id: "homi",
    number: "02",
    title: "HOMI",
    status: { label: { es: "En uso", en: "In use" }, tone: "live" },
    color: "green",
    summary: { es: "Organizar las tareas de casa en equipo, sin que todo dependa de una sola persona.", en: "Organising household chores as a team, so everything doesn't depend on one person." },
    tags: ["React Native", "PWA", "Vercel"],
    visual: (locale) => <div className="project-visual phone-fan"><span className="fan-phone"><Image src="/imagenes/homi/homi-app-portada.jpg" alt={homiCoverAlt[locale]} width={600} height={1231} sizes="(max-width: 760px) 27vw, 140px" /></span><span className="fan-screen fan-1"><Image src={homiShots[1].src} alt={homiShots[1].alt[locale]} width={600} height={1212} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-2"><Image src={homiShots[2].src} alt={homiShots[2].alt[locale]} width={600} height={1176} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-3"><Image src={homiShots[5].src} alt={homiShots[5].alt[locale]} width={600} height={1170} sizes="(max-width: 760px) 25vw, 130px" /></span></div>,
    problem: { es: "En muchas casas las tareas acaban recayendo siempre en la misma persona.", en: "In many homes the chores always end up falling on the same person." },
    built: [
      { es: "App móvil desarrollada con React Native.", en: "Mobile app built with React Native." },
      { es: "Inicio con las tareas del día y un resumen de cada hogar: tareas, lista de la compra y chat.", en: "Home screen with the day's tasks and a summary of each household: tasks, shopping list and chat." },
      { es: "Varios hogares por cuenta, con uno marcado como principal.", en: "Several households per account, with one marked as the main one." },
      { es: "Cada hogar tiene sus miembros con roles y sus módulos: tareas, lista de compra, chat, hucha y mascotas.", en: "Each household has its members with roles and its modules: tasks, shopping list, chat, piggy bank and pets." },
      { es: "Gestión del hogar: invitar a alguien, gestionar miembros, cambiar la foto y el nombre.", en: "Household management: invite someone, manage members, change the photo and the name." },
      { es: "Calendario de tareas con vista de hoy, semana y mes.", en: "Task calendar with today, week and month views." },
      { es: "Chat del hogar para coordinarse sin salir de la app.", en: "Household chat to coordinate without leaving the app." },
      { es: "Notificaciones configurables para el chat, las tareas, la compra y los gastos de la hucha.", en: "Configurable notifications for the chat, tasks, shopping and piggy bank expenses." },
      { es: "Adaptada como PWA y desplegada en Vercel: se puede usar desde el navegador o instalar como una app más.", en: "Adapted as a PWA and deployed on Vercel: you can use it from the browser or install it like any other app." },
    ],
    shots: homiShots,
    tryIt: {
      href: "https://tareas-hogar-snowy.vercel.app/welcome",
      label: { es: "Abrir HOMI", en: "Open HOMI" },
      note: { es: "Es una PWA: funciona directamente en el navegador y, si quieres, la puedes instalar en tu móvil como una app más.", en: "It's a PWA: it works right in the browser and, if you want, you can install it on your phone like any other app." },
      install: pwaInstall,
    },
  },
  {
    id: "troko",
    number: "03",
    title: "TrokoApp",
    subtitle: { es: "Troko Bloco", en: "Troko Bloco" },
    status: { label: { es: "En uso", en: "In use" }, tone: "live" },
    color: "blue",
    summary: { es: "Red social privada para la escuela de batucada Troko Bloco: avisos, calendario y el muro de cada grupo.", en: "Private social network for the Troko Bloco batucada school: notices, calendar and each group's wall." },
    tags: ["React", "Supabase", "PWA", "Vercel"],
    visual: (locale) => <div className="project-visual phone-fan"><span className="fan-phone"><Image src={trokoShots[0].src} alt={trokoShots[0].alt[locale]} width={600} height={1224} sizes="(max-width: 760px) 27vw, 140px" /></span><span className="fan-screen fan-1"><Image src={trokoShots[1].src} alt={trokoShots[1].alt[locale]} width={600} height={1161} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-2"><Image src={trokoShots[2].src} alt={trokoShots[2].alt[locale]} width={600} height={1161} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-3"><Image src={trokoShots[3].src} alt={trokoShots[3].alt[locale]} width={600} height={1151} sizes="(max-width: 760px) 25vw, 130px" /></span></div>,
    problem: { es: "Una escuela de batucada con varios grupos necesita un sitio propio para los avisos, las clases y la vida de cada grupo.", en: "A batucada school with several groups needs a place of its own for notices, classes and each group's life." },
    built: [
      { es: "App web instalable (PWA) con React, Vite, TypeScript y Tailwind CSS, desplegada en Vercel.", en: "Installable web app (PWA) with React, Vite, TypeScript and Tailwind CSS, deployed on Vercel." },
      { es: "Backend en Supabase: autenticación, Postgres con políticas RLS, Storage para fotos y Realtime.", en: "Backend on Supabase: authentication, Postgres with RLS policies, Storage for photos and Realtime." },
      { es: "Tablón de avisos generales o por grupo, con avisos importantes, fotos y control de leídos.", en: "Notice board for general or per-group notices, with important notices, photos and read tracking." },
      { es: "Calendario de clases y quedadas con repeticiones, asistencia («Voy») y la próxima cita en el inicio.", en: "Calendar of classes and meetups with repetitions, attendance (\"I'm going\") and the next event on the home screen." },
      { es: "Cada grupo tiene su muro, chat con fotos, galería y miembros; se puede compartir texto, fotos, vídeos y Spotify.", en: "Each group has its wall, chat with photos, gallery and members; you can share text, photos, videos and Spotify." },
      { es: "Notificaciones push para avisos, mensajes del chat y felicitaciones de cumpleaños automáticas.", en: "Push notifications for notices, chat messages and automatic birthday greetings." },
      { es: "Tienda de la escuela para pedir camisetas y otros productos.", en: "School shop to order T-shirts and other products." },
      { es: "Panel de administración: aprobar cuentas, gestionar personas y grupos, y vigilar el uso del plan gratuito.", en: "Admin panel: approve accounts, manage people and groups, and keep an eye on free plan usage." },
    ],
    shots: trokoShots,
  },
  {
    id: "faltapp",
    number: "04",
    title: "FaltApp",
    status: { label: { es: "En uso", en: "In use" }, tone: "live" },
    color: "coral",
    summary: { es: "Controla tus faltas en los módulos de FP y avisa antes de perder la evaluación continua.", en: "Keeps track of your absences in vocational training (FP) modules and warns you before you lose continuous assessment." },
    tags: ["React", "PWA", "Claude API", "Expo"],
    visual: (locale) => <div className="project-visual phone-fan"><span className="fan-phone"><Image src={faltappShots[0].src} alt={faltappShots[0].alt[locale]} width={600} height={1196} sizes="(max-width: 760px) 27vw, 140px" /></span><span className="fan-screen fan-1"><Image src={faltappShots[2].src} alt={faltappShots[2].alt[locale]} width={600} height={1223} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-2"><Image src={faltappShots[1].src} alt={faltappShots[1].alt[locale]} width={600} height={1204} sizes="(max-width: 760px) 25vw, 130px" /></span><span className="fan-screen fan-3"><Image src={faltappShots[5].src} alt={faltappShots[5].alt[locale]} width={600} height={1212} sizes="(max-width: 760px) 25vw, 130px" /></span></div>,
    problem: { es: "En FP se pierde la evaluación continua al faltar al 15 % de las horas de un módulo, y llevar la cuenta a mano de cada módulo es fácil de olvidar.", en: "In FP you lose continuous assessment by missing 15% of a module's hours, and keeping track of each module by hand is easy to forget." },
    built: [
      { es: "PWA con React 19, TypeScript, Vite, Tailwind CSS y Motion, desplegada en Vercel.", en: "PWA with React 19, TypeScript, Vite, Tailwind CSS and Motion, deployed on Vercel." },
      { es: "Escaneo del horario con una foto: una función de Vercel se la pasa a Claude, que devuelve las sesiones de cada módulo en JSON.", en: "Timetable scanning from a photo: a Vercel function passes it to Claude, which returns each module's sessions as JSON." },
      { es: "Con el horario y las fechas del curso estima la duración de cada módulo y descuenta los periodos de prácticas en empresa.", en: "With the timetable and the course dates it estimates each module's length and subtracts the work placement periods." },
      { es: "Aplica el Decreto 91/2024 de Aragón: el límite del 15 % por módulo y el aviso por días seguidos o acumulados sin venir.", en: "Applies Aragon's Decree 91/2024: the 15% limit per module and the warning for consecutive or accumulated days absent." },
      { es: "Inicio con las clases de hoy para apuntar una falta con un toque, o el día entero.", en: "Home screen with today's classes to log an absence with one tap, or the whole day." },
      { es: "Los datos se quedan en el móvil, sin cuentas; se pueden exportar e importar desde Ajustes.", en: "Data stays on the phone, no accounts; it can be exported and imported from Settings." },
      { es: "La API está protegida con un código de clase, un límite de lecturas por hora y un tamaño máximo de imagen.", en: "The API is protected with a class code, an hourly limit on scans and a maximum image size." },
      { es: "Versión nativa para iOS y Android con Expo y Expo Router, que importa las copias de la PWA.", en: "Native version for iOS and Android with Expo and Expo Router, which imports the PWA's backups." },
    ],
    shots: faltappShots,
    tryIt: {
      href: "https://ausencias-app-tau.vercel.app/",
      label: { es: "Abrir FaltApp", en: "Open FaltApp" },
      note: { es: "Es una PWA: funciona directamente en el navegador y, si quieres, la puedes instalar en tu móvil como una app más. Para escanear el horario hace falta el código de clase.", en: "It's a PWA: it works right in the browser and, if you want, you can install it on your phone like any other app. Scanning the timetable needs the class code." },
      install: pwaInstall,
    },
  },
  {
    id: "crm",
    number: "05",
    title: "Atenea CRM",
    subtitle: { es: "proyecto en equipo", en: "team project" },
    status: { label: { es: "En desarrollo", en: "In development" } },
    color: "ink",
    summary: { es: "CRM y ERP para una empresa de servicios: clientes, ventas, facturación, RRHH y webs, con un asistente de IA.", en: "CRM and ERP for a services company: clients, sales, invoicing, HR and websites, with an AI assistant." },
    tags: ["Next.js", "TypeScript", "Supabase", "Claude API"],
    visual: (locale) => <div className="project-visual crm-visual"><span className="cs-window cs-window-back"><span className="cs-bar"><i /><i /><i /><em>dashboard</em></span><Image src={crmShots[0].src} alt={crmShots[0].alt[locale]} width={1400} height={867} sizes="(max-width: 760px) 66vw, 320px" /></span><span className="cs-window cs-window-front"><span className="cs-bar"><i /><i /><i /><em>pipeline</em></span><Image src={crmShots[1].src} alt={crmShots[1].alt[locale]} width={1400} height={867} sizes="(max-width: 760px) 66vw, 320px" /></span><span className="cs-sticker">+ Atenea IA</span></div>,
    problem: { es: "Una empresa pequeña suele repartir clientes, presupuestos, facturas y personal entre hojas de cálculo y herramientas sueltas que no se hablan entre sí.", en: "A small company often spreads clients, quotes, invoices and staff across spreadsheets and loose tools that don't talk to each other." },
    built: [
      { es: "Aplicación web con Next.js (App Router), TypeScript y Supabase: autenticación, Postgres con políticas RLS y Storage.", en: "Web application with Next.js (App Router), TypeScript and Supabase: authentication, Postgres with RLS policies and Storage." },
      { es: "Proyecto de DAM en un equipo de tres personas, en el que he hecho la mayor parte del desarrollo.", en: "DAM project in a team of three, where I did most of the development." },
      { es: "Oportunidades: dashboard con objetivo, reparto por fase y expansión territorial, pipeline en kanban o tabla, empresas, contactos, detección de duplicados y exportación a CSV.", en: "Opportunities: dashboard with goal, breakdown by stage and territorial expansion, pipeline as kanban or table, companies, contacts, duplicate detection and CSV export." },
      { es: "Ventas y facturación: catálogo de servicios, presupuestos, facturas en PDF, gastos y el IVA del trimestre.", en: "Sales and invoicing: service catalogue, quotes, PDF invoices, expenses and the quarter's VAT." },
      { es: "RRHH: fichaje de entrada y salida, vacaciones, check de inicio, evaluaciones, procesos de admisión y nóminas en PDF con firma.", en: "HR: clock-in and clock-out, holidays, start-of-day check, evaluations, hiring processes and signed PDF payslips." },
      { es: "Webs: editor visual para crear y publicar webs de clientes desde el propio CRM.", en: "Websites: visual editor to create and publish client websites from the CRM itself." },
      { es: "IA con Claude: lectura de facturas desde PDF o foto, propuesta de líneas de presupuesto, resúmenes y sugerencia de la próxima acción.", en: "AI with Claude: reading invoices from a PDF or photo, suggesting quote lines, summaries and next-action suggestions." },
      { es: "Atenea, el asistente del CRM: guarda los chats y su memoria, y propone cambios que la persona confirma antes de aplicarlos.", en: "Atenea, the CRM's assistant: it saves the chats and its memory, and proposes changes that the person confirms before they are applied." },
    ],
    shots: crmShots,
  },
];
