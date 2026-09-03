/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Menu, X, Activity, ChevronRight, ChevronDown, 
  FlaskConical, Handshake, Users, ShieldCheck, 
  Layers, Mail, MessageCircle, Send, ShieldAlert,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onNavClick: (pageId: string, filterCategory?: string) => void;
  activePage: string;
}

export default function Header({ onNavClick, activePage }: HeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Touch coordinates for swipe-to-close gesture
  const touchStartXRef = useRef<number>(0);
  const touchCurrentXRef = useRef<number>(0);

  // Desktop Navigation Items
  const desktopNavItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "about", label: "About" },
    { id: "why-partner", label: "Partner" },
    { id: "contact", label: "Contact" },
  ];

  // Mobile Products Accordion Categories
  const productCategories = [
    { name: "Weight Management & Metabolic", slug: "weight-management" },
    { name: "Recovery & Regeneration", slug: "recovery-regeneration" },
    { name: "Longevity & Cellular Health", slug: "longevity" },
    { name: "Growth Hormone & Performance", slug: "growth-hormone" },
    { name: "Cognitive Health & Neurobiology", slug: "cognitive-health" },
    { name: "Aesthetics, Skin & Hair", slug: "aesthetics" },
    { name: "Hormonal & Sexual Health", slug: "hormonal-health" },
    { name: "Research Support", slug: "research-support" },
  ];

  // Primary Mobile Navigation Links
  const mobileNavLinks = [
    { 
      id: "why-partner", 
      label: "Partner With Us", 
      icon: Handshake,
      badge: "B2B"
    },
    { 
      id: "about", 
      label: "About Us", 
      icon: Users 
    },
    { 
      id: "research-categories", 
      label: "Research Categories", 
      icon: Layers 
    },
    { 
      id: "contact", 
      label: "Contact", 
      icon: Mail 
    },
  ];

  // Scroll listener for desktop header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile drawer
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleItemClick = (id: string, filterCategory?: string) => {
    onNavClick(id, filterCategory);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (categorySlug: string) => {
    onNavClick(`research/${categorySlug}`);
    setMobileMenuOpen(false);
  };

  // Touch gesture handlers for swipe-right to close
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchCurrentXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchCurrentXRef.current - touchStartXRef.current;
    // If swiped right by more than 50px, close drawer
    if (deltaX > 50) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header 
        className="sticky top-0 z-40 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-500"
      >
        <div 
          className={`pointer-events-auto mx-auto flex w-full max-w-[1400px] xl:max-w-[1500px] 2xl:max-w-[1600px] items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border transition-all duration-500 shadow-2xl backdrop-blur-2xl ${
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
            className="group flex cursor-pointer items-center transition-all duration-300"
            id="brand-logo"
          >
            <img
              src="https://res.cloudinary.com/ds5s7shuo/image/upload/f_auto,q_auto,w_240/v1787945763/PEPES_logo_png_didjyy.png"
              alt="B2B Peps"
              width={180}
              height={36}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-8 sm:h-9 md:h-10 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <nav 
            className="hidden md:flex items-center space-x-1 relative" 
            onMouseLeave={() => setHoveredItem(null)}
          >
            {desktopNavItems.map((item) => {
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

          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-all cursor-pointer hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isDark 
                  ? "border-white/15 bg-neutral-900/80 text-neutral-200 hover:text-white hover:border-emerald-500/50 shadow-md" 
                  : "border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:border-teal-500/50 shadow-sm"
              }`}
              id="mobile-menu-btn"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          PREMIUM FULL-HEIGHT MOBILE SIDE DRAWER & BACKDROP
          ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 flex justify-end md:hidden pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* 1. Backdrop Fade Overlay (40-50% opacity, tap to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* 2. Side Drawer (85% width, max 380px, slide from right, rounded-l, swipe to close) */}
            <motion.div
              initial={{ x: "100%", scale: 0.98, opacity: 0.9 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              exit={{ x: "100%", scale: 0.98, opacity: 0.9 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`relative z-10 w-[85%] max-w-[380px] h-full flex flex-col justify-between rounded-l-3xl shadow-[-20px_0_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl border-l transition-colors duration-300 overflow-hidden ${
                isDark 
                  ? "bg-neutral-950/95 border-white/10 text-neutral-100" 
                  : "bg-white/95 border-slate-200 text-slate-900 shadow-[-10px_0_40px_rgba(0,0,0,0.15)]"
              }`}
              id="mobile-nav-drawer"
            >
              {/* DRAWER HEADER (Sticky at top, B2B Peps logo + Close X button min 44x44px) */}
              <div 
                className={`sticky top-0 z-20 flex items-center justify-between px-5 py-4 border-b backdrop-blur-xl shrink-0 ${
                  isDark ? "border-white/10 bg-neutral-950/80" : "border-slate-200/80 bg-white/80"
                }`}
              >
                {/* Logo & Home Click */}
                <div 
                  onClick={() => handleItemClick("home")}
                  className="flex items-center cursor-pointer group py-1"
                >
                  <img
                    src="https://res.cloudinary.com/ds5s7shuo/image/upload/v1787945763/PEPES_logo_png_didjyy.png"
                    alt="B2B Peps"
                    className="h-8 sm:h-9 w-auto max-w-[160px] object-contain transition-all duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Close Button (Min 44x44px touch target, always visible & accessible) */}
                <button
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all cursor-pointer hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isDark 
                      ? "border-white/15 bg-white/[0.06] hover:bg-white/15 text-neutral-300 hover:text-white" 
                      : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                  }`}
                  id="mobile-drawer-close-btn"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              {/* DRAWER SCROLLABLE NAVIGATION LINKS */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
                
                {/* 1. PRODUCTS EXPANDABLE ACCORDION */}
                <div className="rounded-2xl border transition-colors overflow-hidden border-white/5 bg-white/[0.02] dark:border-white/5 dark:bg-white/[0.02]">
                  {/* Products Header Button */}
                  <div
                    className={`flex items-center justify-between w-full min-h-[56px] px-4 py-3 rounded-2xl cursor-pointer select-none transition-all ${
                      activePage === "products"
                        ? isDark 
                          ? "bg-emerald-500/15 text-emerald-400 font-bold" 
                          : "bg-teal-50 text-teal-700 font-bold"
                        : isDark
                          ? "text-neutral-200 hover:bg-white/[0.06] active:bg-white/10"
                          : "text-slate-800 hover:bg-slate-100 active:bg-slate-200/70"
                    }`}
                    onClick={() => setProductsExpanded(!productsExpanded)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                        activePage === "products"
                          ? isDark ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-400" : "border-teal-500/40 bg-teal-100 text-teal-700"
                          : isDark ? "border-white/10 bg-white/[0.04] text-neutral-400" : "border-slate-200 bg-slate-100 text-slate-600"
                      }`}>
                        <FlaskConical className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                      <span className="font-sans text-sm font-semibold tracking-wide">
                        Products
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: productsExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex items-center justify-center"
                      >
                        <ChevronDown className={`h-4.5 w-4.5 ${
                          productsExpanded ? (isDark ? "text-emerald-400" : "text-teal-600") : "opacity-50"
                        }`} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Products Accordion Content */}
                  <AnimatePresence initial={false}>
                    {productsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={`px-2 pb-2 pt-1 space-y-1 border-t ${
                          isDark ? "border-white/10 bg-neutral-900/40" : "border-slate-200/70 bg-slate-50/70"
                        }`}>
                          {/* View All Products button */}
                          <button
                            onClick={() => handleItemClick("products")}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold min-h-[44px] transition-all cursor-pointer ${
                              activePage === "products"
                                ? isDark
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-teal-100 text-teal-900 border border-teal-500/30"
                                : isDark
                                  ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                  : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              <span>View All Categories</span>
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                              08 DISCIPLINES
                            </span>
                          </button>

                          {productCategories.map((cat, idx) => {
                            const isCatActive = activePage === `research/${cat.slug}`;
                            return (
                              <button
                                key={idx}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-medium min-h-[44px] transition-all cursor-pointer ${
                                  isCatActive 
                                    ? isDark
                                      ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30" 
                                      : "bg-teal-50 text-teal-800 font-semibold border border-teal-500/30"
                                    : isDark
                                      ? "text-neutral-300 hover:text-white hover:bg-white/[0.06] active:bg-white/10"
                                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 active:bg-slate-200"
                                }`}
                              >
                                <span className="flex items-center gap-2.5">
                                  <span className={`h-1.5 w-1.5 rounded-full ${
                                    isCatActive 
                                      ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" 
                                      : isDark ? "bg-white/30" : "bg-slate-400"
                                  }`} />
                                  <span>{cat.name}</span>
                                </span>
                                <ArrowRight className={`h-3.5 w-3.5 transition-all ${
                                  isCatActive ? "text-emerald-400 opacity-100" : "opacity-30 group-hover:opacity-100"
                                }`} />
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2-6. PRIMARY VERTICAL NAVIGATION LINKS */}
                {mobileNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activePage === link.id;

                  return (
                    <button
                      key={link.id}
                      onClick={() => handleItemClick(link.id)}
                      className={`w-full flex items-center justify-between min-h-[56px] px-4 py-3 rounded-2xl cursor-pointer select-none transition-all text-left group ${
                        isActive
                          ? isDark 
                            ? "bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.1)]" 
                            : "bg-teal-50 text-teal-700 font-bold border border-teal-500/30 shadow-xs"
                          : isDark
                            ? "text-neutral-200 hover:bg-white/[0.06] active:bg-white/10 border border-transparent"
                            : "text-slate-800 hover:bg-slate-100 active:bg-slate-200/70 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-colors ${
                          isActive
                            ? isDark ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-400" : "border-teal-500/40 bg-teal-100 text-teal-700"
                            : isDark ? "border-white/10 bg-white/[0.04] text-neutral-400 group-hover:text-neutral-200" : "border-slate-200 bg-slate-100 text-slate-600 group-hover:text-slate-900"
                        }`}>
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </div>
                        <span className="font-sans text-sm font-semibold tracking-wide">
                          {link.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {link.badge && (
                          <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            isActive
                              ? isDark ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-300" : "border-teal-500/50 bg-teal-100 text-teal-800"
                              : isDark ? "border-white/15 bg-white/[0.05] text-neutral-400" : "border-slate-300 bg-slate-100 text-slate-600"
                          }`}>
                            {link.badge}
                          </span>
                        )}
                        <ChevronRight className={`h-4.5 w-4.5 transition-transform ${
                          isActive 
                            ? isDark ? "text-emerald-400" : "text-teal-600" 
                            : "opacity-40 group-hover:translate-x-0.5 group-hover:opacity-80"
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* DRAWER BOTTOM AREA (Divider, Research Use Only, Equal Contact Buttons) */}
              <div 
                className={`sticky bottom-0 z-20 px-5 py-4 border-t backdrop-blur-xl shrink-0 space-y-3 ${
                  isDark ? "border-white/10 bg-neutral-950/90" : "border-slate-200/90 bg-white/90"
                }`}
              >
                {/* Research Use Only Compliance Banner */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-500 dark:text-emerald-400">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                    <span>Research Use Only</span>
                  </div>
                  <span className={`font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                    isDark ? "border-white/10 text-neutral-400 bg-white/[0.04]" : "border-slate-200 text-slate-500 bg-slate-100"
                  }`}>
                    Enterprise B2B
                  </span>
                </div>

                {/* Contact Buttons: Email, WhatsApp, Telegram (Equally sized and aligned) */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Email */}
                  <a
                    href="mailto:info@b2bpeps.com"
                    aria-label="Send email to info@b2bpeps.com"
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isDark
                        ? "border-white/10 bg-white/[0.05] hover:bg-white/10 text-neutral-200 hover:text-white hover:border-emerald-500/30"
                        : "border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-xs hover:border-teal-500/40"
                    }`}
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span>Email</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/447414219888"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Contact via WhatsApp +44 7414 219888"
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isDark
                        ? "border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 hover:border-emerald-400/50"
                        : "border-teal-300 bg-teal-50/80 hover:bg-teal-100 text-teal-800 shadow-xs"
                    }`}
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/b2bpeps"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Contact via Telegram"
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isDark
                        ? "border-sky-500/30 bg-sky-950/20 hover:bg-sky-950/40 text-sky-300 hover:border-sky-400/50"
                        : "border-sky-300 bg-sky-50/80 hover:bg-sky-100 text-sky-800 shadow-xs"
                    }`}
                  >
                    <Send className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
