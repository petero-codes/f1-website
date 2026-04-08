import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

const Birthday = () => {
  const audioRef = useRef(null);
  const [stage, setStage] = useState(1);

  // Initial Sequence orchestrator
  useEffect(() => {
    // Sequence Timeouts
    const t1 = setTimeout(() => setStage(2), 3000); // 3s: Transform to track
    const t2 = setTimeout(() => setStage(3), 5000); // 5s: Ian Photos as Background
    const t3 = setTimeout(() => setStage(4), 7500); // 7.5s: 3D text neon boxes pop
    // Sequence stops at Stage 4. 

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleCosmicToggle = (e) => {
    if (e.target.checked) {
      // User triggered the finale
      setTimeout(() => setStage(5), 1000); // Wait 1s so they see the toggle animation, then Loader
      setTimeout(() => setStage(6), 3500); // Load images
      setTimeout(() => setStage(7), 5500); // Fire Matrix Rain
      setTimeout(() => setStage(8), 8500); // Build 'KAKUBAMBE' from behind the matrix
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      background: '#050505',
    }}>
      {/* =========================================
          STAGE 7: MATRIX RAIN IN BACKGROUND
          ========================================= */}
      <AnimatePresence>
        {stage >= 7 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="matrix-container"
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          >
            {[1,2,3].map(p => (
              <div key={p} className="matrix-pattern">
                {Array.from({length: 40}).map((_, i) => (
                  <div key={i} className="matrix-column" />
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 2: The Track Background (Fades out at stage 3) */}
      <AnimatePresence>
        {stage >= 2 && stage < 3 && (
          <motion.div
            key="track-bg"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1.1 }} exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: 'absolute', inset: '-10%', backgroundImage: 'url(/bg_cinematic.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 2 }}
          >
            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom, rgba(255, 42, 42, 0.4) 0%, transparent 60%)', mixBlendMode: 'overlay' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 1: The Spinning/Vibrating Wheel */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            key="wheel"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 8, opacity: 0, filter: "blur(20px)", transition: { duration: 1, ease: "circIn" } }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}
          >
            <motion.div animate={{ x: [-2, 2, -1, 1, 0], y: [1, -1, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 0.1 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
                style={{ width: '200px', height: '200px', borderRadius: '50%', border: '12px dashed #ff2a2a', boxShadow: '0 0 50px rgba(255, 42, 42, 0.8), inset 0 0 40px rgba(255, 42, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 20px #fff' }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 3+: Ian's Photos Background */}
      <AnimatePresence>
        {stage >= 3 && stage < 7 && (
          <motion.div
            key="ian-bg"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: [1, 1.05], transition: { opacity: { duration: 2 }, scale: { duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" } } }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)", transition: { duration: 2 } }}
            style={{ position: 'absolute', inset: '-5%', display: 'flex', zIndex: 2 }}
          >
            <div style={{ flex: 1, backgroundImage: 'url(/ian2.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'contrast(1.15) brightness(0.6)' }} />
            <div style={{ flex: 1, backgroundImage: 'url(/ian3.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'contrast(1.15) brightness(0.6)' }} />
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '40vw', height: '100%', background: 'linear-gradient(to right, transparent, rgba(5,5,5,0.9), transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.9) 100%)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 4: Center Messages and Interactive Trigger */}
      <AnimatePresence>
        {stage >= 4 && stage < 5 && (
          <motion.div 
            key="stage-4-msg"
            exit={{ opacity: 0, y: -50, scale: 0.9 }} transition={{ duration: 1 }}
            className="perspective-container" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
          >
            <motion.div
              initial={{ opacity: 0, rotateX: -60, y: 150, scale: 0.8 }} animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }} transition={{ duration: 1.5, type: "spring", stiffness: 40, damping: 15 }}
              className="mirrormorphism"
              style={{ padding: '4rem 5rem', maxWidth: '900px', textAlign: 'center', background: 'rgba(10, 10, 12, 0.5)' }}
            >
              <h1 className="title-font" style={{ fontSize: '4.5rem', marginBottom: '2rem', color: 'var(--color-gold)', textShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 5px 15px rgba(0,0,0,0.9)', lineHeight: 1.1 }}>
                Happy Birthday, Ian. 🏎️✨
              </h1>

              <div style={{ fontFamily: 'Inter', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.2 }} style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'rgba(255, 42, 42, 0.05)', border: '1px solid var(--color-neon-red)', boxShadow: '0 0 20px rgba(255, 42, 42, 0.2), inset 0 0 15px rgba(255, 42, 42, 0.1)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', textShadow: '0 0 10px var(--color-neon-red), 0 0 20px var(--color-neon-red)', letterSpacing: '0.05em' }}>A year of speed, precision, and victory awaits.</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1.2 }} style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'rgba(0, 210, 255, 0.05)', border: '1px solid var(--color-neon-blue)', boxShadow: '0 0 20px rgba(0, 210, 255, 0.2), inset 0 0 15px rgba(0, 210, 255, 0.1)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', textShadow: '0 0 10px var(--color-neon-blue), 0 0 20px var(--color-neon-blue)', letterSpacing: '0.05em' }}>May your days shine as bright as the track lights,<br />and may every lap be legendary.</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4, duration: 1.5 }} style={{ padding: '1.2rem 2.5rem', borderRadius: '12px', background: 'rgba(212, 175, 55, 0.05)', border: '1px solid var(--color-gold)', boxShadow: '0 0 25px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.15)', marginTop: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', textShadow: '0 0 10px var(--color-gold), 0 0 20px var(--color-gold)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Here’s to owning the circuit of life, like only you can.</span>
                </motion.div>

                {/* THE COSMIC TOGGLE - Fades in AFTER the message (delay 6.5s) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 6.5, duration: 1.5 }}
                  style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <label className="cosmic-toggle">
                    <input className="toggle" type="checkbox" onChange={handleCosmicToggle} />
                    <div className="slider">
                      <div className="cosmos"></div>
                      <div className="energy-line"></div>
                      <div className="energy-line"></div>
                      <div className="energy-line"></div>
                      <div className="toggle-orb"><div className="inner-orb"></div><div className="ring"></div></div>
                      <div className="particles">
                        <div style={{ '--angle': '30deg' }} className="particle"></div>
                        <div style={{ '--angle': '60deg' }} className="particle"></div>
                        <div style={{ '--angle': '90deg' }} className="particle"></div>
                        <div style={{ '--angle': '120deg' }} className="particle"></div>
                        <div style={{ '--angle': '150deg' }} className="particle"></div>
                        <div style={{ '--angle': '180deg' }} className="particle"></div>
                      </div>
                    </div>
                  </label>
                  <div style={{ fontFamily: 'Orbitron', fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '1rem', letterSpacing: '0.2em' }}>
                    INITIATE SYSTEM FINALE
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 5: LOADING SEQUENCE */}
      <AnimatePresence>
        {stage >= 5 && stage < 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5 }} transition={{ duration: 1 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 25 }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Loader2 size={64} color="var(--color-neon-blue)" style={{ filter: 'drop-shadow(0 0 10px var(--color-neon-blue))' }} />
            </motion.div>
            <h2 style={{ fontFamily: 'Orbitron', fontWeight: 600, color: '#fff', marginTop: '1.5rem', letterSpacing: '0.3em', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>SYSTEM OVERRIDE</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 6: THE 3 NEW IMAGES WITH MIRRORMORPHISM */}
      <AnimatePresence>
        {stage >= 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', zIndex: 20, padding: '2rem' }}
            className="perspective-container"
          >
            <motion.div initial={{ rotateY: 30, y: 100, opacity: 0 }} animate={{ rotateY: 15, y: 0, opacity: 1 }} transition={{ duration: 1.5, type: 'spring' }} className="mirrormorphism"
              style={{ width: '300px', height: '450px', background: 'rgba(0,255,65,0.05)', border: '1px solid rgba(0,255,65,0.3)', overflow: 'hidden' }}>
              <img src="/51c1312c-c1a4-46c0-9062-265f013f9ab0-scaled.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, mixBlendMode: 'screen' }} />
            </motion.div>

            <motion.div initial={{ y: 150, z: 100, opacity: 0 }} animate={{ y: 0, z: 50, opacity: 1 }} transition={{ duration: 1.5, delay: 0.5, type: 'spring' }} className="mirrormorphism"
              style={{ width: '350px', height: '500px', background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.5)', overflow: 'hidden', boxShadow: '0 0 40px rgba(0,255,65,0.2)' }}>
              <img src="/360_F_553226572_EY85Xctwm2OS4KFN3YnkNA6bx2rFmAY4.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'hard-light' }} />
            </motion.div>

            <motion.div initial={{ rotateY: -30, y: 100, opacity: 0 }} animate={{ rotateY: -15, y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.8, type: 'spring' }} className="mirrormorphism"
              style={{ width: '300px', height: '450px', background: 'rgba(0,255,65,0.05)', border: '1px solid rgba(0,255,65,0.3)', overflow: 'hidden' }}>
              <img src="/a2bdcac34aa77a748ef48558cbc54c02.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, mixBlendMode: 'screen' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 8: THE ROBOTIC TEXT ASSEMBLY */}
      <AnimatePresence>
        {stage >= 8 && (
          <div 
            className="perspective-container"
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40, pointerEvents: 'none' }}
          >
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {"KAKUBAMBE".split('').map((letter, index) => {
                const randomX = (Math.random() - 0.5) * 2000;
                const randomY = (Math.random() - 0.5) * 2000;
                const randomRotateX = (Math.random() - 0.5) * 720;
                const randomRotateY = (Math.random() - 0.5) * 720;
                
                return (
                  <motion.div
                    key={index}
                    initial={{
                      z: -4000,
                      x: randomX,
                      y: randomY,
                      rotateX: randomRotateX,
                      rotateY: randomRotateY,
                      opacity: 0,
                      filter: 'blur(10px)'
                    }}
                    animate={{
                      z: 0,
                      x: 0,
                      y: 0,
                      rotateX: 0,
                      rotateY: 0,
                      opacity: 1,
                      filter: 'blur(0px)'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,    // High stiffness for snap
                      damping: 10,       // Low damping for slight mechanical recoil
                      mass: 1.5,
                      delay: index * 0.15 // Robotic Stagger
                    }}
                    style={{
                      fontFamily: 'Orbitron',
                      fontSize: '8rem',
                      fontWeight: 800,
                      color: 'var(--color-gold)',
                      textShadow: '0 0 40px rgba(212, 175, 55, 0.8), 2px 2px 0px #000, -2px -2px 0px #fff',
                      background: 'linear-gradient(180deg, #fff 0%, var(--color-gold) 50%, #8a6a1c 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))'
                    }}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Birthday;
