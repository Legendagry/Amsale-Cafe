import React, { useState } from "react";
import axios from "axios";
import { siteConfig } from "../../lib/data";
import { MagneticButton, ScrollReveal } from "../Primitives";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+()\-\s\d]{7,}$/;

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", party_size: "", preferred_date: "", message: "", _honey: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please share your name.";
    if (!emailRe.test(form.email)) e.email = "A valid email helps us write back.";
    if (form.phone && !phoneRe.test(form.phone)) e.phone = "That phone number looks off.";
    if (form.preferred_date) {
      const d = new Date(form.preferred_date);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (d < today) e.preferred_date = "Please pick today or a future date.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (loading) return;
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        party_size: form.party_size || null,
        preferred_date: form.preferred_date || null,
        message: form.message.trim() || null,
        honeypot: form._honey,
      });
      setSuccess(true);
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please call us at " + siteConfig.phone + "." });
    } finally {
      setTimeout(() => setLoading(false), 4000);
    }
  };

  return (
    <section id="contact" className="contact section-pad" aria-label="Contact" data-testid="contact-section">
      <div className="section-container">
        <div className="contact-grid">
          <div>
            <ScrollReveal as="div" className="eyebrow">Contact</ScrollReveal>
            <ScrollReveal as="h2" delay={0.08} className="story-heading">Come Find Us</ScrollReveal>
            <ScrollReveal as="p" delay={0.16} className="story-p">
              We hold tables for small gatherings, study groups, and the occasional film crew. Tell us a little about your visit and we&apos;ll write back within a day.
            </ScrollReveal>
            <ScrollReveal as="p" delay={0.22} className="story-p">
              In a rush? Call us at{" "}
              <a href={`tel:${siteConfig.phoneTel}`} style={{ color: "var(--amber)", textDecoration: "underline", textUnderlineOffset: 3 }}>{siteConfig.phone}</a>{" "}
              — someone behind the bar will pick up.
            </ScrollReveal>
          </div>

          {success ? (
            <div className="contact-success" data-testid="contact-success">
              <svg className="success-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="m7 12 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="story-heading" style={{ fontSize: "var(--text-3xl)" }}>We&apos;ll See You Soon</h3>
              <p style={{ color: "rgba(28,20,16,0.7)", maxWidth: 460 }}>
                Your request has been received. We&apos;ll be in touch within 24 hours.
              </p>
              <p style={{ color: "var(--ink)", fontFamily: "Cormorant Garamond, serif", fontSize: "var(--text-lg)" }}>
                <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phone}</a> · <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate data-testid="contact-form">
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="honeypot"
                value={form._honey}
                onChange={update("_honey")}
                aria-hidden="true"
              />

              <Field id="name" label="Your Name" required value={form.name} onChange={update("name")} error={errors.name} testid="contact-name" />
              <Field id="email" type="email" label="Email Address" required value={form.email} onChange={update("email")} error={errors.email} testid="contact-email" />
              <Field id="phone" type="tel" label="Phone (optional)" value={form.phone} onChange={update("phone")} error={errors.phone} testid="contact-phone" />

              <div className="field">
                <select id="party_size" value={form.party_size} onChange={update("party_size")} data-testid="contact-party">
                  <option value="" disabled hidden></option>
                  {["1","2","3","4","5","6","7","8","9","10+"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <label htmlFor="party_size">Party Size</label>
              </div>

              <Field id="preferred_date" type="date" label="Preferred Date" value={form.preferred_date} onChange={update("preferred_date")} error={errors.preferred_date} testid="contact-date" />

              <div className="field">
                <textarea
                  id="message"
                  rows={4}
                  placeholder=" "
                  value={form.message}
                  onChange={update("message")}
                  data-testid="contact-message"
                />
                <label htmlFor="message">Message / Special Requests</label>
              </div>

              {errors.submit && <div className="field-error">{errors.submit}</div>}

              <MagneticButton
                type="submit"
                variant="primary"
                className="btn-primary"
                style={{ width: "100%" }}
                disabled={loading}
                data-testid="contact-submit"
              >
                {loading ? <span className="spinner" aria-hidden="true" /> : "Send Request"}
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const FIELD_AUTOCOMPLETE = {
  email: "email",
  phone: "tel",
  name: "name",
};

function Field({ id, label, type = "text", required, value, onChange, error, testid }) {
  const autoComplete = FIELD_AUTOCOMPLETE[id] || "off";
  return (
    <div className="field">
      <input
        id={id}
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={onChange}
        data-testid={testid}
        autoComplete={autoComplete}
      />
      <label htmlFor={id}>{label}{required ? " *" : ""}</label>
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}
