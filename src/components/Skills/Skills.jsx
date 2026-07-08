import { motion } from 'framer-motion';
import { DiJava, DiJavascript1, DiReact, DiMysql, DiGit, DiGithubBadge, DiDocker, DiLinux, DiHtml5, DiCss3 } from 'react-icons/di';
import { SiSpringboot, SiSpring, SiVite, SiPostman, SiWebflow, SiRaspberrypi } from 'react-icons/si';
import { FiDatabase, FiCode } from 'react-icons/fi';
import { VscVscode } from 'react-icons/vsc';
import { portfolioData } from '../../data/portfolioData';

// Map icon string names to actual components
const iconMap = {
  DiJava: DiJava,
  DiJavascript1: DiJavascript1,
  DiDatabase: FiDatabase,
  DiHtml5: DiHtml5,
  DiCss3: DiCss3,
  SiSpringboot: SiSpringboot,
  SiSpring: SiSpring,
  DiReact: DiReact,
  SiVite: SiVite,
  DiMysql: DiMysql,
  DiGit: DiGit,
  DiGithubBadge: DiGithubBadge,
  DiDocker: DiDocker,
  SiDocker: DiDocker,
  DiLinux: DiLinux,
  DiRaspberryPi: SiRaspberrypi,
  SiVisualstudiocode: VscVscode,
  SiCodeforces: FiCode,
  SiCodementor: FiCode,
  SiPostman: SiPostman,
  SiWebflow: SiWebflow
};

export default function Skills() {
  const categories = [
    { key: 'languages', title: 'Languages' },
    { key: 'frameworks', title: 'Frameworks' },
    { key: 'databases', title: 'Databases' },
    { key: 'developerTools', title: 'Developer Tools' },
    { key: 'concepts', title: 'Core Concepts' },
  ];

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative"
          >
            Technical Skills
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            My proficiency levels and toolsets across languages, backend frameworks, and embedded computing.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categories.map((category) => {
            const skillList = portfolioData.skills[category.key];
            if (!skillList || skillList.length === 0) return null;

            return (
              <div key={category.key}>
                <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-200 mb-6 border-l-4 border-violet-600 pl-3">
                  {category.title}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skillList.map((skill, idx) => {
                    const IconComponent = iconMap[skill.icon] || FiCode;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="glass-panel p-5 rounded-2xl shadow-xs relative overflow-hidden group flex flex-col justify-between"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                              {skill.name}
                            </h4>
                          </div>
                        </div>

                        {/* Skill Meter */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                            <span>Proficiency</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                              className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
