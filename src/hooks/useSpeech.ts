import { useState, useEffect, useCallback, useRef } from "react";

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
  rate?: number; // 0.85 to 1.5
  pitch?: number; // 0.6 to 1.3
}

// Check if a voice is an explicit male profile
export const isExplicitMaleVoice = (voice: SpeechSynthesisVoice | null): boolean => {
  if (!voice) return false;
  const n = voice.name.toLowerCase();
  return (
    n.includes("injoon") ||
    n.includes("in-joon") ||
    n.includes("hyunsu") ||
    n.includes("minho") ||
    n.includes("seungwoo") ||
    n.includes("male") ||
    n.includes("man") ||
    n.includes("guy") ||
    n.includes("david") ||
    n.includes("alex") ||
    n.includes("mark") ||
    n.includes("george")
  );
};

export function useSpeech(defaultLocale: "en" | "ko" = "en") {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [activeVoiceName, setActiveVoiceName] = useState<string>("현지 전문 아나운서");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [totalSentences, setTotalSentences] = useState<number>(0);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(
    defaultLocale === "ko" ? "ko-female-anchor" : "us-male-executive"
  );
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
    (locale: "en" | "ko" = "en", persona: VoicePersona = "ko-female-anchor"): SpeechSynthesisVoice | null => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return null;

      if (locale === "ko" || persona.startsWith("ko-")) {
        // Korean native voices
        const koVoices = voices.filter(
          (v) => v.lang === "ko-KR" || v.lang.startsWith("ko_KR") || v.lang.startsWith("ko")
        );

        if (persona === "ko-male-anchor") {
          // Priority 1: Explicit Korean Male Voices (InJoon, Hyunsu, Minho, Seungwoo, Google Male)
          const explicitMaleKo = koVoices.find((v) => isExplicitMaleVoice(v));
          if (explicitMaleKo) return explicitMaleKo;

          // Priority 2: Standard Korean voice (will apply deep pitch modulation to 0.68)
          if (koVoices.length > 0) return koVoices[0];
        } else if (persona === "ko-female-anchor") {
          // Female Announcer (SunHi Natural, Google Female, Yuna, Heami, Sora)
          const femaleKo = koVoices.find(
            (v) =>
              (v.name.includes("SunHi") ||
                v.name.includes("Sun-Hi") ||
                v.name.includes("Yuna") ||
                v.name.includes("Heami") ||
                v.name.includes("Sora") ||
                (v.name.includes("Google") && (v.name.includes("Female") || v.name.includes("한국어")))) &&
              !isExplicitMaleVoice(v)
          );
          if (femaleKo) return femaleKo;
        } else if (persona === "ko-book-narrator") {
          // Warm Audiobook Narrator
          const naturalKo = koVoices.find(
            (v) =>
              v.name.includes("Natural") ||
              v.name.includes("SunHi") ||
              v.name.includes("Google") ||
              v.name.includes("Yuna")
          );
          if (naturalKo) return naturalKo;
        }

        return koVoices[0] || voices.find((v) => v.lang.startsWith("ko")) || voices[0];
      } else {
        // US English native voices
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
              !isExplicitMaleVoice(v)
          );
          if (femaleUS) return femaleUS;
        } else if (persona === "us-male-executive") {
          const maleUS = usVoices.find((v) => isExplicitMaleVoice(v));
          if (maleUS) return maleUS;
        }

        const naturalUS = usVoices.find(
          (v) =>
            v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Premium") ||
            v.name.includes("Enhanced")
        );
        if (naturalUS) return naturalUS;

        return usVoices[0] || voices.find((v) => v.lang.startsWith("en")) || voices[0];
      }
    },
    []
  );

  // Play a single sentence utterance with calibrated announcer cadence and pitch transposition
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

      const locale = optionsRef.current.locale || defaultLocale;
      const persona = optionsRef.current.persona || selectedPersona;
      const rate = optionsRef.current.rate || playbackRate;

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getBestVoice(locale, persona);
      const hasExplicitMale = isExplicitMaleVoice(voice);

      if (voice) {
        utterance.voice = voice;
        let displayName = voice.name.replace("Microsoft ", "").replace("Google ", "");
        if (persona === "ko-male-anchor" && !hasExplicitMale) {
          displayName = `${displayName} (중저음 앵커 톤)`;
        }
        setActiveVoiceName(displayName);
      }

      utterance.lang = locale === "en" ? "en-US" : "ko-KR";
      utterance.rate = rate;

      // Precision Pitch Calibration for Real Gender & Tone Distinction
      if (persona === "ko-male-anchor") {
        // If system already has a dedicated male voice (like InJoon), use pitch 0.88
        // If falling back to universal voice (like Google 한국어), pitch down to 0.68 for deep male resonance!
        utterance.pitch = hasExplicitMale ? 0.88 : 0.68;
        utterance.rate = rate * 0.94; // slightly slower, authoritative cadence
      } else if (persona === "ko-female-anchor") {
        utterance.pitch = 1.08; // Bright, crisp, articulate female broadcast pitch
        utterance.rate = rate * 1.0;
      } else if (persona === "ko-book-narrator") {
        utterance.pitch = 0.85; // Warm, deep, relaxed storytelling baritone
        utterance.rate = rate * 0.92;
      } else if (persona === "us-male-executive") {
        utterance.pitch = hasExplicitMale ? 0.92 : 0.72;
      } else if (persona === "us-female-anchor") {
        utterance.pitch = 1.08;
      } else {
        utterance.pitch = 1.0;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setCurrentSentenceIndex(index + 1);
        sentenceIndexRef.current = index;
      };

      utterance.onend = () => {
        if (!isCancelledRef.current) {
          // Announcer breathing pause between sentences
          const pauseDuration = persona === "ko-book-narrator" ? 170 : 130;
          setTimeout(() => {
            speakSentence(index + 1);
          }, pauseDuration);
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
    [getBestVoice, playbackRate, selectedPersona, defaultLocale]
  );

  // Primary speak entry point with intelligent Korean & English text chunking
  const speak = useCallback(
    (text: string, options: SpeechOptions | ("ko" | "en") = defaultLocale) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();
      isCancelledRef.current = false;

      const resolvedOptions: SpeechOptions =
        typeof options === "string" ? { locale: options } : options;

      optionsRef.current = resolvedOptions;
      if (resolvedOptions.persona) setSelectedPersona(resolvedOptions.persona);
      if (resolvedOptions.rate) setPlaybackRate(resolvedOptions.rate);

      // Clean text for natural broadcast enunciation
      const cleaned = text
        .replace(/["""]/g, '"')
        .replace(/[''']/g, "'")
        .replace(/•/g, " ")
        .replace(/\*/g, "")
        .replace(/#/g, "")
        .replace(/—/g, ", ")
        .replace(/~/g, " ")
        .replace(/\n+/g, ". ");

      // Split sentences cleanly by punctuation (. ! ? ; \n)
      const rawSentences = cleaned.split(/(?<=[.?!;])\s+/);
      const chunks = rawSentences
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !/^[\s.,!?;]+$/.test(s));

      sentencesRef.current = chunks.length > 0 ? chunks : [cleaned];
      setTotalSentences(sentencesRef.current.length);
      sentenceIndexRef.current = 0;

      speakSentence(0);
    },
    [speakSentence, defaultLocale]
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
      optionsRef.current.persona = persona;
      if (isSpeaking) {
        const currentIndex = sentenceIndexRef.current;
        window.speechSynthesis.cancel();
        speakSentence(currentIndex);
      }
    },
    [isSpeaking, speakSentence]
  );

  const changeRate = useCallback(
    (rate: number) => {
      setPlaybackRate(rate);
      optionsRef.current.rate = rate;
      if (isSpeaking) {
        const currentIndex = sentenceIndexRef.current;
        window.speechSynthesis.cancel();
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
