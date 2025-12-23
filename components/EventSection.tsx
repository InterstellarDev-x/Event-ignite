import React, { useRef, useState } from 'react';

const PHASES = [
  {
    num: 'INCIDENT 01',
    title: 'Neural Link',
    desc: 'Rapid Fire Quiz. 25-30 mental shocks to test your cognitive limits. Only the fastest survive.',
    date: 'Dec 27',
    tag: 'Frequency: Zero-G',
    reward: 'Grade B'
  },
  {
    num: 'INCIDENT 02',
    title: 'Strategic Breach',
    desc: 'The Lab selects top guilds to solve deep-rooted anomalies. Sub-zero precision required.',
    date: 'Dec 30',
    tag: 'Cryo-Meet',
    reward: 'Grade A'
  },
  {
    num: 'INCIDENT 03',
    title: 'The Final Rift',
    desc: 'The Grand Presentation. Transmit your vision through the frozen void to the High Council.',
    date: 'Jan 02',
    tag: 'Unstop Portal',
    reward: 'Archive Found'
  }
];

const TiltCard = ({ children, className }: { children: React.ReactNode, className: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(165,243,252,0.1), transparent 80%)`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      background: `none`
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-all duration-300 ease-out cursor-crosshair`}
      style={style}
    >
      {children}
    </div>
  );
};

const EventSection: React.FC = () => {
  return (
    <section id="events" className="py-48 px-6 bg-[#020205] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 mb-32 items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-cyan-600"></div>
              <span className="text-[9px] font-orbitron font-black tracking-[0.6em] text-cyan-600 uppercase">Operation Logs</span>
            </div>
            <h2 className="text-6xl md:text-[7rem] font-horror font-black text-white leading-none tracking-tight uppercase italic drop-shadow-[0_0_15px_rgba(165,243,252,0.3)]">
              EXPERIMENTAL<br/>PHASES
            </h2>
          </div>
          <div></div>
          <div className="space-y-10  ">
            <p className="text-sky-100/40 text-xl font-horror italic leading-relaxed">
              Files accessible <span className="text-white underline decoration-cyan-400/30">Dec 23 - 26</span>. <br/>
              Synchronization requires at least one <span className="text-cyan-400">female subject</span>.
            </p>
           
            <div className="glass-ice p-8 border-l-4 border-l-cyan-600 relative     overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-[40px] font-horror text-white">SUB-ZERO</span>
              </div>
              
              <h4 className="text-[10px] font-orbitron text-cyan-500 tracking-[0.4em] uppercase font-black mb-6">Loot Manifest</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-[8px] font-orbitron text-sky-700 tracking-widest uppercase">Squad 01</p>
                  <p className="text-white text-2xl font-horror font-black italic group-hover:text-cyan-400 transition-colors">₹3,000</p>
                </div>
                <div className="space-y-1 border-x border-white/5 px-4">
                  <p className="text-[8px] font-orbitron text-sky-700 tracking-widest uppercase">Squad 02</p>
                  <p className="text-white text-2xl font-horror font-black italic group-hover:text-cyan-400 transition-colors">₹2,000</p>
                </div>
                <div className="space-y-1 text-right md:text-left">
                  <p className="text-[8px] font-orbitron text-sky-700 tracking-widest uppercase">Squad 03</p>
                  <p className="text-white text-2xl font-horror font-black italic group-hover:text-cyan-400 transition-colors">₹1,000</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PHASES.map((p, idx) => (
            <TiltCard key={idx} className="p-10 space-y-10 glass-ice rounded-xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start">
                <span className="text-xs font-orbitron font-black text-cyan-600 tracking-widest">{p.num}</span>
                <span className="text-[10px] font-orbitron font-black text-sky-500/30 group-hover:text-white transition-colors uppercase">{p.date}</span>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl font-horror font-black text-white italic group-hover:text-cyan-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sky-100/40 text-sm leading-relaxed font-horror italic">
                  {p.desc}
                </p>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-orbitron text-sky-900 tracking-widest uppercase">Link</span>
                  <span className="text-[10px] font-horror text-sky-300 italic">{p.tag}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[8px] font-orbitron text-sky-900 tracking-widest uppercase">Reward</span>
                  <span className="text-[10px] font-horror text-red-500 font-bold italic">{p.reward}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;