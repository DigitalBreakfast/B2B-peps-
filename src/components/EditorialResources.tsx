/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { EDITORIAL_ARTICLES } from "../data";
import { EditorialArticle } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, Clock, User, X, FileText, ArrowRight } from "lucide-react";
import FAQs from "./FAQs";

export default function EditorialResources() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Research Article", "Scientific Guide", "FAQ", "Industry Insight", "Comparison Article", "Glossary"];

  const filteredArticles = selectedCategory === "All"
    ? EDITORIAL_ARTICLES
    : EDITORIAL_ARTICLES.filter(art => art.category === selectedCategory);

  const activeArticle = EDITORIAL_ARTICLES.find(art => art.id === selectedArticleId);

  return (
    <section id="editorial" className="relative bg-neutral-950 py-24 border-t border-white/5">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400">
              B2B Peps Journal
            </span>
            <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Scientific Editorial & Sourcing Intelligence
            </h2>
            <p className="mt-4 font-sans text-xs text-neutral-400 leading-relaxed font-light">
              Scientific insights, clinical trial profiles, and international pharmaceutical compliance reports.
            </p>
          </div>

          <div className="shrink-0">
            <span className="font-mono text-xs text-neutral-500">Curated by our CSO & Regulatory Counsel</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-white/5" id="editorial-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-emerald-400 text-neutral-950 font-bold border border-emerald-400"
                  : "bg-white/5 text-neutral-400 border border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {cat === "All" ? "All Resources" : cat + "s"}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="editorial-grid">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="flex flex-col justify-between rounded-2xl border border-white/5 bg-neutral-900/15 overflow-hidden group cursor-pointer hover:border-emerald-500/15 hover:bg-neutral-900/25 transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="h-56 relative overflow-hidden bg-neutral-950 border-b border-white/5">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Visual Glass Tag */}
                <div className="absolute top-4 left-4 rounded-full bg-neutral-950/80 backdrop-blur border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                  {article.category}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" strokeWidth={1.2} /> {article.publishedDate}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={1.2} /> {article.readTime}</span>
                  </div>

                  <h3 className="font-sans text-lg font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="mt-3 font-sans text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-sans text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1.5 transition-transform" strokeWidth={1.2} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 border-t border-white/5 pt-16">
          <FAQs />
        </div>

      </div>

      {/* Modern physical-science styled distraction-free reading Modal Overlay */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/95 backdrop-blur-xl flex justify-center px-4 py-8 md:py-16"
            id="reader-modal"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-neutral-900/40 p-8 md:p-12 shadow-2xl backdrop-blur-md h-fit max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticleId(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950 text-neutral-400 hover:text-white transition-colors"
                id="close-reader-btn"
              >
                <X className="h-5 w-5" strokeWidth={1.2} />
              </button>

              {/* Journal Metadata Banner */}
              <div className="border-b border-white/5 pb-6 mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <BookOpen className="h-4 w-4" strokeWidth={1.2} />
                  <span>B2B Peps Sourcing Dossier // Vol. 04</span>
                </div>
                <span>AUTHENTIC B2B MEMORANDUM</span>
              </div>

              {/* Cover Image in Modal */}
              <div className="h-64 w-full rounded-2xl overflow-hidden mb-8 border border-white/5">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover opacity-75"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Title & Metadata */}
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                {activeArticle.category}
              </span>
              <h1 className="mt-3 font-sans text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
                {activeArticle.title}
              </h1>

              {/* Authorship Block */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-neutral-400 border-y border-white/5 py-4 my-8">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-emerald-400" strokeWidth={1.2} />
                  <span>{activeArticle.author}</span>
                </span>
                <span className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-neutral-500" strokeWidth={1.2} />
                  <span>{activeArticle.publishedDate}</span>
                </span>
                <span className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-neutral-500" strokeWidth={1.2} />
                  <span>{activeArticle.readTime}</span>
                </span>
              </div>

              {/* Article Content - physical journal style spacing */}
              <div className="font-sans text-sm text-neutral-300 leading-relaxed space-y-6 max-w-none">
                {activeArticle.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Regulatory Sign-off footer */}
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                <FileText className="h-5 w-5 text-emerald-400 shrink-0" strokeWidth={1.2} />
                <p className="font-mono text-[10px] leading-relaxed text-neutral-400">
                  Disclaimer: This dossier is curated solely for scientific information purposes. Peer-reviewed research, legal regulatory codes, and logistics constraints are provided in compliance with global life science standards.
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
