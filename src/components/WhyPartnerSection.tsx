/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ShieldCheck, FileCheck2, Globe2, PackageCheck, 
  Atom, Handshake, Sparkles, Activity, Dna, Layers, CheckCircle2 
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
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1785967321/16e78cb7c1a52631906f2fe4b952bd6d.jpg_202608060238_dlsjjl.jpg",
    spec: "PURITY ASSAY ≥ 99.5%",
    badge: "ISO 9001:2015 STANDARDS"
  },
  {
    number: "02",
    id: "documentation",
    title: "Quality Documentation",
    description: "Batch-specific analytical documentation, including HPLC analysis, LC-MS identity confirmation, and Certificates of Analysis, where available.",
    icon: FileCheck2,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
    spec: "HPLC & LC-MS SPECTRUM",
    badge: "COA VERIFIED BATCHES"
  },
  {
    number: "03",
    id: "supply",
    title: "Global Supply",
    description: "Supporting commercial partners through dependable international sourcing, fulfilment, and logistics.",
    icon: Globe2,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    spec: "70+ COUNTRIES COVERAGE",
    badge: "COLD-CHAIN FULFILMENT"
  },
  {
    number: "04",
    id: "commercial",
    title: "Commercial Solutions",
    description: "Private label programmes, branding, packaging, and scalable supply solutions designed for research-focused businesses.",
    icon: PackageCheck,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
    spec: "PRIVATE LABEL & BULK",
    badge: "CUSTOM PACKAGING"
  },
  {
    number: "05",
    id: "expertise",
    title: "Scientific Expertise",
    description: "A technically informed approach to peptide sourcing, documentation, and product support.",
    icon: Atom,
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop",
    spec: "PHD PHARMA CONSULTANTS",
    badge: "ANALYTICAL SUPPORT"
  },
  {
    number: "06",
    id: "partnership",
    title: "Long-Term Partnership",
    description: "Focused on building lasting commercial relationships through responsiveness, transparency, and dependable service.",
    icon: Handshake,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    spec: "DEDICATED B2B DESK",
    badge: "CONTRACT GUARANTEE"
  }
];

export default function WhyPartnerSection({ onNavigate, theme }: WhyPartnerSectionProps) {
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

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
      className={`relative min-h-[100vh] w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden transition-colors duration-700 select-none ${
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

      <div className="mx-auto w-full max-w-7xl relative z-10 space-y-20">

        {/* =========================================================
            TOP EXPERIENCE: EDITORIAL INTRO & BIOTECHNOLOGY VISUAL ANCHOR
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Copy & Primary CTA */}
          <div className="lg:col-span-6 space-y-8">
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
            BOTTOM EXPERIENCE: INTERACTIVE MOLECULAR HEXAGONAL CAPABILITY GRID
            ========================================================= */}
        <div className="space-y-12">
          
          <div className="text-center space-y-3">
            <span className="font-mono text-xs font-extrabold text-emerald-400 uppercase tracking-[0.25em]">
              MOLECULAR CAPABILITY EXPLORER
            </span>
            <h3 className={`font-sans text-2xl sm:text-3xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Select a Capability Node to Inspect Technical Details
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT 6 COLUMNS: HEXAGONAL MOLECULAR GRID */}
            <div className="lg:col-span-7 relative flex flex-col items-center justify-center py-6">
              
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
                
                {/* ROW 1: TOP NODE (PILLAR 01) */}
                <div className="flex justify-center">
                  <HexNode 
                    pillar={PILLARS[0]} 
                    index={0} 
                    isActive={activePillarIndex === 0} 
                    onClick={() => setActivePillarIndex(0)} 
                    isDark={isDark} 
                  />
                </div>

                {/* ROW 2: MID-TOP NODES (PILLAR 02, CORE, PILLAR 03) */}
                <div className="flex items-center justify-between sm:justify-around px-1 sm:px-6">
                  <HexNode 
                    pillar={PILLARS[1]} 
                    index={1} 
                    isActive={activePillarIndex === 1} 
                    onClick={() => setActivePillarIndex(1)} 
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
                    pillar={PILLARS[2]} 
                    index={2} 
                    isActive={activePillarIndex === 2} 
                    onClick={() => setActivePillarIndex(2)} 
                    isDark={isDark} 
                  />
                </div>

                {/* ROW 3: MID-BOTTOM NODES (PILLAR 04, PILLAR 05) */}
                <div className="flex items-center justify-between sm:justify-around px-1 sm:px-6">
                  <HexNode 
                    pillar={PILLARS[3]} 
                    index={3} 
                    isActive={activePillarIndex === 3} 
                    onClick={() => setActivePillarIndex(3)} 
                    isDark={isDark} 
                  />

                  <HexNode 
                    pillar={PILLARS[4]} 
                    index={4} 
                    isActive={activePillarIndex === 4} 
                    onClick={() => setActivePillarIndex(4)} 
                    isDark={isDark} 
                  />
                </div>

                {/* ROW 4: BOTTOM NODE (PILLAR 06) */}
                <div className="flex justify-center">
                  <HexNode 
                    pillar={PILLARS[5]} 
                    index={5} 
                    isActive={activePillarIndex === 5} 
                    onClick={() => setActivePillarIndex(5)} 
                    isDark={isDark} 
                  />
                </div>

              </div>
            </div>

            {/* RIGHT 5 COLUMNS: DYNAMIC LIQUID GLASS INFO PANEL */}
            <div className="lg:col-span-5">
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
                  {/* Background Artwork Image */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 group">
                    <img 
                      src={activePillar.image} 
                      alt={activePillar.title}
                      className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                      {activePillar.badge}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-mono text-[9px] text-neutral-300 uppercase tracking-widest">
                      {activePillar.spec}
                    </div>
                  </div>

                  {/* Copy Content */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl font-extrabold text-emerald-400">
                        {activePillar.number}
                      </span>
                      <div className="h-4 w-[1px] bg-emerald-500/30" />
                      <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                        CAPABILITY INSPECTOR
                      </span>
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

                  {/* Action CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate("why-partner")}
                      className={`w-full inline-flex items-center justify-between px-6 py-4 rounded-2xl border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isDark 
                          ? "bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300" 
                          : "bg-teal-50 border-teal-300 hover:bg-teal-100 text-teal-800"
                      }`}
                    >
                      <span>Explore Capability Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
