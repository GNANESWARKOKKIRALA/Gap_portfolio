"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { playSound } from "@/utils/soundEffects";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  bullets: string[];
}

export default function Education() {
  const educationItems: EducationItem[] = [
    {
      id: "btech",
      degree: portfolioData.education[0].degree,
      institution: portfolioData.education[0].institution,
      duration: portfolioData.education[0].duration,
      grade: `Grade: ${portfolioData.education[0].grade}`,
      bullets: [
        "Specializing in Computer Science and Engineering, covering AI/ML, databases, and algorithms.",
        "Hands-on project work developing Python-based web applications and Generative AI RAG systems.",
      ],
    },
    {
      id: "inter",
      degree: portfolioData.education[1].degree,
      institution: portfolioData.education[1].institution,
      duration: portfolioData.education[1].duration,
      grade: `Grade: ${portfolioData.education[1].grade}`,
      bullets: ["Focused on Mathematics, Physics, and Chemistry (MPC) foundation."],
    },
    {
      id: "ssc",
      degree: portfolioData.education[2].degree,
      institution: portfolioData.education[2].institution,
      duration: portfolioData.education[2].duration,
      grade: `Grade: ${portfolioData.education[2].grade}`,
      bullets: ["Secondary School Certification with outstanding performance in mathematics and sciences."],
    },
  ];

  return (
    <section id="education" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-grid-overlay border-b border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left space-y-3">
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold">
              Academic Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Education Details
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            A display of school milestones, academic foundations, and undergraduate studies in computer science.
          </p>
        </div>

        {/* Responsive Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => playSound.playHover()}
              onClick={() => playSound.playClick()}
              className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between h-full relative group hover:border-indigo-500/20 cursor-pointer transition-all duration-300"
            >
              <div>
                {/* Top header bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-white/5 pb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                    <GraduationCap className="h-3.5 w-3.5" />
                    academic
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                    <Calendar className="h-3 w-3" />
                    {item.duration}
                  </span>
                </div>

                {/* Main Titles */}
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-1.5 leading-snug group-hover:text-indigo-400 transition-colors duration-300">
                  {item.degree}
                </h3>
                <p className="font-sans text-xs text-slate-400 font-medium tracking-wide mb-4">
                  {item.institution}
                </p>

                {/* Grade highlight badge */}
                <div className="font-mono text-[10px] text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg w-fit mb-6">
                  {item.grade}
                </div>

                {/* Highlights List */}
                <ul className="space-y-3 pt-4 border-t border-white/5">
                  {item.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="font-sans text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative base metadata */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-600 font-mono uppercase tracking-wider">
                <span>SECURED NODE</span>
                <span>STATUS: VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
