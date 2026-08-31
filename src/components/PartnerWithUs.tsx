/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Globe2, 
  Atom, 
  Handshake, 
  PackageCheck, 
  FileCheck2,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface PartnerWithUsProps {
  onNavigate: (pageId: string) => void;
  onContactClick?: () => void;
}

export default function PartnerWithUs({ onNavigate, onContactClick }: PartnerWithUsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      onNavigate("contact");
    }
  };

  const benefits = [
    {
      number: "01",
      title: "Research-Grade Supply",
      icon: ShieldCheck,
      image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787484597/Peptide_vials_on_laboratory_bench_202608231659_sbfjag.jpg",
      imageAlt: "Research-grade peptide vials on laboratory bench for commercial supply",
      tagline: "Portfolio Breadth",
      paragraphs: [
        "We are continually expanding our catalogue across the areas driving interest in research peptides today, including metabolic and weight management research, recovery and regenerative research, longevity, aesthetics, performance and cognitive health.",
        "We continually expand our catalogue to reflect emerging areas of interest, giving our customers access to new products and opportunities as the market evolves."
      ],
      highlight: "Expanded access across 6+ core research domains.",
      actionLabel: "Browse Product Catalogue",
      actionTarget: "products"
    },
    {
      number: "02",
      title: "Global Supply",
      icon: Globe2,
      image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483821/Professionals_inspecting_pharmac__202608231645_fhynxm.jpg",
      imageAlt: "International pharmaceutical supply chain professionals inspecting shipments",
      tagline: "International Logistics",
      paragraphs: [
        "Sourcing research peptides internationally can be unpredictable. Suppliers can become unresponsive, change their pricing, discontinue products or disappear altogether, leaving businesses to continually reassess who they can trust and whether they're still getting the right products at the right price.",
        "We've built relationships with established manufacturing and supply partners so that our customers don't have to manage that complexity themselves."
      ],
      highlight: "We handle the sourcing. You can focus on what you're actually building with the products.",
      actionLabel: "View Supply & Logistics",
      actionTarget: "contact"
    },
    {
      number: "03",
      title: "Product Knowledge",
      icon: Atom,
      image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483821/Engineers_inspecting_pharmaceuti__202608231646_xjish6.jpg",
      imageAlt: "Technical peptide specialists and engineers reviewing molecular specifications",
      tagline: "Technical Expertise",
      paragraphs: [
        "The peptide market doesn't stand still.",
        "New compounds, emerging research areas and increasingly sophisticated delivery solutions are continually entering the market. We actively look to stay close to these developments so that our customers can access the latest relevant products and solutions as the market evolves.",
        "From emerging peptides to new ways of packaging and delivering established products, we keep looking for the developments that can give our partners an edge."
      ],
      highlight: "What's next matters to us, so you don't have to discover it after everyone else.",
      actionLabel: "Explore Science & Resources",
      actionTarget: "science"
    },
    {
      number: "04",
      title: "Long-Term Partnerships",
      icon: Handshake,
      image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483822/Researchers_reviewing_technical___202608231645_kpdre3.jpg",
      imageAlt: "Dedicated technical account managers reviewing client requirements",
      tagline: "Dedicated Support",
      paragraphs: [
        "We're building the business around being easy to work with.",
        "From straightforward product orders to building a broader portfolio, accessing testing or developing branded products, we're here to provide responsive, hands on support at every stage.",
        "You shouldn't have to navigate a maze of departments or chase multiple suppliers to get something done."
      ],
      highlight: "We're here to make your life easier, not add another layer of complexity.",
      actionLabel: "Speak With Our Team",
      actionTarget: "contact"
    },
    {
      number: "05",
      title: "Commercial Solutions",
      icon: PackageCheck,
      image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483822/Clever_Peps_peptide_manufacturin__202608231645_ut6wmc.jpg",
      imageAlt: "Private label packaging, branding, and customized delivery solutions",
      tagline: "End-to-End Solutions",
      paragraphs: [
        "Your requirements don't necessarily end when the peptide arrives.",
        "We can also help customers access testing solutions, private labelling, branding, packaging and product delivery solutions, including injectable pen solutions.",
        "By bringing more of these capabilities together, we make it easier for businesses to develop, present and deliver their peptide products without having to coordinate multiple specialist suppliers."
      ],
      highlight: "More solutions. Less to coordinate.",
      actionLabel: "Explore Commercial Services",
      actionTarget: "services"
    },
    {
      number: "06",
      title: "Quality & Testing",
      icon: FileCheck2,
      image: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787483821/Pharmaceutical_quality_control_d__202608231645_pritv6.jpg",
      imageAlt: "Quality control director inspecting analytical documentation and batch verification",
      tagline: "Quality & Economics",
      paragraphs: [
        "Our established supply network and scale enable us to offer industry leading pricing across our growing research peptide portfolio.",
        "For B2B customers, that means access to attractive product economics without having to constantly negotiate with multiple suppliers or chase the market for better rates."
      ],
      highlight: "You focus on your business. We focus on keeping your supply competitive.",
      actionLabel: "Request Commercial Rates",
      actionTarget: "contact"
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-16 sm:pt-28 sm:pb-24 relative overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-[#0a0d14] text-white" : "bg-white text-slate-900"
    }`}>
      {/* Background ambient lighting effects */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-teal-500/[0.04] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[160px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-20 sm:space-y-24 md:space-y-28">
        
        {/* ========================================================
            1. HERO SECTION (Two-Column Layout)
            ======================================================== */}
        <section className="relative pt-4 sm:pt-6 md:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Eyebrow, Heading, Divider, Copy, CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400 font-bold">
                  WHY PARTNER WITH US
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.12] ${
                  isDark ? "text-slate-50" : "text-[#0B1B3D]"
                }`}>
                  More Than a Supplier.
                </h1>
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.12] text-teal-600 dark:text-teal-400">
                  A Partner for a Fast Moving Market.
                </h2>
              </div>

              {/* Teal Accent Divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" />

              {/* Supporting Copy (Exact preserved text) */}
              <div className={`space-y-4 text-base sm:text-lg font-normal leading-relaxed ${
                isDark ? "text-neutral-300" : "text-slate-600"
              }`}>
                <p>
                  The research peptide market is evolving quickly. New products, formulations and delivery solutions are continually emerging, while sourcing internationally can bring its own challenges around reliability, pricing and consistency.
                </p>
                <p>
                  We&apos;ve built our business to take much of that complexity off your plate, giving you access to a growing product portfolio, industry leading pricing and practical solutions, while helping you stay ahead of what&apos;s next.
                </p>
              </div>

              {/* Hero CTA Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleContact}
                  className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                    isDark
                      ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-emerald-400/20"
                      : "bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20"
                  }`}
                >
                  <span>Speak With Our Team</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onNavigate("products")}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold border transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                    isDark
                      ? "border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white"
                      : "border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
                  }`}
                >
                  <span>Explore Products</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </motion.div>

            {/* Right Column: Laboratory Image with decorative styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              {/* Subtle decorative background glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/20 to-emerald-400/10 rounded-[36px] blur-xl opacity-70 pointer-events-none" />
              
              <div className={`relative rounded-[32px] sm:rounded-[36px] overflow-hidden border p-2 shadow-2xl transition-all duration-500 ${
                isDark 
                  ? "bg-neutral-900/60 border-white/15 shadow-black/60" 
                  : "bg-white/90 border-slate-200/90 shadow-slate-200/60"
              }`}>
                <div className="relative rounded-[26px] sm:rounded-[28px] overflow-hidden aspect-[4/4.2]">
                  <img
                    src="https://res.cloudinary.com/ds5s7shuo/image/upload/v1787484597/Peptide_vials_on_laboratory_bench_202608231659_sbfjag.jpg"
                    alt="Precision research peptide vials on laboratory bench"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================
            2. SIX BENEFIT SECTIONS (ALTERNATING CLEAN VISUAL HIERARCHY)
            ======================================================== */}
        <section className="space-y-16 sm:space-y-20 md:space-y-24 pt-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            // Alternating layout: even indices (0, 2, 4) content left, image right.
            // Odd indices (1, 3, 5) image left, content right.
            const isContentLeft = index % 2 === 0;

            return (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center"
              >
                {/* ----------------- Content Column ----------------- */}
                <div className={`lg:col-span-6 space-y-5 sm:space-y-6 ${
                  isContentLeft ? "lg:order-1" : "lg:order-2"
                }`}>
                  
                  {/* Badge: Number and Tagline */}
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center font-mono text-xs font-bold px-3 py-1 rounded-full border ${
                      isDark 
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                        : "text-teal-700 bg-teal-50 border-teal-200"
                    }`}>
                      {benefit.number}
                    </span>
                  </div>

                  {/* Benefit Title with Icon */}
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 sm:p-3 rounded-2xl border shrink-0 ${
                      isDark 
                        ? "bg-white/[0.05] border-white/10 text-emerald-400" 
                        : "bg-teal-50 border-teal-200/90 text-teal-700 shadow-xs"
                    }`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h2 className={`font-sans text-2xl sm:text-3xl md:text-[32px] font-bold tracking-tight leading-snug ${
                      isDark ? "text-white" : "text-[#0B1B3D]"
                    }`}>
                      {benefit.title}
                    </h2>
                  </div>

                  {/* Supporting Copy (Exact preserved paragraphs) */}
                  <div className={`space-y-3 text-sm sm:text-base leading-relaxed ${
                    isDark ? "text-neutral-300 font-normal" : "text-slate-600 font-normal"
                  }`}>
                    {benefit.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Highlight Statement */}
                  <div className={`p-4 sm:p-5 rounded-2xl border-l-4 transition-all duration-300 ${
                    isDark
                      ? "border-l-emerald-400 bg-emerald-950/20 border border-emerald-500/10 text-emerald-300"
                      : "border-l-teal-600 bg-teal-50/60 border border-teal-100 text-teal-900"
                  }`}>
                    <p className="font-sans font-medium text-sm sm:text-[15px] leading-relaxed italic">
                      &ldquo;{benefit.highlight}&rdquo;
                    </p>
                  </div>

                </div>

                {/* ----------------- Image Column ----------------- */}
                <div className={`lg:col-span-6 ${
                  isContentLeft ? "lg:order-2" : "lg:order-1"
                }`}>
                  <div className={`relative rounded-[28px] sm:rounded-[32px] overflow-hidden border p-2 shadow-xl transition-all duration-500 group ${
                    isDark 
                      ? "bg-neutral-900/40 border-white/10 shadow-black/40 hover:border-emerald-500/30" 
                      : "bg-white border-slate-200/90 shadow-slate-200/70 hover:border-teal-500/30"
                  }`}>
                    <div className="relative rounded-[22px] sm:rounded-[24px] overflow-hidden aspect-[16/11]">
                      <img
                        src={benefit.image}
                        alt={benefit.imageAlt}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </section>

        {/* ========================================================
            3. FINAL CTA SECTION
            ======================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`p-6 sm:p-10 md:p-12 rounded-[32px] sm:rounded-[36px] border relative overflow-hidden ${
            isDark
              ? "bg-gradient-to-b from-neutral-900/80 to-neutral-950/90 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
              : "bg-slate-50 border-slate-200 shadow-lg"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Eyebrow, Heading, Body, Buttons */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-teal-600 dark:text-emerald-400 font-bold block">
                  LET&apos;S GROW TOGETHER
                </span>
                
                <h2 className={`font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-[#0B1B3D]"
                }`}>
                  Ready to simplify your peptide supply?
                </h2>
                
                <p className={`font-normal text-sm sm:text-base leading-relaxed ${
                  isDark ? "text-neutral-300" : "text-slate-600"
                }`}>
                  Speak with our team to see how we can support your business.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handleContact}
                  className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                    isDark
                      ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-emerald-400/20"
                      : "bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20"
                  }`}
                >
                  <span>Speak With Our Team</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onNavigate("products")}
                  className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold border transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                    isDark
                      ? "border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white"
                      : "border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
                  }`}
                >
                  <span>Explore Products</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Right: Commercial B2B Partnership Photo */}
            <div className="lg:col-span-5">
              <div className={`relative rounded-2xl overflow-hidden border p-1 ${
                isDark ? "bg-black/40 border-white/10" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
                  <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop"
                    alt="Corporate commercial partnership and supply agreement handshake"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </motion.section>

      </div>
    </div>
  );
}

