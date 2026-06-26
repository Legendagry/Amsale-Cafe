import React, { useEffect, useRef } from "react";
import { reviewsData } from "../../lib/data";
import { ScrollReveal } from "../Primitives";

export default function Reviews() {
  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
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
        <ScrollReveal as="div" className="eyebrow">Reviews</ScrollReveal>
        <ScrollReveal as="h2" delay={0.08} className="story-heading">What Our Community Says</ScrollReveal>
        <div ref={stripRef} className="reviews-strip" data-testid="reviews-strip">
          {reviewsData.map((r, i) => (
            <article key={i} className="review-card" data-testid={`review-card-${i}`}>
              <div className="review-stars" aria-label={`${r.stars} stars`}>{"★".repeat(r.stars)}</div>
              <p className="review-text">{r.text}</p>
              <div className="review-name">{r.name}</div>
              <div className="review-label">{r.label}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
