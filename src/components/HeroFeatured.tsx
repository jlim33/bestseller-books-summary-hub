"use client";

import React from "react";
import { Sparkles, Award, Clock, ArrowUpRight, BookOpen, Leaf } from "lucide-react";
import { NewsArticle } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface HeroFeaturedProps {
  articles: NewsArticle[];
  locale?: "ko" | "en";
  onSelectArticle: (article: NewsArticle) => void;
}

export function HeroFeatured({ articles, locale = "ko", onSelectArticle }: HeroFeaturedProps) {
  if (!articles || articles.length === 0) return null;

  const isEn = locale === "en";
  const mainStudy = articles[0];
  const sideStudies = articles.slice(1, 4);

  const formatTime = (dateStr: string) => {
    try {
      if (isEn) {
        return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
      }
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ko });
    } catch {
      return isEn ? "Just now" : "방금 전";
    }
  };

  return (
    <div className="w-full my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Main Lead Study */}
        <div
          onClick={() => onSelectArticle(mainStudy)}
          className="lg:col-span-7 group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-sage-50/50 to-lavender-50/40 dark:from-slate-900 dark:via-slate-900/60 dark:to-sage-950/30 border border-sage-200/80 dark:border-slate-800 hover:border-sage-400 dark:hover:border-lavender-400 transition-all duration-300 shadow-healing hover:shadow-healing-hover cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-sage-600 to-emerald-600 text-white shadow-md shadow-sage-500/20">
                <Leaf className="w-3.5 h-3.5 fill-current" />
                {isEn ? "Priority Clinical Lead Study" : "최우선 임상 추천 논문"}
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-sage-200 dark:border-slate-700 shadow-xs">
                {mainStudy.aiSummary?.journalReference || mainStudy.source}
              </span>

              <span className="text-xs text-slate-400 font-mono ml-auto">
                {formatTime(mainStudy.pubDate)}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors leading-tight mb-4 tracking-tight">
              {mainStudy.title}
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base line-clamp-3 leading-relaxed mb-6 font-medium">
              {mainStudy.aiSummary?.clinicalContext || mainStudy.contentSnippet}
            </p>
          </div>

          <div className="pt-4 border-t border-sage-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black bg-lavender-100 text-lavender-900 dark:bg-lavender-950 dark:text-lavender-300 border border-lavender-200">
                <Award className="w-3.5 h-3.5" />
                {mainStudy.aiSummary?.evidenceLevel || (isEn ? "Level 1: Meta-Analysis 🏆" : "1등급: 메타분석 🏆")}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {mainStudy.readTimeMinutes} {isEn ? "min read" : "분"}
              </span>
            </div>

            <span className="flex items-center gap-1 text-xs font-black text-sage-700 dark:text-sage-400 group-hover:translate-x-1 transition-transform">
              {isEn ? "View Clinical Details" : "임상 요약 보기"} <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Side Studies */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {sideStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => onSelectArticle(study)}
              className="group p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-sage-200/80 dark:border-slate-800 hover:border-sage-400 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer shadow-healing hover:shadow-healing-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span className="font-bold text-sage-900 dark:text-sage-200 bg-sage-100 dark:bg-sage-950/60 px-2 py-0.5 rounded-lg border border-sage-200">
                    {study.aiSummary?.journalReference || study.source}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {formatTime(study.pubDate)}
                  </span>
                </div>

                <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors line-clamp-2 mb-2 leading-snug tracking-tight">
                  {study.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-sage-100 dark:border-slate-800/60">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {study.category}
                </span>
                <span className="flex items-center gap-1 font-bold text-sage-600 dark:text-sage-400 group-hover:text-sage-700 transition-colors">
                  {isEn ? "Evidence Takeaway" : "핵심 요약"} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
