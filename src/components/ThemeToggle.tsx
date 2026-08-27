"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vitapulse_theme_v1");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("vitapulse_theme_v1", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("vitapulse_theme_v1", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="p-2.5 rounded-2xl border border-sage-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-sage-600 dark:hover:text-sage-400 hover:border-sage-300 transition-all shadow-xs"
      title={isDark ? "Switch to Pastel Light Mode" : "Switch to Evening Calming Dark Mode"}
    >
      {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
    </button>
  );
}
