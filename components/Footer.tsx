import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white text-black rounded flex items-center justify-center font-orbitron font-black text-lg"><img src="/E-CELL.png" alt="" /></div>
              <span className="font-orbitron font-black tracking-[0.5em] text-xl">ECell NITA</span>
            </div>
            <p className="text-zinc-600 text-sm max-w-xs font-light tracking-wide leading-relaxed">
              Fostering the spirit of innovation and entrepreneurship at NIT Agartala. The legacy continues.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-6">
              <h4 className="text-[10px] font-orbitron text-white tracking-[0.4em] uppercase font-black">Socials</h4>
              <ul className="space-y-4 text-xs font-orbitron tracking-widest text-zinc-500">
                <li><a href="https://www.instagram.com/ecellnita" className="hover:text-white transition-colors">INSTAGRAM</a></li>
                <li><a href="https://in.linkedin.com/company/ecellnita" className="hover:text-white transition-colors">LINKEDIN</a></li>

              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-orbitron text-white tracking-[0.4em] uppercase font-black">Resources</h4>
              <ul className="space-y-4 text-xs font-orbitron tracking-widest text-zinc-500">
                <li><a href="https://unstop.com" className="hover:text-white transition-colors">UNSTOP LINK</a></li>

              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-orbitron text-zinc-700 tracking-[0.2em]">
            © 2025 NIT AGARTALA. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] font-orbitron text-zinc-800 tracking-[0.4em] uppercase">
            Designed for Titans.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;