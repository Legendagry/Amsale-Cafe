import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../../lib/hooks";
import { ScrollReveal } from "../Primitives";

export default function EthiotopiaOrb() {
  const orbRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const orb = orbRef.current;
    if (!orb) return;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e) => {
      const r = orb.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      orb.style.transform = `rotateY(${current.x * 12}deg) rotateX(${-current.y * 12}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="ethio-section" aria-label="Ethiotopia" data-testid="ethiotopia-section">
      <ScrollReveal className="ethio-eyebrow" duration={1}>Ethiotopia</ScrollReveal>
      <div ref={orbRef} className="orb" data-testid="ethiotopia-orb">
        <div className="orb-layer orb-l1" />
        <div className="orb-layer orb-l2" />
        <div className="orb-layer orb-l3" />
      </div>
      <ScrollReveal className="ethio-line" delay={0.15}>
        Named for a vision of unity — where Ethiopian culture, community, and coffee meet the world.
      </ScrollReveal>
    </section>
  );
}
