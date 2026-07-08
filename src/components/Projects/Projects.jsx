import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['All', 'Full Stack', 'AI & Embedded', 'Frontend'];

  const filteredProjects = activeFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative"
          >
            Featured Projects
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            Select a project to view details, highlights, features, and source repositories.
          </motion.p>
        </div>

        {/* Filters Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'glass-panel text-slate-600 dark:text-slate-300 hover:border-violet-500/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between cursor-pointer h-full"
              >
                <div>
                  {/* Category Tag */}
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet-500 mb-3 block">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-3">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-400 font-medium">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details &rarr;
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass-panel max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Tag & Title */}
              <span className="text-xs font-bold uppercase tracking-wider text-violet-500 block mb-2">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-800 dark:text-white pr-10">
                {selectedProject.title}
              </h3>

              <div className="mt-6">
                {/* Tech tags */}
                <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                  {selectedProject.description}
                </p>

                {/* Highlights List */}
                <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">
                  Key Highlights & Features
                </h4>
                <ul className="space-y-2.5 mb-8">
                  {selectedProject.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="text-violet-500 mr-2 flex-shrink-0 mt-1.5">&#9670;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer Buttons */}
                <div className="flex flex-wrap gap-4 border-t border-slate-100 dark:border-slate-900 pt-6">
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <FiGithub className="w-4 h-4" />
                    GitHub Repo
                  </a>
                  {selectedProject.links.demo !== '#' && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-violet-500 transition-colors cursor-pointer"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
