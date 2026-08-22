/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Sparkles, ArrowRight, ShieldCheck, Microscope, Activity, Globe, 
  Dna, Beaker, CheckCircle2, ChevronRight, Layers, Cpu, Database, 
  Terminal, Lock, Compass, FileText, Zap
} from "lucide-react";

interface HeroSectionProps {
  onNavigate: (pageId: string, filterCategory?: string) => void;
  theme: "dark" | "light";
}

const TRUST_PARTNERS = [
  "Research Institutions",
  "Biotechnology Companies",
  "Clinics",
  "Wellness Brands",
  "Distributors",
  "Commercial Partners"
];

const SCIENTIFIC_METRICS = [
  { label: "Purity Assay", value: "99.2%", detail: "HPLC Standard Verified" },
  { label: "Protein Stability", value: "98.7%", detail: "Conformational Integrity" },
  { label: "Batch Traceability", value: "100%", detail: "LC-MS Mass Spectrometry" },
  { label: "Distribution", value: "Global", detail: "Cold-Chain Logistics" },
];

export default function HeroSection({ onNavigate, theme }: HeroSectionProps) {
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse coordinate state for dynamic specular parallax
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // Canvas particle simulation for molecular background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes
    const nodeCount = 38;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = (1 - dist / 140) * 0.15;
            ctx.strokeStyle = isDark ? `rgba(52, 211, 153, ${opacity})` : `rgba(13, 148, 136, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(52, 211, 153, ${node.alpha})` : `rgba(13, 148, 136, ${node.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const visualRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative min-h-[110vh] lg:min-h-[120vh] w-full pt-28 pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden flex flex-col justify-between transition-colors duration-700 ${
        isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* =========================================================
          BACKGROUND LAYER 1: Video & Animated Scientific Environment
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background High-Tech Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isDark ? "opacity-65 mix-blend-screen filter brightness-95 contrast-115" : "opacity-55 mix-blend-multiply filter contrast-110"
          }`}
        >
          <source src="https://res.cloudinary.com/ds5s7shuo/video/upload/v1785967322/Change_bottle_to_Clevver_Peps_202608060237_n6vexp.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for Optimal Text Readability */}
        <div className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-neutral-950/30" 
            : "bg-gradient-to-r from-slate-50/90 via-slate-50/55 to-slate-50/30"
        }`} />

        {/* Dynamic Specular Light reacting to mouse */}
        <div 
          className="absolute inset-0 opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(1000px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${
              isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(13, 148, 136, 0.08)"
            }, transparent 65%)`
          }}
        />

        {/* Ambient Volumetric Color Blooms */}
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-emerald-500/[0.08] blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-[800px] h-[800px] bg-teal-500/[0.07] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-cyan-500/[0.05] blur-[150px] rounded-full pointer-events-none" />

        {/* Canvas Particle Simulation */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

        {/* Technical Coordinate Blueprint Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#fff' : '#000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Laboratory Technical Annotation Lines & SVG Blueprint Vectors */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-500/10 fill-none pointer-events-none" width="100%" height="100%">
          <pattern id="hero-blueprint" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 6" />
            <circle cx="0" cy="0" r="2" className="fill-emerald-400/30" />
            <circle cx="200" cy="0" r="2" className="fill-emerald-400/30" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-blueprint)" />
        </svg>

        {/* Rotating Orbital Vectors */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-[10%] w-[550px] h-[550px] border border-emerald-500/10 rounded-full border-dashed pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-[15%] w-[420px] h-[420px] border border-teal-500/10 rounded-full pointer-events-none"
        />
      </div>

      {/* =========================================================
          MAIN ASYMMETRICAL EDITORIAL COMPOSITION (40% / 60%)
          ========================================================= */}
      <motion.div style={{ y: heroY, opacity: opacityFade }} className="relative z-10 my-auto w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[640px]">
          
          {/* =========================================================
              LEFT COLUMN (40% Width): Editorial Typography & CTAs
              ========================================================= */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* BADGE (Liquid Glass Capsule) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-2xl bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
              </span>
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.25em]">
                Premium Peptide Solutions
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h1 className={`font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                for Global Research & Commercial Partnerships
              </h1>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`font-sans text-sm sm:text-base leading-relaxed max-w-[620px] ${
                isDark ? "text-neutral-300 font-light" : "text-slate-600 font-normal"
              }`}
            >
              Supporting biotechnology companies, research institutions, clinics, distributors, and wellness businesses with premium peptides, rigorous quality standards, and dependable international supply to support scientific innovation.
            </motion.p>

            {/* CTA ROW */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* PRIMARY CTA */}
              <button
                onClick={() => onNavigate("catalog")}
                className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full font-mono text-[10px] uppercase tracking-[0.22em] font-extrabold transition-all duration-300 cursor-pointer shadow-2xl hover:scale-[1.03] active:scale-[0.98] ${
                  isDark 
                    ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_35px_rgba(52,211,153,0.35)]" 
                    : "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_8px_30px_rgba(13,148,136,0.3)]"
                }`}
              >
                <span>Request Product Catalogue</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              {/* SECONDARY CTA */}
              <button
                onClick={() => onNavigate("contact")}
                className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full font-mono text-[10px] uppercase tracking-[0.22em] font-extrabold border backdrop-blur-2xl transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${
                  isDark 
                    ? "border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-white" 
                    : "border-slate-300 bg-white/80 hover:bg-white text-slate-800 shadow-sm"
                }`}
              >
                <span>Speak With Our Team</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-emerald-400" />
              </button>
            </motion.div>

            {/* OPTIONAL TEXT LINK */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2"
            >
              <button 
                onClick={() => onNavigate("platform")}
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <span>Explore Platform</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

          </div>

          {/* =========================================================
              RIGHT COLUMN (60% Width): Futuristic Biotechnology Visual Stage
              ========================================================= */}
          <div className="lg:col-span-7 relative min-h-[520px] lg:min-h-[620px] flex items-center justify-center">
            
            {/* Parallax Container reacting to Mouse Movement */}
            <motion.div 
              style={{
                rotateX: (mousePos.y - 0.5) * -12,
                rotateY: (mousePos.x - 0.5) * 12,
                transformStyle: "preserve-3d"
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="w-full h-full relative flex items-center justify-center"
            >
              
              {/* -------------------------------------------------------------
                  LAYER 2: CENTRAL HERO BIOTECHNOLOGY OBJECT (Render & Glass Stage)
                  ------------------------------------------------------------- */}
              <div className="relative w-full max-w-lg aspect-square rounded-[36px] border backdrop-blur-3xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 border-white/10 bg-gradient-to-br from-white/[0.08] via-emerald-500/[0.03] to-transparent shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
                
                {/* Background Video & Laboratory Peptide Visual Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover object-center filter brightness-105 contrast-115 opacity-65 scale-105 transition-transform duration-1000 hover:scale-110"
                  >
                    <source src="https://res.cloudinary.com/ds5s7shuo/video/upload/v1787407540/Change_bottle_to_Clevver_Peps_202608060237_n6vexp__.mp4" type="video/mp4" />
                  </video>
                  <div className={`absolute inset-0 ${
                    isDark 
                      ? "bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" 
                      : "bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent"
                  }`} />
                </div>

                {/* Holographic Specular Lighting Edge */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-emerald-400/20 via-transparent to-teal-500/20 z-0" />

                {/* Top Badge Overlay */}
                <div className="relative z-10 flex justify-between items-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-xl bg-black/40 border-emerald-500/30 text-emerald-400 font-mono text-[9px] uppercase tracking-widest font-extrabold">
                    <Dna className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
                    <span>B2B-SYNTHESIS v4.2</span>
                  </div>
                </div>

              </div>

              {/* -------------------------------------------------------------
                  LAYER 3: FLOATING SCIENTIFIC LIQUID GLASS WIDGETS
                  ------------------------------------------------------------- */}

              {/* Widget 1: Top Right - HPLC Verified */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -top-6 -right-4 sm:right-2 p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl z-20 flex items-center gap-3.5 max-w-xs ${
                  isDark ? "bg-neutral-900/90 border-emerald-500/30 text-white" : "bg-white/95 border-teal-500/40 text-slate-900"
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-emerald-400">HPLC VERIFIED</div>
                  <div className="font-sans text-[10px] text-neutral-400 uppercase tracking-wider">Research-Grade Quality</div>
                </div>
              </motion.div>

              {/* Widget 2: Bottom Left - Global Cold Chain */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className={`absolute -bottom-6 -left-4 sm:left-2 p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl z-20 flex items-center gap-3.5 max-w-xs ${
                  isDark ? "bg-neutral-900/90 border-teal-500/30 text-white" : "bg-white/95 border-slate-300 text-slate-900"
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-teal-400">GLOBAL SUPPLY</div>
                  <div className="font-sans text-[10px] text-neutral-400 uppercase tracking-wider">Express Cold-Chain Logistics</div>
                </div>
              </motion.div>

              {/* Widget 3: Floating Micro Panel - LC-MS Spectrometry */}
              <motion.div 
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -left-8 hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl border backdrop-blur-2xl bg-black/60 border-white/15 text-white shadow-xl z-20 font-mono text-[9px]"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-neutral-300">LC-MS CONFIRMED</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* =========================================================
          TRUST STRIP (Continuous Marquee Capsules of Partner Segments)
          ========================================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-full max-w-7xl mx-auto pt-10 border-t border-white/[0.08]"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-extrabold shrink-0">
            TRUSTED BY LEADING GLOBAL INSTITUTIONS & PARTNERS
          </div>

          {/* Marquee Pill Capsules */}
          <div className="w-full md:w-auto overflow-hidden">
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
              {TRUST_PARTNERS.map((partner, idx) => (
                <motion.div
                  key={partner}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3.5 py-1.5 rounded-full border backdrop-blur-xl font-mono text-[9.5px] uppercase tracking-wider transition-all duration-300 ${
                    isDark 
                      ? "bg-white/[0.03] border-white/10 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-300" 
                      : "bg-white/80 border-slate-200 hover:border-teal-500/40 text-slate-700 hover:text-teal-700 shadow-sm"
                  }`}
                >
                  <span className="text-emerald-400 font-bold mr-1.5">•</span>
                  {partner}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
