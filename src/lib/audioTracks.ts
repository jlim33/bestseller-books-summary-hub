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
    labelEn: "All Genres",
    labelKo: "전체 장르",
    icon: "LayoutGrid",
    descriptionEn: "Continuous stream across all curated reading genres",
    descriptionKo: "클래식, 샹송, 528Hz 명상 및 자연음 전곡 연속 재생",
  },
  {
    id: "classical",
    labelEn: "Classical Piano & Strings",
    labelKo: "클래식 피아노 & 현악",
    icon: "Music",
    descriptionEn: "Chopin, Bach, and Satie for timeless cognitive focus",
    descriptionKo: "쇼팽 녹턴, 바흐 현악, 에릭 사티 피아노 선율",
  },
  {
    id: "chanson",
    labelEn: "Parisian Chanson & Cafe",
    labelKo: "북카페 & 파리지앵 샹송",
    icon: "Coffee",
    descriptionEn: "Warm French accordion & acoustic cafe guitar",
    descriptionKo: "파리 서점 감성의 따스한 아코디언과 어쿠스틱 기타",
  },
  {
    id: "meditation",
    labelEn: "528Hz Alpha Meditation",
    labelKo: "528Hz 딥포커스 명상",
    icon: "Sparkles",
    descriptionEn: "Solfeggio frequencies & Tibetan singing bowls",
    descriptionKo: "528Hz 뇌파 동기화 주파수와 싱잉볼 이완 사운드",
  },
  {
    id: "nature",
    labelEn: "Nature & Rain Sanctuary",
    labelKo: "자연의 소리 & 빗소리",
    icon: "CloudRain",
    descriptionEn: "Library window rain & calm Pacific ocean waves",
    descriptionKo: "도서관 창가 빗소리와 평온한 파도 백색소음",
  },
];

export const READING_AUDIO_TRACKS: AudioTrack[] = [
  // 1. Classical Piano & Strings
  {
    id: "read-chopin-nocturne",
    title: "Chopin - Nocturne in E-flat major, Op. 9 No. 2",
    artist: "Reading Lounge Classical Piano",
    category: "classical",
    categoryLabel: "클래식 피아노 🎹",
    genreEn: "Classical",
    genreKo: "클래식",
    src: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=chopin-nocturne-op-9-no-2-110829.mp3",
    duration: "4:32",
    icon: "Music"
  },
  {
    id: "read-bach-goldberg",
    title: "Bach - Air on the G String (Orchestral Suite)",
    artist: "Chamber Strings Ensemble",
    category: "classical",
    categoryLabel: "클래식 현악 🎻",
    genreEn: "Classical",
    genreKo: "클래식",
    src: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_341bbec7bb.mp3?filename=bach-air-on-the-g-string-orchestral-suite-no-3-in-d-major-bwv-1068-105151.mp3",
    duration: "4:15",
    icon: "Music"
  },
  {
    id: "read-satie-gymnopedie",
    title: "Erik Satie - Gymnopédie No. 1",
    artist: "Minimal Classical Solo",
    category: "classical",
    categoryLabel: "미니멀 클래식 🎹",
    genreEn: "Classical",
    genreKo: "클래식",
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=gymnopedie-no-1-10557.mp3",
    duration: "3:40",
    icon: "Music"
  },

  // 2. Parisian Chanson & Acoustic Cafe
  {
    id: "read-chanson-cafe",
    title: "Breeze of Paris (Bookstore Cafe Chanson)",
    artist: "Parisian Library Accordion",
    category: "chanson",
    categoryLabel: "북카페 샹송 ☕",
    genreEn: "Chanson & Cafe",
    genreKo: "샹송 & 북카페",
    src: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=french-accordion-chanson-122941.mp3",
    duration: "3:10",
    icon: "Coffee"
  },
  {
    id: "read-acoustic-guitar",
    title: "Montmartre Sunset (Warm Acoustic Guitar)",
    artist: "Acoustic Cafe Trio",
    category: "chanson",
    categoryLabel: "어쿠스틱 카페 🎸",
    genreEn: "Chanson & Cafe",
    genreKo: "샹송 & 북카페",
    src: "https://cdn.pixabay.com/download/audio/2023/04/18/audio_d46429f52a.mp3?filename=french-cafe-acoustic-146603.mp3",
    duration: "3:25",
    icon: "Coffee"
  },

  // 3. 528Hz Alpha Brainwave Meditation & Deep Focus
  {
    id: "read-528hz-deepfocus",
    title: "528Hz Alpha Brainwave Deep Reading Focus",
    artist: "Solfeggio Cognitive Research",
    category: "meditation",
    categoryLabel: "528Hz 몰입 독서 🧘",
    genreEn: "528Hz Meditation",
    genreKo: "528Hz 명상",
    src: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c97693998b.mp3?filename=528hz-healing-meditation-125867.mp3",
    duration: "5:00",
    icon: "Sparkles"
  },
  {
    id: "read-tibetan-zen",
    title: "Tibetan Singing Bowl & Zen Breath",
    artist: "Himalayan Zen Master",
    category: "meditation",
    categoryLabel: "싱잉볼 이완 🌿",
    genreEn: "528Hz Meditation",
    genreKo: "528Hz 명상",
    src: "https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1e01.mp3?filename=tibetan-singing-bowl-meditation-10940.mp3",
    duration: "4:45",
    icon: "Sparkles"
  },

  // 4. Nature & Rain Sanctuary
  {
    id: "read-library-rain",
    title: "Gentle Rain on Library Windowpane",
    artist: "Ambient Nature Sanctuary",
    category: "nature",
    categoryLabel: "도서관 빗소리 🌧️",
    genreEn: "Nature Sounds",
    genreKo: "자연 빗소리",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-rain-ambient-111154.mp3",
    duration: "6:10",
    icon: "CloudRain"
  },
  {
    id: "read-ocean-study",
    title: "Calm Ocean Waves & Horizon Breeze",
    artist: "Coastal Calming Sound",
    category: "nature",
    categoryLabel: "온화한 파도소리 🌊",
    genreEn: "Nature Sounds",
    genreKo: "자연 파도소리",
    src: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_82315b9468.mp3?filename=ocean-waves-ambient-8247.mp3",
    duration: "5:30",
    icon: "CloudRain"
  }
];

export const RELAXING_AUDIO_TRACKS = READING_AUDIO_TRACKS;
