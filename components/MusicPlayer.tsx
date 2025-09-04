'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MusicPlayerProps } from '@interfaces';
import { FaPlay, FaPause } from 'react-icons/fa';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state to track loading
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play().catch(error => console.error("Play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const playNext = useCallback(() => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);

    setIsLoading(true);
  }, [currentTrackIndex, playlist]);

  const playPrevious = useCallback(() => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);

    setIsLoading(true);
  }, [currentTrackIndex, playlist]);

  const onCanPlay = () => {
    setIsLoading(false);
  };

  const onEnded = useCallback(() => {
    playNext();
  }, [playNext]);

  useEffect(() => {
    const audioEl = audioRef.current;

    async function loadAudio() {
      if (audioEl) {
        setIsLoading(true);
        try {
          // Fetch from your secure API route
          const trackUrl = `/api/audio?track=${encodeURIComponent(playlist[currentTrackIndex].src)}`;
          const response = await fetch(trackUrl);

          if (!response.ok) {
            throw new Error(`Failed to load audio: ${response.statusText}`);
          }

          // Create a temporary Blob URL to prevent direct downloading.
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          audioEl.src = audioUrl;

          setIsLoading(false);
          // Auto-play the new song if the user previously had it playing.
          if (isPlaying) {
            audioEl.play().catch(error => console.error("Autoplay failed:", error));
          }

        } catch (error) {
          console.error("Error fetching or loading audio:", error);
          setIsLoading(false);
          setIsPlaying(false);
        }
      }
    }

    loadAudio();

    return () => {
      if (audioEl && audioEl.src) {
        URL.revokeObjectURL(audioEl.src);
      }
    };
  }, [currentTrackIndex, isPlaying, playlist]);

  return (
    <div className="z-[9999] fixed right-0 lg:bottom-0 xl:right-[2%] m-1 p-1 lg:pt-4 bg-white/10 text-white rounded-sm animate-pulse duration-75" >
      <audio
        ref={audioRef}
        loop={false}
        onEnded={onEnded}
        onCanPlay={onCanPlay}
      />
      <div className="flex space-x-4 justify-around">
        <button className="bg-transparent text-white p-0 rounded" onClick={playPrevious}>
          <GiPreviousButton className='hover:text-accent transition-all duration-300' />
        </button>
        <button className="bg-transparent text-white p-0 rounded" onClick={togglePlay}>
          {isPlaying ? <FaPause className='hover:text-accent transition-all duration-300' /> : <FaPlay className='hover:text-accent transition-all duration-300' />}
        </button>
        <button className="bg-transparent text-white p-0 rounded" onClick={playNext}>
          <GiNextButton className='hover:text-accent transition-all duration-300' />
        </button>
      </div>
      <div className="hidden xl:block mt-2 mx-2 overflow-hidden" style={{ width: '150px', height: '25px' }}>
        <div className="inline-block">
          <p className="text-[10px] inline mr-4 animate-marquee text-[#e68e2e]">
            Current track: <strong>{playlist[currentTrackIndex].title}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
