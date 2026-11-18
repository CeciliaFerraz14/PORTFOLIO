"use client";

import { AnimatePresence, MotionConfig, motion, type Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ArrowUpRight from "./ArrowUpRight";
import { useLanguage } from "./i18n/LanguageProvider";
import IdeaPad from "./IdeaPad";
import { JukeboxLogo, JukeboxMark, JukeboxMarkSmall } from "./JukeboxLogo";
import ProjectsBoard from "./ProjectsBoard";
import TabletContact from "./TabletContact";

const pleatColors = ["coral", "yellow", "lilac", "mint"].flatMap((color) => Array(4).fill(color) as string[]);

// Carpeta "Sobre mí": la carpeta y la ventana comparten layoutId, así Motion calcula el viaje
// desde la posición real de la carpeta hasta el panel (y de vuelta al cerrar).
const aboutOpenTransition: Transition = { type: "spring", stiffness: 380, damping: 30, mass: 0.9 };
const aboutCloseTransition: Transition = { type: "tween", duration: 0.28, ease: [0.4, 0, 1, 1] };

// Pill tone maps to the .<tone>-pill classes in globals.css
type Tone = "blue" | "coral" | "green" | "yellow" | "pink" | "outline" | "small";
type Pill = [name: string, tone: Tone, large?: boolean];
// Tech pills are not translated; "tones" groups take their texts from the dictionary.
const skillGroups: ({ key: "frontend" | "backend" | "cloud"; skills: Pill[] } | { key: "ai" | "languages"; tones: Tone[] })[] = [
  { key: "frontend", skills: [["HTML · CSS", "blue", true], ["JavaScript", "coral"], ["TypeScript", "pink"], ["React", "green"], ["Next.js", "yellow"], ["React Native", "outline"], ["Flutter", "blue"], ["Tailwind CSS", "outline"]] },
  { key: "backend", skills: [["Java", "coral"], ["C#", "yellow"], ["ASP.NET MVC", "outline"], ["Node.js", "green"], ["Express.js", "outline"], ["SQL", "pink"], ["MySQL", "outline"], ["PostgreSQL", "blue"], ["MongoDB", "yellow"], ["Supabase", "outline"]] },
  { key: "cloud", skills: [["AWS · VPC · EC2", "blue"], ["Load Balancers · Auto Scaling", "outline"], ["Vercel", "coral"], ["Microsoft 365", "outline"], ["WhatsApp Business API", "green"], ["Git", "small"], ["VS Code", "yellow"], ["Eclipse", "outline"], ["Visual Studio", "outline"]] },
  { key: "ai", tones: ["pink", "yellow", "outline"] },
  { key: "languages", tones: ["green", "blue", "outline"] },
];

export default function Home() {
  const { locale, setLocale, t } = useLanguage();
  const profileText = t.about.profile;
  const [selectedFolder, setSelectedFolder] = useState("sobre-mi");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [folderLaunching, setFolderLaunching] = useState(false);
  const folderButtonRef = useRef<HTMLButtonElement>(null);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [projectsTransition, setProjectsTransition] = useState<"idle" | "covering" | "revealing">("idle");
  const [noteStuck, setNoteStuck] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderPhase, setLoaderPhase] = useState<"loading" | "leaving" | "done">("loading");
  const loaderTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("loader-seen") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = window.setTimeout(() => setLoaderPhase("done"), 0);
      return () => window.clearTimeout(skip);
    }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let loaded = document.readyState === "complete";
    const onLoad = () => { loaded = true; };
    window.addEventListener("load", onLoad);
    loaderTimer.current = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const ready = (loaded && elapsed > 1400) || elapsed > 2800;
      setLoaderProgress((current) => ready ? Math.min(100, current + 5) : Math.min(90, current + Math.max(0.6, (90 - current) * 0.06)));
    }, 40);
    return () => {
      window.clearInterval(loaderTimer.current);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (loaderPhase !== "loading" || loaderProgress < 100) return;
    window.clearInterval(loaderTimer.current);
    const leave = window.setTimeout(() => {
      setLoaderPhase("leaving");
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("loader-seen", "1");
      } catch {}
    }, 300);
    return () => window.clearTimeout(leave);
  }, [loaderProgress, loaderPhase]);

  useEffect(() => {
    if (loaderPhase !== "leaving") return;
    const done = window.setTimeout(() => setLoaderPhase("done"), 900);
    return () => window.clearTimeout(done);
  }, [loaderPhase]);

  const loaderPercent = Math.round(loaderProgress);
  const transitionRef = useRef(projectsTransition);

  useEffect(() => {
    transitionRef.current = projectsTransition;
  }, [projectsTransition]);

  useEffect(() => {
    const note = document.querySelector(".heading-note");
    if (!note) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && transitionRef.current === "idle") {
        setNoteStuck(true);
        observer.disconnect();
      }
    }, { threshold: 0.6 });
    observer.observe(note);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const showText = window.setTimeout(() => setTypedCharacters(profileText.length), 0);
      return () => window.clearTimeout(showText);
    }

    const timer = window.setInterval(() => {
      setTypedCharacters((current) => {
        if (current >= profileText.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 8);

    return () => window.clearInterval(timer);
  }, [profileText]);
  const academicRecords = t.about.academic;
  const workRecords = t.about.work;
  const folderDetails: Record<string, { label: string; detail: string; items: string[] }> = t.about.folders;
  const currentFolder = folderDetails[selectedFolder];
  // La carpeta se aplasta y se estira (efecto elástico) y, en el pico del estirón, sale la ventana.
  const openAbout = () => {
    if (aboutOpen || folderLaunching) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setAboutOpen(true);
    setFolderLaunching(true);
    window.setTimeout(() => setAboutOpen(true), 210);
    window.setTimeout(() => setFolderLaunching(false), 460);
  };
  const closeAbout = () => setAboutOpen(false);

  useEffect(() => {
    if (!aboutOpen) return;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLButtonElement>(".about-modal .minimize-button")?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
    };
  }, [aboutOpen]);

  useEffect(() => {
    if (!aboutOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAbout();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (projectsTransition !== "revealing") return;
    const stickNote = window.setTimeout(() => setNoteStuck(true), 600);
    const pleats = Array.from(document.querySelectorAll<HTMLElement>(".page-wipe .pleat"));
    const width = window.innerWidth / pleats.length;
    const half = pleats.length / 2;
    const steps = 16;
    const maxAngle = 88;
    const animations = pleats.map((pleat, index) => {
      const fromLeft = index < half;
      const position = fromLeft ? index : pleats.length - 1 - index;
      const direction = fromLeft ? 1 : -1;
      const folded = position % 2 === 1;
      pleat.style.transformOrigin = fromLeft ? "left center" : "right center";
      const frames = Array.from({ length: steps + 1 }, (_, step) => {
        const progress = step / steps;
        const angle = (maxAngle * progress * Math.PI) / 180;
        const shift = -direction * position * width * (1 - Math.cos(angle));
        const depth = folded ? -width * Math.sin(angle) : 0;
        const rotation = direction * (folded ? -1 : 1) * maxAngle * progress;
        return {
          transform: `translateX(${shift}px) translateZ(${depth}px) rotateY(${rotation}deg)`,
          filter: `brightness(${1 - (folded ? 0.35 : 0.08) * progress})`,
          opacity: progress > 0.85 ? (1 - progress) / 0.15 : 1,
        };
      });
      return pleat.animate(frames, { duration: 750, delay: 150, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" });
    });
    return () => {
      window.clearTimeout(stickNote);
      animations.forEach((animation) => animation.cancel());
    };
  }, [projectsTransition]);

  const goToProjects = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const projects = document.getElementById("proyectos");
    if (!projects || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (projectsTransition !== "idle") return;
    setProjectsTransition("covering");
    window.setTimeout(() => {
      projects.scrollIntoView({ behavior: "instant", block: "start" });
      setProjectsTransition("revealing");
    }, 1200);
    window.setTimeout(() => setProjectsTransition("idle"), 2650);
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className={loaderPhase === "loading" ? "is-loading" : undefined}>
      {loaderPhase !== "done" && <><div className={`site-loader is-${loaderPhase}`} suppressHydrationWarning role="progressbar" aria-label={t.loader.label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={loaderPercent}>
        <div className="loader-window">
          <div className="loader-titlebar"><span>jukebox.exe</span><span className="loader-controls" aria-hidden="true"><i className="ctl-min" /><i className="ctl-max" /><i>x</i></span></div>
          <div className="loader-body">
            <JukeboxMark size={150} className="loader-mark" title="Jukeboxdev" />
            <span className="jukebox-logo loader-logo"><span className="jukebox-logo-word">JUKEBOX</span><span className="jukebox-logo-badge">dev</span></span>
            <div className="loader-bar" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i} className={loaderProgress >= (i + 1) * 12.5 ? "is-on" : undefined} />)}</div>
            <div className="loader-meta">{t.loader.meta} {loaderPercent}%</div>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("loader-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.currentScript.previousElementSibling.style.display="none"}catch(e){}` }} /></>}
      <nav className="site-nav" aria-label={t.nav.label}>
        <a className="brand" href="#top" aria-label={t.nav.brand}><JukeboxLogo /></a>
        <div className="nav-links">
          <a href="#sobre-mi" onClick={(event) => { event.preventDefault(); openAbout(); }}>{t.nav.about}</a>
          <a href="#proyectos">{t.nav.projects}</a>
          <a href="#contacto">{t.nav.contact} <span aria-hidden="true"><ArrowUpRight /></span></a>
          <div className="lang-switch" role="group" aria-label={t.nav.language}>
            {(["es", "en"] as const).map((code) => <button key={code} type="button" lang={code} aria-label={code === "es" ? "Español" : "English"} aria-pressed={locale === code} onClick={() => setLocale(code)}>{code.toUpperCase()}</button>)}
          </div>
        </div>
      </nav>

      <section className="hero section-shell" id="top">
        <div className="hero-copy reveal-up">
          <p className="eyebrow"><span className="status-dot" /> {t.hero.eyebrow}</p>
          <h1><span className="hero-name"><span className="name-underline"><span>Cecilia </span><span>Ferraz </span><span>Fernández</span></span></span><span className="hero-tagline">{t.hero.taglineLead} <em>{t.hero.taglineEm}</em></span></h1>
          <p className="hero-intro">{t.hero.intro}</p>
          <div className="hero-actions">
            <a className="text-link" href="#contacto">{t.hero.idea} <span aria-hidden="true"><ArrowUpRight /></span></a>
          </div>
        </div>
        <div className="hero-folder-slot reveal-up"><div className={`folder-gate ${aboutOpen ? "is-away" : ""}`}><span className="gate-kicker">{t.hero.marker}</span>{/* Solo puede haber un elemento con layoutId montado: mientras la ventana está abierta, la carpeta deja un hueco del mismo tamaño */}{aboutOpen ? <div className="folder-morph folder-placeholder" aria-hidden="true" /> : <motion.div layoutId="about-window" className="folder-morph" transition={aboutCloseTransition}><button ref={folderButtonRef} className={`floating-folder ${folderLaunching ? "is-launching" : ""}`} onClick={openAbout} aria-haspopup="dialog" aria-expanded={aboutOpen} aria-label={t.hero.openFolderLabel}><span className="folder-tab" /><span className="folder-papers" aria-hidden="true"><i /><i /></span><span className="folder-label">{t.hero.folderName}</span><span className="folder-subtitle">{t.hero.folderHint}</span><span className="folder-arrow"><ArrowUpRight /></span></button></motion.div>}<p className="gate-hint">{t.hero.gateHint}</p></div>{aboutOpen && <div className="open-folder-state"><span className="gate-kicker">{t.hero.openMarker}</span><a className="open-folder" href="#sobre-mi" aria-label={t.hero.openFolderGoto}><span className="open-folder-back" /><span className="open-folder-paper" aria-hidden="true"><i /><i /><i /><i /></span><span className="open-folder-front"><span className="folder-label">{t.hero.folderName}</span><span className="folder-subtitle">{t.hero.openFolderHint}</span></span></a><p className="gate-hint">{t.hero.openGateHint}</p></div>}</div>
        <div className="hero-cta reveal-up"><span className="cta-hint">{t.hero.cta}</span><a className={`button button-primary projects-launch ${projectsTransition === "covering" ? "is-launching" : ""}`} href="#proyectos" onClick={goToProjects}>{t.hero.ctaButton} <span aria-hidden="true">↓</span></a></div>
      </section>


      <section className="about section-shell" id="sobre-mi">
      </section>

      <section className={`projects section-shell ${projectsTransition === "revealing" ? "is-arriving" : ""}`} id="proyectos">
        <div className="section-heading"><div className="section-marker">{t.projects.marker}</div><h2>{t.projects.titleLead} <em>{t.projects.titleEm}</em></h2><p className={`heading-note ${noteStuck ? "is-stuck" : ""}`}>{t.projects.note}</p></div>
        <ProjectsBoard />
      </section>

      <section className="concept section-shell"><IdeaPad><div className="concept-copy"><div className="section-marker">{t.ideas.marker}</div><h2>{t.ideas.titleLead}<br /><em>{t.ideas.titleEm}</em></h2><p>{t.ideas.text}</p><div className="concept-stamp">{t.ideas.stampTop}<br />{t.ideas.stampBottom}</div></div></IdeaPad></section>

      <section className="skills section-shell"><div className="section-marker">{t.skills.marker}</div><div className="skills-grid"><div><h2>{t.skills.titleLead}<br /><em>{t.skills.titleEm}</em></h2><p className="skills-intro">{t.skills.intro}</p></div><div className="skill-groups">{skillGroups.map((group) => <div className="skill-group" key={group.key}><span className="skill-group-label">{t.skills.labels[group.key]}</span><div className="skill-cloud">{("skills" in group ? group.skills : group.tones.map((tone, index): Pill => [t.skills[group.key][index], tone])).map(([name, tone, large]) => <span className={`skill-pill ${tone}-pill${large ? " large" : ""}`} key={name}>{name}</span>)}</div></div>)}</div></div></section>

      <section className="contact section-shell" id="contacto"><div className="contact-copy"><div className="section-marker">{t.contact.marker}</div><h2>{t.contact.titleLead}<br />{t.contact.titleTail}</h2><p>{t.contact.text}</p><div className="contact-links"><a href="mailto:ceciliaferrazfm@gmail.com"><span>✉</span> ceciliaferrazfm@gmail.com <b><ArrowUpRight /></b></a><a href="https://www.linkedin.com/in/cecilia-ferraz-fern%C3%A1ndez-31966b305/" target="_blank" rel="noreferrer"><span>in</span> LinkedIn <b><ArrowUpRight /></b></a></div></div><TabletContact /></section>

      <footer><span>{t.footer.text}</span><span className="footer-brand"><JukeboxMarkSmall size={14} /> jukeboxdev · © 2026 Ceci</span></footer>
      {projectsTransition !== "idle" && <div className={`page-wipe is-${projectsTransition}`} aria-hidden="true">{projectsTransition === "revealing" ? pleatColors.map((color, index) => <i className="pleat" key={index} style={{ background: `var(--${color})` }} />) : <><i /><i /><i /><i /></>}<span>{t.projects.wipe}</span></div>}
      <AnimatePresence onExitComplete={() => folderButtonRef.current?.focus({ preventScroll: true })}>{aboutOpen && <div key="about-modal" className="about-modal">
        <motion.div className="about-backdrop" onClick={closeAbout} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.25 } }} />
        <motion.div layoutId="about-window" className="file-explorer" role="dialog" aria-modal="true" aria-label={t.about.dialogLabel} transition={aboutOpenTransition} style={{ boxShadow: "10px 10px 0 #1d9089" }}>
        <motion.div className="explorer-inner" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.14, duration: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.08 } }}>
          <div className="explorer-topbar"><div className="window-dots"><i /><i /><i /></div><span>{t.about.topbar}</span><button className="minimize-button" onClick={closeAbout} aria-label={t.about.minimize}>−</button></div>
          <div className="explorer-path"><span>⌂</span><span>portfolio</span><b>/</b><strong>{currentFolder.label}</strong></div>
          <div className="explorer-body">
            <aside className="explorer-sidebar"><span className="explorer-label">{t.about.sidebarLabel}</span>{Object.keys(folderDetails).map((folder) => <button className={`folder ${folder === selectedFolder ? "active-folder" : ""}`} key={folder} onClick={() => setSelectedFolder(folder)} aria-pressed={folder === selectedFolder}>{folder === selectedFolder ? "▾" : "▸"}<span>{folderDetails[folder].label}</span></button>)}<span className="explorer-label explorer-label-bottom">{t.about.statusLabel}</span><div className="explorer-status"><i /> {t.about.status}</div></aside>
            <div className={`explorer-content folder-${selectedFolder}`}><div className="explorer-content-heading"><div><span className="section-marker">{t.about.marker}</span></div><div className="file-meta">{selectedFolder === "formacion" ? academicRecords.length : selectedFolder === "experiencia" ? workRecords.length : currentFolder.items.length} {t.about.itemsCount}<br />{t.about.openNow}</div></div><div className="about-origin"><span>{t.about.openedFolder}</span><strong>{currentFolder.label}</strong></div><div className="folder-preview"><div><span className="preview-icon">⌂</span><div><strong>{currentFolder.label}</strong><small>{currentFolder.detail}</small></div></div><div className="preview-items">{currentFolder.items.map((item) => <span key={item}>▹ {item}</span>)}</div></div>{selectedFolder === "formacion" && <div className="education-list">{academicRecords.map(([title, school, period]) => <article key={title}><span className="education-period">{period}</span><div><strong>{title}</strong><small>{school}</small></div></article>)}</div>}{selectedFolder === "experiencia" && <div className="education-list work-list">{workRecords.map(({ title, place, period, tasks }) => <article key={title}><span className="education-period">{period}</span><div><strong>{title}</strong><small>{place}</small><ul>{tasks.map((task) => { const cut = task.indexOf(": "); return <li key={task}>{cut > 0 ? <><b>{task.slice(0, cut)}</b>{task.slice(cut)}</> : task}</li>; })}</ul></div></article>)}</div>}<div className="roadmap" aria-label={t.about.roadmap.label}><div className="roadmap-track" /><div className="roadmap-stop stop-one"><span className="roadmap-pin">01</span><div className="roadmap-card"><small>{t.about.roadmap.start.year}</small><strong>{t.about.roadmap.start.title}</strong><span>{t.about.roadmap.start.note}</span></div></div><div className="roadmap-stop stop-two"><span className="roadmap-pin">02</span><div className="roadmap-card"><small>{t.about.roadmap.belsue.year}</small><strong>{t.about.roadmap.belsue.title}</strong><span>{t.about.roadmap.belsue.note}</span></div></div><div className="roadmap-stop stop-now"><span className="roadmap-pin">✦</span><div className="roadmap-card"><small>{t.about.roadmap.now.year}</small><strong>{t.about.roadmap.now.title}</strong><span className="now-label">{t.about.roadmap.now.note}</span></div></div><span className="roadmap-end">{t.about.roadmap.next}</span></div><div className="about-text"><p className="typewriter-text" aria-label={profileText}>{profileText.slice(0, typedCharacters)}<span className="typewriter-cursor" aria-hidden="true" /></p></div></div>
          </div>
        </motion.div>
        </motion.div>
      </div>}</AnimatePresence>
    </main>
    </MotionConfig>
  );
}
