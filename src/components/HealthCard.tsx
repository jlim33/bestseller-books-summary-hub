"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Award,
  Clock,
  Bookmark,
  Share2,
  Check,
  ExternalLink,
  MessageSquare,
  Volume2,
  ShieldCheck,
  Leaf,
  FlaskConical,
  BookOpen
} from "lucide-react";
import { NewsArticle, EvidenceVoteState } from "@/lib/types";
import {
  getArticleEvidenceVote,
  toggleArticleEvidenceVote,
  getArticleComments
} from "@/lib/storage";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface HealthCardProps {
  article: NewsArticle;
  isBookmarked: boolean;
  locale?: "ko" | "en";
  onToggleBookmark: (art: NewsArticle) => void;
  onOpenReader: (art: NewsArticle) => void;
  onPlayAudio?: (text: string, lang?: "en" | "ko") => void;
}

export function HealthCard({
  article,
  isBookmarked,
  locale = "ko",
  onToggleBookmark,
  onOpenReader,
  onPlayAudio,
}: HealthCardProps) {
  const [copied, setCopied] = useState(false);
  const [evidenceVote, setEvidenceVote] = useState<EvidenceVoteState>({
    userVote: null,
    helpfulCount: article.helpfulVotes || 22,
    moreStudyCount: article.moreStudyVotes || 4,
  });
  const [commentCount, setCommentCount] = useState(0);
  const isEn = locale === "en";

  useEffect(() => {
    setEvidenceVote(
      getArticleEvidenceVote(
        article.id,
        article.helpfulVotes || 22,
        article.moreStudyVotes || 4
      )
    );
    const comments = getArticleComments(article.id);
    setCommentCount(comments.length);
  }, [article.id, article.helpfulVotes, article.moreStudyVotes]);

  const handleHelpfulVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleArticleEvidenceVote(
      article.id,
      "helpful",
      article.helpfulVotes || 22,
      article.moreStudyVotes || 4
    );
    setEvidenceVote({ ...updated });
  };

  const handleMoreStudyVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleArticleEvidenceVote(
      article.id,
      "moreStudy",
      article.helpfulVotes || 22,
      article.moreStudyVotes || 4
    );
    setEvidenceVote({ ...updated });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(article.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

  const totalVotes = evidenceVote.helpfulCount + evidenceVote.moreStudyCount;
  const helpfulRatio = totalVotes > 0 ? Math.round((evidenceVote.helpfulCount / totalVotes) * 100) : 85;

  return (
    <div
      onClick={() => onOpenReader(article)}
      className="group relative rounded-3xl p-5 sm:p-6 bg-white/95 dark:bg-slate-900/90 border border-sage-200/80 dark:border-slate-800 hover:border-sage-400 dark:hover:border-lavender-400/80 transition-all duration-300 shadow-healing hover:shadow-healing-hover cursor-pointer flex flex-col justify-between backdrop-blur-md"
    >
      <div>
        {/* Journal Source & Citation Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-xs text-sage-900 dark:text-sage-200 bg-sage-100/90 dark:bg-sage-950/60 px-2.5 py-0.5 rounded-lg border border-sage-200 dark:border-sage-800 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-sage-600" />
              {article.aiSummary?.journalReference || article.source}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            {formatTime(article.pubDate)}
          </span>
        </div>

        {/* Evidence Grade Badge */}
        {article.aiSummary?.evidenceLevel && (
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide bg-lavender-100 text-lavender-900 dark:bg-lavender-950/70 dark:text-lavender-300 border border-lavender-200 dark:border-lavender-800">
              <Award className="w-3 h-3 text-lavender-600" />
              {article.aiSummary.evidenceLevel}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors leading-snug line-clamp-2 mb-3 tracking-tight">
          {article.title}
        </h3>

        {/* Snippet */}
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 font-medium">
          {article.contentSnippet}
        </p>

        {/* Clinical Insight Takeaway Pill */}
        {article.aiSummary?.tldr && article.aiSummary.tldr.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sage-50/90 to-lavender-50/70 dark:from-slate-850 dark:to-sage-950/30 border border-sage-200/80 dark:border-sage-800/40 mb-4 text-xs text-slate-900 dark:text-slate-200">
            <div className="flex items-center justify-between gap-1.5 font-bold text-[10px] uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1 text-sage-700 dark:text-sage-400">
                <Sparkles className="w-3.5 h-3.5" />
                {isEn ? "Evidence-Based Clinical Takeaway" : "논문 핵심 임상 요약"}
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                {isEn ? "High Confidence" : "임상 신뢰도 높음"}
              </span>
            </div>
            <p className="line-clamp-2 leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
              {article.aiSummary.tldr[0]}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              #{tag}
            </span>
          ))}
          <span className="text-[11px] text-slate-400 font-mono ml-auto flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {article.readTimeMinutes} {isEn ? "min read" : "분"}
          </span>
        </div>
      </div>

      {/* 🌿 Helpful vs 🧪 More Study Voting Gauge Bar */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <button
            onClick={handleHelpfulVote}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all ${
              evidenceVote.userVote === "helpful"
                ? "bg-sage-600 text-white shadow-xs"
                : "text-sage-800 dark:text-sage-300 bg-sage-50 dark:bg-sage-950/40 hover:bg-sage-100 border border-sage-200 dark:border-sage-800"
            }`}
            title={isEn ? "Clinically Helpful Insight" : "유익한 임상 정보"}
          >
            <span>🌿 {isEn ? "Helpful" : "도움이 돼요"}</span>
            <span className="font-mono text-[10px]">({evidenceVote.helpfulCount})</span>
          </button>

          <span className="text-[10px] font-mono font-bold text-slate-400">
            {helpfulRatio}% {isEn ? "Helpful" : "유익 지수"}
          </span>

          <button
            onClick={handleMoreStudyVote}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all ${
              evidenceVote.userVote === "moreStudy"
                ? "bg-lavender-600 text-white shadow-xs"
                : "text-lavender-800 dark:text-lavender-300 bg-lavender-50 dark:bg-lavender-950/40 hover:bg-lavender-100 border border-lavender-200 dark:border-lavender-800"
            }`}
            title={isEn ? "Need More Replication" : "추가 검증 필요"}
          >
            <span>🧪 {isEn ? "Caution" : "검증 필요"}</span>
            <span className="font-mono text-[10px]">({evidenceVote.moreStudyCount})</span>
          </button>
        </div>

        {/* Gauge Bar */}
        <div className="w-full h-1.5 rounded-full bg-lavender-100 dark:bg-slate-800 overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-sage-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${helpfulRatio}%` }}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenReader(article);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-sage-50 dark:hover:bg-sage-950 text-slate-600 dark:text-slate-400 hover:text-sage-600 text-xs font-semibold border border-slate-200/80 dark:border-slate-700 transition-all"
            title={isEn ? "View Discussion" : "임상 토론 보기"}
          >
            <MessageSquare className="w-3.5 h-3.5 text-sage-600" />
            <span>{commentCount}</span>
          </button>

          <div className="flex items-center gap-1">
            {onPlayAudio && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const textToRead = `${article.title}. Clinical Takeaway: ${article.aiSummary?.clinicalContext || article.contentSnippet}. Safety guidance: ${article.aiSummary?.safetyAndDosage || ""}`;
                  onPlayAudio(textToRead, isEn ? "en" : "ko");
                }}
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-sage-600 transition-all"
                title={isEn ? "Listen to medical voice briefing" : "의학 음성 브리핑 듣기"}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-sage-600 transition-all"
              title={isEn ? "Share link" : "링크 복사"}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-sage-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article);
              }}
              className={`p-1.5 rounded-xl border transition-all ${
                isBookmarked
                  ? "bg-sage-600 border-sage-500 text-white shadow-sm"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-sage-600"
              }`}
              title={isBookmarked ? (isEn ? "Remove bookmark" : "북마크 해제") : (isEn ? "Save study" : "논문 저장")}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-sage-600 transition-all"
              title={isEn ? "Original Peer-Reviewed Source" : "원문 논문 보기"}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
