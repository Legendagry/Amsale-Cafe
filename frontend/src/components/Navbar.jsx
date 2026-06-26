import React, { useEffect } from "react";
import { siteConfig } from "../lib/data";

const links = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#visit" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ open, setOpen }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <>
      <nav className="navbar-float" aria-label="Primary Navigation" data-testid="navbar">
        <div className="nav-inline-links">
          {["Menu", "Visit", "Contact"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="lg-surface nav-inline-link"
              data-testid={`nav-inline-${label.toLowerCase()}`}
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href={`tel:${siteConfig.phoneTel}`}
          className="lg-surface nav-call"
          data-testid="nav-call-button"
          aria-label={`Call Amsale Café at ${siteConfig.phone}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="nav-call-text">{siteConfig.phone}</span>
        </a>
        <button
          type="button"
          className={`lg-surface nav-hamburger ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-controls="nav-drawer"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
          data-testid="nav-hamburger"
        >
          <span /><span /><span />
        </button>
      </nav>

      <aside
        id="nav-drawer"
        className={`nav-drawer ${open ? "open" : ""}`}
        aria-hidden={!open}
        data-testid="nav-drawer"
      >
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            className="nav-drawer-link"
            style={{ "--i": i }}
            onClick={() => setOpen(false)}
            data-testid={`nav-drawer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {l.label}
          </a>
        ))}
        <div className="nav-drawer-foot">
          <strong>OPEN TUES — SUN</strong>
          <div style={{ marginTop: "0.5rem" }}>
            {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
          </div>
          <div style={{ marginTop: "0.4rem" }}>
            <a href={`tel:${siteConfig.phoneTel}`} style={{ color: "var(--gold)" }}>{siteConfig.phone}</a>
          </div>
        </div>
      </aside>
    </>
  );
}
