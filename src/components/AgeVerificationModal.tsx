/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, ArrowRight, ExternalLink, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

interface AgeVerificationModalProps {
  onVerified?: () => void;
}

const STORAGE_KEY = "b2bpeps_age_verified_21";

export default function AgeVerificationModal({ onVerified }: AgeVerificationModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [isUnderAge, setIsUnderAge] = useState(false);

  useEffect(() => {
    try {
      const verified = localStorage.getItem(STORAGE_KEY);
      if (verified !== "true") {
        setIsOpen(true);
      }
    } catch {
      // Fallback if localStorage is disabled or restricted
      setIsOpen(true);
    }
  }, []);

  const handleConfirmAge = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
    onVerified?.();
  };

  const handleUnderAge = () => {
    setIsUnderAge(true);
  };

  const handleExitSite = () => {
    window.location.href = "https://www.google.com";
  };

  const handleResetVerification = () => {
    setIsUnderAge(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="age-verification-modal"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 backdrop-blur-xl ${
            isDark ? "bg-black/85" : "bg-slate-950/75"
          }`}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-lg rounded-2xl border shadow-2xl p-6 sm:p-8 overflow-hidden z-10 ${
            isDark
              ? "bg-neutral-900/95 border-white/10 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
              : "bg-white border-slate-200 text-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]"
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div 
            className={`absolute top-0 right-0 -mr-24 -mt-24 h-64 w-64 rounded-full blur-3xl pointer-events-none ${
              isUnderAge
                ? "bg-rose-500/15"
                : isDark ? "bg-emerald-500/10" : "bg-teal-500/10"
            }`} 
          />

          {!isUnderAge ? (
            /* Normal Verification View */
            <div className="relative space-y-6">
              {/* Badge & Lock Icon */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-500/10 border-emerald-500/25 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Age Verification Required</span>
                </div>
                <div className={`p-2 rounded-lg border ${
                  isDark ? "border-white/10 bg-white/5 text-neutral-400" : "border-slate-200 bg-slate-100 text-slate-600"
                }`}>
                  <Lock className="h-4 w-4" />
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-3">
                <h2 className={`font-sans text-2xl sm:text-3xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  Are you 21 years of age or older?
                </h2>
                <p className={`font-sans text-sm sm:text-[15px] leading-relaxed font-light ${
                  isDark ? "text-neutral-300" : "text-slate-600"
                }`}>
                  This portal contains high-purity investigational peptides, analytical reference standards, and technical specifications intended exclusively for accredited research institutions, licensed laboratories, and qualified commercial partners.
                </p>
                <p className={`font-sans text-xs leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}>
                  You must be at least 21 years of age to enter and explore our research catalog.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="confirm-age-btn"
                  onClick={handleConfirmAge}
                  className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98] ${
                    isDark
                      ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_4px_25px_rgba(16,185,129,0.35)]"
                      : "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_4px_25px_rgba(13,148,136,0.3)]"
                  }`}
                >
                  <span>I Am 21 or Older</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  id="under-age-btn"
                  onClick={handleUnderAge}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.18em] border transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                    isDark
                      ? "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                      : "border-slate-300 hover:border-slate-400 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <span>I Am Under 21</span>
                </button>
              </div>

              {/* Footer Notice */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Research Use Only</span>
                <span>B2B Peps Verification</span>
              </div>
            </div>
          ) : (
            /* Restricted View for under 21 */
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-rose-500/10 border-rose-500/25 text-rose-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Access Restricted</span>
              </div>

              <div className="space-y-3">
                <h2 className={`font-sans text-2xl sm:text-3xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  Age Requirement Not Met
                </h2>
                <p className={`font-sans text-sm leading-relaxed ${
                  isDark ? "text-neutral-300" : "text-slate-600"
                }`}>
                  We are sorry, but access to B2B Peps is restricted to individuals who are 21 years of age or older in accordance with regulatory and research compliance standards.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="exit-site-btn"
                  onClick={handleExitSite}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] bg-rose-600 hover:bg-rose-500 text-white transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98]"
                >
                  <span>Exit Website</span>
                  <ExternalLink className="h-4 w-4" />
                </button>

                <button
                  id="reverify-age-btn"
                  onClick={handleResetVerification}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.18em] border transition-all duration-300 cursor-pointer ${
                    isDark
                      ? "border-white/10 hover:border-white/20 bg-white/5 text-neutral-400 hover:text-white"
                      : "border-slate-300 hover:border-slate-400 bg-slate-100 text-slate-700"
                  }`}
                >
                  <span>I Made a Mistake</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
