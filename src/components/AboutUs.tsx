/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

interface AboutUsProps {
  onContactClick?: () => void;
  onNavigate?: (pageId: string) => void;
  initialTab?: "story" | "partner";
}

export default function AboutUs({ onContactClick, onNavigate }: AboutUsProps) {
  return (
    <article className="min-h-screen bg-neutral-950 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-emerald-500/[0.02] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-teal-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="max-w-4xl">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-emerald-400 font-bold block mb-3">
            ABOUT US
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.15] max-w-3xl">
            We Built the Partner We Wanted to Have
          </h1>
        </motion.div>

        {/* Narrative Flow */}
        <div className="space-y-8 sm:space-y-10">
          
          {/* Section 1: The Origin */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed border-b border-white/[0.08] pb-8 sm:pb-10"
          >
            <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed">
              We entered this space for a simple reason: we encountered the problem ourselves.
            </p>
            <p>
              Having followed the development of the research peptide market closely over the past several years, we experienced first-hand how difficult it could be to consistently access quality research-grade products.
            </p>
            <p className="text-neutral-400 italic">
              Finding reliable sources. Knowing where products came from. Getting clear communication. Maintaining consistency. Navigating changing suppliers and pricing.
            </p>
            <p>
              That experience made one thing clear: there was a need for a supply partner that could offer greater reliability, transparency and consistency.
            </p>
          </motion.section>

          {/* Section 2: Bridging the Gap */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4 border-b border-white/[0.08] pb-12 sm:pb-16"
          >
            <h2 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Bridging the Gap
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                Our pharmaceutical background, global sourcing and distribution experience, and established international network gave us the foundation to approach the problem differently.
              </p>
              <p>
                We recognised that this rapidly growing market needed reliable supply infrastructure to support its continued development.
              </p>
            </div>
          </motion.section>

          {/* Section 3: Built Around Reliability */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 border-b border-white/[0.08] pb-12 sm:pb-16"
          >
            <h2 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Built Around Reliability
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                Our aim is to make it easier for businesses and researchers operating in this space to access the products they need without having to navigate the same challenges we encountered ourselves.
              </p>
              <p>
                We have built relationships with trusted supply partners and developed a network that allows us to source products, support testing requirements and provide additional solutions as our customers&apos; needs evolve.
              </p>
              <p>
                We want our customers to spend less time worrying about where their next product is coming from, and more time focused on the work and businesses that are driving this industry forward.
              </p>
            </div>
          </motion.section>

          {/* Section 4: Supporting an Industry With Enormous Potential */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-4 border-b border-white/[0.08] pb-12 sm:pb-16"
          >
            <h2 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Supporting an Industry With Enormous Potential
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                We believe research peptides have significant potential to contribute to scientific exploration across areas including metabolic health, longevity, recovery, aesthetics, performance and beyond.
              </p>
              <p>
                The industry is still evolving, and there is much more to learn.
              </p>
            </div>
          </motion.section>

          {/* Section 5: Ambition / Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 pt-2"
          >
            <h2 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-emerald-400">
              Our ambition is simple.
            </h2>
            <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl">
              To become a trusted global partner for businesses working with research peptides, and to help this promising industry reach its potential.
            </p>
          </motion.section>

        </div>
      </div>
      </div>
    </article>
  );
}
