"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Bookmark,
  Sparkles,
  Languages,
  Library,
  Feather
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ReadingSoundPlayer } from "./ReadingSoundPlayer";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locale?: "ko" | "en";
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onOpenBriefing: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  locale = "ko",
  bookmarkCount,
  onOpenBookmarks,
  onOpenBriefing,
}: HeaderProps) {
  const isEn = locale === "en";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-amber-200/60 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href={isEn ? "/en" : "/"} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {isEn ? "BookPulse" : "베스트셀러 챕터 요약 허브"}
                </span>
                <span className="px-1.5 py-0.2 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80">
                  {isEn ? "Chapter-by-Chapter" : "전 챕터 완벽 요약"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                {isEn ? "Executive Chapter Summaries, Mental Models & Audio Digest" : "AI·과학·철학·수학·건강 글로벌 명저 핵심 챕터 요약 및 오디오"}
              </p>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isEn ? "Search books, authors, mental models, concepts..." : "도서명, 저자, 멘탈모델, 챕터 주제 검색..."}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-100/90 dark:bg-slate-900 border border-amber-200/60 dark:border-slate-700/80 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-amber-500 dark:focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Continuous Ambient Reading Lounge */}
          <ReadingSoundPlayer locale={isEn ? "en" : "ko"} />

          {/* Daily 5-Min Executive Book Digest Button */}
          <button
            onClick={onOpenBriefing}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-black shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            title={isEn ? "Generate 5-Minute Executive Digest" : "오늘의 5분 핵심 요약 브리핑"}
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">{isEn ? "Executive Digest" : "5분 핵심 다이제스트"}</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-amber-600 hover:border-amber-300 transition-all shadow-xs"
            title={isEn ? "Saved book summaries" : "내 서재 & 보관함"}
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Language Switcher */}
          <Link
            href={isEn ? "/" : "/en"}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-xs"
            title={isEn ? "Switch to Korean Edition" : "글로벌 영문 에디션으로 전환"}
          >
            <Languages className="w-3.5 h-3.5 text-amber-600" />
            <span>{isEn ? "🇰🇷 KR" : "🇺🇸 Global"}</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

        </div>
      </div>
    </header>
  );
}
