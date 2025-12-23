import React, { useState } from 'react';

import { RegistrationData, QuestClass, PlayerStats } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { generateQuestProfile } from '@/service/gemini';

const RegistrationQuest: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', passion: '' });
  const [playerProfile, setPlayerProfile] = useState<RegistrationData | null>(null);

 const handleStartQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profile = await generateQuestProfile(formData.name, formData.passion);
      if (profile) {
        setPlayerProfile({
          name: formData.name,
          email: formData.email,
          role: profile.questClass,
          questClass: profile.questClass as QuestClass,
          stats: profile.stats,
          characterBio: profile.bio
        });
        setStep(2);
      }
    } catch (err) {
      console.error("Initiation protocol failed", err);
    } finally {
      setLoading(false);
    }
  };
;

  const radarData = playerProfile ? [
    { subject: 'Innovation', A: playerProfile.stats.innovation, fullMark: 100 },
    { subject: 'Resilience', A: playerProfile.stats.resilience, fullMark: 100 },
    { subject: 'Leadership', A: playerProfile.stats.leadership, fullMark: 100 },
    { subject: 'Risk', A: playerProfile.stats.riskTaking, fullMark: 100 },
  ] : [];

  return (
    <section id="register" className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-horror text-5xl md:text-7xl font-black mb-4 italic tracking-tight text-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">THE INITIATION</h2>
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-sky-500/50 font-orbitron text-[10px] tracking-[0.3em] uppercase underline decoration-red-900">Window: Dec 23 - 26 / Hawkins Time</span>
            <p className="text-sky-100/40 max-w-lg text-lg font-horror italic font-light italic">Calibrate your frequency. Discover your role in the upcoming breach.</p>
          </div>
        </div>

        <div className="glass-ice rounded-2xl p-8 md:p-12 relative border-sky-400/10 bg-[#020205]/80">
          {step === 1 ? (
            <form onSubmit={handleStartQuest} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-orbitron font-bold tracking-widest text-sky-800 uppercase">Subject Identifier</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Subject Name"
                    className="w-full bg-black border border-sky-900/30 rounded px-4 py-4 focus:border-red-600 outline-none transition-all text-white font-horror italic text-xl"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-orbitron font-bold tracking-widest text-sky-800 uppercase">Encrypted Link</label>
                  <input 
                    required
                    type="email" 
                    placeholder="comms@nita.ac.in"
                    className="w-full bg-black border border-sky-900/30 rounded px-4 py-4 focus:border-red-600 outline-none transition-all text-white font-horror italic text-xl"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-orbitron font-bold tracking-widest text-sky-800 uppercase">Subject Motivation / Core Skills</label>
                <textarea 
                  required
                  placeholder="What fuels your fire in the dark? Describe your drive..."
                  className="w-full bg-black border border-sky-900/30 rounded px-4 py-4 focus:border-red-600 outline-none transition-all text-white h-32 font-horror italic text-xl"
                  value={formData.passion}
                  onChange={(e) => setFormData({...formData, passion: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                disabled={loading}
                className="w-full py-5 bg-red-700 text-white rounded font-horror font-black hover:bg-red-600 transition-all disabled:opacity-50 flex justify-center items-center gap-3 uppercase tracking-widest text-xl italic"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Decoding DNA...
                  </>
                ) : 'Calibrate Frequency'}
              </button>
            </form>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-orbitron tracking-[0.3em] text-red-600 mb-2 uppercase font-bold">Class Identified</h3>
                  <h4 className="text-5xl font-horror font-black text-white italic tracking-tight">{playerProfile?.questClass}</h4>
                </div>
                
                <div className="p-6 bg-red-950/20 rounded border border-red-900/30 italic text-sky-100/60 text-lg font-horror">
                   "{playerProfile?.characterBio}"
                </div>

                <div className="space-y-4">
                  <h5 className="text-[10px] font-orbitron tracking-[0.3em] text-sky-900 uppercase font-bold">Neural Breakdown</h5>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#221111" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#444', fontSize: 10, fontStyle: 'italic' }} />
                        <Radar
                          name="Stats"
                          dataKey="A"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-red-600 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative w-56 h-56 rounded border border-red-900/50 glass-ice flex items-center justify-center p-4">
                      <img 
                        src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${playerProfile?.name}&backgroundColor=000000`} 
                        alt="Avatar" 
                        className="w-full h-full object-contain grayscale brightness-150"
                      />
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                    <p className="text-white font-horror font-black italic tracking-widest text-2xl uppercase">Subject {playerProfile?.name} Locked</p>
                    <p className="text-sky-500/40 text-xs font-orbitron">Calibration Complete. Signal Stable.</p>
                </div>

                <div className="w-full space-y-4">
                  <button className="w-full py-5 bg-white text-black font-horror font-black rounded hover:bg-sky-100 transition-all uppercase tracking-widest text-lg italic">
                    Finalize on Unstop Lab
                  </button>
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full text-xs font-orbitron text-red-950 hover:text-red-500 transition-colors uppercase tracking-widest"
                  >
                    Reset Experiment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationQuest;