import React, { useState } from "react";
import "@/index.css";
import "@/App.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import EthiotopiaOrb from "@/components/sections/EthiotopiaOrb";
import OurStory from "@/components/sections/OurStory";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Visit from "@/components/sections/Visit";
import Contact from "@/components/sections/Contact";
import { CookieBanner, LegalModal } from "@/components/Overlays";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [legal, setLegal] = useState(null); // null | "privacy" | "terms" | "accessibility"

  return (
    <div className="App" data-testid="app-root">
      <a href="#main-content" className="skip-link" data-testid="skip-link">Skip to main content</a>

      <Navbar open={navOpen} setOpen={setNavOpen} />

      <main id="main-content">
        <Hero />
        <EthiotopiaOrb />
        <OurStory />
        <Menu />
        <Gallery />
        <Reviews />
        <Visit />
        <Contact />
      </main>

      <Footer openLegal={(kind) => setLegal(kind)} />

      <CookieBanner onOpenPrivacy={() => setLegal("privacy")} />
      <LegalModal open={!!legal} kind={legal} onClose={() => setLegal(null)} />
    </div>
  );
}
