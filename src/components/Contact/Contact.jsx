import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaDocker } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    
    // Simulate API request delay
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0c0d14]/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative"
          >
            Contact Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            Reach out via the form below or connect through my email or socials.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Info Card Grid */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-200 border-l-4 border-violet-600 pl-3 mb-6">
              Get in Touch
            </h3>

            {/* Email Info */}
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

            {/* Phone Info */}
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

            {/* Location Info */}
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

            {/* Quick Links */}
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

          {/* Interactive Form Panel */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-lg border border-violet-500/10">
              <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-6">
                Send a Message
              </h3>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
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
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name Field */}
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
                      {errors.name && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    {/* Email Field */}
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
                      {errors.email && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    {/* Subject Field */}
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
                      {errors.subject && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.subject}</span>
                      )}
                    </div>

                    {/* Message Field */}
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
                      {errors.message && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
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
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
