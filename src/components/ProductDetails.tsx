/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Peptide } from "../types";
import { 
  ArrowLeft, FileSpreadsheet, ShieldCheck, Check, Copy, 
  FlaskConical, Microscope, Clock, Package, AlertCircle, ChevronDown, ChevronUp, Download
} from "lucide-react";
import QualityConsole from "./QualityConsole";

interface ProductDetailsProps {
  peptide: Peptide;
  onBack: () => void;
  onInitiateInquiry: (peptideName: string) => void;
  onAddToRFQ: (peptideName: string) => void;
  isInRFQ: boolean;
}

const PEPTIDE_IMAGES: Record<string, string> = {
  "AP-3304": "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=1000&auto=format&fit=crop", // Luxury laboratory pipette
  "AP-1571": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop", // Clinical premium equipment
  "AP-8820": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1000&auto=format&fit=crop", // Glass-refracted prism
  "AP-4071": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop", // Deep cobalt formulation vial
  "AP-5510": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000&auto=format&fit=crop", // High-tech clean white-teal vial
  "AP-7022": "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1000&auto=format&fit=crop", // Laser-aligned spectrum
};

export default function ProductDetails({ 
  peptide, 
  onBack, 
  onInitiateInquiry, 
  onAddToRFQ, 
  isInRFQ 
}: ProductDetailsProps) {
  const [copied, setCopied] = useState(false);
  const [showHPLC, setShowHPLC] = useState(false);
  const [showApps, setShowApps] = useState(true);
  const [showSafety, setShowSafety] = useState(false);

  const handleCopySequence = () => {
    navigator.clipboard.writeText(peptide.sequence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-12 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Back Link with minimal, elegant layout */}
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-neutral-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.2} />
          <span>Return to Sourcing Workspace</span>
        </button>

        {/* Product Page Main Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Visual flagship image & Active Molecular Sequence */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative h-[480px] w-full overflow-hidden bg-neutral-900 rounded-[32px] border border-white/5 shadow-2xl">
              <img 
                src={PEPTIDE_IMAGES[peptide.id] || "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=1000&auto=format&fit=crop"} 
                alt={peptide.name} 
                className="h-full w-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 bg-neutral-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/10 backdrop-blur font-bold">
                  {peptide.id}
                </span>
              </div>
            </div>

            {/* Sequence block - Highly readable & accessible */}
            <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                  Amino Acid Chain Sequence
                </span>
                <button
                  onClick={handleCopySequence}
                  className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Sequence</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs text-neutral-300 leading-relaxed break-all select-all tracking-wider font-light bg-neutral-950/40 p-4 rounded-xl border border-white/5">
                {peptide.sequence}
              </p>
            </div>
          </div>

          {/* Right Column: Key scientific specs and actions (No nested tabs here!) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 mb-2">
                <span>Clinical & Sourcing Specifications</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-2">
                {peptide.name}
              </h1>
              <p className="font-mono text-xs text-neutral-400 tracking-wider">
                {peptide.chemicalName}
              </p>
              <p className="mt-5 font-sans text-sm text-neutral-300 font-light leading-relaxed">
                {peptide.description}
              </p>
            </div>

            {/* CORE TECHNICAL SPECIFICATIONS SHEET - DIRECT DISPLAY WITHOUT TABS */}
            <div className="bg-neutral-900/20 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold border-b border-white/5 pb-4">
                Primary Molecular Identity Data
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500">Molecular Formula</div>
                  <div className="font-mono text-sm text-neutral-200 mt-1 font-light select-all">{peptide.formula}</div>
                </div>
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500">Molecular Mass</div>
                  <div className="font-mono text-sm text-neutral-200 mt-1 font-light select-all">{peptide.molecularWeight.toFixed(2)} g/mol</div>
                </div>
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500">CAS Registry Number</div>
                  <div className="font-mono text-sm text-neutral-200 mt-1 font-light select-all">{peptide.casNumber}</div>
                </div>
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500">Purity Standard</div>
                  <div className="font-mono text-sm text-emerald-400 mt-1 font-semibold">{peptide.purity}</div>
                </div>
                <div>
                  <div className="font-sans text-[8px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Recommended Storage</div>
                  <div className="font-sans text-xs text-neutral-300 mt-1 font-light leading-relaxed">{peptide.recommendedStorage}</div>
                </div>
                <div>
                  <div className="font-sans text-[8px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Available Formats</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {peptide.vialSizes.map((size) => (
                      <span key={size} className="font-mono text-[9px] bg-neutral-950 text-neutral-400 px-2.5 py-1 rounded-md border border-white/5">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documentation Available list - displayed immediately */}
              <div className="border-t border-white/5 pt-6">
                <div className="font-sans text-[8px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
                  Verification Records Issued
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {peptide.documentationAvailable?.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-neutral-950/60 p-3 rounded-xl border border-white/5">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-400 shrink-0" strokeWidth={1.2} />
                      <span className="font-sans text-xs text-neutral-300 font-light truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PROCUREMENT ACTIONS / RFQ WORKSPACE WORKFLOW */}
            <div className="flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-8">
              <button
                onClick={() => onAddToRFQ(peptide.name)}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-full font-sans text-xs font-bold tracking-[0.15em] uppercase border transition-all ${
                  isInRFQ
                    ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                    : "bg-white hover:bg-neutral-200 border-white text-neutral-950"
                }`}
              >
                <Package className="h-4 w-4" />
                <span>{isInRFQ ? "In Sourcing Workspace" : "Add to RFQ Workspace"}</span>
              </button>

              <button
                onClick={() => onInitiateInquiry(peptide.name)}
                className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-850 text-white border border-white/10 py-4 rounded-full font-sans text-xs font-bold tracking-[0.15em] uppercase transition-all"
              >
                <span>Request Technical Dossier</span>
              </button>
            </div>
          </div>

        </div>

        {/* EXPANDABLE SECTIONS FOR EXTENDED RESEARCH, HPLC DATA, AND VALIDATED APPLICATIONS */}
        <div className="border-t border-white/5 pt-12 space-y-6">
          
          {/* Expandable Section 1: Research Applications */}
          <div className="border border-white/5 rounded-3xl bg-neutral-900/10 overflow-hidden">
            <button
              onClick={() => setShowApps(!showApps)}
              className="w-full flex items-center justify-between p-6 md:px-8 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Microscope className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />
                <span className="font-sans text-sm font-semibold tracking-wider uppercase text-white">
                  Validated Research Applications
                </span>
              </div>
              {showApps ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
            </button>

            {showApps && (
              <div className="p-6 md:p-8 border-t border-white/5 bg-neutral-950/40 space-y-6">
                {peptide.scientificBackground && (
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 mb-2">Molecular Bio-Mechanism</div>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                      {peptide.scientificBackground}
                    </p>
                  </div>
                )}
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Targeted Pathways</div>
                  <ul className="space-y-3">
                    {peptide.researchApplications?.map((app, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs text-neutral-300 font-light leading-relaxed bg-neutral-900/30 p-3 rounded-2xl border border-white/5">
                        <span className="h-5 w-5 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center font-mono text-[8px] text-emerald-400 shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Expandable Section 2: Interactive HPLC Chromatography Data */}
          <div className="border border-white/5 rounded-3xl bg-neutral-900/10 overflow-hidden">
            <button
              onClick={() => setShowHPLC(!showHPLC)}
              className="w-full flex items-center justify-between p-6 md:px-8 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />
                <span className="font-sans text-sm font-semibold tracking-wider uppercase text-white">
                  Analytical Reports & High-Resolution Chromatograms (HPLC / MS)
                </span>
              </div>
              {showHPLC ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
            </button>

            {showHPLC && (
              <div className="p-6 md:p-8 border-t border-white/5 bg-neutral-950/60">
                <p className="font-sans text-xs text-neutral-400 mb-6 font-light leading-relaxed">
                  Below is the interactive batch chromatography visualization generated directly from our reverse-phase ultra-performance liquid chromatography console. This represents current molecular validation standards.
                </p>
                <QualityConsole preselectedPeptideId={peptide.id} />
              </div>
            )}
          </div>

          {/* Expandable Section 3: Safety Standards & Regulatory Declarations */}
          <div className="border border-white/5 rounded-3xl bg-neutral-900/10 overflow-hidden">
            <button
              onClick={() => setShowSafety(!showSafety)}
              className="w-full flex items-center justify-between p-6 md:px-8 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />
                <span className="font-sans text-sm font-semibold tracking-wider uppercase text-white">
                  Handling Safety Dossier & Storage Protocols
                </span>
              </div>
              {showSafety ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
            </button>

            {showSafety && (
              <div className="p-6 md:p-8 border-t border-white/5 bg-neutral-950/40 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-neutral-900/40 p-5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider">Storage Protocol</span>
                    </div>
                    <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed">
                      Lyophilized products are highly stable at -20°C for up to 36 months when dry and protected from solar UV index. Avoid unnecessary freeze-thaw reconstitutions to protect disulfide bridge bindings and secondary stereochemical structure.
                    </p>
                  </div>
                  <div className="bg-neutral-900/40 p-5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-amber-500 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider">Sourcing Compliance</span>
                    </div>
                    <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed">
                      This peptide compound is synthesized under strict quality-control thresholds for laboratory research and development use only. It is not approved for immediate personal, diagnostic or direct clinical therapy.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5 justify-between items-center">
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                    OSHA SAFETY DATA SHEET (SDS-3820)
                  </span>
                  <button 
                    onClick={() => alert("Downloading SDS PDF. HPLC chromatograms and batch traces are accessible inside the verification console.")}
                    className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:bg-white/5 text-neutral-300 hover:text-white transition-all text-xs font-sans"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download SDS Datasheet</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
