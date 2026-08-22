/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, 
  Sparkles, FlaskConical, Dna, Zap, Microscope, ShieldCheck, 
  Terminal, ExternalLink, Layers, Activity, Atom, SlidersHorizontal
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface FeaturedProductsProps {
  onNavigate: (pageId: string, filterCategory?: string) => void;
  onSelectProduct?: (peptideId: string) => void;
  theme?: "dark" | "light";
}

interface ProductCardData {
  id: string;
  category: string;
  categoryId: string;
  product: string;
  code: string;
  expandedContent: string;
  icon: React.ElementType;
  molWeight: string;
  purity: string;
  sequence: string;
  visualType: "molecular" | "protein" | "dna" | "droplet" | "lattice" | "neural";
}

const CATEGORIES = [
  { id: "all", label: "ALL CATEGORIES", icon: Layers },
  { id: "weight", label: "WEIGHT MANAGEMENT", icon: FlaskConical },
  { id: "recovery", label: "RECOVERY & PERFORMANCE", icon: Zap },
  { id: "longevity", label: "LONGEVITY", icon: Dna },
  { id: "regenerative", label: "REGENERATIVE & AESTHETIC", icon: Microscope },
  { id: "hormone", label: "HORMONE OPTIMISATION", icon: ShieldCheck },
  { id: "cognitive", label: "COGNITIVE RESEARCH", icon: Terminal },
];

const FEATURED_PRODUCTS: ProductCardData[] = [
  {
    id: "AP-3304",
    category: "WEIGHT MANAGEMENT",
    categoryId: "weight",
    product: "Semaglutide Derivative",
    code: "AP-3304",
    expandedContent: "Premium synthetic GLP-1 analogue featuring highly uniform lipophilic side-chain conjugation.",
    icon: FlaskConical,
    molWeight: "4113.64 Da",
    purity: "≥ 99%",
    sequence: "31 AA",
    visualType: "molecular"
  },
  {
    id: "AP-1571",
    category: "RECOVERY & PERFORMANCE",
    categoryId: "recovery",
    product: "BPC-157 Acetate",
    code: "AP-1571",
    expandedContent: "Stable gastric pentadecapeptide synthesized under strict clean-room protocols.",
    icon: Zap,
    molWeight: "1419.53 Da",
    purity: "≥ 99.5%",
    sequence: "15 AA",
    visualType: "protein"
  },
  {
    id: "AP-8820",
    category: "LONGEVITY",
    categoryId: "longevity",
    product: "Epitalon",
    code: "AP-8820",
    expandedContent: "Synthetic tetrapeptide bioregulator engineered to mimic natural epithalamin.",
    icon: Dna,
    molWeight: "390.35 Da",
    purity: "≥ 99.2%",
    sequence: "4 AA",
    visualType: "dna"
  },
  {
    id: "AP-4071",
    category: "REGENERATIVE & AESTHETIC RESEARCH",
    categoryId: "regenerative",
    product: "GHK-Cu Complex",
    code: "AP-4071",
    expandedContent: "Highly purified tripeptide chelated with divalent copper ions at a precise stoichiometric 1:1 ratio.",
    icon: Microscope,
    molWeight: "404.93 Da",
    purity: "≥ 99.0%",
    sequence: "1:1 Cu²⁺",
    visualType: "droplet"
  },
  {
    id: "AP-5510",
    category: "HORMONE OPTIMISATION",
    categoryId: "hormone",
    product: "Ipamorelin Acetate",
    code: "AP-5510",
    expandedContent: "Highly selective Pentapeptide Growth Hormone Secretagogue (GHS) of extreme chemical stability.",
    icon: ShieldCheck,
    molWeight: "711.86 Da",
    purity: "≥ 99.4%",
    sequence: "5 AA",
    visualType: "lattice"
  },
  {
    id: "AP-7022",
    category: "COGNITIVE RESEARCH",
    categoryId: "cognitive",
    product: "Selank Acetate",
    code: "AP-7022",
    expandedContent: "Synthetic heptapeptide analogue of the endogenous immunomodulatory peptide tuftsin.",
    icon: Terminal,
    molWeight: "751.90 Da",
    purity: "≥ 99.1%",
    sequence: "7 AA",
    visualType: "neural"
  }
];

export default function FeaturedProducts({ onNavigate, onSelectProduct, theme: themeProp }: FeaturedProductsProps) {
  const { theme: contextTheme } = useTheme();
  const theme = themeProp || contextTheme;
  const isDark = theme === "dark";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    "AP-3304": true
  });
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // Filter products based on selected tab
  const filteredProducts = activeCategory === "all" 
    ? FEATURED_PRODUCTS 
    : FEATURED_PRODUCTS.filter(p => p.categoryId === activeCategory);

  // Handle Carousel Scroll Progress
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setActiveCardIndex(0);
      return;
    }
    const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    setScrollProgress(progress);

    const cardWidth = 320; // approximate width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(index, filteredProducts.length - 1));
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [filteredProducts]);

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleViewSpecs = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectProduct) {
      onSelectProduct(id);
    } else {
      onNavigate(`product/${id}`);
    }
  };

  return (
    <section 
      id="flagship-compounds"
      className={`py-20 sm:py-28 px-4 sm:px-8 lg:px-14 relative overflow-hidden transition-colors duration-500 border-t ${
        isDark 
          ? "bg-[#060a0f] border-emerald-500/10 text-white" 
          : "bg-slate-950 border-slate-800 text-white"
      }`}
    >
      {/* Dynamic Background Mesh & Animated Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow halo bottom center */}
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 rounded-full blur-[180px] opacity-70" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: "32px 32px"
          }}
        />
        {/* Floating background glowing nodes */}
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-emerald-400/40 blur-[2px] animate-pulse" />
        <div className="absolute top-1/2 right-16 w-3 h-3 rounded-full bg-teal-400/30 blur-[3px] animate-ping" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-emerald-300/50 blur-[1px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* TOP EDITORIAL HEADER WITH 3D VIAL RENDERING */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>FLAGSHIP REFERENCE COMPOUNDS</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
              Featured Research Peptides
            </h2>

            {/* Paragraph */}
            <p className="font-sans text-sm sm:text-base font-light text-neutral-400 leading-relaxed max-w-xl">
              Discover a curated selection of research-grade peptides supporting scientific discovery across laboratories, biotechnology companies, and research organisations worldwide.
            </p>
          </div>

          {/* Right Header Area: CTA & Interactive Vial Render Pedestal */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-6 w-full lg:w-auto">
            <button
              onClick={() => onNavigate("products")}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]"
            >
              <span>EXPLORE ALL PRODUCTS</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            {/* Decorative 3D Research Vial Graphic Emblem */}
            <div className="hidden sm:flex items-center gap-4 bg-neutral-900/40 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
              <div className="relative w-12 h-14 flex items-center justify-center bg-emerald-950/40 border border-emerald-500/30 rounded-xl overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                <Atom className="h-7 w-7 text-emerald-400 animate-spin" style={{ animationDuration: "16s" }} />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] font-bold text-white uppercase tracking-wider">AURA-SYNTH MATRIX</div>
                <div className="text-[9px] text-emerald-400">HPLC VERIFIED ≥99.5%</div>
              </div>
            </div>
          </div>
        </div>

        {/* LIQUID GLASS CATEGORY FILTER BAR */}
        <div className="mb-10 overflow-x-auto no-scrollbar pb-2">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl min-w-full sm:min-w-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const CategoryIcon = cat.icon;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <CategoryIcon className={`h-3.5 w-3.5 ${isActive ? "text-emerald-400" : "text-neutral-500"}`} />
                  <span>{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryGlow"
                      className="absolute inset-0 rounded-xl bg-emerald-400/5 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CAROUSEL CONTROLS FLOATING SIDE ARROWS & HORIZONTAL CAROUSEL */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Overlay Button */}
          <button
            onClick={scrollPrev}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-neutral-900/90 border border-emerald-500/30 text-emerald-400 items-center justify-center backdrop-blur-md shadow-2xl opacity-80 hover:opacity-100 hover:scale-110 hover:border-emerald-400 transition-all duration-200"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow Overlay Button */}
          <button
            onClick={scrollNext}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-neutral-900/90 border border-emerald-500/30 text-emerald-400 items-center justify-center backdrop-blur-md shadow-2xl opacity-80 hover:opacity-100 hover:scale-110 hover:border-emerald-400 transition-all duration-200"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* HORIZONTAL CAROUSEL CONTAINER */}
          <div
            ref={carouselRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProducts.map((card, idx) => {
              const isExpanded = !!expandedCards[card.id];
              const CategoryIcon = card.icon;

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  onClick={() => toggleCard(card.id)}
                  className={`snap-start shrink-0 cursor-pointer rounded-3xl border transition-all duration-500 relative overflow-hidden flex flex-col justify-between group ${
                    isExpanded
                      ? "w-[320px] sm:w-[360px] bg-neutral-900/90 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                      : "w-[280px] sm:w-[310px] bg-neutral-950/70 hover:bg-neutral-900/80 border-white/10 hover:border-emerald-500/30 shadow-xl"
                  }`}
                >
                  {/* Glass Shimmer Line Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Card Content Top */}
                  <div className="p-6 space-y-4 relative z-10">
                    
                    {/* Header Meta: Category + Code */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                        <CategoryIcon className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{card.category}</span>
                      </div>

                      <span className="font-mono text-[10px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                        {card.code}
                      </span>
                    </div>

                    {/* SCIENTIFIC BIOTECH GRAPHIC CANVAS DISPLAY */}
                    <div className="relative w-full h-44 sm:h-48 rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden flex items-center justify-center p-4 group-hover:border-emerald-500/20 transition-colors duration-500">
                      
                      {/* Radial Background Light Glow */}
                      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent opacity-60" />

                      {/* Custom Rendered Biotech Graphics based on visualType */}
                      {card.visualType === "molecular" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* 3D Ball-and-Stick Molecular Formula Lattice */}
                          <svg className="w-28 h-28 text-emerald-400 animate-pulse" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            <circle cx="30" cy="30" r="6" fill="#10b981" />
                            <circle cx="70" cy="30" r="6" fill="#10b981" />
                            <circle cx="50" cy="65" r="8" fill="#34d399" />
                            <circle cx="20" cy="80" r="5" fill="#059669" />
                            <circle cx="80" cy="80" r="5" fill="#059669" />
                            <line x1="30" y1="30" x2="70" y2="30" strokeWidth="2.5" />
                            <line x1="30" y1="30" x2="50" y2="65" strokeWidth="2.5" />
                            <line x1="70" y1="30" x2="50" y2="65" strokeWidth="2.5" />
                            <line x1="50" y1="65" x2="20" y2="80" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="50" y1="65" x2="80" y2="80" strokeWidth="2" strokeDasharray="3 3" />
                          </svg>
                        </div>
                      )}

                      {card.visualType === "protein" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* 3D Protein Ribbon Folding Graphic */}
                          <svg className="w-28 h-28 text-teal-400" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            <path d="M10,50 Q30,10 50,50 T90,50" strokeWidth="4" strokeLinecap="round" />
                            <path d="M10,50 Q30,90 50,50 T90,50" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
                            <circle cx="50" cy="50" r="12" fill="#14b8a6" fillOpacity="0.2" stroke="#2dd4bf" strokeWidth="2" />
                            <circle cx="30" cy="30" r="4" fill="#5eead4" />
                            <circle cx="70" cy="70" r="4" fill="#5eead4" />
                          </svg>
                        </div>
                      )}

                      {card.visualType === "dna" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* 3D Glowing DNA Helix Lattice */}
                          <svg className="w-28 h-28 text-emerald-300" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            <path d="M25,10 C40,30 60,30 75,10" strokeWidth="3" />
                            <path d="M25,90 C40,70 60,70 75,90" strokeWidth="3" />
                            <path d="M25,10 C40,50 60,50 75,90" strokeWidth="2.5" strokeDasharray="3 3" />
                            <path d="M75,10 C60,50 40,50 25,90" strokeWidth="2.5" strokeDasharray="3 3" />
                            <line x1="32" y1="28" x2="68" y2="28" strokeWidth="2" />
                            <line x1="42" y1="50" x2="58" y2="50" strokeWidth="2" />
                            <line x1="32" y1="72" x2="68" y2="72" strokeWidth="2" />
                          </svg>
                        </div>
                      )}

                      {card.visualType === "droplet" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Aqueous Copper Complex Droplet Spheres */}
                          <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute w-20 h-20 rounded-full border border-sky-400/40 bg-sky-500/10 backdrop-blur-md animate-pulse" />
                            <div className="absolute w-12 h-12 rounded-full border border-emerald-400/60 bg-emerald-400/20 backdrop-blur-md shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                            <div className="absolute w-6 h-6 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                          </div>
                        </div>
                      )}

                      {card.visualType === "lattice" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Honeycomb Hormone Receptor Lattice */}
                          <svg className="w-28 h-28 text-emerald-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polygon points="50,15 75,30 75,60 50,75 25,60 25,30" />
                            <polygon points="50,30 65,40 65,60 50,70 35,60 35,40" strokeDasharray="2 2" />
                            <circle cx="50" cy="50" r="4" fill="#34d399" />
                          </svg>
                        </div>
                      )}

                      {card.visualType === "neural" && (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Neural Network Node Starburst Synapse */}
                          <svg className="w-28 h-28 text-teal-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="50" cy="50" r="10" fill="#2dd4bf" fillOpacity="0.3" stroke="#5eead4" strokeWidth="2" />
                            <line x1="50" y1="50" x2="20" y2="20" />
                            <line x1="50" y1="50" x2="80" y2="20" />
                            <line x1="50" y1="50" x2="20" y2="80" />
                            <line x1="50" y1="50" x2="80" y2="80" />
                            <circle cx="20" cy="20" r="4" fill="#14b8a6" />
                            <circle cx="80" cy="20" r="4" fill="#14b8a6" />
                            <circle cx="20" cy="80" r="4" fill="#14b8a6" />
                            <circle cx="80" cy="80" r="4" fill="#14b8a6" />
                          </svg>
                        </div>
                      )}

                      {/* Corner Tech Tag */}
                      <div className="absolute bottom-2 right-2 font-mono text-[8px] text-emerald-400/80 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        {card.code}
                      </div>
                    </div>

                    {/* Product Name */}
                    <div className="pt-1">
                      <h3 className={`font-sans text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isExpanded ? "text-emerald-300" : "text-white group-hover:text-emerald-300"
                      }`}>
                        {card.product}
                      </h3>
                    </div>

                    {/* Expand Trigger Control Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-neutral-400 font-mono">
                      <span className="group-hover:text-white transition-colors">
                        {isExpanded ? "View Details" : "View Details"}
                      </span>
                      <div className={`p-1 rounded-full border transition-all duration-300 ${
                        isExpanded 
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 rotate-180" 
                          : "bg-white/5 border-white/10 text-neutral-400 group-hover:text-white"
                      }`}>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>

                    {/* EXPANDABLE DRAWER DETAILS */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pt-2"
                        >
                          <div className="space-y-4 pt-2 border-t border-white/10">
                            {/* Full Product Description */}
                            <p className="font-sans text-xs font-light text-neutral-300 leading-relaxed">
                              {card.expandedContent}
                            </p>

                            {/* Key Specifications Grid */}
                            <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-[10px]">
                              <div>
                                <span className="text-neutral-500 block">Molecular Weight</span>
                                <span className="text-white font-semibold">{card.molWeight}</span>
                              </div>
                              <div>
                                <span className="text-neutral-500 block">Purity (HPLC)</span>
                                <span className="text-emerald-400 font-semibold">{card.purity}</span>
                              </div>
                              <div className="col-span-2 pt-1 border-t border-white/5 flex justify-between">
                                <span className="text-neutral-500">Sequence / Ratio</span>
                                <span className="text-neutral-300 font-semibold">{card.sequence}</span>
                              </div>
                            </div>

                            {/* Primary Specification CTA */}
                            <button
                              onClick={(e) => handleViewSpecs(card.id, e)}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono text-[11px] font-extrabold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            >
                              <span>VIEW SPECIFICATIONS</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Card Bottom Glow Accent Line */}
                  <div className={`h-1 w-full transition-all duration-500 ${
                    isExpanded 
                      ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" 
                      : "bg-transparent group-hover:bg-emerald-500/30"
                  }`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM PROGRESS SYSTEM & NAVIGATIONAL INDICATORS */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Index Counter & Progress Bar */}
          <div className="flex items-center gap-4 w-full sm:w-auto max-w-md">
            <span className="font-mono text-xs font-bold text-white">01</span>
            
            <div className="relative flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                style={{ width: `${Math.max((activeCardIndex + 1) / filteredProducts.length * 100, 15)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            <span className="font-mono text-xs font-bold text-neutral-500">
              0{filteredProducts.length}
            </span>
          </div>

          {/* Center Hint Label */}
          <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>0{activeCardIndex + 1} / 0{filteredProducts.length} &nbsp;|&nbsp; SCROLL / DRAG TO EXPLORE</span>
          </div>

          {/* Bottom Arrow Buttons for Mobile / Desktop */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-emerald-500/40 transition-all duration-200"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-emerald-500/40 transition-all duration-200"
              aria-label="Scroll Right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
