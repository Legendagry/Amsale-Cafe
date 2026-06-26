import React, { useEffect, useState } from "react";
import Strands from "../Strands";
import { MagneticButton, TypewriterSubtitle } from "../Primitives";
import { heroPhrases } from "../../lib/data";

export default function Hero() {
  const [faded, setFaded] = useState(false);
  useEffect(() => {
    const onScroll = () => setFaded(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="hero" aria-label="Amsale Café — Hero" data-testid="hero-section">
      <Strands />
      <div className={`hero-content hero-fade ${faded ? "faded" : ""}`}>
        <div className="hero-eyebrow" data-testid="hero-eyebrow">Est. 2022 · West Philadelphia</div>
        <h1 className="hero-title" data-testid="hero-title">Amsale Café</h1>
        <TypewriterSubtitle phrases={heroPhrases} />
        <div className="hero-ctas">
          <MagneticButton as="a" href="#menu" variant="primary" data-testid="hero-cta-menu">Explore Our Menu</MagneticButton>
          <MagneticButton as="a" href="#visit" variant="ghost" data-testid="hero-cta-visit">Find Us · 4817 Walnut St</MagneticButton>
        </div>
      </div>
      <div className={`hero-scroll hero-fade ${faded ? "faded" : ""}`} aria-hidden="true">
        <div className="hero-scroll-line" />
        <div className="hero-scroll-label">Scroll</div>
      </div>
    </section>
  );
}
