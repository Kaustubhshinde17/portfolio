import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { FiBriefcase, FiCode, FiSearch, FiCompass, FiCalendar } from 'react-icons/fi';

const roleBios = {
  default: "A passionate software developer with experience building full-stack web applications, AI-powered embedded systems, and scalable Java applications. I enjoy solving real-world problems using modern technologies and continuously learning new tools.",
  recruiter: "Hi there! I am Kaustubh, a developer who specializes in Java, Spring Boot, and React. I am based in Pune, India, and I'm ready to bring immediate value to your development team with clean code, solid REST APIs, and responsive React frontend skills. I'm actively seeking opportunities to build enterprise-scale solutions.",
  techlead: "Hello! My development workflow prioritizes architectural scalability, strong OOP principles, and clean data modeling. I design Spring Boot backends, integrate JPA caching, build secure MySQL database schemas, and dockerize services to achieve seamless CI/CD. I'm highly comfortable bridging software stacks and physical hardware APIs.",
  researcher: "Greetings! I focus on the intersection of Software Engineering and Intelligent IoT. I have co-authored an international research paper on CAN Bus protocols (ICETT 2026) and developed computer vision models using OpenCV to orchestrate autonomous edge decisions on Raspberry Pi controllers."
};

const timelineEvents = [
  { year: "2022", title: "Engineering Foundations", desc: "Enrolled in Savitribai Phule Pune University for Electronics & Telecommunication. Mastered engineering math, physics, and basic programming logic." },
  { year: "2023", title: "Object-Oriented Programming", desc: "Dived deep into Java SE and databases. Developed skills in SQL database design and structured software programming." },
  { year: "2024", title: "Full Stack Exploration", desc: "Learned React, Tailwind CSS, Spring Boot, and Spring Data JPA. Built end-to-end full-stack e-commerce project (ShopEase)." },
  { year: "2025", title: "Embedded & Edge AI Systems", desc: "Created the AI Autonomous RC Vehicle, co-authored CAN Bus research paper, and presented at SPPU capstone exhibition." },
  { year: "2026", title: "Graduation & Engineering Launch", desc: "Completed degree with strong CGPA (9.11, 8.80) in core terms. Entering full-time software engineering roles." }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | '4d'
  const [selectedRole, setSelectedRole] = useState('default');
  const [typedText, setTypedText] = useState('');
  const [activeMilestone, setActiveMilestone] = useState(0);

  // Typewriter effect for role customized bio
  useEffect(() => {
    setTypedText('');
    let idx = 0;
    const targetText = roleBios[selectedRole];
    const interval = setInterval(() => {
      if (idx < targetText.length) {
        setTypedText((prev) => prev + targetText.charAt(idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [selectedRole]);

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Tab Switcher */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative mb-4"
          >
            About Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8"
          >
            A look into my engineering background, statistics, and career milestones.
          </motion.p>

          {/* Sliding Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 max-w-sm w-full">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              📋 Profile Details
            </button>
            <button
              onClick={() => setActiveTab('4d')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === '4d'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              ⚡ 4D Journey
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' ? (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Text/Bio Panel */}
              <div className="lg:col-span-7 space-y-6">
                {portfolioData.personalInfo.aboutMe.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats Cards Column */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {portfolioData.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -8, 
                      rotateX: 4, 
                      rotateY: -4, 
                      boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)"
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <h3 className="text-3xl sm:text-4xl font-bold font-display text-violet-600 dark:text-violet-400">
                      {stat.value}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="4d-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Role-Specific Interactive Bio Customizer */}
              <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between border border-violet-500/10">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-3">
                    Who are you? (Personalize my Bio)
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono">
                    Select your perspective below to dynamically synthesize my introduction bio.
                  </p>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      { id: 'recruiter', label: 'Recruiter', icon: FiBriefcase },
                      { id: 'techlead', label: 'Tech Lead', icon: FiCode },
                      { id: 'researcher', label: 'Researcher', icon: FiCompass },
                      { id: 'default', label: 'Default', icon: FiSearch }
                    ].map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.id}
                          onClick={() => setSelectedRole(role.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedRole === role.id
                              ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-500/30'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {role.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Terminal Bio Screen */}
                <div className="bg-[#08090f] border border-violet-500/20 p-5 rounded-2xl min-h-[160px] font-mono text-xs text-violet-400/90 leading-relaxed shadow-inner">
                  <div className="flex items-center gap-1.5 border-b border-violet-500/10 pb-2 mb-3">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-[9px] text-slate-500 ml-2">bio_compiler.sh</span>
                  </div>
                  <p>
                    {typedText}
                    <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-violet-400 animate-pulse" />
                  </p>
                </div>
              </div>

              {/* Interactive Timeline Explorer */}
              <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-violet-500/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    <FiCalendar className="text-violet-500" />
                    Interactive Career Map
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono">
                    Select a year to review academic breakthroughs and coding highlights.
                  </p>

                  {/* Horizontal Timeline Track */}
                  <div className="relative flex justify-between items-center mb-8 px-2">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
                    
                    {timelineEvents.map((ev, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveMilestone(index)}
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all cursor-pointer ${
                          activeMilestone === index
                            ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/35 scale-110'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-violet-500'
                        }`}
                      >
                        {ev.year.slice(2)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Milestone Detail Card */}
                <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 p-5 rounded-2xl flex-grow flex flex-col justify-center min-h-[140px]">
                  <motion.div
                    key={activeMilestone}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-2xs font-bold uppercase tracking-wider text-violet-500 font-mono mb-1.5 block">
                      Timeline Milestone: {timelineEvents[activeMilestone].year}
                    </span>
                    <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2">
                      {timelineEvents[activeMilestone].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {timelineEvents[activeMilestone].desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
