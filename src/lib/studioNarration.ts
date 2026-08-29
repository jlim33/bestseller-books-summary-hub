// Studio Master AI Narration Track Registry

export interface NarrationTrack {
  id: string;
  bookId?: string;
  chapterNumber?: number;
  voice: "ko-male" | "ko-female" | "en-male" | "en-female";
  title: string;
  src: string;
  duration?: string;
}

export const STUDIO_NARRATION_TRACKS: Record<string, NarrationTrack> = {
  // Daily Briefings
  "ko-briefing-male": {
    id: "ko-briefing-male",
    voice: "ko-male",
    title: "5분 명저 총괄 브리핑 (남성 앵커)",
    src: "/audio/narration/ko-briefing-male.mp3"
  },
  "ko-briefing-female": {
    id: "ko-briefing-female",
    voice: "ko-female",
    title: "5분 명저 총괄 브리핑 (여성 아나운서)",
    src: "/audio/narration/ko-briefing-female.mp3"
  },
  "en-briefing-male": {
    id: "en-briefing-male",
    voice: "en-male",
    title: "Executive 5-Min Digest (US Male)",
    src: "/audio/narration/en-briefing-male.mp3"
  },
  "en-briefing-female": {
    id: "en-briefing-female",
    voice: "en-female",
    title: "Executive 5-Min Digest (US Female)",
    src: "/audio/narration/en-briefing-female.mp3"
  },

  // Book Summaries
  "ko-life3-male": {
    id: "ko-life3-male",
    bookId: "life-3-0",
    voice: "ko-male",
    title: "라이프 3.0 (남성 앵커)",
    src: "/audio/narration/ko-life3-summary-male.mp3"
  },
  "ko-life3-female": {
    id: "ko-life3-female",
    bookId: "life-3-0",
    voice: "ko-female",
    title: "라이프 3.0 (여성 아나운서)",
    src: "/audio/narration/ko-life3-summary-female.mp3"
  },
  "ko-chipwar-male": {
    id: "ko-chipwar-male",
    bookId: "chip-war",
    voice: "ko-male",
    title: "칩워 (남성 앵커)",
    src: "/audio/narration/ko-chipwar-summary-male.mp3"
  },
  "ko-chipwar-female": {
    id: "ko-chipwar-female",
    bookId: "chip-war",
    voice: "ko-female",
    title: "칩워 (여성 아나운서)",
    src: "/audio/narration/ko-chipwar-summary-female.mp3"
  },
  "ko-briefhistory-male": {
    id: "ko-briefhistory-male",
    bookId: "a-brief-history-of-time",
    voice: "ko-male",
    title: "시간의 역사 (남성 앵커)",
    src: "/audio/narration/ko-briefhistory-summary-male.mp3"
  },
  "ko-meditations-male": {
    id: "ko-meditations-male",
    bookId: "meditations",
    voice: "ko-male",
    title: "명상록 (남성 앵커)",
    src: "/audio/narration/ko-meditations-summary-male.mp3"
  },
  "ko-infinitepowers-male": {
    id: "ko-infinitepowers-male",
    bookId: "infinite-powers",
    voice: "ko-male",
    title: "미적분의 힘 (남성 앵커)",
    src: "/audio/narration/ko-infinitepowers-summary-male.mp3"
  },
  "ko-outlive-male": {
    id: "ko-outlive-male",
    bookId: "outlive",
    voice: "ko-male",
    title: "아웃리브 (남성 앵커)",
    src: "/audio/narration/ko-outlive-summary-male.mp3"
  },
  "ko-atomichabits-male": {
    id: "ko-atomichabits-male",
    bookId: "atomic-habits",
    voice: "ko-male",
    title: "아주 작은 습관의 힘 (남성 앵커)",
    src: "/audio/narration/ko-atomichabits-summary-male.mp3"
  }
};

export function getStudioNarrationUrl(
  bookIdOrKey: string,
  voice: "ko-male" | "ko-female" | "en-male" | "en-female" = "ko-male"
): string {
  // Check exact key match
  const exactKey = `${voice.startsWith("ko") ? "ko" : "en"}-${bookIdOrKey}-${voice.includes("male") && !voice.includes("female") ? "male" : "female"}`;
  if (STUDIO_NARRATION_TRACKS[exactKey]) {
    return STUDIO_NARRATION_TRACKS[exactKey].src;
  }

  // Check direct key
  const directKey = `${bookIdOrKey}-${voice.includes("male") && !voice.includes("female") ? "male" : "female"}`;
  if (STUDIO_NARRATION_TRACKS[directKey]) {
    return STUDIO_NARRATION_TRACKS[directKey].src;
  }

  // Default fallback to briefing
  return voice.startsWith("ko")
    ? voice === "ko-male"
      ? "/audio/narration/ko-briefing-male.mp3"
      : "/audio/narration/ko-briefing-female.mp3"
    : voice === "en-male"
    ? "/audio/narration/en-briefing-male.mp3"
    : "/audio/narration/en-briefing-female.mp3";
}
