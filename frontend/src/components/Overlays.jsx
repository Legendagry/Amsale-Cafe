import React, { useEffect, useState } from "react";

/* ---------- Cookie banner ---------- */
export function CookieBanner({ onOpenPrivacy }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("amsale_cookie_consent");
      if (!v) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const act = (val) => {
    try { localStorage.setItem("amsale_cookie_consent", val); } catch { /* ignore */ }
    setDismissed(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div className={`cookie-banner ${dismissed ? "dismissed" : ""}`} role="region" aria-label="Cookie consent" data-testid="cookie-banner">
      <div className="cookie-text">
        We use cookies to improve your experience. See our{" "}
        <button type="button" onClick={onOpenPrivacy} data-testid="cookie-privacy-link">Privacy Policy</button>.
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn ghost" onClick={() => act("declined")} data-testid="cookie-decline">Decline</button>
        <button className="cookie-btn primary" onClick={() => act("accepted")} data-testid="cookie-accept">Accept</button>
      </div>
    </div>
  );
}

/* ---------- Legal modals ---------- */
export function LegalModal({ open, kind, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const content = LEGAL_CONTENT[kind];

  return (
    <div
      className={`legal-modal ${open ? "visible" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={content?.title || "Legal"}
      data-testid={`legal-modal-${kind || "none"}`}
    >
      <div className="legal-modal-inner">
        <button
          className="lg-surface legal-close"
          onClick={onClose}
          aria-label="Close"
          data-testid="legal-close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        {content && (
          <>
            <h2 className="legal-h1">{content.title}</h2>
            <p className="legal-date">Effective {content.date}</p>
            {content.sections.map((s, i) => (
              <React.Fragment key={i}>
                <h3 className="legal-h2">{s.h}</h3>
                {s.p.map((para, j) => <p key={j} className="legal-p">{para}</p>)}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    date: "January 1, 2024",
    sections: [
      { h: "Introduction", p: ["Amsale Café (\"we,\" \"our,\" \"us\") respects your privacy. This policy describes what we collect when you visit our website and how we use it."] },
      { h: "Information We Collect", p: ["When you submit our contact form, we collect your name, email address, phone number (optional), party size, preferred date, and message. We do not use third-party advertising trackers or analytics cookies without consent."] },
      { h: "How We Use Information", p: ["We use your information only to respond to your inquiry and to plan around reservation requests. We do not sell, rent, or trade your data."] },
      { h: "Data Retention", p: ["Inquiry data is retained for 30 days and then deleted unless a reservation is confirmed."] },
      { h: "Third-Party Services", p: ["We embed a Google Maps location frame on our Visit page. Google's privacy policy applies to that embed. We do not share form data with Google or any other third party."] },
      { h: "Children's Privacy", p: ["Our site is not directed at children under 13 and we do not knowingly collect their data."] },
      { h: "Your Rights", p: ["You may request that we delete your inquiry data at any time by emailing amsalecafe2022@gmail.com."] },
      { h: "Contact", p: ["Questions? Email amsalecafe2022@gmail.com or call (215) 397-4420."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    date: "January 1, 2024",
    sections: [
      { h: "Acceptance", p: ["By using this website, you agree to these Terms of Service."] },
      { h: "Use of Site", p: ["You agree to use this site lawfully and not to attempt to disrupt or compromise its systems."] },
      { h: "Intellectual Property", p: ["All content on this site — text, photography, design, code — is © Amsale Café unless otherwise noted."] },
      { h: "Reservation Terms", p: ["Reservation requests submitted via the contact form are non-binding until confirmed by Amsale Café via email or phone."] },
      { h: "Limitation of Liability", p: ["This site is provided \"as is.\" To the maximum extent permitted by law, Amsale Café is not liable for indirect or incidental damages arising from your use of the site."] },
      { h: "Third-Party Links", p: ["External links are provided for convenience. We are not responsible for the content of third-party sites."] },
      { h: "Governing Law", p: ["These Terms are governed by the laws of the Commonwealth of Pennsylvania, with venue in Philadelphia County."] },
      { h: "Changes", p: ["We may update these Terms from time to time. The effective date above will reflect the most recent revision."] },
      { h: "Contact", p: ["amsalecafe2022@gmail.com · (215) 397-4420 · 4817 Walnut Street, Philadelphia, PA 19139"] },
    ],
  },
  accessibility: {
    title: "Accessibility Statement",
    date: "January 1, 2024",
    sections: [
      { h: "Our Commitment", p: ["Amsale Café is committed to providing a website that meets WCAG 2.1 Level AA standards. We believe everyone deserves a seat at the table, online and off."] },
      { h: "Keyboard Navigation", p: ["The site is navigable by keyboard. A skip-to-content link is provided at the top of every page."] },
      { h: "Screen Readers", p: ["Semantic HTML, ARIA landmarks, and descriptive alt text are used throughout to support assistive technologies."] },
      { h: "Reduced Motion", p: ["We honor the prefers-reduced-motion media query and disable non-essential animations when requested."] },
      { h: "Color Contrast", p: ["Text contrast on warm ivory and deep espresso surfaces meets or exceeds WCAG 2.1 AA contrast minimums."] },
      { h: "Reporting Issues", p: ["If you encounter an accessibility barrier, please email amsalecafe2022@gmail.com or call (215) 397-4420. We will respond within 5 business days."] },
    ],
  },
};
