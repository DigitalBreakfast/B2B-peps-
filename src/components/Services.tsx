/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Settings, Layers, Shield, HelpCircle, Activity, 
  ChevronRight, RefreshCw, Server, ArrowRight
} from "lucide-react";

interface ServicesProps {
  onContactClick: (prefilledService?: string) => void;
}

export default function Services({ onContactClick }: ServicesProps) {
  const services = [
    {
      id: "custom-synthesis",
      title: "B2B Scale-Up & Custom Peptide Synthesis",
      desc: "High-yield solid-phase and liquid-phase peptide assembly. We handle sequences from simple tetrapeptides to complex di-disulfide bridged conjugates up to 60 amino acids. Scalable from milligram research batches to multi-gram bulk production runs.",
      spec: "Purity up to >99.8% | Salt forms: Acetate, TFA, or Hydrochloride | Quantity: 10mg to 10kg"
    },
    {
      id: "counter-ion",
      title: "Counter-Ion Exchange & TFA Elimination",
      desc: "Trifluoroacetate (TFA) salts are a common byproduct of standard peptide synthesis but can cause cytotoxic reactions in biological assays. We provide exhaustive counter-ion replacement, converting TFA salts to acetate or hydrochloride forms to protect delicate cell lines.",
      spec: "Residual TFA <1.0% (Verified via Fluorine-19 NMR) | Lyophilization standard"
    },
    {
      id: "formulation",
      title: "Custom Lyophilization & Buffer Formulations",
      desc: "Protect molecular configurations during transit and storage. Our PhD technicians configure customized lyophilization cakes with standard cryoprotectants (e.g. Mannitol, Trehalose) or prepare pre-buffered, sterile aqueous solutions for high-throughput testing.",
      spec: "Buffered in PBS, sterile water, or custom saline matrices | Argon gas vial backfilling"
    },
    {
      id: "packaging",
      title: "Aliquoting, Labeling & Custom Packaging",
      desc: "Save laboratory preparation time. We divide large batches into precise, single-use aliquots (e.g. 1.0mg, 5.0mg, 10.0mg), package them in premium amber vials to shield from ultraviolet light, and apply custom, serialized barcoding linked to your internal LIMS.",
      spec: "Custom micro-vials | ISO-compliant labels | Serialization"
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
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
            B2B Synthesis & Technical Formulation Solutions
          </h1>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Beyond standard catalog compounds, we offer custom scientific manufacturing services to adapt molecular structures and configurations to the specific demands of your laboratory assays and clinical models.
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
              We extend beyond material synthesis to provide complete commercial launch structures. Secure your clinical pipeline with customized finishes and priority reactor access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/5 bg-neutral-900/10 p-6 rounded-[24px] backdrop-blur-sm space-y-4">
              <span className="font-mono text-[10px] text-emerald-400 font-extrabold uppercase">Vial Sizing & Lyophilization</span>
              <h3 className="font-sans text-sm font-semibold text-white">Sterile Vial Customization</h3>
              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                We aliquot compounds into Type I borosilicate glass vials under Class 100 sterile conditions. Sealed with premium chlorobutyl rubber stoppers and color-coded aluminum flip-off caps, with standard weights of 2.0mg, 5.0mg, 10.0mg, and customizable bulk loads.
              </p>
            </div>

            <div className="border border-white/5 bg-neutral-900/10 p-6 rounded-[24px] backdrop-blur-sm space-y-4">
              <span className="font-mono text-[10px] text-emerald-400 font-extrabold uppercase">Private Label Solutions</span>
              <h3 className="font-sans text-sm font-semibold text-white">Turnkey Brand Execution</h3>
              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                For research distributors and specialized clinics, we provide full private labeling. This includes synthetic chemical-resistant serialized labels, custom-designed premium packaging/boxes, and direct integrations with LIMS databases.
              </p>
            </div>

            <div className="border border-white/5 bg-neutral-900/10 p-6 rounded-[24px] backdrop-blur-sm space-y-4">
              <span className="font-mono text-[10px] text-emerald-400 font-extrabold uppercase">Priority Sourcing Contracts</span>
              <h3 className="font-sans text-sm font-semibold text-white">Guaranteed Reactor Booking</h3>
              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                Protect your development timelines from queue delay. Long-term contract agreements unlock dedicated chemical reactor cycle allocations, securing monthly synthesis quotas with fixed 12-month priced index protections.
              </p>
            </div>
          </div>
        </div>

        {/* Scientific Workflow Preview Card */}
        <div className="border border-white/5 bg-neutral-900/10 p-8 rounded-[32px] backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-teal-500/[0.01] blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-teal-400">HPLC VERIFICATION ASSURED</span>
              <h3 className="font-sans text-base font-semibold text-white mt-1.5 mb-2">Have a custom sequence or specific salt requirement?</h3>
              <p className="font-sans text-xs text-neutral-400 font-light max-w-xl leading-relaxed">
                Our synthesis teams review sequences for solubility profiles, steric hindrance risks, and aggregation thresholds before launching production. All custom orders include full HPLC chromatography & MS deconvolution traces.
              </p>
            </div>
            
            <button
              onClick={() => onContactClick()}
              className="rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 font-sans text-[10px] font-bold tracking-wider uppercase transition-all shrink-0 text-white"
            >
              Consult a PhD Chemist
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
