import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'PADDOCK', path: '/' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'RACE DAY', path: '/event' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
      className="glass"
    >
      <div style={{ fontFamily: 'Orbitron', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.1em' }} className="glow-red">
        IAN THE CHEF'S GP
      </div>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              style={{
                textDecoration: 'none',
                color: isActive ? '#fff' : '#a0a0a0',
                fontFamily: 'Orbitron',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                transition: 'all 0.3s ease',
                textShadow: isActive ? '0 0 10px rgba(0, 210, 255, 0.5)' : 'none'
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
