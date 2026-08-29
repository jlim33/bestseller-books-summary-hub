import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { READING_AUDIO_TRACKS, MUSIC_GENRES, AudioTrack, MusicGenre } from "@/lib/audioTracks";

const VOLUME_STORAGE_KEY = "bookpulse_bgm_volume_v1";

export function useReadingAudio() {
  // Manual Play/Pause by default (AutoPlay is completely stopped)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(READING_AUDIO_TRACKS[0]);
  const [volume, setVolumeState] = useState<number>(0.35);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(false); // Manual stop by default

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<AudioTrack>(currentTrack);
  const isPlayingRef = useRef<boolean>(isPlaying);
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
    isPlayingRef.current = isPlaying;
    isShuffleRef.current = isShuffle;
    autoAdvanceRef.current = autoAdvance;
    volumeRef.current = volume;
    isMutedRef.current = isMuted;
    activeTracksRef.current = activeTracks;
  }, [currentTrack, isPlaying, isShuffle, autoAdvance, volume, isMuted, activeTracks]);

  const selectNextTrackRef = useRef<() => void>(() => {});

  // Select a track without forcing autoplay if currently paused
  const selectTrack = useCallback((track: AudioTrack, shouldPlay: boolean = true) => {
    if (!audioRef.current) return;
    setCurrentTrack(track);
    currentTrackRef.current = track;

    audioRef.current.src = track.src;
    audioRef.current.volume = isMutedRef.current ? 0 : volumeRef.current;

    if (shouldPlay || isPlayingRef.current) {
      setIsLoading(true);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn("Audio playback notice:", err);
          setIsLoading(false);
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    selectTrack(track, true);
  }, [selectTrack]);

  const selectNextTrack = useCallback(() => {
    const trackList = activeTracksRef.current.length > 0 ? activeTracksRef.current : READING_AUDIO_TRACKS;
    if (isShuffleRef.current) {
      const randomIndex = Math.floor(Math.random() * trackList.length);
      selectTrack(trackList[randomIndex], isPlayingRef.current);
    } else {
      const currentIndex = trackList.findIndex((t) => t.id === currentTrackRef.current.id);
      const nextIndex = (currentIndex + 1) % trackList.length;
      selectTrack(trackList[nextIndex], isPlayingRef.current);
    }
  }, [selectTrack]);

  const selectPrevTrack = useCallback(() => {
    const trackList = activeTracksRef.current.length > 0 ? activeTracksRef.current : READING_AUDIO_TRACKS;
    const currentIndex = trackList.findIndex((t) => t.id === currentTrackRef.current.id);
    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
    selectTrack(trackList[prevIndex], isPlayingRef.current);
  }, [selectTrack]);

  useEffect(() => {
    selectNextTrackRef.current = selectNextTrack;
  }, [selectNextTrack]);

  const handleSelectGenre = useCallback(
    (genreId: string) => {
      setSelectedGenre(genreId);
      const genreTracks = genreId === "all" ? READING_AUDIO_TRACKS : READING_AUDIO_TRACKS.filter((t) => t.category === genreId);
      if (genreTracks.length > 0) {
        // Switch track but preserve current play/pause state
        selectTrack(genreTracks[0], isPlayingRef.current);
      }
    },
    [selectTrack]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedVol = 0.35;
      try {
        const raw = localStorage.getItem(VOLUME_STORAGE_KEY);
        if (raw) savedVol = parseFloat(raw);
      } catch {}
      setVolumeState(savedVol);

      const audio = new Audio();
      audio.loop = false;
      audio.autoplay = false; // Completely disable browser autoplay
      audio.volume = savedVol;
      audioRef.current = audio;

      audio.onwaiting = () => setIsLoading(true);
      audio.onplaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsLoading(false);
        setIsPlaying(false);
      };
      audio.onended = () => {
        if (autoAdvanceRef.current) {
          selectNextTrackRef.current();
        } else {
          // Explicit manual pause on track finish
          setIsPlaying(false);
        }
      };

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src || audioRef.current.src === "") {
        audioRef.current.src = currentTrack.src;
      }
      setIsLoading(true);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn("Manual audio play notice:", err);
          setIsLoading(false);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, currentTrack]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, clamped.toString());
    } catch {}
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      setIsMuted(false);
      audioRef.current.volume = volume;
    } else {
      setIsMuted(true);
      audioRef.current.volume = 0;
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
    selectTrack,
    togglePlay,
    setVolume,
    toggleMute,
    selectNextTrack,
    selectPrevTrack,
    toggleShuffle,
    toggleAutoAdvance,
  };
}
