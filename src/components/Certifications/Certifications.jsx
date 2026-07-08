import { motion } from 'framer-motion';
import { FiAward, FiCalendar } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative"
          >
            Certifications
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            Credentials validating my specialized computer science and engineering coursework.
          </motion.p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-3xl shadow-lg border border-violet-500/10 flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Decorative light reflection on card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

              <div>
                {/* Certification Icon & Stamp */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <FiAward className="w-6 h-6" />
                  </div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-violet-500/60 font-mono">
                    Verified
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-800 dark:text-white mb-2 leading-snug">
                  {cert.name}
                </h3>

                {/* Issuer */}
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
                  {cert.issuer}
                </p>
              </div>

              {/* Card Footer Info */}
              <div className="border-t border-slate-100 dark:border-slate-900/60 pt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <FiCalendar className="w-3.5 h-3.5 text-violet-500" />
                  {cert.date}
                </span>
                <span className="font-semibold text-slate-500">
                  ID: {cert.credentialId}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
