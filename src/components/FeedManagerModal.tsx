"use client";

import React, { useState } from "react";
import { X, Rss, Plus, RefreshCw, BookOpen } from "lucide-react";
import { FeedSource, Category } from "@/lib/types";

interface FeedManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  feeds: FeedSource[];
  locale?: "ko" | "en";
  onToggleFeed: (feedId: string) => void;
  onAddCustomFeed: (feed: Partial<FeedSource>) => void;
  onResetFeeds: () => void;
}

export function FeedManagerModal({
  isOpen,
  onClose,
  feeds,
  locale = "ko",
  onToggleFeed,
  onAddCustomFeed,
  onResetFeeds,
}: FeedManagerModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<Category>(locale === "en" ? "Longevity & Anti-Aging" : "장수 & 안티에이징 의학");
  const isEn = locale === "en";

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    onAddCustomFeed({
      id: "custom-health-" + Date.now(),
      name: name.trim(),
      url: url.trim(),
      category,
      enabled: true,
      isCustom: true,
      type: "rss",
      lang: isEn ? "en" : "ko",
    });

    setName("");
    setUrl("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-sage-200/80 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sage-100 dark:border-slate-800 bg-sage-50/70 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sage-100 dark:bg-sage-950/50 text-sage-700 dark:text-sage-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {isEn ? "Medical Journals & Health RSS Feeds" : "의학 저널 및 건강 인텔리전스 피드 관리"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn ? "Customize peer-reviewed journals (The Lancet, JAMA, Nature Medicine)" : "The Lancet, Nature Medicine, 질병관리청 등 신뢰도 높은 의학 RSS를 관리하세요"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-sage-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-100 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[72vh] overflow-y-auto">
          
          {/* Add Custom Feed Form */}
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-sage-50/50 dark:bg-sage-950/20 border border-sage-200/80 dark:border-sage-800/40 space-y-3">
            <h4 className="text-xs font-black uppercase text-sage-900 dark:text-sage-300 flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              {isEn ? "Add Custom Medical Journal Source" : "맞춤 의학 저널 소스 등록"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isEn ? "Journal / Source (e.g. BMJ Clinical)" : "저널/기관명 (예: 대한의학회)"}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-sage-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-sage-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-sage-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-sage-500"
              >
                {isEn ? (
                  <>
                    <option value="Longevity & Anti-Aging">Longevity & Anti-Aging</option>
                    <option value="Nutrition & Functional Foods">Nutrition & Functional Foods</option>
                    <option value="Sleep & Neuro-Wellness">Sleep & Neuro-Wellness</option>
                    <option value="Cardiovascular & Metabolic">Cardiovascular & Metabolic</option>
                    <option value="Immunity & Microbiome">Immunity & Microbiome</option>
                    <option value="Exercise Medicine & Rehab">Exercise Medicine & Rehab</option>
                  </>
                ) : (
                  <>
                    <option value="장수 & 안티에이징 의학">장수 & 안티에이징 의학</option>
                    <option value="영양 & 기능성 식품 과학">영양 & 기능성 식품 과학</option>
                    <option value="수면 & 뇌신경 웰니스">수면 & 뇌신경 웰니스</option>
                    <option value="심혈관 & 대사 건강">심혈관 & 대사 건강</option>
                    <option value="면역 & 마이크로바이옴">면역 & 마이크로바이옴</option>
                    <option value="운동 처방 & 재활 치료">운동 처방 & 재활 치료</option>
                  </>
                )}
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.nature.com/nm.rss"
                className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-sage-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-sage-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-500 text-white text-xs font-bold shadow-md shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isEn ? "Add Source" : "소스 추가"}</span>
              </button>
            </div>
          </form>

          {/* Feeds List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>{isEn ? "Monitored Peer-Reviewed Sources" : "모니터링 저널 목록"} ({feeds.length})</span>
              <button
                onClick={onResetFeeds}
                className="flex items-center gap-1 text-[11px] text-sage-600 hover:text-sage-700 font-bold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isEn ? "Reset Defaults" : "기본값 초기화"}</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {feeds.map((feed) => (
                <div
                  key={feed.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-sage-200/80 dark:border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <input
                      type="checkbox"
                      checked={feed.enabled !== false}
                      onChange={() => onToggleFeed(feed.id)}
                      className="w-4 h-4 rounded text-sage-600 focus:ring-sage-500 border-sage-300 dark:border-slate-700 cursor-pointer"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                          {feed.name}
                        </span>
                        <span className="px-2 py-0.2 rounded text-[10px] bg-sage-200/80 dark:bg-slate-700 text-sage-800 dark:text-slate-300 font-semibold shrink-0">
                          {feed.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate font-mono">
                        {feed.url}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    feed.enabled !== false
                      ? "bg-sage-100 text-sage-700 dark:bg-sage-950 dark:text-sage-400"
                      : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}>
                    {feed.enabled !== false ? (isEn ? "Active" : "활성") : (isEn ? "Disabled" : "비활성")}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
