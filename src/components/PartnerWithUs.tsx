/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  TrendingDown, 
  ShieldCheck, 
  Sparkles, 
  Package, 
  Layers, 
  Headphones, 
  ArrowRight,
  ChevronRight,
  CheckCircle2
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

  const sections = [
    {
      number: "01",
      title: "Industry Leading Pricing",
      icon: TrendingDown,
      paragraphs: [
        "Our established supply network and scale enable us to offer industry leading pricing across our growing research peptide portfolio.",
        "For B2B customers, that means access to attractive product economics without having to constantly negotiate with multiple suppliers or chase the market for better rates."
      ],
      highlight: "You focus on your business. We focus on keeping your supply competitive.",
      actionLabel: "Request Commercial Rates",
      actionTarget: "contact"
    },
    {
      number: "02",
      title: "Reliable Sourcing, Without the Hassle",
      icon: ShieldCheck,
      paragraphs: [
        "Sourcing research peptides internationally can be unpredictable. Suppliers can become unresponsive, change their pricing, discontinue products or disappear altogether, leaving businesses to continually reassess who they can trust and whether they're still getting the right products at the right price.",
        "We've built relationships with established manufacturing and supply partners so that our customers don't have to manage that complexity themselves."
      ],
      highlight: "We handle the sourcing. You can focus on what you're actually building with the products.",
      actionLabel: "View Quality & Testing",
      actionTarget: "quality"
    },
    {
      number: "03",
      title: "Stay Ahead of the Curve",
      icon: Sparkles,
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
      title: "More Than Just Peptides",
      icon: Package,
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
      number: "05",
      title: "A Growing Product Portfolio",
      icon: Layers,
      paragraphs: [
        "We are continually expanding our catalogue across the areas driving interest in research peptides today, including metabolic and weight management research, recovery and regenerative research, longevity, aesthetics, performance and cognitive health.",
        "We continually expand our catalogue to reflect emerging areas of interest, giving our customers access to new products and opportunities as the market evolves."
      ],
      highlight: "Expanded access across 6+ core research domains.",
      actionLabel: "Browse Product Catalogue",
      actionTarget: "products"
    },
    {
      number: "06",
      title: "A Responsive B2B Partner",
      icon: Headphones,
      paragraphs: [
        "We're building the business around being easy to work with.",
        "From straightforward product orders to building a broader portfolio, accessing testing or developing branded products, we're here to provide responsive, hands on support at every stage.",
        "You shouldn't have to navigate a maze of departments or chase multiple suppliers to get something done."
      ],
      highlight: "We're here to make your life easier, not add another layer of complexity.",
      actionLabel: "Speak With Our Team",
      actionTarget: "contact"
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 px-5 sm:px-8 lg:px-12 relative overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-emerald-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-teal-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="mx-auto w-full max-w-5xl relative z-10 space-y-10 sm:space-y-12">
        
        {/* ========================================================
            HERO INTRO SECTION
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold">
              WHY PARTNER WITH US
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15]">
            More Than a Supplier. <br className="hidden sm:inline" />
            <span className={isDark ? "text-emerald-400" : "text-teal-700"}>
              A Partner for a Fast Moving Market.
            </span>
          </h1>

          <div className="space-y-4 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl opacity-90">
            <p>
              The research peptide market is evolving quickly. New products, formulations and delivery solutions are continually emerging, while sourcing internationally can bring its own challenges around reliability, pricing and consistency.
            </p>
            <p>
              We&apos;ve built our business to take much of that complexity off your plate, giving you access to a growing product portfolio, industry leading pricing and practical solutions, while helping you stay ahead of what&apos;s next.
            </p>
          </div>
        </motion.div>

        {/* ========================================================
            THE 6 PILLARS / VALUE SECTIONS
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between backdrop-blur-xl transition-all duration-300 group ${
                  isDark
                    ? "bg-neutral-900/40 border-white/10 hover:border-emerald-500/30 hover:bg-neutral-900/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    : "bg-white border-slate-200/90 hover:border-teal-500/40 hover:shadow-lg shadow-sm text-slate-800"
                }`}
              >
                <div className="space-y-5">
                  {/* Top Number & Icon Row */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${
                      isDark 
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                        : "text-teal-700 bg-teal-50 border-teal-200"
                    }`}>
                      {section.number}
                    </span>
                    <div className={`p-2.5 rounded-2xl border ${
                      isDark
                        ? "bg-white/[0.04] border-white/10 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors"
                        : "bg-slate-100 border-slate-200 text-teal-600 group-hover:bg-teal-50 transition-colors"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Section Title */}
                  <h2 className={`font-sans text-xl sm:text-2xl font-semibold tracking-tight ${
                    isDark ? "text-white group-hover:text-emerald-300" : "text-slate-900 group-hover:text-teal-800"
                  } transition-colors`}>
                    {section.title}
                  </h2>

                  {/* Body Paragraphs */}
                  <div className="space-y-3 font-light text-xs sm:text-sm leading-relaxed opacity-85">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Highlight Callout Box */}
                  <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 font-sans text-xs sm:text-sm font-medium ${
                    isDark
                      ? "bg-emerald-500/[0.06] border-emerald-500/20 text-emerald-300"
                      : "bg-teal-50/80 border-teal-200 text-teal-900"
                  }`}>
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                    <span>{section.highlight}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================
            CLOSING HERO CALLOUT & CTA SECTION
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`p-8 sm:p-12 md:p-16 rounded-[32px] sm:rounded-[40px] border relative overflow-hidden backdrop-blur-2xl text-center space-y-8 ${
            isDark
              ? "bg-gradient-to-b from-neutral-900/80 to-neutral-950/90 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
              : "bg-gradient-to-b from-white to-slate-100 border-slate-200 shadow-xl"
          }`}
        >
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-emerald-400 font-bold block">
              SEAMLESS SUPPLY INTEGRATION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              You Focus on Your Business. <br className="hidden sm:inline" />
              <span className={isDark ? "text-emerald-400" : "text-teal-700"}>
                We&apos;ll Handle the Peptide Supply.
              </span>
            </h2>
            <div className="space-y-3 font-light text-xs sm:text-sm md:text-base leading-relaxed opacity-85 pt-2">
              <p>
                Sourcing, pricing, product availability and the wider ecosystem around research peptides can take significant time and attention.
              </p>
              <p>
                We&apos;ve built our business to take more of that work off your hands, giving you access to reliable supply, industry leading pricing, emerging products and additional solutions as your requirements evolve.
              </p>
              <p className="font-medium text-emerald-400/95 pt-2">
                So you can spend less time managing your peptide supply chain, and more time building what comes next.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleContact}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-extrabold transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                isDark
                  ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                  : "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20"
              }`}
            >
              <span>Speak With Our Team</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate("products")}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold border transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                isDark
                  ? "border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white"
                  : "border-slate-300 bg-white hover:bg-slate-50 text-slate-800"
              }`}
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
