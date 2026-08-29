/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ShieldCheck, Microscope, 
  Truck, Activity, Layers, Award,
  Globe, HeartHandshake, Zap, ChevronRight,
  Sparkles, CheckCircle2, Lock, Compass,
  FileText, Database, ShieldAlert, BadgeHelp, RefreshCw,
  Eye, HelpCircle, ArrowUpRight, Sliders, Play, ClipboardCheck
} from "lucide-react";
import MolecularBackground from "./MolecularBackground";

interface WhyPartnerProps {
  onContactClick: () => void;
  onNavigate?: (pageId: string, filterCategory?: string) => void;
}

// Interactive Tilt Card wrapper for the Liquid Glass Design System
function LiquidGlassCard({ 
  children, 
  className = "", 
  onClick,
  accentColor = "rgba(16, 185, 129, 0.15)"
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Controlled subtle tilt angles for luxury feel
    const rX = ((mouseY / height) - 0.5) * -6;
    const rY = ((mouseX / width) - 0.5) * 6;
    
    const pX = (mouseX / width) * 100;
    const pY = (mouseY / height) * 100;

    setRotate({ x: rX, y: rY });
    setMousePos({ x: pX, y: pY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`group relative overflow-hidden rounded-[24px] border border-white/[0.04] bg-neutral-900/30 backdrop-blur-xl transition-all duration-500 shadow-2xl hover:border-emerald-500/20 ${className}`}
    >
      {/* Specular glass reflection overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10"
        style={{
          background: `radial-gradient(circle 220px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 85%)`,
        }}
      />

      {/* Dynamic ambient backlighting on hover */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, ${accentColor} 0%, transparent 80%)`,
        }}
      />
      
      {/* 1px inner glass edge highlight */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[24px] border border-white/0 group-hover:border-white/5 transition-colors duration-500 z-10"
        style={{
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.03)`,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function WhyPartner({ onContactClick, onNavigate }: WhyPartnerProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<number>(0);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Challenges structure
  const challenges = [
    {
      id: "quality",
      title: "Inconsistent Product Quality",
      subtitle: "The cytotoxic TFA risk",
      description: "Peptide synthesis relies on highly corrosive acids (Trifluoroacetic acid). Standard wholesale compounds bypass secondary chromatography steps, resulting in toxic residual concentrations that trigger assay failures.",
      resolution: "Sovereign Pure Matrix",
      protocol: "Every batch of B2B Peps undergoes targeted TFA salt exchange chromatography, reducing residual TFA ions below clinical detection thresholds, delivering guaranteed purity profiles of ≥99.0%."
    },
    {
      id: "docs",
      title: "Limited or Forged Documentation",
      subtitle: "The generic lot risk",
      description: "Typical sellers distribute photocopy certificates of analysis representing general factory reference samples instead of the precise physical vial that arrives at your facility.",
      resolution: "Individual Spectrometry Link",
      protocol: "Every clinical lot features a custom QR index linking instantly to high-resolution HPLC and LC-MS mass spectra data points in our immutable digital portal."
    },
    {
      id: "logistics",
      title: "Volatile Shipments & Long Lead Times",
      subtitle: "The transit integrity threat",
      description: "Standard postal couriers fail to guarantee protective transit protocols, risking package delays and exposure during multi-leg international transit.",
      resolution: "Global Delivery Solutions",
      protocol: "We ship all high-density commercial orders via validated protective containers with end-to-end milestone tracking, protecting molecular stability during air cargo transit."
    },
    {
      id: "scalability",
      title: "Price Squeezes & Supply Gaps",
      subtitle: "The raw cost volatility",
      description: "Fluctuating raw chemical indexes and custom border holdups create supply interruptions, causing multi-million dollar clinical trials to freeze due to missing vials.",
      resolution: "Supply Covenant Locks",
      protocol: "We safeguard B2B programs with 12-month supply-lock covenants. Enjoy guaranteed reactor slot schedules and stable pricing indexes secure from spot-market surges."
    }
  ];

  // Six Pillars of Trust
  const trustPillars = [
    {
      title: "Research-Grade Quality",
      tagline: "Absolute Chromatographic Purity",
      icon: <Microscope className="h-5 w-5 text-emerald-400" />,
      shortDesc: "Products are sourced through manufacturing partners operating to high-quality production standards, with an emphasis on purity, consistency, and batch reliability.",
      detailedSpecs: [
        "Double reverse-phase HPLC chromatograms matching rigid ≥99.0% baseline limits.",
        "Lyophilization conducted exclusively inside ISO Class 5 sterile clean rooms.",
        "Rigid biological safety screening covering microbial endotoxins and heavy metals."
      ]
    },
    {
      title: "Documentation You Can Trust",
      tagline: "Verifiable Lot Tracing dossiers",
      icon: <ClipboardCheck className="h-5 w-5 text-teal-400" />,
      shortDesc: "Where available, products are supported by analytical documentation including HPLC purity analysis, LC-MS identity confirmation, batch traceability, and Certificates of Analysis.",
      detailedSpecs: [
        "Lot-specific chromatography data reflecting the specific physical lot dispatched.",
        "Comprehensive mass-spectrometry identification mapping exact molecular weight curves.",
        "Guaranteed Certificates of Analysis (CoA) with direct signature of verified biochemists."
      ]
    },
    {
      title: "Global Delivery Solutions",
      tagline: "International Sourcing & Logistics",
      icon: <Globe className="h-5 w-5 text-emerald-400" />,
      shortDesc: "Our commercial network supports global sourcing, fulfilment, and logistics, helping businesses access products efficiently across international markets.",
      detailedSpecs: [
        "Robust direct global logistics routing through major primary international air cargo hubs.",
        "Integrated custom clearance coordination preventing border security transit holds.",
        "Secure packaging configurations maintaining stable storage parameters globally."
      ]
    },
    {
      title: "Commercial Flexibility",
      tagline: "Adaptive Procurement Frameworks",
      icon: <Lock className="h-5 w-5 text-teal-400" />,
      shortDesc: "Whether you require wholesale supply, private label programmes, custom packaging, or scalable procurement solutions, we work to support your commercial objectives.",
      detailedSpecs: [
        "Configurable vial weight allocations (2.5mg, 5mg, 10mg, or scalable custom volumes).",
        "Comprehensive private label options spanning formulation to customized boxing.",
        "Predictive scheduled releases aligning with your yearly laboratory production targets."
      ]
    },
    {
      title: "Scientific Understanding",
      tagline: "Uncompromised Biochemical Support",
      icon: <Activity className="h-5 w-5 text-emerald-400" />,
      shortDesc: "We recognise that our customers require more than product availability. They need technical understanding, transparent communication, and reliable information to make informed sourcing decisions.",
      detailedSpecs: [
        "Direct consultation with certified biochemical engineers (no generic call desks).",
        "Professional assistance regarding peptide reconstitution, solubility limits, and buffers.",
        "Transparent technical disclosures detailing chemical synthesis salt variants."
      ]
    },
    {
      title: "Partnership Beyond Supply",
      tagline: "Continuous Commercial Growth Integration",
      icon: <HeartHandshake className="h-5 w-5 text-teal-400" />,
      shortDesc: "We believe long-term relationships are built through consistency, responsiveness, and trust—not transactions. Our objective is to become an extension of your business.",
      detailedSpecs: [
        "Assigned corporate account managers monitoring shipment telematics and logs.",
        "Early research compound access previews and reserved pilot-scale production lines.",
        "Flexible net-billing accounts structured to align with corporate capital cycles."
      ]
    }
  ];

  // Six Commercial Services Grid
  const commercialServices = [
    {
      title: "Private Label Programmes",
      desc: "Launch your own peptide brand with confidence. We handle full formulation, vial division, and custom sterile labeling.",
      badge: "Full-Service",
      metrics: "Custom Synthesis & Division"
    },
    {
      title: "Branding & Packaging",
      desc: "Custom packaging solutions designed for commercial partners. Achieve an elegant, premium retail-ready corporate design.",
      badge: "Design",
      metrics: "Refractive Glass Vials"
    },
    {
      title: "Bulk Commercial Supply",
      desc: "Scalable sourcing solutions for growing businesses. Secure consistent volume cycles with premium industrial batch limits.",
      badge: "Enterprise",
      metrics: "Up to 50kg Batch Allocations"
    },
    {
      title: "Analytical Testing",
      desc: "Independent analytical services to support quality verification. Get transparent LC-MS reports and purity audits.",
      badge: "Laboratory",
      metrics: "HPLC Identity Assays"
    },
    {
      title: "International Fulfilment",
      desc: "Reliable worldwide distribution supported by established logistics networks and end-to-end container tracking.",
      badge: "Logistics",
      metrics: "Global Delivery Solutions"
    },
    {
      title: "Product Delivery Solutions",
      desc: "Commercial delivery formats tailored to market requirements. Optimized reconstitution buffers and stable lyophilized cake storage.",
      badge: "Innovation",
      metrics: "Lyophilized Reagents"
    }
  ];

  const handleNavigateToProducts = () => {
    if (onNavigate) {
      onNavigate("products");
    } else {
      onContactClick();
    }
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen relative overflow-hidden font-sans selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-500">
      
      {/* 1. LIVING BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <MolecularBackground theme="executive-dark" />
      </div>

      <div className="absolute inset-0 bg-noise opacity-[0.007] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[800px] bg-radial-gradient(circle_at_50%_-100px,rgba(16,185,129,0.06),transparent_60%) pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[1000px] bg-radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.05),transparent_75%) pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-24 space-y-32">
        
        {/* =======================================
            SECTION A: HERO (The Apple Keynote Aesthetic)
            ======================================= */}
        <section className="text-left pt-12 relative">
          {/* Subtle Glow behind Hero */}
          <div className="absolute -left-20 top-12 h-64 w-64 rounded-full bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Title Block */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]" />
                <span className="font-mono text-[8.5px] font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                  Strategic B2B Alliances
                </span>
              </div>

              <h1 className="font-sans text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight leading-[1.12] text-balance">
                More Than a Supplier. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-emerald-400">
                  A Long-Term Peptide Solutions Partner.
                </span>
              </h1>

              <div className="space-y-4 max-w-3xl">
                <p className="font-sans text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                  Building a successful peptide business requires more than access to high-quality products. It requires dependable sourcing, consistent quality, transparent documentation, and a partner capable of supporting long-term commercial growth.
                </p>
                <p className="font-sans text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                  B2B Peps works with biotechnology companies, research organisations, distributors, clinics, and wellness businesses to simplify peptide sourcing and strengthen supply confidence through premium products, scientific expertise, and reliable global fulfilment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={handleNavigateToProducts}
                  className="w-full sm:w-auto rounded-full bg-emerald-400 hover:bg-emerald-500 text-neutral-950 font-mono text-[9px] uppercase tracking-widest font-extrabold py-4 px-8 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] hover:scale-[1.02]"
                >
                  <span>Request Product Catalogue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto rounded-full border border-white/10 hover:border-emerald-400/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 font-mono text-[9px] uppercase tracking-widest font-bold transition-all duration-300 hover:scale-[1.01]"
                >
                  Speak With Our Team
                </button>
              </div>

            </div>

            {/* Specular Keynote Metric Block */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <LiquidGlassCard className="p-8 space-y-6">
                <div className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                  PARTNER ALIGNMENT STANDARD
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-4">
                    <div className="font-sans text-2xl font-semibold text-white">≥99.0% Purity</div>
                    <div className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">TFA Residual Purged Purity Limits</div>
                  </div>
                  
                  <div className="border-b border-white/5 pb-4">
                    <div className="font-sans text-2xl font-semibold text-white">Full Cryo-Chain</div>
                    <div className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">Active Temperature Telemetry</div>
                  </div>

                  <div>
                    <div className="font-sans text-2xl font-semibold text-white">Lot verification</div>
                    <div className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">Lot-Specific Spectral QR Dossier</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="font-sans text-[10px] text-neutral-400 leading-normal">
                      Verified vendor parameters meeting clinical and commercial research compliance.
                    </span>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>

          </div>
        </section>

        {/* =======================================
            SECTION B: CHALLENGES (The Empathy Bridge)
            ======================================= */}
        <section className="relative">
          <div className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-teal-500/[0.03] blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl space-y-4 mb-16">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] font-extrabold text-emerald-400 block">
              ACKNOWLEDGING THE MARKET SQUEEZE
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
              Reliable peptide sourcing shouldn't be your biggest challenge.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl font-light leading-relaxed">
              Businesses entering or expanding the peptide market often encounter inconsistent product quality, limited documentation, unreliable suppliers, fluctuating lead times, and complex international logistics.
            </p>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl font-light leading-relaxed">
              These challenges can delay product launches, disrupt operations, and reduce confidence across the supply chain. Our role is to simplify that process—providing dependable products, transparent documentation, and responsive commercial support that allows our partners to focus on growing their business.
            </p>
          </div>

          {/* Interactive Challenge-to-Resolution Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column selectors */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest pl-2 mb-1">
                SELECT AN OPERATIONAL BOTTLENECK
              </span>
              
              {challenges.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChallenge(idx)}
                  className={`w-full text-left p-5 rounded-[20px] border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${selectedChallenge === idx ? 'bg-neutral-900/90 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.04)] text-white' : 'bg-neutral-900/10 border-white/[0.04] hover:bg-neutral-900/30 text-neutral-400'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${selectedChallenge === idx ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]' : 'bg-neutral-700'}`} />
                    <span className={`font-sans text-xs font-semibold ${selectedChallenge === idx ? 'text-white' : 'text-neutral-400'}`}>
                      {c.title}
                    </span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${selectedChallenge === idx ? 'text-emerald-400 translate-x-1' : 'text-neutral-500'}`} />
                </button>
              ))}
            </div>

            {/* Right Interactive Frost Panel */}
            <div className="lg:col-span-7">
              <LiquidGlassCard className="h-full p-8 md:p-10 flex flex-col justify-between" accentColor="rgba(20, 184, 166, 0.12)">
                <div className="space-y-8">
                  
                  {/* Problem Description */}
                  <div className="space-y-3 pb-6 border-b border-white/[0.05]">
                    <div className="flex items-center gap-2 text-[9px] font-mono text-amber-500 uppercase tracking-widest font-extrabold">
                      <ShieldAlert className="h-4 w-4" />
                      <span>THE CLIENT FRICTION</span>
                    </div>
                    <h3 className="font-sans text-sm font-semibold text-white">
                      {challenges[selectedChallenge].title}
                    </h3>
                    <div className="font-mono text-[8.5px] text-neutral-500 uppercase italic">
                      &ldquo;{challenges[selectedChallenge].subtitle}&rdquo;
                    </div>
                    <p className="font-sans text-xs leading-relaxed text-neutral-400 font-light">
                      {challenges[selectedChallenge].description}
                    </p>
                  </div>

                  {/* Operational Solution */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-extrabold">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>THE B2B PEPS PROTOCOL</span>
                    </div>
                    <h4 className="font-sans text-base font-semibold text-white">
                      {challenges[selectedChallenge].resolution}
                    </h4>
                    <p className="font-sans text-xs leading-relaxed text-neutral-300 font-light">
                      {challenges[selectedChallenge].protocol}
                    </p>
                  </div>

                </div>

                {/* Micro indicators */}
                <div className="pt-8 mt-6 border-t border-white/[0.05] flex items-center justify-between text-[8px] font-mono text-neutral-500">
                  <span>MITIGATION FRAMEWORK PROTOCOL_0{selectedChallenge + 1}</span>
                  <span className="text-emerald-400 font-bold">[ B2B VERIFIED SYSTEMS ]</span>
                </div>
              </LiquidGlassCard>
            </div>

          </div>
        </section>

        {/* =======================================
            SECTION C: THE SIX PILLARS OF TRUST
            ======================================= */}
          <section className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.01] blur-[150px] pointer-events-none" />
            
            <div className="max-w-3xl mb-16 space-y-3">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] font-extrabold text-emerald-400 block">
                CORE SYSTEM EXCELLENCE
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Why Businesses Choose B2B Peps
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-2xl">
                We design our corporate operations around predictability and quality control. Select any of our six primary trust pillars to inspect deeper technical parameters.
              </p>
            </div>

            {/* Split Pillar Selector Layout: Left pills lists, Right detail focus panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Pillars lists */}
              <div className="lg:col-span-4 space-y-3">
                {trustPillars.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePillar(idx)}
                    className={`w-full text-left p-5 rounded-[20px] border transition-all duration-300 cursor-pointer flex gap-4 items-start ${activePillar === idx ? 'bg-neutral-900/90 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.03)]' : 'bg-neutral-900/10 border-white/[0.04] hover:bg-neutral-900/30'}`}
                  >
                    <div className={`h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${activePillar === idx ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-neutral-950/80 border-white/5 text-neutral-400'}`}>
                      {p.icon}
                    </div>
                    
                    <div className="space-y-1">
                      <div className={`font-sans text-xs font-semibold ${activePillar === idx ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                        {p.title}
                      </div>
                      <div className="font-mono text-[8px] text-neutral-500 uppercase tracking-wider">
                        {p.tagline}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progressive Reveal Detail panel */}
              <div className="lg:col-span-8">
                <LiquidGlassCard className="p-8 md:p-10 space-y-8" accentColor="rgba(52, 211, 153, 0.12)">
                  
                  {/* Heading */}
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.2em] font-extrabold flex items-center gap-1.5">
                      <Award className="h-4 w-4" />
                      <span>TRUST PILLAR_0{activePillar + 1}</span>
                    </span>
                    <h3 className="font-sans text-xl font-semibold text-white tracking-tight">
                      {trustPillars[activePillar].title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {trustPillars[activePillar].shortDesc}
                    </p>
                  </div>

                  {/* Spec list representing clinical parameters */}
                  <div className="space-y-4 pt-6 border-t border-white/[0.05]">
                    <span className="font-mono text-[8.5px] text-neutral-500 uppercase tracking-widest font-extrabold block">
                      VERIFIABLE OPERATIONAL PARAMETERS
                    </span>
                    
                    <div className="grid grid-cols-1 gap-3.5">
                      {trustPillars[activePillar].detailedSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3 text-xs text-neutral-300 font-light">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer safety callout */}
                  <div className="bg-neutral-950/40 p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-wider">
                        STANDARD_AUDITING_INTEGRITY
                      </span>
                    </div>
                    <button 
                      onClick={onContactClick}
                      className="font-mono text-[8px] text-emerald-400 hover:text-white uppercase tracking-widest font-extrabold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inquire regarding this pillar</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                </LiquidGlassCard>
              </div>

            </div>
          </section>

        {/* =======================================
            SECTION D: OUR COMMERCIAL SERVICES (Clean grid layout)
            ======================================= */}
        <section className="relative bg-neutral-950/20 py-20 border-y border-white/[0.03] -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-3xl mb-16 space-y-3">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] font-extrabold text-emerald-400 block">
                B2B SERVICE MATRIX
              </span>
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-white">
                Our Commercial Services
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
                B2B Peps delivers fully integrated supply architectures, streamlining raw synthesis down to final bespoke packaging and global shipping pipelines.
              </p>
            </div>

            {/* Premium clean Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercialServices.map((srv, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredService(idx)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <LiquidGlassCard 
                    className={`h-76 p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]`}
                    accentColor={hoveredService === idx ? "rgba(16, 185, 129, 0.12)" : "rgba(255,255,255,0.01)"}
                  >
                    <div className="space-y-4">
                      {/* Header row */}
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[8.5px] bg-neutral-950/85 border border-white/5 px-2.5 py-1 rounded-full text-neutral-400 font-bold uppercase">
                          {srv.badge}
                        </span>
                        <span className="font-mono text-[9px] text-neutral-500 font-extrabold">0{idx + 1}</span>
                      </div>

                      <h3 className="font-sans text-base font-semibold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                        {srv.title}
                      </h3>
                      
                      <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase tracking-wide">
                        {srv.metrics}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </LiquidGlassCard>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =======================================
            SECTION E: STICKY STORYTELLING DETAIL
            ======================================= */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left description */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] font-extrabold text-emerald-400 block">
                PARTNERSHIP INTEGRITY
              </span>
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-white leading-tight">
                Built Around Long-Term Partnerships
              </h2>
              
              <div className="space-y-4 max-w-xl">
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  Every business has different sourcing requirements, growth objectives, and operational challenges.
                </p>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  Rather than offering a one-size-fits-all approach, we work collaboratively with our partners to develop supply solutions that support both immediate needs and long-term commercial success.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-900/20 border border-white/5 rounded-2xl">
                  <div className="font-mono text-[9px] text-emerald-400 font-extrabold mb-1">REACTIVE RESPONSE</div>
                  <p className="font-sans text-[11px] text-neutral-400">Guaranteed response timeline within 2 business hours for all established commercial accounts.</p>
                </div>
                <div className="p-4 bg-neutral-900/20 border border-white/5 rounded-2xl">
                  <div className="font-mono text-[9px] text-emerald-400 font-extrabold mb-1">RESERVED REACTOR CYCLES</div>
                  <p className="font-sans text-[11px] text-neutral-400">Commit to locked schedules, ensuring dedicated lab reactor cycle reservations during tight periods.</p>
                </div>
              </div>
            </div>

            {/* Right Graphic/Illustration representing molecular bond synthesis */}
            <div className="lg:col-span-6">
              <div className="relative border border-white/[0.05] bg-neutral-900/10 p-8 rounded-[32px] overflow-hidden backdrop-blur-md">
                
                {/* Simulated Scientific UI */}
                <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-[7px] font-mono text-neutral-500">
                  <span>SYSTEM: SOLID_PHASE_REACTOR_SYNTHESIS</span>
                  <span>VERSION 4.2.0</span>
                </div>

                <div className="aspect-[16/10] bg-neutral-950 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden mt-6">
                  
                  {/* Dynamic grid mesh lines */}
                  <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

                  {/* Circular particle animation container */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Ring 1 */}
                    <div className="absolute h-36 w-36 rounded-full border border-dashed border-emerald-500/20 animate-spin-slow" />
                    {/* Ring 2 */}
                    <div className="absolute h-24 w-24 rounded-full border border-teal-500/10 animate-spin-reverse" />
                    
                    {/* Core Molecular representation */}
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-[10px] font-mono font-bold text-white z-10 animate-pulse">
                      H-H
                    </div>

                    {/* Orbiting Satellite particles */}
                    <div className="absolute top-1/4 left-1/4 h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
                    <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-white animate-pulse" />
                  </div>

                </div>

                <div className="mt-4 flex justify-between items-center text-[8.5px] font-mono text-neutral-500">
                  <span>VERIFICATION: LC-MS BASELINE PURE</span>
                  <span className="text-emerald-400 font-bold">STABILITY ASSURED</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =======================================
            SECTION F: CTA Frost Box
            ======================================= */}
        <section className="relative">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />
          
          <div className="border border-white/[0.04] bg-gradient-to-br from-neutral-900/30 via-neutral-950/20 to-neutral-900/30 backdrop-blur-2xl rounded-[40px] p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
            
            {/* Outer mesh accent glow */}
            <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-400/[0.04] blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] font-extrabold text-emerald-400 block">
                INITIATE THE ALLIANCE
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance leading-tight">
                Let's Build Your Peptide Programme Together
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                Whether you're launching a new product range, expanding your portfolio, or strengthening your existing supply chain, we're here to support your next stage of growth.
              </p>
            </div>

            {/* Strategic Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
              <button
                onClick={handleNavigateToProducts}
                className="w-full sm:w-auto rounded-full bg-emerald-400 hover:bg-emerald-500 text-neutral-950 font-mono text-[9px] uppercase tracking-widest font-extrabold py-4 px-8 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Request Product Catalogue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onContactClick}
                className="w-full sm:w-auto rounded-full border border-white/10 hover:border-emerald-400/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 font-mono text-[9px] uppercase tracking-widest font-bold transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              >
                Speak With Our Team
              </button>
            </div>

            <div className="pt-6 font-mono text-[8px] text-neutral-500 tracking-wider">
              B2B PEPS SYSTEM STANDARDS • ISO-9001 QUALITY ASSURED • GLOBAL COURIER SECURED
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
