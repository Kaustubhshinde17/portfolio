import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiCpu, FiCompass, FiMic, FiEye, FiServer } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

export default function Publications() {
  const [activeTab, setActiveTab] = useState('literatureSurvey');

  const pub1 = portfolioData.publications[0];
  const pub2 = portfolioData.publications[1];

  const tabMeta = [
    { id: 'literatureSurvey', label: 'Literature Survey', icon: FiCompass },
    { id: 'architecture', label: 'Architecture', icon: FiServer },
    { id: 'aiIntegration', label: 'AI Integration', icon: FiCpu },
    { id: 'voiceRecognition', label: 'Voice Recognition', icon: FiMic },
    { id: 'computerVision', label: 'Computer Vision', icon: FiEye },
  ];

  return (
    <section id="research" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative"
          >
            Research Publications & Capstones
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            Scientific publications and deep technical breakdowns of engineering capstones.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Publication Card */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-200 border-l-4 border-violet-600 pl-3 mb-2">
              Conference Papers
            </h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-3xl shadow-lg relative overflow-hidden group border border-violet-500/10"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold">
                  {pub1.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {pub1.role}
                </span>
              </div>

              <h4 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {pub1.title}
              </h4>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                {pub1.venue}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {pub1.description}
              </p>

              <div className="mt-6 flex items-center text-xs text-slate-400 font-mono gap-1.5">
                <FiBookOpen className="w-3.5 h-3.5 text-violet-500" />
                Indexed in Conference Proceedings
              </div>
            </motion.div>
          </div>

          {/* Right Column: SPPU Final Year Capstone Project Deep Dive */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-200 border-l-4 border-violet-600 pl-3 mb-2">
              Capstone Engineering Architecture
            </h3>

            <div className="glass-panel rounded-3xl p-6 shadow-lg border border-violet-500/10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold font-display text-slate-800 dark:text-white">
                  {pub2.title}
                </h4>
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                  {pub2.badge}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {pub2.venue} &bull; {pub2.role}
              </p>

              {/* Tabs Selectors */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 dark:border-slate-900 pb-4">
                {tabMeta.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Display Panel */}
              <div className="flex-grow min-h-[140px] bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100 dark:border-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans"
                  >
                    {pub2.details[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
