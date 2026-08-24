/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Activity, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onNavClick: (pageId: string) => void;
  activePage: string;
}

export default function Header({ onNavClick, activePage }: HeaderProps) {
  const { theme } = useTheme();
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
    { id: "products", label: "Products" },
    { id: "about", label: "About" },
    { id: "why-partner", label: "Partner" },
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

        {/* Desktop Nav */}
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
                  className={`relative px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                    isDark 
                      ? isActive ? "text-white font-bold" : "text-neutral-400 hover:text-white"
                      : isActive ? "text-slate-900 font-bold" : "text-slate-600 hover:text-slate-900"
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
                      className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full ${isDark ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-teal-600 shadow-[0_0_8px_rgba(13,148,136,0.5)]"}`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
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

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <button
                  onClick={() => handleItemClick("contact")}
                  className={`w-full flex items-center justify-center gap-2 rounded-full py-4 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg min-h-[48px] cursor-pointer ${
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
