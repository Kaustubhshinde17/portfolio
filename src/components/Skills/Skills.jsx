import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiJava, DiJavascript1, DiReact, DiMysql, DiGit, DiGithubBadge, DiDocker, DiLinux, DiHtml5, DiCss3 } from 'react-icons/di';
import { SiSpringboot, SiSpring, SiVite, SiPostman, SiWebflow, SiRaspberrypi } from 'react-icons/si';
import { FiDatabase, FiCode, FiTerminal, FiPlay } from 'react-icons/fi';
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

const terminalScripts = {
  java: [
    "$ ./gradlew test --tests JavaMasteryTest",
    "> Task :compileJava",
    "  Compiling 14 source files...",
    "> Task :processResources",
    "> Task :testClasses",
    "> Task :test",
    "  JavaMasteryTest > testOOPCoreConcepts() PASSED [84ms]",
    "  JavaMasteryTest > testSpringBootRESTEndpoints() PASSED [145ms]",
    "  JavaMasteryTest > testSpringDataJPAMapping() PASSED [110ms]",
    "  JavaMasteryTest > testMySQLPersistentState() PASSED [130ms]",
    "",
    "BUILD SUCCESSFUL in 1.4s",
    "4 actionable tasks: 4 executed"
  ],
  react: [
    "$ npm run dev",
    "",
    "  VITE v8.1.1  ready in 234 ms",
    "",
    "  ➜  Local:   http://localhost:5173/",
    "  ➜  Network: use --host to expose",
    "  ➜  press h + enter to show help",
    "",
    "  [vite] hot module replacement enabled",
    "  [vite] loading client dependencies...",
    "  [vite] HMR bundle loaded successfully."
  ],
  docker: [
    "$ docker-compose up -d mysql-db app-container",
    "Creating network \"portfolio_default\" with driver \"bridge\"",
    "Pulling mysql-db (mysql:8.0)...",
    "Downloaded newer image for mysql:8.0",
    "Creating mysql-db-container ... done",
    "Creating app-springboot-container ... done",
    "Attaching to mysql-db-container, app-springboot-container",
    "mysql-db  | [System] [MY-010116] [Server] Ready for connections.",
    "app-springboot  | Running migrations: V1__init_schema.sql passed.",
    "STATUS: Database synchronised. Ports 3306 & 8080 active."
  ],
  embedded: [
    "$ python3 -m rc_car.telemetry --verify-gpio",
    "Initializing Raspberry Pi GPIO mapping...",
    "  [+] Pin 12 (PWM Speed Control): ACTIVE [Freq: 50Hz]",
    "  [+] Pin 16, 18 (H-Bridge Motor Routing): ACTIVE [Direction: FORWARD]",
    "  [+] Pin 22 (Ultrasonic Sensor): STABLE [Latency: 4ms]",
    "  [+] CAN Transceiver Mode: PIC16F877A Sync complete.",
    "  [+] Gemini API Connection: SECURE [Ping: 120ms]",
    "STATUS: Embedded control loop active. Ready to explore."
  ]
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'terminal'
  const [selectedScript, setSelectedScript] = useState('java');
  const [terminalLines, setTerminalLines] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  const categories = [
    { key: 'languages', title: 'Languages' },
    { key: 'frameworks', title: 'Frameworks' },
    { key: 'databases', title: 'Databases' },
    { key: 'developerTools', title: 'Developer Tools' },
    { key: 'concepts', title: 'Core Concepts' },
  ];

  // Compile / execute script action
  const handleRunScript = (scriptKey) => {
    if (isCompiling) return;
    setSelectedScript(scriptKey);
    setTerminalLines([]);
    setLineIndex(0);
    setIsCompiling(true);
  };

  // Compile logs dispatcher effect (replaces unreliable raw setInterval)
  useEffect(() => {
    if (!isCompiling) return;
    const script = terminalScripts[selectedScript];
    if (!script) {
      setIsCompiling(false);
      return;
    }

    if (lineIndex < script.length) {
      const timer = setTimeout(() => {
        setTerminalLines((prev) => [...prev, script[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      }, 140);
      return () => clearTimeout(timer);
    } else {
      setIsCompiling(false);
    }
  }, [isCompiling, lineIndex, selectedScript]);

  // Pre-load default java script on tab select
  useEffect(() => {
    if (activeTab === 'terminal' && terminalLines.length === 0 && !isCompiling) {
      handleRunScript('java');
    }
  }, [activeTab]);

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Tab Switcher */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative mb-4"
          >
            Technical Skills
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8"
          >
            My proficiency levels and toolsets across languages, backend frameworks, and embedded computing.
          </motion.p>

          {/* Sliding Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 max-w-sm w-full">
            <button
              onClick={() => setActiveTab('grid')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              📋 Skills Meter
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              ⚡ CLI Terminal
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'grid' ? (
            <motion.div
              key="grid-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
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
                            whileHover={{ 
                              y: -8, 
                              rotateX: 4, 
                              rotateY: -4, 
                              boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)"
                            }}
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
            </motion.div>
          ) : (
            <motion.div
              key="terminal-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Commands sidebar */}
              <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-violet-500/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    <FiTerminal className="text-violet-500" />
                    Executable Tasks
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono font-bold">
                    Select a task script to compile and test codebases, orchestrate container states, or scan physical hardware connectivity.
                  </p>

                  <div className="space-y-3">
                    {[
                      { id: 'java', label: 'Test Java Boot Core', desc: 'Runs unit tests checking Spring injection and JPA integrations.' },
                      { id: 'react', label: 'Vite Development Server', desc: 'Launches local node HMR environment and routes modules.' },
                      { id: 'docker', label: 'Compose Docker Stack', desc: 'Spins up DB and client systems inside isolated bridge networks.' },
                      { id: 'embedded', label: 'Scan GPIO & CAN Transceiver', desc: 'Validates Pi sensor registries, PWM speeds, and CAN nodes.' }
                    ].map((script) => (
                      <button
                        key={script.id}
                        onClick={() => handleRunScript(script.id)}
                        disabled={isCompiling}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 disabled:opacity-60 hover:shadow-md hover:shadow-violet-600/5 ${
                          selectedScript === script.id
                            ? 'bg-violet-600/15 border-violet-600 text-violet-600 dark:text-violet-400 shadow-lg shadow-violet-600/10'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-500/30'
                        }`}
                      >
                        <span className="text-xs font-bold font-display flex items-center gap-1.5">
                          <FiPlay className="w-3 h-3 text-violet-500" />
                          {script.label}
                        </span>
                        <span className="text-[10px] opacity-80 leading-normal">{script.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-900/60 text-[10px] font-mono text-slate-500">
                  Engine status: {isCompiling ? 'RUNNING_COMPILER' : 'AWAITING_INPUT'}
                </div>
              </div>

              {/* Main Terminal Output Panel */}
              <div className="lg:col-span-8 bg-[#07080d] border border-violet-500/25 rounded-3xl p-5 font-mono text-[11px] text-violet-400/90 shadow-2xl flex flex-col min-h-[360px] relative overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-violet-500/10 pb-3 mb-4 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-slate-500 ml-2">bash --session=kaustubh_shinde</span>
                  </div>
                  <span className="text-[9px] text-slate-600 font-bold uppercase">SSH SECURE LINK</span>
                </div>

                {/* Console Log Area */}
                <div className="flex-grow space-y-1.5 overflow-y-auto no-scrollbar max-h-[300px]">
                  {terminalLines.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        line.startsWith('$')
                          ? 'text-white font-bold'
                          : line.includes('PASSED') || line.includes('SUCCESSFUL') || line.includes('Ready') || line.includes('active')
                          ? 'text-emerald-400 font-semibold'
                          : line.includes('Compiling') || line.includes('Task')
                          ? 'text-violet-300'
                          : 'text-slate-400'
                      }
                    >
                      {line}
                    </div>
                  ))}
                  {isCompiling && (
                    <div className="flex items-center gap-1 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />
                      <span>compiling...</span>
                    </div>
                  )}
                  {!isCompiling && (
                    <div className="text-slate-500 mt-2">
                      kaustubh_shinde@SPPU_NODE_4:~$ <span className="inline-block w-1.5 h-3 bg-violet-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
