/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import HeroSection from "./HeroSection";
import LazySection from "./LazySection";
import { useTheme } from "../context/ThemeContext";
import { lazyWithRetry, ChunkErrorBoundary } from "../lib/lazyWithRetry.tsx";

// Code-split heavy below-the-fold sections with automated retry on deployment changes
const WhyPartnerSection = lazyWithRetry(() => import("./WhyPartnerSection"));
const VideoDivider = lazyWithRetry(() => import("./VideoDivider"));
const ResearchDirectory = lazyWithRetry(() => import("./ResearchDirectory"));

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
      {/* Section 01: Above-the-fold Biotechnology Hero Section */}
      <HeroSection onNavigate={onNavigate} theme={theme} />

      {/* Section 02: Why Leading Businesses Partner With B2B Peps (Lazy loaded below the fold) */}
      <LazySection minHeight="450px" rootMargin="350px">
        <ChunkErrorBoundary>
          <Suspense fallback={<div className="min-h-[450px]" />}>
            <WhyPartnerSection onNavigate={onNavigate} theme={theme} />
          </Suspense>
        </ChunkErrorBoundary>
      </LazySection>

      {/* Video Divider: Continuous Automated Production Line Ribbon (Lazy loaded) */}
      <LazySection minHeight="180px" rootMargin="300px">
        <ChunkErrorBoundary>
          <Suspense fallback={<div className="min-h-[180px]" />}>
            <VideoDivider />
          </Suspense>
        </ChunkErrorBoundary>
      </LazySection>

      {/* Section 03: Research Directory (Placed directly above the footer, lazy loaded) */}
      <LazySection minHeight="600px" rootMargin="350px">
        <ChunkErrorBoundary>
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <ResearchDirectory onNavigate={onNavigate} theme={theme} />
          </Suspense>
        </ChunkErrorBoundary>
      </LazySection>
    </div>
  );
}

