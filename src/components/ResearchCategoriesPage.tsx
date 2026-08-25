/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  ChevronRight, 
  Atom, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Mail, 
  Compass,
  Activity,
  Dna,
  Zap,
  TrendingUp,
  ShieldCheck,
  Brain,
  FlaskConical
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ResearchCategoriesPageProps {
  onNavigate: (pageId: string) => void;
  onContactClick?: (subject?: string) => void;
}

interface CategoryCardItem {
  number: string;
  id: string;
  title: string;
  description: string;
  image: string;
  code: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    number: "01",
    id: "weight-management",
    title: "Weight Management",
    description: "Peptides focused on metabolism, appetite regulation, glucose balance and body composition.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Adipose_cells_glowing_microscopi__202608221913_stedur.jpg",
    code: "METABOLIC-SYS v9.1",
    tag: "Metabolic Signalling",
    icon: Activity
  },
  {
    number: "02",
    id: "recovery-regeneration",
    title: "Recovery & Regeneration",
    description: "Peptides supporting tissue repair, recovery, healing and regenerative biology.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Regenerating_muscle_fibres_repai__202608221913_p9mg4g.jpg",
    code: "REGEN-MATRIX v8.2",
    tag: "Tissue Repair Assays",
    icon: Zap
  },
  {
    number: "03",
    id: "longevity",
    title: "Longevity",
    description: "Peptides centred on healthy ageing, cellular function, mitochondrial health and longevity.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406360/Mitochondria_and_DNA_cellular_ag__202608221915_plb22x.jpg",
    code: "CELLULAR-REJ v4.4",
    tag: "Mitochondrial Dynamics",
    icon: Dna
  },
  {
    number: "04",
    id: "aesthetics",
    title: "Aesthetics",
    description: "Peptides for skin health, collagen production, pigmentation, hair biology and cosmetic applications.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Skin_cross-section_revealing_der__202608221914_ydssbg.jpg",
    code: "DERMA-COLLAGEN v3.8",
    tag: "Extracellular Matrix",
    icon: Sparkles
  },
  {
    number: "05",
    id: "growth-hormone",
    title: "Growth Hormone",
    description: "Peptides involved in growth hormone pathways, muscle physiology, performance and recovery.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Molecules_interacting_with_hormo__202608221914_g8apqb.jpg",
    code: "GH-SOMATO v6.1",
    tag: "Somatotropic Axis",
    icon: TrendingUp
  },
  {
    number: "06",
    id: "hormonal-health",
    title: "Hormonal Health",
    description: "Peptides supporting endocrine function, reproductive health, hormone balance and fertility.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Electrical_impulses_traveling_ne__202608221914_ki1dq3.jpg",
    code: "ENDOCRINE-MOD v5.5",
    tag: "Endocrine Regulation",
    icon: ShieldCheck
  },
  {
    number: "07",
    id: "cognitive-health",
    title: "Cognitive Health",
    description: "Peptides related to memory, learning, neuroprotection, sleep and brain function.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Immune_cells_communicating_via_p__202608221914_r6hakf.jpg",
    code: "NEURO-SYNAPSE v8.3",
    tag: "Neurotrophic Factors",
    icon: Brain
  },
  {
    number: "08",
    id: "research-support",
    title: "Research Support",
    description: "Essential laboratory solutions and supporting products for peptide preparation and handling.",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Red_blood_cells_flowing_vessel_202608221914_zu9htw.jpg",
    code: "LAB-PRECISION v2.4",
    tag: "Reconstitution & Buffers",
    icon: FlaskConical
  }
];

export default function ResearchCategoriesPage({ onNavigate, onContactClick }: ResearchCategoriesPageProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleContact = () => {
    if (onContactClick) {
      onContactClick("Research Categories Inquiry");
    } else {
      onNavigate("contact");
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDark ? "text-white" : "text-slate-900"
    }`}>

      {/* =========================================================
          HERO SECTION: Large Full-Width Editorial Hero
          ========================================================= */}
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Subtle Background Scientific Grid & Ambient Floating Glows */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scientific Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full stroke-emerald-500/10 fill-none pointer-events-none" width="100%" height="100%">
            <pattern id="categories-grid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
              <circle cx="0" cy="0" r="1.5" className="fill-emerald-400/40" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#categories-grid)" />
          </svg>

          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-[10%] w-[380px] h-[380px] bg-emerald-400/8 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className={`font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Research-Grade Peptides. <span className={isDark ? "text-emerald-400" : "text-teal-600"}>Commercial-Scale Partnerships.</span>
            </h1>
          </motion.div>

          {/* Subtitle / Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`font-sans text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-light ${
              isDark ? "text-neutral-300" : "text-slate-600"
            }`}
          >
            Explore our portfolio of research-grade peptides across eight specialised areas of scientific research. Each category has been carefully curated to support researchers, clinics, laboratories and commercial partners with high-quality investigational compounds.
          </motion.p>

        </div>
      </section>

      {/* =========================================================
          CATEGORY GALLERY: 4 Columns × 2 Rows on Desktop
          ========================================================= */}
      <section 
        id="category-gallery" 
        className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* The 4x2 Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  onNavigate(`research/${category.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`group relative flex flex-col justify-between rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 backdrop-blur-xl shadow-lg hover:-translate-y-1.5 ${
                  isDark
                    ? "bg-neutral-900/70 border-white/10 hover:border-emerald-500/50 hover:shadow-[0_15px_35px_rgba(52,211,153,0.15)]"
                    : "bg-white/90 border-slate-200/90 hover:border-teal-500/50 hover:shadow-[0_15px_30px_rgba(13,148,136,0.12)]"
                }`}
              >
                {/* Visual Image Header (Slightly smaller, focused height) */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black/40">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Scrim at bottom of image */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDark 
                      ? "from-neutral-900/90 via-transparent to-black/30" 
                      : "from-white/90 via-transparent to-black/20"
                  }`} />

                  {/* Top Badge: Micro Category Icon */}
                  <div className="absolute top-3 right-3 flex items-center justify-end z-10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-all duration-300">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Content Area: Title & Description */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3 text-left">
                  <div className="space-y-1.5">
                    {/* Category Title */}
                    <h3 className={`font-sans text-lg font-bold tracking-tight transition-colors duration-300 ${
                      isDark ? "text-white group-hover:text-emerald-300" : "text-slate-900 group-hover:text-teal-700"
                    }`}>
                      {category.title}
                    </h3>

                    {/* Short Description */}
                    <p className={`font-sans text-xs leading-relaxed font-light line-clamp-3 ${
                      isDark ? "text-neutral-300" : "text-slate-600"
                    }`}>
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Inner Accent Border on Hover */}
                <div className="absolute inset-0 rounded-2xl border border-emerald-400/0 group-hover:border-emerald-400/30 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          BOTTOM SECTION: Clean Scientific Compound Inquiry CTA
          ========================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
        
        {/* Soft Background Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

          {/* Heading */}
          <h2 className={`font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Looking for a specific research compound?
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Contact Our Team */}
            <button
              onClick={handleContact}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-mono text-[10.5px] uppercase tracking-[0.2em] font-extrabold transition-all duration-300 cursor-pointer shadow-xl hover:scale-[1.03] active:scale-[0.98] ${
                isDark
                  ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                  : "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_8px_25px_rgba(13,148,136,0.25)]"
              }`}
            >
              <span>Contact Our Team</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
