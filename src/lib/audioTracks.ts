export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  category: "classical" | "chanson" | "meditation" | "nature";
  categoryLabel: string;
  genreEn: string;
  genreKo: string;
  src?: string;
  isSynth?: boolean;
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
    descriptionEn: "Complete continuous stream across Bach, Vivaldi, Chopin, 528Hz & Nature",
    descriptionKo: "바흐, 비발디, 쇼팽, 528Hz 명상 및 자연음 전곡 연속 재생",
  },
  {
    id: "classical",
    labelEn: "Bach, Vivaldi & Chopin",
    labelKo: "바흐 & 비발디 & 쇼팽 클래식",
    icon: "Music",
    descriptionEn: "J.S. Bach suites, Vivaldi Four Seasons & Chopin Nocturnes",
    descriptionKo: "바흐 G선상의 아리아/무반주 첼로, 비발디 사계 봄/겨울, 쇼팽 녹턴",
  },
  {
    id: "meditation",
    labelEn: "528Hz Alpha Meditation",
    labelKo: "528Hz 딥포커스 명상",
    icon: "Sparkles",
    descriptionEn: "Solfeggio cognitive frequencies & Tibetan singing bowls",
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
  // 1. J.S. Bach Masterpieces
  {
    id: "synth-bach-air",
    title: "Bach - Air on the G String (BWV 1068)",
    artist: "J.S. Bach (Chamber Strings Ensemble)",
    category: "classical",
    categoryLabel: "바흐 현악 🎻",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    isSynth: true,
    duration: "3:45",
    icon: "Music"
  },
  {
    id: "synth-bach-cello",
    title: "Bach - Cello Suite No. 1 in G major (Prelude)",
    artist: "J.S. Bach (Deep Cello Resonance)",
    category: "classical",
    categoryLabel: "바흐 첼로 🎻",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    isSynth: true,
    duration: "2:50",
    icon: "Music"
  },
  {
    id: "synth-bach-goldberg",
    title: "Bach - Goldberg Variations: Aria (BWV 988)",
    artist: "J.S. Bach (Acoustic Grand Piano)",
    category: "classical",
    categoryLabel: "바흐 골드베르크 🎹",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    isSynth: true,
    duration: "3:10",
    icon: "Music"
  },
  {
    id: "synth-bach-minuet",
    title: "Bach - Minuet in G major (BWV Anh. 114)",
    artist: "J.S. Bach (Baroque Piano)",
    category: "classical",
    categoryLabel: "바흐 미뉴에트 🎹",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    isSynth: true,
    duration: "2:15",
    icon: "Music"
  },

  // 2. Antonio Vivaldi Masterpieces (The Four Seasons)
  {
    id: "synth-vivaldi-spring",
    title: "Vivaldi - Four Seasons: Spring (La Primavera - Allegro)",
    artist: "Antonio Vivaldi (Baroque Strings)",
    category: "classical",
    categoryLabel: "비발디 사계 봄 🌸",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    isSynth: true,
    duration: "3:20",
    icon: "Music"
  },
  {
    id: "synth-vivaldi-winter",
    title: "Vivaldi - Four Seasons: Winter (L'Inverno - Largo)",
    artist: "Antonio Vivaldi (Peaceful Chamber Strings)",
    category: "classical",
    categoryLabel: "비발디 사계 겨울 ❄️",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    isSynth: true,
    duration: "2:45",
    icon: "Music"
  },
  {
    id: "synth-vivaldi-summer",
    title: "Vivaldi - Four Seasons: Summer (L'Estate - Storm Presto)",
    artist: "Antonio Vivaldi (Dynamic Strings)",
    category: "classical",
    categoryLabel: "비발디 사계 여름 ⚡",
    genreEn: "Bach & Vivaldi",
    genreKo: "바흐 & 비발디",
    isSynth: true,
    duration: "2:30",
    icon: "Music"
  },

  // 3. Chopin & Satie Masterpieces
  {
    id: "synth-chopin-nocturne",
    title: "Chopin - Nocturne in E-flat major, Op. 9 No. 2",
    artist: "Frederic Chopin (Classical Piano Lounge)",
    category: "classical",
    categoryLabel: "쇼팽 녹턴 🎹",
    genreEn: "Classical Piano",
    genreKo: "클래식 피아노",
    isSynth: true,
    duration: "4:32",
    icon: "Music"
  },
  {
    id: "synth-satie-gymnopedie",
    title: "Erik Satie - Gymnopédie No. 1",
    artist: "Erik Satie (Calm Ambient Solo)",
    category: "classical",
    categoryLabel: "사티 짐노페디 🎹",
    genreEn: "Classical Piano",
    genreKo: "클래식 피아노",
    isSynth: true,
    duration: "3:40",
    icon: "Music"
  },

  // 4. 528Hz Alpha Brainwave Meditation & Deep Focus
  {
    id: "read-528hz-deepfocus",
    title: "528Hz Alpha Brainwave Deep Reading Focus",
    artist: "Solfeggio Cognitive Research",
    category: "meditation",
    categoryLabel: "528Hz 몰입 독서 🧘",
    genreEn: "528Hz Meditation",
    genreKo: "528Hz 명상",
    isSynth: false,
    duration: "5:00",
    icon: "Sparkles"
  },

  // 5. Nature & Rain Sanctuary
  {
    id: "read-library-rain",
    title: "Gentle Rain on Library Windowpane",
    artist: "Ambient Nature Sanctuary",
    category: "nature",
    categoryLabel: "도서관 빗소리 🌧️",
    genreEn: "Nature Sounds",
    genreKo: "자연 빗소리",
    isSynth: false,
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
    isSynth: false,
    duration: "5:30",
    icon: "CloudRain"
  }
];

export const RELAXING_AUDIO_TRACKS = READING_AUDIO_TRACKS;
