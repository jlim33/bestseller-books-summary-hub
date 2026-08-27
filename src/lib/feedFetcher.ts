import Parser from "rss-parser";
import { NewsArticle, FeedSource, Category } from "./types";
import { DEFAULT_FEEDS } from "./defaultFeeds";
import { generateHealthSummary, extractJournalReference } from "./aiSummarizer";
import fs from "fs";
import path from "path";
import os from "os";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 VitaPulse/1.0",
    "Accept": "application/rss+xml, application/xml, application/atom+xml, text/xml;q=0.9, */*;q=0.8"
  },
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
      ["dc:creator", "creator"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

const CACHE_DIR = path.join(os.tmpdir(), "vitapulse-cache");
const CACHE_FILE = path.join(CACHE_DIR, "health-news-cache.json");
const FEEDS_FILE = path.join(CACHE_DIR, "health-feeds-config.json");

let inMemoryArticles: NewsArticle[] = [];
let lastSyncTime: number = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

function ensureCacheDir() {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  } catch (e) {}
}

export function getSavedFeeds(): FeedSource[] {
  ensureCacheDir();
  try {
    if (fs.existsSync(FEEDS_FILE)) {
      const data = fs.readFileSync(FEEDS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn("Failed to read health feeds file, using defaults:", e);
  }
  return DEFAULT_FEEDS;
}

export function saveFeeds(feeds: FeedSource[]) {
  ensureCacheDir();
  try {
    fs.writeFileSync(FEEDS_FILE, JSON.stringify(feeds, null, 2), "utf-8");
  } catch (e) {}
}

function loadCachedArticles(): NewsArticle[] {
  ensureCacheDir();
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return [];
}

function saveCachedArticles(articles: NewsArticle[]) {
  ensureCacheDir();
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(articles, null, 2), "utf-8");
  } catch (e) {}
}

function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 140));
}

function sanitizeSnippet(text?: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function autoRefineCategory(title: string, snippet: string, defaultCat: Category, lang: "ko" | "en"): Category {
  const text = (title + " " + snippet).toLowerCase();

  if (lang === "en") {
    if (text.includes("aging") || text.includes("longevity") || text.includes("lifespan") || text.includes("telomere") || text.includes("nad+")) {
      return "Longevity & Anti-Aging";
    }
    if (text.includes("diet") || text.includes("nutrition") || text.includes("vitamin") || text.includes("protein") || text.includes("fasting")) {
      return "Nutrition & Functional Foods";
    }
    if (text.includes("sleep") || text.includes("circadian") || text.includes("brain") || text.includes("dementia") || text.includes("alzheimer") || text.includes("neuro")) {
      return "Sleep & Neuro-Wellness";
    }
    if (text.includes("heart") || text.includes("blood pressure") || text.includes("glucose") || text.includes("diabetes") || text.includes("cardio") || text.includes("cholesterol")) {
      return "Cardiovascular & Metabolic";
    }
    if (text.includes("gut") || text.includes("microbiome") || text.includes("immune") || text.includes("probiotics") || text.includes("inflammation")) {
      return "Immunity & Microbiome";
    }
    if (text.includes("exercise") || text.includes("muscle") || text.includes("aerobic") || text.includes("rehab") || text.includes("strength training")) {
      return "Exercise Medicine & Rehab";
    }
    return defaultCat;
  }

  // Korean Category Classification
  if (text.includes("장수") || text.includes("노화") || text.includes("항노화") || text.includes("텔로미어") || text.includes("세포 회춘")) {
    return "장수 & 안티에이징 의학";
  }
  if (text.includes("영양") || text.includes("비타민") || text.includes("단백질") || text.includes("식단") || text.includes("간헐적 단식")) {
    return "영양 & 기능성 식품 과학";
  }
  if (text.includes("수면") || text.includes("불면") || text.includes("뇌") || text.includes("치매") || text.includes("알츠하이머") || text.includes("멜라토닌")) {
    return "수면 & 뇌신경 웰니스";
  }
  if (text.includes("혈압") || text.includes("혈당") || text.includes("당뇨") || text.includes("심장") || text.includes("콜레스테롤") || text.includes("혈관")) {
    return "심혈관 & 대사 건강";
  }
  if (text.includes("장내") || text.includes("유산균") || text.includes("마이크로바이옴") || text.includes("면역") || text.includes("염증")) {
    return "면역 & 마이크로바이옴";
  }
  if (text.includes("운동") || text.includes("근력") || text.includes("유산소") || text.includes("재활") || text.includes("스트레칭")) {
    return "운동 처방 & 재활 치료";
  }

  return defaultCat;
}

function extractTags(title: string, snippet: string, category: Category): string[] {
  const text = (title + " " + snippet).toLowerCase();
  const tags: Set<string> = new Set();

  tags.add(category);

  const keywords = [
    "TheLancet", "NatureMedicine", "HarvardHealth", "Longevity", "Microbiome",
    "CircadianSleep", "MetabolicHealth", "NutritionScience", "근거중심의학", "항노화", "수면건강", "장내미생물"
  ];

  for (const kw of keywords) {
    if (new RegExp(`\\b${kw}\\b`, "i").test(text)) {
      tags.add(kw);
    }
  }

  return Array.from(tags).slice(0, 4);
}

async function fetchFeed(feed: FeedSource): Promise<NewsArticle[]> {
  try {
    const feedData = await parser.parseURL(feed.url);
    const articles: NewsArticle[] = [];
    const lang = feed.lang || (feed.id.includes("kr") || feed.id.includes("kdca") ? "ko" : "en");

    for (const item of feedData.items || []) {
      if (!item.title || !item.link) continue;

      const title = item.title.trim();
      const rawItem = item as any;
      const snippet = sanitizeSnippet(
        rawItem.contentSnippet || rawItem.summary || rawItem.content || rawItem["content:encoded"] || ""
      );

      const pubDateObj = rawItem.pubDate || rawItem.isoDate ? new Date(rawItem.pubDate || rawItem.isoDate!) : new Date();
      const pubDate = isNaN(pubDateObj.getTime()) ? new Date().toISOString() : pubDateObj.toISOString();
      const timestamp = isNaN(pubDateObj.getTime()) ? Date.now() : pubDateObj.getTime();

      let imageUrl = "";
      if (rawItem.enclosure?.url && (rawItem.enclosure?.type?.startsWith("image/") || typeof rawItem.enclosure?.url === "string")) {
        imageUrl = rawItem.enclosure.url;
      } else if (rawItem.mediaContent?.$?.url) {
        imageUrl = rawItem.mediaContent.$.url;
      } else if (rawItem.mediaThumbnail?.$?.url) {
        imageUrl = rawItem.mediaThumbnail.$.url;
      }

      const id = Buffer.from(item.link).toString("base64url").slice(0, 32);

      const category = autoRefineCategory(title, snippet, feed.category, lang);
      const readTimeMinutes = estimateReadTime(snippet || title);
      const tags = extractTags(title, snippet, category);

      const aiSummary = generateHealthSummary(title, snippet, category, lang);

      articles.push({
        id,
        title,
        link: item.link,
        source: feed.name,
        sourceUrl: feed.url,
        pubDate,
        timestamp,
        category,
        lang,
        contentSnippet: snippet.slice(0, 400),
        fullContent: snippet,
        author: rawItem.creator || rawItem.author || feed.name,
        imageUrl: imageUrl || undefined,
        readTimeMinutes,
        aiSummary,
        helpfulVotes: Math.floor(Math.random() * 24) + 16,
        moreStudyVotes: Math.floor(Math.random() * 8) + 2,
        commentsCount: 0,
        tags
      });
    }

    return articles;
  } catch (err: any) {
    console.warn(`[FeedFetcher] Error fetching "${feed.name}":`, err.message || err);
    return [];
  }
}

export async function syncAllFeeds(force = false): Promise<{
  articles: NewsArticle[];
  sourcesStatus: { [id: string]: { count: number; error?: string } };
}> {
  const now = Date.now();

  if (!force && inMemoryArticles.length > 0 && now - lastSyncTime < CACHE_TTL_MS) {
    return {
      articles: inMemoryArticles,
      sourcesStatus: {}
    };
  }

  if (!force && inMemoryArticles.length === 0) {
    const diskArticles = loadCachedArticles();
    if (diskArticles.length > 0) {
      inMemoryArticles = diskArticles;
      lastSyncTime = now;
      return {
        articles: inMemoryArticles,
        sourcesStatus: {}
      };
    }
  }

  const feeds = getSavedFeeds().filter(f => f.enabled !== false);
  const sourcesStatus: { [id: string]: { count: number; error?: string } } = {};
  const allFetched: NewsArticle[] = [];

  const chunkSize = 5;
  for (let i = 0; i < feeds.length; i += chunkSize) {
    const chunk = feeds.slice(i, i + chunkSize);
    const results = await Promise.allSettled(chunk.map(f => fetchFeed(f)));

    results.forEach((res, index) => {
      const feed = chunk[index];
      if (res.status === "fulfilled") {
        sourcesStatus[feed.id] = { count: res.value.length };
        allFetched.push(...res.value);
      } else {
        sourcesStatus[feed.id] = { count: 0, error: res.reason?.message || "Failed to fetch" };
      }
    });
  }

  const combinedMap = new Map<string, NewsArticle>();
  for (const art of inMemoryArticles) {
    combinedMap.set(art.link, art);
  }
  for (const art of allFetched) {
    combinedMap.set(art.link, art);
  }

  const finalArticles = Array.from(combinedMap.values()).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  if (finalArticles.length > 0) {
    inMemoryArticles = finalArticles.slice(0, 400);
    lastSyncTime = now;
    saveCachedArticles(inMemoryArticles);
  }

  return {
    articles: inMemoryArticles,
    sourcesStatus
  };
}

export async function getNewsArticles(options?: {
  category?: Category;
  lang?: "ko" | "en";
  search?: string;
  source?: string;
  sortBy?: "latest" | "popular" | "readTime";
  limit?: number;
  offset?: number;
}): Promise<{ articles: NewsArticle[]; total: number; updatedAt: string }> {
  if (inMemoryArticles.length === 0) {
    await syncAllFeeds(false);
  }

  let filtered = [...inMemoryArticles];

  if (options?.lang) {
    filtered = filtered.filter(a => (a.lang || "ko") === options.lang);
  }

  if (options?.category && options.category !== "전체 건강 & 웰빙" && options.category !== "All Health & Wellness") {
    filtered = filtered.filter(a => a.category === options.category);
  }

  if (options?.source) {
    filtered = filtered.filter(a => a.source === options.source);
  }

  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    filtered = filtered.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.contentSnippet.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (options?.sortBy === "readTime") {
    filtered.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
  } else if (options?.sortBy === "popular") {
    filtered.sort((a, b) => ((b.helpfulVotes || 0) + (b.moreStudyVotes || 0)) - ((a.helpfulVotes || 0) + (a.moreStudyVotes || 0)));
  } else {
    filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  const total = filtered.length;
  const offset = options?.offset || 0;
  const limit = options?.limit || 50;
  const paginated = filtered.slice(offset, offset + limit);

  return {
    articles: paginated,
    total,
    updatedAt: new Date(lastSyncTime || Date.now()).toISOString()
  };
}
