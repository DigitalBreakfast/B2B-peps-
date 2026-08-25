/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ShieldCheck, FileCheck2, Globe2, PackageCheck, 
  Atom, Handshake, Sparkles, Activity, Dna, Layers, CheckCircle2,
  ChevronLeft, ChevronRight
} from "lucide-react";

interface WhyPartnerSectionProps {
  onNavigate: (pageId: string) => void;
  theme: "dark" | "light";
}

const PILLARS = [
  {
    number: "01",
    id: "quality",
    title: "Research-Grade Quality",
    description: "Products sourced to high manufacturing standards with an emphasis on purity, consistency, and reliability.",
    icon: ShieldCheck,
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787484597/Peptide_vials_on_laboratory_bench_202608231659_sbfjag.jpg",
    spec: "PURITY ASSAY ≥ 99.5%",
    badge: "ISO 9001:2015 STANDARDS"
  },
  {
    number: "02",
    id: "supply",
    title: "Global Supply",
    description: "Supporting commercial partners through dependable international sourcing, fulfilment, and logistics.",
    icon: Globe2,
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483821/Professionals_inspecting_pharmac__202608231645_fhynxm.jpg",
    spec: "70+ COUNTRIES COVERAGE",
    badge: "COLD-CHAIN FULFILMENT"
  },
  {
    number: "03",
    id: "expertise",
    title: "Scientific Expertise",
    description: "A technically informed approach to peptide sourcing, documentation, and product support.",
    icon: Atom,
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483821/Engineers_inspecting_pharmaceuti__202608231646_xjish6.jpg",
    spec: "PHD PHARMA CONSULTANTS",
    badge: "ANALYTICAL SUPPORT"
  },
  {
    number: "04",
    id: "partnership",
    title: "Long-Term Partnership",
    description: "Focused on building lasting commercial relationships through responsiveness, transparency, and dependable service.",
    icon: Handshake,
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483822/Researchers_reviewing_technical___202608231645_kpdre3.jpg",
    spec: "DEDICATED B2B DESK",
    badge: "CONTRACT GUARANTEE"
  },
  {
    number: "05",
    id: "commercial",
    title: "Commercial Solutions",
    description: "Private label programmes, branding, packaging, and scalable supply solutions designed for research-focused businesses.",
    icon: PackageCheck,
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483822/Clever_Peps_peptide_manufacturin__202608231645_ut6wmc.jpg",
    spec: "PRIVATE LABEL & BULK",
    badge: "CUSTOM PACKAGING"
  },
  {
    number: "06",
    id: "documentation",
    title: "Quality Documentation",
    description: "Batch-specific analytical documentation, including HPLC analysis, LC-MS identity confirmation, and Certificates of Analysis, where available.",
    icon: FileCheck2,
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483821/Pharmaceutical_quality_control_d__202608231645_pritv6.jpg",
    spec: "HPLC & LC-MS SPECTRUM",
    badge: "COA VERIFIED BATCHES"
  }
];

export default function WhyPartnerSection({ onNavigate, theme }: WhyPartnerSectionProps) {
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const handlePrevPillar = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePillarIndex((prev) => (prev === 0 ? PILLARS.length - 1 : prev - 1));
  };

  const handleNextPillar = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePillarIndex((prev) => (prev === PILLARS.length - 1 ? 0 : prev + 1));
  };

  // Mouse Cursor Tracking
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const activePillar = PILLARS[activePillarIndex];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full py-12 sm:py-16 lg:py-18 px-4 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden transition-colors duration-700 select-none ${
        isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* =========================================================
          BACKGROUND: Animated Molecular Grid, Particles & Glows
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Specular Interactive Cursor Glow */}
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(1000px circle at ${mousePos.x}% ${mousePos.y}%, ${
              isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(13, 148, 136, 0.07)"
            }, transparent 70%)`
          }}
        />

        {/* Ambient Volumetric Lighting */}
        <div className="absolute top-1/3 -left-36 w-[650px] h-[650px] bg-emerald-500/[0.06] blur-[180px] rounded-full" />
        <div className="absolute bottom-1/3 -right-36 w-[700px] h-[700px] bg-teal-500/[0.06] blur-[180px] rounded-full" />

        {/* Blueprint Coordinate Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#fff' : '#000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* SVG Blueprint Wireframe */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-500/10 fill-none pointer-events-none" width="100%" height="100%">
          <pattern id="why-partner-grid" width="140" height="140" patternUnits="userSpaceOnUse">
            <path d="M 140 0 L 0 0 0 140" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="1.5" className="fill-emerald-400/40" />
            <circle cx="140" cy="0" r="1.5" className="fill-emerald-400/40" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#why-partner-grid)" />
        </svg>

        {/* Rotating Molecular Orbital Rings */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-emerald-500/10 rounded-full border-dashed pointer-events-none"
        />
      </div>

      <div className="mx-auto w-full max-w-7xl relative z-10 space-y-12 sm:space-y-16">

        {/* =========================================================
            TOP EXPERIENCE: EDITORIAL INTRO & BIOTECHNOLOGY VISUAL ANCHOR
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Copy & Primary CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* EYEBROW */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3"
            >
              <span className="font-mono text-xs font-extrabold uppercase tracking-[0.3em] text-emerald-400">
                SOLVING B2B CONTRACT CHALLENGES
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-emerald-400 to-transparent" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
            </motion.div>

            {/* HEADING */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className={`font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Why Leading Businesses Partner With B2B Peps
            </motion.h2>

            {/* BODY COPY */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`font-sans text-sm sm:text-base leading-relaxed max-w-xl ${
                isDark ? "text-neutral-300 font-light" : "text-slate-600 font-normal"
              }`}
            >
              Reliable sourcing is about more than product availability. It requires consistent quality, transparent documentation, dependable logistics, and a partner committed to supporting long-term growth.
            </motion.p>

            {/* PRIMARY CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <button
                onClick={() => onNavigate("why-partner")}
                className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-extrabold transition-all duration-300 cursor-pointer shadow-2xl hover:scale-[1.03] active:scale-[0.98] ${
                  isDark 
                    ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_30px_rgba(52,211,153,0.35)]" 
                    : "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_10px_30px_rgba(13,148,136,0.35)]"
                }`}
              >
                <span>Why Partner With B2B Peps</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Animated Biotechnology Visualization Anchor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] w-full flex items-center justify-center"
          >
            {/* Liquid Glass Command Center Frame */}
            <div className={`relative w-full h-full rounded-[36px] border backdrop-blur-3xl overflow-hidden flex flex-col justify-between shadow-2xl ${
              isDark 
                ? "border-emerald-500/25 bg-neutral-900/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)]" 
                : "border-teal-500/25 bg-white/90 shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
            }`}>
              
              {/* Central Biotech Advertisement Video Player */}
              <div className="relative flex flex-col items-center justify-center z-10 w-full h-full">
                
                {/* Embedded Video Canvas */}
                <div className="relative w-full h-[320px] sm:h-[380px] rounded-[34px] overflow-hidden border border-emerald-500/30 shadow-2xl group bg-black">
                  <video 
                    src="https://res.cloudinary.com/ds5s7shuo/video/upload/v1785970575/Clever_Peps_biotech_advertisement_202608060237_hvronh.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    controls 
                    className="w-full h-full object-cover filter contrast-105 brightness-95"
                  />
                </div>

              </div>

            </div>
          </motion.div>

        </div>

        {/* =========================================================
            BOTTOM EXPERIENCE: INTERACTIVE MOLECULAR HEXAGONAL CAPABILITY GRID / MOBILE INTERACTIVE LIST
            ========================================================= */}
        <div className="space-y-8 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* MOBILE INTERACTIVE HORIZONTAL/VERTICAL PILL SELECTOR (Shown strictly on md and down) */}
            <div className="lg:hidden flex flex-col gap-2.5 w-full">
              <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-2.5">
                {PILLARS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isSelected = activePillarIndex === idx;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActivePillarIndex(idx)}
                      className={`p-3 rounded-2xl border flex flex-col items-start gap-1.5 transition-all text-left cursor-pointer min-h-[64px] ${
                        isSelected
                          ? isDark
                            ? "bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                            : "bg-teal-50 border-teal-500 text-slate-900 shadow-sm"
                          : isDark
                            ? "bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-mono text-[9px] font-bold ${isSelected ? "text-emerald-400 font-extrabold" : "opacity-60"}`}>
                          {pillar.number}
                        </span>
                        <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-emerald-400" : "opacity-50"}`} />
                      </div>
                      <span className="font-sans text-[11px] font-semibold leading-tight line-clamp-1">
                        {pillar.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DESKTOP 7 COLUMNS: HEXAGONAL MOLECULAR GRID (Hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-7 relative flex-col items-center justify-center py-6">
              
              {/* SVG Connecting Molecular Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-emerald-500/30 fill-none pointer-events-none z-0" viewBox="0 0 600 500">
                <line x1="300" y1="250" x2="300" y2="90" strokeDasharray="4 4" className="animate-pulse" strokeWidth="1.5" />
                <line x1="300" y1="250" x2="160" y2="170" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="300" y1="250" x2="440" y2="170" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="300" y1="250" x2="160" y2="330" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="300" y1="250" x2="440" y2="330" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="300" y1="250" x2="300" y2="410" strokeDasharray="4 4" className="animate-pulse" strokeWidth="1.5" />
              </svg>

              {/* MOLECULAR ARRANGEMENT LAYOUT */}
              <div className="relative z-10 w-full max-w-lg space-y-6 sm:space-y-8">
                
                {/* ROW 1: TOP NODE (01 - TOP APEX) */}
                <div className="flex justify-center">
                  <HexNode 
                    pillar={PILLARS[0]} 
                    index={0} 
                    isActive={activePillarIndex === 0} 
                    onClick={() => setActivePillarIndex(0)} 
                    isDark={isDark} 
                  />
                </div>

                {/* ROW 2: MID-TOP NODES (06 - TOP LEFT, CORE, 02 - TOP RIGHT) */}
                <div className="flex items-center justify-between sm:justify-around px-1 sm:px-6">
                  <HexNode 
                    pillar={PILLARS[5]} 
                    index={5} 
                    isActive={activePillarIndex === 5} 
                    onClick={() => setActivePillarIndex(5)} 
                    isDark={isDark} 
                  />

                  {/* CENTER CORE NODE */}
                  <div className={`h-16 w-16 min-[400px]:h-20 min-[400px]:w-20 sm:h-28 sm:w-28 rounded-full border-2 flex flex-col items-center justify-center text-center p-1 sm:p-2 backdrop-blur-3xl shadow-2xl transition-all duration-500 shrink-0 ${
                    isDark 
                      ? "border-emerald-400 bg-neutral-900/90 shadow-[0_0_40px_rgba(52,211,153,0.3)] text-white" 
                      : "border-teal-500 bg-white shadow-[0_0_30px_rgba(13,148,136,0.3)] text-slate-900"
                  }`}>
                    <Dna className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400 animate-spin" style={{ animationDuration: '20s' }} />
                    <span className="font-mono text-[8px] sm:text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 mt-0.5 sm:mt-1">
                      B2B
                    </span>
                    <span className="font-mono text-[6px] sm:text-[8px] text-neutral-400 hidden min-[400px]:inline">CORE</span>
                  </div>

                  <HexNode 
                    pillar={PILLARS[1]} 
                    index={1} 
                    isActive={activePillarIndex === 1} 
                    onClick={() => setActivePillarIndex(1)} 
                    isDark={isDark} 
                  />
                </div>

                {/* ROW 3: MID-BOTTOM NODES (05 - BOTTOM LEFT, 03 - BOTTOM RIGHT) */}
                <div className="flex items-center justify-between sm:justify-around px-1 sm:px-6">
                  <HexNode 
                    pillar={PILLARS[4]} 
                    index={4} 
                    isActive={activePillarIndex === 4} 
                    onClick={() => setActivePillarIndex(4)} 
                    isDark={isDark} 
                  />

                  <HexNode 
                    pillar={PILLARS[2]} 
                    index={2} 
                    isActive={activePillarIndex === 2} 
                    onClick={() => setActivePillarIndex(2)} 
                    isDark={isDark} 
                  />
                </div>

                {/* ROW 4: BOTTOM NODE (04 - BOTTOM APEX) */}
                <div className="flex justify-center">
                  <HexNode 
                    pillar={PILLARS[3]} 
                    index={3} 
                    isActive={activePillarIndex === 3} 
                    onClick={() => setActivePillarIndex(3)} 
                    isDark={isDark} 
                  />
                </div>

              </div>
            </div>

            {/* RIGHT 5 COLUMNS: DYNAMIC LIQUID GLASS INFO PANEL */}
            <div className="lg:col-span-5 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className={`p-8 rounded-[36px] border backdrop-blur-3xl shadow-2xl space-y-6 relative overflow-hidden ${
                    isDark 
                      ? "border-emerald-500/30 bg-neutral-900/90 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8)]" 
                      : "border-teal-500/30 bg-white/95 text-slate-900 shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  {/* Background Artwork Image with Grainy Layer & Color Reveal on Hover */}
                  <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
                    {/* The Artwork Image with Grayscale & Contrast in default state, transitioning to Original Color on hover */}
                    <img 
                      id="pillar-artwork-img"
                      src={activePillar.image} 
                      alt={activePillar.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {/* Grainy Texture Layer Overlay (fades gracefully on hover to reveal true color) */}
                    <div 
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none z-10 opacity-70 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainNoise)' opacity='0.75'/%3E%3C/svg%3E")`,
                        backgroundSize: "140px 140px"
                      }}
                    />

                    {/* Gradient shade overlays for arrow visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30 pointer-events-none z-10" />

                    {/* Carousel Left Arrow */}
                    <button
                      id="carousel-prev-btn"
                      onClick={handlePrevPillar}
                      aria-label="Previous capability"
                      className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-lg active:scale-90 hover:scale-110 ${
                        isDark
                          ? "bg-neutral-950/80 hover:bg-neutral-900 border-white/20 hover:border-emerald-400 text-white hover:text-emerald-400"
                          : "bg-white/90 hover:bg-white border-slate-300 hover:border-teal-500 text-slate-800 hover:text-teal-700 shadow-md"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Carousel Right Arrow */}
                    <button
                      id="carousel-next-btn"
                      onClick={handleNextPillar}
                      aria-label="Next capability"
                      className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-lg active:scale-90 hover:scale-110 ${
                        isDark
                          ? "bg-neutral-950/80 hover:bg-neutral-900 border-white/20 hover:border-emerald-400 text-white hover:text-emerald-400"
                          : "bg-white/90 hover:bg-white border-slate-300 hover:border-teal-500 text-slate-800 hover:text-teal-700 shadow-md"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Carousel Dots on Image Bottom */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/15">
                      {PILLARS.map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePillarIndex(idx);
                          }}
                          aria-label={`Go to capability ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            activePillarIndex === idx 
                              ? "w-5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
                              : "w-1.5 bg-white/40 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Copy Content */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl font-extrabold text-emerald-400">
                          {activePillar.number}
                        </span>
                      </div>

                      {/* Header Carousel Stepper Arrows */}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${
                        isDark ? "bg-white/[0.04] border-white/10 text-neutral-300" : "bg-slate-100 border-slate-200 text-slate-700"
                      }`}>
                        <button
                          onClick={handlePrevPillar}
                          aria-label="Previous capability"
                          className={`p-1 rounded-full transition-colors cursor-pointer ${
                            isDark ? "hover:bg-white/10 hover:text-emerald-400" : "hover:bg-slate-200 hover:text-teal-700"
                          }`}
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono text-[10px] font-bold px-1.5 text-neutral-400">
                          {activePillarIndex + 1}/{PILLARS.length}
                        </span>
                        <button
                          onClick={handleNextPillar}
                          aria-label="Next capability"
                          className={`p-1 rounded-full transition-colors cursor-pointer ${
                            isDark ? "hover:bg-white/10 hover:text-emerald-400" : "hover:bg-slate-200 hover:text-teal-700"
                          }`}
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-sans text-2xl font-semibold tracking-tight">
                      {activePillar.title}
                    </h4>

                    <p className={`font-sans text-sm leading-relaxed ${
                      isDark ? "text-neutral-300 font-light" : "text-slate-600 font-normal"
                    }`}>
                      {activePillar.description}
                    </p>
                  </div>

                  {/* Micro Specs List */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 font-mono text-[10px] text-neutral-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>HPLC / LC-MS VERIFIED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                      <span>CONTRACT GUARANTEED</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// Single Hexagonal Capability Node Sub-component
interface HexNodeProps {
  pillar: typeof PILLARS[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
  isDark: boolean;
}

function HexNode({ pillar, isActive, onClick, isDark }: HexNodeProps) {
  const Icon = pillar.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-[84px] h-[84px] min-[390px]:w-24 min-[390px]:h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center p-1.5 sm:p-3 rounded-2xl sm:rounded-3xl border backdrop-blur-3xl transition-all duration-300 cursor-pointer text-center group shrink-0 ${
        isActive 
          ? isDark 
            ? "border-emerald-400 bg-neutral-900/90 text-white shadow-[0_0_35px_rgba(52,211,153,0.35)] scale-105 z-20" 
            : "border-teal-500 bg-white text-slate-900 shadow-[0_0_30px_rgba(13,148,136,0.35)] scale-105 z-20"
          : isDark 
            ? "border-white/15 bg-neutral-900/60 text-neutral-300 hover:border-emerald-500/50 hover:text-white" 
            : "border-slate-200 bg-white/80 text-slate-700 hover:border-teal-400 hover:text-slate-900"
      }`}
    >
      <div className={`h-6 w-6 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors ${
        isActive 
          ? "bg-emerald-500/20 text-emerald-400" 
          : "bg-white/5 text-neutral-400 group-hover:text-emerald-400"
      }`}>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
      </div>

      <span className="font-mono text-[8px] sm:text-[9px] font-bold text-emerald-400 mt-0.5 sm:mt-1">
        {pillar.number}
      </span>

      <span className="font-sans text-[9px] min-[390px]:text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-2 mt-0.5">
        {pillar.title}
      </span>
    </motion.button>
  );
}
