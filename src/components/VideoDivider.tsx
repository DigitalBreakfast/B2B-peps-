/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Sparkles, ShieldCheck } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface VideoDividerProps {
  className?: string;
}

export default function VideoDivider({ className = "" }: VideoDividerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      aria-label="Automated Synthesis & Packaging Process"
      className={`relative w-full overflow-hidden border-y transition-colors duration-500 ${
        isDark ? "border-white/10 bg-neutral-950" : "border-slate-200/90 bg-slate-100"
      } ${className}`}
    >
      {/* Video Container Ribbon: Full Width, Sleek Aspect Ratio / Height */}
      <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden flex items-center justify-center">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02] filter contrast-[1.08] brightness-[0.92] dark:brightness-[0.85]"
          src="https://res.cloudinary.com/ds5s7shuo/video/upload/v1787599833/Bottles_rolling_continuously_202608250059_axlvby.mp4"
        />

        {/* Subtle Top & Bottom Seamless Edge Vignette Gradient */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/50 z-10" 
        />

        {/* Subtle Side Fade Gradients */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" 
        />

        {/* Minimal High-Craft Overlay Metadata Ticker / Eyebrow */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-6 max-w-7xl mx-auto w-full">
          
          {/* Top Row Indicator */}
          <div className="flex items-center justify-between w-full">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-xl bg-black/50 border-white/15 text-white shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-300">
                Automated Vial Packaging
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-xl bg-black/50 border-white/15 text-white/80 shadow-lg font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em]"
            >
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>Sterile Cleanroom Standard</span>
            </motion.div>
          </div>

          {/* Bottom Row Label */}
          <div className="flex items-end justify-between w-full">
            <div className="space-y-0.5">
              <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.25em] text-white/70 block">
                FACILITY STREAM • CONTINUOUS STERILE CONVEYANCE
              </span>
            </div>
            <div className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-emerald-400/90 font-medium">
              ISO 9001:2015 COMPLIANT
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
