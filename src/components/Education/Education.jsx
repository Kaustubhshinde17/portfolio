import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiBook, FiTrendingUp } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

const semesterCourses = {
  fy: ["Engineering Mathematics", "Object-Oriented Programming (Java)", "Basic Electronics", "Engineering Mechanics", "Computer Programming Foundations"],
  sy: ["Digital Design", "Data Structures & Algorithms", "Database Management Systems (MySQL)", "Microcontrollers & Assembly", "Signals and Systems"],
  ty: ["Embedded IoT Systems", "Controller Area Network (CAN) Bus", "Spring Boot Backend Framework", "React Web Development", "RESTful Web APIs"],
  final: ["Edge AI System Integration", "Computer Vision (OpenCV)", "Gemini API Large Language Models", "Automotive Embedded Safety", "Graduate Project Exhibition"]
};

export default function Education() {
  const [activeTab, setActiveTab] = useState('resume'); // 'resume' | 'planner'
  const [finalYearGpa, setFinalYearGpa] = useState(8.50);
  const [selectedSemester, setSelectedSemester] = useState('fy');

  const edu = portfolioData.education[0];
  
  // Calculate Cumulative CGPA
  const fyCGPA = 7.59;
  const syCGPA = 9.11;
  const tyCGPA = 8.80;
  const cumulativeCGPA = ((fyCGPA + syCGPA + tyCGPA + Number(finalYearGpa)) / 4).toFixed(2);

  return (
    <section id="education" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Tabs */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative mb-4"
          >
            Education
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8"
          >
            My academic credentials, universities, and semester evaluations.
          </motion.p>

          {/* Sliding Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 max-w-sm w-full">
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              📋 Degree Sheet
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'planner'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              ⚡ GPA Planner
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'resume' ? (
            <motion.div
              key="resume-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative pl-8 sm:pl-10 pb-8 border-l-2 border-violet-500/20 last:pb-0">
                {/* Timeline node */}
                <div className="absolute top-1 -left-[9px] w-4.5 h-4.5 rounded-full bg-[#090a0f] border-2 border-violet-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold w-fit mb-2 sm:mb-0">
                    {edu.period}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 font-mono flex items-center gap-1.5">
                    <FiBook className="w-4 h-4 text-violet-500" />
                    {edu.university}
                  </span>
                </div>

                {/* Card */}
                <motion.div 
                  whileHover={{ 
                    y: -8, 
                    rotateX: 3, 
                    rotateY: -3, 
                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden"
                >
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
              </motion.div>
            </div>
          </motion.div>
          ) : (
            <motion.div
              key="planner-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Line Chart & Sliders */}
              <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-violet-500/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    <FiTrendingUp className="text-violet-500" />
                    GPA Forecaster
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono">
                    Slide the Final Year GPA to project your cumulative college average.
                  </p>

                  {/* SVG GPA Graph */}
                  <div className="h-[120px] bg-slate-950/60 rounded-2xl border border-slate-900 p-4 mb-6 relative flex flex-col justify-end">
                    <span className="absolute top-2 left-3 text-[8px] font-mono text-slate-500 uppercase">Interactive CGPA Progress Graph</span>
                    
                    {/* Animated Line SVG */}
                    <svg className="w-full h-4/5 overflow-visible" viewBox="0 0 100 50">
                      {/* Grid Lines */}
                      <line x1="0" y1="10" x2="100" y2="10" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="0" y1="25" x2="100" y2="25" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="0" y1="40" x2="100" y2="40" stroke="#1e293b" strokeWidth="0.5" />
                      
                      {/* Calculated coordinate maps (y is inverted) */}
                      {/* Points mapping: (5, y1), (35, y2), (65, y3), (95, y4) */}
                      {/* GPAs: FY (7.59) -> 50 - 7.59 * 5 = 12.05 */}
                      {/* GPAs: SY (9.11) -> 50 - 9.11 * 5 = 4.45 */}
                      {/* GPAs: TY (8.80) -> 50 - 8.80 * 5 = 6.0 */}
                      {/* GPAs: Final (slider) -> 50 - final * 5 */}
                      <path
                        d={`M 5 22.0 L 35 14.4 L 65 16.0 L 95 ${50 - finalYearGpa * 5}`}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="1.5"
                        className="transition-all duration-200"
                      />
                      
                      {/* Nodes */}
                      <circle cx="5" cy="22.0" r="2.5" fill="#a78bfa" />
                      <circle cx="35" cy="14.4" r="2.5" fill="#a78bfa" />
                      <circle cx="65" cy="16.0" r="2.5" fill="#a78bfa" />
                      <circle cx="95" cy={50 - finalYearGpa * 5} r="3" fill="#ec4899" className="transition-all duration-200" />
                    </svg>

                    <div className="flex justify-between font-mono text-[8px] text-slate-500 mt-2 px-1">
                      <span>FY: 7.59</span>
                      <span>SY: 9.11</span>
                      <span>TY: 8.80</span>
                      <span>FINAL: {finalYearGpa}</span>
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>PROJECTED FINAL YEAR CGPA:</span>
                      <span className="font-bold text-violet-400 text-sm">{finalYearGpa}</span>
                    </div>
                    <input
                      type="range"
                      min="5.00"
                      max="10.00"
                      step="0.05"
                      value={finalYearGpa}
                      onChange={(e) => setFinalYearGpa(parseFloat(e.target.value).toFixed(2))}
                      className="w-full accent-violet-600 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Recalculated Output Box */}
                <div className="mt-8 p-4 bg-violet-600/5 border border-violet-500/15 rounded-2xl flex items-center justify-between">
                  <div className="font-mono text-2xs text-slate-400 uppercase">
                    Calculated Cumulative CGPA
                  </div>
                  <div className="text-2xl font-bold font-display text-violet-600 dark:text-violet-400">
                    {cumulativeCGPA} / 10
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Syllabus cards */}
              <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-violet-500/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    <FiBook className="text-violet-500" />
                    Coursework Explanations
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono">
                    Select an academic term below to review the specific subjects completed.
                  </p>

                  {/* Term Selectors */}
                  <div className="flex gap-2 mb-6 border-b border-slate-100 dark:border-slate-900 pb-4">
                    {[
                      { id: 'fy', label: 'First Year' },
                      { id: 'sy', label: 'Second Year' },
                      { id: 'ty', label: 'Third Year' },
                      { id: 'final', label: 'Final Year' }
                    ].map((term) => (
                      <button
                        key={term.id}
                        onClick={() => setSelectedSemester(term.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedSemester === term.id
                            ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {term.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List container */}
                <div className="bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-900 flex-grow min-h-[160px] flex flex-col justify-center">
                  <motion.ul 
                    key={selectedSemester}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 text-xs font-mono text-slate-500 leading-normal"
                  >
                    {semesterCourses[selectedSemester].map((course, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
