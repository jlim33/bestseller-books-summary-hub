import { useState, useEffect, useCallback, useRef } from "react";

export type VoicePersona = "us-male-executive" | "us-female-anchor" | "us-natural-studio" | "ko-natural";

export interface SpeechOptions {
  locale?: "en" | "ko";
  persona?: VoicePersona;
  rate?: number; // 0.85 to 1.5
  pitch?: number; // 0.9 to 1.1
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [activeVoiceName, setActiveVoiceName] = useState<string>("US Native Voice");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [totalSentences, setTotalSentences] = useState<number>(0);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>("us-male-executive");
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  const sentencesRef = useRef<string[]>([]);
  const sentenceIndexRef = useRef<number>(0);
  const isCancelledRef = useRef<boolean>(false);
  const optionsRef = useRef<SpeechOptions>({});

  // Initialize and load system voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);

      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Find best native voice matching persona & locale
  const getBestVoice = useCallback(
    (locale: "en" | "ko" = "en", persona: VoicePersona = "us-male-executive"): SpeechSynthesisVoice | null => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return null;

      if (locale === "en") {
        const usVoices = voices.filter(
          (v) => v.lang === "en-US" || v.lang.startsWith("en_US") || v.lang.startsWith("en-")
        );

        if (persona === "us-female-anchor") {
          const femaleUS = usVoices.find(
            (v) =>
              (v.name.includes("Aria") ||
                v.name.includes("Jenny") ||
                v.name.includes("Samantha") ||
                v.name.includes("Zira") ||
                v.name.includes("Victoria") ||
                (v.name.includes("Google") && v.name.includes("Female"))) &&
              !v.name.includes("Guy") &&
              !v.name.includes("David")
          );
          if (femaleUS) return femaleUS;
        } else if (persona === "us-male-executive") {
          const maleUS = usVoices.find(
            (v) =>
              v.name.includes("Guy") ||
              v.name.includes("David") ||
              v.name.includes("Mark") ||
              v.name.includes("Alex") ||
              (v.name.includes("Google") && !v.name.includes("Female"))
          );
          if (maleUS) return maleUS;
        }

        // General natural US fallback
        const naturalUS = usVoices.find(
          (v) =>
            v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Premium") ||
            v.name.includes("Enhanced")
        );
        if (naturalUS) return naturalUS;

        return usVoices[0] || voices.find((v) => v.lang.startsWith("en")) || voices[0];
      } else {
        // Korean voices
        const koVoices = voices.filter((v) => v.lang.startsWith("ko"));
        const naturalKo = koVoices.find(
          (v) =>
            v.name.includes("Google") ||
            v.name.includes("Natural") ||
            v.name.includes("Yuna") ||
            v.name.includes("Heami") ||
            v.name.includes("SunHi")
        );
        if (naturalKo) return naturalKo;
        return koVoices[0] || voices[0];
      }
    },
    []
  );

  // Play a single sentence utterance
  const speakSentence = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (isCancelledRef.current || index >= sentencesRef.current.length) {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentSentenceIndex(0);
        return;
      }

      const text = sentencesRef.current[index];
      if (!text || text.trim().length === 0) {
        speakSentence(index + 1);
        return;
      }

      const locale = optionsRef.current.locale || "en";
      const persona = optionsRef.current.persona || selectedPersona;
      const rate = optionsRef.current.rate || playbackRate;

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getBestVoice(locale, persona);
      if (voice) {
        utterance.voice = voice;
        setActiveVoiceName(voice.name);
      }

      utterance.lang = locale === "en" ? "en-US" : "ko-KR";
      utterance.rate = rate;
      utterance.pitch = locale === "en" && persona === "us-male-executive" ? 0.95 : 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setCurrentSentenceIndex(index + 1);
        sentenceIndexRef.current = index;
      };

      utterance.onend = () => {
        if (!isCancelledRef.current) {
          // Small natural cadence pause between sentences
          setTimeout(() => {
            speakSentence(index + 1);
          }, 120);
        }
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        if (!isCancelledRef.current && index + 1 < sentencesRef.current.length) {
          speakSentence(index + 1);
        } else {
          setIsSpeaking(false);
          setIsPaused(false);
        }
      };

      window.speechSynthesis.speak(utterance);
    },
    [getBestVoice, playbackRate, selectedPersona]
  );

  // Primary speak entry point with intelligent chunking
  const speak = useCallback(
    (text: string, options: SpeechOptions | ("ko" | "en") = "en") => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();
      isCancelledRef.current = false;

      const resolvedOptions: SpeechOptions =
        typeof options === "string" ? { locale: options } : options;

      optionsRef.current = resolvedOptions;
      if (resolvedOptions.persona) setSelectedPersona(resolvedOptions.persona);
      if (resolvedOptions.rate) setPlaybackRate(resolvedOptions.rate);

      // Clean text and split by punctuation (. ! ? ; \n) for uninterrupted chunked streaming
      const cleaned = text
        .replace(/["""]/g, '"')
        .replace(/[''']/g, "'")
        .replace(/•/g, " ")
        .replace(/\*/g, "")
        .replace(/#/g, "")
        .replace(/—/g, ", ")
        .replace(/\n+/g, ". ");

      const rawSentences = cleaned.split(/(?<=[.?!;])\s+/);
      const chunks = rawSentences
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !/^[\s.,!?;]+$/.test(s));

      sentencesRef.current = chunks.length > 0 ? chunks : [cleaned];
      setTotalSentences(sentencesRef.current.length);
      sentenceIndexRef.current = 0;

      speakSentence(0);
    },
    [speakSentence]
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      isCancelledRef.current = true;
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSentenceIndex(0);
    }
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const changePersona = useCallback(
    (persona: VoicePersona) => {
      setSelectedPersona(persona);
      if (isSpeaking) {
        const currentIndex = sentenceIndexRef.current;
        window.speechSynthesis.cancel();
        optionsRef.current.persona = persona;
        speakSentence(currentIndex);
      }
    },
    [isSpeaking, speakSentence]
  );

  const changeRate = useCallback(
    (rate: number) => {
      setPlaybackRate(rate);
      if (isSpeaking) {
        const currentIndex = sentenceIndexRef.current;
        window.speechSynthesis.cancel();
        optionsRef.current.rate = rate;
        speakSentence(currentIndex);
      }
    },
    [isSpeaking, speakSentence]
  );

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    supported,
    availableVoices,
    activeVoiceName,
    currentSentenceIndex,
    totalSentences,
    selectedPersona,
    playbackRate,
    changePersona,
    changeRate,
  };
}
