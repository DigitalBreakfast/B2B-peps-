/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, Suspense } from "react";
import { Activity, Mail, MessageCircle, Send, ChevronDown, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import type { LegalModalType } from "./LegalModal";
import { lazyWithRetry, ChunkErrorBoundary } from "../lib/lazyWithRetry.tsx";

const LegalModal = lazyWithRetry(() => import("./LegalModal"));

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onOpenLegalModal?: (type: LegalModalType) => void;
}

export default function Footer({ onNavClick, onOpenLegalModal }: FooterProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);
  const [internalLegalModal, setInternalLegalModal] = useState<LegalModalType>(null);

  const handleOpenLegal = (type: "disclaimer" | "terms") => {
    if (onOpenLegalModal) {
      onOpenLegalModal(type);
    } else {
      setInternalLegalModal(type);
    }
  };

  const navLinks = [
    { label: "Products", id: "products" },
    { label: "Partner With Us", id: "why-partner" },
    { label: "About Us", id: "about" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <footer
      className={`relative w-full border-t transition-colors duration-500 font-sans ${
        isDark
          ? "bg-[#04110d] text-emerald-100/90 border-emerald-900/40"
          : "bg-emerald-50/75 text-slate-800 border-emerald-200/80"
      }`}
    >
      <div className="site-container py-12 sm:py-16 space-y-10 sm:space-y-12">
        {/* Top Grid: Brand, Navigation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start justify-between text-left">
          {/* Brand */}
          <div className="md:col-span-4 space-y-3 flex flex-col items-start text-left">
            <div
              onClick={() => onNavClick("home")}
              className="flex items-center cursor-pointer group w-fit"
              id="footer-brand"
            >
              <img
                src="https://res.cloudinary.com/ds5s7shuo/image/upload/f_auto,q_auto,w_240/v1787945763/PEPES_logo_png_didjyy.png"
                alt="B2B Peps"
                width={180}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-8 sm:h-9 w-auto max-w-[180px] object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                referrerPolicy="no-referrer"
              />
            </div>

            <p
              className={`text-sm leading-relaxed max-w-xs font-light text-left ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Research peptide supply for businesses.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-5 flex flex-col items-start justify-start text-left">
            <div
              className={`font-mono text-[9px] uppercase tracking-[0.25em] font-semibold mb-3 ${
                isDark ? "text-emerald-400/80" : "text-teal-700"
              }`}
            >
              Navigation
            </div>
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs sm:text-sm">
              {navLinks.map((link, idx) => (
                <span key={link.id} className="inline-flex items-center">
                  <button
                    onClick={() => onNavClick(link.id)}
                    className={`transition-colors py-1 cursor-pointer font-medium min-h-[44px] flex items-center ${
                      isDark
                        ? "text-slate-300 hover:text-white"
                        : "text-slate-700 hover:text-teal-800"
                    }`}
                  >
                    {link.label}
                  </button>
                  {idx < navLinks.length - 1 && (
                    <span
                      className={`mx-2 text-xs select-none ${
                        isDark ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      •
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Contact Direct Channels */}
          <div className="md:col-span-3 flex flex-col items-start justify-start text-left">
            <div
              className={`font-mono text-[9px] uppercase tracking-[0.25em] font-semibold mb-3 ${
                isDark ? "text-emerald-400/80" : "text-teal-700"
              }`}
            >
              Direct Sourcing Inquiries
            </div>
            <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
              {/* Email */}
              <a
                href="mailto:info@b2bpeps.com"
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer min-h-[44px] ${
                  isDark
                    ? "border-white/10 bg-neutral-900/60 text-slate-300 hover:bg-neutral-800 hover:text-white hover:border-emerald-500/30"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:border-teal-500/40 shadow-xs"
                }`}
                title="Send Email to info@b2bpeps.com"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/447414219888"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer min-h-[44px] ${
                  isDark
                    ? "border-white/10 bg-neutral-900/60 text-slate-300 hover:bg-emerald-950/40 hover:text-emerald-300 hover:border-emerald-500/30"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-500/40 shadow-xs"
                }`}
                title="WhatsApp Direct Channel (+44 7414 219888)"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/b2bpeps"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer min-h-[44px] ${
                  isDark
                    ? "border-white/10 bg-neutral-900/60 text-slate-300 hover:bg-sky-950/40 hover:text-sky-300 hover:border-sky-500/30"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-400 shadow-xs"
                }`}
                title="Telegram Channel"
              >
                <Send className="h-3.5 w-3.5 text-sky-400" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Expandable Accordion: RESEARCH USE ONLY */}
        <div
          className={`rounded-2xl border transition-all overflow-hidden ${
            isDark
              ? "border-emerald-900/30 bg-neutral-900/50"
              : "border-emerald-200/80 bg-white/95 shadow-xs"
          }`}
        >
          <button
            onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
            className={`w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
              isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"
            }`}
            aria-expanded={isDisclaimerExpanded}
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert
                className={`h-4 w-4 shrink-0 ${
                  isDark ? "text-emerald-400" : "text-teal-600"
                }`}
              />
              <span
                className={`font-mono text-xs font-bold uppercase tracking-wider ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                RESEARCH USE ONLY
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono opacity-60 hidden sm:inline">
                {isDisclaimerExpanded ? "Collapse Notice" : "Expand Notice"}
              </span>
              <motion.div
                animate={{ rotate: isDisclaimerExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 opacity-70" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isDisclaimerExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className={`px-5 pb-5 pt-2 border-t text-xs sm:text-[13px] leading-relaxed space-y-3 ${
                    isDark
                      ? "border-white/5 text-slate-400"
                      : "border-slate-100 text-slate-600"
                  }`}
                >
                  <p>
                    All products are supplied strictly for laboratory research and analytical purposes only. They are not intended for human or veterinary use, consumption, clinical use, diagnostic use or therapeutic application.
                  </p>
                  <p>
                    Product availability and permitted uses may vary by jurisdiction. Customers are responsible for ensuring that the purchase, importation, possession and use of any product complies with all applicable laws, regulations and requirements in their jurisdiction and the jurisdiction of delivery.
                  </p>
                  <p>
                    Information provided on this website is for general research and product-information purposes only and does not constitute medical, clinical or regulatory advice.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Legal Bar */}
        <div
          className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDark
              ? "border-emerald-900/30 text-emerald-300/60"
              : "border-emerald-200/80 text-slate-600"
          }`}
        >
          <div>
            © 2026 B2B Peps. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <button
              onClick={() => handleOpenLegal("disclaimer")}
              className={`transition-colors font-medium cursor-pointer ${
                isDark ? "hover:text-slate-300" : "hover:text-slate-900"
              }`}
            >
              Research Use & Legal Disclaimer
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => handleOpenLegal("terms")}
              className={`transition-colors font-medium cursor-pointer ${
                isDark ? "hover:text-slate-300" : "hover:text-slate-900"
              }`}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Internal Legal Modal if managed directly */}
      {!onOpenLegalModal && (
        <ChunkErrorBoundary>
          <Suspense fallback={null}>
            <LegalModal
              type={internalLegalModal}
              onClose={() => setInternalLegalModal(null)}
              onSwitchType={(type) => setInternalLegalModal(type)}
            />
          </Suspense>
        </ChunkErrorBoundary>
      )}
    </footer>
  );
}
