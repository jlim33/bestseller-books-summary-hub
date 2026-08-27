"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Trash2,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Apple
} from "lucide-react";
import { Comment } from "@/lib/types";
import {
  getArticleComments,
  addArticleComment,
  deleteArticleComment,
  likeArticleComment,
  getSavedNickname,
  saveNickname
} from "@/lib/storage";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface HealthCommentsProps {
  articleId: string;
  locale?: "ko" | "en";
  onCommentCountChange?: (count: number) => void;
}

const PRESET_NICKNAMES_KO = [
  "예방의학 전문의",
  "임상 영양학 박사",
  "뇌신경 웰니스 연구원",
  "항노화 대사의학 코치",
  "스마트 헬스케어 기획자",
  "근거중심 건강 독자"
];

const PRESET_NICKNAMES_EN = [
  "Preventative Medicine MD",
  "Clinical Nutritionist PhD",
  "Neuro-Wellness Researcher",
  "Metabolic Longevity Coach",
  "Evidence-Based Health Reader",
  "Clinical Trial Analyst"
];

const QUICK_STARTERS_KO = [
  "🌿 대규모 임상 코호트로 입증된 신뢰성 높은 연구 결과네요.",
  "💡 일상 속에서 무리 없이 실천할 수 있는 훌륭한 라이프스타일 가이드입니다.",
  "⚠️ 기저 질환이 있는 분들은 보충제 복용 전 주치의 상담이 필요해 보입니다.",
  "🔬 장기적인 추가 복제 임상 시험 결과도 매우 기대됩니다."
];

const QUICK_STARTERS_EN = [
  "🌿 High confidence clinical evidence with solid physiological mechanism.",
  "💡 Practical and sustainable lifestyle recommendation backed by data.",
  "⚠️ Note for pre-existing conditions: consult physician before high-dose supplementation.",
  "🔬 Looking forward to multi-center replication trials on long-term outcomes."
];

const AVATAR_GRADIENTS = [
  "from-sage-500 to-emerald-600",
  "from-lavender-500 to-purple-600",
  "from-peach-500 to-amber-600",
  "from-calmsky-500 to-blue-600",
  "from-teal-500 to-cyan-600",
];

export function HealthComments({ articleId, locale = "ko", onCommentCountChange }: HealthCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isEn = locale === "en";

  useEffect(() => {
    const list = getArticleComments(articleId);
    setComments(list);
    if (onCommentCountChange) onCommentCountChange(list.length);

    const savedName = getSavedNickname();
    if (savedName) {
      if (isEn && /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(savedName)) {
        const randomEn = PRESET_NICKNAMES_EN[Math.floor(Math.random() * PRESET_NICKNAMES_EN.length)];
        setNickname(randomEn);
        saveNickname(randomEn);
      } else {
        setNickname(savedName);
      }
    } else {
      const presets = isEn ? PRESET_NICKNAMES_EN : PRESET_NICKNAMES_KO;
      const randomPreset = presets[Math.floor(Math.random() * presets.length)];
      setNickname(randomPreset);
    }
  }, [articleId, isEn]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (!content.trim()) {
      setErrorMessage(
        isEn
          ? "Please type your clinical perspective or health insight below!"
          : "의학적 견해나 건강 실천 의견을 아래 입력창에 작성해주세요!"
      );
      textareaRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    const defaultAnonymous = isEn ? "Health Researcher" : "건강 연구자";
    const chosenName = nickname.trim() || defaultAnonymous;
    saveNickname(chosenName);

    const randomGradient = AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];
    const newComment = addArticleComment(articleId, chosenName, content.trim(), randomGradient);

    const updated = [newComment, ...comments];
    setComments(updated);
    setContent("");
    setIsSubmitting(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);

    if (onCommentCountChange) onCommentCountChange(updated.length);
  };

  const handleDelete = (commentId: string) => {
    deleteArticleComment(articleId, commentId);
    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);
    if (onCommentCountChange) onCommentCountChange(updated.length);
  };

  const handleLike = (commentId: string) => {
    likeArticleComment(articleId, commentId);
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c))
    );
  };

  const handleQuickStarter = (starterText: string) => {
    setContent(starterText);
    setErrorMessage("");
    textareaRef.current?.focus();
  };

  const formatCommentDate = (isoStr: string) => {
    try {
      if (isEn) {
        return formatDistanceToNow(new Date(isoStr), { addSuffix: true });
      }
      return formatDistanceToNow(new Date(isoStr), { addSuffix: true, locale: ko });
    } catch {
      return isEn ? "Just now" : "방금 전";
    }
  };

  const quickStarters = isEn ? QUICK_STARTERS_EN : QUICK_STARTERS_KO;
  const presets = isEn ? PRESET_NICKNAMES_EN : PRESET_NICKNAMES_KO;

  return (
    <div className="pt-6 border-t border-sage-200/80 dark:border-slate-800">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-800">
            <Stethoscope className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-wide">
            {isEn ? "Evidence-Based Peer & Citizen Discussion" : "근거 기반 전문의 & 독자 임상 토론"}
          </h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-sage-50 dark:bg-slate-800 text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-slate-700">
            {comments.length}
          </span>
        </div>

        <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-sage-500" />
          {isEn ? "Peer-Reviewed Space" : "클린 헬스 공론장"}
        </span>
      </div>

      {/* Preset Badges */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-slate-400 font-semibold mr-1">
          {isEn ? "Persona Role:" : "추천 역할:"}
        </span>
        {presets.slice(0, 4).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setNickname(p)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
              nickname === p
                ? "bg-sage-600 text-white border-sage-600 shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sage-300"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
            <User className="w-3.5 h-3.5 text-sage-600" />
            <span>{isEn ? "Handle:" : "닉네임:"}</span>
          </div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={isEn ? "Enter your handle..." : "닉네임을 입력하세요..."}
            className="w-full max-w-xs px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs font-bold text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-sage-500"
          />
        </div>

        {/* Quick Starters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-slate-400 font-medium">
            {isEn ? "💡 Clinical Starters:" : "💡 빠른 임상 의견:"}
          </span>
          {quickStarters.map((starter, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickStarter(starter)}
              className="text-[10px] px-2.5 py-1 rounded-lg bg-sage-50 dark:bg-sage-950/40 hover:bg-sage-100 text-sage-800 dark:text-sage-300 border border-sage-200 dark:border-sage-800 transition-all font-medium text-left"
            >
              {starter}
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            rows={3}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={
              isEn
                ? "Share your medical interpretation, nutrition experience, or clinical insight..."
                : "논문 결과에 대한 의학적 해석, 생활 속 섭취 경험 또는 건강 팁을 공유해주세요..."
            }
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-sage-500 dark:focus:border-sage-500 focus:bg-white dark:focus:bg-slate-900 resize-none transition-all"
          />

          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 py-1 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successToast && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 py-1 font-medium animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isEn ? "Health statement registered successfully!" : "의견이 헬스 포럼에 등록되었습니다!"}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-400">
              {content.length} {isEn ? "chars (Ctrl+Enter to post)" : "자 (Ctrl+Enter로 등록)"}
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sage-600 to-emerald-600 hover:from-sage-500 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-sage-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isEn ? "Post Insight" : "의견 등록"}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs font-medium">
            <Apple className="w-6 h-6 mx-auto mb-2 text-slate-400" />
            <p>{isEn ? "No comments posted yet. Be the first to share an evidence-based perspective!" : "아직 등록된 의견이 없습니다. 위의 추천 의견을 눌러 첫 임상 인사이트를 남겨보세요!"}</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-2 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-tr ${
                      comment.avatarColor || "from-sage-500 to-emerald-600"
                    } text-white font-black text-xs flex items-center justify-center shadow-xs`}
                  >
                    {comment.author.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                    {comment.author}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formatCommentDate(comment.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sage-50 dark:hover:bg-sage-950 text-slate-600 dark:text-slate-300 hover:text-sage-600 font-semibold transition-all"
                    title={isEn ? "Helpful insight" : "도움이 돼요"}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.likes || 0}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                    title={isEn ? "Delete" : "삭제"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap pl-9 font-medium">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
