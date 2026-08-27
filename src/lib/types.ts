export type Category =
  // Korean Categories
  | "전체 건강 & 웰빙"
  | "장수 & 안티에이징 의학"
  | "영양 & 기능성 식품 과학"
  | "수면 & 뇌신경 웰니스"
  | "심혈관 & 대사 건강"
  | "면역 & 마이크로바이옴"
  | "운동 처방 & 재활 치료"
  // English Categories
  | "All Health & Wellness"
  | "Longevity & Anti-Aging"
  | "Nutrition & Functional Foods"
  | "Sleep & Neuro-Wellness"
  | "Cardiovascular & Metabolic"
  | "Immunity & Microbiome"
  | "Exercise Medicine & Rehab";

export type EvidenceLevel =
  | "Level 1: Meta-Analysis & Systematic Review 🏆"
  | "Level 2: Randomized Controlled Trial (RCT) 🔬"
  | "Level 3: Long-term Cohort Clinical Study 📊"
  | "Level 4: Expert Clinical Consensus 🩺"
  | "1등급: 메타분석 & 체계적 고찰 🏆"
  | "2등급: 무작위 대조 임상시험 (RCT) 🔬"
  | "3등급: 대규모 임상 코호트 추적 📊"
  | "4등급: 의학 전문 학회 임상 권고 🩺";

export interface AISummary {
  tldr: string[]; // 3-bullet clinical takeaways
  clinicalContext: string; // Scientific mechanism & why it matters
  evidenceLevel: EvidenceLevel;
  journalReference: string; // e.g. "The Lancet (2025)", "Nature Medicine (Cited 980+)"
  safetyAndDosage: string; // Safety cautions or actionable lifestyle guidance
  targetAudience: string[]; // e.g. ["Adults 40+", "Sleep Deprived", "Pre-diabetic"]
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  avatarColor: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface EvidenceVoteState {
  userVote: "helpful" | "moreStudy" | null;
  helpfulCount: number; // 🌿 Clinically helpful
  moreStudyCount: number; // 🧪 Need more study/caution
}

export interface HealthTickerItem {
  id: string;
  title: string;
  journal: string;
  category: "longevity" | "nutrition" | "neuro" | "cardio";
  evidenceGrade: string;
  timeAgo: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  source: string;
  sourceUrl?: string;
  pubDate: string;
  timestamp: number;
  category: Category;
  lang?: "ko" | "en";
  contentSnippet: string;
  fullContent?: string;
  author?: string;
  imageUrl?: string;
  readTimeMinutes: number;
  aiSummary?: AISummary;
  helpfulVotes?: number;
  moreStudyVotes?: number;
  commentsCount?: number;
  tags: string[];
}

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: Category;
  enabled: boolean;
  isCustom?: boolean;
  type: "rss" | "atom" | "json";
  lang?: "ko" | "en";
  icon?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  category: "classical" | "chanson" | "meditation" | "nature";
  categoryLabel: string;
  src: string;
  duration?: string;
  icon?: string;
}
