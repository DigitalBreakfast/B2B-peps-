/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { PEPTIDES_CATALOG, generateHPLCData } from "../data";
import { Peptide, BatchCoA, HPLCDataPoint } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileCheck, ShieldAlert, Award, FileText, Download, 
  ExternalLink, CheckCircle, RefreshCw, ZoomIn, HelpCircle 
} from "lucide-react";

interface QualityConsoleProps {
  preselectedPeptideId: string | null;
}

export default function QualityConsole({ preselectedPeptideId }: QualityConsoleProps) {
  const [selectedPeptideId, setSelectedPeptideId] = useState<string>("AP-3304");
  const [activeTab, setActiveTab] = useState<"hplc" | "ms" | "specs">("hplc");
  const [hoveredPoint, setHoveredPoint] = useState<HPLCDataPoint | null>(null);
  const [exporting, setExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync state if a peptide is selected from the catalog
  useEffect(() => {
    if (preselectedPeptideId) {
      setSelectedPeptideId(preselectedPeptideId);
      const section = document.getElementById("quality");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [preselectedPeptideId]);

  const peptide = PEPTIDES_CATALOG.find(p => p.id === selectedPeptideId) || PEPTIDES_CATALOG[0];

  // Derive realistic batch information based on peptide
  const batchId = `BCH-${peptide.id}-9904X`;
  const manufactureDate = "May 12, 2026";
  const expiryDate = "May 11, 2029";
  const purityValue = parseFloat(peptide.purity.match(/\d+\.\d+/)?.[0] || "99.45");

  const hplcData = generateHPLCData(peptide.id, purityValue);

  // Find the highest peak to highlight as main peptide peak
  const maxPoint = hplcData.reduce((prev, current) => (prev.intensity > current.intensity) ? current : prev, hplcData[0]);

  // Handle drawing of HPLC interactive graph on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-DPI scaling for crisp graphics
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 30, right: 30, bottom: 40, left: 55 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Data min/max limits
    const minX = 0;
    const maxX = 10; // 10 minutes
    const minY = 0;
    const maxY = 1100; // max mAU

    const getXPixel = (val: number) => padding.left + ((val - minX) / (maxX - minX)) * chartWidth;
    const getYPixel = (val: number) => padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;

    // 1. Draw Grid lines and Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(163, 163, 163, 0.5)";
    ctx.font = "10px monospace";

    // X axis divisions (minutes)
    for (let t = 0; t <= 10; t += 2) {
      const xp = getXPixel(t);
      ctx.beginPath();
      ctx.moveTo(xp, padding.top);
      ctx.lineTo(xp, padding.top + chartHeight);
      ctx.stroke();

      ctx.fillText(`${t}m`, xp - 8, padding.top + chartHeight + 16);
    }

    // Y axis divisions (mAU intensity)
    for (let intensity = 0; intensity <= 1000; intensity += 200) {
      const yp = getYPixel(intensity);
      ctx.beginPath();
      ctx.moveTo(padding.left, yp);
      ctx.lineTo(padding.left + chartWidth, yp);
      ctx.stroke();

      ctx.fillText(`${intensity}`, padding.left - 36, yp + 4);
    }

    // Axis labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.save();
    ctx.translate(14, padding.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Intensity (mAU)", -40, 0);
    ctx.restore();

    ctx.fillText("Retention Time (Minutes)", padding.left + chartWidth / 2 - 60, padding.top + chartHeight + 34);

    // 2. Draw HPLC Peak Area Fill under curve
    ctx.fillStyle = "rgba(16, 185, 129, 0.05)";
    ctx.beginPath();
    ctx.moveTo(getXPixel(hplcData[0].time), getYPixel(0));
    for (let i = 0; i < hplcData.length; i++) {
      ctx.lineTo(getXPixel(hplcData[i].time), getYPixel(hplcData[i].intensity));
    }
    ctx.lineTo(getXPixel(hplcData[hplcData.length - 1].time), getYPixel(0));
    ctx.closePath();
    ctx.fill();

    // 3. Draw Chromatogram line
    ctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
    ctx.lineWidth = 1.8;
    ctx.shadowBlur = 4;
    ctx.shadowColor = "rgba(16, 185, 129, 0.2)";
    ctx.beginPath();
    ctx.moveTo(getXPixel(hplcData[0].time), getYPixel(hplcData[0].intensity));
    for (let i = 1; i < hplcData.length; i++) {
      ctx.lineTo(getXPixel(hplcData[i].time), getYPixel(hplcData[i].intensity));
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // 4. Label the main target peak
    const peakX = getXPixel(maxPoint.time);
    const peakY = getYPixel(maxPoint.intensity);
    
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(peakX, peakY);
    ctx.lineTo(peakX, padding.top + chartHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw circular indicator on top of main peak
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(peakX, peakY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText(`Main Peptide Peak (${purityValue.toFixed(2)}%)`, peakX + 10, peakY - 12);
    ctx.font = "9px monospace";
    ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
    ctx.fillText(`RT: ${maxPoint.time.toFixed(2)} min`, peakX + 10, peakY);

    // 5. Draw active tracking guide if hovered
    if (hoveredPoint) {
      const hoverX = getXPixel(hoveredPoint.time);
      const hoverY = getYPixel(hoveredPoint.intensity);

      // crosshair guide lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.setLineDash([2, 2]);
      
      // Vertical
      ctx.beginPath();
      ctx.moveTo(hoverX, padding.top);
      ctx.lineTo(hoverX, padding.top + chartHeight);
      ctx.stroke();

      // Horizontal
      ctx.beginPath();
      ctx.moveTo(padding.left, hoverY);
      ctx.lineTo(padding.left + chartWidth, hoverY);
      ctx.stroke();

      ctx.setLineDash([]);

      // Highlight point
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hoverX, hoverY, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Handle window resize for responsive canvas redraw
    const handleResize = () => {
      // Re-trigger draw
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedPeptideId, hoveredPoint, purityValue, maxPoint]);

  // Handle canvas mouse and touch tracking
  const updateHoverFromClientX = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    
    const padding = { left: 55, right: 30 };
    const chartWidth = rect.width - padding.left - padding.right;

    // Convert pixel position back to Time value
    const relativeX = (x - padding.left) / chartWidth;
    const targetTime = relativeX * 10; // total 10 min

    if (targetTime >= 0 && targetTime <= 10) {
      // Find closest data point
      const closest = hplcData.reduce((prev, curr) => {
        return Math.abs(curr.time - targetTime) < Math.abs(prev.time - targetTime) ? curr : prev;
      });
      setHoveredPoint(closest);
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    updateHoverFromClientX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      updateHoverFromClientX(e.touches[0].clientX);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const triggerExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setToastMessage(`Certificate of Analysis for Batch ${batchId} successfully compiled.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 2000);
  };

  return (
    <section id="quality" className="relative bg-neutral-950 py-24 border-t border-white/5">
      <div className="site-container">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-4">
          <div className="max-w-lg">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400">
              Analytical Verification
            </span>
            <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Integrity confirmed at the molecular level.
            </h2>
            <p className="mt-4 font-sans text-xs text-neutral-400 leading-relaxed font-light">
              An open-access testing registry. Sourcing agents can inspect real HPLC spectrum charts, mass spectrograms, and download authenticated certified documents.
            </p>
          </div>

          {/* Quick Stats card */}
          <div className="rounded-2xl border border-white/5 bg-neutral-900/10 p-5 shrink-0 flex items-center gap-4 backdrop-blur-sm">
            <FileCheck className="h-8 w-8 text-emerald-400" strokeWidth={1.2} />
            <div>
              <div className="font-mono text-[8px] tracking-wider text-neutral-500 uppercase">Registry Status</div>
              <div className="font-sans text-xs font-semibold text-white">1,248 Verified Batches</div>
              <p className="font-sans text-[9px] text-emerald-400 font-light">Fully USP & EP Compliant</p>
            </div>
          </div>
        </div>

        {/* Console Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="quality-workbench">
          
          {/* Left panel: Peptide Selector list */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Select Compound to Audit
            </h3>
            
            <div className="space-y-2 max-h-[480px] overflow-y-auto no-scrollbar pr-1">
              {PEPTIDES_CATALOG.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPeptideId(p.id);
                    setHoveredPoint(null);
                  }}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    selectedPeptideId === p.id
                      ? "border-emerald-500/20 bg-emerald-500/[0.03] text-white"
                      : "border-white/5 bg-neutral-900/10 text-neutral-400 hover:bg-neutral-900/30 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">{p.id}</span>
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold">{p.purity}</span>
                  </div>
                  <div className="font-sans text-sm font-semibold">{p.name}</div>
                  <div className="font-sans text-[11px] text-neutral-500 mt-1.5 truncate">{p.chemicalName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: Live Scientific Terminal Screen */}
          <div className="lg:col-span-8 flex flex-col rounded-2xl border border-white/10 bg-neutral-900/30 overflow-hidden relative backdrop-blur-md">
            
            {/* Terminal Header */}
            <div className="bg-neutral-900/60 px-6 py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 relative">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white">CoA Terminal // Active Session</span>
                </div>
                <div className="font-sans text-[11px] text-neutral-400 mt-0.5">
                  Auditing Batch: <span className="font-mono text-neutral-200">{batchId}</span>
                </div>
              </div>

              {/* Document verification tabs */}
              <div className="flex bg-neutral-950 p-1 rounded-full border border-white/5 overflow-x-auto no-scrollbar max-w-full shrink-0">
                <button
                  onClick={() => setActiveTab("hplc")}
                  className={`px-3 sm:px-4 py-1.5 rounded-full font-sans text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeTab === "hplc" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  HPLC Spectrum
                </button>
                <button
                  onClick={() => setActiveTab("ms")}
                  className={`px-3 sm:px-4 py-1.5 rounded-full font-sans text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeTab === "ms" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Mass Spec
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-3 sm:px-4 py-1.5 rounded-full font-sans text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeTab === "specs" ? "bg-white text-neutral-950" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Batch Metrics
                </button>
              </div>
            </div>

            {/* Terminal Content Screen */}
            <div className="p-6 flex-1 min-h-[350px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {activeTab === "hplc" && (
                  <motion.div
                    key="hplc-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    {/* HPLC Graph Canvas */}
                    <div className="relative bg-neutral-950/60 rounded-xl border border-white/5 p-4 flex-1 mb-4 flex flex-col">
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-neutral-900 border border-white/5 px-2.5 py-1 rounded font-mono text-[9px] text-neutral-400">
                        <ZoomIn className="h-3 w-3 text-emerald-400" strokeWidth={1.2} />
                        <span>Interactive hover audit enabled</span>
                      </div>
                      
                      <div className="flex-1 relative min-h-[220px]">
                        <canvas
                          ref={canvasRef}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          onTouchMove={handleTouchMove}
                          onTouchStart={handleTouchMove}
                          onTouchEnd={handleMouseLeave}
                          className="w-full h-full cursor-crosshair touch-none"
                        />
                      </div>

                      {/* Hover Info Tooltip overlay */}
                      <div className="h-8 flex items-center justify-between px-3 mt-1 text-[11px] font-mono border-t border-white/5 pt-3">
                        <span className="text-neutral-500">Live Reading:</span>
                        {hoveredPoint ? (
                          <span className="text-white flex gap-4">
                            <span>Time: <strong className="text-emerald-400">{hoveredPoint.time.toFixed(2)} min</strong></span>
                            <span>Intensity: <strong className="text-emerald-400">{hoveredPoint.intensity.toFixed(1)} mAU</strong></span>
                          </span>
                        ) : (
                          <span className="text-neutral-500 italic">Hover crosshair over line to audit spectral coordinates</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "ms" && (
                  <motion.div
                    key="ms-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    {/* Mass Spec Vector Representation */}
                    <div className="bg-neutral-950/60 rounded-xl border border-white/5 p-6 mb-4 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                        <div>
                          <div className="font-sans text-xs text-neutral-400">Instrument Class</div>
                          <div className="font-mono text-sm font-bold text-white">High-Resolution ESI-MS Analyzer</div>
                        </div>
                        <div className="font-mono text-[10px] text-right">
                          <span className="text-neutral-500">Target mass:</span>
                          <div className="text-emerald-400 font-bold">{peptide.molecularWeight.toFixed(2)} m/z</div>
                        </div>
                      </div>

                      {/* Spectrum representation */}
                      <div className="flex-1 min-h-[160px] relative border-b border-white/10 flex items-end justify-center px-12 mb-4">
                        <div className="absolute top-2 left-2 text-[10px] font-mono text-neutral-500">Relative Abundance (%)</div>
                        
                        {/* Spectrum Base Line */}
                        <div className="w-full h-[1px] bg-white/10 absolute bottom-0 left-0" />

                        {/* Minor Noise peaks */}
                        <div className="absolute left-[15%] bottom-0 w-[2px] h-[15%] bg-neutral-700" />
                        <div className="absolute left-[30%] bottom-0 w-[2px] h-[8%] bg-neutral-800" />
                        <div className="absolute left-[45%] bottom-0 w-[2px] h-[12%] bg-neutral-700" />

                        {/* Major Target Monoisotopic Mass Peak */}
                        <div className="absolute left-1/2 bottom-0 w-1 bg-emerald-500 h-[85%] -translate-x-1/2 flex flex-col justify-between items-center">
                          <div className="h-2 w-2 rounded-full bg-emerald-400 -mt-1 shadow shadow-emerald-500" />
                          <div className="font-mono text-[10px] text-emerald-400 font-bold bg-neutral-900 border border-emerald-500/20 px-2 py-0.5 rounded -mt-8 whitespace-nowrap">
                            [M+H]⁺ peak: {(peptide.molecularWeight + 1).toFixed(2)}
                          </div>
                        </div>

                        {/* Secondary Sodium adduct peak */}
                        <div className="absolute left-[72%] bottom-0 w-[2px] h-[18%] bg-teal-600">
                          <div className="font-mono text-[8px] text-teal-400 bg-neutral-900 px-1.5 py-0.5 rounded -mt-5 whitespace-nowrap">
                            [M+Na]⁺: {(peptide.molecularWeight + 23).toFixed(1)}
                          </div>
                        </div>
                        <div className="absolute left-[88%] bottom-0 w-[2px] h-[6%] bg-neutral-800" />
                      </div>

                      <div className="font-sans text-[11px] leading-relaxed text-neutral-400">
                        Mass confirmation confirms 100% molecular structure matches target sequence blueprint with zero observed high-molecular fragments or synthetic truncated chain polymers.
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "specs" && (
                  <motion.div
                    key="specs-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    {/* Batch specifications grid */}
                    <div className="bg-neutral-950/60 rounded-xl border border-white/5 p-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div className="space-y-4">
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Peptide Compound</div>
                          <div className="font-sans text-sm font-bold text-white">{peptide.name}</div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Assay Chromatography Method</div>
                          <div className="font-sans text-sm text-neutral-300">Isocratic & Gradient RP-HPLC Method AP-204</div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Manufacture / Validation Date</div>
                          <div className="font-sans text-sm text-neutral-300">{manufactureDate}</div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Validation Expiry</div>
                          <div className="font-sans text-sm text-neutral-300">{expiryDate}</div>
                        </div>
                      </div>

                      <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Tested Water Content (Karl-Fischer)</div>
                          <div className="font-sans text-sm text-neutral-300">2.14% (Standard: &lt;5.00%)</div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Residual Counter-Ion Salt</div>
                          <div className="font-sans text-sm text-neutral-300">1.82% Acetate / TFA Net</div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Sterility Clearance</div>
                          <div className="font-sans text-sm text-emerald-400 font-semibold flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4 shrink-0" />
                            <span>Passed Bioburden Limits (Class-100)</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] uppercase text-neutral-500">Regulatory Certifications</div>
                          <div className="font-sans text-xs text-neutral-300 flex flex-wrap gap-1 mt-1">
                            <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">USP-43</span>
                            <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">EP-10.0</span>
                            <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">GMP-Validated</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-emerald-400" strokeWidth={1.2} />
                  </div>
                  <div>
                    <div className="font-sans text-[11px] text-neutral-400 leading-none">Purity Validation Grade</div>
                    <div className="font-sans text-base font-bold text-white mt-1">
                      {purityValue.toFixed(2)}% Pure <span className="text-xs font-mono font-medium text-emerald-400">(B2BCertified)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={triggerExport}
                    disabled={exporting}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-200 disabled:bg-neutral-200/50 text-neutral-950 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    {exporting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" strokeWidth={1.2} />
                        <span>Compiling Audit Dossier...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" strokeWidth={1.2} />
                        <span>Compile CoA Dossier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Elegant floating notification toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 rounded-xl bg-neutral-900 border border-emerald-500/20 p-4 shadow-2xl max-w-sm flex items-start gap-3"
          >
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.2} />
            <div>
              <div className="font-sans text-xs font-bold text-white">System Document Delivery</div>
              <p className="font-sans text-[11px] text-neutral-400 mt-1">{toastMessage}</p>
              <div className="mt-2 text-[10px] font-mono text-emerald-400">PDF download triggered locally.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
