# Amsale Café — PRD

## Problem Statement
Production-ready, editorial React site for Amsale Café — a modern Ethiopian café at 4817 Walnut Street, Philadelphia, PA. Warm editorial aesthetic (Noma × Apple × Ethiopian coffee lookbook). Must avoid AI-slop patterns (no purple gradients, no pure black/white, no blue/purple/pink/cyan).

## Architecture
- **Frontend**: React 19 + Tailwind (used only for `@tailwind` base reset) + custom CSS design system in /src/index.css + /src/App.css.
- **Backend**: FastAPI + MongoDB (motor). One POST endpoint `/api/contact` stores reservation/contact inquiries.
- **Fonts**: Equinox + GondensDemo (self-hosted WOFF2 stubs at `/public/fonts/`, declared inline in index.html). Google Font fallbacks: Italiana, Cormorant Garamond, DM Sans.

## What's Implemented (Feb 2026)
- Hero with custom CSS/SVG flowing strands, clip-reveal title, typewriter subtitle, magnetic CTAs, scroll indicator
- Ethiotopia orb section (three rotating + pulsing layers, mouse 3D tilt)
- Our Story (asymmetric editorial layout, 3D image tilt, scroll-revealed stats)
- Menu (placeholder coming-soon cards, 4 category tabs with active state, call-to-call note)
- Gallery (3D draggable dome with momentum + auto-rotation + click-to-expand overlay)
- Reviews (drag-scrollable horizontal strip, 5 hand-written reviews)
- Visit (info card + warm-toned Google Maps embed + directions CTA)
- Contact (floating-label form, honeypot, validation, MongoDB-backed `/api/contact`)
- Floating Liquid Glass nav (call button, hamburger drawer, inline desktop links)
- Cookie banner with localStorage persistence
- Three legal modals (Privacy, Terms, Accessibility)
- Footer with brand "Did You Know?" line
- SEO meta, OG tags, JSON-LD LocalBusiness schema, manifest.json, skip-link, ARIA landmarks

## Personas
- University City students/professors (Penn, Drexel, CHOP)
- West Philly neighbors
- Ethiopian-diaspora community
- Visitors seeking authentic Ethiopian coffee culture

## Backlog (P1)
- Real photography swap (placeholder URLs annotated in OurStory + Gallery)
- Self-hosted Equinox.woff2 + GondensDemo.woff2 (drop into /public/fonts/)
- Service Worker / PWA cache
- Admin dashboard to view contact inquiries
- Real menu items injection via `menuData.js` items array

## P2
- Reservation system with calendar availability
- Online ordering / pickup
