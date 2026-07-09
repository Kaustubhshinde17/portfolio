import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiCpu, FiCompass, FiMic, FiEye, FiServer, FiActivity } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

export default function Publications() {
  const [activeTab, setActiveTab] = useState('literatureSurvey'); // Details sub-tab
  const [sectionTab, setSectionTab] = useState('resume'); // 'resume' | 'canbus'

  // CAN Bus Simulation States
  const [canLogs, setCanLogs] = useState([
    "ID: 0x080 | DLC: 8 | DATA: 00 00 00 00 00 00 00 00 | Status: NODE_BOOT_READY"
  ]);
  const [ignitionState, setIgnitionState] = useState('OFF'); // 'OFF' | 'ON' | 'LOCKED'
  const [helmetState, setHelmetState] = useState('DETECTED'); // 'DETECTED' | 'NOT_FOUND'
  const [lastAction, setLastAction] = useState(null); // tracking visual animation lines

  const pub1 = portfolioData.publications[0];
  const pub2 = portfolioData.publications[1];

  const tabMeta = [
    { id: 'literatureSurvey', label: 'Literature Survey', icon: FiCompass },
    { id: 'architecture', label: 'Architecture', icon: FiServer },
    { id: 'aiIntegration', label: 'AI Integration', icon: FiCpu },
    { id: 'voiceRecognition', label: 'Voice Recognition', icon: FiMic },
    { id: 'computerVision', label: 'Computer Vision', icon: FiEye },
  ];

  // CAN Bus trigger simulation events
  const handleCanAction = (actionType) => {
    setLastAction(actionType);
    setTimeout(() => setLastAction(null), 1000); // Reset animation glow

    if (actionType === 'crash') {
      setIgnitionState('LOCKED');
      setCanLogs(prev => [
        `ID: 0x10A | DLC: 2 | DATA: FF AA | Status: CRASH_DETECTED`,
        `ID: 0x20B | DLC: 1 | DATA: 00 | Status: RELAY_IGNITION_KILL`,
        `ID: 0x30C | DLC: 4 | DATA: 41 4c 45 52 | Status: DISP_CRASH_ALARM`,
        ...prev.slice(0, 3)
      ]);
    } else if (actionType === 'helmet_off') {
      setHelmetState('NOT_FOUND');
      if (ignitionState === 'ON') setIgnitionState('OFF');
      setCanLogs(prev => [
        `ID: 0x10B | DLC: 2 | DATA: 00 00 | Status: HELMET_ABSENT`,
        `ID: 0x20B | DLC: 1 | DATA: 00 | Status: RELAY_LOCKOUT_ENGAGED`,
        ...prev.slice(0, 3)
      ]);
    } else if (actionType === 'helmet_on') {
      setHelmetState('DETECTED');
      setCanLogs(prev => [
        `ID: 0x10B | DLC: 2 | DATA: 01 FF | Status: HELMET_LOCKED`,
        `ID: 0x20B | DLC: 1 | DATA: 01 | Status: RELAY_SAFETY_CLEAR`,
        ...prev.slice(0, 3)
      ]);
    } else if (actionType === 'key_turn') {
      if (helmetState === 'NOT_FOUND') {
        setIgnitionState('LOCKED');
        setCanLogs(prev => [
          `ID: 0x12A | DLC: 1 | DATA: 01 | Status: IGNITION_START_REQ`,
          `ID: 0x20B | DLC: 1 | DATA: 00 | Status: START_DENIED_HELMET_LOCK`,
          ...prev.slice(0, 3)
        ]);
      } else {
        setIgnitionState('ON');
        setCanLogs(prev => [
          `ID: 0x12A | DLC: 1 | DATA: 01 | Status: IGNITION_START_REQ`,
          `ID: 0x20B | DLC: 1 | DATA: 02 | Status: RELAY_IGNITION_ACTIVE`,
          `ID: 0x30C | DLC: 8 | DATA: 45 4e 47 49 4e 45 5f 4f | Status: DISP_ON_BOARD_OK`,
          ...prev.slice(0, 2)
        ]);
      }
    }
  };

  return (
    <section id="research" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Tabs */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative mb-4"
          >
            Research Publications & Capstones
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8"
          >
            Scientific publications and deep technical breakdowns of engineering capstones.
          </motion.p>

          {/* Sliding Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 max-w-sm w-full">
            <button
              onClick={() => setSectionTab('resume')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                sectionTab === 'resume'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              📋 Conference Info
            </button>
            <button
              onClick={() => setSectionTab('canbus')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                sectionTab === 'canbus'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              ⚡ CAN Bus Simulator
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {sectionTab === 'resume' ? (
            <motion.div
              key="resume-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Publication Card */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-200 border-l-4 border-violet-600 pl-3 mb-2">
                  Conference Papers
                </h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8, 
                    rotateX: 4, 
                    rotateY: -4, 
                    boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)"
                  }}
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
            </motion.div>
          ) : (
            <motion.div
              key="canbus-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Interactive Schematic Diagram */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-violet-500/10 flex flex-col justify-between min-h-[350px]">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    <FiActivity className="text-violet-500" />
                    Distributed CAN Bus Protocol Linkages
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono font-bold">
                    [PIC16F877A Microcontroller System Network Topology]
                  </p>

                  {/* Visual Node Network */}
                  <div className="relative flex flex-col items-center justify-between p-6 bg-slate-950/60 border border-slate-900 rounded-2xl h-[200px] overflow-hidden">
                    {/* Visual Bus copper lines */}
                    <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-violet-600/30 -translate-y-1/2 z-0" />
                    {lastAction && (
                      <div className="absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-violet-400 to-indigo-400 -translate-y-1/2 z-0 animate-pulse" />
                    )}

                    <div className="flex items-center justify-between w-full z-10 relative">
                      {/* Node 1: Sensor Node */}
                      <div className={`p-3 rounded-xl border font-mono text-[10px] text-center w-28 transition-all ${
                        lastAction === 'crash' || lastAction === 'helmet_off' || lastAction === 'helmet_on'
                          ? 'border-indigo-400 shadow-md shadow-indigo-500/20 bg-indigo-950/40 text-indigo-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}>
                        <div className="font-bold border-b border-white/5 pb-1 mb-1.5">SENSOR_NODE</div>
                        <div>Crash Sw: OK</div>
                        <div>Helmet: {helmetState === 'DETECTED' ? 'YES':'NO'}</div>
                      </div>

                      {/* Node 2: Core MCU */}
                      <div className={`p-3 rounded-xl border font-mono text-[10px] text-center w-28 transition-all ${
                        lastAction
                          ? 'border-violet-500 shadow-lg shadow-violet-500/30 bg-violet-950/40 text-violet-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}>
                        <div className="font-bold border-b border-white/5 pb-1 mb-1.5">PIC16F877A</div>
                        <div>CAN Tx: MCP2551</div>
                        <div>IGNITION: {ignitionState}</div>
                      </div>

                      {/* Node 3: Actuator Node */}
                      <div className={`p-3 rounded-xl border font-mono text-[10px] text-center w-28 transition-all ${
                        lastAction === 'key_turn' || lastAction === 'crash'
                          ? 'border-emerald-500 shadow-md shadow-emerald-500/20 bg-emerald-950/30 text-emerald-400'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}>
                        <div className="font-bold border-b border-white/5 pb-1 mb-1.5">IGNITION_RELAY</div>
                        <div>Relay: {ignitionState === 'ON' ? 'CLOSED' : 'OPEN'}</div>
                        <div>Signal: {ignitionState === 'ON' ? 'KILL_DIS':'KILL_ACT'}</div>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 text-center">
                      Physical Layer: High-Speed CAN Bus (ISO-11898) 125kbps
                    </div>
                  </div>
                </div>

                {/* Simulation Control Buttons */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleCanAction('crash')}
                    className="py-2.5 rounded-xl border border-red-500/25 bg-red-950/20 text-red-400 font-bold text-2xs uppercase font-mono hover:bg-red-950/40 cursor-pointer"
                  >
                    💥 Impact Crash
                  </button>
                  <button
                    onClick={() => handleCanAction(helmetState === 'DETECTED' ? 'helmet_off' : 'helmet_on')}
                    className="py-2.5 rounded-xl border border-indigo-500/25 bg-indigo-950/20 text-indigo-400 font-bold text-2xs uppercase font-mono hover:bg-indigo-950/40 cursor-pointer"
                  >
                    ⛑️ {helmetState === 'DETECTED' ? 'Remove Helmet' : 'Wear Helmet'}
                  </button>
                  <button
                    onClick={() => handleCanAction('key_turn')}
                    className="py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-950/20 text-emerald-400 font-bold text-2xs uppercase font-mono hover:bg-emerald-950/40 cursor-pointer"
                  >
                    🔑 Ignition Key
                  </button>
                </div>
              </div>

              {/* Right Column: Hexadecimal CAN Logging Panel */}
              <div className="lg:col-span-5 bg-[#07080c] border border-violet-500/20 rounded-3xl p-5 font-mono text-[10px] text-violet-400/90 flex flex-col justify-between shadow-2xl min-h-[350px]">
                <div>
                  <div className="flex items-center justify-between border-b border-violet-500/10 pb-3 mb-4">
                    <span className="font-bold text-white uppercase text-[9px]">CAN_BUS_HEX_ANALYSIS_SHELL</span>
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  </div>

                  <div className="space-y-2 h-[220px] overflow-y-auto no-scrollbar">
                    {canLogs.map((log, index) => (
                      <div
                        key={index}
                        className={
                          log.includes('CRASH')
                            ? 'text-red-400'
                            : log.includes('RELAY_IGNITION_ACTIVE') || log.includes('SAFETY_CLEAR')
                            ? 'text-emerald-400'
                            : log.includes('HELMET_ABSENT')
                            ? 'text-yellow-400'
                            : 'text-slate-400'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 pt-3 border-t border-slate-900 text-center">
                  Controller Status: ISO-11898-2 COMPLIANT
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
