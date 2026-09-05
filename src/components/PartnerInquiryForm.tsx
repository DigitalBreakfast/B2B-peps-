/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Mail, Phone, Calendar, Clock, Globe2, 
  Send, ShieldCheck, CheckCircle2, MessageSquare, 
  FileText, DollarSign, Users, HelpCircle, ArrowRight,
  Sparkles, Check, MessageCircle, AlertCircle
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import type { ContactInquiryPayload, ContactApiResponse } from "../lib/contactTypes";

interface PartnerInquiryFormProps {
  prefilledPeptideName?: string | null;
}

const HELP_OPTIONS = [
  {
    id: "pricing",
    label: "Request Pricing",
    description: "Wholesale tier pricing & custom batch quotations",
    icon: DollarSign,
  },
  {
    id: "catalogue",
    label: "Request Product Catalogue",
    description: "Complete product catalogue & specifications",
    icon: FileText,
  },
  {
    id: "meeting",
    label: "Request a Meeting",
    description: "Direct video or phone consultation with our team",
    icon: Users,
  },
  {
    id: "general",
    label: "General Enquiry / Other",
    description: "Volume supply, private label & logistics questions",
    icon: HelpCircle,
  },
];

const MONTHLY_REQUIREMENTS = [
  "Under 100 vials/month",
  "100–500",
  "500–1,000",
  "1,000+",
  "Not sure yet",
];

export default function PartnerInquiryForm({ prefilledPeptideName }: PartnerInquiryFormProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState<string>("");

  // Form Fields
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  
  // "What can we help with?" - Checkbox array (allow multiple)
  const [selectedHelp, setSelectedHelp] = useState<string[]>(["pricing"]);
  
  // Approximate Monthly Requirement (optional)
  const [monthlyRequirement, setMonthlyRequirement] = useState<string>("");
  
  // Message
  const [message, setMessage] = useState("");

  // Meeting Details (conditional if "Request a Meeting" selected)
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [userTimezone, setUserTimezone] = useState("");

  // Automatically capture the visitor's timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(tz || "UTC");
    } catch {
      setUserTimezone("UTC");
    }

    // Set default tomorrow date for meeting date picker
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setPreferredDate(`${yyyy}-${mm}-${dd}`);
    setPreferredTime("14:00");
  }, []);

  // Pre-fill if navigated with specific peptide
  useEffect(() => {
    if (prefilledPeptideName) {
      if (!selectedHelp.includes("pricing")) {
        setSelectedHelp((prev) => [...prev, "pricing"]);
      }
      setMessage((prev) => 
        prev ? `${prev}\nInquiring about: ${prefilledPeptideName}` : `Inquiring about: ${prefilledPeptideName}`
      );
    }
  }, [prefilledPeptideName]);

  const toggleHelpOption = (id: string) => {
    setSelectedHelp((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isMeetingSelected = selectedHelp.includes("meeting");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please provide your contact name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setSubmitting(true);
    const localRef = `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const payload: ContactInquiryPayload = {
        name: name.trim(),
        company: company.trim() || undefined,
        email: email.trim(),
        whatsapp: whatsapp.trim() || undefined,
        telegram: telegram.trim() || undefined,
        selectedHelp,
        monthlyRequirement: monthlyRequirement || undefined,
        message: message.trim() || undefined,
        preferredDate: isMeetingSelected ? preferredDate : undefined,
        preferredTime: isMeetingSelected ? preferredTime : undefined,
        userTimezone,
        reference: localRef,
        b2b_website_hp: honeypot,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: ContactApiResponse = await res.json().catch(() => ({
        success: false,
        error: "Unable to parse server response.",
      }));

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "We could not transmit your enquiry. Please reach out directly to info@b2bpeps.com."
        );
      }

      setSubmittedRef(data.reference || localRef);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error?.message || "An error occurred while submitting. Please email info@b2bpeps.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setErrorMessage(null);
    setSubmittedRef("");
    setHoneypot("");
    setName("");
    setCompany("");
    setEmail("");
    setWhatsapp("");
    setTelegram("");
    setSelectedHelp(["pricing"]);
    setMonthlyRequirement("");
    setMessage("");
  };

  return (
    <article className="min-h-screen bg-neutral-950 text-white pt-24 pb-20 sm:pt-28 sm:pb-24 relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-emerald-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold block mb-3">
              Direct Contact & Procurement
            </span>
            <h1 className={`font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#0B1B3D]"
            }`}>
              Get in Touch with Our Team
            </h1>
            <p className="mt-4 font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
              Submit your inquiry below for wholesale pricing, full analytical catalogues, custom peptide specifications, or meeting requests.
            </p>

            {/* Direct Quick Contact Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:info@b2bpeps.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-emerald-500/30 text-neutral-200 hover:text-white transition-all text-xs font-mono min-h-[44px] cursor-pointer"
                title="Email: info@b2bpeps.com"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>info@b2bpeps.com</span>
              </a>

              <a
                href="https://wa.me/447414219888"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-400/50 text-emerald-300 transition-all text-xs font-mono min-h-[44px] cursor-pointer"
                title="WhatsApp: +44 7414 219888"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp: +44 7414 219888</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-emerald-500/20 bg-neutral-900/60 p-8 sm:p-10 backdrop-blur-md text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                  Transmission Received
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mt-2">
                  Thank you for your enquiry.
                </h2>
                <p className="font-sans text-sm text-neutral-300 mt-3 max-w-md mx-auto leading-relaxed">
                  We'll contact you to confirm the exact details, pricing, or meeting time by email, WhatsApp or Telegram.
                </p>

                {/* Summary of submitted details */}
                <div className="mt-8 bg-neutral-950/80 rounded-xl border border-white/5 p-5 text-left font-sans text-xs text-neutral-300 space-y-3 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-neutral-500 font-mono">Reference</span>
                    <span className="text-emerald-400 font-mono font-semibold">
                      {submittedRef || "ENQ-CONFIRMED"}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-neutral-500 font-mono">Name</span>
                    <span className="text-white font-medium">{name}</span>
                  </div>

                  {company && (
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span className="text-neutral-500 font-mono">Company</span>
                      <span className="text-white font-medium">{company}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-neutral-500 font-mono">Email</span>
                    <span className="text-white font-medium">{email}</span>
                  </div>

                  {whatsapp && (
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span className="text-neutral-500 font-mono">WhatsApp</span>
                      <span className="text-white font-medium">{whatsapp}</span>
                    </div>
                  )}

                  {telegram && (
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span className="text-neutral-500 font-mono">Telegram</span>
                      <span className="text-white font-medium">{telegram}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-neutral-500 font-mono">Services Requested</span>
                    <span className="text-emerald-300 font-medium text-right">
                      {selectedHelp.length > 0 
                        ? selectedHelp.map(id => HELP_OPTIONS.find(o => o.id === id)?.label).join(", ")
                        : "General Enquiry"}
                    </span>
                  </div>

                  {monthlyRequirement && (
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span className="text-neutral-500 font-mono">Monthly Requirement</span>
                      <span className="text-white font-medium">{monthlyRequirement}</span>
                    </div>
                  )}

                  {isMeetingSelected && (
                    <div className="flex justify-between pt-1 text-emerald-400">
                      <span className="font-mono">Preferred Meeting</span>
                      <span className="font-medium text-right">
                        {preferredDate || "Selected date"} @ {preferredTime || "14:00"} ({userTimezone})
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="enquiry-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-neutral-900/30 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-2xl space-y-8"
              >
                {/* Anti-spam honeypot (hidden from real users, caught if filled by bots) */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="b2b_website_hp">Do not fill this field</label>
                  <input
                    id="b2b_website_hp"
                    name="b2b_website_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Submission Error Banner */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs font-sans text-rose-200 flex items-start gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-rose-100 mb-0.5">Enquiry Submission Notice</p>
                      <p className="text-rose-200/90 leading-relaxed">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
                
                {/* 1. Contact Information */}
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <h2 className="font-sans text-base font-semibold text-white">
                      1. Contact Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="font-sans text-xs font-medium text-neutral-300 block mb-1.5">
                        Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
                      />
                    </div>

                    {/* Company (optional) */}
                    <div>
                      <label className="font-sans text-xs font-medium text-neutral-300 block mb-1.5">
                        Company <span className="text-neutral-500 text-[11px] font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" strokeWidth={1.4} />
                        <input
                          type="text"
                          placeholder="Institution, clinic or company name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email (required) */}
                  <div>
                    <label className="font-sans text-xs font-medium text-neutral-300 block mb-1.5">
                      Email <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" strokeWidth={1.4} />
                      <input
                        type="email"
                        required
                        placeholder="yourname@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp (optional) & Telegram (optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-xs font-medium text-neutral-300 block mb-1.5">
                        WhatsApp <span className="text-neutral-500 text-[11px] font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" strokeWidth={1.4} />
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans text-xs font-medium text-neutral-300 block mb-1.5">
                        Telegram <span className="text-neutral-500 text-[11px] font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" strokeWidth={1.4} />
                        <input
                          type="text"
                          placeholder="@username or phone"
                          value={telegram}
                          onChange={(e) => setTelegram(e.target.value)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. What can we help with? (Checkboxes, allow multiple selections) */}
                <div className="space-y-3">
                  <div className="border-b border-white/5 pb-2 flex items-center justify-between">
                    <h2 className="font-sans text-base font-semibold text-white">
                      2. What can we help with?
                    </h2>
                    <span className="font-mono text-[10px] text-neutral-500">
                      Select all that apply
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {HELP_OPTIONS.map((opt) => {
                      const isChecked = selectedHelp.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => toggleHelpOption(opt.id)}
                          className={`relative flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                            isChecked
                              ? "border-emerald-500/40 bg-emerald-500/[0.07] text-white shadow-sm shadow-emerald-500/10"
                              : "border-white/10 bg-neutral-950/60 text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                          }`}
                        >
                          {/* Custom Checkbox */}
                          <div
                            className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                              isChecked
                                ? "bg-emerald-500 border-emerald-400 text-neutral-950"
                                : "border-white/20 bg-neutral-900"
                            }`}
                          >
                            {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`font-sans text-xs sm:text-sm font-medium ${isChecked ? "text-white" : "text-neutral-200"}`}>
                              {opt.label}
                            </div>
                            <div className="font-sans text-[11px] text-neutral-500 mt-0.5 leading-snug">
                              {opt.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Conditional Meeting Details (Shown when "Request a Meeting" is selected) */}
                <AnimatePresence>
                  {isMeetingSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-emerald-400" />
                          <h3 className="font-sans text-xs sm:text-sm font-semibold text-white">
                            Meeting Preferences
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Preferred Meeting Date */}
                          <div>
                            <label className="font-sans text-xs font-medium text-neutral-300 block mb-1.5">
                              Preferred Meeting Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" strokeWidth={1.4} />
                              <input
                                type="date"
                                value={preferredDate}
                                onChange={(e) => setPreferredDate(e.target.value)}
                                className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white focus:border-emerald-500/50 outline-none transition-all scheme-dark"
                              />
                            </div>
                          </div>

                          {/* Preferred Meeting Time */}
                          <div>
                            <label className="font-sans text-xs font-medium text-neutral-300 block mb-1.5">
                              Preferred Meeting Time
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" strokeWidth={1.4} />
                              <input
                                type="time"
                                value={preferredTime}
                                onChange={(e) => setPreferredTime(e.target.value)}
                                className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white focus:border-emerald-500/50 outline-none transition-all scheme-dark"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Visitor's Timezone */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-sans text-xs text-neutral-400">
                          <div className="flex items-center gap-1.5">
                            <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Your Detected Timezone:</span>
                            <span className="font-mono text-white bg-neutral-950 px-2 py-0.5 rounded border border-white/10 text-[11px]">
                              {userTimezone || "UTC"}
                            </span>
                          </div>
                        </div>

                        {/* Required Meeting notice display */}
                        <div className="pt-2 border-t border-white/5 font-sans text-xs text-emerald-300/90 leading-relaxed">
                          We'll contact you to confirm the exact meeting time by email, WhatsApp or Telegram.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 4. Approximate Monthly Requirement (optional) */}
                <div className="space-y-3">
                  <div className="border-b border-white/5 pb-2">
                    <h2 className="font-sans text-base font-semibold text-white">
                      3. Approximate Monthly Requirement <span className="text-neutral-500 text-xs font-normal">(optional)</span>
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {MONTHLY_REQUIREMENTS.map((req) => {
                      const isSelected = monthlyRequirement === req;
                      return (
                        <button
                          key={req}
                          type="button"
                          onClick={() => setMonthlyRequirement(isSelected ? "" : req)}
                          className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                            isSelected
                              ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-semibold"
                              : "border-white/10 bg-neutral-950/60 text-neutral-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {req}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Message */}
                <div className="space-y-2">
                  <div className="border-b border-white/5 pb-2">
                    <label htmlFor="enquiry-message" className="font-sans text-base font-semibold text-white">
                      4. Message / Requirements
                    </label>
                  </div>
                  
                  <textarea
                    id="enquiry-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're looking for, including any products, quantities or other requirements."
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all resize-y min-h-[110px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full group relative overflow-hidden rounded-xl bg-white py-4 px-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 hover:bg-neutral-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-75"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-neutral-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {/* Confidentiality & Security footer */}
                <div className="flex items-center justify-center gap-2 font-sans text-[11px] text-neutral-500 text-center pt-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>All inquiries are confidential. For verified research, clinical, and institutional use only.</span>
                </div>

              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </article>
  );
}
