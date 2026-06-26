"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Github, ExternalLink, Activity, Network, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { playSound } from "@/utils/soundEffects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project && mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project, mounted]);

  if (!mounted || !project) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/90 backdrop-blur-xl flex items-start justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-6xl glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative my-4 md:my-auto"
      >
        
        {/* Glowing Header Banner */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />
        
        {/* Close Button */}
        <button
          onClick={() => { playSound.playClick(); onClose(); }}
          onMouseEnter={() => playSound.playHover()}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 outline-none cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content Wrapper */}
        <div className="p-6 md:p-12 space-y-12">
          
          {/* Hero Section of Launch */}
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest font-semibold">
              System Launch Page
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {project.title}
            </h2>
            <p className="font-display text-base md:text-lg text-slate-400 leading-relaxed">
              {project.tagline}
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playSound.playHover()}
                  onClick={() => playSound.playClick()}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-slate-200 shadow-[0_4px_15px_rgba(255,255,255,0.15)] flex items-center gap-2 group"
                >
                  Launch Live Demo
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playSound.playHover()}
                  onClick={() => playSound.playClick()}
                  className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View Source Code
                </a>
              )}
            </div>
          </div>

          {/* Overview & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/5">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-display font-bold text-lg text-white">System Architecture & Overview</h3>
              <p className="font-sans text-sm text-slate-400 leading-relaxed">
                {project.overview}
              </p>
            </div>
            
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-display font-semibold text-sm text-white tracking-wide">Deployment Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hard Engineering Metrics */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-400 animate-pulse" />
              Telemetry Benchmarks
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 text-left"
                >
                  <div className="font-mono text-2xl font-bold text-white tracking-tight text-glow-indigo">
                    {metric.value}
                  </div>
                  <div className="font-sans text-[10px] text-slate-500 uppercase tracking-wider mt-1.5 font-semibold">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Interactive Architecture Diagram */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Network className="h-5 w-5 text-cyan-400" />
              Information Flow Pipeline
            </h3>

            {/* Architecture Node Blocks */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-overlay opacity-50" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-6 py-4">
                {project.architecture.steps.map((step, idx) => (
                  <React.Fragment key={step.title}>
                    <div
                      onMouseEnter={() => playSound.playHover()}
                      onClick={() => playSound.playClick()}
                      className="flex flex-col items-center text-center max-w-[160px] w-full group cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                    >
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.05)] transition-all duration-300 group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        {idx + 1}
                      </div>
                      <h4 className="font-display font-semibold text-xs text-white mt-3 mb-1">
                        {step.title}
                      </h4>
                      <p className="font-sans text-[10px] text-slate-500 leading-normal">
                        {step.desc}
                      </p>
                    </div>

                    {idx < project.architecture.steps.length - 1 && (
                      <ChevronRight className="h-5 w-5 text-slate-600 hidden md:block animate-pulse shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="border-t border-white/5 mt-6 pt-4 text-center font-mono text-[10px] text-slate-500">
                PIPELINE SUMMARY: {project.architecture.summary}
              </div>
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Engineering Obstacles & Resolutions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-rose-400">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">THE CHALLENGE</span>
                    </div>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed font-medium">
                      {challenge.problem}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">THE SOLUTION</span>
                    </div>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact, Lessons & Future Scope */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
            
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-white tracking-wide">Measurable Impact</h4>
              <ul className="space-y-3">
                {project.impact.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-white tracking-wide">Core Lessons Learned</h4>
              <ul className="space-y-3">
                {project.lessonsLearned.map((les, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
                    <span>{les}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-white tracking-wide">Future Iterations</h4>
              <ul className="space-y-3">
                {project.futureScope.map((fut, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span>{fut}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </motion.div>
    </motion.div>,
    document.body
  );
}
