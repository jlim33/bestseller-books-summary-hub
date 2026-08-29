import { useState, useEffect, useCallback, useRef } from "react";
import { getStudioNarrationUrl } from "@/lib/studioNarration";

export type VoicePersona =
  | "ko-male-anchor"
  | "us-female-anchor";

export interface SpeechOptions {
  locale?: "en" | "ko";
  persona?: VoicePersona;
  rate?: number;
  pitch?: number;
  bookId?: string;
  chapterNumber?: number;
}

export function useSpeech(defaultLocale: "en" | "ko" = "ko") {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(true);
  const [activeVoiceName, setActiveVoiceName] = useState<string>("🎙️ 전문 남성 앵커 (고음질)");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [totalSentences, setTotalSentences] = useState<number>(0);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(
    defaultLocale === "en" ? "us-female-anchor" : "ko-male-anchor"
  );
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  const sentencesRef = useRef<string[]>([]);
  const sentenceIndexRef = useRef<number>(0);
  const isCancelledRef = useRef<boolean>(false);
  const optionsRef = useRef<SpeechOptions>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audio.autoplay = false;
      audio.onplay = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      audio.onpause = () => {
        setIsSpeaking(false);
      };
      audio.onended = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentSentenceIndex(0);
      };
      audio.onerror = () => {
        console.warn("Studio audio notice, stopping playback");
        setIsSpeaking(false);
        setIsPaused(false);
      };
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  // Primary speak method: Korean is Male Anchor, English is Female Broadcast Anchor
  const speak = useCallback(
    (text: string, options: SpeechOptions | ("ko" | "en") = defaultLocale) => {
      if (typeof window === "undefined" || !audioRef.current) return;

      const resolvedOptions: SpeechOptions =
        typeof options === "string" ? { locale: options } : options;

      optionsRef.current = resolvedOptions;
      sentencesRef.current = [text];

      // Detect language: check explicit locale or Korean characters
      const hasKorean = /[가-힣]/.test(text);
      const isKo = resolvedOptions.locale === "ko" || (resolvedOptions.locale !== "en" && (defaultLocale === "ko" || hasKorean));
      
      const voiceKey: "ko-male" | "en-female" = isKo ? "ko-male" : "en-female";
      setSelectedPersona(isKo ? "ko-male-anchor" : "us-female-anchor");
      setActiveVoiceName(isKo ? "🎙️ 전문 남성 앵커 (한국어)" : "🎙️ US Broadcast Anchor (Female)");

      const rate = resolvedOptions.rate || playbackRate;
      setPlaybackRate(rate);

      isCancelledRef.current = false;
      audioRef.current.pause();

      // Clean text for optimal playback
      const cleanSnippet = text
        .replace(/["""]/g, '"')
        .replace(/[''']/g, "'")
        .replace(/•/g, " ")
        .replace(/\*/g, "")
        .replace(/#/g, "")
        .replace(/—/g, ", ")
        .trim()
        .slice(0, 180);

      // 1. Check if we have a direct book summary or briefing pre-rendered MP3
      const bookId = resolvedOptions.bookId || "";
      const targetAudioUrl = bookId
        ? getStudioNarrationUrl(bookId, voiceKey)
        : `/api/tts?voice=${voiceKey}&text=${encodeURIComponent(cleanSnippet)}`;

      audioRef.current.src = targetAudioUrl;
      audioRef.current.playbackRate = rate;

      audioRef.current
        .play()
        .then(() => {
          setIsSpeaking(true);
          setIsPaused(false);
          setCurrentSentenceIndex(1);
          setTotalSentences(1);
        })
        .catch((err) => {
          console.warn("Studio MP3 playback fallback to /api/tts streaming:", err);
          if (audioRef.current) {
            audioRef.current.src = `/api/tts?voice=${voiceKey}&text=${encodeURIComponent(cleanSnippet)}`;
            audioRef.current.play().catch(() => {});
          }
        });
    },
    [defaultLocale, playbackRate]
  );

  const stop = useCallback(() => {
    isCancelledRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentSentenceIndex(0);
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  }, []);

  const changePersona = useCallback(
    (persona: VoicePersona) => {
      setSelectedPersona(persona);
      optionsRef.current.persona = persona;
    },
    []
  );

  const changeRate = useCallback(
    (rate: number) => {
      setPlaybackRate(rate);
      optionsRef.current.rate = rate;
      if (audioRef.current) {
        audioRef.current.playbackRate = rate;
      }
    },
    []
  );

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    supported,
    availableVoices: [],
    activeVoiceName,
    currentSentenceIndex,
    totalSentences,
    selectedPersona,
    playbackRate,
    changePersona,
    changeRate,
  };
}
