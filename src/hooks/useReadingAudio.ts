import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { READING_AUDIO_TRACKS, MUSIC_GENRES, AudioTrack, MusicGenre } from "@/lib/audioTracks";
import { ClassicalAudioSynthesizer } from "@/lib/classicalSynthesizer";

const VOLUME_STORAGE_KEY = "bookpulse_bgm_volume_v1";

export function useReadingAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(READING_AUDIO_TRACKS[0]);
  const [volume, setVolumeState] = useState<number>(0.35);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<ClassicalAudioSynthesizer | null>(null);
  const currentTrackRef = useRef<AudioTrack>(currentTrack);
  const isShuffleRef = useRef<boolean>(isShuffle);
  const autoAdvanceRef = useRef<boolean>(autoAdvance);
  const volumeRef = useRef<number>(volume);
  const isMutedRef = useRef<boolean>(isMuted);

  const activeTracks = useMemo(() => {
    if (selectedGenre === "all") return READING_AUDIO_TRACKS;
    return READING_AUDIO_TRACKS.filter((t) => t.category === selectedGenre);
  }, [selectedGenre]);

  const activeTracksRef = useRef<AudioTrack[]>(activeTracks);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
    isShuffleRef.current = isShuffle;
    autoAdvanceRef.current = autoAdvance;
    volumeRef.current = volume;
    isMutedRef.current = isMuted;
    activeTracksRef.current = activeTracks;
  }, [currentTrack, isShuffle, autoAdvance, volume, isMuted, activeTracks]);

  // Forward declaration for sequencing
  const selectNextTrackRef = useRef<() => void>(() => {});

  const playTrack = useCallback((track: AudioTrack) => {
    setCurrentTrack(track);
    currentTrackRef.current = track;
    setIsLoading(false);

    if (track.isSynth) {
      // Stop HTML5 audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Play procedural classical synthesizer
      if (!synthRef.current) {
        synthRef.current = new ClassicalAudioSynthesizer();
      }
      synthRef.current.setVolume(isMutedRef.current ? 0 : volumeRef.current);
      synthRef.current.playTrack(track.id, () => {
        if (autoAdvanceRef.current) {
          selectNextTrackRef.current();
        }
      });
      setIsPlaying(true);
    } else {
      // Stop synthesizer if playing
      if (synthRef.current) {
        synthRef.current.stop();
      }
      if (audioRef.current && track.src) {
        setIsLoading(true);
        audioRef.current.src = track.src;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.warn("Audio stream playback notice:", err);
            setIsLoading(false);
            if (autoAdvanceRef.current) {
              setTimeout(() => selectNextTrackRef.current(), 1000);
            }
          });
      }
    }
  }, []);

  const selectNextTrack = useCallback(() => {
    const trackList = activeTracksRef.current.length > 0 ? activeTracksRef.current : READING_AUDIO_TRACKS;
    if (isShuffleRef.current) {
      const randomIndex = Math.floor(Math.random() * trackList.length);
      playTrack(trackList[randomIndex]);
    } else {
      const currentIndex = trackList.findIndex((t) => t.id === currentTrackRef.current.id);
      const nextIndex = (currentIndex + 1) % trackList.length;
      playTrack(trackList[nextIndex]);
    }
  }, [playTrack]);

  const selectPrevTrack = useCallback(() => {
    const trackList = activeTracksRef.current.length > 0 ? activeTracksRef.current : READING_AUDIO_TRACKS;
    const currentIndex = trackList.findIndex((t) => t.id === currentTrackRef.current.id);
    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
    playTrack(trackList[prevIndex]);
  }, [playTrack]);

  useEffect(() => {
    selectNextTrackRef.current = selectNextTrack;
  }, [selectNextTrack]);

  const handleSelectGenre = useCallback(
    (genreId: string) => {
      setSelectedGenre(genreId);
      const genreTracks = genreId === "all" ? READING_AUDIO_TRACKS : READING_AUDIO_TRACKS.filter((t) => t.category === genreId);
      if (genreTracks.length > 0 && isPlaying) {
        playTrack(genreTracks[0]);
      }
    },
    [isPlaying, playTrack]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedVol = 0.35;
      try {
        const raw = localStorage.getItem(VOLUME_STORAGE_KEY);
        if (raw) savedVol = parseFloat(raw);
      } catch {}
      setVolumeState(savedVol);

      synthRef.current = new ClassicalAudioSynthesizer();
      synthRef.current.setVolume(savedVol);

      const audio = new Audio();
      audio.loop = false;
      audio.volume = savedVol;
      audioRef.current = audio;

      audio.onwaiting = () => setIsLoading(true);
      audio.onplaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };
      audio.onpause = () => {
        if (!synthRef.current?.getIsPlaying()) {
          setIsPlaying(false);
        }
      };
      audio.onerror = () => {
        setIsLoading(false);
        if (autoAdvanceRef.current) {
          setTimeout(() => selectNextTrackRef.current(), 1500);
        }
      };
      audio.onended = () => {
        if (autoAdvanceRef.current) {
          selectNextTrackRef.current();
        }
      };

      return () => {
        audio.pause();
        audio.src = "";
        if (synthRef.current) {
          synthRef.current.stop();
        }
      };
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (currentTrack.isSynth && synthRef.current) {
        synthRef.current.stop();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      playTrack(currentTrack);
    }
  }, [isPlaying, currentTrack, playTrack]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, clamped.toString());
    } catch {}
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
    if (synthRef.current) {
      synthRef.current.setVolume(isMuted ? 0 : clamped);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume;
      if (synthRef.current) synthRef.current.setVolume(volume);
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
      if (synthRef.current) synthRef.current.setVolume(0);
    }
  }, [isMuted, volume]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleAutoAdvance = useCallback(() => {
    setAutoAdvance((prev) => !prev);
  }, []);

  return {
    isPlaying,
    isLoading,
    currentTrack,
    tracks: activeTracks,
    allTracks: READING_AUDIO_TRACKS,
    genres: MUSIC_GENRES,
    selectedGenre,
    setSelectedGenre: handleSelectGenre,
    volume,
    isMuted,
    isShuffle,
    autoAdvance,
    playTrack,
    togglePlay,
    setVolume,
    toggleMute,
    selectNextTrack,
    selectPrevTrack,
    toggleShuffle,
    toggleAutoAdvance,
  };
}
