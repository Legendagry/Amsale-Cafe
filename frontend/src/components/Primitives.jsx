import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion, useIntersectionObserver } from "../lib/hooks";

/* -----------------------------------------------
   ScrollReveal
----------------------------------------------- */
const REVEAL_AXIS = {
  left: "translateX(40px)",
  right: "translateX(-40px)",
  down: "translateY(-30px)",
  up: "translateY(30px)",
};

export function ScrollReveal({ children, delay = 0, duration = 0.7, direction = "up", as: As = "div", className = "", ...rest }) {
  const [ref, visible] = useIntersectionObserver();
  const reduced = useReducedMotion();
  const axis = REVEAL_AXIS[direction] || REVEAL_AXIS.up;
  const style = reduced
    ? { transition: `opacity ${duration}s ease ${delay}s`, opacity: visible ? 1 : 0 }
    : {
        transition: `opacity ${duration}s var(--ease-out-fine) ${delay}s, transform ${duration}s var(--ease-out-fine) ${delay}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : axis,
      };
  return <As ref={ref} className={className} style={style} {...rest}>{children}</As>;
}

/* -----------------------------------------------
   MagneticButton
----------------------------------------------- */
const BTN_VARIANT_CLASS = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  "dark-ghost": "btn-dark-ghost",
};

export function MagneticButton({ as: As = "button", variant = "primary", className = "", children, onClick, ...rest }) {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const reduced = useReducedMotion();

  const handleMove = (e) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
    if (labelRef.current) labelRef.current.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    if (labelRef.current) labelRef.current.style.transform = "";
  };

  const variantClass = BTN_VARIANT_CLASS[variant] || "";

  return (
    <As
      ref={ref}
      className={`btn-magnetic ${variantClass} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      {...rest}
    >
      <span ref={labelRef} className="btn-label">{children}</span>
    </As>
  );
}

/* -----------------------------------------------
   TypewriterSubtitle
----------------------------------------------- */
export function TypewriterSubtitle({ phrases }) {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [mode, setMode] = useState("in"); // in | hold | out
  const [shift, setShift] = useState(0); // for slide

  useEffect(() => {
    if (reduced) {
      const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 4000);
      return () => clearInterval(id);
    }
    let timer;
    const current = phrases[idx];
    if (mode === "in") {
      setShift(0);
      if (typed.length < current.length) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 55);
      } else {
        timer = setTimeout(() => setMode("hold"), 2800);
      }
    } else if (mode === "hold") {
      timer = setTimeout(() => setMode("out"), 50);
    } else if (mode === "out") {
      // slide left + fade
      setShift(-30);
      timer = setTimeout(() => {
        setIdx((i) => (i + 1) % phrases.length);
        setTyped("");
        setShift(30);
        requestAnimationFrame(() => {
          setShift(0);
          setMode("in");
        });
      }, 350);
    }
    return () => clearTimeout(timer);
  }, [typed, mode, idx, phrases, reduced]);

  if (reduced) {
    return <div className="hero-sub" data-testid="hero-subtitle">{phrases[idx]}</div>;
  }

  const opacity = mode === "out" ? 0 : 1;
  return (
    <div
      className="hero-sub"
      style={{
        opacity,
        transform: `translateX(${shift}px)`,
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
      data-testid="hero-subtitle"
    >
      <span>{typed}</span>
      <span className="hero-sub-cursor" aria-hidden="true" />
    </div>
  );
}

/* -----------------------------------------------
   Skeleton bits
----------------------------------------------- */
export function SkeletonDome() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <div className="skel" style={{ width: 280, height: 280, borderRadius: "50%" }} />
    </div>
  );
}
