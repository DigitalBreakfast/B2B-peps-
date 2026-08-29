/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      category: "Procurement & RFQ Workflow",
      question: "How do I request a bulk pricing quote or submit an RFQ?",
      answer: "You can assemble your desired items in our RFQ Workspace (click 'Add to RFQ Workspace' on any product page) and submit the form directly from the Portal tab. Alternatively, you can contact our clinical chemistry advisors via email to submit sequence specifications."
    },
    {
      category: "Quality & Testing",
      question: "Are your chromatogram reports linked to individual batches?",
      answer: "Yes, absolutely. We maintain full traceability. The Certificate of Analysis (CoA) you inspect inside our Quality Console is generated directly from the specific manufacturing batch, verifying the exact HPLC purity value and quadrupole mass spectrometry spectrum of the compound vial you receive."
    },
    {
      category: "Shipping & Logistics",
      question: "How are international research shipments protected during transit?",
      answer: "We utilize specialized protective packaging and dedicated global air cargo routes. All bulk and enterprise orders include milestone tracking and priority customs pre-clearance to ensure fast, dependable international delivery."
    },
    {
      category: "Custom Formulations",
      question: "Can you supply peptides in custom salt forms (e.g. acetate instead of TFA)?",
      answer: "Yes. Many of our clients use delicate cell cultures where standard trifluoroacetate (TFA) salts could trigger cytotoxicity. We offer extensive counter-ion exchange services, converting synthesized sequences to premium acetate or hydrochloride salt structures, ensuring a verified residual TFA value of less than 1.0%."
    },
    {
      category: "Storage Protocols",
      question: "What are the recommended storage conditions for lyophilized peptide powders?",
      answer: "Lyophilized peptide vials should be kept desiccated at -20°C for optimal long-term preservation (up to 36 months). Once reconstituted in a sterile biological buffer, store at 2-8°C and use within 7 to 14 days. Avoid repeated freeze-thaw cycles and protect from direct solar UV index."
    },
    {
      category: "Legal & Compliance",
      question: "Are your compound products intended for research use only?",
      answer: "Yes. All peptide compounds synthesized and catalogued by B2B Peps are distributed strictly for in-vitro laboratory research, assays, and diagnostic studies. They are not approved or cleared for personal therapeutic, dietary, cosmetic, or direct therapeutic use in humans."
    }
  ];

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-neutral-950 text-white py-16 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-500/[0.01] blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-1/4 h-96 w-96 rounded-full bg-teal-500/[0.01] blur-[120px] pointer-events-none" />

      <div className="site-container">
        <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400">
            Support Center
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white mt-4 mb-6">
            Scientific & Sourcing FAQs
          </h1>
          <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Find technical answers to your procurement questions, shipping timelines, salt conversions, and regulatory compliance standards.
          </p>

          {/* Search Bar inside FAQs */}
          <div className="relative max-w-md mx-auto mt-10">
            <input
              type="text"
              placeholder="Search by keyword, category, or spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/40 border border-white/5 hover:border-white/10 rounded-full py-3.5 pl-5 pr-12 text-xs text-white placeholder-neutral-500 focus:border-white/20 outline-none transition-all font-sans"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-neutral-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <HelpCircle className="absolute right-4 top-3.5 h-4 w-4 text-neutral-500" strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-neutral-900/10 border border-white/5 rounded-2xl p-6">
              <p className="font-sans text-xs text-neutral-400 font-light">
                No matching questions found. For highly custom molecular inquiries, please submit a request on our Sourcing Portal.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-white/5 bg-neutral-900/10 rounded-2xl overflow-hidden backdrop-blur-sm"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-white/[0.01] transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400 block mb-1">
                        {faq.category}
                      </span>
                      <span className="font-sans text-sm font-semibold text-white leading-relaxed">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-neutral-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-neutral-400 shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-white/5 bg-neutral-950/20"
                      >
                        <div className="p-6 font-sans text-xs text-neutral-400 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>
      </div>
    </section>
  );
}
