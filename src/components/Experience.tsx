"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, ShieldCheck, CheckCircle2, Binary } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { playSound } from "@/utils/soundEffects";

export default function Experience() {
  const internData = portfolioData.experience[0];

  // Progression milestones of the 4-week internship
  const milestones = [
    { week: "Week 1", title: "Python & Data Science Core", desc: "Foundations of NumPy, Pandas, Scikit-learn, and predictive pipelines." },
    { week: "Week 2", title: "AI/ML Fundamentals", desc: "Regression, clustering model configurations, and validation methodologies." },
    { week: "Week 3", title: "Deep Learning Foundations", desc: "Neural networks, cognitive service integrations, and text vectors." },
    { week: "Week 4", title: "Capstone AI Deployment", desc: "Developing final conversational agents and LLM configurations." },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-grid-overlay border-y border-white/5">
      {/* Background soft glowing lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left space-y-3">
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold">
              Industry Experience
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Professional Training
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            A specialized look at your professional AI internship training under the AICTE and IBM partnership.
          </p>
        </div>

        {/* Cinematic Experience Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Internship Info Plaque */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => playSound.playHover()}
            onClick={() => playSound.playClick()}
            className="lg:col-span-6 glass-panel rounded-3xl p-6 md:p-10 border border-white/5 flex flex-col justify-between h-full hover:border-indigo-500/20 cursor-pointer transition-all duration-300"
          >
            <div className="space-y-6">
              
              {/* Badge & Dates */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
                  <Briefcase className="h-3.5 w-3.5" />
                  IBM SkillsBuild
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {internData.duration}
                </span>
              </div>

              {/* Title & Organization */}
              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  {internData.role}
                </h3>
                <p className="font-sans text-sm text-indigo-400 font-semibold">
                  {internData.company} (AICTE Accredited)
                </p>
              </div>

              {/* Bullet Highlights */}
              <ul className="space-y-3 pt-4 border-t border-white/5">
                {internData.highlights.map((highlight, idx) => (
                  <li key={idx} className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Credential Status Box */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px]">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                AICTE ID: AI-SKILLS-2025
              </span>
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                Handshake Verified
              </span>
            </div>

          </motion.div>

          {/* Right Column: 4-Week Progression Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onMouseEnter={() => playSound.playHover()}
            onClick={() => playSound.playClick()}
            className="lg:col-span-6 glass-panel rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col justify-between bg-slate-950/20 h-full hover:border-cyan-500/20 cursor-pointer transition-all duration-300"
          >
            <div className="space-y-6">
              
              {/* Graphic Title */}
              <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Binary className="h-5 w-5 text-cyan-400" />
                <h4 className="font-display font-semibold text-sm text-white tracking-wide">
                  Curriculum Progression Map
                </h4>
              </div>

              {/* Vertical Milestone Map */}
              <div className="relative pl-6 space-y-6">
                
                {/* Connector Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-cyan-400 via-indigo-400 to-transparent" />

                {milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={(e) => { e.stopPropagation(); playSound.playHover(); }}
                    onClick={(e) => { e.stopPropagation(); playSound.playClick(); }}
                    className="relative group cursor-pointer transition-all duration-300 hover:translate-x-1"
                  >
                    
                    {/* Node Dot */}
                    <div className="absolute -left-[24px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_8px_#06b6d4]" />
                    
                    {/* Milestone Card */}
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-bold">
                        {milestone.week}
                      </span>
                      <h5 className="font-display font-bold text-xs text-white">
                        {milestone.title}
                      </h5>
                      <p className="font-sans text-[11px] text-slate-500 leading-normal">
                        {milestone.desc}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Total Duration Widget */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-slate-500">
              <span>INTENSIVE DURATION: 160 HOURS</span>
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                COMPLETE
                <CheckCircle2 className="h-3 w-3" />
              </span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
