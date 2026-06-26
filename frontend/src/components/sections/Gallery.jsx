import React, { Suspense, lazy } from "react";
import { ScrollReveal, SkeletonDome } from "../Primitives";
import { galleryImages } from "../../lib/data";

const DomeGallery = lazy(() => import("../DomeGallery"));

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section section-pad" aria-label="Gallery" data-testid="gallery-section">
      <div className="section-container">
        <ScrollReveal as="div" className="eyebrow">Gallery</ScrollReveal>
        <ScrollReveal as="h2" delay={0.08} className="menu-heading">A Glimpse Inside Amsale</ScrollReveal>
        <ScrollReveal as="p" delay={0.16} className="menu-sub">
          Drag to explore — click any image to expand.
        </ScrollReveal>

        <Suspense fallback={<div style={{ position: "relative", height: "60vh" }}><SkeletonDome /></div>}>
          <DomeGallery images={galleryImages} fit={0.8} />
        </Suspense>
      </div>
    </section>
  );
}
