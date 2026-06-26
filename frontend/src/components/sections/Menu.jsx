import React, { useState } from "react";
import { menuCategories, siteConfig } from "../../lib/data";
import { ScrollReveal } from "../Primitives";

const ICONS = {
  cup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"/>
      <path d="M16 10h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/>
      <path d="M7 4c.5 1-.5 2 0 3M11 4c.5 1-.5 2 0 3"/>
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16z"/>
      <path d="M4 20c5-5 9-9 16-16"/>
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>
    </svg>
  ),
};

export default function Menu() {
  const [active, setActive] = useState(menuCategories[0].id);

  return (
    <section id="menu" className="menu section-pad" aria-label="Menu" data-testid="menu-section">
      <div className="section-container">
        <ScrollReveal as="div" className="eyebrow">The Menu</ScrollReveal>
        <ScrollReveal as="h2" delay={0.08} className="menu-heading">Crafted for Every Craving</ScrollReveal>
        <ScrollReveal as="p" delay={0.16} className="menu-sub">
          Our full menu is coming soon. Stop by or call us to hear today&apos;s offerings — the kitchen rotates with the season, and the coffee bar rotates with the harvest.
        </ScrollReveal>
        <ScrollReveal delay={0.22}>
          <div className="menu-note">
            <span aria-hidden="true">📞</span>{" "}Call us at{" "}
            <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phone}</a>{" "}or email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}— we&apos;ll tell you exactly what&apos;s on today.
          </div>
        </ScrollReveal>

        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {menuCategories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              className={`menu-tab ${active === c.id ? "active" : ""}`}
              onClick={() => setActive(c.id)}
              data-testid={`menu-tab-${c.id}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div
          className="menu-grid"
          style={{ transition: "opacity 0.2s ease" }}
          key={active}
        >
          {menuCategories.map((c) => (
            <ScrollReveal
              key={c.id}
              as="article"
              className="menu-card"
              direction="up"
              delay={0.05 * menuCategories.indexOf(c)}
              style={{ display: active === c.id ? "block" : "none" }}
              data-testid={`menu-card-${c.id}`}
            >
              <div className="menu-card-icon">{ICONS[c.icon]}</div>
              <h3 className="menu-card-title">{c.label}</h3>
              <p className="menu-card-blurb">{c.blurb}</p>
              <p className="menu-card-blurb" style={{ marginTop: "0.5rem", opacity: 0.7 }}>
                Full menu items coming soon — we&apos;re perfecting every detail.
              </p>
              <ul className="menu-card-list">
                {/* Menu items will be dynamically injected here */}
                <li style={{ opacity: 0.3 }}>Item Name — $0.00</li>
                <li style={{ opacity: 0.3 }}>Item Name — $0.00</li>
                <li style={{ opacity: 0.3 }}>Item Name — $0.00</li>
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
