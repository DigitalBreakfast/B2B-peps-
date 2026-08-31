/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { PEPTIDES_CATALOG } from "../data";
import { ResearchCategory, Peptide } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  FlaskConical, ChevronDown, ChevronUp, Check, FileSpreadsheet, ArrowRight, 
  Sparkles, Microscope, BookOpen, ShieldCheck, Search, X, Star, Layers, 
  ArrowLeftRight, CheckCircle, Trash2, ShoppingCart, Info, Copy,
  Dna, Cpu, SlidersHorizontal, ArrowUpRight, Zap, RefreshCw, Filter
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ProductCatalogProps {
  onSelectPeptideForCoA: (peptideId: string) => void;
  onInitiateInquiry: (peptideName: string) => void;
  onSelectProduct: (peptideId: string) => void;
  initialCategoryFilter?: string;
}

const PEPTIDE_IMAGES: Record<string, string> = {
  "AP-3304": "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=800&auto=format&fit=crop", // Laboratory pipette & formulation
  "AP-1571": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop", // Clinical premium equipment
  "AP-8820": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=800&auto=format&fit=crop", // Glass prismatic refraction
  "AP-4071": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800&auto=format&fit=crop", // Deep cobalt formulation vial
  "AP-5510": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop", // High-tech clean vial
  "AP-7022": "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=800&auto=format&fit=crop", // Laser-aligned spectrum
};

export default function ProductCatalog({ 
  onSelectPeptideForCoA, 
  onInitiateInquiry,
  onSelectProduct,
  initialCategoryFilter = "All"
}: ProductCatalogProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [expandedPeptide, setExpandedPeptide] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "purity" | "mw" | "name">("default");
  
  // Tab control inside the specifications block (per peptide ID)
  const [activeDetailTabs, setActiveDetailTabs] = useState<Record<string, "overview" | "specs" | "apps" | "docs">>({});

  // B2B Comparison & Inquiry List States
  const [savedPeptides, setSavedPeptides] = useState<string[]>([]);
  const [comparedPeptides, setComparedPeptides] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync category filter if changed from parent
  React.useEffect(() => {
    setSelectedCategory(initialCategoryFilter);
  }, [initialCategoryFilter]);

  const categories = ["All", ...Object.values(ResearchCategory)];

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PEPTIDES_CATALOG.length };
    PEPTIDES_CATALOG.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & Sort logic
  const filteredPeptides = useMemo(() => {
    let list = PEPTIDES_CATALOG.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q === "" || 
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.chemicalName.toLowerCase().includes(q) ||
        p.casNumber.toLowerCase().includes(q) ||
        p.sequence.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "mw") {
      list = [...list].sort((a, b) => a.molecularWeight - b.molecularWeight);
    } else if (sortBy === "purity") {
      list = [...list].sort((a, b) => b.purity.localeCompare(a.purity));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedPeptide(expandedPeptide === id ? null : id);
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
    }
  };

  // Toggle Product Comparison List (Max 3 items)
  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparedPeptides.includes(id)) {
      setComparedPeptides(comparedPeptides.filter(p => p !== id));
    } else {
      if (comparedPeptides.length >= 3) {
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

  const handleCopySequence = (seq: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(seq);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBulkEnquirySubmit = () => {
    if (savedPeptides.length === 0) return;
    const bulkListString = savedPeptides.join(", ");
    onInitiateInquiry(bulkListString);
    setShowSavedDrawer(false);
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 relative overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Ambient background glows */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 h-[500px] w-[500px] rounded-full bg-teal-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-8 sm:space-y-12">
        
        {/* ========================================================
            HERO INTRO SECTION
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold">
              B2B RESEARCH COMPENDIUM
            </span>
          </div>

          <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] ${
            isDark ? "text-slate-100" : "text-[#0B1B3D]"
          }`}>
            Precision Research Peptides. <br className="hidden sm:inline" />
            <span className={isDark ? "text-emerald-400" : "text-teal-700"}>
              Verified Quality & Direct Supply.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl opacity-85">
            Explore our research peptide catalogue supporting laboratory research, institutional studies, and enterprise-scale B2B supply. Batch-specific analytical documentation and Certificates of Analysis are available upon request.
          </p>

          {/* Quick Quality Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { label: "Purity Threshold", value: "High Purity Research Grade" },
              { label: "Batch Traceability", value: "Documentation Available" },
              { label: "Physical Form", value: "Lyophilized Powder" },
              { label: "Supply Formats", value: "Flexible Order Volumes" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`p-3.5 rounded-2xl border backdrop-blur-sm ${
                  isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <span className="font-mono text-[9px] uppercase tracking-wider block opacity-60">{stat.label}</span>
                <span className={`font-sans text-xs sm:text-sm font-semibold mt-0.5 block ${isDark ? "text-emerald-400" : "text-teal-700"}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ========================================================
            CATEGORY FILTER & SEARCH TOOLBAR
            ======================================================== */}
        <div className={`p-4 sm:p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
          isDark ? "bg-neutral-900/40 border-white/10" : "bg-white border-slate-200 shadow-md"
        }`}>
          {/* Top Row: Search input & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-3.5 h-4 w-4 opacity-50" />
              <input
                type="text"
                placeholder="Search compound name, CAS number, formula, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 pl-11 pr-10 rounded-2xl text-xs sm:text-sm border outline-none transition-all ${
                  isDark 
                    ? "bg-neutral-950/80 border-white/10 focus:border-emerald-400 text-white placeholder-neutral-500" 
                    : "bg-slate-50 border-slate-200 focus:border-teal-600 text-slate-900 placeholder-slate-400"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown & Quick Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 opacity-60 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider opacity-60 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border outline-none cursor-pointer ${
                    isDark 
                      ? "bg-neutral-950 border-white/10 text-neutral-200" 
                      : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                >
                  <option value="default">Default Order</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="purity">Highest Purity</option>
                  <option value="mw">Molecular Mass</option>
                </select>
              </div>

              {/* Reset filter button if active */}
              {(selectedCategory !== "All" || searchQuery !== "" || sortBy !== "default") && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setSortBy("default");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-colors ${
                    isDark 
                      ? "border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white" 
                      : "border-slate-200 hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? isDark
                        ? "bg-emerald-400 text-neutral-950 border-emerald-400 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                        : "bg-teal-700 text-white border-teal-700 font-bold shadow-md"
                      : isDark
                        ? "bg-neutral-950/50 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  <span>{category}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected
                      ? isDark ? "bg-neutral-950/20 text-neutral-950 font-bold" : "bg-white/20 text-white font-bold"
                      : isDark ? "bg-white/10 text-neutral-400" : "bg-slate-200 text-slate-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results summary counter */}
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">
            Showing {filteredPeptides.length} {filteredPeptides.length === 1 ? "Compound" : "Compounds"}
          </span>
          {comparedPeptides.length > 0 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold hover:underline"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Compare Selected ({comparedPeptides.length})</span>
            </button>
          )}
        </div>

        {/* ========================================================
            EMPTY STATE
            ======================================================== */}
        {filteredPeptides.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-12 text-center rounded-3xl border ${
              isDark ? "bg-neutral-900/30 border-white/10" : "bg-white border-slate-200"
            }`}
          >
            <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-40 text-emerald-400" />
            <h3 className="text-xl font-semibold mb-2">No research compounds matched your filter</h3>
            <p className="text-sm opacity-70 max-w-md mx-auto mb-6">
              Try adjusting your search query or reset your category filters to view all available products.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSortBy("default");
              }}
              className="px-6 py-3 rounded-full bg-emerald-400 text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider"
            >
              Show All Products
            </button>
          </motion.div>
        )}

        {/* ========================================================
            PRODUCT GRID (HIGH CRAFTSMANSHIP CARDS)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPeptides.map((peptide, index) => {
            const isExpanded = expandedPeptide === peptide.id;
            const isSaved = savedPeptides.includes(peptide.name);
            const isComparing = comparedPeptides.includes(peptide.id);
            const activeDetailTab = activeDetailTabs[peptide.id] || "overview";

            const setDetailTab = (tab: "overview" | "specs" | "apps" | "docs") => {
              setActiveDetailTabs(prev => ({ ...prev, [peptide.id]: tab }));
            };

            return (
              <motion.div
                key={peptide.id}
                id={`product-card-${peptide.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-[32px] border flex flex-col justify-between overflow-hidden transition-all duration-300 group ${
                  isDark
                    ? "bg-neutral-900/40 border-white/10 hover:border-emerald-500/30 hover:bg-neutral-900/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    : "bg-white border-slate-200/90 hover:border-teal-500/40 hover:shadow-xl shadow-sm text-slate-900"
                }`}
              >
                <div>
                  {/* Card Image Cover with Floating Badges */}
                  <div className="relative h-64 w-full overflow-hidden bg-neutral-950">
                    <img 
                      src={PEPTIDE_IMAGES[peptide.id] || PEPTIDE_IMAGES["AP-3304"]} 
                      alt={peptide.name} 
                      className="h-full w-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                    
                    {/* Top Floating Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                        {peptide.id}
                      </span>
                      <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-neutral-200 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {peptide.category}
                      </span>
                    </div>

                    {/* Bottom Image Overlay Badges & Quick Action Icons */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span>{peptide.purity}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Save to inquiry list button */}
                        <button
                          onClick={(e) => toggleSaveForEnquiry(peptide.name, e)}
                          title={isSaved ? "Remove from inquiry list" : "Add to inquiry list"}
                          className={`h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                            isSaved 
                              ? "bg-emerald-400 border-emerald-400 text-neutral-950 shadow-md" 
                              : "bg-neutral-950/80 border-white/20 text-neutral-300 hover:bg-neutral-900 hover:text-white"
                          }`}
                        >
                          <Star className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
                        </button>

                        {/* Compare button */}
                        <button
                          onClick={(e) => toggleCompare(peptide.id, e)}
                          title={isComparing ? "Remove from comparison" : "Add to comparison"}
                          className={`h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                            isComparing 
                              ? "bg-teal-400 border-teal-400 text-neutral-950 shadow-md" 
                              : "bg-neutral-950/80 border-white/20 text-neutral-300 hover:bg-neutral-900 hover:text-white"
                          }`}
                        >
                          <ArrowLeftRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Card Body */}
                  <div className="p-6 sm:p-7 space-y-5">
                    {/* Header Info */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono opacity-60 mb-1">
                        <span>CAS {peptide.casNumber}</span>
                        <span>{peptide.form}</span>
                      </div>
                      <h3 
                        onClick={() => onSelectProduct(peptide.id)}
                        className={`text-xl sm:text-2xl font-semibold tracking-tight cursor-pointer hover:underline ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {peptide.name}
                      </h3>
                      <p className="text-xs font-mono italic opacity-70 truncate mt-0.5">
                        {peptide.chemicalName}
                      </p>
                    </div>

                    {/* Brief Description */}
                    <p className="text-xs sm:text-sm font-light leading-relaxed opacity-85 line-clamp-3">
                      {peptide.description}
                    </p>

                    {/* Key Molecular Metrics Grid */}
                    <div className={`grid grid-cols-2 gap-3 p-3.5 rounded-2xl border text-xs font-mono ${
                      isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200/80"
                    }`}>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider block opacity-60">Formula</span>
                        <span className="font-medium truncate block mt-0.5">{peptide.formula}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider block opacity-60">Mol. Mass</span>
                        <span className="font-medium block mt-0.5">{peptide.molecularWeight.toFixed(1)} g/mol</span>
                      </div>
                    </div>

                    {/* Single-Click Copy Amino Acid Sequence */}
                    <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-mono ${
                      isDark ? "bg-neutral-950/60 border-white/5" : "bg-slate-100/80 border-slate-200"
                    }`}>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Dna className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate opacity-80 text-[11px] select-all font-light">{peptide.sequence}</span>
                      </div>
                      <button
                        onClick={(e) => handleCopySequence(peptide.sequence, peptide.id, e)}
                        className={`p-1 rounded hover:bg-white/10 transition-colors shrink-0 ${
                          copiedId === peptide.id ? "text-emerald-400" : "opacity-60 hover:opacity-100"
                        }`}
                        title="Copy Sequence"
                      >
                        {copiedId === peptide.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    {/* Expandable Deep Specs Sheet */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pt-2 space-y-4 border-t border-white/10"
                        >
                          {/* Inner Tabs */}
                          <div className="flex border-b border-white/10 pb-2 gap-1 overflow-x-auto no-scrollbar">
                            {[
                              { id: "overview", label: "Overview" },
                              { id: "specs", label: "Specs" },
                              { id: "apps", label: "Applications" },
                              { id: "docs", label: "Traceability" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setDetailTab(tab.id as any)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                                  activeDetailTab === tab.id
                                    ? isDark
                                      ? "bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30"
                                      : "bg-teal-100 text-teal-900 font-bold border border-teal-300"
                                    : "opacity-60 hover:opacity-100"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Tab: Overview */}
                          {activeDetailTab === "overview" && peptide.scientificBackground && (
                            <div className="text-xs font-light leading-relaxed opacity-90 space-y-2">
                              <span className="font-mono text-[9px] uppercase tracking-wider block opacity-60">
                                Scientific Mechanism
                              </span>
                              <p>{peptide.scientificBackground}</p>
                            </div>
                          )}

                          {/* Tab: Specs */}
                          {activeDetailTab === "specs" && (
                            <div className="space-y-2 text-xs">
                              <span className="font-mono text-[9px] uppercase tracking-wider block opacity-60">
                                Verified Benefits & Properties
                              </span>
                              <ul className="space-y-1.5 opacity-85 font-light">
                                {peptide.benefits.map((b, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2">
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tab: Applications */}
                          {activeDetailTab === "apps" && peptide.researchApplications && (
                            <div className="space-y-2 text-xs">
                              <span className="font-mono text-[9px] uppercase tracking-wider block opacity-60">
                                Research Study Pathways
                              </span>
                              <ul className="space-y-1.5 opacity-85 font-light">
                                {peptide.researchApplications.map((app, aIdx) => (
                                  <li key={aIdx} className="flex items-start gap-2">
                                    <Microscope className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{app}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tab: Docs */}
                          {activeDetailTab === "docs" && (
                            <div className="space-y-2 text-xs">
                              <span className="font-mono text-[9px] uppercase tracking-wider block opacity-60">
                                Documentation Issued
                              </span>
                              <div className="grid grid-cols-1 gap-1.5">
                                {peptide.documentationAvailable?.map((doc, dIdx) => (
                                  <div key={dIdx} className="flex items-center gap-2 opacity-80">
                                    <FileSpreadsheet className="h-3 w-3 text-emerald-400 shrink-0" />
                                    <span className="text-[11px] font-mono truncate">{doc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Related links */}
                          {peptide.relatedProducts && (
                            <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 flex-wrap">
                              <span className="font-mono text-[9px] uppercase opacity-60">Related:</span>
                              {peptide.relatedProducts.map(rId => (
                                <button
                                  key={rId}
                                  onClick={() => handleSelectRelated(rId)}
                                  className="font-mono text-[10px] text-emerald-400 hover:underline"
                                >
                                  {rId}
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle quick specs button */}
                    <button
                      onClick={() => toggleExpand(peptide.id)}
                      className="w-full flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity py-1 cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Details" : "Quick Specifications"}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className={`p-6 sm:p-7 pt-0 space-y-3`}>
                  {/* Primary CTA: Full Product Page */}
                  <button
                    onClick={() => onSelectProduct(peptide.id)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                      isDark
                        ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                        : "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20"
                    }`}
                  >
                    <span>View Technical Dossier</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  {/* Secondary Quick Action Row */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onInitiateInquiry(peptide.name)}
                      className={`py-2.5 px-3 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold border transition-colors cursor-pointer text-center truncate ${
                        isDark
                          ? "border-white/10 hover:bg-white/5 text-neutral-300 hover:text-white"
                          : "border-slate-300 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      Request Rates
                    </button>

                    <button
                      onClick={() => onSelectPeptideForCoA(peptide.id)}
                      className={`py-2.5 px-3 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold border transition-colors cursor-pointer text-center truncate ${
                        isDark
                          ? "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400"
                          : "border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800"
                      }`}
                    >
                      Verify CoA
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ========================================================
          FLOATING BOTTOM BAR FOR SAVED & COMPARED PEPTIDES
          ======================================================== */}
      {(savedPeptides.length > 0 || comparedPeptides.length > 0) && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xl"
        >
          <div className={`p-3.5 sm:p-4 rounded-full border backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-3 ${
            isDark ? "bg-neutral-900/90 border-emerald-500/30 text-white" : "bg-white/95 border-teal-500/30 text-slate-900"
          }`}>
            <div className="flex items-center gap-3 pl-2 truncate">
              {savedPeptides.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <Star className="h-4 w-4 text-emerald-400 fill-current" />
                  <span className="font-bold">{savedPeptides.length}</span>
                  <span className="opacity-70 hidden sm:inline">Saved in Inquiry</span>
                </div>
              )}
              {comparedPeptides.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-mono border-l border-white/20 pl-3">
                  <ArrowLeftRight className="h-4 w-4 text-teal-400" />
                  <span className="font-bold">{comparedPeptides.length}/3</span>
                  <span className="opacity-70 hidden sm:inline">Comparing</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {comparedPeptides.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-4 py-2 rounded-full font-mono text-[11px] uppercase font-bold bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Compare
                </button>
              )}
              {savedPeptides.length > 0 && (
                <button
                  onClick={handleBulkEnquirySubmit}
                  className="px-5 py-2 rounded-full font-mono text-[11px] uppercase font-bold bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-colors shadow-md"
                >
                  Inquire ({savedPeptides.length})
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================
          SIDE-BY-SIDE COMPARISON MODAL
          ======================================================== */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
                isDark ? "bg-neutral-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-xl font-bold font-display">Compound Comparison</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCompare}
                    className="text-xs font-mono text-neutral-400 hover:text-white px-2 py-1"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3 font-mono text-[10px] uppercase opacity-60">Metric</th>
                      {comparedPeptides.map(id => {
                        const p = PEPTIDES_CATALOG.find(x => x.id === id);
                        return (
                          <th key={id} className="p-3 font-semibold text-sm min-w-[200px]">
                            <div className="flex items-center justify-between">
                              <span>{p?.name}</span>
                              <button
                                onClick={(e) => toggleCompare(id, e)}
                                className="text-neutral-400 hover:text-red-400"
                                title="Remove"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="font-mono text-[10px] text-emerald-400 font-normal">{p?.id}</span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-light">
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">Category</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3">{PEPTIDES_CATALOG.find(x => x.id === id)?.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">Purity</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3 font-mono text-emerald-400 font-semibold">{PEPTIDES_CATALOG.find(x => x.id === id)?.purity}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">Formula</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3 font-mono">{PEPTIDES_CATALOG.find(x => x.id === id)?.formula}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">Molecular Mass</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3 font-mono">{PEPTIDES_CATALOG.find(x => x.id === id)?.molecularWeight.toFixed(1)} g/mol</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">CAS Registry</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3 font-mono">{PEPTIDES_CATALOG.find(x => x.id === id)?.casNumber}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">Sequence</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3 font-mono text-[10px] select-all break-all">{PEPTIDES_CATALOG.find(x => x.id === id)?.sequence}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">Vial Sizes</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {PEPTIDES_CATALOG.find(x => x.id === id)?.vialSizes.map(s => (
                              <span key={s} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[9px]">{s}</span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[10px] uppercase opacity-60">Storage</td>
                      {comparedPeptides.map(id => (
                        <td key={id} className="p-3 text-[11px]">{PEPTIDES_CATALOG.find(x => x.id === id)?.recommendedStorage}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
