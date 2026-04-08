import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const EventPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date set 30 days from now for demo purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient light */}
      <div style={{
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 42, 42, 0.1) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
        filter: 'blur(50px)'
      }} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <h2 style={{ color: 'var(--color-neon-blue)', letterSpacing: '0.3em', marginBottom: '1rem', fontSize: '1rem' }}>
          THE STARTING GRID AWAITS
        </h2>
        <h1 className="title-font" style={{ fontSize: '4rem', marginBottom: '4rem', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
          RACE COMMENCES IN
        </h1>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {timeBlocks.map((block, i) => (
            <motion.div 
              key={block.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="glass"
              style={{
                padding: '2rem',
                minWidth: '150px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <span style={{ 
                fontFamily: 'Orbitron', 
                fontSize: '4rem', 
                fontWeight: 800,
                color: '#fff',
                textShadow: '0 0 15px rgba(255, 42, 42, 0.6)'
              }}>
                {block.value.toString().padStart(2, '0')}
              </span>
              <span style={{ 
                marginTop: '0.5rem', 
                color: 'var(--color-text-dim)', 
                letterSpacing: '0.2em',
                fontSize: '0.8rem'
              }}>
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '5rem',
            padding: '1rem 4rem',
            background: 'var(--color-neon-red)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontFamily: 'Orbitron',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(255, 42, 42, 0.5)'
          }}
        >
          RSVP NOW
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EventPage;
