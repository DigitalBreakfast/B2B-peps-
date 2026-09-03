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
  { label: "Purity Assay", value: "99.2%", detail: "Analytical Documentation" },
  { label: "Compound Stability", value: "98.7%", detail: "Formulation Integrity" },
  { label: "Batch Traceability", value: "100%", detail: "Lot Records & CoA" },
  { label: "Distribution", value: "Global", detail: "Global Delivery Solutions" },
];

export default function HeroSection({ onNavigate, theme }: HeroSectionProps) {
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse coordinate state for dynamic specular parallax (desktop only)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // Efficient canvas particle simulation for molecular background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRendering = false;
    let isHeroInView = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Adaptive particle node count: reduced on mobile to eliminate main thread blocking
    const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
    const nodeCount = isMobileDevice ? 14 : 32;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 1,
      alpha: Math.random() * 0.4 + 0.2,
    }));

    const render = () => {
      if (!isHeroInView || document.hidden) {
        isRendering = false;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = (1 - dist / 130) * 0.14;
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

    const startAnimation = () => {
      if (!isRendering && isHeroInView && !document.hidden) {
        isRendering = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      isRendering = false;
      cancelAnimationFrame(animationFrameId);
    };

    // Pause animation when tab is inactive or hero is scrolled away
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Observer to pause canvas when offscreen
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        isHeroInView = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      heroObserver.observe(containerRef.current);
    }

    // Delay start until after first paint to keep FCP instant
    const idleTimer = setTimeout(() => {
      startAnimation();
    }, 150);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      heroObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  // Scroll parallax effects (applied only on desktop to allow natural flow on mobile)
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
      className={`relative w-full h-auto min-h-0 pt-20 pb-8 md:pt-24 md:pb-10 flex flex-col justify-between transition-colors duration-700 ${
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
          preload="metadata"
          poster="https://res.cloudinary.com/ds5s7shuo/video/upload/so_0,f_auto,q_auto:good,w_600/v1785967322/Change_bottle_to_Clevver_Peps_202608060237_n6vexp.jpg"
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

        {/* Rotating Orbital Vectors - hardware compositor accelerated */}
        <div 
          className="absolute top-1/4 right-[10%] w-[550px] h-[550px] border border-emerald-500/10 rounded-full border-dashed pointer-events-none animate-spin-slow"
        />
        <div 
          className="absolute top-1/3 right-[15%] w-[420px] h-[420px] border border-teal-500/10 rounded-full pointer-events-none animate-spin-reverse-slow"
        />
      </div>

      {/* =========================================================
          MAIN ASYMMETRICAL EDITORIAL COMPOSITION (40% / 60%)
          ========================================================= */}
      <motion.div 
        style={isMobile ? undefined : { y: heroY, opacity: opacityFade }} 
        className="relative z-10 my-auto site-container"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-0 lg:min-h-[640px]">
          
          {/* =========================================================
              LEFT COLUMN (40% Width): Editorial Typography & CTAs
              ========================================================= */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* BADGE (Liquid Glass Capsule - Enhanced Visibility & Contrast) */}
            <motion.div 
              id="hero-eyebrow-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 ${
                isDark 
                  ? "bg-emerald-950/70 border-emerald-400/50 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.3)] ring-1 ring-emerald-400/30" 
                  : "bg-teal-50/95 border-teal-600/40 text-teal-900 shadow-[0_4px_16px_rgba(13,148,136,0.18)] ring-1 ring-teal-600/20"
              }`}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className={`inline-flex rounded-full h-2 w-2 ${
                  isDark ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" : "bg-teal-600 shadow-[0_0_8px_rgba(13,148,136,0.8)]"
                }`} />
              </span>
              <span className={`font-mono text-[11px] sm:text-[11.5px] font-extrabold uppercase tracking-[0.22em] ${
                isDark ? "text-emerald-300" : "text-teal-950"
              }`}>
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
                isDark ? "text-white" : "text-[#0B1B3D]"
              }`}>
                For Global Research & Commercial Partnerships
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
                onClick={() => onNavigate("products")}
                className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full font-mono text-[10px] uppercase tracking-[0.22em] font-extrabold transition-all duration-300 cursor-pointer shadow-2xl hover:scale-[1.03] active:scale-[0.98] ${
                  isDark 
                    ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_35px_rgba(52,211,153,0.35)]" 
                    : "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_8px_30px_rgba(13,148,136,0.3)]"
                }`}
              >
                <span>Explore Products</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

          </div>

          {/* =========================================================
              RIGHT COLUMN (60% Width): Futuristic Biotechnology Visual Stage
              ========================================================= */}
          <div className="lg:col-span-7 relative min-h-0 sm:min-h-[460px] lg:min-h-[620px] flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-0">
            
            {/* Parallax Container reacting to Mouse Movement */}
            <motion.div 
              style={{
                rotateX: (mousePos.y - 0.5) * -12,
                rotateY: (mousePos.x - 0.5) * 12,
                transformStyle: "preserve-3d"
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="w-full relative flex items-center justify-center"
            >
              
              {/* -------------------------------------------------------------
                  LAYER 2: CENTRAL HERO BIOTECHNOLOGY OBJECT (Render & Glass Stage)
                  Hidden on mobile (< md), rendered on desktop (md+)
                  ------------------------------------------------------------- */}
              <div className="hidden md:flex relative w-full max-w-lg aspect-[4/3] sm:aspect-square rounded-3xl sm:rounded-[36px] border backdrop-blur-3xl p-5 sm:p-8 flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 border-white/10 bg-gradient-to-br from-white/[0.08] via-emerald-500/[0.03] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                {/* Background Artwork & Laboratory Peptide Visual Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                  <img 
                    src="https://res.cloudinary.com/ds5s7shuo/image/upload/f_auto,q_auto:good,w_800/v1787600572/Replace_bottle_with_peps_bottle_202608250112_z6buhk.jpg"
                    alt="B2B Peps Pharmaceutical Grade Peptide Bottle"
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-105 contrast-110 opacity-90 scale-105 transition-transform duration-1000 hover:scale-110"
                  />
                  <div className={`absolute inset-0 ${
                    isDark 
                      ? "bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" 
                      : "bg-gradient-to-t from-slate-50/80 via-slate-50/20 to-transparent"
                  }`} />
                </div>

                {/* Holographic Specular Lighting Edge */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-emerald-400/20 via-transparent to-teal-500/20 z-0" />

              </div>

              {/* -------------------------------------------------------------
                  LAYER 3: DESKTOP FLOATING COMMERCIAL LIQUID GLASS WIDGETS (Hidden on mobile)
                  Static positioning with subtle hover animations only
                  ------------------------------------------------------------- */}

              {/* Widget 1: Top Right - Independent Testing Support (Desktop) */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`hidden md:flex absolute -top-6 -right-4 sm:right-2 p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl z-20 items-center gap-3.5 max-w-xs transition-shadow duration-300 hover:shadow-emerald-500/10 cursor-default select-none ${
                  isDark ? "bg-neutral-900/90 border-emerald-500/30 text-white" : "bg-white/95 border-teal-500/40 text-slate-900"
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">Independent Testing Support</div>
                  <div className="font-sans text-[10px] text-neutral-400 uppercase tracking-wider">Verified Quality Assurance</div>
                </div>
              </motion.div>

              {/* Widget 2: Bottom Left - Competitive Wholesale Pricing (Desktop) */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`hidden md:flex absolute -bottom-6 -left-4 sm:left-2 p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl z-20 items-center gap-3.5 max-w-xs transition-shadow duration-300 hover:shadow-teal-500/10 cursor-default select-none ${
                  isDark ? "bg-neutral-900/90 border-teal-500/30 text-white" : "bg-white/95 border-slate-300 text-slate-900"
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider">Competitive Wholesale Pricing</div>
                  <div className="font-sans text-[10px] text-neutral-400 uppercase tracking-wider">International Fulfilment</div>
                </div>
              </motion.div>

            </motion.div>

            {/* Mobile Stacked Verification Cards (Visible strictly on mobile < 768px) */}
            <div className="flex md:hidden flex-col w-full gap-3 pt-2">
              <div 
                className={`p-3.5 rounded-2xl border backdrop-blur-xl flex items-center gap-3.5 w-full ${
                  isDark ? "bg-neutral-900/80 border-emerald-500/25 text-white" : "bg-white border-teal-500/30 text-slate-900 shadow-sm"
                }`}
              >
                <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">Independent Testing Support</div>
                  <div className="font-sans text-[10px] text-neutral-400 uppercase tracking-wider">Verified Quality Assurance</div>
                </div>
              </div>

              <div 
                className={`p-3.5 rounded-2xl border backdrop-blur-xl flex items-center gap-3.5 w-full ${
                  isDark ? "bg-neutral-900/80 border-teal-500/25 text-white" : "bg-white border-slate-300 text-slate-900 shadow-sm"
                }`}
              >
                <div className="h-9 w-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Globe className="h-4.5 w-4.5 text-teal-400" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider">Competitive Wholesale Pricing</div>
                  <div className="font-sans text-[10px] text-neutral-400 uppercase tracking-wider">International Fulfilment</div>
                </div>
              </div>

              {/* Mobile Dedicated "Trusted By" Glass Container */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`w-full mt-6 p-5 pb-6 rounded-3xl border backdrop-blur-xl transition-colors ${
                  isDark
                    ? "bg-neutral-900/60 border-white/10"
                    : "bg-white/70 border-slate-200/80"
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-1.5 mb-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-extrabold text-emerald-400">
                    TRUSTED BY
                  </span>
                  <h3 className={`font-sans text-base font-semibold tracking-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    Global Partners & Institutions
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  {TRUST_PARTNERS.map((partner) => (
                    <motion.div
                      key={partner}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border backdrop-blur-md transition-colors min-h-[44px] ${
                        isDark
                          ? "bg-white/[0.04] border-white/10 text-neutral-200"
                          : "bg-white/90 border-slate-200 text-slate-800"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${isDark ? "bg-emerald-400" : "bg-teal-500"}`} />
                      <span className="font-sans text-[11px] font-medium leading-tight text-left">
                        {partner}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </motion.div>

      {/* =========================================================
          DESKTOP TRUST STRIP (Continuous Marquee Capsules of Partner Segments)
          Hidden on mobile (< md), pristine and untouched on desktop
          ========================================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`hidden md:block relative z-10 w-full max-w-7xl mx-auto mt-6 sm:mt-8 pt-4 sm:pt-6 pb-2 border-t transition-colors ${
          isDark ? "border-white/[0.08]" : "border-slate-200/80"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-5 lg:gap-8">
          
          {/* Section Indicator Label */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className={`h-2 w-2 rounded-full ${isDark ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-teal-600 shadow-[0_0_8px_rgba(13,148,136,0.5)]"}`} />
            <span className={`font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold text-center sm:text-left ${
              isDark ? "text-neutral-300" : "text-slate-600"
            }`}>
              Trusted By Global Partners & Institutions
            </span>
          </div>

          {/* Partner Capsules Grid / Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2 w-full lg:w-auto">
            {TRUST_PARTNERS.map((partner) => (
              <motion.div
                key={partner}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border backdrop-blur-md transition-all duration-200 cursor-default select-none ${
                  isDark 
                    ? "bg-white/[0.04] border-white/10 hover:border-emerald-400/40 text-neutral-300 hover:text-white hover:bg-white/[0.08]" 
                    : "bg-white/80 border-slate-200 hover:border-teal-500/40 text-slate-700 hover:text-slate-900 hover:bg-white shadow-xs"
                }`}
              >
                <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full shrink-0 ${isDark ? "bg-emerald-400" : "bg-teal-600"}`} />
                <span className="font-sans text-[10.5px] sm:text-xs font-medium tracking-tight whitespace-nowrap">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>

    </section>
  );
}
