"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ArrowUpRight, Cpu, Heart } from "lucide-react";
import { portfolioData, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import { playSound } from "@/utils/soundEffects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [likes, setLikes] = useState<{ [id: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [id: string]: number }>({
    "ai-rag-chatbot": 42,
    "fitai": 37,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("project_likes");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLikes(parsed);
          setLikeCounts({
            "ai-rag-chatbot": parsed["ai-rag-chatbot"] ? 43 : 42,
            "fitai": parsed["fitai"] ? 38 : 37,
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const toggleProjectLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = !likes[id];
    const newLikes = { ...likes, [id]: isLiked };
    setLikes(newLikes);
    localStorage.setItem("project_likes", JSON.stringify(newLikes));

    setLikeCounts((prev) => ({
      ...prev,
      [id]: prev[id] + (isLiked ? 1 : -1),
    }));

    if (isLiked) {
      playSound.playLike();
    } else {
      playSound.playClick();
    }
  };


  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-grid-overlay">
      {/* Background glowing lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="text-left space-y-3">
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold">
              Technical Projects
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Key Applications
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            A showcase of production-ready AI applications, detailing RAG pipelines, data ingestion flow, and vector retrieval.
          </p>
        </div>

        {/* Projects Listing */}
        <div className="space-y-24">
          {portfolioData.projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const imgPath = project.id === "ai-rag-chatbot" ? "/projects/ai_rag_chatbot.png" : "/projects/fitai.png";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                
                {/* Project Info Column */}
                <div className={`lg:col-span-6 space-y-6 ${!isEven ? "lg:order-2" : ""}`}>
                  <div className="space-y-3">
                    {/* Category / Icon */}
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] tracking-wider uppercase font-semibold">
                      <FolderGit2 className="h-4 w-4" />
                      <span>{project.id === "ai-rag-chatbot" ? "RAG Chatbot Agent" : "Fitness recommendation Engine"}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="font-display text-sm font-semibold text-slate-300 leading-snug">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech stack pill indicators */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-[9px]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[9px]">
                        +{project.techStack.length - 5} More
                      </span>
                    )}
                  </div>

                  {/* Brief description */}
                  <p className="font-sans text-sm text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2.5 pt-4 border-t border-white/5">
                    {(project.id === "ai-rag-chatbot" ? [
                      "Sub-second LLaMA 3.3 inference via Groq API integration",
                      "Local semantic sentence embeddings indexed in ChromaDB",
                      "Multi-user sessions secured with SQLite and bcrypt hashing"
                    ] : [
                      "Hyper-personalized workouts and meal plans via LLaMA 3.3",
                      "Calorie and weight log analytics rendered dynamically with Plotly",
                      "Robust lightweight Flask backend with relational SQLite persistence"
                    ]).map((highlight, hIdx) => (
                      <li key={hIdx} className="font-sans text-[12px] text-slate-400 leading-normal flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Launch button and Like button row */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => { playSound.playLoading(); setSelectedProject(project); }}
                      onMouseEnter={() => playSound.playHover()}
                      className="px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                    >
                      <Cpu className="h-4 w-4 text-indigo-400 group-hover:animate-spin" style={{ animationDuration: "3s" }} />
                      Launch System Page
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>

                    <button
                      onClick={(e) => toggleProjectLike(project.id, e)}
                      onMouseEnter={() => playSound.playHover()}
                      className={`px-4 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 group cursor-pointer backdrop-blur-sm ${
                        likes[project.id]
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
                          : "bg-white/5 border-white/10 hover:border-rose-500/20 text-slate-400 hover:text-white"
                      }`}
                      title={likes[project.id] ? "Unlike Project" : "Like Project"}
                    >
                      <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${likes[project.id] ? "fill-rose-500 text-rose-500 scale-110" : "group-hover:scale-110"}`} />
                      <span className="font-mono text-[11px] font-semibold">{likeCounts[project.id]}</span>
                    </button>
                  </div>

                </div>

                {/* Project Image Column */}
                <div
                  className={`lg:col-span-6 relative group cursor-pointer ${
                    !isEven ? "lg:order-1" : ""
                  }`}
                  onClick={() => { playSound.playLoading(); setSelectedProject(project); }}
                  onMouseEnter={() => playSound.playHover()}
                >
                  {/* Glowing halo behind image on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glass frame */}
                  <div className="relative glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:border-indigo-500/30">
                    <div className="absolute inset-0 bg-slate-950/20 z-10 transition-colors duration-300 group-hover:bg-transparent" />
                    
                    {/* Mockup image */}
                    <img
                      src={imgPath}
                      alt={`${project.title} Mockup`}
                      className="w-full h-auto object-cover aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Modal Case Studies Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
