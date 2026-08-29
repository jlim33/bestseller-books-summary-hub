import { useState, useEffect, useCallback, useRef } from "react";
import { getStudioNarrationUrl } from "@/lib/studioNarration";

export type VoicePersona =
  | "ko-female-anchor"
  | "ko-male-anchor"
  | "ko-book-narrator"
  | "us-male-executive"
  | "us-female-anchor"
  | "us-natural-studio";

export interface SpeechOptions {
  locale?: "en" | "ko";
  persona?: VoicePersona;
  rate?: number;
  pitch?: number;
  bookId?: string;
  chapterNumber?: number;
}

export function useSpeech(defaultLocale: "en" | "ko" = "en") {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(true);
  const [activeVoiceName, setActiveVoiceName] = useState<string>("스튜디오 AI 앵커 (MP3)");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [totalSentences, setTotalSentences] = useState<number>(0);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(
    defaultLocale === "ko" ? "ko-male-anchor" : "us-male-executive"
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
        console.warn("Studio audio error, stopping playback");
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

  // Primary speak method: plays real studio-recorded AI MP3 audio files directly
  const speak = useCallback(
    (text: string, options: SpeechOptions | ("ko" | "en") = defaultLocale) => {
      if (typeof window === "undefined" || !audioRef.current) return;

      const resolvedOptions: SpeechOptions =
        typeof options === "string" ? { locale: options } : options;

      optionsRef.current = resolvedOptions;
      const persona = resolvedOptions.persona || selectedPersona;
      const rate = resolvedOptions.rate || playbackRate;

      if (resolvedOptions.persona) setSelectedPersona(resolvedOptions.persona);
      if (resolvedOptions.rate) setPlaybackRate(resolvedOptions.rate);

      isCancelledRef.current = false;
      audioRef.current.pause();

      // Determine voice key
      let voiceKey: "ko-male" | "ko-female" | "en-male" | "en-female" = "ko-male";
      if (persona === "ko-male-anchor" || persona === "ko-book-narrator") {
        voiceKey = "ko-male";
        setActiveVoiceName("스튜디오 남성 앵커 (고음질 MP3)");
      } else if (persona === "ko-female-anchor") {
        voiceKey = "ko-female";
        setActiveVoiceName("스튜디오 여성 아나운서 (고음질 MP3)");
      } else if (persona === "us-male-executive") {
        voiceKey = "en-male";
        setActiveVoiceName("Studio US Executive (MP3)");
      } else {
        voiceKey = "en-female";
        setActiveVoiceName("Studio US Anchor (MP3)");
      }

      // 1. Check if we have a direct book summary or briefing pre-rendered MP3
      const bookId = resolvedOptions.bookId || "";
      const targetAudioUrl = bookId
        ? getStudioNarrationUrl(bookId, voiceKey)
        : `/api/tts?voice=${voiceKey}&text=${encodeURIComponent(text.slice(0, 150))}`;

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
          console.warn("Studio MP3 playback notice, falling back to streaming API:", err);
          // Fallback to /api/tts streaming
          if (audioRef.current) {
            audioRef.current.src = `/api/tts?voice=${voiceKey}&text=${encodeURIComponent(text.slice(0, 150))}`;
            audioRef.current.play().catch(() => {});
          }
        });
    },
    [defaultLocale, playbackRate, selectedPersona]
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
      if (isSpeaking && audioRef.current) {
        // Switch voice on the fly
        const currentText = sentencesRef.current[0] || "베스트셀러 브리핑입니다.";
        speak(currentText, { ...optionsRef.current, persona });
      }
    },
    [isSpeaking, speak]
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
