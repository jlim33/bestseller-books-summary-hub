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
    descriptionEn: "Complete continuous stream across Bach, Vivaldi, Chopin, Chanson & Nature",
    descriptionKo: "바흐, 비발디, 쇼팽, 샹송 및 자연음 전곡 연속 재생",
  },
  {
    id: "classical",
    labelEn: "Bach & Vivaldi & Chopin",
    labelKo: "바흐 & 비발디 & 쇼팽 클래식",
    icon: "Music",
    descriptionEn: "Authentic studio recordings of J.S. Bach, Vivaldi Four Seasons & Chopin Nocturne",
    descriptionKo: "실제 스튜디오 녹음 바흐 G선상의 아리아/첼로, 비발디 사계, 쇼팽 녹턴",
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
    descriptionEn: "Solfeggio cognitive frequencies & mindfulness acoustic piano",
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
  // 1. J.S. Bach Authentic Studio Masterpieces
  {
    id: "bach-air-on-g-string",
    title: "Bach - Air on the G String (BWV 1068)",
    artist: "J.S. Bach (Studio Chamber Strings)",
    category: "classical",
    categoryLabel: "바흐 현악 🎻",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    src: "/audio/classical/bach-air-on-g-string.mp3",
    duration: "4:32",
    icon: "Music"
  },
  {
    id: "bach-cello-suite",
    title: "Bach - Cello Suite No. 1 in G major (Prelude)",
    artist: "J.S. Bach (Acoustic Solo Cello)",
    category: "classical",
    categoryLabel: "바흐 첼로 🎻",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    src: "/audio/classical/bach-cello-suite.mp3",
    duration: "3:40",
    icon: "Music"
  },
  {
    id: "bach-goldberg",
    title: "Bach - Goldberg Variations: Aria (BWV 988)",
    artist: "J.S. Bach (Grand Piano Solo)",
    category: "classical",
    categoryLabel: "바흐 골드베르크 🎹",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    src: "/audio/classical/bach-goldberg.mp3",
    duration: "4:15",
    icon: "Music"
  },
  {
    id: "bach-minuet",
    title: "Bach - Minuet in G major (BWV Anh. 114)",
    artist: "J.S. Bach (Baroque Piano)",
    category: "classical",
    categoryLabel: "바흐 미뉴에트 🎹",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    src: "/audio/classical/bach-minuet.mp3",
    duration: "2:50",
    icon: "Music"
  },

  // 2. Antonio Vivaldi Authentic Studio Masterpieces (The Four Seasons)
  {
    id: "vivaldi-spring",
    title: "Vivaldi - Four Seasons: Spring (La Primavera - Allegro)",
    artist: "Antonio Vivaldi (Baroque Chamber Orchestra)",
    category: "classical",
    categoryLabel: "비발디 사계 봄 🌸",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    src: "/audio/classical/vivaldi-spring.mp3",
    duration: "6:10",
    icon: "Music"
  },
  {
    id: "vivaldi-winter",
    title: "Vivaldi - Four Seasons: Winter (L'Inverno - Allegro)",
    artist: "Antonio Vivaldi (Violin & Strings)",
    category: "classical",
    categoryLabel: "비발디 사계 겨울 ❄️",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    src: "/audio/classical/vivaldi-winter.mp3",
    duration: "3:30",
    icon: "Music"
  },
  {
    id: "vivaldi-summer",
    title: "Vivaldi - Four Seasons: Summer (L'Estate - Storm Presto)",
    artist: "Antonio Vivaldi (Dynamic Strings Ensemble)",
    category: "classical",
    categoryLabel: "비발디 사계 여름 ⚡",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    src: "/audio/classical/vivaldi-summer.mp3",
    duration: "4:05",
    icon: "Music"
  },

  // 3. Chopin & Satie Studio Masterpieces
  {
    id: "chopin-nocturne",
    title: "Chopin - Nocturne in E-flat major, Op. 9 No. 2",
    artist: "Frederic Chopin (Concert Grand Piano)",
    category: "classical",
    categoryLabel: "쇼팽 녹턴 🎹",
    genreEn: "Classical Piano",
    genreKo: "클래식 피아노",
    src: "/audio/classical/chopin-nocturne.mp3",
    duration: "4:32",
    icon: "Music"
  },
  {
    id: "satie-gymnopedie",
    title: "Erik Satie - Gymnopédie No. 1",
    artist: "Erik Satie (Acoustic Piano Lounge)",
    category: "classical",
    categoryLabel: "사티 짐노페디 🎹",
    genreEn: "Classical Piano",
    genreKo: "클래식 피아노",
    src: "/audio/classical/satie-gymnopedie.mp3",
    duration: "3:40",
    icon: "Music"
  },

  // 4. Parisian Chanson & Acoustic Cafe
  {
    id: "chanson-accordion",
    title: "Breeze of Paris (Bookstore Cafe Chanson)",
    artist: "French Accordion & Acoustic Trio",
    category: "chanson",
    categoryLabel: "북카페 샹송 ☕",
    genreEn: "Chanson & Cafe",
    genreKo: "샹송 & 북카페",
    src: "/audio/classical/chanson-accordion.mp3",
    duration: "3:10",
    icon: "Coffee"
  },
  {
    id: "chanson-acoustic",
    title: "Montmartre Sunset (Warm Acoustic Guitar)",
    artist: "Parisian Acoustic Ensemble",
    category: "chanson",
    categoryLabel: "어쿠스틱 카페 🎸",
    genreEn: "Chanson & Cafe",
    genreKo: "샹송 & 북카페",
    src: "/audio/classical/chanson-acoustic.mp3",
    duration: "3:25",
    icon: "Coffee"
  },

  // 5. 528Hz Alpha Brainwave Meditation & Deep Focus
  {
    id: "meditation-528hz",
    title: "528Hz Alpha Brainwave Deep Reading Focus",
    artist: "Solfeggio Cognitive Research",
    category: "meditation",
    categoryLabel: "528Hz 몰입 독서 🧘",
    genreEn: "528Hz Meditation",
    genreKo: "528Hz 명상",
    src: "/audio/classical/meditation-528hz.mp3",
    duration: "5:00",
    icon: "Sparkles"
  },

  // 6. Nature & Rain Sanctuary
  {
    id: "nature-rain",
    title: "Gentle Rain on Library Windowpane",
    artist: "Ambient Nature Sanctuary",
    category: "nature",
    categoryLabel: "도서관 빗소리 🌧️",
    genreEn: "Nature Sounds",
    genreKo: "자연 빗소리",
    src: "/audio/classical/nature-rain.mp3",
    duration: "6:10",
    icon: "CloudRain"
  },
  {
    id: "nature-ocean",
    title: "Calm Ocean Waves & Horizon Breeze",
    artist: "Coastal Calming Sound",
    category: "nature",
    categoryLabel: "온화한 파도소리 🌊",
    genreEn: "Nature Sounds",
    genreKo: "자연 파도소리",
    src: "/audio/classical/nature-ocean.mp3",
    duration: "5:30",
    icon: "CloudRain"
  }
];

export const RELAXING_AUDIO_TRACKS = READING_AUDIO_TRACKS;
