import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import MediaGrid from './components/MediaGrid';
import Sponsors from './components/Sponsors';
import MapLocation from './components/MapLocation';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollY } = useScroll();

  // Background grid subtle parallax (moves slightly slower than scroll)
  const gridY = useTransform(scrollY, [0, 5000], [0, 800]);
  
  // Floating abstract orbs/dividers tied to scroll for depth
  const orb1Y = useTransform(scrollY, [0, 3000], [0, 600]);
  const orb2Y = useTransform(scrollY, [0, 4000], [0, -500]);
  const orb3Y = useTransform(scrollY, [0, 5000], [0, 700]);

  return (
    <div className="relative min-h-screen bg-[#0B0F2F] text-white selection:bg-electric/30 selection:text-white">
      {/* Global Parallax Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: gridY }}
          className="bg-grid absolute top-[-50vh] bottom-[-50vh] left-0 right-0 opacity-80" 
        />
        {/* Ambient glowing section dividers */}
        <motion.div 
          style={{ y: orb1Y }}
          className="absolute top-[25%] left-[-15%] w-[800px] h-[800px] rounded-full bg-neon-purple/5 blur-[120px]" 
        />
        <motion.div 
          style={{ y: orb2Y }}
          className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-electric/5 blur-[130px]" 
        />
        <motion.div 
          style={{ y: orb3Y }}
          className="absolute top-[85%] left-[5%] w-[700px] h-[700px] rounded-full bg-hot-pink/5 blur-[150px]" 
        />
      </div>

      {/* Persistent Corner Decor */}
      <div className="fixed bottom-0 right-0 w-[200px] h-[200px] border-r-2 border-b-2 border-electric m-5 rounded-br-[40px] opacity-30 pointer-events-none z-50 mix-blend-screen" />
      
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />
      
      <main className="relative z-10">
        <Hero onRegisterClick={() => setIsModalOpen(true)} />
        <About />
        <MediaGrid />
        <Timeline />
        <Sponsors />
        <MapLocation />
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <RegistrationModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
