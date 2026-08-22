/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { X, ShieldAlert, Scale, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export type LegalModalType = "disclaimer" | "terms" | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
  onSwitchType?: (type: "disclaimer" | "terms") => void;
}

const DISCLAIMER_SECTIONS = [
  {
    id: "disclaimer-sec-1",
    title: "Research Use Only",
    content: [
      "All products supplied by B2B Peps are intended strictly for legitimate laboratory research and analytical purposes.",
      "Unless expressly stated otherwise in writing, products are not intended for human or veterinary use, human or animal consumption, clinical use, diagnostic use, therapeutic use, or use in the diagnosis, treatment, mitigation, cure or prevention of any disease, disorder or medical condition.",
      "Products should only be purchased and handled by appropriately qualified or authorised persons and organisations for legitimate research purposes."
    ]
  },
  {
    id: "disclaimer-sec-2",
    title: "Website Information",
    content: [
      "Information presented on this website, including product descriptions and references to biological pathways, mechanisms, research areas, scientific studies or potential areas of investigation, is provided solely for general informational and research purposes.",
      "Nothing contained on this website should be interpreted as medical advice, prescribing information, treatment guidance, dosage or administration guidance, or a recommendation regarding the use of any product in humans or animals.",
      "References to scientific research do not constitute a representation or guarantee that any product is safe, effective or approved for any particular use."
    ]
  },
  {
    id: "disclaimer-sec-3",
    title: "Regulatory Responsibility",
    content: [
      "Laws and regulatory requirements relating to peptides, research compounds and associated products vary between countries and jurisdictions and may change over time.",
      "Customers are solely responsible for determining whether the purchase, importation, possession, storage, handling, distribution and intended use of products supplied by B2B Peps complies with all applicable laws, regulations and requirements in the customer's jurisdiction, the jurisdiction into which the products are delivered or imported, and any other jurisdiction relevant to the customer's activities.",
      "Customers are responsible for obtaining any licences, permits, registrations, approvals or other authorisations required for their activities.",
      "The availability of a product through our website or sales team should not be interpreted as confirmation that the product may lawfully be purchased, imported, possessed, distributed or used in a particular jurisdiction."
    ]
  },
  {
    id: "disclaimer-sec-4",
    title: "Customer Responsibility",
    content: [
      "By purchasing products from B2B Peps, the customer represents that products will be acquired and used for lawful purposes consistent with their stated research designation.",
      "Customers are responsible for ensuring appropriate handling, storage, research practices and compliance procedures after products have been supplied.",
      "B2B Peps reserves the right to request additional information regarding an order and to refuse, suspend or cancel an order where we reasonably believe that a product may be purchased for an unlawful, inappropriate or non-research purpose."
    ]
  },
  {
    id: "disclaimer-sec-5",
    title: "No Medical Relationship",
    content: [
      "Nothing contained on this website or communicated by B2B Peps, its employees, representatives or agents establishes a doctor-patient, veterinarian-client, healthcare-provider or other clinical relationship.",
      "Customers should not rely upon information supplied by B2B Peps when making medical or healthcare decisions."
    ]
  },
  {
    id: "disclaimer-sec-6",
    title: "Product Information",
    content: [
      "Product specifications, availability, packaging, documentation and other product information may change from time to time.",
      "Where batch-specific documentation, certificates of analysis or independent testing information is provided, such documentation relates only to the product or batch identified within that documentation.",
      "Customers requiring particular specifications or documentation should confirm these requirements with us before ordering."
    ]
  }
];

const TERMS_SECTIONS = [
  {
    num: 1,
    id: "terms-sec-1",
    title: "1. About These Terms",
    paragraphs: [
      'These Terms & Conditions govern access to this website and the purchase of products and services from B2B Peps ("we", "us" or "our").',
      "By placing an order, requesting a quotation, accepting an invoice or otherwise purchasing products or services from us, you agree to these Terms & Conditions.",
      "Where separate written commercial terms have been agreed with a customer, those terms will take precedence to the extent that they conflict with these Terms & Conditions."
    ]
  },
  {
    num: 2,
    id: "terms-sec-2",
    title: "2. Business and Research Customers",
    paragraphs: [
      "Our products are supplied solely for legitimate research and laboratory purposes.",
      "By purchasing from us, you confirm that you have the authority and capacity to make the purchase and that you are responsible for determining whether the products are suitable and lawful for your intended research activities."
    ]
  },
  {
    num: 3,
    id: "terms-sec-3",
    title: "3. Research Use Only",
    paragraphs: [
      "Products designated for research use are supplied strictly for laboratory research and analytical purposes and are subject to our Research Use & Legal Disclaimer.",
      "Customers must not use, market or represent research-use products as approved medicines, treatments, diagnostic products or products intended for human or veterinary administration unless separately authorised and supplied for such purposes in accordance with applicable law."
    ]
  },
  {
    num: 4,
    id: "terms-sec-4",
    title: "4. Product Information",
    paragraphs: [
      "We aim to provide accurate product descriptions, specifications and supporting information.",
      "However, product information may be updated or amended from time to time, and images used on the website may be illustrative.",
      "Customers requiring particular specifications, documentation, testing standards, packaging or other characteristics must confirm those requirements with us before ordering."
    ]
  },
  {
    num: 5,
    id: "terms-sec-5",
    title: "5. Quotations and Orders",
    paragraphs: [
      "Quotations are subject to availability and remain valid for the period stated in the quotation.",
      "An enquiry, quotation or pro forma invoice does not necessarily constitute acceptance of an order.",
      "An order is considered accepted when we provide written confirmation, accept payment or otherwise confirm that the order is proceeding.",
      "We reserve the right to refuse or cancel an order where reasonably necessary, including where there are concerns regarding product availability, payment, regulatory compliance, shipping restrictions or intended use."
    ]
  },
  {
    num: 6,
    id: "terms-sec-6",
    title: "6. Pricing",
    paragraphs: [
      "Prices may vary according to product, quantity, destination, supply route and prevailing commercial conditions.",
      "Unless otherwise stated, quotations do not include taxes, customs duties, import charges or other governmental charges imposed by the destination jurisdiction.",
      "The customer is responsible for such charges unless expressly agreed otherwise in writing."
    ]
  },
  {
    num: 7,
    id: "terms-sec-7",
    title: "7. Payment",
    paragraphs: [
      "Payment must be made according to the terms stated on the relevant quotation, invoice or commercial agreement.",
      "Orders may be held until cleared payment has been received where prepayment is required.",
      "Any bank, payment-provider, currency-conversion or intermediary charges are the customer's responsibility unless otherwise agreed."
    ]
  },
  {
    num: 8,
    id: "terms-sec-8",
    title: "8. Shipping and Delivery",
    paragraphs: [
      "Delivery times are estimates unless expressly guaranteed in writing.",
      "International shipments may be affected by customs clearance, regulatory inspection, carrier delays, local import procedures and circumstances beyond our reasonable control.",
      "Customers are responsible for providing accurate shipping and recipient information.",
      "Where special storage or handling conditions apply, customers are responsible for ensuring suitable arrangements are available upon delivery."
    ]
  },
  {
    num: 9,
    id: "terms-sec-9",
    title: "9. Inspection and Acceptance",
    paragraphs: [
      "Customers must inspect all delivered goods promptly upon receipt. Any claims for shortages, damaged packaging, or non-conforming items must be communicated in writing within seven (7) business days of physical delivery.",
      "Failure to report discrepancies within this timeframe shall constitute definitive acceptance of the shipment as delivered."
    ]
  },
  {
    num: 10,
    id: "terms-sec-10",
    title: "10. Title and Risk of Loss",
    paragraphs: [
      "Risk of loss or damage to products passes to the customer upon handover of goods to the shipping carrier or freight forwarder.",
      "Title to products remains with B2B Peps until all associated invoice balances and applicable delivery fees have been settled in full."
    ]
  },
  {
    num: 11,
    id: "terms-sec-11",
    title: "11. Intellectual Property & Brand Protection",
    paragraphs: [
      "All trademarks, content, scientific documentation, graphics, and technical schemas on this website remain the proprietary intellectual property of B2B Peps or its licensors.",
      "Unauthorized reproduction, commercial redistribution, scraping, or framing of website assets without prior written consent is strictly prohibited."
    ]
  },
  {
    num: 12,
    id: "terms-sec-12",
    title: "12. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, B2B Peps shall not be liable for any indirect, consequential, punitive, or special damages, or loss of research data, clinical trials, business profits, or goodwill arising from the purchase, handling, or use of any supplied products.",
      "In all circumstances, our maximum aggregate liability shall be limited strictly to the net invoice amount paid by the customer for the specific product giving rise to the claim."
    ]
  },
  {
    num: 13,
    id: "terms-sec-13",
    title: "13. Indemnification & Compliance",
    paragraphs: [
      "The customer agrees to defend, indemnify, and hold harmless B2B Peps, its officers, directors, employees, and agents against any claims, liabilities, penalties, or legal fees resulting from improper handling, unapproved non-research utilization, or regulatory non-compliance on the customer's part."
    ]
  },
  {
    num: 14,
    id: "terms-sec-14",
    title: "14. Force Majeure",
    paragraphs: [
      "Neither party shall be held in breach of these terms for failure or delay in performance caused by events beyond reasonable control, including acts of God, embargoes, export/import bans, civil disturbances, strikes, or transportation network interruptions."
    ]
  },
  {
    num: 15,
    id: "terms-sec-15",
    title: "15. Severability and Modifications",
    paragraphs: [
      "If any provision within these Terms & Conditions is found to be unenforceable or invalid by a court of competent jurisdiction, the remaining clauses shall continue in full force and effect.",
      "We reserve the right to revise these terms periodically. Continued use of the service or ordering following publication of revised terms constitutes binding acceptance."
    ]
  },
  {
    num: 16,
    id: "terms-sec-16",
    title: "16. Governing Law & Jurisdiction",
    paragraphs: [
      "These Terms & Conditions and any commercial dispute arising hereunder shall be governed by and construed in accordance with standard international commercial law and the applicable laws of our registered domicile, excluding conflict of law principles."
    ]
  }
];

export default function LegalModal({ type, onClose, onSwitchType }: LegalModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Prevent background page from scrolling when modal is open
  useEffect(() => {
    if (!type) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [type, onClose]);

  // Reset scroll position when switching document type
  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
  }, [type]);

  if (!type) return null;

  const isDisclaimer = type === "disclaimer";
  const title = isDisclaimer ? "Research Use & Legal Disclaimer" : "Terms & Conditions";
  const subtitle = isDisclaimer
    ? "Official Enterprise Laboratory & Regulatory Disclosure"
    : "Standard Commercial Procurement & Supply Terms";

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {/* Backdrop overlay with blur and dimming */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 w-full max-w-[860px] max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden transition-colors duration-300 ${
            isDark
              ? "bg-[#0b101b] border-white/15 text-slate-200"
              : "bg-white border-slate-200 text-slate-800"
          }`}
        >
          {/* Sticky Header */}
          <header
            className={`shrink-0 px-4 sm:px-8 py-4 sm:py-6 border-b flex items-center justify-between gap-3 backdrop-blur-xl transition-colors ${
              isDark
                ? "bg-[#0b101b]/95 border-white/10"
                : "bg-white/95 border-slate-200"
            }`}
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-500">
                {isDisclaimer ? (
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <Scale className="w-3.5 h-3.5 shrink-0" />
                )}
                <span className="truncate">{isDisclaimer ? "Regulatory Standard" : "Governance Policy"}</span>
              </div>
              <h2
                id="legal-modal-title"
                className={`text-lg sm:text-2xl font-serif font-medium tracking-tight truncate ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {title}
              </h2>
              <p className="text-xs opacity-60 font-sans hidden sm:block">
                {subtitle}
              </p>
            </div>

            {/* Header Right Actions: Quick Switch Tabs & Close Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {onSwitchType && (
                <div
                  className={`flex items-center p-0.5 sm:p-1 rounded-xl border text-[11px] sm:text-xs font-medium ${
                    isDark
                      ? "bg-neutral-900/80 border-white/10"
                      : "bg-slate-100 border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => onSwitchType("disclaimer")}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all cursor-pointer ${
                      isDisclaimer
                        ? isDark
                          ? "bg-emerald-500/20 text-emerald-300 shadow-xs font-bold"
                          : "bg-white text-teal-800 shadow-xs font-semibold"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    Disclaimer
                  </button>
                  <button
                    onClick={() => onSwitchType("terms")}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all cursor-pointer ${
                      !isDisclaimer
                        ? isDark
                          ? "bg-emerald-500/20 text-emerald-300 shadow-xs font-bold"
                          : "bg-white text-teal-800 shadow-xs font-semibold"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    Terms
                  </button>
                </div>
              )}

              {/* Prominent Close (✕) Button */}
              <button
                onClick={onClose}
                aria-label="Close legal modal"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all cursor-pointer ${
                  isDark
                    ? "border-white/10 bg-neutral-900/80 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-neutral-800"
                    : "border-slate-300 bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-teal-500/40 hover:bg-slate-200"
                }`}
                title="Close (Press Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Scrollable Content Body */}
          <div
            ref={contentContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 sm:py-8 space-y-8 sm:space-y-10 focus:outline-none"
            tabIndex={0}
          >
            {isDisclaimer ? (
              <div className="space-y-10">
                {DISCLAIMER_SECTIONS.map((sec, idx) => (
                  <section key={sec.id} className="space-y-4">
                    <div className="flex items-baseline justify-between border-b pb-2 border-slate-200/40 dark:border-white/5">
                      <h3
                        className={`text-lg sm:text-xl font-sans font-semibold tracking-tight ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        {sec.title}
                      </h3>
                      <span className="font-mono text-[11px] opacity-40">
                        § 0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm sm:text-base leading-relaxed opacity-90 font-sans">
                      {sec.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="space-y-10">
                {TERMS_SECTIONS.map((sec) => (
                  <section key={sec.id} className="space-y-4">
                    <div className="flex items-baseline justify-between border-b pb-2 border-slate-200/40 dark:border-white/5">
                      <h3
                        className={`text-lg sm:text-xl font-sans font-semibold tracking-tight ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        {sec.title}
                      </h3>
                      <span className="font-mono text-[11px] opacity-40">
                        Sec {sec.num}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm sm:text-base leading-relaxed opacity-90 font-sans">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Modal Footer Bar */}
          <footer
            className={`shrink-0 px-6 sm:px-8 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-75 backdrop-blur-xl ${
              isDark
                ? "bg-[#0b101b]/95 border-white/10 text-slate-400"
                : "bg-white/95 border-slate-200 text-slate-600"
            }`}
          >
            <div>© 2026 B2B Peps. All rights reserved.</div>

            <div className="flex items-center gap-4">
              {onSwitchType && (
                <button
                  onClick={() => onSwitchType(isDisclaimer ? "terms" : "disclaimer")}
                  className={`hover:underline font-medium cursor-pointer ${
                    isDark ? "text-emerald-400" : "text-teal-700"
                  }`}
                >
                  Switch to {isDisclaimer ? "Terms & Conditions" : "Research Disclaimer"} →
                </button>
              )}
              <span className="opacity-40 hidden sm:inline">•</span>
              <span className="hidden sm:inline">Press Esc or click outside to close</span>
            </div>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
