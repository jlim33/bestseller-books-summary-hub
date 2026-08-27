import { useState, useEffect, useRef, useCallback } from "react";
import { RELAXING_AUDIO_TRACKS } from "@/lib/audioTracks";
import { AudioTrack } from "@/lib/types";
import { getStoredVolume, setStoredVolume } from "@/lib/storage";

export function useHealingAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(RELAXING_AUDIO_TRACKS[0]);
  const [volume, setVolumeState] = useState<number>(0.35);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVol = getStoredVolume();
      setVolumeState(savedVol);

      const audio = new Audio();
      audio.loop = true;
      audio.volume = savedVol;
      audioRef.current = audio;

      audio.onwaiting = () => setIsLoading(true);
      audio.onplaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = (e) => {
        console.warn("Audio playback error:", e);
        setIsLoading(false);
        setIsPlaying(false);
      };

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    if (!audioRef.current) return;
    setCurrentTrack(track);
    setIsLoading(true);

    if (audioRef.current.src !== track.src) {
      audioRef.current.src = track.src;
    }

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("Audio auto-play policy or network issue:", err);
        setIsLoading(false);
        setIsPlaying(false);
      });
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
          console.warn("Play error:", err);
          setIsLoading(false);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, currentTrack]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    setStoredVolume(clamped);
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

  const selectNextTrack = useCallback(() => {
    const currentIndex = RELAXING_AUDIO_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % RELAXING_AUDIO_TRACKS.length;
    playTrack(RELAXING_AUDIO_TRACKS[nextIndex]);
  }, [currentTrack, playTrack]);

  const selectPrevTrack = useCallback(() => {
    const currentIndex = RELAXING_AUDIO_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + RELAXING_AUDIO_TRACKS.length) % RELAXING_AUDIO_TRACKS.length;
    playTrack(RELAXING_AUDIO_TRACKS[prevIndex]);
  }, [currentTrack, playTrack]);

  return {
    isPlaying,
    isLoading,
    currentTrack,
    tracks: RELAXING_AUDIO_TRACKS,
    volume,
    isMuted,
    playTrack,
    togglePlay,
    setVolume,
    toggleMute,
    selectNextTrack,
    selectPrevTrack,
  };
}
