"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cargar tema inicial
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    
    // Aplicar inmediatamente
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    setDarkMode(isDark);
    setMounted(true);
  }, []);

  // Función para cambiar el tema
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      
      // Aplicar INMEDIATAMENTE de forma síncrona
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        console.log("✅ Tema OSCURO aplicado");
        console.log("📋 Clases HTML:", document.documentElement.className);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        console.log("✅ Tema CLARO aplicado");
        console.log("📋 Clases HTML:", document.documentElement.className);
      }
      
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}