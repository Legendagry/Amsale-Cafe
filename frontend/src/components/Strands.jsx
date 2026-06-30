import React from "react";

/**
 * Strands — lightweight CSS/SVG-based flowing strands.
 * Renders 4 sinuous bezier paths with subtle warm-gold gradients,
 * animated via CSS keyframes (no WebGL, no ogl).
 */
export default function Strands() {
  // Curves drawn across a 1600x900 viewBox; each strand has slightly
  // different control points to feel hand-drawn rather than parametric.
  const strands = [
    { d: "M -100 520 C 300 380, 600 700, 900 460 S 1500 360, 1800 520", color: "url(#g-amber)", width: 1.6, cls: "" },
    { d: "M -100 600 C 280 480, 640 760, 940 540 S 1480 460, 1800 600", color: "url(#g-gold)", width: 1.2, cls: "s2" },
    { d: "M -100 430 C 260 330, 720 620, 1020 380 S 1500 280, 1800 460", color: "url(#g-brass)", width: 1.0, cls: "s3" },
    { d: "M -100 700 C 320 580, 700 820, 1000 660 S 1500 580, 1800 700", color: "url(#g-ivory)", width: 0.7, cls: "s4" },
  ];

  return (
    <div className="strands-wrap" aria-hidden="true" data-testid="hero-strands">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="g-amber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C8922A" stopOpacity="0" />
            <stop offset="35%" stopColor="#C8922A" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#D4A843" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C8922A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A843" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-brass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B8965A" stopOpacity="0" />
            <stop offset="50%" stopColor="#B8965A" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-ivory" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FAF6EF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FAF6EF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FAF6EF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {strands.map((s) => (
          <path
            key={`thick-${s.cls || "s1"}`}
            d={s.d}
            className={`strand-path ${s.cls}`}
            stroke={s.color}
            strokeWidth={s.width * 14}
            style={{ mixBlendMode: "screen" }}
          />
        ))}
        {strands.map((s) => (
          <path
            key={`thin-${s.cls || "s1"}`}
            d={s.d}
            className={`strand-path ${s.cls}`}
            stroke={s.color}
            strokeWidth={s.width * 2.5}
            style={{ mixBlendMode: "screen", opacity: 0.95 }}
          />
        ))}
      </svg>
      <div className="strands-vignette" />
    </div>
  );
}
