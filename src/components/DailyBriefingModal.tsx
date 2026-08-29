"use client";

import React, { useState } from "react";
import {
  X,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  CheckCircle2,
  Copy,
  Clock,
  Layers,
  ArrowRight,
  Mic,
  Gauge
} from "lucide-react";
import { BookItem } from "@/lib/types";
import { useSpeech, VoicePersona } from "@/hooks/useSpeech";

interface DailyBriefingModalProps {
  books: BookItem[];
  onClose: () => void;
  locale?: "ko" | "en";
  onSelectBook: (book: BookItem) => void;
}

export function DailyBriefingModal({
  books,
  onClose,
  locale = "ko",
  onSelectBook,
}: DailyBriefingModalProps) {
  const isEn = locale === "en";
  const {
    speak,
    stop,
    isSpeaking,
    selectedPersona,
    playbackRate,
    changePersona,
    changeRate,
    currentSentenceIndex,
    totalSentences,
    activeVoiceName
  } = useSpeech(locale);
  const [copied, setCopied] = useState(false);

  const digestContent = isEn
    ? `Executive 5-Minute Cross-Disciplinary Book Digest:
1. AI & IT (Life 3.0): Life evolves from biological (1.0) to cultural (2.0) and technological (3.0). Value alignment is humanity's highest priority.
2. Chip War: Advanced semiconductors are the geopolitical bedrock of power; lithography chokepoints determine the world order.
3. Science (A Brief History of Time): Spacetime is dynamic and curved; black holes evaporate via quantum radiation.
4. Philosophy (Meditations): Control what is within your power and love your fate. What stands in the way becomes the way.
5. Mathematics (Infinite Powers): Calculus unlocks continuous reality by analyzing infinitesimal slices to predict the universe and power AI.
6. Health (Outlive): Prevent chronic diseases 30 years before onset via Zone 2 cardio, muscle mass, and optimal metabolic biomarkers.
7. Habits (Atomic Habits): 1% daily marginal gains compound into 37x annual improvement. Systems determine outcomes.`
    : `오늘의 5대 분야 글로벌 명저 핵심 요약 다이제스트:
1. AI & IT (라이프 3.0): 생명은 생물학(1.0)과 인간(2.0)을 넘어 스스로 신체와 지능을 재설계하는 AGI(3.0)로 진화합니다. 가치 정렬이 최우선 과제입니다.
2. 반도체 (칩워): 현대 패권의 핵심은 석유가 아닌 실리콘 칩이며, 나노미터 공급망을 쥐는 자가 세계를 지배합니다.
3. 과학 (시간의 역사): 시공간은 고정된 무대가 아닌 역동적 기하학이며, 블랙홀은 호킹 복사로 증발합니다.
4. 철학 (명상록): 통제할 수 없는 외부 사건에 연연하지 말고 내면의 판단을 다스리십시오. 장애물이 곧 길이 됩니다.
5. 수학 (미적분의 힘): 복잡한 문제를 무한히 잘게 쪼개어 분석하는 미적분이 인공지능과 우주 물리학을 가능케 했습니다.
6. 건강 (아웃리브): 질병이 생기기 30년 전부터 Zone 2 유산소 운동과 근육량 저축으로 건강수명을 지키십시오.
7. 습관 (아주 작은 습관의 힘): 매일 1%의 개선이 1년 후 37배의 복리 성장을 만듭니다. 목표 대신 시스템에 집중하십시오.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(digestContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListen = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(digestContent, {
        locale: isEn ? "en" : "ko",
        persona: selectedPersona,
        rate: playbackRate,
        bookId: "briefing",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-amber-500/40 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-amber-50/70 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {isEn ? "Daily 5-Minute Executive Book Digest" : "오늘의 5분 명저 총괄 브리핑"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isEn ? "Cross-disciplinary synthesis across AI, Science, Philosophy & Longevity" : "AI, 과학, 철학, 수학, 의학, 습관 6대 분야 핵심 정수"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
          
          {/* Voice Controls Bar */}
          <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-slate-850 border border-amber-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-amber-600" />
                <span>{isEn ? "Voice:" : "음성 선택:"}</span>
              </span>
              {isEn ? (
                <div className="flex items-center gap-1 font-bold text-[10px]">
                  <button
                    onClick={() => changePersona("us-female-anchor")}
                    className={`px-2 py-1 rounded-lg border transition-all ${
                      selectedPersona === "us-female-anchor"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    🎙️ Anchor
                  </button>
                  <button
                    onClick={() => changePersona("us-male-executive")}
                    className={`px-2 py-1 rounded-lg border transition-all ${
                      selectedPersona === "us-male-executive"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    🎙️ Executive
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 font-bold text-[10px]">
                  <button
                    onClick={() => changePersona("ko-female-anchor")}
                    className={`px-2 py-1 rounded-lg border transition-all ${
                      selectedPersona === "ko-female-anchor"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    🎙️ 여성 아나운서
                  </button>
                  <button
                    onClick={() => changePersona("ko-male-anchor")}
                    className={`px-2 py-1 rounded-lg border transition-all ${
                      selectedPersona === "ko-male-anchor"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    🎙️ 남성 앵커
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 font-mono font-bold text-[10px]">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1 mr-1">
                <Gauge className="w-3 h-3 text-slate-400" />
                {isEn ? "Speed:" : "배속:"}
              </span>
              {[0.9, 0.98, 1.15, 1.3].map((r) => (
                <button
                  key={r}
                  onClick={() => changeRate(r)}
                  className={`px-1.5 py-0.5 rounded-lg transition-all ${
                    playbackRate === r
                      ? "bg-amber-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {r === 0.98 ? "1.0x" : `${r}x`}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-850 border border-amber-200/60 dark:border-slate-800 font-mono leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
            {digestContent}
          </div>

          {/* Quick Book Pick List */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {isEn ? "Jump into Book Summaries:" : "원하는 도서 챕터 바로 읽기:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {books.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    onClose();
                    onSelectBook(b);
                  }}
                  className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-left transition-all flex items-center justify-between gap-2"
                >
                  <span className="font-bold text-xs truncate">{b.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-2">
          <button
            onClick={handleListen}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-500/20"
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>
              {isSpeaking
                ? (isEn ? `Speaking (${currentSentenceIndex}/${totalSentences}) • Stop` : `음성 낭독 중 (${currentSentenceIndex}/${totalSentences}) • 정지`)
                : (isEn ? "🎙️ Listen in US Native Voice" : "🎙️ 미국 네이티브 음성 다이제스트")}
            </span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isEn ? "Copied!" : "복사 완료!") : (isEn ? "Copy Digest" : "텍스트 복사")}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
