import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-center pointer-events-none">
      <div className="max-w-5xl w-full flex justify-between items-center glass-ice px-8 py-3 rounded-xl border-white/5 pointer-events-auto">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-8 h-8 bg-red-950 text-red-500 border border-red-500/50 rounded flex items-center justify-center font-horror font-black text-xl transition-all group-hover:bg-red-600 group-hover:text-white">011</div>
          <span className="font-horror font-bold text-lg tracking-[0.2em] text-white italic">ECell Archives</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-12 text-[10px] font-bold tracking-[0.3em] font-orbitron uppercase text-sky-300/50">


          <a href="https://unstop.com" target="_blank" className="text-red-500 hover:text-red-400 transition-colors border-l border-white/10 pl-12 font-black italic text-sm font-horror tracking-normal">Access Unstop</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;