"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Theme = "day" | "night";
const CityThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: "day", toggleTheme: () => {} });
export const useCityTheme = () => useContext(CityThemeContext);
export default function CityTheme({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("day");
  useEffect(() => { setTheme(document.documentElement.dataset.cityTheme === "night" ? "night" : "day"); }, []);
  const toggleTheme = () => {
    const next = theme === "day" ? "night" : "day";
    document.documentElement.dataset.cityTheme = next;
    setTheme(next);
    try { localStorage.setItem("htr-city-theme", next); } catch {}
  };
  return <CityThemeContext.Provider value={{ theme, toggleTheme }}>{children}</CityThemeContext.Provider>;
}
