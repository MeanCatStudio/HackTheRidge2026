"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Theme = "day" | "night";
const CityThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: "day", toggleTheme: () => {} });
export const useCityTheme = () => useContext(CityThemeContext);
export default function CityTheme({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const saved = (() => {
      try {
        return localStorage.getItem("htr-city-theme");
      } catch {
        return null;
      }
    })();

    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme: Theme = saved === "day" || saved === "night" ? saved : preferredDark ? "night" : "day";

    root.dataset.cityTheme = nextTheme;
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "day" ? "night" : "day";
    document.documentElement.dataset.cityTheme = next;
    setTheme(next);
    try { localStorage.setItem("htr-city-theme", next); } catch {}
  };

  return (
    <CityThemeContext.Provider value={{ theme: mounted ? theme : "day", toggleTheme }}>
      {children}
    </CityThemeContext.Provider>
  );
}
