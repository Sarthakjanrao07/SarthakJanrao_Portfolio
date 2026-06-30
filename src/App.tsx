import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Portfolio } from './sections/Portfolio';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Footer } from './components/layout/Footer';
import { SocialSidebar } from './components/layout/SocialSidebar';
import { CpSidebar } from './components/layout/CpSidebar';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track active section on mobile (scroll-based)
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'experience', 'projects', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // IntersectionObserver: track hero visibility for sidebar show/hide (all devices)
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.15 } // hide sidebars when <15% of hero is visible
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);



  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    if (isMobile) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[var(--gold)] selection:text-black">
      {/* Background grain texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <SocialSidebar isHeroVisible={isHeroVisible} isMobile={isMobile} />
      <CpSidebar isHeroVisible={isHeroVisible} isMobile={isMobile} />
      <ThemeSwitcher />
      <main className={isMobile ? "" : "pt-24"}>
        {isMobile ? (
          <>
            <Hero />
            <About />
            <Education />
            <Experience />
            <Portfolio />
            <Achievements />
            <Contact />
            <Footer />
          </>
        ) : (
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
              >
                {/* Section content grows to fill, footer stays at bottom */}
                <div style={{ flex: 1 }}>
                  {activeSection === 'hero' && <Hero />}
                  {activeSection === 'about' && <About />}
                  {activeSection === 'education' && <Education />}
                  {activeSection === 'experience' && <Experience />}
                  {activeSection === 'projects' && <Portfolio />}
                  {activeSection === 'achievements' && <Achievements />}
                  {activeSection === 'contact' && <Contact />}
                </div>
                <Footer />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
