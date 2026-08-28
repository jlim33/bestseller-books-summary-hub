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
  ChevronDown
} from "lucide-react";
import { useHealingAudio } from "@/hooks/useHealingAudio";
import { AudioTrack } from "@/lib/types";

interface HealingSoundPlayerProps {
  locale?: "ko" | "en";
}

export function HealingSoundPlayer({ locale = "ko" }: HealingSoundPlayerProps) {
  const {
    isPlaying,
    isLoading,
    currentTrack,
    tracks,
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
  } = useHealingAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const isEn = locale === "en";

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "classical":
        return <Music className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />;
      case "chanson":
        return <Coffee className="w-3.5 h-3.5 text-peach-500" />;
      case "meditation":
        return <Sparkles className="w-3.5 h-3.5 text-lavender-500" />;
      case "nature":
        return <CloudRain className="w-3.5 h-3.5 text-calmsky-500" />;
      default:
        return <Music className="w-3.5 h-3.5 text-sage-600" />;
    }
  };

  return (
    <div className="relative">
      
      {/* Mini Player Capsule */}
      <div className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-2xl bg-sage-50/90 dark:bg-slate-900/90 border border-sage-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md">
        
        {/* Previous Track */}
        <button
          onClick={selectPrevTrack}
          className="p-1 rounded-lg text-slate-400 hover:text-sage-600 transition-colors hidden sm:block"
          title={isEn ? "Previous song" : "이전 곡"}
        >
          <SkipBack className="w-3 h-3" />
        </button>

        {/* Play/Pause Button with Pulsing Wave */}
        <button
          onClick={togglePlay}
          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-sage-600 text-white shadow-sm shadow-sage-500/25 scale-105"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sage-200 dark:border-slate-700 hover:text-sage-600"
          }`}
          title={isPlaying ? (isEn ? "Pause Relaxing Music" : "힐링 BGM 일시정지") : (isEn ? "Play Relaxing Music" : "마음의 안정 BGM 재생")}
        >
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-sage-600 border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Next Track */}
        <button
          onClick={selectNextTrack}
          className="p-1 rounded-lg text-slate-400 hover:text-sage-600 transition-colors"
          title={isEn ? "Next song" : "다음 곡"}
        >
          <SkipForward className="w-3 h-3" />
        </button>

        {/* Track Title */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 cursor-pointer select-none max-w-[120px] sm:max-w-[180px]"
        >
          <span className="hidden sm:inline">
            {getCategoryIcon(currentTrack.category)}
          </span>
          <div className="truncate">
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
              {currentTrack.title}
            </p>
            <p className="text-[9px] text-sage-600 dark:text-sage-400 font-semibold truncate flex items-center gap-1">
              {isPlaying ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isEn ? "Continuous Autoplay" : "연속 자동 재생 중"}</span>
                </>
              ) : isEn ? "Relaxation BGM" : "힐링 음악 라운지"}
            </p>
          </div>
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-lg text-slate-400 hover:text-sage-600 transition-colors"
          title={isEn ? "Open Sound Lounge" : "사운드 채널 선택"}
        >
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Sound Lounge Modal / Dropdown */}
      {isExpanded && (
        <div className="absolute right-0 top-12 z-50 w-72 sm:w-84 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-sage-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex items-center justify-between pb-3 border-b border-sage-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                  {isEn ? "Healing Audio Lounge" : "마음의 안정 힐링 라운지"}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {isEn ? "Continuous Autoplay Playlist (Classical, Chanson, 528Hz & Rain)" : "클래식, 샹송, 528Hz 명상 및 자연 빗소리 전곡 연속 재생"}
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

          {/* Player Mode Options (Continuous Autoplay / Shuffle) */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-sage-50/60 dark:bg-slate-850 border border-sage-100 dark:border-slate-800 mb-3 text-xs">
            <button
              onClick={toggleAutoAdvance}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold transition-all text-[11px] ${
                autoAdvance
                  ? "bg-sage-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
              }`}
              title={isEn ? "Continuous autoplay all songs in playlist" : "전체 곡 순차 연속 자동 재생"}
            >
              <Repeat className="w-3 h-3" />
              <span>{isEn ? "Autoplay Next Songs" : "다음 곡 연속 재생"}</span>
            </button>

            <button
              onClick={toggleShuffle}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold transition-all text-[11px] ${
                isShuffle
                  ? "bg-lavender-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
              }`}
              title={isEn ? "Shuffle playback" : "랜덤 셔플 재생"}
            >
              <Shuffle className="w-3 h-3" />
              <span>{isEn ? "Shuffle" : "셔플"}</span>
            </button>
          </div>

          {/* Volume Control & Skip Buttons */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 mb-3">
            <button
              onClick={selectPrevTrack}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-sage-600"
              title={isEn ? "Previous song" : "이전 곡"}
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={togglePlay}
              className="p-1 rounded-lg text-sage-600 dark:text-sage-400 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={selectNextTrack}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-sage-600"
              title={isEn ? "Next song" : "다음 곡"}
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleMute}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-sage-600 ml-1"
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
              className="w-full h-1.5 rounded-lg bg-sage-200 dark:bg-slate-700 accent-sage-600 cursor-pointer"
            />
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 w-7 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          {/* Track List */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {tracks.map((track) => {
              const isSelected = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-sage-100/90 dark:bg-sage-950/60 border border-sage-300 dark:border-sage-800 text-sage-900 dark:text-sage-200 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getCategoryIcon(track.category)}
                    <div className="truncate">
                      <p className="text-[11px] font-bold truncate">
                        {track.title}
                      </p>
                      <p className="text-[9px] text-slate-400 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-800 text-slate-500 shrink-0">
                    {track.categoryLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Breathing Animation Banner */}
          <div className="mt-3 pt-2.5 border-t border-sage-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-sage-700 dark:text-sage-400">
            <span className="flex items-center gap-1.5 animate-breathe">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {isEn ? "Continuous Playlist Active (Relax & Breathe)" : "연속 자동 재생 활성화 (마음의 안정과 힐링)"}
            </span>
            <span className="font-mono text-slate-400">{tracks.length} Songs</span>
          </div>

        </div>
      )}

    </div>
  );
}
