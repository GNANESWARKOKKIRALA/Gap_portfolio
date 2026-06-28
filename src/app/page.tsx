"use client";

import React, { useState, useEffect } from "react";
import CanvasBackground from "@/components/CanvasBackground";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "projects", "experience", "skills", "education", "certificates", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Trigger active state when section is centered
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative text-slate-200">
      {/* Stripe-style Flowing Mesh Backdrop */}
      <div className="mesh-gradient-container">
        <div className="mesh-bubble mesh-bubble-1" />
        <div className="mesh-bubble mesh-bubble-2" />
        <div className="mesh-bubble mesh-bubble-3" />
      </div>

      {/* Interactive canvas background */}
      <CanvasBackground />

      {/* Floating pill navigation */}
      <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main content sections */}
      <main className="flex flex-col">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Certificates />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-[10px] font-mono text-slate-600 border-t border-white/5 bg-slate-950/20 backdrop-blur-sm z-10 relative">
        <p>&copy; {new Date().getFullYear()} Kokkirala Gnaneswar. Built with Next.js & Framer Motion.</p>
        <p className="mt-1 text-slate-700">All rights reserved. System operations fully functional.</p>
      </footer>
    </div>
  );
}
