/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, ChevronLeft, ChevronRight, Sparkles, Activity, 
  Dna, Microscope, Zap, ShieldCheck, TrendingUp, Brain, FlaskConical 
} from "lucide-react";

interface ResearchDirectoryProps {
  onNavigate: (pageId: string, filterCategory?: string) => void;
  theme: "dark" | "light";
}

const CATEGORIES = [
  {
    number: "01",
    id: "weight-management",
    title: "Weight Management",
    description: "Peptides focused on metabolism, appetite regulation, glucose balance, and body composition.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Adipose_cells_glowing_microscopi__202608221913_stedur.jpg",
    code: "METABOLIC-SYS v9.1",
    metric: "GLUCOSE REGULATION",
    visualIcon: Activity
  },
  {
    number: "02",
    id: "recovery-regeneration",
    title: "Recovery & Regeneration",
    description: "Peptides supporting tissue repair, recovery, healing, and regenerative biology.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Regenerating_muscle_fibres_repai__202608221913_p9mg4g.jpg",
    code: "REGEN-MATRIX v8.2",
    metric: "TISSUE REPAIR ASSAY",
    visualIcon: Zap
  },
  {
    number: "03",
    id: "longevity",
    title: "Longevity",
    description: "Peptides centred on healthy ageing, cellular function, mitochondrial health, and longevity.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406360/Mitochondria_and_DNA_cellular_ag__202608221915_plb22x.jpg",
    code: "CELLULAR-REJ v4.4",
    metric: "TELOMERE ASSAY",
    visualIcon: Dna
  },
  {
    number: "04",
    id: "aesthetics",
    title: "Aesthetics",
    description: "Peptides for skin health, collagen production, pigmentation, hair biology, and cosmetic applications.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Skin_cross-section_revealing_der__202608221914_ydssbg.jpg",
    code: "DERMA-COLLAGEN v3.8",
    metric: "EPIDERMAL MATRIX",
    visualIcon: Sparkles
  },
  {
    number: "05",
    id: "growth-hormone",
    title: "Growth Hormone",
    description: "Peptides involved in growth hormone pathways, muscle physiology, performance, and recovery.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Molecules_interacting_with_hormo__202608221914_g8apqb.jpg",
    code: "GH-SOMATO v6.1",
    metric: "SOMATOTROPE PATH",
    visualIcon: TrendingUp
  },
  {
    number: "06",
    id: "hormonal-health",
    title: "Hormonal Health",
    description: "Peptides supporting endocrine function, reproductive health, hormone balance, and fertility.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Electrical_impulses_traveling_ne__202608221914_ki1dq3.jpg",
    code: "ENDOCRINE-MOD v5.5",
    metric: "HOMEOSTASIS PROFILE",
    visualIcon: ShieldCheck
  },
  {
    number: "07",
    id: "cognitive-health",
    title: "Cognitive Health",
    description: "Peptides related to memory, learning, neuroprotection, sleep, and brain function.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Immune_cells_communicating_via_p__202608221914_r6hakf.jpg",
    code: "NEURO-SYNAPSE v8.3",
    metric: "SYNAPTIC DENSITY",
    visualIcon: Brain
  },
  {
    number: "08",
    id: "research-support",
    title: "Research Support",
    description: "Essential laboratory solutions and supporting products for peptide preparation and handling.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Red_blood_cells_flowing_vessel_202608221914_zu9htw.jpg",
    code: "LAB-PRECISION v2.4",
    metric: "RECONSTITUTION MATRIX",
    visualIcon: FlaskConical
  }
];

export default function ResearchDirectory({ onNavigate, theme }: ResearchDirectoryProps) {
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag & Scroll State
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const hasDraggedRef = useRef(false);

  // Mouse Spotlight
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // Handle Horizontal Scroll Calculations
  const updateScrollProgress = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);

    // Calculate active card index
    const cardWidth = 360; // Approx card width + gap
    const index = Math.min(
      CATEGORIES.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveCardIndex(index);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollProgress);
    return () => el.removeEventListener("scroll", updateScrollProgress);
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    hasDraggedRef.current = false;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    if (Math.abs(x - startX) > 6) {
      hasDraggedRef.current = true;
    }
    e.preventDefault();
    const walk = (x - startX) * 1.8; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Scroll Controls
  const scrollNext = () => {
    if (!scrollContainerRef.current) return;
    const isMobile = window.innerWidth < 640;
    scrollContainerRef.current.scrollBy({ left: isMobile ? 296 : 360, behavior: "smooth" });
  };

  const scrollPrev = () => {
    if (!scrollContainerRef.current) return;
    const isMobile = window.innerWidth < 640;
    scrollContainerRef.current.scrollBy({ left: isMobile ? -296 : -360, behavior: "smooth" });
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden transition-colors duration-700 select-none ${
        isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* =========================================================
          BACKGROUND: Animated Scientific Mesh, Particle System & Grid
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Interactive Specular Cursor Spotlight */}
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(1000px circle at ${mousePos.x}% ${mousePos.y}%, ${
              isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(13, 148, 136, 0.07)"
            }, transparent 70%)`
          }}
        />

        {/* Soft Volumetric Background Lighting Glows */}
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-emerald-500/[0.06] blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 -right-40 w-[650px] h-[650px] bg-teal-500/[0.06] blur-[160px] rounded-full" />

        {/* Blueprint Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#fff' : '#000'} 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Technical Coordinate Blueprint Vectors */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-500/10 fill-none pointer-events-none" width="100%" height="100%">
          <pattern id="directory-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="1.5" className="fill-emerald-400/40" />
            <circle cx="160" cy="0" r="1.5" className="fill-emerald-400/40" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#directory-grid)" />
        </svg>

        {/* Rotating Orbital Vectors */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[5%] w-[500px] h-[500px] border border-emerald-500/10 rounded-full border-dashed pointer-events-none"
        />
      </div>

      {/* =========================================================
          TOP AREA: EDITORIAL HEADER
          ========================================================= */}
      <div className="mx-auto w-full max-w-7xl relative z-10 mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          
          {/* LEFT: Eyebrow + Heading + Description */}
          <div className="space-y-2.5 max-w-2xl">
            {/* EYEBROW */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-400">
                RESEARCH DIRECTORY
              </span>
              <div className="h-[1px] w-10 bg-gradient-to-r from-emerald-400 to-transparent" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
            </motion.div>

            {/* HEADING */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Research Categories
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className={`font-sans text-xs sm:text-sm leading-relaxed ${
                isDark ? "text-neutral-300 font-light" : "text-slate-600 font-normal"
              }`}
            >
              Explore our portfolio of research-grade peptides across key areas of scientific research and commercial interest.
            </motion.p>
          </div>

          {/* RIGHT: CTA + Scroll Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* TOP CTA */}
            <button
              onClick={() => onNavigate("products")}
              className={`group relative inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] font-extrabold transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                isDark 
                  ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_20px_rgba(52,211,153,0.25)]" 
                  : "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_6px_20px_rgba(13,148,136,0.25)]"
              }`}
            >
              <span>Explore All Products</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* ARROW CONTROLS */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous Category"
                className={`p-2.5 rounded-full border backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                  isDark 
                    ? "border-white/15 bg-white/[0.05] hover:bg-white/10 text-white hover:border-emerald-500/50" 
                    : "border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={scrollNext}
                aria-label="Next Category"
                className={`p-2.5 rounded-full border backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                  isDark 
                    ? "border-white/15 bg-white/[0.05] hover:bg-white/10 text-white hover:border-emerald-500/50" 
                    : "border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          MAIN EXPERIENCE: HORIZONTALLY SCROLLING RESEARCH DIRECTORY
          ========================================================= */}
      <div className="w-full relative z-10 py-1">
        
        {/* SCROLL CONTAINER (Drag & Touch Enabled) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleDragMove}
          className={`flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-5 pt-2 px-2 sm:px-4 ${
            isMouseDown ? "scroll-auto" : ""
          }`}
          style={{ scrollSnapType: isMouseDown ? "none" : "x mandatory" }}
        >
          {CATEGORIES.map((cat, index) => {
            const isActive = activeCardIndex === index;
            const VisualIcon = cat.visualIcon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                style={{ scrollSnapAlign: "center" }}
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    onNavigate(`research/${cat.id}`);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigate(`research/${cat.id}`);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${cat.title} research category`}
                className={`relative shrink-0 w-[280px] sm:w-[320px] lg:w-[330px] rounded-2xl sm:rounded-3xl overflow-hidden border backdrop-blur-2xl transition-all duration-400 flex flex-col justify-between group cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                  isActive 
                    ? isDark 
                      ? "scale-[1.01] border-emerald-500/50 bg-neutral-900/90 shadow-[0_15px_40px_rgba(52,211,153,0.15)]" 
                      : "scale-[1.01] border-teal-500/50 bg-white shadow-[0_15px_35px_rgba(13,148,136,0.15)]"
                    : isDark 
                      ? "border-white/10 bg-neutral-900/60 opacity-85 hover:opacity-100 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-[0_10px_30px_rgba(52,211,153,0.1)]" 
                      : "border-slate-200/90 bg-white/80 opacity-90 hover:opacity-100 hover:scale-[1.02] hover:border-teal-500/30 hover:shadow-[0_10px_30px_rgba(13,148,136,0.1)]"
                }`}
              >
                {/* ---------------------------------------------------
                    TOP HALF: Biotechnology Image
                    --------------------------------------------------- */}
                <div className="relative h-[160px] sm:h-[180px] w-full overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-108 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 ${
                    isDark 
                      ? "bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" 
                      : "bg-gradient-to-t from-white via-white/30 to-transparent"
                  }`} />

                  {/* Top HUD Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="font-mono text-[8px] bg-black/65 border border-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-400 font-extrabold uppercase tracking-wider backdrop-blur-md">
                      {cat.code}
                    </span>

                    <span className="font-mono text-[8px] text-neutral-300 uppercase tracking-wider bg-black/65 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
                      {cat.metric}
                    </span>
                  </div>

                  {/* Molecular Icon Graphic Float */}
                  <div className="absolute bottom-3 right-3 h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-emerald-500/20 backdrop-blur-xl border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow group-hover:scale-110 transition-transform">
                    <VisualIcon className="h-4 w-4" />
                  </div>
                </div>

                {/* ---------------------------------------------------
                    BOTTOM HALF: Content Panel
                    --------------------------------------------------- */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
                  
                  <div className="space-y-1.5">
                    {/* Category Number & Title */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base sm:text-lg font-extrabold text-emerald-400">
                        {cat.number}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                      <h3 className={`font-sans text-sm sm:text-base font-semibold tracking-tight transition-colors ${
                        isActive 
                          ? (isDark ? "text-white" : "text-slate-900") 
                          : (isDark ? "text-neutral-200 group-hover:text-emerald-300" : "text-slate-800 group-hover:text-teal-700")
                      }`}>
                        {cat.title}
                      </h3>
                    </div>

                    {/* Exact Description */}
                    <p className={`font-sans text-[11px] sm:text-xs leading-relaxed line-clamp-2 ${
                      isDark ? "text-neutral-300 font-light" : "text-slate-600 font-normal"
                    }`}>
                      {cat.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-1">
                    <div
                      className={`group/btn w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl border font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                        isDark 
                          ? "bg-white/[0.04] border-white/15 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 text-white group-hover:text-emerald-300" 
                          : "bg-slate-100 border-slate-200 group-hover:bg-teal-50 group-hover:border-teal-400 text-slate-800 group-hover:text-teal-800"
                      }`}
                    >
                      <span>Access Category</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 text-emerald-400" />
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* =========================================================
          BOTTOM PROGRESS BAR & INDICATORS
          ========================================================= */}
      <div className="mx-auto w-full max-w-7xl relative z-10 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
          
          {/* Active Category Counter */}
          <div className={`font-mono text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
            CATEGORY <span className={isDark ? "text-emerald-400" : "text-teal-600"}>{CATEGORIES[activeCardIndex].number}</span> / {CATEGORIES.length < 10 ? `0${CATEGORIES.length}` : CATEGORIES.length} — <span className={isDark ? "text-white" : "text-slate-900"}>{CATEGORIES[activeCardIndex].title}</span>
          </div>

          {/* Research Progress Bar */}
          <div className="w-full sm:w-60 h-1 rounded-full bg-neutral-800 overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
              style={{ width: `${Math.max(16, scrollProgress)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Drag Instruction */}
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 hidden lg:block">
            SWIPE OR DRAG TO EXPLORE
          </div>

        </div>
      </div>

    </section>
  );
}
