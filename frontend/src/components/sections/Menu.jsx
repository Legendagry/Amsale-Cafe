import React, { useState } from "react";
import { menuCategories, siteConfig } from "../../lib/data";
import { ScrollReveal } from "../Primitives";

const ICONS = {
  sambusa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 19 L12 4 L21 19 Z" />
      <path d="M7 14 L17 14" />
    </svg>
  ),
  bowl: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h18a9 9 0 0 1-18 0z" />
      <path d="M8 5c.5 1.5-.5 2 0 3M12 4c.5 1.5-.5 2 0 3M16 5c.5 1.5-.5 2 0 3" />
    </svg>
  ),
  utensils: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v8a2 2 0 0 0 4 0V3M8 13v8" />
      <path d="M16 3c-1.5 1-2 3-2 5s.5 4 2 5v8" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16z" />
      <path d="M4 20c5-5 9-9 16-16" />
    </svg>
  ),
  cup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
      <path d="M16 10h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2" />
      <path d="M7 4c.5 1-.5 2 0 3M11 4c.5 1-.5 2 0 3" />
    </svg>
  ),
};

const formatPrice = (n) => `$${n.toFixed(2)}`;

export default function Menu() {
  const [active, setActive] = useState(menuCategories[0].id);
  const current = menuCategories.find((c) => c.id === active);

  return (
    <section id="menu" className="menu section-pad" aria-label="Menu" data-testid="menu-section">
      <div className="section-container">
        <ScrollReveal as="div" className="eyebrow">The Menu</ScrollReveal>
        <ScrollReveal as="h2" delay={0.08} className="menu-heading">Crafted for Every Craving</ScrollReveal>
        <ScrollReveal as="p" delay={0.16} className="menu-sub">
          Five categories of authentic Ethiopian dishes from the heart of West Philadelphia.
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

        <div className="menu-grid" key={active}>
          {current.items.map((item, i) => (
            <ScrollReveal
              key={item.name}
              as="article"
              className="menu-card"
              direction="up"
              delay={Math.min(0.04 * i, 0.4)}
              data-testid={`menu-item-${active}-${i}`}
            >
              <div className="menu-card-icon">{ICONS[current.icon]}</div>
              <h3 className="menu-card-title">{item.name}</h3>
              {item.amharic && <div className="menu-card-amharic">{item.amharic}</div>}
              <div className="menu-card-price">{formatPrice(item.price)}</div>
              <p className="menu-card-blurb">{item.description}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="menu-note" style={{ marginTop: "2.5rem" }}>
            <span aria-hidden="true" style={{ marginRight: 6 }}>☎</span> Call{" "}
            <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phone}</a> to place a pickup order — or email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> for catering inquiries.
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
