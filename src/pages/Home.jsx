import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  // Speeding car elements
  const cars = [
    { id: 1, delay: 0, top: '60%', color: '#ff2a2a', duration: 1.2 },
    { id: 2, delay: 3, top: '65%', color: '#00d2ff', duration: 0.9 },
    { id: 3, delay: 6.5, top: '70%', color: '#d4af37', duration: 1.5 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10%',
      }}
    >
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/bg_cinematic.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2,
        transform: 'scale(1.05)', // base scale to allow zoom out
      }} />

      {/* Racetrack Overlay Gradient (for text readability) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 50%, transparent 0%, rgba(10,10,12,0.8) 100%)',
        zIndex: -1,
      }} />

      {/* Speeding Car Animations */}
      {cars.map((car) => (
        <motion.div
          key={car.id}
          animate={{ x: ['120vw', '-20vw'] }}
          transition={{
            repeat: Infinity,
            duration: car.duration,
            delay: car.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: car.top,
            width: '150px',
            height: '4px',
            background: car.color,
            boxShadow: `0 0 20px 5px ${car.color}`,
            borderRadius: '50%',
            filter: 'blur(2px)',
            zIndex: 0,
          }}
        />
      ))}

      {/* Hero Content */}
      <div style={{ zIndex: 1, maxWidth: '600px' }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <h2 style={{ 
            fontFamily: 'Inter', 
            fontSize: 'clamp(0.8rem, 2vw, 1.2rem)', 
            color: 'var(--color-text-dim)',
            letterSpacing: '0.4em',
            marginBottom: '1rem'
          }}>
            THE ULTIMATE VIP EVENT
          </h2>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            lineHeight: 1.1,
            marginBottom: '2rem',
            textShadow: '0 10px 30px rgba(0,0,0,0.8)'
          }} className="title-font">
            IAN THE CHEF'S <br/>
            <span className="text-gradient">GRAND PRIX</span>
          </h1>
          <p style={{
            fontFamily: 'Inter',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            lineHeight: 1.6,
            color: 'var(--color-text-dim)',
            marginBottom: '3rem',
            maxWidth: '500px'
          }}>
            Experience the pinnacle of luxury motorsport. Neon-lit tracks, roaring engines, and the cinematic elite style. Welcome to the magic.
          </p>
          
          <motion.button 
            onClick={() => {
              const audio = document.getElementById('global-engine-audio');
              if (audio) {
                audio.volume = 0.8;
                audio.play().catch(e => console.log(e));
              }
              navigate('/birthday');
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 42, 42, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: '2rem',
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 5vw, 3rem)',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-neon-red)',
              color: '#fff',
              fontFamily: 'Orbitron',
              fontWeight: 600,
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              background: 'rgba(255, 42, 42, 0.1)',
              backdropFilter: 'blur(5px)',
            }}
          >
            ENTER THE PADDOCK
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
