/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  FileText, FlaskConical, ClipboardCheck, 
  Truck, ShieldCheck, ChevronRight, ArrowDown,
  Microscope, Filter
} from "lucide-react";
import { motion } from "motion/react";

export default function WorkflowStepper() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: "step-raw-verification",
      icon: <ClipboardCheck className="h-5 w-5" strokeWidth={1.2} />,
      title: "Raw Material Verification",
      subTitle: "Pre-Synthesis Assays",
      description: "Incoming amino acid derivatives, resin linkers, and coupling reagents undergo strict nuclear magnetic resonance (NMR) verification and stereochemical trace-impurity checks to ensure 100% material authenticity before synthesis begins.",
      duration: "On-Entry Check",
      authority: "Spectroscopy Lab"
    },
    {
      id: "step-manufacturing",
      icon: <FlaskConical className="h-5 w-5" strokeWidth={1.2} />,
      title: "Synthesis & Assembly",
      subTitle: "Solid Phase Peptide Synthesis",
      description: "The targeted peptide sequence is assembled step-by-step using modern, microwave-assisted Solid Phase Peptide Synthesis (SPPS) inside Class 100 cleanroom environments. High coupling yields and thermal precision eliminate truncated chains.",
      duration: "2-5 Days Run",
      authority: "PhD Lead Chemist"
    },
    {
      id: "step-purification",
      icon: <Filter className="h-5 w-5" strokeWidth={1.2} />,
      title: "Chromatographic Purification",
      subTitle: "Preparative Reverse-Phase HPLC",
      description: "The crude peptide is processed using multi-stage Preparative HPLC. Eluted fractions are collected and immediately pooled under refrigerated sub-ambient conditions to preserve stereochemical integrity and isolate single monomers.",
      duration: "1-2 Days Run",
      authority: "Purification Lab"
    },
    {
      id: "step-analytical",
      icon: <Microscope className="h-5 w-5" strokeWidth={1.2} />,
      title: "Analytical Testing",
      subTitle: "HPLC & Mass Spectrometry",
      description: "Each purified lot is run through analytical HPLC columns to verify steric purity, and Electrospray Ionization Mass Spectrometry (ESI-MS) to check sequence molecular weight alignment. We accept zero molecular variance.",
      duration: "24 Hours Assay",
      authority: "QC Analyst Team"
    },
    {
      id: "step-documentation",
      icon: <FileText className="h-5 w-5" strokeWidth={1.2} />,
      title: "Quality Documentation",
      subTitle: "Certificate of Analysis",
      description: "We compile batch-specific, digitally authenticated Certificates of Analysis (CoA) containing physical properties, moisture metrics, residual solvent indexes, reverse-phase HPLC chromatograms, and mass spec plots.",
      duration: "Immediate Issue",
      authority: "Quality Director"
    },
    {
      id: "step-distribution",
      icon: <Truck className="h-5 w-5" strokeWidth={1.2} />,
      title: "Global Delivery Solutions",
      subTitle: "Worldwide Cargo Logistics",
      description: "Finished lyophilized powder is hermetically sealed in borosilicate glass vials, securely packaged, and delivered worldwide with end-to-end cargo tracking.",
      duration: "Express Freight",
      authority: "Logistics Lead"
    }
  ];

  return (
    <section id="workflow" className="relative bg-neutral-950 px-6 sm:px-8 lg:px-12 py-24 border-t border-white/5">
      <div className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-white/[0.01] blur-[150px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400">
            Operational Protocol
          </span>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A seamless journey to global sourcing stability.
          </h2>
          <p className="mt-4 font-sans text-xs text-neutral-400 leading-relaxed font-light">
            We have refined the B2B peptide procurement process into a highly structured, risk-free workflow that ensures absolute product validation and custom logistics handling.
          </p>
        </div>

        {/* Timeline representation - Desktop Horizontal */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting timeline rail */}
          <div className="absolute top-[26px] left-[5%] right-[5%] h-[2px] bg-white/5 z-0">
            {/* Animated active path line */}
            <motion.div 
              className="h-full bg-gradient-to-r from-white to-neutral-400"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 90}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-6 gap-4">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;
              
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Glowing Node Button */}
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-white border-white text-neutral-950 scale-105"
                      : isPast
                        ? "bg-neutral-900 border-white/20 text-white"
                        : "bg-neutral-950 border-white/5 text-neutral-400 group-hover:border-white/20 group-hover:text-white"
                  }`}>
                    {step.icon}
                    {isPast && (
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] text-neutral-950 font-bold border border-neutral-950">✓</span>
                    )}
                  </div>

                  {/* Step Titles */}
                  <div className="text-center mt-6">
                    <div className={`font-sans text-sm font-bold tracking-tight transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                      {step.title}
                    </div>
                    <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider mt-1">
                      Stage 0{idx + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Step Description Card - Desktop only */}
        <div className="hidden lg:block bg-neutral-900/20 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-1 flex justify-center">
              <span className="font-mono text-5xl font-extrabold text-white/5 select-none">
                0{activeStep + 1}
              </span>
            </div>
            
            <div className="col-span-7">
              <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-1">
                {steps[activeStep].subTitle}
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3">
                {steps[activeStep].title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-neutral-400 max-w-2xl">
                {steps[activeStep].description}
              </p>
            </div>

            <div className="col-span-4 flex justify-end gap-3 font-mono text-[11px]">
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 text-center min-w-[120px]">
                <span className="text-neutral-500">Duration</span>
                <div className="text-white font-bold mt-1">
                  {steps[activeStep].duration}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 text-center min-w-[120px]">
                <span className="text-neutral-500">Authority</span>
                <div className="text-emerald-400 font-bold mt-1">
                  {steps[activeStep].authority}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Stepper representation */}
        <div className="lg:hidden flex flex-col gap-6" id="mobile-workflow">
          {steps.map((step, idx) => (
            <div 
              key={step.id}
              className="flex gap-4 p-5 rounded-2xl bg-neutral-900/10 border border-white/5 hover:border-emerald-500/15 hover:bg-neutral-900/20 transition-all"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 font-bold font-mono text-xs">
                  0{idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-[1px] h-full bg-white/10 mt-3" />
                )}
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 block">
                  {step.subTitle}
                </span>
                <h3 className="font-sans text-base font-bold text-white mt-1">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 mt-2.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
