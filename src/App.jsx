import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

// Layout & Support Components
import Navbar from './components/Navbar/Navbar';
import CursorGlow from './components/CursorGlow';
import BackToTop from './components/BackToTop';

// Section Components
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Publications from './components/Publications/Publications';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  // Default to Dark Mode as per user request
  const [isDark, setIsDark] = useLocalStorage('dark-mode-theme', true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090a0f] text-slate-800 dark:text-[#f1f5f9] transition-colors duration-300 font-sans selection:bg-violet-600 selection:text-white relative">
      {/* Spotlight cursor glow in dark theme */}
      <CursorGlow isDark={isDark} />

      {/* Floating Sticky Navigation Bar */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero isDark={isDark} />
        
        <div className="max-w-7xl mx-auto">
          <About />
          <Skills />
          <Projects />
          <Publications />
          <Education />
          <Certifications />
          <Contact />
        </div>
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Back to top floating indicator */}
      <BackToTop />
    </div>
  );
}
