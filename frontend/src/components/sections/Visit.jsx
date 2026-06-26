import React from "react";
import { siteConfig } from "../../lib/data";
import { MagneticButton, ScrollReveal } from "../Primitives";

export default function Visit() {
  return (
    <section id="visit" className="visit section-pad" aria-label="Visit" data-testid="visit-section">
      <div className="section-container">
        <ScrollReveal as="div" className="eyebrow">Visit</ScrollReveal>
        <ScrollReveal as="h2" delay={0.08} className="story-heading">Come See Us on Walnut Street</ScrollReveal>

        <div className="visit-grid">
          <ScrollReveal direction="left">
            <div className="visit-info" data-testid="visit-info">
              <h3>Amsale Café</h3>
              <p style={{ color: "rgba(250,246,239,0.6)", marginTop: 0 }}>
                {siteConfig.address.street}<br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>

              <dl style={{ margin: "1.5rem 0 0" }}>
                {siteConfig.hours.map((h) => (
                  <div key={h.day} className={`visit-row ${h.closed ? "closed" : ""}`}>
                    <dt>{h.day}</dt>
                    <dd>{h.value}{h.closed ? " (Closed)" : ""}</dd>
                  </div>
                ))}
              </dl>

              <div style={{ marginTop: "1.5rem", display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)" }}>
                <div>
                  <span style={{ color: "rgba(250,246,239,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "var(--text-xs)" }}>Phone · </span>
                  <a href={`tel:${siteConfig.phoneTel}`} style={{ color: "var(--gold)" }} data-testid="visit-phone">{siteConfig.phone}</a>
                </div>
                <div>
                  <span style={{ color: "rgba(250,246,239,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "var(--text-xs)" }}>Email · </span>
                  <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--gold)" }} data-testid="visit-email">{siteConfig.email}</a>
                </div>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <MagneticButton
                  as="a"
                  href={siteConfig.mapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  data-testid="visit-directions-btn"
                >
                  Get Directions
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="visit-map">
              <iframe
                title="Amsale Café Location Map"
                src={siteConfig.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="visit-map-iframe"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
