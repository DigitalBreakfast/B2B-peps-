/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PEPTIDES_CATALOG } from "../data";
import { ResearchCategory, Peptide } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  FlaskConical, ChevronDown, ChevronUp, Check, FileSpreadsheet, ArrowRight, 
  Sparkles, Microscope, BookOpen, ShieldCheck, Search, X, Star, Layers, 
  ArrowLeftRight, CheckCircle, Trash2, ShoppingCart, Info, Copy
} from "lucide-react";

interface ProductCatalogProps {
  onSelectPeptideForCoA: (peptideId: string) => void;
  onInitiateInquiry: (peptideName: string) => void;
  onSelectProduct: (peptideId: string) => void;
  initialCategoryFilter?: string;
}

const PEPTIDE_IMAGES: Record<string, string> = {
  "AP-3304": "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=600&auto=format&fit=crop", // Luxury laboratory pipette
  "AP-1571": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", // Clinical premium equipment
  "AP-8820": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=600&auto=format&fit=crop", // Glass prismatic refraction
  "AP-4071": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600&auto=format&fit=crop", // Deep cobalt formulation vial
  "AP-5510": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop", // High-tech clean white-teal vial
  "AP-7022": "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=600&auto=format&fit=crop", // Laser-aligned spectrum
};

export default function ProductCatalog({ 
  onSelectPeptideForCoA, 
  onInitiateInquiry,
  onSelectProduct,
  initialCategoryFilter = "All"
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [expandedPeptide, setExpandedPeptide] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Tab control inside the specifications block (per peptide ID)
  const [activeDetailTabs, setActiveDetailTabs] = useState<Record<string, "overview" | "specs" | "apps" | "docs">>({});

  // B2B Comparison & Inquiry List States
  const [savedPeptides, setSavedPeptides] = useState<string[]>([]); // Saved peptide names/IDs
  const [comparedPeptides, setComparedPeptides] = useState<string[]>([]); // Compared peptide IDs
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync category filter if changed from parent
  React.useEffect(() => {
    setSelectedCategory(initialCategoryFilter);
  }, [initialCategoryFilter]);

  const categories = ["All", ...Object.values(ResearchCategory)];

  // Filter logic integrating category selection and text search query
  const filteredPeptides = PEPTIDES_CATALOG.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.chemicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.casNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedPeptide(expandedPeptide === id ? null : id);
    // Initialize tab as 'overview' if not set
    if (!activeDetailTabs[id]) {
      setActiveDetailTabs(prev => ({ ...prev, [id]: "overview" }));
    }
  };

  const handleSelectRelated = (relatedId: string) => {
    const p = PEPTIDES_CATALOG.find(x => x.id === relatedId);
    if (p) {
      setSelectedCategory("All");
      setSearchQuery("");
      setExpandedPeptide(relatedId);
      setActiveDetailTabs(prev => ({ ...prev, [relatedId]: "overview" }));
      setTimeout(() => {
        const el = document.getElementById(`product-card-${relatedId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }
  };

  // Toggle Save for Sourcing Enquiry
  const toggleSaveForEnquiry = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedPeptides.includes(name)) {
      setSavedPeptides(savedPeptides.filter(p => p !== name));
    } else {
      setSavedPeptides([...savedPeptides, name]);
      // Brief visual indicator/drawer alert
    }
  };

  // Toggle Product Comparison List (Max 3 items)
  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparedPeptides.includes(id)) {
      setComparedPeptides(comparedPeptides.filter(p => p !== id));
    } else {
      if (comparedPeptides.length >= 3) {
        // Limit to 3 items
        alert("You can compare up to 3 compounds simultaneously.");
        return;
      }
      setComparedPeptides([...comparedPeptides, id]);
    }
  };

  const clearCompare = () => {
    setComparedPeptides([]);
    setShowCompareModal(false);
  };

  const handleCopySequence = (seq: string, id: string) => {
    navigator.clipboard.writeText(seq);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Transfer all saved list items directly to the Sourcing Portal Inquiry Form
  const handleBulkEnquirySubmit = () => {
    if (savedPeptides.length === 0) return;
    const bulkListString = savedPeptides.join(", ");
    onInitiateInquiry(bulkListString);
    setShowSavedDrawer(false);
  };

  return (
    <section id="products" className="relative bg-neutral-950 px-6 sm:px-8 lg:px-12 py-32 border-t border-white/5">
      {/* Background elegant gradient glows */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 h-96 w-96 rounded-full bg-teal-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl">
        
        {/* Section Header with Luxurious Spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400 mb-4">
              <span>Compendium Sourcing</span>
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Precision Molecules
            </h2>
            <p className="mt-4 font-sans text-xs text-neutral-400 leading-relaxed font-light">
              We help businesses build reliable peptide programs. Explore certified compound profiles engineered for critical clinical models and enterprise-scale B2B supply.
            </p>
          </div>
          
          <div className="shrink-0 font-mono text-[9px] tracking-[0.25em] text-neutral-400 flex items-center gap-2 border border-white/5 bg-neutral-900/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>HPLC & MS ACCREDITED BATCHES</span>
          </div>
        </div>

        {/* Categories & Search Console Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 border-b border-white/5 pb-8" id="product-search-console">
          {/* Categories Tab Bar with Smooth Micro-interactions */}
          <div className="no-scrollbar flex overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex space-x-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setExpandedPeptide(null);
                    }}
                    className={`relative whitespace-nowrap rounded-full px-5 py-3 font-sans text-[10px] font-semibold tracking-[0.18em] transition-all border duration-300 uppercase ${
                      isSelected
                        ? "bg-white border-white text-neutral-950 font-bold"
                        : "bg-neutral-950/40 border-white/5 text-neutral-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Elegant Search Input */}
          <div className="relative w-full lg:max-w-xs shrink-0">
            <Search className="absolute left-4 top-3.5 h-3.5 w-3.5 text-neutral-500" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by Name, CAS, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/40 border border-white/5 hover:border-white/10 rounded-full py-3 pl-10 pr-4 text-xs text-white placeholder-neutral-500 focus:border-white/20 focus:bg-neutral-900/60 outline-none transition-all font-sans"
              aria-label="Search Peptide Catalogue"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-neutral-500 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Empty State */}
        {filteredPeptides.length === 0 && (
          <div className="text-center py-20 bg-neutral-900/5 border border-white/5 rounded-3xl p-8 max-w-md mx-auto">
            <FlaskConical className="h-10 w-10 text-neutral-600 mx-auto mb-4" strokeWidth={1} />
            <h4 className="font-sans text-sm font-semibold text-white">No compound matches found</h4>
            <p className="font-sans text-xs text-neutral-400 mt-2 font-light">
              Refine your search query or select another category. For custom sequences, contact our PhD chemists directly.
            </p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-6 rounded-full border border-white/10 px-5 py-2 text-[10px] uppercase font-mono tracking-wider text-neutral-300 hover:bg-white/5"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Interactive Peptide Grid with Apple-Style Easing */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
          id="product-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredPeptides.map((peptide) => {
              const isExpanded = expandedPeptide === peptide.id;
              const isSaved = savedPeptides.includes(peptide.name);
              const isComparing = comparedPeptides.includes(peptide.id);
              const activeDetailTab = activeDetailTabs[peptide.id] || "overview";

              const setDetailTab = (tab: "overview" | "specs" | "apps" | "docs") => {
                setActiveDetailTabs(prev => ({ ...prev, [peptide.id]: tab }));
              };
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={peptide.id}
                  id={`product-card-${peptide.id}`}
                  className="group relative flex flex-col justify-between rounded-[32px] border border-white/5 bg-neutral-900/10 p-7 backdrop-blur-sm hover:border-white/10 hover:bg-neutral-900/25 transition-all duration-700 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
                >
                  {/* Subtle interior ambient glow */}
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/[0.01] blur-3xl group-hover:bg-emerald-500/[0.02] transition-all duration-700 pointer-events-none" />

                  <div>
                    {/* Premium Product Image Cover - Large and Bold */}
                    <div className="relative h-72 w-full overflow-hidden bg-neutral-950 rounded-[24px] mb-8 shadow-inner">
                      <img 
                        src={PEPTIDE_IMAGES[peptide.id]} 
                        alt={peptide.name} 
                        className="h-full w-full object-cover opacity-65 group-hover:opacity-80 group-hover:scale-[1.03] transition-transform duration-1000 ease-out" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-95" />
                      
                      {/* Floating metadata badges */}
                      <div className="absolute top-5 left-5">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-emerald-400 bg-neutral-950/80 backdrop-blur px-3 py-1.5 rounded-full border border-emerald-500/10 font-bold uppercase">
                          {peptide.id}
                        </span>
                      </div>
                      
                      <div className="absolute top-5 right-5">
                        <span className="font-sans text-[8px] uppercase font-bold tracking-[0.25em] text-neutral-300 bg-neutral-950/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/5">
                          {peptide.category}
                        </span>
                      </div>

                      {/* Floating Quick Action Buttons on Image */}
                      <div className="absolute bottom-5 right-5 flex items-center gap-2">
                        {/* Save to enquiry list */}
                        <button
                          onClick={(e) => toggleSaveForEnquiry(peptide.name, e)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur border transition-all ${
                            isSaved 
                              ? "bg-emerald-400 border-emerald-400 text-neutral-950" 
                              : "bg-neutral-950/70 border-white/10 text-neutral-300 hover:bg-neutral-950 hover:text-white"
                          }`}
                          title={isSaved ? "Saved in your enquiry list" : "Save for bulk sourcing enquiry"}
                        >
                          <Star className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} strokeWidth={1.5} />
                        </button>

                        {/* Toggle Compare */}
                        <button
                          onClick={(e) => toggleCompare(peptide.id, e)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur border transition-all ${
                            isComparing 
                              ? "bg-teal-400 border-teal-400 text-neutral-950" 
                              : "bg-neutral-950/70 border-white/10 text-neutral-300 hover:bg-neutral-950 hover:text-white"
                          }`}
                          title={isComparing ? "Remove from comparison" : "Add to comparison panel"}
                        >
                          <ArrowLeftRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    {/* Meta Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-mono text-[9px] tracking-wider text-neutral-500">
                        CAS {peptide.casNumber}
                      </div>
                      <div className="font-mono text-[9px] tracking-widest text-emerald-400 font-semibold bg-emerald-500/5 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
                        {peptide.purity}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-2xl font-semibold tracking-tight text-white mb-2 transition-colors duration-300">
                      {peptide.name}
                    </h3>
                    <p className="font-mono text-[10px] text-neutral-400 italic mb-4 truncate tracking-wider">
                      {peptide.chemicalName}
                    </p>

                    {/* Brief description */}
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed mb-8 font-light">
                      {peptide.description}
                    </p>

                    {/* Quick Specs Summary Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/5 pt-6 mb-8 text-[10px] font-mono">
                      <div>
                        <div className="text-neutral-500 uppercase tracking-[0.2em] text-[8px]">Empirical Formula</div>
                        <div className="text-neutral-300 mt-0.5 truncate font-light">{peptide.formula}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 uppercase tracking-[0.2em] text-[8px]">Molecular Mass</div>
                        <div className="text-neutral-300 mt-0.5 font-light">{peptide.molecularWeight.toFixed(1)} g/mol</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 uppercase tracking-[0.2em] text-[8px]">Physical Format</div>
                        <div className="text-neutral-300 mt-0.5 font-light">{peptide.form}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 uppercase tracking-[0.2em] text-[8px]">Purity Standard</div>
                        <div className="text-emerald-400 font-semibold mt-0.5">HPLC Verified</div>
                      </div>
                    </div>

                    {/* PREMIUM SPECIFICATION LAYOUT: Dynamic Tabbed Specifications */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden border-t border-white/5 pt-6 mb-8 space-y-6 text-left"
                        >
                          {/* Section Tabs */}
                          <div className="flex border-b border-white/5 pb-2 overflow-x-auto gap-1 no-scrollbar">
                            {[
                              { id: "overview", label: "Overview" },
                              { id: "specs", label: "Specifications" },
                              { id: "apps", label: "Applications" },
                              { id: "docs", label: "Documentation" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setDetailTab(tab.id as any)}
                                className={`px-3.5 py-2 rounded-xl text-[9px] font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                                  activeDetailTab === tab.id
                                    ? "bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 font-bold"
                                    : "bg-transparent text-neutral-500 hover:text-white border border-transparent"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Tab Content 1: Overview */}
                          {activeDetailTab === "overview" && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              className="space-y-4"
                            >
                              {peptide.scientificBackground && (
                                <div>
                                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 mb-1.5 flex items-center gap-1.5">
                                    <Microscope className="h-3 w-3 text-emerald-400" strokeWidth={1.2} />
                                    <span>Scientific Background</span>
                                  </div>
                                  <p className="font-sans text-xs text-neutral-300 leading-relaxed font-light bg-neutral-950/40 p-4 rounded-2xl border border-white/5">
                                    {peptide.scientificBackground}
                                  </p>
                                </div>
                              )}
                              <div>
                                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 mb-1.5 flex items-center gap-1.5">
                                  <FlaskConical className="h-3 w-3 text-emerald-400" strokeWidth={1.2} />
                                  <span>Active Amino Acid Sequence</span>
                                </div>
                                <div className="flex items-center justify-between bg-neutral-950/80 p-3.5 rounded-2xl border border-white/5 font-mono text-[9px] text-neutral-300 select-all font-light">
                                  <span className="break-all leading-relaxed mr-2">{peptide.sequence}</span>
                                  <button
                                    onClick={() => handleCopySequence(peptide.sequence, peptide.id)}
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-neutral-500 hover:text-emerald-400 shrink-0 transition-colors"
                                    title="Copy sequence to clipboard"
                                  >
                                    {copiedId === peptide.id ? (
                                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Tab Content 2: Chemical Specs */}
                          {activeDetailTab === "specs" && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-2 gap-4 bg-neutral-950/40 p-4 rounded-2xl border border-white/5 text-[11px]">
                                <div>
                                  <div className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Empirical Formula</div>
                                  <div className="text-neutral-200 mt-1 font-mono font-light">{peptide.formula}</div>
                                </div>
                                <div>
                                  <div className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Molecular Mass</div>
                                  <div className="text-neutral-200 mt-1 font-mono font-light">{peptide.molecularWeight.toFixed(2)} g/mol</div>
                                </div>
                                <div>
                                  <div className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Purity Threshold</div>
                                  <div className="text-emerald-400 mt-1 font-mono font-semibold">{peptide.purity}</div>
                                </div>
                                <div>
                                  <div className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Format Type</div>
                                  <div className="text-neutral-200 mt-1 font-sans font-light">{peptide.form}</div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="font-sans text-[8px] uppercase font-bold text-neutral-500 mb-2 tracking-[0.2em]">
                                  Quality Attributes & Purity
                                </div>
                                <ul className="space-y-1.5">
                                  {peptide.benefits.map((benefit, bIndex) => (
                                    <li key={bIndex} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                                      <span className="h-1 w-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}

                          {/* Tab Content 3: Applications */}
                          {activeDetailTab === "apps" && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              className="space-y-4"
                            >
                              {peptide.researchApplications && (
                                <div>
                                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 mb-2 flex items-center gap-1.5">
                                    <BookOpen className="h-3 w-3 text-emerald-400" strokeWidth={1.2} />
                                    <span>Validated Research Applications</span>
                                  </div>
                                  <ul className="space-y-2 bg-neutral-950/40 p-4 rounded-2xl border border-white/5">
                                    {peptide.researchApplications.map((app, appIdx) => (
                                      <li key={appIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                                        <span className="h-1 w-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                        <span>{app}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* Tab Content 4: Documentation & Packaging */}
                          {activeDetailTab === "docs" && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              className="space-y-4"
                            >
                              {peptide.documentationAvailable && (
                                <div>
                                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 mb-2 flex items-center gap-1.5">
                                    <ShieldCheck className="h-3 w-3 text-emerald-400" strokeWidth={1.2} />
                                    <span>Traceability Documents Issued</span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {peptide.documentationAvailable.map((doc, docIdx) => (
                                      <div key={docIdx} className="flex items-center gap-2 bg-neutral-950/50 p-2.5 rounded-xl border border-white/5">
                                        <FileSpreadsheet className="h-3.5 w-3.5 text-neutral-500 shrink-0" strokeWidth={1.2} />
                                        <span className="font-sans text-[10px] text-neutral-300 font-light truncate">{doc}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-4 text-xs bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                                <div>
                                  <div className="font-sans font-semibold text-neutral-400 mb-0.5 text-[11px]">Storage Spec</div>
                                  <p className="text-neutral-300 font-light text-[11px] leading-snug">{peptide.recommendedStorage}</p>
                                </div>
                                <div>
                                  <div className="font-sans font-semibold text-neutral-400 mb-0.5 text-[11px]">Available Vials</div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {peptide.vialSizes.map((size) => (
                                      <span key={size} className="bg-neutral-950 px-2 py-0.5 rounded text-[9px] font-mono border border-white/5 text-neutral-400">
                                        {size}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Related Products */}
                          {peptide.relatedProducts && (
                            <div className="border-t border-white/5 pt-4">
                              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                                <span>Related Compounds</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {peptide.relatedProducts.map((relId) => {
                                  const relProduct = PEPTIDES_CATALOG.find(p => p.id === relId);
                                  return (
                                    <button
                                      key={relId}
                                      onClick={() => handleSelectRelated(relId)}
                                      className="flex items-center gap-1.5 bg-neutral-950/75 hover:bg-neutral-900 px-3 py-2 rounded-xl border border-white/5 hover:border-white/15 transition-all text-left text-[10px] font-sans"
                                    >
                                      <span className="font-mono font-bold text-emerald-400">{relId}</span>
                                      <span className="text-neutral-400 font-light truncate max-w-[100px]">{relProduct?.name || "View"}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Request Pricing inside specifications */}
                          <div className="pt-2">
                            <button
                              onClick={() => onInitiateInquiry(peptide.name)}
                              className="flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 py-3 rounded-2xl font-sans text-[10px] font-bold tracking-[0.15em] uppercase transition-all w-full"
                            >
                              <span>Request Custom Buffer Quote</span>
                              <ArrowRight className="h-3 w-3" strokeWidth={1.2} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions footer */}
                  <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
                    <button
                      onClick={() => onSelectProduct(peptide.id)}
                      className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/10 py-3.5 rounded-full font-sans text-[10px] font-bold tracking-[0.15em] uppercase transition-all w-full"
                    >
                      <span>View Technical Dossier</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => onSelectPeptideForCoA(peptide.id)}
                        className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 py-3 rounded-full font-sans text-[10px] font-bold tracking-[0.15em] uppercase transition-all"
                        title="Inspect chromatograms, purities, and mass spectrogram reports."
                      >
                        <span>Verify CoA</span>
                      </button>

                      <button
                        onClick={() => onInitiateInquiry(peptide.name)}
                        className="flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-200 text-neutral-950 py-3 rounded-full font-sans text-[10px] font-bold tracking-[0.15em] uppercase transition-all"
                      >
                        <span>Inquire</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* FLOATING ACTION PANELS (ENQUIRY LIST & COMPARISON CHANNELS) */}
      
      {/* 1. Saved Enquiry List Float Tray */}
      {savedPeptides.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
          <button
            onClick={() => setShowSavedDrawer(true)}
            className="flex items-center gap-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-neutral-950 px-6 py-4 shadow-3xl transition-all duration-300 hover:scale-[1.02] border border-emerald-400"
            id="floating-enquiry-cart"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            <span className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase">
              Active RFQ ({savedPeptides.length})
            </span>
          </button>
        </div>
      )}

      {/* 2. Floating Compare Bar */}
      {comparedPeptides.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-neutral-900 border border-white/10 p-3.5 rounded-full shadow-3xl backdrop-blur-md max-w-sm sm:max-w-md w-11/12 animate-fade-in-up">
          <div className="flex -space-x-2.5 overflow-hidden pl-2">
            {comparedPeptides.map(id => {
              const p = PEPTIDES_CATALOG.find(x => x.id === id);
              return (
                <div key={id} className="h-7 w-7 rounded-full border border-neutral-900 bg-neutral-950 flex items-center justify-center text-[8px] font-mono font-bold text-emerald-400">
                  {id.replace("AP-", "")}
                </div>
              );
            })}
          </div>
          <div className="flex-1 text-[10px] font-sans text-neutral-300 pl-1 font-light">
            Compare <span className="text-white font-bold">{comparedPeptides.length}</span> compounds
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="font-sans text-[9px] uppercase tracking-wider text-neutral-500 hover:text-neutral-300 py-1.5 px-3 rounded-full hover:bg-white/5 transition-all"
            >
              Clear
            </button>
            <button
              onClick={() => setShowCompareModal(true)}
              className="flex items-center gap-1.5 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 py-1.5 px-4 font-sans text-[9px] font-bold uppercase tracking-wider transition-all"
            >
              <span>Compare</span>
              <ArrowLeftRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* MULTI-PRODUCT COMPARISON OVERLAY MODAL */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4 md:p-8 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-5xl rounded-[32px] border border-white/10 bg-neutral-950/95 p-6 md:p-10 shadow-3xl overflow-hidden max-h-[90vh] flex flex-col"
              id="compare-modal-panel"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400">Side-By-Side Assay Alignment</span>
                  <h3 className="font-sans text-xl font-semibold text-white mt-1">Sourcing Spec Comparison</h3>
                </div>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="p-2 rounded-full border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all bg-neutral-900/40"
                  aria-label="Close comparison panel"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto flex-1 pb-4 no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                      <th className="py-4 pr-6 font-semibold w-1/4">Specification</th>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return (
                          <th key={id} className="py-4 px-6 font-bold text-white w-1/4">
                            <div className="flex items-center justify-between">
                              <span>{p?.name}</span>
                              <span className="text-[8px] text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 px-2 py-0.5 rounded-full font-bold">{id}</span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="font-sans text-xs text-neutral-300 divide-y divide-white/5">
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Research Class</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return <td key={id} className="py-4 px-6 text-neutral-200">{p?.category}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Molecular Formula</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return <td key={id} className="py-4 px-6 font-mono text-[11px] text-neutral-300 font-light">{p?.formula}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Molecular Weight</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return <td key={id} className="py-4 px-6 font-mono text-[11px] text-neutral-300 font-light">{p?.molecularWeight.toFixed(2)} g/mol</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Active Sequence</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return (
                          <td key={id} className="py-4 px-6 font-mono text-[9px] break-all max-w-[200px] leading-relaxed select-all">
                            <div className="bg-neutral-950 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                              <span className="truncate">{p?.sequence}</span>
                              <button
                                onClick={() => handleCopySequence(p?.sequence || "", id)}
                                className="p-1 rounded hover:bg-white/5 text-neutral-500 hover:text-emerald-400 ml-2"
                                title="Copy sequence"
                              >
                                {copiedId === id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Purity Standard</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return (
                          <td key={id} className="py-4 px-6">
                            <span className="font-mono text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-full border border-emerald-500/10 font-bold">
                              {p?.purity}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Storage Protocol</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return <td key={id} className="py-4 px-6 text-neutral-400 leading-snug font-light">{p?.recommendedStorage}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Packaging Sizes</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return (
                          <td key={id} className="py-4 px-6">
                            <div className="flex flex-wrap gap-1.5">
                              {p?.vialSizes.map(size => (
                                <span key={size} className="bg-neutral-900 border border-white/5 px-2 py-0.5 rounded font-mono text-[10px] text-neutral-400 font-semibold">{size}</span>
                              ))}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 pr-6 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">Sourcing Actions</td>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return (
                          <td key={id} className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => { onInitiateInquiry(p?.name || ""); setShowCompareModal(false); }}
                                className="bg-white hover:bg-neutral-200 text-neutral-950 font-bold px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider transition-all"
                              >
                                Enquire
                              </button>
                              <button
                                onClick={() => onSelectPeptideForCoA(id)}
                                className="border border-white/5 hover:border-white/10 hover:bg-white/5 text-neutral-300 font-bold px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider transition-all"
                              >
                                CoA Data
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SAVED ENQUIRY LIST SIDE DRAWER */}
      <AnimatePresence>
        {showSavedDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/80 backdrop-blur-xs">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setShowSavedDrawer(false)} />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 280 }}
              className="relative w-full max-w-md bg-neutral-950 border-l border-white/10 h-full p-8 flex flex-col justify-between shadow-3xl z-10"
              id="saved-enquiry-drawer"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400">Direct Sourcing Queue</span>
                    <h3 className="font-sans text-lg font-semibold text-white mt-1">Sourcing Workspace</h3>
                  </div>
                  <button
                    onClick={() => setShowSavedDrawer(false)}
                    className="p-1.5 rounded-full border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all bg-neutral-900/40"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[60vh] no-scrollbar">
                  {savedPeptides.map((name) => {
                    const matched = PEPTIDES_CATALOG.find(p => p.name === name);
                    return (
                      <div
                        key={name}
                        className="flex items-center justify-between bg-neutral-900/30 border border-white/5 p-4 rounded-2xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <FlaskConical className="h-4.5 w-4.5" strokeWidth={1.2} />
                          </div>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-white">{name}</h4>
                            <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase">{matched?.id} | CAS {matched?.casNumber}</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => toggleSaveForEnquiry(name, e)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all"
                          title="Remove compound"
                        >
                          <Trash2 className="h-4.5 w-4.5 text-neutral-500 hover:text-red-400" strokeWidth={1.2} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500 uppercase">Compounds Selected</span>
                  <span className="text-white font-bold">{savedPeptides.length} Items</span>
                </div>
                
                <p className="font-sans text-[11px] text-neutral-400 leading-normal font-light">
                  Transfer these saved compounds into our secure procurement portal. Our PhD advisors will formulate bespoke pricing matrices based on these parameters.
                </p>

                <button
                  onClick={handleBulkEnquirySubmit}
                  className="w-full py-4 bg-white hover:bg-neutral-200 text-neutral-950 font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Request Specs & Pricing Dossier</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setSavedPeptides([])}
                  className="w-full text-center font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-white transition-all py-1"
                >
                  Clear Sourcing Queue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
