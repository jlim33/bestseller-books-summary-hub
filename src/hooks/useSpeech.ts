import { useState, useEffect, useCallback, useRef } from "react";

export type VoicePersona =
  | "ko-male-anchor"
  | "us-female-anchor";

export interface SpeechOptions {
  locale?: "en" | "ko";
  persona?: VoicePersona;
  rate?: number;
  pitch?: number;
  onSentenceChange?: (sentenceIndex: number, sentenceText: string) => void;
  onComplete?: () => void;
}

function splitTextIntoSentences(text: string): string[] {
  const cleaned = text
    .replace(/["""]/g, '"')
    .replace(/[''']/g, "'")
    .replace(/•/g, " ")
    .replace(/\*/g, "")
    .replace(/#/g, "")
    .replace(/—/g, ", ")
    .replace(/~/g, " ")
    .replace(/\r\n/g, "\n")
    .trim();

  const raw = cleaned.split(/(?<=[.!?;\n])\s+/);
  const result: string[] = [];

  for (let s of raw) {
    s = s.trim();
    if (!s || s.length === 0) continue;

    // If a single sentence is very long (> 150 chars), sub-divide at commas
    if (s.length > 150) {
      const subParts = s.split(/(?<=[,])\s+/);
      for (const part of subParts) {
        if (part.trim().length > 0) {
          result.push(part.trim());
        }
      }
    } else {
      result.push(s);
    }
  }

  return result.length > 0 ? result : [cleaned];
}

export function useSpeech(defaultLocale: "en" | "ko" = "ko") {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(true);
  const [activeVoiceName, setActiveVoiceName] = useState<string>("🎙️ 전문 남성 앵커 (고음질)");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [totalSentences, setTotalSentences] = useState<number>(0);
  const [currentSentenceText, setCurrentSentenceText] = useState<string>("");
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(
    defaultLocale === "en" ? "us-female-anchor" : "ko-male-anchor"
  );
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  const sentencesRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);
  const isCancelledRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const optionsRef = useRef<SpeechOptions>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audio.autoplay = false;
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  const playSentence = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !audioRef.current) return;
      if (isCancelledRef.current || index >= sentencesRef.current.length) {
        setIsSpeaking(false);
        setIsPaused(false);
        isPausedRef.current = false;
        setCurrentSentenceIndex(0);
        setCurrentSentenceText("");
        if (optionsRef.current.onComplete) {
          optionsRef.current.onComplete();
        }
        return;
      }

      const sentence = sentencesRef.current[index];
      if (!sentence || sentence.trim().length === 0) {
        playSentence(index + 1);
        return;
      }

      currentIndexRef.current = index;
      setCurrentSentenceIndex(index + 1);
      setCurrentSentenceText(sentence);
      setIsSpeaking(true);
      setIsPaused(false);
      isPausedRef.current = false;

      if (optionsRef.current.onSentenceChange) {
        optionsRef.current.onSentenceChange(index + 1, sentence);
      }

      const locale = optionsRef.current.locale || defaultLocale;
      const hasKorean = /[가-힣]/.test(sentence);
      const isKo = locale === "ko" || (locale !== "en" && hasKorean);
      const voiceKey: "ko-male" | "en-female" = isKo ? "ko-male" : "en-female";
      const rate = optionsRef.current.rate || playbackRate;

      setSelectedPersona(isKo ? "ko-male-anchor" : "us-female-anchor");
      setActiveVoiceName(isKo ? "🎙️ 전문 남성 앵커 (한국어)" : "🎙️ US Broadcast Anchor (Female)");

      const audio = audioRef.current;
      const targetUrl = `/api/tts?voice=${voiceKey}&text=${encodeURIComponent(sentence.slice(0, 180))}`;

      audio.src = targetUrl;
      audio.playbackRate = rate;

      audio.onended = () => {
        if (!isCancelledRef.current && !isPausedRef.current) {
          // Natural 110ms breathing pause between sentences
          setTimeout(() => {
            playSentence(index + 1);
          }, 110);
        }
      };

      audio.onerror = (err) => {
        console.warn("TTS sentence playback notice, advancing:", err);
        if (!isCancelledRef.current && !isPausedRef.current) {
          playSentence(index + 1);
        }
      };

      audio.play().catch((err) => {
        console.warn("Audio play notice:", err);
      });
    },
    [defaultLocale, playbackRate]
  );

  // Primary speak method: dynamically reads ANY text sentence by sentence
  const speak = useCallback(
    (text: string, options: SpeechOptions | ("ko" | "en") = defaultLocale) => {
      if (typeof window === "undefined" || !audioRef.current) return;

      const resolvedOptions: SpeechOptions =
        typeof options === "string" ? { locale: options } : options;

      optionsRef.current = resolvedOptions;
      isCancelledRef.current = false;
      isPausedRef.current = false;

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const chunks = splitTextIntoSentences(text);
      sentencesRef.current = chunks;
      setTotalSentences(chunks.length);
      currentIndexRef.current = 0;

      const rate = resolvedOptions.rate || playbackRate;
      setPlaybackRate(rate);

      playSentence(0);
    },
    [defaultLocale, playbackRate, playSentence]
  );

  const stop = useCallback(() => {
    isCancelledRef.current = true;
    isPausedRef.current = false;
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
    setCurrentSentenceText("");
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      isPausedRef.current = true;
      setIsPaused(true);
      setIsSpeaking(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && isPausedRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
      setIsSpeaking(true);
      audioRef.current.play().catch(() => {
        playSentence(currentIndexRef.current);
      });
    }
  }, [playSentence]);

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
    currentSentenceText,
    selectedPersona,
    playbackRate,
    changePersona,
    changeRate,
  };
}
