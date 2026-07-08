import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Background shading on scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 160;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navLinks[i].href.substring(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-right from-violet-600 via-indigo-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/70 dark:bg-[#090a0f]/80 backdrop-blur-md shadow-md border-b border-black/5 dark:border-white/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold font-display tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Kaustubh<span className="text-violet-500 font-normal">.Shinde</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 relative ${
                  activeSection === link.href.substring(1)
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            {/* Dark/Light Mode Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer text-slate-700 dark:text-slate-300 transition-all"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full bg-white dark:bg-[#0c0d14] border-t border-slate-100 dark:border-slate-900 overflow-hidden shadow-xl"
            >
              <div className="px-6 py-4 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium py-1.5 transition-colors border-l-2 pl-3 ${
                      activeSection === link.href.substring(1)
                        ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400 bg-violet-50/50 dark:bg-violet-950/20'
                        : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-violet-600'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
