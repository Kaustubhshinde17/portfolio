import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } },
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative"
          >
            About Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            A brief introduction into my technical background, academic accomplishments, and drive.
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text/Bio Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-6"
          >
            {portfolioData.personalInfo.aboutMe.map((paragraph, idx) => (
              <motion.p
                key={idx}
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Stats Cards Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {portfolioData.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group"
              >
                {/* Gradient Accent Overlay */}
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
        </div>
      </div>
    </section>
  );
}
