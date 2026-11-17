"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import ArrowUpRight from "./ArrowUpRight";
import { useLanguage } from "./i18n/LanguageProvider";
import ShotCarousel from "./ShotCarousel";
import { projects } from "./projects";

const viewerOpenTransition: Transition = { type: "spring", stiffness: 360, damping: 32, mass: 0.9 };
const viewerCloseTransition: Transition = { type: "tween", duration: 0.2, ease: [0.4, 0, 1, 1] };

export default function ProjectsBoard() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);
  const lastOpened = useRef<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState<Record<string, number> | null>(null);
  const openProject = projects.find((project) => project.id === openId);

  const open = (id: string) => {
    lastOpened.current = id;
    setOpenId(id);
  };
  const close = () => setOpenId(null);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLButtonElement>(".project-modal .minimize-button")?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  // Las cards entran una a una: las que aparecen a la vez en pantalla se escalonan en orden.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".project-drag"));
    setEntered({});
    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target as HTMLElement).sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
      if (!entering.length) return;
      // Si se llega desde el botón del hero, esperan a que se abra la cortina
      const base = grid.closest(".is-arriving") ? 0.45 : 0;
      setEntered((current) => {
        const next = { ...current };
        entering.forEach((card, index) => {
          next[card.dataset.project!] = base + index * 0.16;
          observer.unobserve(card);
        });
        return next;
      });
    }, { threshold: 0.2 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={gridRef} className={`project-grid ${entered ? "is-armed" : ""}`}>
        {projects.map((project) => (
          <div
            key={project.id}
            data-project={project.id}
            className={`project-drag ${openId === project.id ? "is-open" : ""} ${entered?.[project.id] !== undefined ? "is-in" : ""}`}
            style={entered?.[project.id] !== undefined ? ({ "--enter-delay": `${entered[project.id]}s` } as CSSProperties) : undefined}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a, button")) return;
              open(project.id);
            }}
          >
            <article className={`project-card ${project.featured ? "featured" : ""} ${project.color}-card`}>
              <div className="project-top"><span className="project-number">{project.number}</span><span className="project-top-end"><span className={`project-status ${project.status.tone ?? ""}`}>● {project.status.label}</span><button className="project-open" onClick={() => open(project.id)} aria-haspopup="dialog" aria-label={t.projects.openProject(project.title)}>{t.projects.open} <ArrowUpRight /></button></span></div>
              {project.visual}
              <div className="project-content"><h3>{project.title}{project.subtitle && <> <small>{project.subtitle}</small></>}</h3><p>{project.summary}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </article>
          </div>
        ))}
      </div>

      <AnimatePresence onExitComplete={() => document.querySelector<HTMLButtonElement>(`[data-project="${lastOpened.current}"] .project-open`)?.focus({ preventScroll: true })}>
        {openProject && (
          <div key="project-modal" className="project-modal">
            <motion.div className="project-backdrop" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.25 } }} />
            <motion.div className="project-window" role="dialog" aria-modal="true" aria-label={openProject.title} initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0, transition: viewerOpenTransition }} exit={{ opacity: 0, scale: 0.96, y: 16, transition: viewerCloseTransition }} style={{ "--accent": `var(--${openProject.color === "green" ? "mint" : openProject.color})`, boxShadow: "10px 10px 0 var(--accent)" } as CSSProperties}>
              <motion.div className="project-window-inner" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.14, duration: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.08 } }}>
                <div className="explorer-topbar"><div className="window-dots"><i /><i /><i /></div><span>{t.projects.windowPath(openProject.id)}</span><button className="minimize-button" onClick={close} aria-label={t.projects.closeProject}>×</button></div>
                <div className="project-detail">
                  <div className="project-detail-copy">
                    <span className="project-detail-kicker">{openProject.number} · <span className={`project-status ${openProject.status.tone ?? ""}`}>● {openProject.status.label}</span></span>
                    <h2>{openProject.title}{openProject.subtitle && <> <small>{openProject.subtitle}</small></>}</h2>
                    <p className="project-detail-lead">{openProject.summary}</p>
                    <h3>{t.projects.challenge}</h3>
                    <p>{openProject.problem}</p>
                    <h3>{t.projects.built}</h3>
                    <ul>{openProject.built.map((item) => <li key={item}>{item}</li>)}</ul>
                    <div className="tags">{openProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    {openProject.link && <a className="project-detail-link" href={openProject.link.href} target="_blank" rel="noreferrer">{openProject.link.label} <ArrowUpRight /></a>}
                    {openProject.tryIt && (
                      <section className="try-app" aria-label={t.projects.tryProject(openProject.title)}>
                        <h3>{t.projects.tryHeading}</h3>
                        <p>{openProject.tryIt.note}</p>
                        <a className="project-detail-link" href={openProject.tryIt.href} target="_blank" rel="noreferrer">{openProject.tryIt.label} <ArrowUpRight /></a>
                        <div className="try-app-install">
                          <span>{t.projects.installHeading}</span>
                          {openProject.tryIt.install.map(({ platform, steps }) => (
                            <details key={platform}>
                              <summary>{platform}</summary>
                              <ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>
                            </details>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                  <div className="project-detail-gallery">
                    <ShotCarousel key={openProject.id} shots={openProject.shots} title={openProject.title} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
