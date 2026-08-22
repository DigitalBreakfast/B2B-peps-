import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "dark" | "light";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isMonochrome: boolean;
  toggleMonochrome: () => void;
  setMonochrome: (active: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
  isMonochrome: false,
  toggleMonochrome: () => {},
  setMonochrome: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("b2bpeps_theme") as ThemeMode;
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    }
    return "light";
  });

  const [isMonochrome, setIsMonochromeState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("b2bpeps_monochrome") === "true";
    }
    return false;
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("b2bpeps_theme", newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const setMonochrome = (active: boolean) => {
    setIsMonochromeState(active);
    if (typeof window !== "undefined") {
      localStorage.setItem("b2bpeps_monochrome", active ? "true" : "false");
    }
  };

  const toggleMonochrome = () => {
    setMonochrome(!isMonochrome);
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    }
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (isMonochrome) {
      root.classList.add("monochrome");
    } else {
      root.classList.remove("monochrome");
    }
  }, [isMonochrome]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isMonochrome, toggleMonochrome, setMonochrome }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
