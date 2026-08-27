"use client";

import React from "react";
import Link from "next/link";
import {
  Leaf,
  Search,
  Bookmark,
  Rss,
  RefreshCw,
  Languages,
  Sparkles,
  HeartPulse
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { HealingSoundPlayer } from "./HealingSoundPlayer";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  nextSyncSeconds: number;
  locale?: "ko" | "en";
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onOpenBriefing: () => void;
  onOpenFeeds: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  onRefresh,
  isRefreshing,
  nextSyncSeconds,
  locale = "ko",
  bookmarkCount,
  onOpenBookmarks,
  onOpenBriefing,
  onOpenFeeds,
}: HeaderProps) {
  const isEn = locale === "en";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-sage-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href={isEn ? "/en" : "/"} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sage-600 via-emerald-600 to-lavender-500 flex items-center justify-center text-white shadow-lg shadow-sage-500/25 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-sage-700 dark:group-hover:text-sage-400 transition-colors">
                  {isEn ? "VitaPulse" : "비타펄스 (VitaPulse)"}
                </span>
                <span className="px-1.5 py-0.2 rounded-md text-[10px] font-black uppercase tracking-wider bg-sage-100 text-sage-800 dark:bg-sage-950/80 dark:text-sage-300 border border-sage-300 dark:border-sage-800">
                  {isEn ? "Evidence Medical" : "근거 중심 헬스"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                {isEn ? "Peer-Reviewed Longevity, Nutrition & Neuro-Wellness" : "최신 임상 논문 기반 건강, 항노화 & 마인드 웰니스"}
              </p>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-2">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isEn ? "Search The Lancet, Sleep, Longevity, Gut, Diet..." : "란셋, 장수, 뇌신경, 장내미생물, 수면, 식단 검색..."}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-sage-50/70 dark:bg-slate-900 border border-sage-200/80 dark:border-slate-700/80 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-sage-500 dark:focus:border-sage-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Healing Background Music Lounge Player */}
          <HealingSoundPlayer locale={isEn ? "en" : "ko"} />

          {/* Daily Wellness Dispatch Report Button */}
          <button
            onClick={onOpenBriefing}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-sage-600 to-emerald-600 hover:from-sage-500 hover:to-emerald-500 text-white text-xs font-black shadow-md shadow-sage-500/20 active:scale-95 transition-all"
            title={isEn ? "Daily Health Intelligence Report" : "일일 건강 인텔리전스 리포트"}
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">{isEn ? "Daily Report" : "일일 건강리포트"}</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 sm:p-2.5 rounded-2xl border border-sage-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-sage-600 hover:border-sage-300 transition-all shadow-xs"
            title={isEn ? "Saved studies" : "저장한 논문"}
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sage-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Feed Manager */}
          <button
            onClick={onOpenFeeds}
            className="p-2 sm:p-2.5 rounded-2xl border border-sage-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-sage-600 hover:border-sage-300 transition-all shadow-xs"
            title={isEn ? "Manage medical journals" : "저널 피드 관리"}
          >
            <Rss className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <Link
            href={isEn ? "/" : "/en"}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl border border-sage-200 dark:border-slate-800 bg-sage-50 dark:bg-slate-900 hover:bg-sage-100 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-xs"
            title={isEn ? "Switch to Korean Edition" : "글로벌 영문 에디션으로 전환"}
          >
            <Languages className="w-3.5 h-3.5 text-sage-600" />
            <span>{isEn ? "🇰🇷 KR" : "🇺🇸 Global"}</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

        </div>
      </div>
    </header>
  );
}
