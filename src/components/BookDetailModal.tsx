"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Bookmark,
  CheckCircle2,
  Circle,
  Sparkles,
  Layers,
  Lightbulb,
  Target,
  Quote,
  Mic,
  Gauge,
  Headphones,
  Radio
} from "lucide-react";
import { BookItem, ChapterSummary } from "@/lib/types";
import { useSpeech, VoicePersona } from "@/hooks/useSpeech";

interface BookDetailModalProps {
  book: BookItem;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  locale?: "ko" | "en";
}

export function BookDetailModal({
  book,
  onClose,
  isBookmarked,
  onToggleBookmark,
  locale = "ko",
}: BookDetailModalProps) {
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

  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [readingTheme, setReadingTheme] = useState<"clean" | "sepia" | "dark">("clean");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [playingChapterIndex, setPlayingChapterIndex] = useState<number | null>(null);
  const [isAudiobookMode, setIsAudiobookMode] = useState<boolean>(false);

  const toggleChapterComplete = (chapNum: number) => {
    setCompletedChapters((prev) =>
      prev.includes(chapNum) ? prev.filter((n) => n !== chapNum) : [...prev, chapNum]
    );
  };

  const currentChapter = book.chapters[activeChapterIndex];
  const progressPercent = Math.round((completedChapters.length / book.chapters.length) * 100);

  // Play a specific chapter
  const handleListenSpecificChapter = (index: number) => {
    setActiveChapterIndex(index);
    const chap = book.chapters[index];

    if (isSpeaking && playingChapterIndex === index) {
      stop();
      setPlayingChapterIndex(null);
      setIsAudiobookMode(false);
    } else {
      setPlayingChapterIndex(index);
      const script = `${chap.chapterTitle}. ${chap.coreTakeaway}. ${chap.detailedContent}. ${chap.actionableLesson}`;
      speak(script, {
        locale: isEn ? "en" : "ko",
        persona: selectedPersona,
        rate: playbackRate,
        bookId: book.id,
        chapterNumber: chap.chapterNumber,
      });
    }
  };

  // Continuous Full Audiobook Mode (Reads chapter 1 to end)
  const handleListenFullBook = () => {
    if (isSpeaking && isAudiobookMode) {
      stop();
      setIsAudiobookMode(false);
      setPlayingChapterIndex(null);
    } else {
      setIsAudiobookMode(true);
      setActiveChapterIndex(0);
      setPlayingChapterIndex(0);
      const fullScript = book.chapters
        .map(
          (c) =>
            `${c.chapterTitle}. ${c.coreTakeaway}. ${c.detailedContent}. ${c.actionableLesson}`
        )
        .join(" ... Next Chapter ... ");

      speak(fullScript, {
        locale: isEn ? "en" : "ko",
        persona: selectedPersona,
        rate: playbackRate,
        bookId: book.id,
      });
    }
  };

  // Reset playing chapter indicator when speech stops
  useEffect(() => {
    if (!isSpeaking) {
      setPlayingChapterIndex(null);
      setIsAudiobookMode(false);
    }
  }, [isSpeaking]);

  const getThemeBg = () => {
    switch (readingTheme) {
      case "sepia":
        return "bg-[#fbf0d9] text-[#433422] border-amber-300";
      case "dark":
        return "bg-slate-950 text-slate-100 border-slate-800";
      default:
        return "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      
      <div className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${getThemeBg()}`}>
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-amber-200/60 dark:border-slate-800 shrink-0">
          
          {/* Left Meta */}
          <div className="flex items-center gap-2 truncate">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              {book.categoryLabel}
            </span>
            <span className="font-bold text-xs truncate">
              {book.title}
            </span>
          </div>

          {/* Right Reading Tool Actions */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Theme Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs gap-1">
              <button
                onClick={() => setReadingTheme("clean")}
                className={`px-2 py-0.5 rounded-lg font-bold ${
                  readingTheme === "clean" ? "bg-white text-slate-900 shadow-xs" : "text-slate-400"
                }`}
                title="White Paper Theme"
              >
                Paper
              </button>
              <button
                onClick={() => setReadingTheme("sepia")}
                className={`px-2 py-0.5 rounded-lg font-bold ${
                  readingTheme === "sepia" ? "bg-[#f4ecd8] text-[#5f4b32] shadow-xs" : "text-slate-400"
                }`}
                title="Warm Sepia Theme"
              >
                Sepia
              </button>
              <button
                onClick={() => setReadingTheme("dark")}
                className={`px-2 py-0.5 rounded-lg font-bold ${
                  readingTheme === "dark" ? "bg-slate-950 text-white shadow-xs" : "text-slate-400"
                }`}
                title="Dark Theme"
              >
                Dark
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setFontSize(fontSize === "lg" ? "base" : "sm")}
                className="px-1.5 py-0.5 font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Smaller Font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(fontSize === "sm" ? "base" : "lg")}
                className="px-1.5 py-0.5 font-mono font-bold text-slate-800 dark:text-white"
                title="Larger Font"
              >
                A+
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(book.id)}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors ${
                isBookmarked ? "text-amber-500 bg-amber-50 dark:bg-amber-950/60" : "text-slate-400 hover:text-amber-500"
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
          <div
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 dark:divide-slate-800">
          
          {/* Left Sidebar: Chapter List & Mental Models (Col 4) */}
          <div className="lg:col-span-4 p-5 space-y-5 overflow-y-auto max-h-[78vh]">
            
            {/* Book Profile Card */}
            <div className="flex gap-3.5 items-start">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-xl border border-slate-200 dark:border-slate-800 shadow-md shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm sm:text-base leading-tight line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-1">
                  {book.author}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                  {book.authorBio}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-2">
                  <span>{book.chapters.length} Chapters</span>
                  <span>•</span>
                  <span>{completedChapters.length} Read ({progressPercent}%)</span>
                </div>
              </div>
            </div>

            {/* Voice Broadcast & Audiobook Mode */}
            <div className="space-y-2">
              
              {/* 1. Read Current Chapter Button */}
              <button
                onClick={() => handleListenSpecificChapter(activeChapterIndex)}
                className={`w-full py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 font-extrabold text-xs transition-all shadow-md ${
                  isSpeaking && playingChapterIndex === activeChapterIndex
                    ? "bg-rose-600 text-white animate-pulse"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950"
                }`}
              >
                {isSpeaking && playingChapterIndex === activeChapterIndex ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span>
                  {isSpeaking && playingChapterIndex === activeChapterIndex
                    ? (isEn
                        ? `Reading Ch.${activeChapterIndex + 1} (${currentSentenceIndex}/${totalSentences}) • Stop`
                        : `챕터 ${activeChapterIndex + 1} 낭독 중 (${currentSentenceIndex}/${totalSentences}) • 정지`)
                    : (isEn
                        ? `🎙️ Read Chapter ${activeChapterIndex + 1} (US Voice)`
                        : `🎙️ 챕터 ${activeChapterIndex + 1} 아나운서 음성 낭독`)}
                </span>
              </button>

              {/* 2. Read Full Book (Continuous Audiobook Mode) Button */}
              <button
                onClick={handleListenFullBook}
                className={`w-full py-2 px-3 rounded-2xl flex items-center justify-center gap-1.5 font-bold text-[11px] border transition-all ${
                  isAudiobookMode && isSpeaking
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md animate-pulse"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50"
                }`}
              >
                <Headphones className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {isAudiobookMode && isSpeaking
                    ? (isEn ? "Continuous Audiobook Mode Playing • Stop" : "전 챕터 연속 오디오북 재생 중 • 정지")
                    : (isEn ? "🎧 Read All Chapters (Full Audiobook Mode)" : "🎧 전 챕터 연속 오디오북 모드")}
                </span>
              </button>

              {/* Voice Persona & Speed Controls */}
              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-slate-850 border border-amber-200/60 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Mic className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isEn ? "Voice Persona:" : "전문 보이스 스타일:"}</span>
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono truncate max-w-[130px]">
                    {activeVoiceName.replace("Microsoft ", "").replace("Google ", "")}
                  </span>
                </div>

                {/* Voice Persona Display */}
                {isEn ? (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="w-full py-1.5 px-2 rounded-xl bg-amber-600 text-white font-bold text-center shadow-xs flex items-center justify-center gap-1">
                      <span>🎙️</span>
                      <span>US Native Executive Voice (Male)</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="w-full py-1.5 px-2 rounded-xl bg-amber-600 text-white font-bold text-center shadow-xs flex items-center justify-center gap-1">
                      <span>🎙️</span>
                      <span>전문 남성 앵커 (고음질 음성)</span>
                    </span>
                  </div>
                )}

                {/* Playback Speed Controls */}
                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="text-slate-400 font-bold flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-slate-400" />
                    {isEn ? "Speed:" : "배속:"}
                  </span>
                  <div className="flex items-center gap-1 font-mono font-bold">
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
              </div>
            </div>

            {/* Chapters Navigation Accordion / List with Individual Read Buttons */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>{isEn ? "Table of Chapters:" : "전체 챕터 목록:"}</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{book.chapters.length} Chapters</span>
              </p>

              <div className="space-y-1.5">
                {book.chapters.map((chap, idx) => {
                  const isSelected = activeChapterIndex === idx;
                  const isDone = completedChapters.includes(chap.chapterNumber);
                  const isChapterPlaying = isSpeaking && playingChapterIndex === idx;

                  return (
                    <div
                      key={chap.chapterNumber}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-2 border ${
                        isSelected
                          ? "bg-amber-100/90 dark:bg-amber-950/60 border-amber-400 dark:border-amber-700 shadow-xs"
                          : "hover:bg-slate-50 dark:hover:bg-slate-850 border-transparent text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-2 min-w-0 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChapterComplete(chap.chapterNumber);
                          }}
                          className="mt-0.5 text-amber-600 hover:scale-110 transition-transform shrink-0"
                          title={isDone ? "Mark as unread" : "Mark as read"}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                          )}
                        </button>

                        <div className="truncate">
                          <p className="text-xs font-black truncate flex items-center gap-1.5">
                            <span>{chap.chapterTitle}</span>
                            {isChapterPlaying && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-bold animate-pulse">
                                <span>🎙️</span>
                                <span>Playing</span>
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {chap.chapterSubtitle || chap.coreTakeaway}
                          </p>
                        </div>
                      </div>

                      {/* Individual Listen / Read Button for EVERY chapter */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleListenSpecificChapter(idx);
                          }}
                          className={`p-1.5 rounded-xl transition-all ${
                            isChapterPlaying
                              ? "bg-rose-600 text-white shadow-xs scale-110"
                              : "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-slate-700 hover:bg-amber-600 hover:text-white"
                          }`}
                          title={isChapterPlaying ? (isEn ? "Stop reading chapter" : "챕터 낭독 정지") : (isEn ? "Read this chapter" : "이 챕터 음성 낭독")}
                        >
                          {isChapterPlaying ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <span className="text-[10px] font-mono text-slate-400">
                          {chap.readTimeMinutes}m
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Mental Models Box */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-slate-850 border border-amber-200/60 dark:border-slate-800">
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                {isEn ? "Book Mental Models" : "도서 핵심 멘탈 모델"}
              </p>
              <div className="space-y-1">
                {book.keyMentalModels.map((m, i) => (
                  <p key={i} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <span>💡</span>
                    <span>{m}</span>
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Right Main Column: Chapter Deep Dive Content (Col 8) */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[78vh]">
            
            {/* Chapter Header */}
            <div className="border-b border-amber-200/60 dark:border-slate-800 pb-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    Chapter {currentChapter.chapterNumber} of {book.chapters.length}
                  </span>

                  {/* 1-Click Quick Listen Button in Chapter Header */}
                  <button
                    onClick={() => handleListenSpecificChapter(activeChapterIndex)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      isSpeaking && playingChapterIndex === activeChapterIndex
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-600 hover:text-white"
                    }`}
                  >
                    {isSpeaking && playingChapterIndex === activeChapterIndex ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isSpeaking && playingChapterIndex === activeChapterIndex
                        ? (isEn ? "Playing" : "낭독 중")
                        : (isEn ? "Listen Chapter" : "이 챕터 듣기")}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {currentChapter.readTimeMinutes} {isEn ? "min read" : "분 독서"}
                  </span>

                  <button
                    onClick={() => toggleChapterComplete(currentChapter.chapterNumber)}
                    className="flex items-center gap-1 font-bold text-amber-600 hover:text-amber-700"
                  >
                    {completedChapters.includes(currentChapter.chapterNumber) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                        <span>{isEn ? "Completed" : "완독 완료"}</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>{isEn ? "Mark as Read" : "완독 체크"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                {currentChapter.chapterTitle}
              </h2>

              {currentChapter.chapterSubtitle && (
                <p className="text-sm sm:text-base text-amber-600 dark:text-amber-400 font-bold mt-1">
                  {currentChapter.chapterSubtitle}
                </p>
              )}
            </div>

            {/* Golden Core Takeaway Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border-l-4 border-amber-500">
              <p className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {isEn ? "Golden Core Takeaway" : "핵심 골든 테이크어웨이"}
              </p>
              <p className="text-sm sm:text-base font-bold leading-relaxed text-slate-800 dark:text-slate-100">
                "{currentChapter.coreTakeaway}"
              </p>
            </div>

            {/* Key Concepts Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                {isEn ? "Key Chapter Conceptual Frameworks:" : "핵심 챕터 개념 프레임워크:"}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {currentChapter.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium flex items-start gap-2"
                  >
                    <span className="text-amber-500 font-bold shrink-0">✦</span>
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Analytical Chapter Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                {isEn ? "Deep Chapter Analytical Narrative:" : "심층 챕터 해설 및 논증:"}
              </h4>
              <p
                className={`leading-relaxed text-slate-700 dark:text-slate-300 ${
                  fontSize === "lg" ? "text-base sm:text-lg" : fontSize === "sm" ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                }`}
              >
                {currentChapter.detailedContent}
              </p>
            </div>

            {/* Actionable Life Lesson & Application */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
              <p className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                {isEn ? "Actionable Life Application" : "현실 적용 액션 플랜"}
              </p>
              <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 font-bold leading-relaxed">
                {currentChapter.actionableLesson}
              </p>
            </div>

            {/* Famous Direct Quote */}
            {currentChapter.famousQuote && (
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-850 border border-amber-200/60 dark:border-slate-800 italic text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">"{currentChapter.famousQuote}"</p>
                  <p className="text-[10px] text-slate-400 not-italic font-bold mt-1">— {book.author}</p>
                </div>
              </div>
            )}

            {/* Bottom Chapter Navigation Controls */}
            <div className="pt-6 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
                disabled={activeChapterIndex === 0}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  activeChapterIndex === 0
                    ? "opacity-40 cursor-not-allowed border-slate-200"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700"
                }`}
              >
                ← {isEn ? "Previous Chapter" : "이전 챕터"}
              </button>

              <span className="text-xs font-mono text-slate-400 font-bold">
                {activeChapterIndex + 1} / {book.chapters.length}
              </span>

              <button
                onClick={() => {
                  toggleChapterComplete(currentChapter.chapterNumber);
                  if (activeChapterIndex < book.chapters.length - 1) {
                    setActiveChapterIndex(activeChapterIndex + 1);
                  }
                }}
                className="px-5 py-2 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black shadow-md shadow-amber-500/25 transition-all"
              >
                {activeChapterIndex === book.chapters.length - 1
                  ? (isEn ? "Finish Book 🎉" : "도서 완독 완료 🎉")
                  : (isEn ? "Complete & Next Chapter →" : "완독 & 다음 챕터 →")}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
