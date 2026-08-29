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
  Radio,
  SlidersHorizontal
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
    selectTrack,
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

  const getGenreIcon = (category: string) => {
    switch (category) {
      case "classical":
        return <Music className="w-3.5 h-3.5 text-amber-500" />;
      case "chanson":
        return <Coffee className="w-3.5 h-3.5 text-orange-500" />;
      case "meditation":
        return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
      case "nature":
        return <CloudRain className="w-3.5 h-3.5 text-teal-500" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-amber-600" />;
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
          title={isEn ? "Previous track" : "이전 트랙"}
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
          title={isPlaying ? (isEn ? "Pause Music" : "일시정지") : (isEn ? "Play Music" : "음악 재생")}
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
          title={isEn ? "Next track" : "다음 트랙"}
        >
          <SkipForward className="w-3 h-3" />
        </button>

        {/* Track Title & Current Playing State */}
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
                  <span>{isEn ? `${currentTrack.genreEn} • Playing` : `${currentTrack.genreKo} • 재생 중`}</span>
                </>
              ) : (
                <span className="text-slate-400 font-normal">{isEn ? "Paused • Click to Play" : "일시정지됨 (클릭하여 재생)"}</span>
              )}
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
                  {isEn ? "Manual Study & Reading Audio Lounge" : "심층 몰입 독서 오디오 라운지"}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {isEn ? "Select and manually control playback (Play / Pause)" : "원하시는 장르 및 트랙을 수동으로 재생/일시정지 하실 수 있습니다"}
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

          {/* 🎼 Genre Selector Pills */}
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

          {/* Manual Play / Pause / Shuffle Mode Options */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-amber-50/60 dark:bg-slate-850 border border-amber-100 dark:border-slate-800 mb-3 text-xs">
            <button
              onClick={toggleAutoAdvance}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold transition-all text-[11px] ${
                autoAdvance
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
              }`}
              title={isEn ? "Toggle auto-advance to next song on finish" : "곡 종료 시 다음 곡 자동 넘김 설정"}
            >
              <Repeat className="w-3 h-3" />
              <span>{autoAdvance ? (isEn ? "Autoplay Next: ON" : "다음 곡 자동 넘김: 켜짐") : (isEn ? "Autoplay Next: OFF (Manual)" : "다음 곡 자동 넘김: 꺼짐 (수동)")}</span>
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

          {/* Master Volume & Playback Controls */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 mb-3">
            <button
              onClick={selectPrevTrack}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-600"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={togglePlay}
              className={`p-2 rounded-xl transition-transform ${
                isPlaying ? "bg-amber-600 text-white shadow-sm" : "bg-white dark:bg-slate-800 text-amber-600 border border-amber-300 dark:border-slate-700"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
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
              const isTrackPlaying = isPlaying && isSelected;

              return (
                <div
                  key={track.id}
                  onClick={() => selectTrack(track, true)}
                  className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSelected) {
                          togglePlay();
                        } else {
                          playTrack(track);
                        }
                      }}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        isTrackPlaying
                          ? "bg-amber-600 text-white"
                          : "bg-white dark:bg-slate-800 text-amber-600 border border-amber-200 dark:border-slate-700"
                      }`}
                    >
                      {isTrackPlaying ? (
                        <Pause className="w-3 h-3 fill-current" />
                      ) : (
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="truncate">
                      <p className="text-[11px] font-bold truncate">{track.title}</p>
                      <p className="text-[9px] text-slate-400 truncate">{track.artist}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-800 text-slate-500 shrink-0">
                    {track.categoryLabel}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
