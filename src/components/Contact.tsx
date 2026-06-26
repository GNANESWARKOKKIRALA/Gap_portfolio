"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { playSound } from "@/utils/soundEffects";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Collaboration",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    playSound.playLoading();
    setStatus("submitting");
    
    // Simulate submission
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "Collaboration", message: "" });
    setStatus("idle");
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-grid-overlay border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "3s" }} />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16 space-y-3">
          <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold">
            Collaboration & Contact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Get In Touch
          </h2>
          <p className="font-sans text-sm text-slate-400 leading-relaxed">
            Have a project in mind, an internship opportunity, or want to discuss AI engineering? Drop a line below.
          </p>
        </div>

        {/* Elegant Glass Form and Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-10 border border-white/5 flex flex-col justify-between h-full"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-5"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Transmission Successful</h3>
                <p className="font-sans text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been received, and I will get back to you shortly.
                </p>
                <button
                  onClick={() => { playSound.playClick(); handleReset(); }}
                  onMouseEnter={() => playSound.playHover()}
                  className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-white tracking-wide uppercase transition-all duration-200 cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="font-display text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => playSound.playClick()}
                      onMouseEnter={() => playSound.playHover()}
                      disabled={status === "submitting"}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 font-sans"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="font-display text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => playSound.playClick()}
                      onMouseEnter={() => playSound.playHover()}
                      disabled={status === "submitting"}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 font-sans"
                      required
                    />
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="space-y-2">
                  <label className="font-display text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Subject / Project Nature
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => playSound.playClick()}
                    onMouseEnter={() => playSound.playHover()}
                    disabled={status === "submitting"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 transition-colors cursor-pointer font-sans"
                  >
                    <option value="Collaboration" className="bg-slate-950 text-white">Project Collaboration</option>
                    <option value="Recruitment" className="bg-slate-950 text-white">Internship / Job Opportunity</option>
                    <option value="Consultation" className="bg-slate-950 text-white">AI / RAG Integration Consult</option>
                    <option value="General" className="bg-slate-950 text-white">General Query</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="font-display text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => playSound.playClick()}
                    onMouseEnter={() => playSound.playHover()}
                    disabled={status === "submitting"}
                    rows={5}
                    placeholder="Describe your goals or queries..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-600 font-sans"
                    required
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="flex items-center gap-2.5 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl text-xs font-sans">
                    <AlertCircle className="h-4 w-4" />
                    <span>Please ensure all required fields are filled out correctly.</span>
                  </div>
                )}

                {/* Submit Action */}
                <div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    onMouseEnter={() => playSound.playHover()}
                    onClick={() => playSound.playLoading()}
                    className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-black font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.15)] disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </motion.div>

          {/* Contact Details Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-6 md:p-10 border border-white/5 flex flex-col justify-between bg-slate-950/20 h-full"
          >
            <div className="space-y-8">
              <h3 className="font-display font-bold text-lg text-white">Contact Registry</h3>
              
              <div className="space-y-6">
                
                {/* Email node */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider">Email Address</h4>
                    <a
                      href={`mailto:${portfolioData.email}`}
                      onMouseEnter={() => playSound.playHover()}
                      onClick={() => playSound.playClick()}
                      className="font-sans text-sm text-white hover:text-indigo-400 transition-colors font-medium mt-1 inline-block"
                    >
                      {portfolioData.email}
                    </a>
                  </div>
                </div>

                {/* Phone node */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider">Phone Link</h4>
                    <p className="font-sans text-sm text-white font-medium mt-1">
                      {portfolioData.phone}
                    </p>
                  </div>
                </div>

                {/* Location node */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider">Geography</h4>
                    <p className="font-sans text-sm text-white font-medium mt-1 leading-relaxed">
                      {portfolioData.location}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social channels */}
            <div className="pt-8 border-t border-white/5 mt-8 lg:mt-0">
              <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider mb-4">Node Networks</h4>
              <div className="flex items-center gap-4">
                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playSound.playHover()}
                  onClick={() => playSound.playClick()}
                  className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2.5 rounded-full"
                >
                  <Github className="h-4 w-4 text-slate-400" />
                  GitHub
                </a>
                <a
                  href={portfolioData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playSound.playHover()}
                  onClick={() => playSound.playClick()}
                  className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2.5 rounded-full"
                >
                  <Linkedin className="h-4 w-4 text-indigo-400" />
                  LinkedIn
                </a>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
