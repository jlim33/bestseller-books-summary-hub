"use client";

import React from "react";
import {
  Sparkles,
  BookOpen,
  Clock,
  Award,
  Layers,
  ChevronRight,
  Flame
} from "lucide-react";
import { BookItem } from "@/lib/types";

interface HeroFeaturedProps {
  book: BookItem;
  onOpenBook: (book: BookItem) => void;
  locale?: "ko" | "en";
}

export function HeroFeatured({
  book,
  onOpenBook,
  locale = "ko",
}: HeroFeaturedProps) {
  const isEn = locale === "en";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-stone-900 border border-amber-500/30 text-white p-6 sm:p-8 shadow-2xl mb-8">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Book Details */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
              {isEn ? "Featured Bestseller Masterpiece" : "이달의 명저 심층 챕터 요약"}
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-slate-300">
              ⭐ {book.rating.toFixed(1)} / 5.0
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-slate-300">
              {book.publishYear}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            {book.title}
          </h2>

          <p className="text-sm sm:text-base text-amber-200/90 font-medium italic">
            "{book.oneLinerThesis}"
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="font-bold text-white">{book.author}</span>
            <span>•</span>
            <span className="text-slate-400">{book.authorBio}</span>
          </div>

          {/* Key Mental Models */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" />
              {isEn ? "Core Mental Models & Frameworks:" : "핵심 멘탈 모델 & 사고 프레임워크:"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {book.keyMentalModels.map((model, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/5 border border-white/10 text-amber-300"
                >
                  💡 {model}
                </span>
              ))}
            </div>
          </div>

          {/* CTA & Metadata */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => onOpenBook(book)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
            >
              <BookOpen className="w-4 h-4 fill-current" />
              <span>{isEn ? "Read Chapter-by-Chapter (All Chapters)" : "전 챕터 요약 & 오디오 읽기"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {book.totalReadTimeMinutes} {isEn ? "min read" : "분 완독"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                {book.chapters.length} {isEn ? "Chapters" : "개 챕터"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Book Aesthetic Cover Card */}
        <div className="lg:col-span-4 flex justify-center">
          <div
            onClick={() => onOpenBook(book)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-amber-500/40 shadow-2xl hover:scale-105 transition-transform max-w-[220px]"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {book.categoryLabel}
              </span>
              <p className="text-xs font-black text-white line-clamp-2">
                {book.title}
              </p>
              <p className="text-[10px] text-slate-300 mt-1">
                {book.chapters.length} {isEn ? "Detailed Chapters" : "개 상세 챕터 요약"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
