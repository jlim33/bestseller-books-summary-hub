export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  category: "classical" | "chanson" | "meditation" | "nature";
  categoryLabel: string;
  genreEn: string;
  genreKo: string;
  src: string;
  duration?: string;
  icon?: string;
}

export interface MusicGenre {
  id: string;
  labelEn: string;
  labelKo: string;
  icon: string;
  descriptionEn: string;
  descriptionKo: string;
}

export const MUSIC_GENRES: MusicGenre[] = [
  {
    id: "all",
    labelEn: "All Genres (14 Masterpieces)",
    labelKo: "전체 장르 (14곡)",
    icon: "LayoutGrid",
    descriptionEn: "Curated 14 elite distinct studio master recordings across all 4 genres",
    descriptionKo: "4대 장르별 엄선된 14곡의 100% 고유 마스터 음원 연속 재생",
  },
  {
    id: "classical",
    labelEn: "Classical Best (5 Masterpieces)",
    labelKo: "클래식 명작 베스트 (5곡)",
    icon: "Music",
    descriptionEn: "Pachelbel Canon, Beethoven Für Elise, Vivaldi Winter, Kreisler & Massenet",
    descriptionKo: "파헬벨 캐논, 베토벤 엘리제를 위하여, 비발디 사계 겨울, 크라이슬러, 마스네 명상곡",
  },
  {
    id: "chanson",
    labelEn: "Parisian Chanson & Cafe (3)",
    labelKo: "북카페 & 파리지앵 샹송 (3곡)",
    icon: "Coffee",
    descriptionEn: "Authentic French musette accordion, vintage salon waltz & cafe classical guitar",
    descriptionKo: "프렌치 뮈제트 아코디언, 센강 왈츠, 살롱 어쿠스틱 기타 캐논",
  },
  {
    id: "meditation",
    labelEn: "528Hz Alpha Meditation (3)",
    labelKo: "528Hz 딥포커스 명상 (3곡)",
    icon: "Sparkles",
    descriptionEn: "Authentic Tibetan singing bowl, 528Hz alpha tone & Debussy Clair de Lune",
    descriptionKo: "티베트 히말라야 싱잉볼, 528Hz 인지 뇌파 사운드, 드뷔시 달빛 현악",
  },
  {
    id: "nature",
    labelEn: "Nature & Rain Sanctuary (3)",
    labelKo: "자연의 소리 & 빗소리 (3곡)",
    icon: "CloudRain",
    descriptionEn: "Authentic library window rain, calm Pacific waves & Bourne Woods birdsong",
    descriptionKo: "도서관 창가 빗소리, 태평양 온화한 파도소리, 영국 본우즈 아침 새소리",
  },
];

export const READING_AUDIO_TRACKS: AudioTrack[] = [
  // ==============================================================
  // 1. CLASSICAL MASTERPIECES (5 CLASSIC BEST RECORDINGS)
  // ==============================================================
  {
    id: "classic-canon",
    title: "Pachelbel - Canon in D major (파헬벨 캐논 변주곡)",
    artist: "Classic Best Masterpiece",
    category: "classical",
    categoryLabel: "클래식 명작 🎻",
    genreEn: "Classical Masterpieces",
    genreKo: "클래식 명작 베스트",
    src: "/audio/classic-best/01-pachelbel-canon.mp3",
    duration: "6:23",
    icon: "Music",
  },
  {
    id: "classic-fur-elise",
    title: "Beethoven - Für Elise (베토벤 엘리제를 위하여)",
    artist: "Classic Best Masterpiece",
    category: "classical",
    categoryLabel: "클래식 피아노 🎹",
    genreEn: "Classical Masterpieces",
    genreKo: "클래식 명작 베스트",
    src: "/audio/classic-best/02-beethoven-fur-elise.mp3",
    duration: "3:49",
    icon: "Music",
  },
  {
    id: "classic-winter",
    title: "Vivaldi - Four Seasons 'Winter' 1st Mvt (비발디 사계 '겨울' 1악장)",
    artist: "Classic Best Masterpiece",
    category: "classical",
    categoryLabel: "클래식 현악 🎻",
    genreEn: "Classical Masterpieces",
    genreKo: "클래식 명작 베스트",
    src: "/audio/classic-best/03-vivaldi-winter-1st.mp3",
    duration: "3:44",
    icon: "Music",
  },
  {
    id: "classic-liebesfreud",
    title: "Kreisler - Liebesfreud (크라이슬러 사랑의 기쁨)",
    artist: "Classic Best Masterpiece",
    category: "classical",
    categoryLabel: "클래식 바이올린 🎻",
    genreEn: "Classical Masterpieces",
    genreKo: "클래식 명작 베스트",
    src: "/audio/classic-best/04-kreisler-liebesfreud.mp3",
    duration: "3:32",
    icon: "Music",
  },
  {
    id: "classic-thais",
    title: "Massenet - Méditation from Thaïs (마스네 타이스의 명상곡)",
    artist: "Classic Best Masterpiece",
    category: "classical",
    categoryLabel: "클래식 명상 🎻",
    genreEn: "Classical Masterpieces",
    genreKo: "클래식 명작 베스트",
    src: "/audio/classic-best/05-massenet-meditation-thais.mp3",
    duration: "5:01",
    icon: "Music",
  },

  // ==============================================================
  // 2. PARISIAN CHANSON & CAFE (3 100% DISTINCT RECORDINGS)
  // ==============================================================
  {
    id: "chanson-accordion",
    title: "Duet Musette (Parisian Cafe Accordion)",
    artist: "French Accordion & Acoustic Trio",
    category: "chanson",
    categoryLabel: "북카페 샹송 ☕",
    genreEn: "Parisian Chanson",
    genreKo: "파리지앵 샹송",
    src: "/audio/classical/chanson-accordion.mp3?v=3",
    duration: "3:10",
    icon: "Coffee",
  },
  {
    id: "chanson-seine-walk",
    title: "The Sirens Waltz (Vintage French Salon Musette)",
    artist: "Paris Accordion & Salon Orchestra",
    category: "chanson",
    categoryLabel: "센 강 산책 🍷",
    genreEn: "Parisian Chanson",
    genreKo: "파리지앵 샹송",
    src: "/audio/classical/chanson-seine-walk.ogg?v=3",
    duration: "1:55",
    icon: "Coffee",
  },
  {
    id: "chanson-guitar-canon",
    title: "Pachelbel - Canon in D major (Solo Classical Guitar)",
    artist: "Boutique Cafe Nylon Guitar",
    category: "chanson",
    categoryLabel: "카페 기타 캐논 🎸",
    genreEn: "Parisian Chanson",
    genreKo: "파리지앵 샹송",
    src: "/audio/classical/chanson-guitar-canon.ogg?v=3",
    duration: "2:40",
    icon: "Coffee",
  },

  // ==============================================================
  // 3. 528Hz ALPHA MEDITATION (3 100% DISTINCT RECORDINGS)
  // ==============================================================
  {
    id: "meditation-tibetan-bowl",
    title: "Authentic Tibetan Singing Bowl Harmonic Resonance",
    artist: "Himalayan Monastery Monks",
    category: "meditation",
    categoryLabel: "티베트 싱잉볼 🥣",
    genreEn: "528Hz Meditation",
    genreKo: "528Hz 명상",
    src: "/audio/classical/meditation-tibetan-bowl.ogg?v=3",
    duration: "1:30",
    icon: "Sparkles",
  },
  {
    id: "meditation-528hz",
    title: "528Hz Alpha Brainwave Deep Reading Focus",
    artist: "Solfeggio Cognitive Flow",
    category: "meditation",
    categoryLabel: "528Hz 몰입 독서 🧘",
    genreEn: "528Hz Meditation",
    genreKo: "528Hz 명상",
    src: "/audio/classical/meditation-528hz.mp3?v=3",
    duration: "5:00",
    icon: "Sparkles",
  },
  {
    id: "meditation-clair-de-lune",
    title: "Debussy - Clair de Lune (Gentle Ambient Strings)",
    artist: "WikiOrchestra Violins & Strings",
    category: "meditation",
    categoryLabel: "드뷔시 달빛 현악 🌌",
    genreEn: "528Hz Meditation",
    genreKo: "528Hz 명상",
    src: "/audio/classical/meditation-clair-de-lune.ogg?v=3",
    duration: "4:50",
    icon: "Sparkles",
  },

  // ==============================================================
  // 4. NATURE & RAIN SANCTUARY (3 100% DISTINCT RECORDINGS)
  // ==============================================================
  {
    id: "nature-rain",
    title: "Gentle Rain on Library Windowpane",
    artist: "Ambient Nature Sanctuary",
    category: "nature",
    categoryLabel: "도서관 빗소리 🌧️",
    genreEn: "Nature Sanctuary",
    genreKo: "자연 빗소리",
    src: "/audio/classical/nature-rain.mp3?v=3",
    duration: "6:10",
    icon: "CloudRain",
  },
  {
    id: "nature-ocean",
    title: "Calm Ocean Waves & Horizon Breeze",
    artist: "Pacific Coastal Calming Sound",
    category: "nature",
    categoryLabel: "온화한 파도소리 🌊",
    genreEn: "Nature Sanctuary",
    genreKo: "자연 파도소리",
    src: "/audio/classical/nature-ocean.mp3?v=3",
    duration: "5:30",
    icon: "CloudRain",
  },
  {
    id: "nature-forest-birdsong",
    title: "Authentic Bourne Woods Morning Birdsong",
    artist: "Bourne Woods Alpine Habitat",
    category: "nature",
    categoryLabel: "영국 숲속 새소리 🌲",
    genreEn: "Nature Sanctuary",
    genreKo: "자연 새소리",
    src: "/audio/classical/nature-forest-birdsong.mp3?v=3",
    duration: "1:55",
    icon: "CloudRain",
  },
];

export const RELAXING_AUDIO_TRACKS = READING_AUDIO_TRACKS;
