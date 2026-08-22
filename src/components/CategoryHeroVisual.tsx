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
  }

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center">
      {/* Outer ambient glow ring */}
      <div
        className={`absolute inset-4 rounded-full blur-[80px] opacity-40 transition-colors duration-700 pointer-events-none ${
          isDark ? "bg-emerald-500/25" : "bg-teal-400/35"
        }`}
      />

      {/* Rotating Background Coordinate Grid Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-slate-400/20 dark:border-white/10 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 sm:inset-12 rounded-full border border-slate-300/30 dark:border-white/5 pointer-events-none"
      />

      {/* Category Specific Scientific Illustration */}
      <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
        {normalized === "weight-management" && <WeightManagementVisual isDark={isDark} />}
        {normalized === "recovery-regeneration" && <RecoveryRegenerationVisual isDark={isDark} />}
        {normalized === "longevity" && <LongevityVisual isDark={isDark} />}
        {normalized === "aesthetics" && <AestheticsVisual isDark={isDark} />}
        {normalized === "growth-hormone" && <GrowthHormoneVisual isDark={isDark} />}
        {normalized === "hormonal-health" && <HormonalHealthVisual isDark={isDark} />}
        {normalized === "cognitive-health" && <CognitiveHealthVisual isDark={isDark} />}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 1. Weight Management & Metabolic Research Visual
 * ------------------------------------------------------------- */
function WeightManagementVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[460px] max-h-[460px]" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="wm-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="wm-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Outer Circular Receptor Ring */}
        <circle cx="200" cy="200" r="150" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} strokeWidth="1.5" />
        <circle cx="200" cy="200" r="110" stroke={isDark ? "rgba(16,185,129,0.2)" : "rgba(13,148,136,0.25)"} strokeWidth="1" strokeDasharray="4 6" />

        {/* Multi-Receptor Triad Axis (GLP-1R / GIPR / GCGR) */}
        <polygon
          points="200,65 315,265 85,265"
          stroke="url(#wm-grad1)"
          strokeWidth="2"
          fill={isDark ? "rgba(16,185,129,0.04)" : "rgba(13,148,136,0.05)"}
        />

        {/* Central Homeostasis Core */}
        <motion.circle
          cx="200"
          cy="200"
          r="42"
          fill={isDark ? "#091e17" : "#ecfdf5"}
          stroke="#10b981"
          strokeWidth="2"
          animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="200" cy="200" r="28" fill="url(#wm-grad1)" />
        <circle cx="200" cy="200" r="10" fill="#ffffff" />

        {/* Tri-Receptor Node Endpoints */}
        {/* Node 1: GLP-1 Receptor (Apex) */}
        <g transform="translate(200, 65)">
          <circle r="18" fill={isDark ? "#064e3b" : "#d1fae5"} stroke="#10b981" strokeWidth="2" />
          <circle r="6" fill="#10b981" />
          <text y="-26" textAnchor="middle" fill={isDark ? "#6ee7b7" : "#065f46"} fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="1.5">
            GLP-1R
          </text>
        </g>

        {/* Node 2: GIP Receptor (Bottom Right) */}
        <g transform="translate(315, 265)">
          <circle r="18" fill={isDark ? "#064e3b" : "#d1fae5"} stroke="#06b6d4" strokeWidth="2" />
          <circle r="6" fill="#06b6d4" />
          <text x="32" y="4" fill={isDark ? "#67e8f9" : "#0e7490"} fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="1.5">
            GIPR
          </text>
        </g>

        {/* Node 3: Glucagon Receptor (Bottom Left) */}
        <g transform="translate(85, 265)">
          <circle r="18" fill={isDark ? "#064e3b" : "#d1fae5"} stroke="#3b82f6" strokeWidth="2" />
          <circle r="6" fill="#3b82f6" />
          <text x="-32" y="4" textAnchor="end" fill={isDark ? "#93c5fd" : "#1d4ed8"} fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="1.5">
            GCGR
          </text>
        </g>

        {/* Flowing Metabolic Wave Vectors */}
        <motion.path
          d="M 60 200 Q 130 140 200 200 T 340 200"
          stroke="url(#wm-glow)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          strokeDasharray="6 8"
        />
        <motion.path
          d="M 60 200 Q 130 260 200 200 T 340 200"
          stroke="url(#wm-glow)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          strokeDasharray="4 6"
        />

        {/* Microscopic Adipose Signalling Particles */}
        <motion.circle cx="150" cy="120" r="3" fill="#10b981" animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="260" cy="140" r="3" fill="#06b6d4" animate={{ y: [4, -4, 4], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3.5, repeat: Infinity }} />
        <motion.circle cx="200" cy="290" r="3" fill="#3b82f6" animate={{ x: [-5, 5, -5], opacity: [0.4, 1, 0.4] }} transition={{ duration: 4, repeat: Infinity }} />
      </svg>

      {/* Floating Micro-Card Metadata */}
      <div className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-mono shadow-xs ${
        isDark ? "bg-slate-900/80 border-white/10 text-emerald-400" : "bg-white/90 border-slate-200 text-teal-800"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>TRI-AGONIST FLUX DYNAMICS</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 2. Recovery & Regeneration Visual
 * ------------------------------------------------------------- */
function RecoveryRegenerationVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[460px] max-h-[460px]" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="rec-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Bio-Scaffold Grid Lattice */}
        <g opacity={isDark ? "0.15" : "0.2"} stroke="currentColor" strokeWidth="1">
          <line x1="50" y1="100" x2="350" y2="100" />
          <line x1="50" y1="200" x2="350" y2="200" />
          <line x1="50" y1="300" x2="350" y2="300" />
          <line x1="100" y1="50" x2="100" y2="350" />
          <line x1="200" y1="50" x2="200" y2="350" />
          <line x1="300" y1="50" x2="300" y2="350" />
        </g>

        {/* High-Tensile Myofibril / Connective Wave Lines */}
        <motion.path
          d="M 50 150 C 130 90, 170 240, 250 160 S 330 220, 370 140"
          stroke="url(#rec-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          d="M 50 200 C 120 160, 180 270, 260 190 S 320 250, 370 190"
          stroke="url(#rec-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <motion.path
          d="M 50 250 C 140 210, 190 310, 270 230 S 330 280, 370 240"
          stroke="url(#rec-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Angiogenic Micro-Capillary Branching */}
        <path d="M 200 200 L 240 120 M 240 120 L 290 100 M 240 120 L 260 80" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 200 200 L 160 280 M 160 280 L 110 300 M 160 280 L 140 330" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />

        {/* Central Bioactive Regeneration Core */}
        <g transform="translate(200, 200)">
          <circle r="36" fill={isDark ? "#082f49" : "#e0f2fe"} stroke="#38bdf8" strokeWidth="2" />
          <circle r="22" fill={isDark ? "#0369a1" : "#bae6fd"} />
          <circle r="10" fill="#ffffff" />
          <motion.circle
            r="48"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Docked Peptides (BPC-157 / TB-500 Nodes) */}
        <g transform="translate(290, 100)">
          <circle r="8" fill="#38bdf8" />
          <text y="-14" textAnchor="middle" fill={isDark ? "#7dd3fc" : "#0369a1"} fontSize="9" fontFamily="monospace" fontWeight="600">
            TB-500
          </text>
        </g>
        <g transform="translate(110, 300)">
          <circle r="8" fill="#34d399" />
          <text y="20" textAnchor="middle" fill={isDark ? "#6ee7b7" : "#047857"} fontSize="9" fontFamily="monospace" fontWeight="600">
            BPC-157
          </text>
        </g>
      </svg>

      <div className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-mono shadow-xs ${
        isDark ? "bg-slate-900/80 border-white/10 text-sky-400" : "bg-white/90 border-slate-200 text-sky-800"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>CYTO-REPAIR MATRIX v8.2</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 3. Longevity & Cellular Longevity Visual
 * ------------------------------------------------------------- */
function LongevityVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[460px] max-h-[460px]" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="long-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Double Helix DNA Wave Strand 1 */}
        <path
          d="M 60 120 C 130 60, 170 340, 240 200 S 310 60, 360 280"
          stroke="url(#long-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Double Helix DNA Wave Strand 2 */}
        <path
          d="M 60 280 C 130 340, 170 60, 240 200 S 310 340, 360 120"
          stroke="url(#long-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Base Pair Rungs */}
        {[
          { x1: 95, y1: 155, x2: 95, y2: 245 },
          { x1: 140, y1: 110, x2: 140, y2: 290 },
          { x1: 190, y1: 230, x2: 190, y2: 170 },
          { x1: 240, y1: 200, x2: 240, y2: 200 },
          { x1: 290, y1: 140, x2: 290, y2: 260 },
          { x1: 335, y1: 190, x2: 335, y2: 210 }
        ].map((rung, idx) => (
          <g key={idx}>
            <line x1={rung.x1} y1={rung.y1} x2={rung.x2} y2={rung.y2} stroke={isDark ? "#a855f7" : "#7c3aed"} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx={rung.x1} cy={rung.y1} r="4.5" fill="#a855f7" />
            <circle cx={rung.x2} cy={rung.y2} r="4.5" fill="#10b981" />
          </g>
        ))}

        {/* Telomeric End Caps & Mitochondrial Energy Ring */}
        <g transform="translate(200, 200)">
          <circle r="44" fill={isDark ? "#2e1065" : "#f3e8ff"} stroke="#a855f7" strokeWidth="2" />
          <circle r="28" fill="url(#long-grad)" opacity="0.8" />
          <circle r="12" fill="#ffffff" />
          <motion.circle
            r="60"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Epigenetic & Peptide Nodes */}
        <g transform="translate(70, 90)">
          <circle r="14" fill={isDark ? "#1e1b4b" : "#ede9fe"} stroke="#6366f1" strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fill={isDark ? "#c7d2fe" : "#4338ca"} fontSize="8" fontFamily="monospace" fontWeight="600">
            EPITH
          </text>
        </g>
        <g transform="translate(340, 310)">
          <circle r="14" fill={isDark ? "#064e3b" : "#d1fae5"} stroke="#10b981" strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fill={isDark ? "#a7f3d0" : "#047857"} fontSize="8" fontFamily="monospace" fontWeight="600">
            GHK
          </text>
        </g>
      </svg>

      <div className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-mono shadow-xs ${
        isDark ? "bg-slate-900/80 border-white/10 text-purple-400" : "bg-white/90 border-slate-200 text-purple-800"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>EPIGENETIC TELOMERE VECTOR</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 4. Aesthetics & Dermal Architecture Visual
 * ------------------------------------------------------------- */
function AestheticsVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[460px] max-h-[460px]" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="aes-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Stratified Dermal Layers Wave */}
        <path d="M 40 100 Q 200 70 360 100" stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"} strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 40 160 Q 200 130 360 160" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
        <path d="M 40 240 Q 200 210 360 240" stroke="#ec4899" strokeWidth="2.5" opacity="0.7" />
        <path d="M 40 310 Q 200 280 360 310" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />

        {/* Central GHK-Cu Copper Coordination Complex */}
        <g transform="translate(200, 200)">
          {/* Octahedral Crystal Lattice Lines */}
          <polygon points="0,-75 65,-25 65,45 0,75 -65,45 -65,-25" stroke="url(#aes-grad)" strokeWidth="2" fill={isDark ? "rgba(236,72,153,0.06)" : "rgba(245,158,11,0.06)"} />
          <line x1="0" y1="-75" x2="0" y2="75" stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} strokeWidth="1.5" />
          <line x1="-65" y1="-25" x2="65" y2="45" stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} strokeWidth="1.5" />
          <line x1="-65" y1="45" x2="65" y2="-25" stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} strokeWidth="1.5" />

          {/* Central Copper [Cu2+] Ion Core */}
          <circle r="30" fill={isDark ? "#451a03" : "#fef3c7"} stroke="#f59e0b" strokeWidth="2" />
          <circle r="18" fill="#06b6d4" />
          <circle r="8" fill="#ffffff" />
          <text y="4" textAnchor="middle" fill="#082f49" fontSize="10" fontFamily="monospace" fontWeight="bold">
            Cu²⁺
          </text>

          {/* Ligand Amino Acid Binding Coordinates */}
          <circle cx="0" cy="-75" r="7" fill="#ec4899" />
          <circle cx="65" cy="-25" r="7" fill="#f59e0b" />
          <circle cx="65" cy="45" r="7" fill="#06b6d4" />
          <circle cx="0" cy="75" r="7" fill="#ec4899" />
          <circle cx="-65" cy="45" r="7" fill="#f59e0b" />
          <circle cx="-65" cy="-25" r="7" fill="#06b6d4" />
        </g>

        {/* Collagen Triple-Helix Microfibers */}
        <motion.path
          d="M 80 80 Q 140 180 200 80 T 320 80"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 3"
          animate={{ strokeDashoffset: [0, 50] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-mono shadow-xs ${
        isDark ? "bg-slate-900/80 border-white/10 text-amber-400" : "bg-white/90 border-slate-200 text-amber-800"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>GHK-Cu DERMAL COORDINATION</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 5. Growth Hormone & Performance Visual
 * ------------------------------------------------------------- */
function GrowthHormoneVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[460px] max-h-[460px]" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="gh-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Somatotropic Pulsatile Waveform Curve */}
        <motion.path
          d="M 40 200 C 90 200, 110 90, 140 90 C 170 90, 180 280, 210 280 C 240 280, 250 140, 280 140 C 310 140, 330 200, 360 200"
          stroke="url(#gh-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          strokeDasharray="12 4"
        />

        {/* Pituitary & GHRH Secretagogue Axis Nodes */}
        <g transform="translate(140, 90)">
          <circle r="22" fill={isDark ? "#064e3b" : "#d1fae5"} stroke="#10b981" strokeWidth="2" />
          <circle r="10" fill="#10b981" />
          <text y="-28" textAnchor="middle" fill={isDark ? "#6ee7b7" : "#047857"} fontSize="9" fontFamily="monospace" fontWeight="600">
            CJC-1295 / GHRH
          </text>
        </g>

        <g transform="translate(280, 140)">
          <circle r="20" fill={isDark ? "#451a03" : "#fef3c7"} stroke="#f59e0b" strokeWidth="2" />
          <circle r="9" fill="#f59e0b" />
          <text y="32" textAnchor="middle" fill={isDark ? "#fcd34d" : "#b45309"} fontSize="9" fontFamily="monospace" fontWeight="600">
            IPAMORELIN
          </text>
        </g>

        {/* Central Somatotroph Receptor Hub */}
        <g transform="translate(200, 200)">
          <circle r="36" fill={isDark ? "#111827" : "#f3f4f6"} stroke="#10b981" strokeWidth="2" />
          <circle r="20" fill="url(#gh-grad)" opacity="0.85" />
          <circle r="8" fill="#ffffff" />
          <motion.circle
            r="50"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </g>
      </svg>

      <div className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-mono shadow-xs ${
        isDark ? "bg-slate-900/80 border-white/10 text-emerald-400" : "bg-white/90 border-slate-200 text-teal-800"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SOMATOTROPIC AXIS PULSATILITY</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 6. Hormonal Health Visual
 * ------------------------------------------------------------- */
function HormonalHealthVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[460px] max-h-[460px]" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="horm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Endocrine Loop Rings */}
        <circle cx="200" cy="200" r="140" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} strokeWidth="1.5" />
        <ellipse cx="200" cy="200" rx="150" ry="70" stroke="url(#horm-grad)" strokeWidth="2" transform="rotate(-30 200 200)" />
        <ellipse cx="200" cy="200" rx="150" ry="70" stroke="url(#horm-grad)" strokeWidth="2" transform="rotate(30 200 200)" opacity="0.7" />

        {/* Central Homeostasis Core */}
        <g transform="translate(200, 200)">
          <circle r="36" fill={isDark ? "#3b0764" : "#f5f3ff"} stroke="#8b5cf6" strokeWidth="2" />
          <circle r="22" fill="url(#horm-grad)" />
          <circle r="8" fill="#ffffff" />
        </g>

        {/* Endocrine Receptor Nodes */}
        <g transform="translate(90, 140)">
          <circle r="14" fill={isDark ? "#831843" : "#fce7f3"} stroke="#ec4899" strokeWidth="1.5" />
          <circle r="5" fill="#ec4899" />
          <text y="-18" textAnchor="middle" fill={isDark ? "#f472b6" : "#be185d"} fontSize="9" fontFamily="monospace" fontWeight="600">
            KISSPEPTIN
          </text>
        </g>
        <g transform="translate(310, 260)">
          <circle r="14" fill={isDark ? "#172554" : "#dbeafe"} stroke="#3b82f6" strokeWidth="1.5" />
          <circle r="5" fill="#3b82f6" />
          <text y="24" textAnchor="middle" fill={isDark ? "#60a5fa" : "#1d4ed8"} fontSize="9" fontFamily="monospace" fontWeight="600">
            PT-141
          </text>
        </g>
      </svg>

      <div className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-mono shadow-xs ${
        isDark ? "bg-slate-900/80 border-white/10 text-pink-400" : "bg-white/90 border-slate-200 text-pink-800"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          <span>ENDOCRINE AXIS MODULATION</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 7. Cognitive Health & Neurobiology Visual
 * ------------------------------------------------------------- */
function CognitiveHealthVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full max-w-[460px] max-h-[460px]" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="cog-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Synaptic Density Arbor Lines */}
        <g stroke="url(#cog-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8">
          <line x1="200" y1="200" x2="120" y2="100" />
          <line x1="200" y1="200" x2="280" y2="100" />
          <line x1="200" y1="200" x2="310" y2="230" />
          <line x1="200" y1="200" x2="250" y2="310" />
          <line x1="200" y1="200" x2="130" y2="300" />
          <line x1="200" y1="200" x2="90" y2="210" />

          {/* Sub-branches */}
          <line x1="120" y1="100" x2="70" y2="80" />
          <line x1="120" y1="100" x2="130" y2="50" />
          <line x1="280" y1="100" x2="330" y2="80" />
          <line x1="280" y1="100" x2="270" y2="50" />
          <line x1="310" y1="230" x2="360" y2="220" />
          <line x1="250" y1="310" x2="270" y2="360" />
          <line x1="130" y1="300" x2="90" y2="340" />
          <line x1="90" y1="210" x2="50" y2="230" />
        </g>

        {/* Synaptic Cleft Action Potential Pulses */}
        <motion.circle cx="160" cy="150" r="4" fill="#06b6d4" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="240" cy="150" r="4" fill="#3b82f6" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }} />
        <motion.circle cx="255" cy="215" r="4" fill="#8b5cf6" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }} />

        {/* Primary Soma Core (Neuron Body) */}
        <g transform="translate(200, 200)">
          <circle r="38" fill={isDark ? "#083344" : "#e0f2fe"} stroke="#06b6d4" strokeWidth="2" />
          <circle r="22" fill="url(#cog-grad)" />
          <circle r="8" fill="#ffffff" />
          <motion.circle
            r="52"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Synaptic Terminal Nodes */}
        <g transform="translate(120, 100)">
          <circle r="14" fill={isDark ? "#164e63" : "#cffafe"} stroke="#06b6d4" strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fill={isDark ? "#67e8f9" : "#0891b2"} fontSize="8" fontFamily="monospace" fontWeight="600">
            SEMAX
          </text>
        </g>
        <g transform="translate(280, 100)">
          <circle r="14" fill={isDark ? "#1e1b4b" : "#ede9fe"} stroke="#8b5cf6" strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fill={isDark ? "#c7d2fe" : "#6d28d9"} fontSize="8" fontFamily="monospace" fontWeight="600">
            SELANK
          </text>
        </g>
      </svg>

      <div className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-mono shadow-xs ${
        isDark ? "bg-slate-900/80 border-white/10 text-cyan-400" : "bg-white/90 border-slate-200 text-cyan-800"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>NEURO-SYNAPTIC SIGNAL DYNAMICS</span>
        </div>
      </div>
    </div>
  );
}
