/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { PEPTIDES_CATALOG } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Mail, Phone, Calendar, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, FileDown, HelpCircle, 
  ChevronDown, MessageSquare 
} from "lucide-react";

interface PartnerInquiryFormProps {
  prefilledPeptideName: string | null;
}

type InquiryType = "partner" | "catalog" | "consultation";

export default function PartnerInquiryForm({ prefilledPeptideName }: PartnerInquiryFormProps) {
  const [inquiryType, setInquiryType] = useState<InquiryType>("partner");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form State
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPeptides, setSelectedPeptides] = useState<string[]>([]);
  const [volume, setVolume] = useState("Vial Batches (<50 units)");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState("July 22, 2026");
  const [selectedTime, setSelectedTime] = useState("10:00 AM EST (PhD Dr. Vance)");

  // Sync pre-filled peptide name if user clicked "Enquire" on a peptide card
  useEffect(() => {
    if (prefilledPeptideName) {
      setInquiryType("partner");
      if (!selectedPeptides.includes(prefilledPeptideName)) {
        setSelectedPeptides([...selectedPeptides, prefilledPeptideName]);
      }
      setNotes(`Interested in acquiring technical batch pricing for: ${prefilledPeptideName}`);
      const section = document.getElementById("inquiry");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [prefilledPeptideName]);

  const togglePeptideSelection = (name: string) => {
    if (selectedPeptides.includes(name)) {
      setSelectedPeptides(selectedPeptides.filter(p => p !== name));
    } else {
      setSelectedPeptides([...selectedPeptides, name]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setSuccess(false);
    setCompanyName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setSelectedPeptides([]);
    setVolume("Vial Batches (<50 units)");
    setNotes("");
  };

  const availableDates = [
    "July 22, 2026",
    "July 23, 2026",
    "July 24, 2026",
    "July 27, 2026"
  ];

  const availableSlots = [
    "10:00 AM EST (PhD Dr. Vance)",
    "01:30 PM EST (PhD Dr. Vance)",
    "03:00 PM EST (VP of Logistics Rostov)",
    "04:30 PM EST (PhD Dr. Thorne)"
  ];

  return (
    <section id="inquiry" className="relative bg-neutral-950 px-6 sm:px-8 lg:px-12 py-24 border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute left-1/2 bottom-0 h-96 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left panel: Typography final CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 mb-3">
              Establish Sourcing Stability
            </span>
            <h2 className="font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-tight">
              Build your peptide business with confidence.
            </h2>
            <p className="mt-6 font-sans text-sm text-neutral-400 leading-relaxed max-w-md">
              Secure a trusted B2B manufacturing partner. Whether you are scaling clinical testing trials, distributing certified peptide products, or building customized formulations, we offer absolute reliability.
            </p>


            {/* Lead Technical Sourcing Advisors */}
            <div className="mt-8 border-t border-white/5 pt-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-neutral-500 block mb-4">
                Lead Technical Sourcing Advisors
              </span>
              <div className="space-y-4">
                {[
                  {
                    name: "Dr. Elian Vance, PhD",
                    role: "Chief Scientific Officer",
                    specialty: "Oversight on stereochemical assembly and chiral purity validation.",
                    initials: "EV",
                    border: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
                  },
                  {
                    name: "Dr. Marcus Thorne, PhD",
                    role: "Director of Assay Validation",
                    specialty: "Expertise on high-resolution chromatography and mass spectrometry.",
                    initials: "MT",
                    border: "border-teal-500/20 text-teal-400 bg-teal-500/5",
                  },
                  {
                    name: "Elena Rostov, MS",
                    role: "VP of Global Logistics",
                    specialty: "Specialist in active cold-chain cryo-telemetry and customs clearance.",
                    initials: "ER",
                    border: "border-neutral-500/20 text-neutral-300 bg-neutral-900/50",
                  },
                ].map((member, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <div className={`h-8 w-8 rounded-full border ${member.border} flex items-center justify-center font-mono text-[9px] font-bold shrink-0 shadow-sm`}>
                      {member.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-xs font-semibold text-white">{member.name}</span>
                        <span className="h-1 w-1 rounded-full bg-neutral-600" />
                        <span className="font-sans text-[10px] text-neutral-400">{member.role}</span>
                      </div>
                      <p className="font-sans text-[11px] text-neutral-500 mt-0.5 leading-snug font-light">
                        {member.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick interactive selector buttons (replaces standard tabs) */}
            <div className="mt-8 flex flex-col gap-3 max-w-xs">
              <button
                onClick={() => { setInquiryType("partner"); setSuccess(false); }}
                className={`flex items-center justify-between text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                  inquiryType === "partner" && !success
                    ? "border-white/20 bg-white/5 text-white font-bold"
                    : "border-white/5 bg-neutral-900/10 text-neutral-400 hover:bg-neutral-900/30 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="font-sans text-xs tracking-wider uppercase font-semibold">1. Become a Partner</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" strokeWidth={1.2} />
              </button>

              <button
                onClick={() => { setInquiryType("catalog"); setSuccess(false); }}
                className={`flex items-center justify-between text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                  inquiryType === "catalog" && !success
                    ? "border-white/20 bg-white/5 text-white font-bold"
                    : "border-white/5 bg-neutral-900/10 text-neutral-400 hover:bg-neutral-900/30 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="font-sans text-xs tracking-wider uppercase font-semibold">2. Request Catalogue</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" strokeWidth={1.2} />
              </button>

              <button
                onClick={() => { setInquiryType("consultation"); setSuccess(false); }}
                className={`flex items-center justify-between text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                  inquiryType === "consultation" && !success
                    ? "border-white/20 bg-white/5 text-white font-bold"
                    : "border-white/5 bg-neutral-900/10 text-neutral-400 hover:bg-neutral-900/30 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="font-sans text-xs tracking-wider uppercase font-semibold">3. Book Consultation</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" strokeWidth={1.2} />
              </button>
            </div>

            {/* Trust Seal */}
            <div className="mt-12 flex items-center gap-3.5 border-t border-white/5 pt-8">
              <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" strokeWidth={1.2} />
              <div className="font-sans text-[11px] text-neutral-500 leading-relaxed">
                Your data is transmitted securely under 256-bit encryption. All B2B inquiries remain strictly confidential.
              </div>
            </div>
          </div>

          {/* Right panel: Active Interactive Form card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/20 p-8 backdrop-blur-sm relative overflow-hidden min-h-[480px]">
              
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/20 mb-6">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>

                    <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                      Transmission Confirmed
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-white mt-2">
                      Inquiry logged successfully.
                    </h3>
                    
                    <div className="mt-6 bg-neutral-950 p-5 rounded-xl border border-white/5 font-mono text-[11px] text-left text-neutral-400 w-full max-w-md space-y-2.5">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Registry ID</span>
                        <span className="text-white font-bold">REG-B2B-2026-9912A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact Name</span>
                        <span className="text-white">{contactName || "Global Sourcing Agent"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Organization</span>
                        <span className="text-white">{companyName || "Verified Life Science"}</span>
                      </div>
                      {inquiryType === "consultation" ? (
                        <div className="flex justify-between border-t border-white/5 pt-2 text-emerald-400 font-bold">
                          <span>Confirmed Time</span>
                          <span>{selectedDate} @ {selectedTime.split(" (")[0]}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between border-t border-white/5 pt-2 text-emerald-400 font-semibold">
                          <span>B2B Peps Dispatch SLA</span>
                          <span>Within 4 Hours</span>
                        </div>
                      )}
                    </div>

                    <p className="font-sans text-xs text-neutral-400 mt-6 max-w-sm leading-relaxed">
                      Our directors have been notified. An authentication key and customized pricing dossiers have been generated and pre-allocated to your contact email.
                    </p>

                    <button
                      onClick={handleReset}
                      className="mt-8 rounded-full border border-white/10 px-6 py-2.5 font-sans text-xs font-semibold tracking-wider text-neutral-300 hover:bg-white/5 transition-all"
                    >
                      Log Another Request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key={inquiryType}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    {/* Header specific to active form type */}
                    <div>
                      <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                        {inquiryType === "partner" ? "B2B Partnership Inquiry" : inquiryType === "catalog" ? "Digital Catalogue Request" : "Direct PhD Sourcing Consultation"}
                      </div>
                      <h3 className="font-sans text-xl font-semibold text-white mt-1">
                        {inquiryType === "partner" ? "Verify your clinical enterprise parameters" : inquiryType === "catalog" ? "Acquire full compound & specifications list" : "Schedule technical sequence analysis"}
                      </h3>
                    </div>

                    {/* Form Fields: General Contact Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block mb-1.5">Company / Entity Name *</label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" strokeWidth={1.2} />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Geneva Biotech Labs"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs text-white focus:border-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block mb-1.5">Representative Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Arthur Pendelton"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:border-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block mb-1.5">Business Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" strokeWidth={1.2} />
                          <input
                            type="email"
                            required
                            placeholder="e.g. procurement@entity.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs text-white focus:border-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block mb-1.5">Direct Line (Optional)</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" strokeWidth={1.2} />
                          <input
                            type="tel"
                            placeholder="e.g. +41 22 767 11 00"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs text-white focus:border-white outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Form Fields: TYPE-SPECIFIC SECTIONS */}
                    
                    {/* TYPE 1: Partnership specifics */}
                    {inquiryType === "partner" && (
                      <div className="space-y-4">
                        {/* Multi-peptide selection */}
                        <div>
                          <label className="font-mono text-[10px] uppercase text-neutral-500 block mb-2">Compound Vectors Under Investigation (Select Any)</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {PEPTIDES_CATALOG.map((p) => {
                              const isChecked = selectedPeptides.includes(p.name);
                              return (
                                <div
                                  key={p.id}
                                  onClick={() => togglePeptideSelection(p.name)}
                                  className={`flex items-center gap-2 border rounded-lg p-2.5 cursor-pointer text-[11px] transition-all ${
                                    isChecked
                                      ? "border-emerald-500/30 bg-emerald-500/5 text-white"
                                      : "border-white/5 bg-neutral-950 text-neutral-400 hover:border-white/10 hover:text-white"
                                  }`}
                                >
                                  <div className={`h-3 w-3 rounded flex items-center justify-center border ${isChecked ? "bg-emerald-500 border-emerald-400 text-neutral-950" : "border-white/20"}`}>
                                    {isChecked && <span className="text-[8px] font-bold">✓</span>}
                                  </div>
                                  <span className="truncate">{p.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Anticipated Monthly Volume */}
                        <div>
                          <label className="font-mono text-[10px] uppercase text-neutral-500 block mb-1.5">Anticipated Monthly Sourcing Volume</label>
                          <select
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="w-full bg-neutral-950 border border-white/5 rounded-xl py-3.5 px-4 text-xs text-white focus:border-emerald-500/40 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option>Vial Batches (&lt;50 units / month)</option>
                            <option>Mid-Scale Bulk Procurement (50 - 500 units / month)</option>
                            <option>Industrial Enterprise Sourcing (500+ units / month)</option>
                            <option>Custom Sequence Synthesis Contracts</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* TYPE 2: Catalog request specifics */}
                    {inquiryType === "catalog" && (
                      <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex gap-3">
                        <FileDown className="h-10 w-10 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-sans text-xs font-bold text-white">Automated Digital Delivery Enabled</div>
                          <p className="font-sans text-[11px] text-neutral-400 mt-1">
                            The latest 2026 Volume 2 Catalog (including chiral safety matrices, bulk tier rates, and residual-solvent declarations) will be delivered immediately to your corporate inbox as an encrypted PDF.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* TYPE 3: Consultation scheduler */}
                    {inquiryType === "consultation" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="font-mono text-[10px] uppercase text-neutral-500 block mb-1.5">Preferred Date</label>
                          <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-neutral-950 border border-white/5 rounded-xl py-3.5 px-4 text-xs text-white focus:border-emerald-500/40 outline-none cursor-pointer"
                          >
                            {availableDates.map((d) => (
                              <option key={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="font-mono text-[10px] uppercase text-neutral-500 block mb-1.5">Preferred Slot / Lead Specialist</label>
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full bg-neutral-950 border border-white/5 rounded-xl py-3.5 px-4 text-xs text-white focus:border-emerald-500/40 outline-none cursor-pointer"
                          >
                            {availableSlots.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* General Text area notes field */}
                    <div>
                      <label className="font-mono text-[10px] uppercase text-neutral-500 block mb-1.5">Research Objectives & Sequence Requirements</label>
                      <textarea
                        rows={3}
                        placeholder={inquiryType === "consultation" ? "Please detail what sequences or compounds you wish to review during the video consultation..." : "Please list target purities, packaging specifications, or research targets..."}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-neutral-950 border border-white/5 rounded-xl py-3.5 px-4 text-xs text-white focus:border-emerald-500/40 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative overflow-hidden rounded-full bg-white w-full py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-neutral-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Transmitting Securely...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Secure B2B Request</span>
                          <ArrowRight className="h-4 w-4 text-neutral-950 group-hover:translate-x-1 transition-transform" strokeWidth={1.2} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
