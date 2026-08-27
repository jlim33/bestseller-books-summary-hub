"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Bookmark,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Share2,
  Check,
  Award,
  ShieldCheck,
  Leaf,
  FlaskConical,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { NewsArticle, AISummary, EvidenceVoteState } from "@/lib/types";
import {
  getStoredApiKey,
  getArticleEvidenceVote,
  toggleArticleEvidenceVote
} from "@/lib/storage";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { HealthComments } from "./HealthComments";

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  locale?: "ko" | "en";
  onToggleBookmark: (article: NewsArticle) => void;
  isPlayingAudio: boolean;
  isPausedAudio: boolean;
  onSpeak: (text: string, lang?: "en" | "ko") => void;
  onPauseAudio: () => void;
  onResumeAudio: () => void;
  onStopAudio: () => void;
}

export function ArticleModal({
  article,
  isOpen,
  onClose,
  isBookmarked,
  locale = "ko",
  onToggleBookmark,
  isPlayingAudio,
  isPausedAudio,
  onSpeak,
  onPauseAudio,
  onResumeAudio,
  onStopAudio,
}: ArticleModalProps) {
  const [copied, setCopied] = useState(false);
  const [customSummary, setCustomSummary] = useState<AISummary | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [evidenceVote, setEvidenceVote] = useState<EvidenceVoteState>({
    userVote: null,
    helpfulCount: 22,
    moreStudyCount: 4,
  });

  const isEn = locale === "en" || article?.lang === "en";

  useEffect(() => {
    if (article) {
      setEvidenceVote(
        getArticleEvidenceVote(
          article.id,
          article.helpfulVotes || 22,
          article.moreStudyVotes || 4
        )
      );
      setCustomSummary(null);
    }
  }, [article]);

  if (!isOpen || !article) return null;

  const currentSummary = customSummary || article.aiSummary;

  const handleHelpfulVote = () => {
    const updated = toggleArticleEvidenceVote(
      article.id,
      "helpful",
      article.helpfulVotes || 22,
      article.moreStudyVotes || 4
    );
    setEvidenceVote({ ...updated });
  };

  const handleMoreStudyVote = () => {
    const updated = toggleArticleEvidenceVote(
      article.id,
      "moreStudy",
      article.helpfulVotes || 22,
      article.moreStudyVotes || 4
    );
    setEvidenceVote({ ...updated });
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(article.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeepAIAnalysis = async () => {
    try {
      setIsGeneratingAI(true);
      const userKey = getStoredApiKey();
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: article.title,
          content: article.fullContent || article.contentSnippet,
          category: article.category,
          apiKey: userKey,
          lang: isEn ? "en" : "ko",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.summary) {
          setCustomSummary(data.summary);
        }
      }
    } catch (err) {
      console.error("Deep summary error:", err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const textToRead = isEn
    ? `${article.title}. Clinical Takeaway: ${currentSummary?.tldr?.join(". ") || article.contentSnippet}. Safety and Lifestyle Guidance: ${currentSummary?.safetyAndDosage || ""}`
    : `${article.title}. 핵심 임상 요약: ${currentSummary?.tldr?.join(". ") || article.contentSnippet}. 안전 섭취 및 생활습관 가이드: ${currentSummary?.safetyAndDosage || ""}`;

  let formattedDate = isEn ? "Just now" : "방금 전";
  try {
    if (isEn) {
      formattedDate = formatDistanceToNow(new Date(article.pubDate), { addSuffix: true });
    } else {
      formattedDate = formatDistanceToNow(new Date(article.pubDate), { addSuffix: true, locale: ko });
    }
  } catch {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-md overflow-y-auto">
      
      {/* Container */}
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-sage-200/80 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sage-100 dark:border-slate-800 bg-sage-50/70 dark:bg-slate-950/60">
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="font-bold text-sage-900 dark:text-sage-200 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-sage-200 dark:border-slate-700 flex items-center gap-1 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-sage-600" />
              {currentSummary?.journalReference || article.source}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-mono">
              {formattedDate}
            </span>
          </div>

          {/* Actions & Helpful/Caution Voting */}
          <div className="flex items-center gap-2">
            
            {/* Helpful vs Caution Button Group */}
            <div className="flex items-center p-0.5 rounded-xl bg-sage-200/50 dark:bg-slate-800 border border-sage-200 dark:border-slate-700 text-xs">
              <button
                onClick={handleHelpfulVote}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all ${
                  evidenceVote.userVote === "helpful"
                    ? "bg-sage-600 text-white shadow-xs"
                    : "text-slate-700 dark:text-slate-300 hover:text-sage-600"
                }`}
                title={isEn ? "Clinically Helpful" : "유익해요"}
              >
                <span>🌿</span>
                <span>{evidenceVote.helpfulCount}</span>
              </button>
              <button
                onClick={handleMoreStudyVote}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all ${
                  evidenceVote.userVote === "moreStudy"
                    ? "bg-lavender-600 text-white shadow-xs"
                    : "text-slate-700 dark:text-slate-300 hover:text-lavender-600"
                }`}
                title={isEn ? "Need More Study" : "검증 필요"}
              >
                <span>🧪</span>
                <span>{evidenceVote.moreStudyCount}</span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl border border-sage-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-100 text-slate-500 dark:text-slate-400 hover:text-sage-600 transition-all"
              title={isEn ? "Share link" : "링크 공유"}
            >
              {copied ? <Check className="w-4 h-4 text-sage-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? "bg-sage-600 border-sage-500 text-white shadow-md"
                  : "border-sage-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-100 text-slate-500 dark:text-slate-400 hover:text-sage-600"
              }`}
              title={isEn ? (isBookmarked ? "Remove bookmark" : "Save study") : (isBookmarked ? "북마크 해제" : "논문 저장")}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-sage-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-100 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              title={isEn ? "Close (Esc)" : "창 닫기 (Esc)"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
          
          {/* Title & Byline */}
          <div>
            <div className="mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide bg-lavender-100 text-lavender-900 dark:bg-lavender-950/80 dark:text-lavender-300 border border-lavender-200">
                <Award className="w-4 h-4 text-lavender-600" />
                {currentSummary?.evidenceLevel || (isEn ? "Level 2: Randomized Controlled Trial (RCT) 🔬" : "2등급: 무작위 대조 임상시험 (RCT) 🔬")}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-3 tracking-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              {article.author && (
                <span>{isEn ? "Investigator/Author:" : "연구진/저자:"} <strong className="text-slate-800 dark:text-slate-200">{article.author}</strong></span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTimeMinutes} {isEn ? "min read" : "분 분량"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sage-100 dark:bg-slate-800 border border-sage-200 dark:border-slate-700 text-sage-800 dark:text-sage-300 font-semibold">
                {article.category}
              </span>
            </div>
          </div>

          {/* US Native Voice Audio Briefing Bar */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sage-50 via-white to-lavender-50 dark:from-sage-950/40 dark:via-slate-900 dark:to-lavender-950/30 border border-sage-200/80 dark:border-sage-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sage-600/10 text-sage-600 dark:text-sage-400 border border-sage-200 dark:border-sage-500/30">
                <Volume2 className={`w-5 h-5 ${isPlayingAudio ? "animate-pulse" : ""}`} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {isEn ? "Medical Audio Briefing (US Native Voice)" : "원어민 음성 건강 브리핑 (Audio)"}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isPlayingAudio
                    ? isPausedAudio
                      ? (isEn ? "Audio briefing paused." : "음성 브리핑이 일시 정지되었습니다.")
                      : (isEn ? "Broadcasting clinical takeaway with soothing US native voice..." : "부드럽고 신뢰감 있는 목소리로 임상 요약을 낭독 중입니다...")
                    : (isEn ? "Listen to full clinical insight in gentle native American voice" : "논문 요약과 안전 가이드를 음성으로 편안하게 청취하세요")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isPlayingAudio ? (
                <button
                  onClick={() => onSpeak(textToRead, isEn ? "en" : "ko")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sage-600 to-emerald-600 hover:from-sage-500 hover:to-emerald-500 text-white text-xs font-bold shadow-md shadow-sage-500/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isEn ? "Listen" : "듣기"}</span>
                </button>
              ) : (
                <>
                  {isPausedAudio ? (
                    <button
                      onClick={onResumeAudio}
                      className="p-2 rounded-xl bg-sage-600 text-white text-xs font-bold"
                      title={isEn ? "Resume" : "이어듣기"}
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  ) : (
                    <button
                      onClick={onPauseAudio}
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
                      title={isEn ? "Pause" : "일시정지"}
                    >
                      <Pause className="w-4 h-4 fill-current" />
                    </button>
                  )}
                  <button
                    onClick={onStopAudio}
                    className="p-2 rounded-xl bg-rose-50 dark:bg-rose-600/20 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs"
                    title={isEn ? "Stop audio" : "재생 중단"}
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Clinical Evidence Deep Breakdown Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-sage-50/80 via-white to-lavender-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-sage-950/20 border border-sage-200/80 dark:border-sage-800/40 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sage-100 dark:bg-sage-500/20 text-sage-700 dark:text-sage-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-black text-sm text-sage-950 dark:text-sage-300 tracking-wider">
                  {isEn ? "Peer-Reviewed Clinical Evidence Breakdown" : "피어리뷰 의학 논문 정밀 분석"}
                </span>
              </div>

              <button
                onClick={handleDeepAIAnalysis}
                disabled={isGeneratingAI}
                className="px-3 py-1 rounded-xl bg-sage-100 dark:bg-sage-600/20 hover:bg-sage-200 dark:hover:bg-sage-600/30 border border-sage-200 dark:border-sage-500/30 text-[11px] font-semibold text-sage-800 dark:text-sage-300 transition-all flex items-center gap-1.5"
                title={isEn ? "Re-diagnose evidence" : "논문 재진단"}
              >
                <Sparkles className={`w-3 h-3 ${isGeneratingAI ? "animate-spin" : ""}`} />
                <span>{isGeneratingAI ? (isEn ? "Analyzing..." : "분석 중...") : (isEn ? "Re-diagnose" : "재진단")}</span>
              </button>
            </div>

            {/* Bullets */}
            {currentSummary?.tldr && currentSummary.tldr.length > 0 && (
              <ul className="space-y-2.5 mb-5 text-sm text-slate-800 dark:text-slate-200">
                {currentSummary.tldr.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sage-600 text-white text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Clinical Mechanism & Insight */}
            {currentSummary?.clinicalContext && (
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-950/60 border border-sage-100 dark:border-sage-800/30 text-xs shadow-xs mb-4">
                <span className="font-bold uppercase tracking-wider text-sage-800 dark:text-sage-400 block mb-1 text-[11px]">
                  💡 {isEn ? "CLINICAL MECHANISM & LONGEVITY IMPLICATIONS" : "생리학적 메커니즘 및 임상 시사점"}
                </span>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                  {currentSummary.clinicalContext}
                </p>
              </div>
            )}

            {/* Safety & Dosage Caution Box */}
            {currentSummary?.safetyAndDosage && (
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs">
                <span className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1 mb-1 text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {isEn ? "CLINICAL SAFETY & DOSAGE GUIDANCE" : "임상 안전 섭취 & 생활습관 유의사항"}
                </span>
                <p className="leading-relaxed text-amber-900 dark:text-amber-200 font-medium">
                  {currentSummary.safetyAndDosage}
                </p>
              </div>
            )}
          </div>

          {/* Full Study Report Preview */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isEn ? "Study Abstract & Excerpt Preview" : "논문 초록 및 연구 본문 요약"}
            </h3>
            <div className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-sage-200/80 dark:border-slate-800">
              {article.fullContent || article.contentSnippet}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sage-100 dark:bg-slate-800 text-sage-800 dark:text-sage-300 border border-sage-200 dark:border-slate-700">
                #{tag}
              </span>
            ))}
          </div>

          {/* Health & Clinical Comments Section */}
          <HealthComments articleId={article.id} locale={isEn ? "en" : "ko"} />

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-sage-100 dark:border-slate-800 bg-sage-50/80 dark:bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            {isEn ? "Close" : "닫기"}
          </button>

          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sage-600 to-emerald-600 hover:from-sage-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-sage-500/20 transition-all"
          >
            <span>{isEn ? `Read Full Peer-Reviewed Study on ${article.source}` : `${article.source} 원문 논문 보기`}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
