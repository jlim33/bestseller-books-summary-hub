"use client";

import React, { useState } from "react";
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Sparkles,
  Coffee,
  CloudRain,
  Shuffle,
  Repeat,
  ChevronUp,
  ChevronDown,
  BookOpen,
  LayoutGrid,
  Radio
} from "lucide-react";
import { useReadingAudio } from "@/hooks/useReadingAudio";
import { AudioTrack } from "@/lib/types";

export function ReadingSoundPlayer({ locale = "ko" }: { locale?: "ko" | "en" }) {
  const {
    isPlaying,
    isLoading,
    currentTrack,
    tracks,
    genres,
    selectedGenre,
    setSelectedGenre,
    volume,
    isMuted,
    isShuffle,
    autoAdvance,
    playTrack,
    togglePlay,
    setVolume,
    toggleMute,
    selectNextTrack,
    selectPrevTrack,
    toggleShuffle,
    toggleAutoAdvance,
  } = useReadingAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const isEn = locale === "en";

  const getGenreIcon = (genreId: string) => {
    switch (genreId) {
      case "classical":
        return <Music className="w-3.5 h-3.5 text-amber-500" />;
      case "chanson":
        return <Coffee className="w-3.5 h-3.5 text-orange-500" />;
      case "meditation":
        return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
      case "nature":
        return <CloudRain className="w-3.5 h-3.5 text-teal-500" />;
      default:
        return <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const currentGenreMeta = genres.find((g) => g.id === selectedGenre) || genres[0];

  return (
    <div className="relative">
      
      {/* Mini Player Capsule on Header */}
      <div className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-2xl bg-amber-50/90 dark:bg-slate-900/90 border border-amber-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md">
        
        {/* Previous Track */}
        <button
          onClick={selectPrevTrack}
          className="p-1 rounded-lg text-slate-400 hover:text-amber-600 transition-colors hidden sm:block"
          title={isEn ? "Previous song" : "이전 곡"}
        >
          <SkipBack className="w-3 h-3" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-sm shadow-amber-500/25 scale-105"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-amber-200 dark:border-slate-700 hover:text-amber-600"
          }`}
          title={isPlaying ? (isEn ? "Pause Reading Lounge" : "독서 BGM 일시정지") : (isEn ? "Play Reading Music" : "몰입 독서 BGM 재생")}
        >
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Next Track */}
        <button
          onClick={selectNextTrack}
          className="p-1 rounded-lg text-slate-400 hover:text-amber-600 transition-colors"
          title={isEn ? "Next song" : "다음 곡"}
        >
          <SkipForward className="w-3 h-3" />
        </button>

        {/* Track Title & Current Genre */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 cursor-pointer select-none max-w-[120px] sm:max-w-[170px]"
        >
          <span className="hidden sm:inline">
            {getGenreIcon(currentTrack.category)}
          </span>
          <div className="truncate">
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
              {currentTrack.title}
            </p>
            <p className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold truncate flex items-center gap-1">
              {isPlaying ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isEn ? `${currentTrack.genreEn} • Autoplay` : `${currentTrack.genreKo} • 연속 재생 중`}</span>
                </>
              ) : isEn ? "Reading Ambient Lounge" : "북카페 힐링 라운지"}
            </p>
          </div>
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-lg text-slate-400 hover:text-amber-600 transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Categorized Sound Lounge Modal */}
      {isExpanded && (
        <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 p-4 rounded-3xl bg-white/98 dark:bg-slate-900/98 border border-amber-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-amber-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                  {isEn ? "Categorized Study & Reading Lounge" : "장르별 심층 몰입 독서 라운지 BGM"}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {isEn ? "Select your preferred cognitive focus genre" : "원하시는 장르를 선택하여 전곡 연속 재생을 즐겨보세요"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          </div>

          {/* 🎼 Genre Selector Pills (New Feature!) */}
          <div className="space-y-1.5 mb-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-amber-500" />
              <span>{isEn ? "Select Music Genre:" : "음악 장르 카테고리 선택:"}</span>
            </p>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {genres.map((g) => {
                const isSelected = selectedGenre === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGenre(g.id)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-amber-600 text-white shadow-sm scale-105"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50"
                    }`}
                  >
                    {getGenreIcon(g.id)}
                    <span>{isEn ? g.labelEn : g.labelKo}</span>
                  </button>
                );
              })}
            </div>

            {/* Genre Description Banner */}
            <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-slate-850 border border-amber-200/60 dark:border-slate-800 text-[10px] text-amber-800 dark:text-amber-300 flex items-center justify-between">
              <span>{isEn ? currentGenreMeta.descriptionEn : currentGenreMeta.descriptionKo}</span>
              <span className="font-mono font-bold text-slate-400 shrink-0 ml-2">
                {tracks.length} {isEn ? "Tracks" : "곡"}
              </span>
            </div>
          </div>

          {/* Autoplay & Shuffle Toggle */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-amber-50/60 dark:bg-slate-850 border border-amber-100 dark:border-slate-800 mb-3 text-xs">
            <button
              onClick={toggleAutoAdvance}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold transition-all text-[11px] ${
                autoAdvance
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <Repeat className="w-3 h-3" />
              <span>{isEn ? "Continuous Next" : "다음 곡 자동 재생"}</span>
            </button>

            <button
              onClick={toggleShuffle}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold transition-all text-[11px] ${
                isShuffle
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <Shuffle className="w-3 h-3" />
              <span>{isEn ? "Shuffle" : "셔플"}</span>
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 mb-3">
            <button
              onClick={selectPrevTrack}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-600"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={togglePlay}
              className="p-1 rounded-lg text-amber-600 dark:text-amber-400 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={selectNextTrack}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-600"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleMute}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-600 ml-1"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-amber-200 dark:bg-slate-700 accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Categorized Track List */}
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {tracks.map((track) => {
              const isSelected = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getGenreIcon(track.category)}
                    <div className="truncate">
                      <p className="text-[11px] font-bold truncate">{track.title}</p>
                      <p className="text-[9px] text-slate-400 truncate">{track.artist}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-800 text-slate-500 shrink-0">
                    {track.categoryLabel}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
