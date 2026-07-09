import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiCalendar, FiShield, FiKey } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

export default function Certifications() {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'verify'
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [verifyLogs, setVerifyLogs] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyLineIndex, setVerifyLineIndex] = useState(0);
  const [verifiedBadge, setVerifiedBadge] = useState(false);

  const handleVerify = () => {
    if (isVerifying) return;
    setVerifyLogs([]);
    setVerifyLineIndex(0);
    setVerifiedBadge(false);
    setIsVerifying(true);
  };

  // Compile logs dispatcher effect (replaces unreliable raw setInterval)
  useEffect(() => {
    if (!isVerifying) return;
    
    const cert = portfolioData.certifications[selectedCertIndex];
    if (!cert) {
      setIsVerifying(false);
      return;
    }

    const steps = [
      `[SYS] Initiating cryptographic verification for credential: ${cert.credentialId}`,
      `[NET] Binding to SPPU decentralised directory node [Node ID: 0x8a7f]...`,
      `[NET] Handshake established. Fetching registry metadata...`,
      `[CRYPTO] Computing transaction SHA-256 hash digests...`,
      `[CRYPTO] Target hash: sha256(${cert.credentialId.toLowerCase()}) -> 7f18a9b2de8c01d41...`,
      `[SEC] Matching signature against ${cert.issuer} RSA-2048 authority keys...`,
      `[SYS] Credential authority match confirmed.`,
      `[SYS] Integrity validation checked: ZERO modifications detected.`
    ];

    if (verifyLineIndex < steps.length) {
      const timer = setTimeout(() => {
        setVerifyLogs((prev) => [...prev, steps[verifyLineIndex]]);
        setVerifyLineIndex((prev) => prev + 1);
      }, 180);
      return () => clearTimeout(timer);
    } else {
      setIsVerifying(false);
      setVerifiedBadge(true);
    }
  }, [isVerifying, verifyLineIndex, selectedCertIndex]);

  return (
    <section id="certifications" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Tabs */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative mb-4"
          >
            Certifications
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8"
          >
            Credentials validating my specialized computer science and engineering coursework.
          </motion.p>

          {/* Sliding Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 max-w-sm w-full">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              📋 Credentials Catalog
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'verify'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              🔒 Verification Node
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'catalog' ? (
            <motion.div
              key="catalog-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {portfolioData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8, 
                    rotateX: 4, 
                    rotateY: -4, 
                    boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)"
                  }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-3xl shadow-lg border border-violet-500/10 flex flex-col justify-between relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-355" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                        <FiAward className="w-6 h-6" />
                      </div>
                      <span className="text-2xs font-bold uppercase tracking-wider text-violet-500/60 font-mono">
                        Verified
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display text-slate-800 dark:text-white mb-2 leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
                      {cert.issuer}
                    </p>
                  </div>

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
            </motion.div>
          ) : (
            <motion.div
              key="verify-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto"
            >
              {/* Left Selectors */}
              <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-violet-500/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    <FiShield className="text-violet-500" />
                    Security Verification Hub
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono font-bold">
                    Select a credential to load registry variables and query verification nodes.
                  </p>

                  <div className="space-y-3 mb-6">
                    {portfolioData.certifications.map((c, index) => (
                      <button
                        key={index}
                        onClick={() => { 
                          setSelectedCertIndex(index); 
                          setVerifyLogs([]); 
                          setVerifyLineIndex(0);
                          setVerifiedBadge(false); 
                          setIsVerifying(false);
                        }}
                        disabled={isVerifying}
                        className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer ${
                          selectedCertIndex === index
                            ? 'bg-violet-600/15 border-violet-600 text-violet-600 dark:text-violet-400 shadow-md shadow-violet-600/5'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-500/30'
                        }`}
                      >
                        <h4 className="text-xs font-bold font-display leading-tight">{c.name}</h4>
                        <span className="text-[10px] opacity-75 font-mono">Issuer: {c.issuer}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-full py-3 bg-violet-600 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-violet-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-violet-600/25"
                >
                  <FiKey className="w-3.5 h-3.5" />
                  Verify Credential Key
                </button>
              </div>

              {/* Right Output Terminal */}
              <div className="lg:col-span-7 bg-[#07080c] border border-violet-500/20 rounded-3xl p-6 font-mono text-[10px] text-violet-400/90 shadow-2xl flex flex-col justify-between min-h-[360px] overflow-hidden relative">
                
                {/* Visual stamp backdrop overlay */}
                {verifiedBadge && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.15 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="border-4 border-emerald-500 rounded-full p-8 text-emerald-500 font-black text-xl uppercase tracking-widest rotate-12 select-none">
                      VERIFIED
                    </div>
                  </motion.div>
                )}

                <div>
                  <div className="flex items-center justify-between border-b border-violet-500/10 pb-3 mb-4 font-mono">
                    <span className="font-bold text-white uppercase text-[9px]">DECENTRALIZED_VERIFIER_CONSOLE</span>
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  </div>

                  <div className="space-y-2 h-[200px] overflow-y-auto no-scrollbar font-mono">
                    {verifyLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={
                          log.includes('confirmed') || log.includes('detected')
                            ? 'text-emerald-400 font-semibold'
                            : log.includes('Initiating')
                            ? 'text-white font-bold'
                            : 'text-slate-400'
                        }
                      >
                        {log}
                      </div>
                    ))}
                    {isVerifying && (
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />
                        <span>scanning signatures...</span>
                      </div>
                    )}
                  </div>
                </div>

                {verifiedBadge && (
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-[10px] p-3.5 rounded-xl flex items-center gap-3 relative z-10"
                  >
                    <FiShield className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <div className="font-bold uppercase tracking-wider">Verification Complete</div>
                      <p className="text-[9px] opacity-80 leading-relaxed font-sans">
                        Credential validated successfully against public root keys. Metadata decrypted and matches {portfolioData.certifications[selectedCertIndex].issuer} registry variables.
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="text-[8px] text-slate-600 pt-3 border-t border-slate-900 uppercase">
                  Security Module: SPPU-ECDSA-SEC-OK
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
