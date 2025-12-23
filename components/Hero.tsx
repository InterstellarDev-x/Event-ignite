
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define intrinsic elements as components to resolve TS errors for JSX.IntrinsicElements
const Mesh = 'mesh' as any;
const OctahedronGeometry = 'octahedronGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const SnowParticles = ({ count = 1000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a5f3fc"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

const FloatingMonolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Mesh ref={meshRef}>
        <OctahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#111111"
          emissive="#a5f3fc"
          emissiveIntensity={0.5}
          distort={0.3}
          speed={3}
          roughness={0}
          metalness={1}
        />
      </Mesh>
      <Mesh scale={[1.1, 1.1, 1.1]}>
        <OctahedronGeometry args={[1, 0]} />
        <MeshBasicMaterial color="#ff1a1a" wireframe opacity={0.1} transparent />
      </Mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <AmbientLight intensity={0.2} />
      <PointLight position={[10, 10, 10]} intensity={1} color="#a5f3fc" />
      <PointLight position={[-10, -10, -10]} intensity={0.5} color="#ff1a1a" />
      <FloatingMonolith />
      <SnowParticles count={1500} />
    </>
  );
};

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2024-12-26T23:59:59').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center px-4 md:px-8 border-x border-white/5 first:border-l-0 last:border-r-0">
      <span className="text-4xl md:text-6xl font-horror italic font-black text-red-600 drop-shadow-[0_0_15px_rgba(255,26,26,0.6)]">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[8px] font-orbitron tracking-[0.4em] text-cyan-400/50 uppercase mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-8 glass-ice rounded-2xl border-white/10 bg-black/40 backdrop-blur-3xl">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto space-y-12 pointer-events-none">
        <div className="flex flex-col items-center space-y-4 pointer-events-auto">
          <div className="px-6 py-2 border border-cyan-400/20 bg-cyan-400/5 text-cyan-200 text-[10px] font-orbitron tracking-[0.6em] uppercase font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
            Winter Protocol / Sector 7
          </div>
          
          <h1 className="text-[15vw] md:text-[13rem] leading-[0.75] italic font-horror select-none">
            <span className="block text-white stranger-glow">Ignite</span>
            <span className="block" style={{ WebkitTextStroke: '2px rgba(165,243,252,0.8)', filter: 'drop-shadow(0 0 20px rgba(165,243,252,0.4))', color: 'transparent', fontSize: '0.8em', marginTop: '-0.1em' }}>2.0</span>
          </h1>
          <p className="font-orbitron text-red-600 text-[10px] tracking-[1.5em] uppercase font-black -mt-4 opacity-70">The Winter Archive</p>
        </div>

        <div className="max-w-xl mx-auto relative group pointer-events-auto">
           <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-cyan-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
           <div className="relative">
              <p className="text-[10px] font-orbitron text-cyan-400 tracking-[0.5em] uppercase mb-4 font-black">Transmission Ends In:</p>
              <CountdownTimer />
           </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 pointer-events-auto">
          <a href="#register" className="group relative px-16 py-6 overflow-hidden bg-red-700 hover:bg-red-600 transition-all rounded-sm shadow-[0_0_30px_rgba(185,28,28,0.3)]">
            <span className="relative z-10 text-white font-horror font-black uppercase text-xl tracking-widest italic flex items-center gap-3">
              Enter the Rift <span className="text-2xl animate-bounce">↓</span>
            </span>
          </a>
          <a href="#events" className="px-16 py-6 border border-cyan-400/20 text-cyan-200 font-orbitron font-black uppercase text-[10px] tracking-[0.5em] hover:bg-cyan-400/10 transition-all rounded-sm backdrop-blur-sm">
            Event Manifest
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#010103] to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
