import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const images = [
  { id: 1, src: '/ian2.jpeg', alt: 'Ian - Horizon', desc: 'THE VISION', span: 'col-span-2 row-span-2' },
  { id: 2, src: '/ian3.jpeg', alt: 'Ian - Night Paddock', desc: 'VIP ACCESS', span: 'col-span-1 row-span-2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1541348263662-e068f62f4a58?q=80&w=1000&auto=format&fit=crop', alt: 'F1 Track', desc: 'THE TRACK', span: 'col-span-1 row-span-1' },
  { id: 4, src: 'https://images.unsplash.com/photo-1533045620959-5438885b5e91?q=80&w=1000&auto=format&fit=crop', alt: 'Legendary Moment', desc: 'CHAMPION MOMENT', span: 'col-span-2 row-span-1' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: '100vh',
        padding: '8rem 2rem 5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 className="title-font" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          LEGENDARY <span className="text-gradient">MOMENTS</span>
        </h2>
        <p style={{ color: 'var(--color-text-dim)', maxWidth: '600px', margin: '0 auto' }}>
          Cinematic high-contrast captures from the track and exclusive paddock access.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        gridAutoRows: '300px',
      }}>
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            layoutId={`image-container-${img.id}`}
            onClick={() => setSelectedImage(img)}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              border: '1px solid var(--glass-border)'
            }}
          >
            <motion.img 
              src={img.src} 
              alt={img.alt} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(30%) contrast(120%)',
                transition: 'filter 0.5s ease',
              }}
              onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) contrast(100%)'}
              onMouseLeave={(e) => e.target.style.filter = 'grayscale(30%) contrast(120%)'}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem 1rem 1rem',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
            }}>
              <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', letterSpacing: '0.1em' }}>
                {img.desc}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 10, 12, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              layoutId={`image-container-${selectedImage.id}`}
              src={selectedImage.src}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 0 50px rgba(0, 210, 255, 0.2)'
              }}
            />
            <motion.button
              style={{
                position: 'absolute',
                top: '2rem',
                right: '3rem',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer',
                fontFamily: 'Orbitron'
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;
