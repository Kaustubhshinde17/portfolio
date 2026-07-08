import { motion } from 'framer-motion';
import { FiAward, FiBook } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative"
          >
            Education
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            My academic credentials, universities, and semester evaluations.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto">
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-8 sm:pl-10 pb-8 border-l-2 border-violet-500/20 last:pb-0"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute top-1 -left-[9px] w-4.5 h-4.5 rounded-full bg-[#090a0f] border-2 border-violet-600 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
              </div>

              {/* Institution and Period */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold w-fit mb-2 sm:mb-0">
                  {edu.period}
                </span>
                <span className="text-sm font-semibold text-slate-400 font-mono flex items-center gap-1.5">
                  <FiBook className="w-4 h-4 text-violet-500" />
                  {edu.university}
                </span>
              </div>

              {/* Card Panel */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-800 dark:text-white mb-1">
                  {edu.degree}
                </h3>
                <h4 className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 mb-4">
                  {edu.major} &bull; <span className="text-violet-600 dark:text-violet-400 font-medium">{edu.institution}</span>
                </h4>
                
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-sans">
                  {edu.description}
                </p>

                {/* Academic Performance Badges */}
                <div>
                  <h5 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3 flex items-center gap-1.5">
                    <FiAward className="w-4 h-4 text-violet-500" />
                    Academic Performance
                  </h5>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {edu.gpa.map((g, gIdx) => (
                      <div
                        key={gIdx}
                        className="bg-slate-100 dark:bg-slate-900/60 p-3 rounded-xl flex flex-col items-center justify-center text-center border border-slate-200/50 dark:border-white/5"
                      >
                        <span className="text-2xs sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          {g.term}
                        </span>
                        <span className="text-sm sm:text-lg font-bold font-display text-slate-700 dark:text-violet-400">
                          {g.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
