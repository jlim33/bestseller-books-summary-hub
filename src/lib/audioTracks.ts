import { AudioTrack } from "./types";

export const RELAXING_AUDIO_TRACKS: AudioTrack[] = [
  // 1. Classical Masterpieces (Royalty-free ambient arrangements)
  {
    id: "classical-chopin-nocturne",
    title: "Chopin - Nocturne in E-flat major, Op. 9 No. 2",
    artist: "Frederic Chopin (Classical Piano Lounge)",
    category: "classical",
    categoryLabel: "클래식 피아노 🎹",
    src: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=chopin-nocturne-op-9-no-2-110829.mp3",
    duration: "4:32",
    icon: "Music"
  },
  {
    id: "classical-bach-air",
    title: "Bach - Air on the G String",
    artist: "J.S. Bach (Peaceful Chamber Strings)",
    category: "classical",
    categoryLabel: "클래식 현악 🎻",
    src: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_341bbec7bb.mp3?filename=bach-air-on-the-g-string-orchestral-suite-no-3-in-d-major-bwv-1068-105151.mp3",
    duration: "4:15",
    icon: "Music"
  },
  {
    id: "classical-satie-gymnopedie",
    title: "Erik Satie - Gymnopédie No. 1",
    artist: "Erik Satie (Calm Ambient Piano)",
    category: "classical",
    categoryLabel: "미니멀 클래식 🎹",
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=gymnopedie-no-1-10557.mp3",
    duration: "3:40",
    icon: "Music"
  },

  // 2. Parisian Chanson & Acoustic Cafe
  {
    id: "chanson-paris-breeze",
    title: "Breeze of Paris (Chanson Accordion Cafe)",
    artist: "French Acoustic Ensemble",
    category: "chanson",
    categoryLabel: "파리지앵 샹송 ☕",
    src: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=french-accordion-chanson-122941.mp3",
    duration: "3:10",
    icon: "Coffee"
  },
  {
    id: "chanson-acoustic-romance",
    title: "Montmartre Sunset (Warm Acoustic Guitar)",
    artist: "Acoustic Paris Trio",
    category: "chanson",
    categoryLabel: "어쿠스틱 카페 🎸",
    src: "https://cdn.pixabay.com/download/audio/2023/04/18/audio_d46429f52a.mp3?filename=french-cafe-acoustic-146603.mp3",
    duration: "3:25",
    icon: "Coffee"
  },

  // 3. Deep Meditation & 528Hz Solfeggio Healing
  {
    id: "meditation-528hz-healing",
    title: "528Hz DNA Repair & Mind Serenity",
    artist: "Solfeggio Healing Soundscape",
    category: "meditation",
    categoryLabel: "528Hz 딥 명상 🧘",
    src: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c97693998b.mp3?filename=528hz-healing-meditation-125867.mp3",
    duration: "5:00",
    icon: "Sparkles"
  },
  {
    id: "meditation-tibetan-bowl",
    title: "Tibetan Singing Bowl & Zen Breath",
    artist: "Himalayan Zen Master",
    category: "meditation",
    categoryLabel: "싱잉볼 이완 🌿",
    src: "https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1e01.mp3?filename=tibetan-singing-bowl-meditation-10940.mp3",
    duration: "4:45",
    icon: "Sparkles"
  },

  // 4. Therapeutic Nature White Noise
  {
    id: "nature-forest-rain",
    title: "Healing Forest Rain & Gentle Stream",
    artist: "Nature Acoustics Bio-Lab",
    category: "nature",
    categoryLabel: "치유의 숲 빗소리 🌧️",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-rain-ambient-111154.mp3",
    duration: "6:10",
    icon: "CloudRain"
  },
  {
    id: "nature-ocean-waves",
    title: "Peaceful Pacific Ocean Tide",
    artist: "Coastal Calming Sound",
    category: "nature",
    categoryLabel: "온화한 파도소리 🌊",
    src: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_82315b9468.mp3?filename=ocean-waves-ambient-8247.mp3",
    duration: "5:30",
    icon: "Waves"
  }
];
