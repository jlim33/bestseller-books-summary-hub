// Studio Master AI Narration Track Registry

export interface NarrationTrack {
  id: string;
  bookId?: string;
  chapterNumber?: number;
  voice: "ko-male" | "ko-female" | "en-male" | "en-female";
  title: string;
  src: string;
}

export const STUDIO_NARRATION_TRACKS: Record<string, NarrationTrack> = {
  // Daily Briefings
  "ko-briefing-male": {
    id: "ko-briefing-male",
    voice: "ko-male",
    title: "5분 명저 총괄 브리핑 (남성 앵커)",
    src: "/audio/narration/ko-briefing-male.mp3",
  },
  "ko-briefing-female": {
    id: "ko-briefing-female",
    voice: "ko-female",
    title: "5분 명저 총괄 브리핑 (여성 아나운서)",
    src: "/audio/narration/ko-briefing-female.mp3",
  },
  "en-briefing-male": {
    id: "en-briefing-male",
    voice: "en-male",
    title: "Executive 5-Min Digest (US Male)",
    src: "/audio/narration/en-briefing-male.mp3",
  },
  "en-briefing-female": {
    id: "en-briefing-female",
    voice: "en-female",
    title: "Executive 5-Min Digest (US Female)",
    src: "/audio/narration/en-briefing-female.mp3",
  },

  // 1. Life 3.0
  "ko-life-3-0-male": {
    id: "ko-life-3-0-male",
    bookId: "life-3-0",
    voice: "ko-male",
    title: "라이프 3.0 (남성 앵커)",
    src: "/audio/narration/ko-life3-summary-male.mp3",
  },
  "ko-life-3-0-female": {
    id: "ko-life-3-0-female",
    bookId: "life-3-0",
    voice: "ko-female",
    title: "라이프 3.0 (여성 아나운서)",
    src: "/audio/narration/ko-life3-summary-female.mp3",
  },

  // 2. Chip War
  "ko-chip-war-male": {
    id: "ko-chip-war-male",
    bookId: "chip-war",
    voice: "ko-male",
    title: "칩워 (남성 앵커)",
    src: "/audio/narration/ko-chipwar-summary-male.mp3",
  },
  "ko-chip-war-female": {
    id: "ko-chip-war-female",
    bookId: "chip-war",
    voice: "ko-female",
    title: "칩워 (여성 아나운서)",
    src: "/audio/narration/ko-chipwar-summary-female.mp3",
  },

  // 3. A Brief History of Time
  "ko-a-brief-history-of-time-male": {
    id: "ko-a-brief-history-of-time-male",
    bookId: "a-brief-history-of-time",
    voice: "ko-male",
    title: "시간의 역사 (남성 앵커)",
    src: "/audio/narration/ko-briefhistory-summary-male.mp3",
  },
  "ko-a-brief-history-of-time-female": {
    id: "ko-a-brief-history-of-time-female",
    bookId: "a-brief-history-of-time",
    voice: "ko-female",
    title: "시간의 역사 (여성 아나운서)",
    src: "/audio/narration/ko-briefhistory-summary-female.mp3",
  },

  // 4. Meditations
  "ko-meditations-male": {
    id: "ko-meditations-male",
    bookId: "meditations",
    voice: "ko-male",
    title: "명상록 (남성 앵커)",
    src: "/audio/narration/ko-meditations-summary-male.mp3",
  },
  "ko-meditations-female": {
    id: "ko-meditations-female",
    bookId: "meditations",
    voice: "ko-female",
    title: "명상록 (여성 아나운서)",
    src: "/audio/narration/ko-meditations-summary-female.mp3",
  },

  // 5. Infinite Powers
  "ko-infinite-powers-male": {
    id: "ko-infinite-powers-male",
    bookId: "infinite-powers",
    voice: "ko-male",
    title: "미적분의 힘 (남성 앵커)",
    src: "/audio/narration/ko-infinitepowers-summary-male.mp3",
  },
  "ko-infinite-powers-female": {
    id: "ko-infinite-powers-female",
    bookId: "infinite-powers",
    voice: "ko-female",
    title: "미적분의 힘 (여성 아나운서)",
    src: "/audio/narration/ko-infinitepowers-summary-female.mp3",
  },

  // 6. Outlive
  "ko-outlive-male": {
    id: "ko-outlive-male",
    bookId: "outlive",
    voice: "ko-male",
    title: "아웃리브 (남성 앵커)",
    src: "/audio/narration/ko-outlive-summary-male.mp3",
  },
  "ko-outlive-female": {
    id: "ko-outlive-female",
    bookId: "outlive",
    voice: "ko-female",
    title: "아웃리브 (여성 아나운서)",
    src: "/audio/narration/ko-outlive-summary-female.mp3",
  },

  // 7. Atomic Habits
  "ko-atomic-habits-male": {
    id: "ko-atomic-habits-male",
    bookId: "atomic-habits",
    voice: "ko-male",
    title: "아주 작은 습관의 힘 (남성 앵커)",
    src: "/audio/narration/ko-atomichabits-summary-male.mp3",
  },
  "ko-atomic-habits-female": {
    id: "ko-atomic-habits-female",
    bookId: "atomic-habits",
    voice: "ko-female",
    title: "아주 작은 습관의 힘 (여성 아나운서)",
    src: "/audio/narration/ko-atomichabits-summary-female.mp3",
  },
};

export function getStudioNarrationUrl(
  bookIdOrKey: string,
  voice: "ko-male" | "ko-female" | "en-male" | "en-female" = "ko-female"
): string {
  const gender = voice.includes("female") ? "female" : "male";
  const langPrefix = voice.startsWith("ko") ? "ko" : "en";

  // Check direct key
  const targetKey = `${langPrefix}-${bookIdOrKey}-${gender}`;
  if (STUDIO_NARRATION_TRACKS[targetKey]) {
    return STUDIO_NARRATION_TRACKS[targetKey].src;
  }

  // Fallback to briefing audio
  return langPrefix === "ko"
    ? gender === "female"
      ? "/audio/narration/ko-briefing-female.mp3"
      : "/audio/narration/ko-briefing-male.mp3"
    : gender === "female"
    ? "/audio/narration/en-briefing-female.mp3"
    : "/audio/narration/en-briefing-male.mp3";
}
