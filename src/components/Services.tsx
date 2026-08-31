/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Settings, Layers, Shield, HelpCircle, Activity, 
  ChevronRight, RefreshCw, Server, ArrowRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ServicesProps {
  onContactClick: (prefilledService?: string) => void;
}

export default function Services({ onContactClick }: ServicesProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const services = [
    {
      id: "bulk-supply",
      title: "Wholesale & Volume Supply Solutions",
      desc: "Scalable supply solutions tailored for commercial partners, research institutions, and distributors. We provide flexible order quantities ranging from standard research packs to high-volume bulk supply.",
      spec: "Flexible Order Volumes | High-Purity Research Standards | Multi-Pack & Bulk Options"
    },
    {
      id: "formulation-options",
      title: "Salt Form & Formulation Options",
      desc: "Peptide formulations are available in common salt forms (such as acetate and trifluoroacetate) with detailed specification profiles to match your specific laboratory protocols.",
      spec: "Acetate & TFA Options | High Purity Specifications | Detailed CoAs"
    },
    {
      id: "lyophilization",
      title: "Lyophilized Formats & Reconstitution Solutions",
      desc: "Lyophilized peptides engineered for stable shelf-life and straightforward reconstitution. We also supply sterile reconstitution vehicles including bacteriostatic water, saline, and specialist buffers.",
      spec: "Lyophilized Powder Formats | Reconstitution Vehicles | Long-Term Stability"
    },
    {
      id: "packaging",
      title: "Private Label & Custom Packaging Solutions",
      desc: "Comprehensive white-label and custom packaging solutions for distributors and research brands. We provide customized vial sizing, bespoke labeling, and secure multi-vial boxing.",
      spec: "White-Label Packaging | Custom Vials & Boxes | Serialized Batch Numbers"
    }
  ];

  return (
    <section className="bg-neutral-950 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-500/[0.01] blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-1/4 h-96 w-96 rounded-full bg-teal-500/[0.01] blur-[120px] pointer-events-none" />

      <div className="site-container">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400">
            B2B Peps Services
          </span>
          <h1 className={`font-display text-3xl sm:text-5xl font-semibold tracking-tight mt-3 sm:mt-4 mb-4 sm:mb-6 ${
            isDark ? "text-white" : "text-[#0B1B3D]"
          }`}>
            B2B Supply & Commercial Peptide Solutions
          </h1>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            We support commercial partners, institutions, and distributors with flexible order volumes, private label options, and dependable global delivery solutions.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="space-y-6 sm:space-y-10 mb-16 sm:mb-24">
          {services.map((srv, idx) => (
            <div 
              key={srv.id}
              className="border border-white/5 bg-neutral-900/10 hover:bg-neutral-900/20 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 backdrop-blur-sm transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8"
            >
              <div className="max-w-3xl space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/15 font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-white">
                    {srv.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  {srv.desc}
                </p>
                <div className="font-mono text-[10px] text-neutral-500 bg-neutral-950/55 p-3 sm:p-3.5 rounded-xl border border-white/5 flex items-start sm:items-center gap-2 leading-relaxed">
                  <Settings className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span>{srv.spec}</span>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => onContactClick(srv.title)}
                  className="w-full lg:w-auto rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-6 flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Support & Production Capabilities Section */}
        <div className="mb-24 border-t border-white/5 pt-16">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-teal-400">
              Commercial Operations
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-4 mb-4">
              Advanced Sourcing & Brand Scalability
            </h2>
            <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
              We provide comprehensive commercial solutions to support your research supply requirements and distribution channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/5 bg-neutral-900/10 p-6 rounded-[24px] backdrop-blur-sm space-y-4">
              <span className="font-mono text-[10px] text-emerald-400 font-extrabold uppercase">Vial Sizing & Lyophilization</span>
              <h3 className="font-sans text-sm font-semibold text-white">Vial Sizing & Packaging Options</h3>
              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                We provide standard and customized vial allocations in durable Type I borosilicate glass with secure closures, with standard quantities of 2.0mg, 5.0mg, 10.0mg, and bulk multi-vial trays.
              </p>
            </div>

            <div className="border border-white/5 bg-neutral-900/10 p-6 rounded-[24px] backdrop-blur-sm space-y-4">
              <span className="font-mono text-[10px] text-emerald-400 font-extrabold uppercase">Private Label Solutions</span>
              <h3 className="font-sans text-sm font-semibold text-white">Private Label & White-Label Execution</h3>
              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                For research distributors and wellness brands, we offer full white-label packaging. This includes customized labeling, branded multi-pack boxes, and batch traceability.
              </p>
            </div>

            <div className="border border-white/5 bg-neutral-900/10 p-6 rounded-[24px] backdrop-blur-sm space-y-4">
              <span className="font-mono text-[10px] text-emerald-400 font-extrabold uppercase">Priority Sourcing Contracts</span>
              <h3 className="font-sans text-sm font-semibold text-white">Volume Supply Agreements</h3>
              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                Protect your supply continuity with structured supply agreements, competitive wholesale tier discounts, and prioritized order fulfillment.
              </p>
            </div>
          </div>
        </div>

        {/* Scientific Workflow Preview Card */}
        <div className="border border-white/5 bg-neutral-900/10 p-8 rounded-[32px] backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-teal-500/[0.01] blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-teal-400">DOCUMENTATION AVAILABLE</span>
              <h3 className="font-sans text-base font-semibold text-white mt-1.5 mb-2">Looking for specific peptide formats or bulk quantities?</h3>
              <p className="font-sans text-xs text-neutral-400 font-light max-w-xl leading-relaxed">
                Our support team is ready to assist with specification details, volume discount tiers, and documentation packages for your research requirements.
              </p>
            </div>
            
            <button
              onClick={() => onContactClick()}
              className="rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 font-sans text-[10px] font-bold tracking-wider uppercase transition-all shrink-0 text-white"
            >
              Speak with Our B2B Team
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
