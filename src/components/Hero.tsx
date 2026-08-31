/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, ShieldCheck, Cpu, FlaskConical, Award } from "lucide-react";
import { motion } from "motion/react";
import MolecularBackground from "./MolecularBackground";

interface HeroProps {
  onCtaclick: (sectionId: string) => void;
}

export default function Hero({ onCtaclick }: HeroProps) {
  return (
    <section id="hero" className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-neutral-950 px-6 sm:px-8 lg:px-12 py-16 md:py-24">
      {/* Real-time molecular animation background */}
      <div className="absolute inset-0 z-0">
        <MolecularBackground />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/40 to-neutral-950" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Main Copy */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Tagline */}
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex w-fit items-center space-x-2 border-b border-emerald-500/10 pb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400"
            >
              <span>The Sovereign Standard</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.98] font-bold text-white"
            >
              Purity <br className="hidden sm:inline" />
              Without <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-white">
                Compromise
              </span>.
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-sm font-sans text-sm md:text-base leading-relaxed text-neutral-400 font-light"
            >
              Verified compound quality. Formulated for the world’s most demanding clinical research networks.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => onCtaclick("inquiry")}
                className="group flex items-center space-x-2 rounded-full bg-white px-8 py-4 font-sans text-[10px] font-semibold tracking-[0.2em] text-neutral-950 hover:bg-neutral-200 transition-all uppercase"
                id="cta-partner-btn"
              >
                <span>Initiate Sourcing</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-950" strokeWidth={1.2} />
              </button>
              
              <button
                onClick={() => onCtaclick("products")}
                className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 font-sans text-[10px] font-semibold tracking-[0.2em] text-white hover:border-white/20 transition-all uppercase"
                id="cta-catalog-btn"
              >
                Catalogue
              </button>
            </motion.div>
          </div>

          {/* Premium Floating Card / Beautiful Minimal Luxury Product Vial Showcase */}
          <div className="flex items-center justify-center lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-sm rounded-[32px] border border-white/5 bg-gradient-to-b from-neutral-900/10 to-neutral-950/20 p-12 backdrop-blur-2xl shadow-3xl flex flex-col items-center justify-center aspect-[4/5] overflow-hidden"
            >
              {/* Soft interior background glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-emerald-500/[0.04] blur-[80px] pointer-events-none animate-pulse" />
              
              {/* Luxury Geometric Vial Frame */}
              <div className="relative flex flex-col items-center justify-center h-72 w-36 border border-white/10 rounded-full bg-neutral-950/40 shadow-[inset_0_0_30px_rgba(255,255,255,0.03),0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md px-6 py-10 group hover:border-emerald-500/20 transition-all duration-700">
                
                {/* Cap of the vial - modern luxury flat profile */}
                <div className="absolute -top-1 w-14 h-3 bg-neutral-800 border border-white/15 rounded-full" />
                
                {/* Internal dynamic chemical spiral/vortex - minimalist art */}
                <div className="absolute inset-x-0 top-16 bottom-16 flex flex-col items-center justify-center gap-2 pointer-events-none">
                  {/* Glowing nucleus */}
                  <div className="w-12 h-12 rounded-full bg-emerald-500/[0.02] border border-emerald-500/20 flex items-center justify-center animate-ambient-glow">
                    <div className="w-2 h-2 rounded-full bg-emerald-400/40 blur-[1px]" />
                  </div>
                  <div className="h-16 w-[1px] bg-gradient-to-b from-emerald-500/20 via-emerald-400/5 to-transparent" />
                </div>

                {/* Minimalist modern luxury label */}
                <div className="mt-auto w-full bg-neutral-950/90 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm flex flex-col items-center text-center">
                  <span className="font-mono text-[7px] tracking-[0.25em] text-neutral-400 uppercase">B2B PEPS STANDARD</span>
                  <span className="font-sans text-[9px] font-medium text-white mt-1 uppercase tracking-wider">QUALITY TESTED</span>
                  <span className="font-mono text-[7px] text-emerald-400 uppercase tracking-[0.2em] mt-1.5 font-bold">Active Batch</span>
                </div>
              </div>

              {/* Minimalist Badge underneath */}
              <div className="mt-8 flex items-center gap-2.5 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-400">
                  HIGH PURITY SPECIFICATIONS
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Corporate Trust Matrix Grid */}
        <div className="mt-20 md:mt-32 grid grid-cols-2 gap-8 border-t border-white/5 pt-16 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Purity Standard</span>
            </div>
            <span className="font-sans text-lg font-medium text-white">&gt;99.0% Purity</span>
            <span className="font-sans text-xs text-neutral-400 font-light">Batch-specific analytical documentation.</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Formulation Specs</span>
            </div>
            <span className="font-sans text-lg font-medium text-white">Research Grade</span>
            <span className="font-sans text-xs text-neutral-400 font-light">Synthesized under rigorous quality standards.</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Global Logistics</span>
            </div>
            <span className="font-sans text-lg font-medium text-white">Protected Logistics</span>
            <span className="font-sans text-xs text-neutral-400 font-light">Temperature-monitored secure delivery.</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Compliance Audit</span>
            </div>
            <span className="font-sans text-lg font-medium text-white">Molecular Fidelity</span>
            <span className="font-sans text-xs text-neutral-400 font-light">Comprehensive identity & purity checks.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
