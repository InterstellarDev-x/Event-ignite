import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventSection from './components/EventSection';
import RegistrationQuest from './components/RegistrationQuest';
import Footer from './components/Footer';
import AudioPlayer, { AudioPlayerHandle } from './components/AudioPlayer';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const audioHandleRef = useRef<AudioPlayerHandle>(null);

  const startExperience = () => {
    // CRITICAL: Call play() directly in the click event to satisfy browser autoplay requirements
    audioHandleRef.current?.play();
    setHasStarted(true);
  };

  return (
    <div className="min-h-screen bg-[#010103] text-white selection:bg-red-600 selection:text-white">
      {/* Interaction Gate / Splash Screen */}
      {!hasStarted && (
        <div className="fixed inset-0 z-[999] bg-[#010103] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(255,0,0,0.1) 0%, transparent 70%) pointer-events-none"></div>
          
          <div className="relative z-10 text-center space-y-12">
            <div className="space-y-4">
              <div className="w-1 h-20 bg-red-600 mx-auto animate-pulse"></div>
              <h1 className="font-orbitron font-black text-xs tracking-[1em] text-red-600 uppercase opacity-50 animate-pulse">
                Establishing Uplink
              </h1>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-horror italic font-black text-white tracking-tighter uppercase">
                ECell NITA Archives
              </h2>
              <p className="text-zinc-500 font-orbitron text-[9px] tracking-[0.5em] uppercase">
                Protocol: Ignite 2.0 // Location: NIT Agartala
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={startExperience}
                className="group relative px-20 py-6 overflow-hidden rounded-full transition-all border border-white/10 hover:border-red-600 hover:shadow-[0_0_50px_rgba(255,26,26,0.3)] active:scale-95"
              >
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <span className="relative text-white font-orbitron font-black uppercase text-[10px] tracking-[0.6em] italic group-hover:text-red-500 transition-colors">
                  Authorize & Enter
                </span>
              </button>
              
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                <p className="text-zinc-600 font-orbitron text-[7px] tracking-[0.3em] uppercase">
                  Encrypted Audio Ready for Transmission
                </p>
              </div>
            </div>
          </div>

          {/* Glitch Overlay Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Precision Grid Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <Navbar />
        
        <main className="relative z-10">
          <Hero />
          
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <EventSection />
          
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-900/10 to-transparent"></div>
          
          <RegistrationQuest />
        </main>

        <Footer />
      </div>

      <AudioPlayer ref={audioHandleRef} />
    </div>
  );
};

export default App;