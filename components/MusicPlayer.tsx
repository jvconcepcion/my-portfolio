'use client';

import React, { useState, useRef, useEffect  } from 'react';
import { MusicPlayerProps } from '@interfaces';
import { FaPlay, FaPause } from 'react-icons/fa';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(error => console.error(error));
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsReady(false); // Reset readiness
  };

  const playPrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setIsReady(false); // Reset readiness
  };

  const onCanPlay = () => {
    setIsReady(true); // Set readiness to true when audio can play
  };

  const onEnded = () => {
    playNext();
  };

  useEffect(() => {
    // Check if the audio element is ready and autoplay is allowed
    if (audioRef.current && isReady) {
      audioRef.current.play().catch(error => console.error(error));
      setIsPlaying(true); // Set isPlaying to true after play()
    }

  }, [isReady]);

  return (
    <div className="z-[9999] fixed right-0 lg:bottom-0 xl:right-[2%] m-1 p-1 lg:pt-4 bg-white/10 text-white rounded-sm animate-pulse duration-75" >
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex].src}
        loop={false}
        onEnded={onEnded}
        onCanPlay={onCanPlay} // Attach onCanPlay event handler
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
          {/* <p className="text-xs inline mr-4">Now Playing: {playlist[currentTrackIndex].title}</p> */}
          <p className="text-[10px] inline mr-4 animate-marquee text-[#e68e2e]">
            Now Playing: <strong>{playlist[currentTrackIndex].title}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
