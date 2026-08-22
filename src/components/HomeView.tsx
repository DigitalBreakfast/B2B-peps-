/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import HeroSection from "./HeroSection";
import ResearchDirectory from "./ResearchDirectory";
import WhyPartnerSection from "./WhyPartnerSection";
import { useTheme } from "../context/ThemeContext";

interface HomeViewProps {
  onNavigate: (pageId: string, filterCategory?: string) => void;
  onSelectProduct: (peptideId: string) => void;
}

export default function HomeView({ onNavigate, onSelectProduct: _onSelectProduct }: HomeViewProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div 
      className={`min-h-screen w-full transition-colors duration-500 ${
        isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Section 01: Rebuilt Futuristic Biotechnology Hero Section */}
      <HeroSection onNavigate={onNavigate} theme={theme} />

      {/* Section 02: Research Directory */}
      <ResearchDirectory onNavigate={onNavigate} theme={theme} />

      {/* Section 03: Why Leading Businesses Partner With B2B Peps */}
      <WhyPartnerSection onNavigate={onNavigate} theme={theme} />
    </div>
  );
}

