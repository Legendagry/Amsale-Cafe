import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * DomeGallery — 3D draggable dome of images on a partial sphere.
 * Pure React + CSS 3D transforms (no @use-gesture dependency).
 * Drag horizontally to spin the dome, vertically to tilt.
 * Click an image to open the overlay viewer.
 */
export default function DomeGallery({ images = [], fit = 0.8 }) {
  const stageRef = useRef(null);
  const rotorRef = useRef(null);
  const [opened, setOpened] = useState(null);
  const state = useRef({
    rotY: 0, rotX: -8,
    velY: 0,
    dragging: false,
    lastX: 0, lastY: 0,
    raf: 0,
    pointerMoved: false,
  });

  // Compute layout positions on a partial sphere
  const positions = useMemo(() => {
    const n = images.length;
    if (!n) return [];
    const rows = 3;
    const perRow = Math.ceil(n / rows);
    const verticalDegRange = 36; // -18..18
    const radius = 460;
    const out = [];
    for (let i = 0; i < n; i++) {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const phi = -verticalDegRange / 2 + (row * verticalDegRange) / Math.max(rows - 1, 1);
      const theta = (col / perRow) * 360 + (row % 2 === 0 ? 0 : 180 / perRow);
      out.push({ phi, theta, radius });
    }
    return out;
  }, [images.length]);

  // Drag handlers
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onDown = (e) => {
      state.current.dragging = true;
      state.current.pointerMoved = false;
      state.current.lastX = (e.touches?.[0]?.clientX ?? e.clientX);
      state.current.lastY = (e.touches?.[0]?.clientY ?? e.clientY);
      stage.classList.add("dragging");
    };
    const onMove = (e) => {
      if (!state.current.dragging) return;
      const x = (e.touches?.[0]?.clientX ?? e.clientX);
      const y = (e.touches?.[0]?.clientY ?? e.clientY);
      const dx = x - state.current.lastX;
      const dy = y - state.current.lastY;
      if (Math.abs(dx) + Math.abs(dy) > 4) state.current.pointerMoved = true;
      state.current.rotY += dx * 0.35;
      state.current.rotX = Math.max(-20, Math.min(20, state.current.rotX + dy * 0.15));
      state.current.velY = dx * 0.35;
      state.current.lastX = x;
      state.current.lastY = y;
      applyTransform();
    };
    const onUp = () => {
      state.current.dragging = false;
      stage.classList.remove("dragging");
      // momentum decay
      const decay = () => {
        if (Math.abs(state.current.velY) < 0.05 || state.current.dragging) {
          state.current.velY = 0;
          return;
        }
        state.current.rotY += state.current.velY;
        state.current.velY *= 0.95;
        applyTransform();
        state.current.raf = requestAnimationFrame(decay);
      };
      cancelAnimationFrame(state.current.raf);
      state.current.raf = requestAnimationFrame(decay);
    };

    const applyTransform = () => {
      if (rotorRef.current) {
        rotorRef.current.style.transform = `rotateX(${state.current.rotX}deg) rotateY(${state.current.rotY}deg)`;
      }
    };

    // Idle auto-rotation
    let auto = 0;
    const tick = () => {
      if (!state.current.dragging && Math.abs(state.current.velY) < 0.05) {
        state.current.rotY += 0.05;
        applyTransform();
      }
      auto = requestAnimationFrame(tick);
    };
    auto = requestAnimationFrame(tick);

    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    stage.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    applyTransform();
    return () => {
      cancelAnimationFrame(auto);
      cancelAnimationFrame(state.current.raf);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      stage.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const handleImgClick = (img) => {
    if (state.current.pointerMoved) return; // ignore clicks after drag
    setOpened(img);
  };

  return (
    <>
      <div ref={stageRef} className="gallery-stage" data-testid="dome-gallery" aria-label="Photo gallery">
        <div className="dome-scene">
          <div ref={rotorRef} className="dome-rotor">
            {images.map((img, i) => {
              const p = positions[i];
              if (!p) return null;
              const transform = `translate(-50%, -50%) rotateY(${p.theta}deg) rotateX(${p.phi}deg) translateZ(${p.radius * fit}px)`;
              return (
                <div key={i} className="dome-cell" style={{ transform }}>
                  <img
                    src={img.src}
                    alt={img.alt || "Amsale Café gallery image"}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="dome-img"
                    onClick={() => handleImgClick(img)}
                    data-testid={`gallery-image-${i}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`dome-overlay ${opened ? "visible" : ""}`}
        onClick={() => setOpened(null)}
        role="dialog"
        aria-modal="true"
        aria-label="Expanded image"
      >
        {opened && <img src={opened.src} alt={opened.alt} />}
        <button
          className="lg-surface dome-overlay-close"
          onClick={(e) => { e.stopPropagation(); setOpened(null); }}
          aria-label="Close image"
          data-testid="gallery-close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </>
  );
}
