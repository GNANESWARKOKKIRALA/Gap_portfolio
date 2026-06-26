"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Calendar } from "lucide-react";
import { playSound } from "@/utils/soundEffects";

export default function Certificates() {
  const certifications = [
    {
      title: "Cisco Certified Python Programmer",
      issuer: "Cisco Networking Academy",
      date: "2024",
      verificationId: "CS-PY-2024-99824",
      status: "Verified Credential",
      skills: ["Python Core", "Object-Oriented Programming", "Data Structures", "System Scripting"],
      description: "Validates comprehensive knowledge of Python programming foundations, scripting capabilities, data structures, and OOP design patterns.",
    },
    {
      title: "Python for Data Science",
      issuer: "Cognitive Class (An IBM Initiative)",
      date: "2024",
      verificationId: "IBM-CC-PYDS-2024",
      status: "Verified Credential",
      skills: ["Data Manipulation", "NumPy & Pandas", "Data Analysis", "Python Scripting"],
      description: "Validates proficiency in Python programming applied to data science, including importing and cleaning datasets, building analytical pipelines, and performing matrix operations using NumPy and Pandas.",
    },
  ];

  return (
    <section id="certificates" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-grid-overlay border-b border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2.5s" }} />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left space-y-3">
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold">
              Credentials & Certifications
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Verified Certifications
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            A registry of verified professional credentials, specializing in programming foundations, cognitive services, and AI architectures.
          </p>
        </div>

        {/* Plaques Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => playSound.playHover()}
              onClick={() => playSound.playClick()}
              className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col justify-between relative group hover:border-indigo-500/20 cursor-pointer transition-all duration-300 shadow-xl h-full"
            >
              {/* Outer Plaque Border Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Badge Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white tracking-wide leading-snug">
                        {cert.title}
                      </h3>
                      <p className="font-sans text-xs text-indigo-400 font-medium mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider select-none shrink-0">
                    <ShieldCheck className="h-3 w-3" />
                    {cert.status}
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Validated Skills */}
                <div className="space-y-2.5">
                  <h4 className="font-display text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Validated Core Competencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        onMouseEnter={(e) => { e.stopPropagation(); playSound.playHover(); }}
                        onClick={(e) => { e.stopPropagation(); playSound.playClick(); }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-sans text-[10px] font-medium cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-200 select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom footer metadata */}
              <div className="border-t border-white/5 pt-5 mt-8 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>ISSUED: {cert.date}</span>
                </div>
                
                <span className="text-slate-600 hover:text-slate-400 transition-colors">
                  ID: {cert.verificationId}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
