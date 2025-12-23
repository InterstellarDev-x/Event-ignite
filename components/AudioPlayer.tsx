import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface AudioPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerHandle, {}>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Using a highly reliable direct MP3 link from SoundHelix for maximum compatibility
  // This is a high-energy synth-style track that fits the gaming/ecell vibe
  const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";

  useImperativeHandle(ref, () => ({
    play: async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.error("Manual playback failed:", e);
        }
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }));

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Toggle playback blocked:", e));
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => {
      setIsLoaded(true);
      setHasError(false);
    };
    const handleError = (e: any) => {
      console.error("Audio Source Error:", audio.error);
      setHasError(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[100] flex items-center gap-4 group">
      <audio 
        ref={audioRef} 
        src={AUDIO_URL} 
        loop 
        preload="auto"
      />
      
      <button 
        onClick={togglePlay}
        disabled={hasError}
        className={`relative w-14 h-14 rounded-full glass-obsidian border-white/10 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:border-red-600/50 shadow-2xl ${!isLoaded ? 'opacity-30 cursor-wait' : 'opacity-100'} ${hasError ? 'border-red-900 opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${isPlaying ? 'bg-red-600/20 scale-125 animate-pulse' : 'bg-red-600/5 group-hover:bg-red-600/10'}`}></div>
        
        {hasError ? (
          <div className="relative z-10 text-red-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
          </div>
        ) : isPlaying ? (
          <div className="flex items-end gap-[3px] h-5 relative z-10">
            <div className="w-[3px] bg-red-600 animate-[music_0.8s_ease-in-out_infinite] rounded-full"></div>
            <div className="w-[3px] bg-red-600 animate-[music_1.2s_ease-in-out_infinite_0.1s] rounded-full"></div>
            <div className="w-[3px] bg-red-600 animate-[music_0.5s_ease-in-out_infinite_0.2s] rounded-full"></div>
            <div className="w-[3px] bg-red-600 animate-[music_1.5s_ease-in-out_infinite_0.3s] rounded-full"></div>
          </div>
        ) : (
          <div className="relative z-10">
            <svg className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </button>

      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 pointer-events-none">
        <span className="text-[8px] font-orbitron font-black tracking-[0.4em] text-red-600 uppercase">
          {hasError ? 'Transmission Failure' : (isPlaying ? 'Intercepting Signal' : 'Signal Ready')}
        </span>
        <span className="text-[10px] font-horror italic text-zinc-500">
          {hasError ? 'MIME_TYPE_UNSUPPORTED' : 'Frequency // HAWKINS_011'}
        </span>
      </div>

      <style>{`
        @keyframes music {
          0%, 100% { height: 4px; opacity: 0.5; }
          50% { height: 20px; opacity: 1; }
        }
      `}</style>
    </div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';
export default AudioPlayer;