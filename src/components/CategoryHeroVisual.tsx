/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

interface CategoryHeroVisualProps {
  categoryId: string;
}

// Map category IDs to their exact home page research directory visual assets & telemetry metadata
const CATEGORY_MEDIA_MAP: Record<
  string,
  {
    title: string;
    image: string;
    code: string;
    metric: string;
  }
> = {
  "weight-management": {
    title: "Weight Management & Metabolic Research",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Adipose_cells_glowing_microscopi__202608221913_stedur.jpg",
    code: "METABOLIC-SYS v9.1",
    metric: "GLUCOSE REGULATION"
  },
  "recovery-regeneration": {
    title: "Recovery & Regeneration",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Regenerating_muscle_fibres_repai__202608221913_p9mg4g.jpg",
    code: "REGEN-MATRIX v8.2",
    metric: "TISSUE REPAIR ASSAY"
  },
  "longevity": {
    title: "Longevity",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406360/Mitochondria_and_DNA_cellular_ag__202608221915_plb22x.jpg",
    code: "CELLULAR-REJ v4.4",
    metric: "TELOMERE ASSAY"
  },
  "aesthetics": {
    title: "Aesthetics",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Skin_cross-section_revealing_der__202608221914_ydssbg.jpg",
    code: "DERMA-COLLAGEN v3.8",
    metric: "EPIDERMAL MATRIX"
  },
  "growth-hormone": {
    title: "Growth Hormone",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Molecules_interacting_with_hormo__202608221914_g8apqb.jpg",
    code: "GH-SOMATO v6.1",
    metric: "SOMATOTROPE PATH"
  },
  "hormonal-health": {
    title: "Hormonal Health",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Electrical_impulses_traveling_ne__202608221914_ki1dq3.jpg",
    code: "ENDOCRINE-MOD v5.5",
    metric: "HOMEOSTASIS PROFILE"
  },
  "cognitive-health": {
    title: "Cognitive Health",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Immune_cells_communicating_via_p__202608221914_r6hakf.jpg",
    code: "NEURO-SYNAPSE v8.3",
    metric: "SYNAPTIC DENSITY"
  },
  "research-support": {
    title: "Research Support",
    image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Red_blood_cells_flowing_vessel_202608221914_zu9htw.jpg",
    code: "LAB-PRECISION v2.4",
    metric: "RECONSTITUTION MATRIX"
  }
};

export default function CategoryHeroVisual({ categoryId }: CategoryHeroVisualProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Normalize categoryId
  let normalized = "weight-management";
  if (categoryId === "recovery-regeneration") {
    normalized = "recovery-regeneration";
  } else if (categoryId === "longevity") {
    normalized = "longevity";
  } else if (categoryId === "aesthetics" || categoryId === "aesthetics-skin-hair") {
    normalized = "aesthetics";
  } else if (
    categoryId === "growth-hormone" ||
    categoryId === "growth-hormone-performance" ||
    categoryId === "growth-hormone-secretagogues" ||
    categoryId === "gh"
  ) {
    normalized = "growth-hormone";
  } else if (
    categoryId === "hormonal-health" ||
    categoryId === "hormonal-sexual-health" ||
    categoryId === "hormone" ||
    categoryId === "hormonal" ||
    categoryId === "hormones"
  ) {
    normalized = "hormonal-health";
  } else if (
    categoryId === "cognitive-health" ||
    categoryId === "cognitive" ||
    categoryId === "cognition" ||
    categoryId === "neurobiology" ||
    categoryId === "cognitive-health-neurobiology"
  ) {
    normalized = "cognitive-health";
  } else if (categoryId === "research-support") {
    normalized = "research-support";
  }

  const media = CATEGORY_MEDIA_MAP[normalized] || CATEGORY_MEDIA_MAP["weight-management"];

  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-square flex items-center justify-center p-2 sm:p-4 select-none">
      
      {/* 1. Organic Ambient Aura (Soft Glow) */}
      <div
        className={`absolute inset-6 rounded-full blur-[80px] opacity-40 transition-colors duration-700 pointer-events-none ${
          isDark ? "bg-emerald-500/25" : "bg-teal-400/30"
        }`}
      />

      {/* 2. Concentric Orbit Rings (Delicate Scientific Compass / Astronomy motif) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-slate-400/20 dark:border-white/10 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 sm:inset-10 rounded-full border border-slate-300/25 dark:border-white/5 pointer-events-none"
      />

      {/* 3. Orbiting Micro Particle Nodes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
        <div className="absolute bottom-4 right-10 w-1.5 h-1.5 rounded-full bg-teal-400/70" />
      </motion.div>

      {/* 4. Fluid Biomorphic Lens / Capsule Frame (Non-Boxy Soft Portal) */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative z-10 w-[78%] sm:w-[82%] aspect-square rounded-full p-2.5 sm:p-3 border backdrop-blur-2xl transition-all duration-700 shadow-2xl group flex items-center justify-center border-slate-200/80 dark:border-white/15 bg-gradient-to-b from-white/80 to-slate-100/50 dark:from-slate-900/60 dark:to-neutral-950/80 shadow-slate-200/50 dark:shadow-emerald-950/30"
      >
        {/* Inner Circular Specimen Chamber */}
        <div className="relative w-full h-full rounded-full overflow-hidden border border-slate-200/60 dark:border-white/10">
          
          {/* Microscope Photograph Layer */}
          <img
            src={media.image}
            alt={media.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.06] transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          />

          {/* Grain Overlay for Cinematic Depth */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Radial Edge Vignette to Softly Dissolve Boundaries */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isDark
                ? "bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.75)_100%)]"
                : "bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)]"
            }`}
          />

          {/* Crosshair Target Center Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25 group-hover:opacity-45 transition-opacity duration-500">
            <div className="w-16 h-16 rounded-full border border-white/40" />
            <div className="absolute w-24 h-[1px] bg-white/30" />
            <div className="absolute h-24 w-[1px] bg-white/30" />
          </div>

          {/* Minimal Floating Bottom Tag */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-md">
              {media.metric}
            </span>
          </div>
        </div>

        {/* Floating Orbital Badge 1 (Top Right) */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1 sm:top-1 -right-2 sm:-right-1 z-20 pointer-events-none"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-xl bg-black/75 border-white/20 text-white shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] font-semibold text-emerald-300">
              {media.code}
            </span>
          </div>
        </motion.div>

        {/* Floating Orbital Badge 2 (Bottom Left) */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1 sm:bottom-1 -left-2 sm:-left-1 z-20 pointer-events-none"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border backdrop-blur-xl bg-black/75 border-white/15 text-white/80 shadow-xl font-mono text-[8.5px] uppercase tracking-[0.18em]">
            <span>ASSAY SPECIMEN</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
