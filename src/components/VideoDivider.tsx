/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useTheme } from "../context/ThemeContext";

interface VideoDividerProps {
  className?: string;
}

export default function VideoDivider({ className = "" }: VideoDividerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      aria-label="Vial Packaging & Distribution"
      className={`relative w-full overflow-hidden border-y transition-colors duration-500 ${
        isDark ? "border-white/10 bg-neutral-950" : "border-slate-200/90 bg-slate-100"
      } ${className}`}
    >
      {/* Video Container Ribbon: Full Width, Sleek Minimal Aspect Ratio */}
      <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden flex items-center justify-center">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02] filter contrast-[1.08] brightness-[0.92] dark:brightness-[0.85]"
          src="https://res.cloudinary.com/ds5s7shuo/video/upload/v1787599833/Bottles_rolling_continuously_202608250059_axlvby.mp4"
        />

        {/* Subtle Top & Bottom Seamless Edge Vignette Gradient */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-black/45 z-10" 
        />

        {/* Subtle Side Fade Gradients */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/25 via-transparent to-black/25 z-10" 
        />

      </div>
    </section>
  );
}
