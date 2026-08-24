/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Peptide } from "../types";
import { PEPTIDES_CATALOG } from "../data";
import { 
  ArrowLeft, FileSpreadsheet, ShieldCheck, Check, Copy, 
  FlaskConical, Microscope, Clock, Package, AlertCircle, 
  ChevronDown, ChevronUp, Download, CheckCircle2, ArrowRight,
  Dna, Sparkles, Layers, Box, Thermometer, Info, Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import QualityConsole from "./QualityConsole";

interface ProductDetailsProps {
  peptide: Peptide;
  onBack: () => void;
  onInitiateInquiry: (peptideName: string) => void;
  onAddToRFQ: (peptideName: string) => void;
  isInRFQ: boolean;
  onSelectRelated?: (peptideId: string) => void;
}

const PEPTIDE_IMAGES: Record<string, string> = {
  "AP-3304": "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=1200&auto=format&fit=crop", // Laboratory pipette & formulation
  "AP-1571": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop", // Clinical premium equipment
  "AP-8820": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1200&auto=format&fit=crop", // Glass prismatic refraction
  "AP-4071": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop", // Deep cobalt formulation vial
  "AP-5510": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop", // High-tech clean vial
  "AP-7022": "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1200&auto=format&fit=crop", // Laser-aligned spectrum
};

export default function ProductDetails({ 
  peptide, 
  onBack, 
  onInitiateInquiry, 
  onAddToRFQ, 
  isInRFQ,
  onSelectRelated
}: ProductDetailsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [copiedSeq, setCopiedSeq] = useState(false);
  const [copiedCas, setCopiedCas] = useState(false);
  const [activeTab, setActiveTab] = useState<"pathways" | "quality" | "handling" | "formats">("pathways");

  const handleCopySequence = () => {
    navigator.clipboard.writeText(peptide.sequence);
    setCopiedSeq(true);
    setTimeout(() => setCopiedSeq(false), 2000);
  };

  const handleCopyCas = () => {
    navigator.clipboard.writeText(peptide.casNumber);
    setCopiedCas(true);
    setTimeout(() => setCopiedCas(false), 2000);
  };

  const relatedList = peptide.relatedProducts 
    ? peptide.relatedProducts.map(id => PEPTIDES_CATALOG.find(p => p.id === id)).filter(Boolean) as Peptide[]
    : [];

  return (
    <div className={`min-h-screen py-12 sm:py-20 px-5 sm:px-8 lg:px-12 relative overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full bg-teal-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================
            NAVIGATION BREADCRUMB & BACK ACTION
            ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <button 
            onClick={onBack}
            className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer group ${
              isDark ? "text-neutral-400 hover:text-emerald-400" : "text-slate-600 hover:text-teal-700"
            }`}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Product Catalogue</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono opacity-70">
            <span>Catalogue</span>
            <span>/</span>
            <span>{peptide.category}</span>
            <span>/</span>
            <span className={isDark ? "text-emerald-400 font-bold" : "text-teal-700 font-bold"}>{peptide.id}</span>
          </div>
        </div>

        {/* ========================================================
            MAIN PRODUCT SPECIFICATION SHOWCASE (HERO SPLIT)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual Showcase & Active Sequence */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Media Container */}
            <div className={`relative h-[420px] w-full overflow-hidden rounded-[32px] border shadow-2xl ${
              isDark ? "bg-neutral-900 border-white/10" : "bg-white border-slate-200"
            }`}>
              <img 
                src={PEPTIDE_IMAGES[peptide.id] || PEPTIDE_IMAGES["AP-3304"]} 
                alt={peptide.name} 
                className="h-full w-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              
              {/* Floating Top Tag */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 bg-neutral-950/85 px-3.5 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur font-bold">
                  {peptide.id}
                </span>
                <span className="font-sans text-xs uppercase font-bold tracking-wider text-neutral-200 bg-neutral-950/80 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur">
                  {peptide.category}
                </span>
              </div>

              {/* Floating Bottom Verified Quality Seal */}
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-neutral-950/90 backdrop-blur-md border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-mono font-bold text-white text-xs">{peptide.purity}</span>
                </div>
                <span className="font-mono text-[10px] uppercase text-emerald-400/90 tracking-wider">HPLC Certified</span>
              </div>
            </div>

            {/* Sequence Box with High Ergonomics */}
            <div className={`p-6 rounded-3xl border backdrop-blur-md space-y-3 ${
              isDark ? "bg-neutral-900/40 border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Dna className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold opacity-80">
                    Amino Acid Sequence
                  </span>
                </div>
                <button
                  onClick={handleCopySequence}
                  className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                    copiedSeq ? "text-emerald-400" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {copiedSeq ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Sequence</span>
                    </>
                  )}
                </button>
              </div>

              <div className={`p-3.5 rounded-2xl font-mono text-xs leading-relaxed select-all break-all border font-light ${
                isDark ? "bg-neutral-950/70 border-white/5 text-neutral-300" : "bg-slate-50 border-slate-200 text-slate-800"
              }`}>
                {peptide.sequence}
              </div>
            </div>

            {/* Available Formats / Vial Size Options */}
            <div className={`p-6 rounded-3xl border backdrop-blur-md space-y-3 ${
              isDark ? "bg-neutral-900/40 border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold opacity-80 block">
                Standard Vial Formats & Sizing
              </span>
              <div className="flex flex-wrap gap-2">
                {peptide.vialSizes.map((size) => (
                  <span 
                    key={size}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold border ${
                      isDark 
                        ? "bg-white/[0.04] border-white/10 text-emerald-300" 
                        : "bg-teal-50 border-teal-200 text-teal-900"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="font-sans text-xs opacity-70 font-light">
                Custom aliquot sizes and multi-milligram bulk batch configurations are available upon request.
              </p>
            </div>
          </div>

          {/* Right Column: Molecular Identity & Specifications & Action Bar */}
          <div className="lg:col-span-7 space-y-8">
            {/* Title & Chemical Identity */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider ${
                  isDark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-teal-50 text-teal-800 border border-teal-200"
                }`}>
                  Research Grade Compound
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs opacity-60">
                  <span>CAS: {peptide.casNumber}</span>
                  <button 
                    onClick={handleCopyCas}
                    title="Copy CAS"
                    className="hover:opacity-100 opacity-60 transition-opacity"
                  >
                    {copiedCas ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                {peptide.name}
              </h1>

              <p className="font-mono text-xs sm:text-sm italic opacity-75">
                {peptide.chemicalName}
              </p>

              <p className="font-sans text-sm sm:text-base font-light leading-relaxed opacity-90 pt-2">
                {peptide.description}
              </p>
            </div>

            {/* Core Molecular Metrics Table */}
            <div className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-6 ${
              isDark ? "bg-neutral-900/40 border-white/10" : "bg-white border-slate-200 shadow-md"
            }`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] font-bold opacity-80">
                  Molecular Specifications
                </h3>
                <span className="font-mono text-[10px] text-emerald-400 font-bold">BATCH RELEASE VERIFIED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-mono">
                <div>
                  <span className="text-[9px] uppercase tracking-wider block opacity-60">Molecular Formula</span>
                  <span className="text-sm font-semibold mt-1 block select-all">{peptide.formula}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block opacity-60">Molecular Mass</span>
                  <span className="text-sm font-semibold mt-1 block select-all">{peptide.molecularWeight.toFixed(2)} g/mol</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block opacity-60">Physical State</span>
                  <span className="text-sm font-semibold mt-1 block">{peptide.form}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block opacity-60">Purity Standard</span>
                  <span className="text-sm font-semibold mt-1 block text-emerald-400">{peptide.purity}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[9px] uppercase tracking-wider block opacity-60">Recommended Storage</span>
                  <span className="text-xs font-sans font-light mt-1 block opacity-90 leading-relaxed">{peptide.recommendedStorage}</span>
                </div>
              </div>

              {/* Documentation Available Badge List */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold opacity-70 block">
                  Quality Certificates Supplied With Batch:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {peptide.documentationAvailable?.map((doc, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-sans font-light ${
                        isDark ? "bg-neutral-950/60 border-white/5 text-neutral-300" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Procurement / RFQ Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onAddToRFQ(peptide.name)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                  isInRFQ
                    ? isDark
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                      : "bg-teal-100 border-teal-500 text-teal-900"
                    : isDark
                      ? "bg-white text-neutral-950 hover:bg-neutral-200 border-white"
                      : "bg-teal-700 hover:bg-teal-800 text-white border-teal-700"
                }`}
              >
                <Package className="h-4 w-4" />
                <span>{isInRFQ ? "Compound in Sourcing Workspace" : "Add to Sourcing Workspace"}</span>
              </button>

              <button
                onClick={() => onInitiateInquiry(peptide.name)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                  isDark
                    ? "bg-neutral-900 hover:bg-neutral-850 text-white border-white/15"
                    : "bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm"
                }`}
              >
                <span>Request Commercial Pricing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================
            INTERACTIVE DETAIL TABS (PATHWAYS, HPLC, HANDLING, FORMATS)
            ======================================================== */}
        <div className="space-y-6 pt-6">
          
          {/* Tab Navigation Header */}
          <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar gap-2">
            {[
              { id: "pathways", label: "Biological Pathways & Research", icon: Microscope },
              { id: "quality", label: "Analytical HPLC & Purity", icon: FileSpreadsheet },
              { id: "handling", label: "Handling & Storage Safety", icon: ShieldCheck },
              { id: "formats", label: "Packaging & Delivery Solutions", icon: Box },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                    isActive
                      ? isDark
                        ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
                        : "text-teal-700 border-teal-700 bg-teal-50"
                      : "text-neutral-500 border-transparent hover:text-neutral-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Biological Mechanism & Target Pathways */}
          {activeTab === "pathways" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isDark ? "bg-neutral-900/30 border-white/10" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              {peptide.scientificBackground && (
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold opacity-60 block">
                    Molecular Bio-Mechanism
                  </span>
                  <p className="font-sans text-sm font-light leading-relaxed opacity-90 max-w-4xl">
                    {peptide.scientificBackground}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold opacity-60 block">
                  Targeted Research Pathways & Clinical Models
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {peptide.researchApplications?.map((app, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isDark ? "bg-neutral-950/60 border-white/5" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                        <span>MODEL 0{idx + 1}</span>
                      </div>
                      <p className="font-sans text-xs font-light leading-relaxed opacity-85">{app}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: HPLC Quality Console */}
          {activeTab === "quality" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isDark ? "bg-neutral-900/30 border-white/10" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold">Analytical Quality Verification</h3>
                <p className="text-xs font-light opacity-80 leading-relaxed max-w-3xl">
                  Every peptide synthesized in our partner network undergoes rigorous Reverse-Phase High-Performance Liquid Chromatography (RP-HPLC) and Quadrupole Mass Spectrometry (MS) to verify exact sequence structure and eliminate truncated fragments.
                </p>
              </div>

              <div className="pt-2">
                <QualityConsole preselectedPeptideId={peptide.id} />
              </div>
            </motion.div>
          )}

          {/* Tab 3: Handling & Safety Protocol */}
          {activeTab === "handling" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isDark ? "bg-neutral-900/30 border-white/10" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? "bg-neutral-950/60 border-white/5" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                    <Thermometer className="h-4 w-4" />
                    <span>Cold-Chain Storage & Stability</span>
                  </div>
                  <p className="font-sans text-xs font-light leading-relaxed opacity-85">
                    Lyophilized powder remains stable for up to 36 months when stored desiccated at -20°C in amber glass vials protected from UV light. Once reconstituted, solution should be maintained at 2-8°C and used within 21 days.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? "bg-neutral-950/60 border-white/5" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                    <AlertCircle className="h-4 w-4" />
                    <span>Research Compliance Notice</span>
                  </div>
                  <p className="font-sans text-xs font-light leading-relaxed opacity-85">
                    All products listed are intended strictly for laboratory research, analytical testing, and preclinical development purposes. Not for direct human consumption, veterinary medication, or clinical diagnostics.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Packaging & Delivery Solutions */}
          {activeTab === "formats" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isDark ? "bg-neutral-900/30 border-white/10" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold">Custom Packaging & Delivery Solutions</h3>
                <p className="text-xs font-light opacity-80 leading-relaxed max-w-3xl">
                  We offer end-to-end presentation and packaging capabilities for enterprise B2B partners, including private labelling, specialized cartridge fillings, multi-vial master boxes, and injectable pen solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { title: "Lyophilized Vials", desc: "Hermetically sealed 2ml to 10ml borosilicate glass vials with rubber stoppers and flip-off seals." },
                  { title: "Injectable Pen Solutions", desc: "Pre-filled multi-dose pen systems and dual-chamber reconstitution devices." },
                  { title: "Private Label Branding", desc: "Custom designed boxed kits, branded labels, tamper-evident seals, and batch QR code verification." },
                ].map((sol, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-1.5 ${
                      isDark ? "bg-neutral-950/60 border-white/5" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="font-mono text-xs text-emerald-400 font-bold">0{idx+1}</span>
                    <h4 className="font-semibold text-sm">{sol.title}</h4>
                    <p className="text-xs font-light opacity-75 leading-relaxed">{sol.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* ========================================================
            RELATED RESEARCH COMPOUNDS
            ======================================================== */}
        {relatedList.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold block">
                  EXPLORE COMPENDIUM
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold mt-1">Related Research Compounds</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedList.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated ? onSelectRelated(rel.id) : onInitiateInquiry(rel.name)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isDark 
                      ? "bg-neutral-900/40 border-white/10 hover:border-emerald-500/30 hover:bg-neutral-900/60" 
                      : "bg-white border-slate-200 hover:border-teal-500/40 hover:shadow-md"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {rel.id}
                      </span>
                      <span className="font-mono text-[10px] opacity-60">{rel.purity}</span>
                    </div>
                    <h4 className={`font-semibold text-lg group-hover:text-emerald-400 transition-colors ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      {rel.name}
                    </h4>
                    <p className="text-xs opacity-75 font-light line-clamp-2">{rel.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="opacity-60">{rel.molecularWeight.toFixed(1)} g/mol</span>
                    <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            COMMERCIAL INQUIRY CALLOUT
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 sm:p-12 rounded-[32px] border text-center space-y-6 backdrop-blur-2xl ${
            isDark
              ? "bg-gradient-to-b from-neutral-900/80 to-neutral-950/90 border-white/10 shadow-2xl"
              : "bg-gradient-to-b from-white to-slate-100 border-slate-200 shadow-lg"
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold block">
              ENTERPRISE B2B SUPPLY
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
              Ready to Order or Request Volume Pricing?
            </h2>
            <p className="text-xs sm:text-sm opacity-80 font-light leading-relaxed">
              Contact our scientific procurement team to discuss wholesale supply tiers, custom batch formulation, delivery lead times, and tailored payment terms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onInitiateInquiry(peptide.name)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-extrabold transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                isDark
                  ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_25px_rgba(52,211,153,0.3)]"
                  : "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20"
              }`}
            >
              <span>Speak With Our Team</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onBack}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                isDark
                  ? "border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white"
                  : "border-slate-300 bg-white hover:bg-slate-50 text-slate-800"
              }`}
            >
              <span>Browse Other Compounds</span>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
