/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface AboutUsProps {
  onContactClick?: () => void;
  onNavigate?: (pageId: string) => void;
  initialTab?: "story" | "partner";
}

export default function AboutUs({}: AboutUsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <article
      id="about-us-page"
      className={`min-h-screen pt-20 pb-16 sm:pt-24 sm:pb-20 relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-neutral-950 text-white selection:bg-emerald-500/30 selection:text-emerald-300"
          : "bg-white text-slate-900 selection:bg-teal-500/20 selection:text-teal-800"
      }`}
    >
      {/* Ambient background soft light accents */}
      <div className="absolute top-20 right-0 w-[550px] h-[550px] rounded-full bg-teal-500/[0.03] blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.025] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] rounded-full bg-teal-500/[0.025] blur-[180px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-12 sm:space-y-16 md:space-y-20">

        {/* ========================================================
            SECTION 01 — HERO
            ======================================================== */}
        <section id="about-hero" className="relative pt-1 sm:pt-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column: Eyebrow, Large Heading, Opening Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-7 space-y-4 sm:space-y-5"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-teal-600 dark:text-emerald-400 font-bold block">
                  ABOUT B2B PEPS
                </span>
                
                <h1 className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold tracking-tight leading-[1.14] ${
                  isDark ? "text-white" : "text-[#0B1B3D]"
                }`}>
                  We Built the Partner We Wanted to Have
                </h1>
              </div>

              <p className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl ${
                isDark ? "text-neutral-300" : "text-slate-600"
              }`}>
                We entered this space for a simple reason: we encountered the problem ourselves.
              </p>
            </motion.div>

            {/* Right Column: Large Premium Laboratory Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/15 to-emerald-400/10 rounded-[32px] blur-xl opacity-60 pointer-events-none" />
              
              <div className={`relative rounded-[28px] sm:rounded-[32px] overflow-hidden border p-1.5 shadow-xl transition-all duration-500 ${
                isDark 
                  ? "bg-neutral-900/60 border-white/15 shadow-black/60" 
                  : "bg-white/90 border-slate-200/90 shadow-slate-200/60"
              }`}>
                <div className="relative rounded-[24px] sm:rounded-[26px] overflow-hidden aspect-[4/3.8]">
                  <img
                    src="https://res.cloudinary.com/ds5s7shuo/image/upload/v1788181389/Global_supply_network_map_202608311832_fsbmbz.jpg"
                    alt="Global supply network map with interconnected international distribution channels"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>


        {/* ========================================================
            SECTION 02 — OUR STORY
            ======================================================== */}
        <section id="about-our-story" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
          >
            {/* Story Paragraph 1 */}
            <p className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed ${
              isDark ? "text-neutral-200" : "text-slate-700"
            }`}>
              Having followed the development of the research peptide market closely over the past several years, we experienced first-hand how difficult it could be to consistently access quality research-grade products.
            </p>

            {/* Visual Focal Point: Large Visual Pull Quote */}
            <div className={`p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[30px] border transition-all duration-500 relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 border-emerald-500/20 shadow-2xl shadow-black/60"
                : "bg-gradient-to-b from-teal-50/60 to-slate-50/80 border-teal-200/80 shadow-md"
            }`}>
              <div className="absolute top-4 left-4 opacity-20 pointer-events-none text-teal-600 dark:text-emerald-400">
                <Quote className="h-12 w-12 -scale-x-100" />
              </div>

              <blockquote className="relative z-10 space-y-3">
                <p className={`font-sans text-lg sm:text-xl md:text-2xl font-semibold tracking-tight leading-relaxed italic ${
                  isDark ? "text-emerald-300" : "text-teal-900"
                }`}>
                  &ldquo;Finding reliable sources. Knowing where products came from. Getting clear communication. Maintaining consistency. Navigating changing suppliers and pricing.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Story Paragraph 2 */}
            <p className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed ${
              isDark ? "text-neutral-200" : "text-slate-700"
            }`}>
              That experience made one thing clear: there was a need for a supply partner that could offer greater reliability, transparency and consistency.
            </p>
          </motion.div>
        </section>


        {/* ========================================================
            SECTION 03 — BRIDGING THE GAP
            ======================================================== */}
        <section id="about-bridging-the-gap" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            
            {/* Left: Supporting Laboratory / Global Sourcing Image */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6"
            >
              <div className={`relative rounded-[24px] sm:rounded-[28px] overflow-hidden border p-1.5 shadow-xl ${
                isDark 
                  ? "bg-neutral-900/40 border-white/10 shadow-black/40" 
                  : "bg-white border-slate-200 shadow-slate-200/60"
              }`}>
                <div className="relative rounded-[20px] sm:rounded-[22px] overflow-hidden aspect-[16/11]">
                  <img
                    src="https://res.cloudinary.com/ds5s7shuo/image/upload/v1788181242/World_map_with_data_flow_202608311830_v0uhz6.jpg"
                    alt="World map with data flow and global logistics network"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Right: Heading & Existing Content */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6 space-y-4 sm:space-y-5"
            >
              <h2 className={`font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-[#0B1B3D]"
              }`}>
                Bridging the Gap
              </h2>

              <div className={`space-y-3.5 sm:space-y-4 text-base sm:text-lg leading-relaxed ${
                isDark ? "text-neutral-300" : "text-slate-600"
              }`}>
                <p>
                  Our pharmaceutical background, global sourcing and distribution experience, and established international network gave us the foundation to approach the problem differently.
                </p>
                <p>
                  We recognised that this rapidly growing market needed reliable supply infrastructure to support its continued development.
                </p>
              </div>
            </motion.div>

          </div>
        </section>


        {/* ========================================================
            SECTION 04 — BUILT AROUND RELIABILITY
            ======================================================== */}
        <section id="about-built-around-reliability" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            className={`p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[34px] border transition-all duration-500 ${
              isDark
                ? "bg-gradient-to-b from-neutral-900/70 to-neutral-950/80 border-white/10 shadow-2xl"
                : "bg-slate-50 border-slate-200 shadow-md"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Content Column */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <h2 className={`font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-[#0B1B3D]"
                }`}>
                  Built Around Reliability
                </h2>

                <div className={`space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed ${
                  isDark ? "text-neutral-300" : "text-slate-600"
                }`}>
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
              </div>

              {/* Supporting Laboratory & Commercial Packaging Image */}
              <div className="lg:col-span-5">
                <div className={`relative rounded-[20px] sm:rounded-[24px] overflow-hidden border p-1 shadow-md ${
                  isDark 
                    ? "bg-black/50 border-white/10 shadow-black/50" 
                    : "bg-white border-slate-200/90 shadow-slate-200/50"
                }`}>
                  <div className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden aspect-[4/3.5]">
                    <img
                      src="https://res.cloudinary.com/ds5s7shuo/image/upload/v1788181242/Research_peptide_vials_on_workbench_202608311821_akqwcv.jpg"
                      alt="Research peptide vials on laboratory workbench"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>


        {/* ========================================================
            SECTION 05 — SUPPORTING AN INDUSTRY WITH ENORMOUS POTENTIAL
            ======================================================== */}
        <section id="about-supporting-industry" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6 space-y-4 sm:space-y-5"
            >
              <h2 className={`font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-[#0B1B3D]"
              }`}>
                Supporting an Industry With Enormous Potential
              </h2>

              <div className={`space-y-3.5 sm:space-y-4 text-base sm:text-lg leading-relaxed ${
                isDark ? "text-neutral-300" : "text-slate-600"
              }`}>
                <p>
                  We believe research peptides have significant potential to contribute to scientific exploration across areas including metabolic health, longevity, recovery, aesthetics, performance and beyond.
                </p>
                <p>
                  The industry is still evolving, and there is much more to learn.
                </p>
              </div>
            </motion.div>

            {/* Right Large Commercial / Research Visual */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6"
            >
              <div className={`relative rounded-[24px] sm:rounded-[28px] overflow-hidden border p-1.5 shadow-xl ${
                isDark 
                  ? "bg-neutral-900/40 border-white/10 shadow-black/40" 
                  : "bg-white border-slate-200 shadow-slate-200/60"
              }`}>
                <div className="relative rounded-[20px] sm:rounded-[22px] overflow-hidden aspect-[16/11]">
                  <img
                    src="https://res.cloudinary.com/ds5s7shuo/image/upload/v1788181242/Cargo_containers_and_logistics_i__202608311829_uf8pgf.jpg"
                    alt="International cargo containers and logistics infrastructure"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>


        {/* ========================================================
            SECTION 06 — CLOSING STATEMENT
            ======================================================== */}
        <section id="about-closing-statement" className="relative pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className={`p-8 sm:p-10 md:p-12 rounded-[28px] sm:rounded-[36px] border relative overflow-hidden text-center max-w-4xl mx-auto ${
              isDark
                ? "bg-gradient-to-b from-neutral-900/90 to-neutral-950 border-emerald-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                : "bg-gradient-to-b from-teal-50/80 to-slate-50 border-teal-200/90 shadow-xl"
            }`}
          >
            {/* Ambient soft glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />

            <div className="relative z-10 space-y-3 sm:space-y-4">
              <h2 className={`font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                isDark ? "text-emerald-400" : "text-teal-900"
              }`}>
                Our ambition is simple.
              </h2>
              <p className={`font-sans text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${
                isDark ? "text-neutral-200" : "text-slate-700"
              }`}>
                To become a trusted global partner for businesses working with research peptides, and to help this promising industry reach its potential.
              </p>
            </div>
          </motion.div>
        </section>

      </div>
    </article>
  );
}
