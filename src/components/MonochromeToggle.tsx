import { Contrast } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface MonochromeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function MonochromeToggle({ className = "", showLabel = true }: MonochromeToggleProps) {
  const { isMonochrome, toggleMonochrome, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleMonochrome}
      type="button"
      aria-label={isMonochrome ? "Disable Monochrome Mode" : "Enable Monochrome Mode"}
      title={isMonochrome ? "Switch to Full Color" : "Switch to Monochrome Mode"}
      id="monochrome-toggle-btn"
      className={`group relative flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-xl select-none ${
        isMonochrome
          ? "bg-slate-900 border border-slate-400 text-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          : isDark
            ? "bg-neutral-900/80 border border-white/15 text-neutral-300 hover:border-white/40 hover:bg-neutral-800/90 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            : "bg-white/85 border border-slate-300 text-slate-700 hover:border-slate-500 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      } ${className}`}
    >
      {/* Background glow pill animation */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isMonochrome
            ? "bg-white/10 opacity-100"
            : "bg-neutral-500/10 opacity-0 group-hover:opacity-100"
        }`}
      />

      {/* Icon */}
      <div className="relative flex h-4.5 w-4.5 items-center justify-center">
        <Contrast
          className={`h-3.5 w-3.5 transition-transform duration-500 ${
            isMonochrome
              ? "rotate-180 text-white"
              : isDark
                ? "text-neutral-400 group-hover:text-white"
                : "text-slate-600 group-hover:text-slate-900"
          }`}
          strokeWidth={2}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <span className="relative z-10 font-mono text-[9px] font-extrabold tracking-widest uppercase">
          {isMonochrome ? "Mono ON" : "Monochrome"}
        </span>
      )}

      {/* Active Indicator Dot */}
      <span
        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
          isMonochrome
            ? "bg-white shadow-[0_0_8px_#ffffff]"
            : "bg-neutral-500/40 group-hover:bg-neutral-400"
        }`}
      />
    </button>
  );
}
