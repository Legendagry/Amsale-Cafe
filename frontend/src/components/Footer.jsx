import React from "react";
import { siteConfig } from "../lib/data";

export default function Footer({ openLegal }) {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">AC</div>
          <p className="footer-tagline">A modern Ethiopian café in West Philadelphia. Coffee with roots, a room with warmth.</p>
          <div className="footer-socials">
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="footer-instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" data-testid="footer-twitter">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.52 7.46L22 22h-6.828l-4.78-6.27L4.8 22H2l7-8.01L2 2h6.914l4.32 5.71L18.244 2zm-1.197 18h1.61L7.07 4H5.34l11.707 16z"/></svg>
            </a>
            <a href={siteConfig.socials.yelp} target="_blank" rel="noopener noreferrer" aria-label="Yelp" data-testid="footer-yelp">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2v9l6-3-2-4zM10 2 6 4l4 8V2zm0 12-4 1 4 6v-7zm3 0v7l4-5-4-2zM6 9l6 4-6 1V9z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-h">Quick Links</h4>
          <ul className="footer-list">
            <li><a href="#story">Our Story</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#visit">Visit</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <p className="footer-note">
            “Coffee was born in Ethiopia over 1,000 years ago. Every cup at Amsale is a thread back to that beginning.”
          </p>
        </div>

        <div>
          <h4 className="footer-h">Visit Us</h4>
          <ul className="footer-list">
            <li>{siteConfig.address.street}</li>
            <li>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</li>
            <li><a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phone}</a></li>
            <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li style={{ marginTop: "0.5rem" }}>Tues – Sun · Mondays closed</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Amsale Café · West Philadelphia</div>
        <div className="footer-bottom-links">
          <button onClick={() => openLegal("privacy")} data-testid="footer-privacy">Privacy Policy</button>
          <button onClick={() => openLegal("terms")} data-testid="footer-terms">Terms of Service</button>
          <button onClick={() => openLegal("accessibility")} data-testid="footer-accessibility">Accessibility</button>
        </div>
      </div>
    </footer>
  );
}
