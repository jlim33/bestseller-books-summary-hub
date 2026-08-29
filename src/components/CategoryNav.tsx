"use client";

import React from "react";
import {
  Cpu,
  Atom,
  Compass,
  Infinity,
  HeartPulse,
  Sparkles,
  LayoutGrid
} from "lucide-react";
import { BookCategory } from "@/lib/types";

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  locale?: "ko" | "en";
  bookCounts: Record<string, number>;
}

export function CategoryNav({
  selectedCategory,
  onSelectCategory,
  locale = "ko",
  bookCounts,
}: CategoryNavProps) {
  const isEn = locale === "en";

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    {
      id: "all",
      label: isEn ? "All Fields" : "전체 분야",
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      id: "ai_it",
      label: isEn ? "AI & IT" : "AI & IT 기술",
      icon: <Cpu className="w-4 h-4 text-indigo-500" />,
    },
    {
      id: "science",
      label: isEn ? "Science" : "자연과학",
      icon: <Atom className="w-4 h-4 text-violet-500" />,
    },
    {
      id: "philosophy",
      label: isEn ? "Philosophy" : "철학 & 인문",
      icon: <Compass className="w-4 h-4 text-amber-500" />,
    },
    {
      id: "mathematics",
      label: isEn ? "Mathematics" : "수학 & 수리논리",
      icon: <Infinity className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: "health",
      label: isEn ? "Health" : "의학 & 건강수명",
      icon: <HeartPulse className="w-4 h-4 text-rose-500" />,
    },
    {
      id: "etc",
      label: isEn ? "Etc (Habits & Wealth)" : "기타 (습관/심리/부)",
      icon: <Sparkles className="w-4 h-4 text-teal-500" />,
    },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-3">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = bookCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                isSelected
                  ? "bg-amber-600 text-white shadow-md shadow-amber-500/25 scale-[1.02]"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-amber-300 dark:hover:border-slate-700 hover:bg-amber-50/50"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
