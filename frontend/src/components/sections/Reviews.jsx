import React, { useEffect, useRef } from "react";
import { reviewsData, siteConfig } from "../../lib/data";
import { MagneticButton, ScrollReveal } from "../Primitives";

export default function Reviews() {
  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const down = (e) => {
      isDown = true;
      startX = (e.touches?.[0]?.pageX ?? e.pageX) - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add("dragging");
    };
    const up = () => { isDown = false; el.classList.remove("dragging"); };
    const move = (e) => {
      if (!isDown) return;
      const x = (e.touches?.[0]?.pageX ?? e.pageX) - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    };
    el.addEventListener("mousedown", down);
    el.addEventListener("mouseleave", up);
    el.addEventListener("mouseup", up);
    el.addEventListener("mousemove", move);
    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mouseleave", up);
      el.removeEventListener("mouseup", up);
      el.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section className="reviews section-pad" aria-label="Reviews" data-testid="reviews-section">
      <div className="section-container">
        <ScrollReveal as="div" className="eyebrow">Reviews · from Google</ScrollReveal>
        <ScrollReveal as="h2" delay={0.08} className="story-heading">What Our Community Says</ScrollReveal>
        <div ref={stripRef} className="reviews-strip" data-testid="reviews-strip">
          {reviewsData.map((r) => (
            <article key={r.name} className="review-card" data-testid={`review-card-${r.name.replace(/\s+/g, "-").toLowerCase()}`}>
              <div className="review-stars" aria-label={`${r.stars} stars`}>{"★".repeat(r.stars)}</div>
              <p className="review-text">{r.text}</p>
              <div className="review-name">{r.name}</div>
              <div className="review-label">{r.label}</div>
            </article>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="review-cta" data-testid="leave-review-cta">
            <div>
              <h3>Visited recently? Tell us about it.</h3>
              <p>Five-star meals are made by neighbors like you. Your words help others find us.</p>
            </div>
            <MagneticButton
              as="a"
              href={siteConfig.reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              data-testid="leave-review-btn"
            >
              Leave a Google Review
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
