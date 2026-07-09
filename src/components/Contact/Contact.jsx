import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiGithub, FiLinkedin, FiTerminal, FiKey } from 'react-icons/fi';
import { FaDocker } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

// Web3Forms API access key. Paste your key in .env as VITE_WEB3FORMS_KEY or directly below.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'shell'

  // Shell Messenger states
  const [shellStep, setShellStep] = useState(0); // 0: name, 1: email, 2: message, 3: ready, 4: sending, 5: success
  const [shellName, setShellName] = useState('');
  const [shellEmail, setShellEmail] = useState('');
  const [shellMessage, setShellMessage] = useState('');
  const [shellLogs, setShellLogs] = useState([]);
  const [cipherText, setCipherText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('idle');
        alert("Failed to submit form: " + (result.message || "Access Key missing or invalid. Check your key."));
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Failed to send message: network error.");
    }
  };

  // Encrypted transmission log loop
  const handleShellTransmit = () => {
    setShellStep(4);
    setShellLogs([]);
    
    // Generate mock cipher
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let count = 0;
    const cipherInterval = setInterval(() => {
      let temp = "";
      for (let i = 0; i < 28; i++) {
        temp += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCipherText(temp);
      count++;
      if (count > 8) clearInterval(cipherInterval);
    }, 100);

    const logs = [
      `[SYS] Formatting payload buffers...`,
      `[CRYPTO] Packing data block (${shellName.length + shellEmail.length + shellMessage.length} bytes)`,
      `[CRYPTO] Encrypting with RSA-4096 public key index...`,
      `[NET] Dispatching secure SMTP relay sockets to skaustubh652@gmail.com...`,
      `[SYS] Secure packet receipt: STATUS_OK. Server connection closed.`
    ];

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < logs.length) {
        setShellLogs(prev => [...prev, logs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
        
        // Background Web3Forms dispatch
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: shellName,
            email: shellEmail,
            subject: `Secure Portfolio Shell Message from ${shellName}`,
            message: shellMessage
          })
        })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            setShellStep(5);
            setShellName('');
            setShellEmail('');
            setShellMessage('');
          } else {
            setShellStep(3); // Reset to Ready to try again
            alert("Failed to submit terminal packet: " + (result.message || "Key verification failed."));
          }
        })
        .catch(err => {
          console.error(err);
          setShellStep(3);
          alert("Failed to transmit due to network error.");
        });
      }
    }, 350);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Tabs */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative mb-4"
          >
            Contact Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8"
          >
            Reach out via the form below or connect through my email or socials.
          </motion.p>

          {/* Sliding Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 max-w-sm w-full">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              📋 Contact Form
            </button>
            <button
              onClick={() => setActiveTab('shell')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'shell'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              ⚡ Encrypted Shell
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Info Card Grid */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-200 border-l-4 border-violet-600 pl-3 mb-6">
              Get in Touch
            </h3>

            <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border border-violet-500/10">
              <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                  Email Me
                </h4>
                <a
                  href={`mailto:${portfolioData.personalInfo.email}`}
                  className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-violet-600 transition-colors"
                >
                  {portfolioData.personalInfo.email}
                </a>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border border-violet-500/10">
              <div className="p-3 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] dark:text-[#4f46e5]">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                  Call Me
                </h4>
                <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                  {portfolioData.personalInfo.phone}
                </p>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border border-violet-500/10">
              <div className="p-3 rounded-xl bg-pink-500/10 text-pink-600">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                  Based In
                </h4>
                <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                  {portfolioData.personalInfo.location}
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-violet-500/10">
              <h4 className="text-sm font-bold font-display text-slate-700 dark:text-slate-200 mb-4">
                Active Connections
              </h4>
              <div className="flex items-center space-x-4">
                <a
                  href={portfolioData.personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.personalInfo.socials.dockerhub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  aria-label="Docker Hub Profile"
                >
                  <FaDocker className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Input Panels */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              {activeTab === 'form' ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl shadow-lg border border-violet-500/10"
                >
                  <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-6">
                    Send a Message
                  </h3>

                  {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <FiCheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-[bounce_1.5s_infinite]" />
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                        Thank you for reaching out, Kaustubh will get back to you shortly.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-violet-600 transition-colors ${
                            errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-violet-600 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-violet-600 transition-colors ${
                            errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                          }`}
                          placeholder="Project Collaboration"
                        />
                        {errors.subject && <span className="text-xs text-red-500 mt-1 block">{errors.subject}</span>}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-violet-600 transition-colors resize-none ${
                            errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                          }`}
                          placeholder="Type your message here..."
                        />
                        {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-600/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {status === 'submitting' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FiSend className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="shell-container"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#07080c] border border-violet-500/20 rounded-3xl p-6 font-mono text-[11px] text-violet-400/90 shadow-2xl flex flex-col justify-between min-h-[420px]"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-violet-500/10 pb-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        <span className="text-[10px] text-slate-500 ml-2">secure_ssh_mailer.sh</span>
                      </div>
                      <span className="text-[9px] text-slate-600 font-bold uppercase flex items-center gap-1">
                        <FiKey className="w-3 h-3 text-violet-500" /> AES-256 LINK
                      </span>
                    </div>

                    {/* Chat Terminal Script Inputs */}
                    <div className="space-y-4">
                      {shellStep >= 0 && (
                        <div>
                          <div>kaustubh_shinde@secure_ssh:~$ /name</div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-white">&gt;</span>
                            <input
                              type="text"
                              value={shellName}
                              disabled={shellStep > 0}
                              onChange={(e) => setShellName(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter' && shellName.trim()) setShellStep(1); }}
                              placeholder="Type name and press Enter..."
                              className="bg-transparent border-b border-violet-500/30 text-white outline-hidden focus:border-violet-500 text-[11px] w-full py-0.5"
                            />
                          </div>
                        </div>
                      )}

                      {shellStep >= 1 && (
                        <div>
                          <div>kaustubh_shinde@secure_ssh:~$ /email</div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-white">&gt;</span>
                            <input
                              type="email"
                              value={shellEmail}
                              disabled={shellStep > 1}
                              onChange={(e) => setShellEmail(e.target.value)}
                              onKeyDown={(e) => { 
                                if (e.key === 'Enter' && shellEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shellEmail)) {
                                  setShellStep(2); 
                                }
                              }}
                              placeholder="Type valid email and press Enter..."
                              className="bg-transparent border-b border-violet-500/30 text-white outline-hidden focus:border-violet-500 text-[11px] w-full py-0.5"
                            />
                          </div>
                        </div>
                      )}

                      {shellStep >= 2 && (
                        <div>
                          <div>kaustubh_shinde@secure_ssh:~$ /message</div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-white">&gt;</span>
                            <input
                              type="text"
                              value={shellMessage}
                              disabled={shellStep > 2}
                              onChange={(e) => setShellMessage(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter' && shellMessage.trim()) setShellStep(3); }}
                              placeholder="Type message text and press Enter..."
                              className="bg-transparent border-b border-violet-500/30 text-white outline-hidden focus:border-violet-500 text-[11px] w-full py-0.5"
                            />
                          </div>
                        </div>
                      )}

                      {shellStep === 3 && (
                        <div className="pt-2">
                          <div className="text-white font-bold mb-2">Ready to encrypt and transmit?</div>
                          <button
                            onClick={handleShellTransmit}
                            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-bold font-mono cursor-pointer"
                          >
                            Execute Cryptographic Send
                          </button>
                        </div>
                      )}

                      {shellStep === 4 && (
                        <div className="space-y-1.5 text-slate-400 mt-2 font-mono">
                          {shellLogs.map((log, idx) => (
                            <div key={idx} className={log.includes('OK') || log.includes('closed') ? 'text-emerald-400' : 'text-slate-400'}>
                              {log}
                            </div>
                          ))}
                          {cipherText && (
                            <div className="text-violet-300 select-none overflow-hidden truncate max-w-sm">
                              CIPHER_OUTPUT: {cipherText}
                            </div>
                          )}
                        </div>
                      )}

                      {shellStep === 5 && (
                        <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-2xl flex flex-col gap-2">
                          <div className="font-bold flex items-center gap-1.5">
                            <FiCheckCircle className="w-4 h-4" /> TRANSMISSION SUCCESSFUL
                          </div>
                          <p className="text-[10px] leading-relaxed opacity-80">
                            Payload successfully compressed, encrypted with RSA-4096 standards, and dispatched to Kaustubh's email inbox. Connection severed.
                          </p>
                          <button
                            onClick={() => { setShellStep(0); setShellLogs([]); }}
                            className="mt-2 text-violet-400 underline text-[10px] text-left cursor-pointer"
                          >
                            Initialize New Handshake Session
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[8px] text-slate-600 pt-3 border-t border-slate-900 uppercase">
                    Shell Kernel: SSH-NODE-AES-MAILER
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
