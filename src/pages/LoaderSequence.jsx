import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoaderSequence = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Wait a bit before transition
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0a0a0c',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {/* Light streaks background effect */}
      <motion.div 
        animate={{ 
          x: ['-100vw', '100vw'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5, 
          ease: "linear" 
        }}
        style={{
          position: 'absolute',
          top: '30%',
          width: '50vw',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #ff2a2a, transparent)',
          filter: 'blur(4px)'
        }}
      />
      <motion.div 
        animate={{ 
          x: ['100vw', '-100vw'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.2, 
          ease: "linear",
          delay: 0.5
        }}
        style={{
          position: 'absolute',
          top: '70%',
          width: '40vw',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00d2ff, transparent)',
          filter: 'blur(3px)'
        }}
      />

      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          fontSize: '3rem', 
          fontWeight: 800, 
          letterSpacing: '0.2em',
          textAlign: 'center',
          color: '#fff',
          textShadow: '0 0 20px rgba(255, 42, 42, 0.6)'
        }}
        className="title-font"
      >
        IAN THE CHEF'S GRAND PRIX
      </motion.h1>

      {/* Loading Bar */}
      <div style={{
        marginTop: '2rem',
        width: '300px',
        height: '2px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          style={{
            height: '100%',
            backgroundColor: '#ff2a2a',
            boxShadow: '0 0 10px #ff2a2a'
          }}
        />
      </div>
      
      <div style={{
        marginTop: '1rem',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        color: '#a0a0a0'
      }}>
        SYSTEM INITIALIZING... {progress > 100 ? 100 : progress}%
      </div>
      
      {/* "Start Experience" Hint for Audio */}
      {progress >= 100 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            marginTop: '2rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            color: '#fff',
            opacity: 0.7
          }}
        >
          PREPARING TRACK
        </motion.p>
      )}
    </motion.div>
  );
};

export default LoaderSequence;
