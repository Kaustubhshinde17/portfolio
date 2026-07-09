import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { FaDocker } from 'react-icons/fa';
import ParticleBackground from '../ParticleBackground';
import { portfolioData } from '../../data/portfolioData';

const roles = [
  "Electronics & Telecommunication Engineer",
  "Java Full Stack Developer",
  "React Developer",
  "AI & Embedded Systems Enthusiast"
];

export default function Hero({ isDark }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Custom typing animation
  useEffect(() => {
    let timer;
    const activeRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(activeRole.slice(0, displayText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && displayText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
      setTypingSpeed(200); // Delay before next word
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 3D Mouse Parallax
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = (clientX / width) - 0.5;
      const y = (clientY / height) - 0.5;
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rotateX = -coords.y * 25; // Tilt up/down
  const rotateY = coords.x * 25;  // Tilt left/right

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Particle Overlay */}
      <ParticleBackground isDark={isDark} />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-violet-600/10 dark:bg-violet-600/5 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-indigo-600/10 dark:bg-indigo-600/5 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
        {/* Bio Text Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Greeting Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-6 border border-slate-200/50 dark:border-slate-800/40"
          >
            Portfolio
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Hi, I'm <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">{portfolioData.personalInfo.name}</span>
          </motion.h1>

          {/* Typing Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-16 mt-4 flex items-center"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 font-display">
              {displayText}
              <span className="inline-block w-[3px] h-5 ml-1 bg-violet-600 dark:bg-violet-400 animate-pulse" />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-sans"
          >
            {portfolioData.personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-violet-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              View Projects
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-8 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center cursor-pointer"
            >
              Contact Me
            </button>

            <a
              href={portfolioData.personalInfo.resumeUrl}
              download="Kaustubh_Shinde_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiDownload className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center space-x-5"
          >
            <a
              href={portfolioData.personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
              aria-label="GitHub Profile"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.personalInfo.socials.dockerhub}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
              aria-label="Docker Hub Profile"
            >
              <FaDocker className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.personalInfo.socials.email}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
              aria-label="Email Me"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Profile Avatar Column with 3D Parallax & Telemetry */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center gap-6 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ 
              rotateX: rotateX, 
              rotateY: rotateY, 
              transformStyle: 'preserve-3d',
              perspective: 1000 
            }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 cursor-grab active:cursor-grabbing"
          >
            {/* Ambient background glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-500 blur-md scale-[1.03] animate-pulse -z-10 opacity-70" />
            
            {/* Outer dotted tech border */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="4, 4"
                className="text-violet-600/30 dark:text-violet-400/30"
              />
            </svg>

            {/* Inner Profile Card Container */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-slate-900 flex items-center justify-center p-3 shadow-2xl">
              {/* Premium Avatar Layout (Clean Abstract Geometric Vector inside SVG) */}
              <div className="w-full h-full rounded-full bg-radial from-[#1e1b4b] to-[#0f172a] flex items-center justify-center overflow-hidden">
                <svg className="w-4/5 h-4/5 text-violet-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* Outer Circuit Nodes */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 0c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5V2m0 20v-3m9-7h-3M6 12H3m14.9-5.9l-2.1 2.1M8.2 15.8l-2.1 2.1M15.8 15.8l2.1 2.1M8.2 8.2l2.1-2.1" />
                  {/* Brain/Core Sphere */}
                  <circle cx="12" cy="12" r="2" className="fill-violet-400 animate-ping" />
                  <circle cx="12" cy="12" r="1.5" className="fill-violet-400" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Telemetry HUD Widget */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full max-w-xs glass-panel p-4 rounded-xl border border-violet-500/20 shadow-lg text-[10px] font-mono text-slate-400 dark:text-violet-400/90 leading-normal"
          >
            <div className="flex items-center justify-between border-b border-violet-500/10 pb-1.5 mb-1.5">
              <span className="font-bold text-violet-500 tracking-wider">SYSTEM TELEMETRY</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-y-1">
              <div>[+] STATUS:</div>
              <div className="text-emerald-400 text-right">ONLINE</div>
              <div>[+] ENGINE:</div>
              <div className="text-slate-300 dark:text-white text-right">REACT_VITE</div>
              <div>[+] BACKEND:</div>
              <div className="text-slate-300 dark:text-white text-right">SPRING_BOOT_3</div>
              <div>[+] DATABASE:</div>
              <div className="text-slate-300 dark:text-white text-right">MYSQL_SYNC</div>
              <div>[+] CORE:</div>
              <div className="text-violet-300 text-right animate-pulse">GEMINI_3.5_OK</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
