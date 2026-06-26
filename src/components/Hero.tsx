"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Terminal, Github, Linkedin, Mail, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { playSound } from "@/utils/soundEffects";

export default function Hero() {
  const scrollSection = (id: string) => {
    playSound.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-grid-overlay"
    >
      {/* Background soft glowing lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Asymmetric typography and content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Animated Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 text-xs text-slate-300 font-sans shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-display font-semibold tracking-wider uppercase text-[9px] text-indigo-400">
              Aspiring Python & Gen AI Developer
            </span>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-white">
              Python &
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Gen AI Engineer
              </span>
            </h1>
            <p className="font-display text-base sm:text-lg font-medium tracking-wide text-slate-400 mt-2">
              {portfolioData.fullName} {"//"} B.Tech CSE Graduate 2026
            </p>
          </motion.div>

          {/* Objective Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mt-6"
          >
            A Computer Science & Engineering graduate from Tirumala Engineering College. Specialized in Python software engineering, relational database schemas, and RAG-powered LLM applications. Developed production-ready document Q&A agents and personalized fitness recommendation models during academic labs and internship training.
          </motion.p>

          {/* Call to action & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <button
              onClick={() => scrollSection("projects")}
              onMouseEnter={() => playSound.playHover()}
              className="px-6 py-3 rounded-full bg-white text-black font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-slate-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center gap-2 group cursor-pointer"
            >
              Explore Projects
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>

            <a
              href="/Gnaneswar_Kokkirala_resume.pdf"
              download="Gnaneswar_Kokkirala_Resume.pdf"
              onClick={() => playSound.playClick()}
              onMouseEnter={() => playSound.playHover()}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 group cursor-pointer backdrop-blur-sm"
            >
              <Download className="h-4 w-4 text-indigo-400 group-hover:animate-bounce" />
              Download Resume
            </a>

            <button
              onClick={() => scrollSection("contact")}
              onMouseEnter={() => playSound.playHover()}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 group cursor-pointer backdrop-blur-sm"
            >
              <Terminal className="h-4 w-4 text-indigo-400 group-hover:animate-pulse" />
              Inference Console
            </button>

            <div className="flex items-center gap-3 ml-2 sm:ml-4 border-l border-white/10 pl-4 sm:pl-6 h-8">
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound.playClick()}
                onMouseEnter={() => playSound.playHover()}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                title="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound.playClick()}
                onMouseEnter={() => playSound.playHover()}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${portfolioData.email}`}
                onClick={() => playSound.playClick()}
                onMouseEnter={() => playSound.playHover()}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                title="Send Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Dynamic glowing brain/orb core and System Telemetry */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center mt-8 lg:mt-0">
          
          {/* Animated Profile Photo with AI Glow Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center mb-8 group"
          >
            {/* Soft glowing ambient rings */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            
            {/* Outer spinning dash line ring */}
            <div className="absolute -inset-4 border border-dashed border-indigo-500/20 rounded-full animate-[spin_32s_linear_infinite]" />
            
            {/* Primary glass photo card */}
            <div className="relative w-full h-full rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-indigo-500/30 group-hover:scale-[1.01]">
              <img
                src="/profile.png"
                alt={portfolioData.fullName}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Orbiting detail nodes */}
            <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1] animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse" style={{ animationDelay: "1s" }} />
          </motion.div>

          {/* Core Skills & Graduate Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-sm glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <span className="font-display text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Core Developer Stack</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="font-display text-[9px] text-indigo-400 font-semibold tracking-wider uppercase">2026 Graduate</span>
              </span>
            </div>

            <div className="space-y-4 font-sans text-xs">
              
              <div className="space-y-1.5">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Skills Overview</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-medium text-[11px]">Python Core</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-indigo-300 font-medium text-[11px]">Generative AI</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-300 font-medium text-[11px]">RAG Pipelines</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-medium text-[11px]">SQL Server</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-purple-300 font-medium text-[11px]">ChromaDB</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-medium text-[11px]">Flask & Streamlit</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 text-[11px]">Machine Learning</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 space-y-1 text-[11px] text-slate-400 leading-normal">
                <div className="flex justify-between">
                  <span>Current Status:</span>
                  <span className="text-indigo-400 font-semibold">Open to Opportunities</span>
                </div>
                <div className="flex justify-between">
                  <span>Graduation Year:</span>
                  <span className="text-slate-200">2026 (Graduated)</span>
                </div>
                <div className="flex justify-between">
                  <span>Location Node:</span>
                  <span className="text-slate-200">{portfolioData.location.split(",")[0]}, IN</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
