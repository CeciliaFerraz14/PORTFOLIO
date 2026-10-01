"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Shot } from "./projects";

// Capturas del proyecto abierto: se ve una cada vez y se pasa con flechas, miniaturas, teclado o deslizando.
export default function ShotCarousel({ shots, title }: { shots: Shot[]; title: string }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const multiple = shots.length > 1;
  const go = (next: number) => setIndex((next + shots.length) % shots.length);

  useEffect(() => {
    if (!multiple) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + shots.length) % shots.length);
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [multiple, shots.length]);

  return (
    <div className="shot-carousel" role="group" aria-roledescription="carrusel" aria-label={`Capturas de ${title}`}>
      <div
        className="shot-carousel-viewport"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          touchStart.current = null;
          if (multiple && Math.abs(distance) > 40) go(index + (distance < 0 ? 1 : -1));
        }}
      >
        <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {shots.map((shot, shotIndex) => {
            const wide = shot.width > shot.height;
            return (
              <div key={shot.src} className="carousel-slide" aria-hidden={shotIndex !== index}>
                <figure className="project-shot">
                  <span className="cs-bar"><i /><i /><i /><em>{shot.label}</em></span>
                  <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={wide ? "(max-width: 760px) 90vw, 520px" : "(max-width: 760px) 60vw, 300px"} />
                </figure>
              </div>
            );
          })}
        </div>
        {multiple && <>
          <button type="button" className="carousel-arrow carousel-prev" onClick={() => go(index - 1)} aria-label="Captura anterior">‹</button>
          <button type="button" className="carousel-arrow carousel-next" onClick={() => go(index + 1)} aria-label="Captura siguiente">›</button>
        </>}
      </div>
      {multiple && (
        <div className="shot-carousel-footer">
          <span className="shot-carousel-count" aria-live="polite">{index + 1} / {shots.length}</span>
          <div className="carousel-thumbs">
            {shots.map((shot, shotIndex) => (
              <button key={shot.src} type="button" className={shotIndex === index ? "is-active" : ""} onClick={() => go(shotIndex)} aria-label={`Ver captura ${shotIndex + 1}: ${shot.label}`} aria-current={shotIndex === index}>
                <Image src={shot.src} alt="" width={shot.width} height={shot.height} sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
