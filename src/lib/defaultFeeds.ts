import { FeedSource } from "./types";

export const DEFAULT_FEEDS: FeedSource[] = [
  // 1. 국내 최고 권위 공공의학 및 전문 건강 채널 (Korean Feeds)
  {
    id: "kdca-health-kr",
    name: "질병관리청(KDCA) 공공보건 & 감염예방",
    url: "https://www.kdca.go.kr/board/board.es?mid=a20501000000&bid=0015",
    category: "면역 & 마이크로바이옴",
    enabled: true,
    type: "rss",
    lang: "ko",
    icon: "ShieldPlus"
  },
  {
    id: "snubh-health-kr",
    name: "분당서울대병원 전문의 건강 칼럼",
    url: "https://www.snubh.org/service/info/bbs/rss.do?bbs_no=6",
    category: "심혈관 & 대사 건강",
    enabled: true,
    type: "rss",
    lang: "ko",
    icon: "HeartPulse"
  },
  {
    id: "kormedi-science-kr",
    name: "코메디닷컴 최신 의학 & 연구 논문",
    url: "https://kormedi.com/feed/",
    category: "장수 & 안티에이징 의학",
    enabled: true,
    type: "rss",
    lang: "ko",
    icon: "Activity"
  },
  {
    id: "docdocdoc-health-kr",
    name: "청년의사 최신 임상 가이드라인",
    url: "https://www.docdocdoc.co.kr/rss/allArticle.xml",
    category: "수면 & 뇌신경 웰니스",
    enabled: true,
    type: "rss",
    lang: "ko",
    icon: "Brain"
  },

  // 2. 글로벌 최고 권위 피어리뷰 저널 & 의학기관 (Global English Feeds)
  {
    id: "nature-medicine-global",
    name: "Nature Medicine (Peer-Reviewed)",
    url: "https://www.nature.com/nm.rss",
    category: "Longevity & Anti-Aging",
    enabled: true,
    type: "rss",
    lang: "en",
    icon: "Award"
  },
  {
    id: "harvard-health-publishing",
    name: "Harvard Health Publishing (Harvard Medical School)",
    url: "https://www.health.harvard.edu/rss/health-blog",
    category: "Cardiovascular & Metabolic",
    enabled: true,
    type: "rss",
    lang: "en",
    icon: "BookOpen"
  },
  {
    id: "the-lancet-global",
    name: "The Lancet Clinical Infectious & Public Health",
    url: "https://www.thelancet.com/rssfeed/lancet_current.xml",
    category: "Immunity & Microbiome",
    enabled: true,
    type: "rss",
    lang: "en",
    icon: "Microscope"
  },
  {
    id: "medical-news-today-research",
    name: "Medical News Today - Peer-Reviewed Studies",
    url: "https://www.medicalnewstoday.com/feed",
    category: "Nutrition & Functional Foods",
    enabled: true,
    type: "rss",
    lang: "en",
    icon: "Apple"
  },
  {
    id: "nih-research-matters",
    name: "NIH Research Matters (National Institutes of Health)",
    url: "https://www.nih.gov/rss/researchmatters.xml",
    category: "Sleep & Neuro-Wellness",
    enabled: true,
    type: "rss",
    lang: "en",
    icon: "Activity"
  },
  {
    id: "science-daily-health",
    name: "ScienceDaily - Health & Longevity News",
    url: "https://www.sciencedaily.com/rss/health_medicine.xml",
    category: "Exercise Medicine & Rehab",
    enabled: true,
    type: "rss",
    lang: "en",
    icon: "Dumbbell"
  }
];
