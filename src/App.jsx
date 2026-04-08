import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import LoaderSequence from './pages/LoaderSequence';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import EventPage from './pages/Event';
import Birthday from './pages/Birthday';
import Navigation from './components/Navigation';

function AnimatedRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stop audio if not on birthday page
    if (location.pathname !== '/birthday') {
      const audio = document.getElementById('global-engine-audio');
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }, [location.pathname]);

  if (loading) {
    return <LoaderSequence onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <audio id="global-engine-audio" src="/engine.mp3" loop preload="auto" />
      {location.pathname !== '/birthday' && <Navigation />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/birthday" element={<Birthday />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
