/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Activity, ChevronRight, Sparkles, FileText, Contrast } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import MonochromeToggle from "./MonochromeToggle";

interface HeaderProps {
  onNavClick: (pageId: string) => void;
  activePage: string;
}

export default function Header({ onNavClick, activePage }: HeaderProps) {
  const { theme, isMonochrome, toggleMonochrome } = useTheme();
  const isDark = theme === "dark";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "services", label: "Services" },
    { id: "quality", label: "Quality" },
    { id: "science", label: "Resources" },
    { id: "contact", label: "Contact" },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-500"
    >
      <div 
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border transition-all duration-500 shadow-2xl backdrop-blur-2xl ${
          isDark 
            ? scrolled
              ? "border-emerald-500/20 bg-neutral-950/85 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
              : "border-white/10 bg-neutral-900/60 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            : scrolled
              ? "border-teal-600/20 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              : "border-slate-200/80 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* Logo */}
        <div 
          onClick={() => handleItemClick("home")}
          className="group flex cursor-pointer items-center space-x-3"
          id="brand-logo"
        >
          <div className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
            isDark 
              ? "border-white/10 bg-neutral-900/50 group-hover:border-emerald-500/40 group-hover:bg-neutral-900/80" 
              : "border-slate-300 bg-slate-100/80 group-hover:border-teal-500/40 group-hover:bg-white"
          }`}>
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${isDark ? "bg-emerald-500/20" : "bg-teal-500/20"}`} />
            <Activity className={`relative h-4.5 w-4.5 transition-all duration-500 group-hover:scale-110 ${
              isDark ? "text-neutral-300 group-hover:text-emerald-400" : "text-slate-700 group-hover:text-teal-600"
            }`} strokeWidth={1.5} />
          </div>
          <div>
            <span className={`font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              B2B <span className={isDark ? "text-emerald-400 font-light" : "text-teal-600 font-light"}>Peps</span>
            </span>
            <div className={`h-[1px] w-0 transition-all duration-500 group-hover:w-full ${isDark ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-teal-600 to-emerald-600"}`} />
          </div>
        </div>

        {/* Desktop Nav with Mega Menu Container */}
        <nav 
          className="hidden md:flex items-center space-x-1 relative" 
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <div key={item.id} className="relative group/nav">
                <button
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full font-sans text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                    isDark 
                      ? isActive ? "text-white" : "text-neutral-400 hover:text-white"
                      : isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {hoveredItem === item.id && (
                    <motion.span
                      layoutId="navHoverBg"
                      className={`absolute inset-0 rounded-full ${
                        isDark 
                          ? "bg-white/10 border border-white/10" 
                          : "bg-slate-200/80 border border-slate-300/50"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full ${isDark ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-teal-600 shadow-[0_0_8px_rgba(13,148,136,0.5)]"}`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>

                {/* Futuristic Mega Menu Dropdown */}
                {hoveredItem === item.id && item.id === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] p-5 rounded-3xl border shadow-2xl backdrop-blur-3xl z-50 pointer-events-auto ${
                      isDark 
                        ? "bg-neutral-950/95 border-emerald-500/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)]" 
                        : "bg-white/95 border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <span className={`font-mono text-[9px] uppercase tracking-widest font-bold ${isDark ? "text-emerald-400" : "text-teal-700"}`}>
                        Flagship Research Directory
                      </span>
                      <span className="font-mono text-[9px] text-neutral-500">6 Core Categories</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { title: "Weight Management", code: "AP-3304 Derivative", desc: "Metabolic study reference" },
                        { title: "Longevity", code: "AP-8820 Epitalon", desc: "Cellular senescence delay" },
                        { title: "Recovery", code: "AP-1571 BPC-157", desc: "Cellular matrix repair" },
                        { title: "Aesthetics", code: "AP-4071 GHK-Cu", desc: "Collagen synthesis research" },
                        { title: "Hormone", code: "AP-5510 Ipamorelin", desc: "Endocrine modulators" },
                        { title: "Cognitive", code: "AP-7022 Selank", desc: "Neuroprotective agents" },
                      ].map((cat, i) => (
                        <div
                          key={i}
                          onClick={() => handleItemClick("products")}
                          className={`p-2.5 rounded-2xl border transition-all cursor-pointer group/cat ${
                            isDark 
                              ? "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-emerald-500/30" 
                              : "border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-teal-500/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className={`font-sans text-[11px] font-semibold group-hover/cat:text-emerald-400 transition-colors ${isDark ? "text-neutral-200" : "text-slate-800"}`}>
                              {cat.title}
                            </span>
                            <span className="font-mono text-[8px] text-neutral-500">{cat.code}</span>
                          </div>
                          <p className="font-sans text-[9.5px] text-neutral-400 line-clamp-1">{cat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {hoveredItem === item.id && item.id === "quality" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-4 rounded-3xl border shadow-2xl backdrop-blur-3xl z-50 pointer-events-auto ${
                      isDark 
                        ? "bg-neutral-950/95 border-emerald-500/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)]" 
                        : "bg-white/95 border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className={`font-sans text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Analytical Quality</h4>
                        <p className="font-sans text-[10px] text-neutral-400">HPLC, LC-MS & Batch Verification</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right CTAs & Theme Switcher */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <MonochromeToggle />

          <button 
            onClick={() => handleItemClick("quality")}
            className={`group flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
              isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className={`h-3 w-3 group-hover:rotate-12 transition-transform duration-300 ${isDark ? "text-emerald-400" : "text-teal-600"}`} />
            <span>Verify CoA</span>
          </button>
          
          <button
            onClick={() => handleItemClick("contact")}
            className={`relative overflow-hidden rounded-full border px-5 py-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer shadow-lg ${
              isDark
                ? "border-emerald-400/30 bg-emerald-500/15 hover:bg-emerald-400 hover:text-neutral-950 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                : "border-teal-600/30 bg-teal-600/10 hover:bg-teal-600 hover:text-white text-teal-700 shadow-[0_0_20px_rgba(13,148,136,0.15)]"
            }`}
          >
            <span>Portal</span>
          </button>
        </div>

        {/* Mobile Menu Button & Mobile Theme/Monochrome Toggles */}
        <div className="flex items-center gap-2 md:hidden">
          <MonochromeToggle showLabel={false} />
          <ThemeToggle showLabel={false} />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              isDark 
                ? "border-white/10 bg-neutral-900/60 text-neutral-400 hover:text-white" 
                : "border-slate-300 bg-white text-slate-700 hover:text-slate-900"
            }`}
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" strokeWidth={1.5} /> : <Menu className="h-4.5 w-4.5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Full-Screen Glass Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 flex flex-col justify-start pt-24 pb-12 px-6 sm:px-8 overflow-y-auto no-scrollbar md:hidden ${
              isDark ? "bg-neutral-950/95" : "bg-slate-50/98"
            }`}
            id="mobile-nav-panel"
          >
            <div className="flex flex-col space-y-5 max-w-sm mx-auto w-full my-auto">
              {/* Mobile Theme & Monochrome Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className={`font-mono text-xs uppercase tracking-widest ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                  Display Modes
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <MonochromeToggle />
                </div>
              </div>

              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.03 + 0.05, type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center justify-between text-left font-sans text-lg sm:text-xl font-bold tracking-wider uppercase group py-3 border-b cursor-pointer min-h-[48px] ${
                    isDark
                      ? activePage === item.id ? "text-emerald-400 border-emerald-500/30" : "text-neutral-300 border-white/5 hover:text-white"
                      : activePage === item.id ? "text-teal-600 border-teal-500/30" : "text-slate-700 border-slate-200 hover:text-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`h-5 w-5 ${activePage === item.id ? (isDark ? "text-emerald-400 opacity-100" : "text-teal-600 opacity-100") : "opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"}`} strokeWidth={2} />
                </motion.button>
              ))}
              
              <div className={`h-[1px] pt-1 ${isDark ? "bg-white/5" : "bg-slate-200"}`} />

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-3 pt-2"
              >
                <button
                  onClick={toggleMonochrome}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-full border font-sans text-xs font-bold uppercase tracking-wider transition-all min-h-[48px] cursor-pointer ${
                    isMonochrome
                      ? "bg-black text-white border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : isDark
                        ? "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
                        : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Contrast className={`h-4 w-4 ${isMonochrome ? "text-white rotate-180" : isDark ? "text-emerald-400" : "text-teal-600"}`} />
                    <span>Monochrome Mode</span>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${isMonochrome ? "bg-white text-black font-extrabold" : "bg-neutral-800/60 text-neutral-400"}`}>
                    {isMonochrome ? "ON" : "OFF"}
                  </span>
                </button>

                <button
                  onClick={() => handleItemClick("quality")}
                  className={`flex items-center justify-center gap-2.5 rounded-full border py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors min-h-[48px] cursor-pointer ${
                    isDark 
                      ? "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10" 
                      : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm"
                  }`}
                >
                  <FileText className={`h-4.5 w-4.5 ${isDark ? "text-emerald-400" : "text-teal-600"}`} />
                  <span>Verify CoA Docs</span>
                </button>
                
                <button
                  onClick={() => handleItemClick("contact")}
                  className={`flex items-center justify-center gap-2 rounded-full py-4 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg min-h-[48px] cursor-pointer ${
                    isDark 
                      ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_4px_20px_rgba(52,211,153,0.3)]" 
                      : "bg-teal-600 hover:bg-teal-700 text-white shadow-[0_4px_20px_rgba(13,148,136,0.3)]"
                  }`}
                >
                  <span>Request Partnership</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
