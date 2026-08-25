/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ShieldCheck, Globe, Activity, Beaker, Dna, CheckCircle2 } from "lucide-react";

interface TrustSectionProps {
  onNavigate?: (pageId: string) => void;
  theme: "dark" | "light";
}

export default function TrustSection({ theme }: TrustSectionProps) {
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxYLeft = useTransform(scrollYProgress, [0, 1], ["0px", "-25px"]);
  const parallaxYRight = useTransform(scrollYProgress, [0, 1], ["20px", "-45px"]);

  // Interactive Cursor Specular Tracking
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-[105vh] w-full py-24 sm:py-32 flex flex-col justify-between overflow-hidden transition-colors duration-700 select-none ${
        isDark 
          ? "bg-neutral-950 text-white" 
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* =========================================================
          BACKGROUND: Animated Particle Mesh, Holographic Glows & Grid
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Specular Interactive Cursor Spotlight */}
        <div 
          className="absolute inset-0 opacity-50 transition-opacity duration-500"
          style={{
            background: `radial-gradient(1000px circle at ${mousePos.x}% ${mousePos.y}%, ${
              isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(13, 148, 136, 0.08)"
            }, transparent 70%)`
          }}
        />

        {/* Volumetric Teal/Cyan Ambient Glows */}
        <div className="absolute top-1/4 -left-32 w-[650px] h-[650px] bg-emerald-500/[0.08] blur-[170px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-[700px] h-[700px] bg-teal-500/[0.08] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-cyan-500/[0.05] blur-[140px] rounded-full pointer-events-none" />

        {/* Technical Coordinate Blueprint Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#fff' : '#000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Blueprint Line Pattern */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-500/10 fill-none pointer-events-none" width="100%" height="100%">
          <pattern id="trust-blueprint-grid" width="140" height="140" patternUnits="userSpaceOnUse">
            <path d="M 140 0 L 0 0 0 140" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="1.5" className="fill-emerald-400/40" />
            <circle cx="140" cy="0" r="1.5" className="fill-emerald-400/40" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#trust-blueprint-grid)" />
        </svg>

        {/* Rotating Orbital Vectors */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-[8%] w-[550px] h-[550px] border border-emerald-500/10 rounded-full border-dashed pointer-events-none"
        />
      </div>

      {/* =========================================================
          MAIN TOP COMPOSITION: 12-COLUMN EDITORIAL SPLIT (40% / 60%)
          ========================================================= */}
      <div className="site-container relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* =========================================================
              LEFT COLUMN (40% Width): Editorial Copy & Chips
              ========================================================= */}
          <motion.div 
            style={{ y: parallaxYLeft }}
            className="lg:col-span-5 space-y-8"
          >
            {/* SECTION LABEL */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3"
            >
              <span className="font-mono text-xs font-extrabold uppercase tracking-[0.3em] text-emerald-400">
                TRUST
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-emerald-400 to-transparent" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
            </motion.div>

            {/* EDITORIAL HEADING */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className={`font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Trusted by Businesses That Demand{" "}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                Precision
              </span>
            </motion.h2>

            {/* EXACT BODY COPY (3 PARAGRAPHS) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`space-y-4 font-sans text-xs sm:text-sm leading-relaxed ${
                isDark ? "text-neutral-300 font-light" : "text-slate-600 font-normal"
              }`}
            >
              <p>
                At B2B Peps, we believe successful peptide programmes begin with reliable partnerships.
              </p>
              <p>
                From premium research-grade products and analytical documentation to international fulfilment and commercial support, we help businesses source with confidence and scale with certainty.
              </p>
              <p>
                Whether you're expanding an existing portfolio or launching a new peptide programme, our focus is simple—deliver consistent quality, transparent documentation, and dependable long-term support.
              </p>
            </motion.div>

            {/* TWO INFORMATIONAL CHIPS (MATCHING REFERENCE DESIGN) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* CHIP 1: Research Grade */}
              <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-xl ${
                isDark 
                  ? "bg-neutral-900/80 border-emerald-500/30 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.12)]" 
                  : "bg-white/95 border-teal-500/30 text-teal-800 shadow-md"
              }`}>
                <Beaker className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  Research Grade
                </span>
              </div>

              {/* CHIP 2: Global Partnerships */}
              <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-xl ${
                isDark 
                  ? "bg-neutral-900/80 border-teal-500/30 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.12)]" 
                  : "bg-white/95 border-emerald-500/30 text-emerald-800 shadow-md"
              }`}>
                <Globe className="h-4 w-4 text-teal-400 shrink-0" />
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  Global Partnerships
                </span>
              </div>
            </motion.div>

          </motion.div>

          {/* =========================================================
              RIGHT COLUMN (60% Width): Precise Reference Image Composition
              ========================================================= */}
          <motion.div 
            style={{ y: parallaxYRight }}
            className="lg:col-span-7 relative min-h-[520px] sm:min-h-[580px] w-full flex items-center justify-center my-4 lg:my-0"
          >
            {/* CONTAINER FRAME */}
            <div className="relative w-full h-[520px] sm:h-[580px] max-w-2xl mx-auto">

              {/* ---------------------------------------------------
                  BACKGROUND HOLOGRAM LAYER: Animated World Map Vector
                  --------------------------------------------------- */}
              <div className="absolute top-0 right-0 w-[60%] h-[55%] pointer-events-none opacity-25 z-0">
                <svg viewBox="0 0 1000 500" className="w-full h-full stroke-cyan-400 fill-none" opacity="0.8">
                  {/* World Map Dot Grid Simulation */}
                  <g className="fill-teal-400/40">
                    <circle cx="200" cy="150" r="3" />
                    <circle cx="280" cy="180" r="4" />
                    <circle cx="480" cy="140" r="4" />
                    <circle cx="520" cy="160" r="5" />
                    <circle cx="580" cy="220" r="3" />
                    <circle cx="720" cy="280" r="4" />
                    <circle cx="850" cy="200" r="3" />
                  </g>
                  {/* Connecting Network Flight Arc Vectors */}
                  <path d="M 280 180 Q 400 80 520 160" strokeDasharray="4 4" strokeWidth="1.5" className="animate-pulse" />
                  <path d="M 520 160 Q 650 180 850 200" strokeDasharray="4 4" strokeWidth="1.5" />
                  <path d="M 520 160 Q 620 280 720 280" strokeDasharray="4 4" strokeWidth="1.5" />
                </svg>
              </div>

              {/* ---------------------------------------------------
                  DOMINANT HERO IMAGE: Scientist at Microscope in Lab
                  --------------------------------------------------- */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`absolute top-0 left-0 w-[68%] h-[380px] sm:h-[420px] rounded-[32px] overflow-hidden border shadow-2xl z-10 backdrop-blur-2xl transition-all duration-500 group ${
                  isDark 
                    ? "border-white/15 bg-neutral-900/80 shadow-[0_25px_60px_rgba(0,0,0,0.7)]" 
                    : "border-slate-200/90 bg-white/90 shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                }`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop" 
                  alt="Scientist analyzing research-grade peptides with microscope"
                  className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className={`absolute inset-0 ${
                  isDark 
                    ? "bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20" 
                    : "bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"
                }`} />

                {/* Subtle Glass Corner Accent */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md bg-black/50 border-emerald-500/30 font-mono text-[9px] font-bold text-emerald-300 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ANALYSIS CHAMBER
                </div>
              </motion.div>

              {/* ---------------------------------------------------
                  RIGHT OVERLAY CARD: 3D Peptide Vial Render
                  --------------------------------------------------- */}
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className={`absolute top-6 right-0 w-[42%] h-[360px] sm:h-[390px] rounded-[28px] overflow-hidden border shadow-2xl z-20 backdrop-blur-3xl transition-all duration-500 group ${
                  isDark 
                    ? "border-emerald-500/30 bg-neutral-900/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)]" 
                    : "border-teal-500/30 bg-white/95 shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
                }`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop" 
                  alt="B2B Peps Research Grade Peptide Vial"
                  className="w-full h-full object-cover filter contrast-115 brightness-95 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-85" />

                {/* Product Vial Brand Plate */}
                <div className="absolute bottom-5 left-4 right-4 text-center space-y-1 z-10 bg-black/60 backdrop-blur-xl p-3.5 rounded-2xl border border-white/10">
                  <div className="font-mono text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                    B2B PEPS
                  </div>
                  <div className="font-sans text-[11px] font-bold text-white tracking-wide">
                    RESEARCH GRADE PEPTIDE
                  </div>
                  <div className="font-mono text-[8px] text-neutral-400 tracking-wider uppercase">
                    FOR RESEARCH USE ONLY
                  </div>
                </div>
              </motion.div>

              {/* ---------------------------------------------------
                  FLOATING MOLECULAR ATOM CLUSTER (3D Graphic Vector)
                  --------------------------------------------------- */}
              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[280px] -right-6 z-30 pointer-events-none hidden sm:block"
              >
                <div className="h-20 w-20 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-emerald-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <Dna className="h-10 w-10 text-emerald-300 animate-pulse" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* ---------------------------------------------------
                  SECONDARY IMAGE 1: Cleanroom Manufacturing Facility
                  --------------------------------------------------- */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                className={`absolute bottom-4 left-[2%] w-[42%] h-[170px] sm:h-[190px] rounded-[24px] overflow-hidden border shadow-2xl z-25 backdrop-blur-2xl group ${
                  isDark 
                    ? "border-white/15 bg-neutral-900/80 shadow-[0_20px_40px_rgba(0,0,0,0.6)]" 
                    : "border-slate-200/90 bg-white/90 shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                }`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop" 
                  alt="ISO Cleanroom Peptide Manufacturing"
                  className="w-full h-full object-cover filter contrast-110 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3.5 font-mono text-[8.5px] font-bold text-emerald-300 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  ISO CLEANROOM
                </span>
              </motion.div>

              {/* ---------------------------------------------------
                  SECONDARY IMAGE 2: Tray of Peptide Vials Storage
                  --------------------------------------------------- */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                className={`absolute bottom-0 left-[38%] w-[32%] h-[120px] sm:h-[135px] rounded-[20px] overflow-hidden border shadow-2xl z-20 backdrop-blur-2xl group ${
                  isDark 
                    ? "border-white/15 bg-neutral-900/80 shadow-[0_15px_35px_rgba(0,0,0,0.6)]" 
                    : "border-slate-200/90 bg-white/90 shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
                }`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop" 
                  alt="Batch Verified Peptide Vial Storage"
                  className="w-full h-full object-cover filter contrast-110 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              </motion.div>

              {/* ---------------------------------------------------
                  3 VERTICALLY STACKED FLOATING VERIFICATION CARDS (REFERENCE STACK)
                  --------------------------------------------------- */}
              <div className="absolute bottom-6 right-0 w-[52%] sm:w-[48%] space-y-2.5 z-40">
                
                {/* CARD 1: HPLC Verified */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  className={`p-3.5 sm:p-4 rounded-2xl border backdrop-blur-3xl shadow-2xl flex items-center gap-3.5 transition-all duration-300 ${
                    isDark 
                      ? "bg-neutral-900/90 border-emerald-500/30 text-white shadow-[0_15px_35px_rgba(0,0,0,0.7)]" 
                      : "bg-white/95 border-teal-500/40 text-slate-900 shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold text-white">HPLC Verified</div>
                    <div className="font-mono text-[9px] text-emerald-400">Purity ≥ 99.2%</div>
                  </div>
                </motion.div>

                {/* CARD 2: LC-MS Confirmed */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  className={`p-3.5 sm:p-4 rounded-2xl border backdrop-blur-3xl shadow-2xl flex items-center gap-3.5 transition-all duration-300 ${
                    isDark 
                      ? "bg-neutral-900/90 border-teal-500/30 text-white shadow-[0_15px_35px_rgba(0,0,0,0.7)]" 
                      : "bg-white/95 border-slate-200 text-slate-900 shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  <div className="h-9 w-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <Activity className="h-4 w-4 text-teal-400" />
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold text-white">LC-MS Confirmed</div>
                    <div className="font-mono text-[9px] text-teal-400">Mass Spec Assay</div>
                  </div>
                </motion.div>

                {/* CARD 3: Global Supply */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  className={`p-3.5 sm:p-4 rounded-2xl border backdrop-blur-3xl shadow-2xl flex items-center gap-3.5 transition-all duration-300 ${
                    isDark 
                      ? "bg-neutral-900/90 border-cyan-500/30 text-white shadow-[0_15px_35px_rgba(0,0,0,0.7)]" 
                      : "bg-white/95 border-slate-200 text-slate-900 shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold text-white">Global Supply</div>
                    <div className="font-mono text-[9px] text-cyan-400">Secure. Reliable. Fast.</div>
                  </div>
                </motion.div>

              </div>

            </div>
          </motion.div>

        </div>

        {/* =========================================================
            BOTTOM TELEMETRY BAR: Full-Width Frosted Glass Stat Strip
            ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className={`mt-16 sm:mt-20 p-6 sm:p-8 rounded-[28px] border backdrop-blur-3xl shadow-2xl ${
            isDark 
              ? "bg-neutral-900/70 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]" 
              : "bg-white/90 border-slate-200 shadow-xl"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* COLUMN 1: 99.5% Purity Standards */}
            <div className="flex items-center gap-5 pt-4 md:pt-0 md:px-6 first:pt-0 first:px-0">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  99.5%
                </div>
                <div className="font-sans text-xs font-bold text-emerald-400 mt-0.5">
                  Purity Standards
                </div>
                <div className="font-sans text-[11px] text-neutral-400 mt-0.5">
                  Rigorous testing at every stage
                </div>
              </div>
            </div>

            {/* COLUMN 2: 70+ Countries Served */}
            <div className="flex items-center gap-5 pt-4 md:pt-0 md:px-6">
              <div className="h-12 w-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                <Globe className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  70+
                </div>
                <div className="font-sans text-xs font-bold text-teal-400 mt-0.5">
                  Countries Served
                </div>
                <div className="font-sans text-[11px] text-neutral-400 mt-0.5">
                  Global reach. Local support.
                </div>
              </div>
            </div>

            {/* COLUMN 3: 100% Batch Traceability */}
            <div className="flex items-center gap-5 pt-4 md:pt-0 md:px-6">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Dna className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  100%
                </div>
                <div className="font-sans text-xs font-bold text-cyan-400 mt-0.5">
                  Batch Traceability
                </div>
                <div className="font-sans text-[11px] text-neutral-400 mt-0.5">
                  Transparent from start to finish
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
