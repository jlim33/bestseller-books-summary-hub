import { NewsArticle, Comment, EvidenceVoteState } from "./types";

const BOOKMARKS_KEY = "vitapulse_bookmarks_v1";
const COMMENTS_KEY = "vitapulse_comments_v1";
const EVIDENCE_VOTE_KEY = "vitapulse_evidence_votes_v1";
const USER_NICKNAME_KEY = "vitapulse_nickname_v1";
const AUTO_REFRESH_KEY = "vitapulse_auto_refresh_v1";
const GEMINI_KEY = "vitapulse_gemini_key_v1";
const AUDIO_VOLUME_KEY = "vitapulse_bgm_volume_v1";

export function getStoredBookmarks(): NewsArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(article: NewsArticle): boolean {
  if (typeof window === "undefined") return false;
  try {
    const bookmarks = getStoredBookmarks();
    if (!bookmarks.some(b => b.id === article.id)) {
      bookmarks.unshift(article);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks.slice(0, 100)));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function removeBookmark(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const bookmarks = getStoredBookmarks().filter(b => b.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch {}
}

export function isArticleBookmarked(id: string): boolean {
  return getStoredBookmarks().some(b => b.id === id);
}

// --- Evidence Voting System (🌿 Helpful vs 🧪 More Study) ---

export function getStoredEvidenceVotes(): Record<string, EvidenceVoteState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(EVIDENCE_VOTE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getArticleEvidenceVote(
  articleId: string,
  defaultHelpful = 22,
  defaultMoreStudy = 4
): EvidenceVoteState {
  const all = getStoredEvidenceVotes();
  if (all[articleId]) return all[articleId];
  return {
    userVote: null,
    helpfulCount: defaultHelpful,
    moreStudyCount: defaultMoreStudy,
  };
}

export function toggleArticleEvidenceVote(
  articleId: string,
  type: "helpful" | "moreStudy",
  defaultHelpful = 22,
  defaultMoreStudy = 4
): EvidenceVoteState {
  const all = getStoredEvidenceVotes();
  const current = all[articleId] || {
    userVote: null,
    helpfulCount: defaultHelpful,
    moreStudyCount: defaultMoreStudy,
  };

  if (current.userVote === type) {
    if (type === "helpful") current.helpfulCount = Math.max(0, current.helpfulCount - 1);
    if (type === "moreStudy") current.moreStudyCount = Math.max(0, current.moreStudyCount - 1);
    current.userVote = null;
  } else {
    if (current.userVote === "helpful") current.helpfulCount = Math.max(0, current.helpfulCount - 1);
    if (current.userVote === "moreStudy") current.moreStudyCount = Math.max(0, current.moreStudyCount - 1);

    if (type === "helpful") current.helpfulCount += 1;
    if (type === "moreStudy") current.moreStudyCount += 1;
    current.userVote = type;
  }

  all[articleId] = current;
  if (typeof window !== "undefined") {
    localStorage.setItem(EVIDENCE_VOTE_KEY, JSON.stringify(all));
  }
  return current;
}

// --- Comments System ---

export function getStoredComments(): Record<string, Comment[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getArticleComments(articleId: string): Comment[] {
  const all = getStoredComments();
  return all[articleId] || [];
}

export function addArticleComment(
  articleId: string,
  author: string,
  content: string,
  avatarColor = "from-sage-500 to-emerald-600"
): Comment {
  const all = getStoredComments();
  const list = all[articleId] || [];

  const newComment: Comment = {
    id: "vita-cmt-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    articleId,
    author: author.trim() || "건강 연구자",
    avatarColor,
    content: content.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  list.unshift(newComment);
  all[articleId] = list;

  if (typeof window !== "undefined") {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  }
  return newComment;
}

export function deleteArticleComment(articleId: string, commentId: string): void {
  const all = getStoredComments();
  if (!all[articleId]) return;
  all[articleId] = all[articleId].filter(c => c.id !== commentId);
  if (typeof window !== "undefined") {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  }
}

export function likeArticleComment(articleId: string, commentId: string): void {
  const all = getStoredComments();
  if (!all[articleId]) return;
  all[articleId] = all[articleId].map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c);
  if (typeof window !== "undefined") {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  }
}

export function getSavedNickname(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(USER_NICKNAME_KEY) || "";
}

export function saveNickname(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_NICKNAME_KEY, name.trim());
}

export function getAutoRefreshInterval(): number {
  if (typeof window === "undefined") return 15;
  try {
    const val = localStorage.getItem(AUTO_REFRESH_KEY);
    return val ? parseInt(val, 10) : 15;
  } catch {
    return 15;
  }
}

export function setAutoRefreshInterval(min: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTO_REFRESH_KEY, min.toString());
}

export function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(GEMINI_KEY) || "";
}

export function setStoredApiKey(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GEMINI_KEY, key.trim());
}

export function getStoredVolume(): number {
  if (typeof window === "undefined") return 0.35;
  try {
    const v = localStorage.getItem(AUDIO_VOLUME_KEY);
    return v ? parseFloat(v) : 0.35;
  } catch {
    return 0.35;
  }
}

export function setStoredVolume(vol: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUDIO_VOLUME_KEY, vol.toString());
}
