/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Microscope, Globe, FileSpreadsheet, 
  ArrowLeftRight, HeartHandshake, ArrowRight 
} from "lucide-react";
import WhyPartner from "./WhyPartner";

interface AboutUsProps {
  onContactClick: () => void;
  onNavigate: (pageId: string) => void;
  initialTab?: "story" | "partner";
}

export default function AboutUs({ onContactClick, onNavigate, initialTab = "story" }: AboutUsProps) {
  const [activeTab, setActiveTab] = useState<"story" | "partner">(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const trustPillars = [
    {
      title: "Quality Assurance",
      description: "Every compound batch undergoes double reverse-phase HPLC and Mass Spectrometry validation to guarantee a verified purity level of 99% or above.",
      icon: <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" strokeWidth={1.2} />
    },
    {
      title: "Scientific Expertise",
      description: "Our chemists specialize in solid-phase synthesis, custom sequence configuration, and standard counter-ion replacements.",
      icon: <Microscope className="h-4.5 w-4.5 text-teal-400" strokeWidth={1.2} />
    },
    {
      title: "Global Distribution",
      description: "We navigate complex customs clearances and maintain temperature-controlled logistics for dependable international deliveries.",
      icon: <Globe className="h-4.5 w-4.5 text-emerald-400" strokeWidth={1.2} />
    },
    {
      title: "Documentation",
      description: "Shipments include digitally verified chromatograms, raw analytical traces, and continuous cold-chain sensor records.",
      icon: <FileSpreadsheet className="h-4.5 w-4.5 text-teal-400" strokeWidth={1.2} />
    },
    {
      title: "Reliable Supply",
      description: "Our long-term contract programs utilize locked-index pricing agreements to insulate your sourcing budget from market volatility.",
      icon: <ArrowLeftRight className="h-4.5 w-4.5 text-emerald-400" strokeWidth={1.2} />
    },
    {
      title: "Dedicated Support",
      description: "A technical account manager oversees your orders, custom inquiries, and delivery requirements to ensure seamless procurement workflows.",
      icon: <HeartHandshake className="h-4.5 w-4.5 text-teal-400" strokeWidth={1.2} />
    }
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      
      {/* Sub-navigation tab selector */}
      <div className="flex justify-center pt-8 pb-2 px-4">
        <div className="inline-flex rounded-full bg-neutral-900/60 p-1 border border-white/5 backdrop-blur-md max-w-full">
          <button
            onClick={() => setActiveTab("story")}
            className={`rounded-full px-4 sm:px-6 py-2.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "story"
                ? "bg-emerald-400 text-neutral-950 font-extrabold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Company Story
          </button>
          <button
            onClick={() => setActiveTab("partner")}
            className={`rounded-full px-4 sm:px-6 py-2.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "partner"
                ? "bg-emerald-400 text-neutral-950 font-extrabold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Why Partner With Us
          </button>
        </div>
      </div>

      {activeTab === "partner" ? (
        <WhyPartner onContactClick={onContactClick} onNavigate={onNavigate} />
      ) : (
        <>
          {/* 1. Hero */}
      <section className="relative py-20 px-6 sm:px-8 lg:px-12 border-b border-white/5 overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/[0.01] blur-[150px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-500/[0.01] blur-[150px] pointer-events-none" />

        <div className="mx-auto w-full max-w-4xl text-center relative z-10 space-y-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400 block font-bold">
            ABOUT B2B PEPS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
            The Global Partner for <br />
            Peptide Sourcing and Quality Assurance
          </h1>
          <p className="font-sans text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            B2B Peps is a premium B2B peptide solutions partner specializing in high-purity solid-phase synthesis and advanced chromatographic purification. We design, manufacture, and distribute reference standards to biotechnology companies, clinical organizations, and research institutions globally.
          </p>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 border-b border-white/5">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 block font-bold">
            WHO WE ARE
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            An International Leader in Chemical Precision
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            B2B Peps is a premier B2B peptide solutions enterprise dedicated to serving international biotechnology developers, pharmaceutical laboratories, and research organizations. By pairing deep scientific expertise with state-of-the-art solid-phase synthesis, we supply high-purity research compounds and custom formulation agents designed to survive the most demanding validation protocols. We prioritize full analytical documentation, strict regulatory compliance, and a resilient, secure supply chain to insulate our global clients from quality inconsistencies and sourcing interruptions.
          </p>
        </div>
      </section>

      {/* 3. Our Philosophy */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 border-b border-white/5 bg-neutral-900/5">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 block font-bold">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Precision, Transparency, and Operational Trust
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Our approach is built on absolute scientific precision, uncompromised transparency, and rigorous operational execution. We believe that life sciences sourcing must be guided by objective analytical evidence rather than corporate assertions. By maintaining complete chromatographic clarity, standardizing counter-ion exchanges, and keeping stable locked-index pricing models, we protect client research from experimental variance and market instability, fostering deep, long-term technical partnerships with the clients we serve.
          </p>
        </div>
      </section>

      {/* 4 & 5. Mission & Vision */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 border-b border-white/5">
        <div className="mx-auto w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 block font-bold">
              OUR MISSION
            </span>
            <p className="font-sans text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
              To deliver the world’s most consistent, chromatographically verified peptide solutions, empowering biotechnology and research organizations to advance clinical science with absolute confidence.
            </p>
          </div>
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-12">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 block font-bold">
              OUR VISION
            </span>
            <p className="font-sans text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
              To set the definitive global benchmark for peptide purity, traceability, and supply chain security in the international life sciences industry.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Why Businesses Trust B2B Peps */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 border-b border-white/5">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-16 space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 block font-bold">
              THE SIX TRUST PILLARS
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Why Businesses Choose B2B Peps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="border border-white/5 bg-neutral-900/10 p-6 rounded-[24px] backdrop-blur-sm flex flex-col justify-between min-h-[180px]"
              >
                <div className="h-9 w-9 rounded-full bg-neutral-950 border border-white/5 flex items-center justify-center shrink-0 mb-4">
                  {pillar.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-xs font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[11px] text-neutral-400 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Our Commitment to Quality */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 border-b border-white/5 relative overflow-hidden bg-neutral-900/5">
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-emerald-500/[0.01] blur-3xl pointer-events-none" />
        
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 block font-bold">
              ANALYTICAL STANDARDS
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Our Uncompromising Commitment to Quality
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              At B2B Peps, quality is not a retrospective check; it is an active manufacturing parameter. Our production processes conform to ISO 9001:2015 and cGMP guidelines, validating each phase of solid-phase peptide synthesis. We reject simple static reports in favor of active, digitally signed HPLC and Mass Spectrometry chromatograms that map the complete molecular profile of each compound. By providing full transparency on counter-ion content and moisture levels, we ensure our reference standards perform reliably in vitro and in vivo.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("quality")}
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore Dedicated Quality Assurance Page</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Closing CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute right-10 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/[0.01] blur-[150px] pointer-events-none" />
        
        <div className="mx-auto w-full max-w-3xl text-center relative z-10 space-y-6 sm:space-y-8 bg-neutral-900/10 border border-white/5 p-6 sm:p-12 md:p-16 rounded-[28px] sm:rounded-[48px] backdrop-blur-sm">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400 block font-bold">
            SECURE PARTNERSHIP
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
            Partner with B2B Peps
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            Initiate a technical consultation to secure your research pipeline or explore our product catalogue.
          </p>
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate("products")}
              className="w-full sm:w-auto rounded-full bg-emerald-400 hover:bg-emerald-500 text-neutral-950 font-sans text-xs font-bold uppercase tracking-wider py-3.5 sm:py-4 px-8 sm:px-10 transition-colors cursor-pointer min-h-[48px]"
            >
              Explore Our Products
            </button>
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-xs font-semibold tracking-wider text-white transition-all uppercase cursor-pointer min-h-[48px]"
            >
              Speak With Our Team
            </button>
          </div>
        </div>
      </section>
        </>
      )}

    </div>
  );
}
