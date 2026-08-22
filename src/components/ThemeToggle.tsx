import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      id="theme-toggle-btn"
      className={`group relative flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-xl select-none ${
        isDark
          ? "bg-neutral-900/80 border border-white/15 text-neutral-200 hover:border-emerald-400/50 hover:bg-neutral-800/90 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          : "bg-white/85 border border-slate-300 text-slate-800 hover:border-teal-500/60 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_0_20px_rgba(13,148,136,0.18)]"
      } ${className}`}
    >
      {/* Background glow pill animation */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isDark
            ? "bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"
            : "bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100"
        }`}
      />

      {/* Morphing Icon Container */}
      <div className="relative flex h-4.5 w-4.5 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ y: -14, opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 14, opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute text-cyan-300"
            >
              <Moon className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: -14, opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 14, opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute text-amber-500"
            >
              <Sun className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode Label */}
      {showLabel && (
        <span className="relative z-10 font-mono text-[9px] font-extrabold tracking-widest uppercase">
          {isDark ? "Dark" : "Light"}
        </span>
      )}

      {/* Active Indicator Dot */}
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
          isDark
            ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
            : "bg-teal-600 shadow-[0_0_8px_#0d9488]"
        }`}
      />
    </button>
  );
}
