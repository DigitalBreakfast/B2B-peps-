/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Award, Microscope, Truck, Sparkles, Building2, Globe, FileCheck, Layers, Users, ClipboardCheck } from "lucide-react";
import { motion } from "motion/react";

export default function PartnershipSpecs() {
  const pillars = [
    {
      id: "manufacturing",
      icon: <Building2 className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />,
      title: "Rigorous Synthesis Standards",
      description: "Our syntheses are performed in specialized facilities under strict quality oversight and controlled synthesis parameters.",
      metric: "High Quality Standards"
    },
    {
      id: "supply-chain",
      icon: <Globe className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />,
      title: "International Sourcing",
      description: "With dedicated distribution depots across North America, Europe, and Asia-Pacific, we guarantee seamless customs pre-clearance and robust global delivery solutions.",
      metric: "3 Logistics Hubs"
    },
    {
      id: "documentation",
      icon: <FileCheck className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />,
      title: "Reliable Documentation",
      description: "Every batch is accompanied by comprehensive analytical documentation and an official Certificate of Analysis. Complete lot traceability is fully cataloged.",
      metric: "100% Traceable"
    },
    {
      id: "commercial",
      icon: <Layers className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />,
      title: "Flexible Commercial Support",
      description: "We offer volume-stabilized contract manufacturing, custom lyophilization formulation buffers, and tier-structured pricing models to align with your budgeting lifecycle.",
      metric: "Custom B2B Tiers"
    },
    {
      id: "relationships",
      icon: <Users className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />,
      title: "Long-Term Partnerships",
      description: "Unlock scheduled manufacturing priority and secure continuous stockpile reserves. We offer proactive lot reservation terms to prevent clinical testing program delays.",
      metric: "Reserved Capacity"
    },
    {
      id: "procurement",
      icon: <ClipboardCheck className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />,
      title: "Easy Procurement Process",
      description: "A simple, highly structured secure procurement workflow. Submit specifications, complete a dedicated consultation, receive documentation, and track active logistics.",
      metric: "6-Step Workflow"
    }
  ];

  return (
    <section id="why-partner" className="relative overflow-hidden bg-neutral-950 py-32 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-teal-500/[0.01] blur-[120px] pointer-events-none" />

      <div className="site-container">
        
        {/* Simplified Header with Pure Storytelling Focus */}
        <div className="max-w-3xl mb-28">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400 mb-4">
            <span>Sourcing Philosophy</span>
          </span>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05]">
            A partnership of absolute certainty.
          </h2>
          <p className="mt-6 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light max-w-xl">
            In global life sciences, chemical variance is a critical risk. We deliver absolute molecular certainty to eliminate research error.
          </p>
        </div>

        {/* 2-Column High-End Split Section */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-center mb-16" id="partnership-story">
          
          {/* Column 1: A Large, Stunning Abstract Visual Art Grid (symbolizes modern high-tech biological structure) */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-[32px] border border-white/5 bg-neutral-900/10 p-8 overflow-hidden backdrop-blur-sm flex items-center justify-center">
            {/* Blurry colored organic floating bubble */}
            <div className="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-emerald-400/[0.03] blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-teal-400/[0.02] blur-3xl pointer-events-none" />

            {/* Aesthetic overlapping glass card structure representing absolute physical structural integrity */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Blueprint/Tech grid background lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-r border-white/20" />
                <div className="border-b border-white/20" />
              </div>

              <div className="absolute h-56 w-72 rounded-3xl border border-white/10 bg-neutral-950/70 shadow-2xl backdrop-blur-md transform -rotate-3 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" strokeWidth={1.2} />
                  </div>
                  <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-neutral-500">PURITY PROFILE</span>
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-400 block mb-1">Quality Assurance</span>
                  <div className="font-sans text-base font-semibold text-white">Consistent Purity</div>
                  <p className="font-sans text-[10px] text-neutral-400 mt-1 font-light leading-normal">Synthesized to stringent purity benchmarks and batch standards.</p>
                </div>
              </div>

              <div className="absolute h-56 w-72 rounded-3xl border border-white/5 bg-neutral-900/20 shadow-2xl backdrop-blur-sm transform rotate-6 flex flex-col justify-between p-6 translate-x-4 translate-y-4 hover:translate-x-1 hover:translate-y-1 transition-transform duration-700">
                <div className="flex justify-between items-start">
                  <div className="font-sans text-xs font-bold text-white uppercase tracking-[0.15em]">B2B Peps™ Lab</div>
                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-emerald-400 font-bold">Quality Verified</span>
                </div>
                <div className="space-y-2 mt-4 font-mono text-[8px] tracking-wider text-neutral-400">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Batch Traceability</span>
                    <span className="text-white">Full Lot Records</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Purity Standard</span>
                    <span className="text-white">&ge;99% Profile</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Documentation</span>
                    <span className="text-emerald-400">CoA Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Elegant, simplified storytelling cards highlighting strongest business advantages */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {pillars.map((pillar) => (
              <div 
                key={pillar.id}
                className="flex flex-col gap-4 group bg-neutral-900/10 border border-white/5 hover:border-white/10 hover:bg-neutral-900/20 p-5 rounded-2xl backdrop-blur-sm transition-all duration-500"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:border-white/10 group-hover:text-white transition-all duration-500">
                  {pillar.icon}
                </div>
                <div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sans text-sm font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded-full border border-emerald-500/10 font-bold">
                        {pillar.metric}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
