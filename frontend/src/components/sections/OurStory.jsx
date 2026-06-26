import React, { useRef } from "react";
import { ScrollReveal } from "../Primitives";

export default function OurStory() {
  const imgRef = useRef(null);

  const onMove = (e) => {
    const el = imgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 0.1s linear";
    el.style.transform = `perspective(1200px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg) scale(1.02)`;
  };
  const onLeave = () => {
    const el = imgRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s var(--ease-out-fine)";
    el.style.transform = "";
  };

  return (
    <section id="story" className="story section-pad" aria-label="Our Story" data-testid="story-section">
      <div className="section-container">
        <div className="story-grid">
          <ScrollReveal direction="left" duration={0.9}>
            <div
              ref={imgRef}
              className="story-image-wrap"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              data-testid="story-image"
            >
              <img
                src="https://images.unsplash.com/photo-1630861413071-a424a4d6d155?crop=entropy&cs=srgb&fm=jpg&w=900&q=85"
                alt="Traditional black ceramic jebena pot used in Ethiopian coffee ceremony"
                loading="lazy"
                decoding="async"
                width="900"
                height="1125"
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal as="div" className="eyebrow">Our Story</ScrollReveal>
            <ScrollReveal as="h2" delay={0.08} className="story-heading font-heading">Born in Philly. Rooted in Ethiopia.</ScrollReveal>
            <ScrollReveal as="p" delay={0.16} className="story-p">
              Amsale Café was born from a simple belief: that Ethiopian coffee, culture, and community deserve a world-class home in the heart of West Philadelphia.
            </ScrollReveal>
            <ScrollReveal as="p" delay={0.24} className="story-p">
              Every cup we serve traces back to the highlands of Ethiopia — where coffee was first discovered in the Kaffa region over a thousand years ago, where ceremony is a way of life, and where hospitality is not a service but a tradition.
            </ScrollReveal>
            <ScrollReveal as="p" delay={0.32} className="story-p">
              We opened our doors in 2022 just steps from University City, welcoming students, professors, neighbors, and travelers into a space designed to feel like a second home.
            </ScrollReveal>
            <ScrollReveal as="hr" delay={0.4} className="story-rule" />
            <ScrollReveal delay={0.48}>
              <dl className="story-stats" data-testid="story-stats">
                <div>
                  <div className="story-stat-num">2022</div>
                  <div className="story-stat-label">Established</div>
                </div>
                <div>
                  <div className="story-stat-num">West<br />Philly</div>
                  <div className="story-stat-label">Neighborhood</div>
                </div>
                <div>
                  <div className="story-stat-num">Tues<br />— Sun</div>
                  <div className="story-stat-label">Open Days</div>
                </div>
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
