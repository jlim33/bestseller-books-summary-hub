"use client";

import React from "react";
import {
  BookOpen,
  Clock,
  Bookmark,
  ChevronRight,
  Layers,
  Sparkles,
  Award
} from "lucide-react";
import { BookItem } from "@/lib/types";

interface BookCardProps {
  book: BookItem;
  onOpenBook: (book: BookItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  locale?: "ko" | "en";
}

export function BookCard({
  book,
  onOpenBook,
  isBookmarked,
  onToggleBookmark,
  locale = "ko",
}: BookCardProps) {
  const isEn = locale === "en";

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai_it":
        return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      case "science":
        return "bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200 dark:border-violet-800";
      case "philosophy":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "mathematics":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "health":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      default:
        return "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300">
      
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getCategoryColor(
                book.category
              )}`}
            >
              {book.categoryLabel}
            </span>

            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
              {book.publishYear}
            </span>

            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400">
              ⭐ {book.rating.toFixed(1)}
            </span>
          </div>

          <button
            onClick={() => onToggleBookmark(book.id)}
            className={`p-1.5 rounded-xl transition-colors ${
              isBookmarked
                ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                : "text-slate-400 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title={isBookmarked ? (isEn ? "Remove from library" : "보관 취소") : (isEn ? "Save to library" : "서재에 보관")}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Thumbnail & Title */}
        <div className="flex gap-4 mb-3">
          <div
            onClick={() => onOpenBook(book)}
            className="w-20 h-28 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer shadow-xs group-hover:scale-105 transition-transform"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              onClick={() => onOpenBook(book)}
              className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer"
            >
              {book.title}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              {book.author}
            </p>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
              {book.authorBio}
            </p>
          </div>
        </div>

        {/* One-Liner Thesis */}
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 italic bg-slate-50 dark:bg-slate-850 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 mb-3">
          "{book.oneLinerThesis}"
        </p>

        {/* Mental Models Badges */}
        <div className="space-y-1 mb-4">
          <p className="text-[10px] font-bold text-slate-400">
            {isEn ? "Mental Models:" : "핵심 멘탈 모델:"}
          </p>
          <div className="flex flex-wrap gap-1">
            {book.keyMentalModels.slice(0, 2).map((m, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-amber-100 dark:border-slate-700 truncate max-w-full"
              >
                💡 {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer & Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            {book.totalReadTimeMinutes}m
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-orange-500" />
            {book.chapters.length} {isEn ? "Chapters" : "개 챕터"}
          </span>
        </div>

        <button
          onClick={() => onOpenBook(book)}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 text-amber-700 dark:text-amber-300 text-xs font-black transition-all shadow-xs"
        >
          <span>{isEn ? "Read Chapters" : "챕터 요약 읽기"}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
