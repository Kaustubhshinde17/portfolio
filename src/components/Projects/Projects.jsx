import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiShoppingCart, FiCpu, FiMessageSquare, FiSend, FiPlus, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';

// Mock developer products for ShopEase
const shopProducts = [
  { id: 1, name: "Smart IoT Core Controller", price: 49.99, category: "Hardware" },
  { id: 2, name: "CAN Bus PIC16F Dev Board", price: 29.99, category: "Embedded" },
  { id: 3, name: "OpenCV Edge Tracking Camera", price: 19.99, category: "Vision" }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'sandbox'
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // ShopEase Simulator States
  const [cart, setCart] = useState([]);
  const [checkoutStatus, setCheckoutStatus] = useState('idle'); // 'idle' | 'processing' | 'receipt'
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminSales, setAdminSales] = useState(1240.00);

  // Autonomous Car Simulator States
  const [carSpeed, setCarSpeed] = useState(22);
  const [carBattery, setCarBattery] = useState(88);
  const [carObstacle, setCarObstacle] = useState(85);
  const [carLogs, setCarLogs] = useState(["[SYSTEM] Autopilot sequence active.", "[GEMINI] Navigation matrix established."]);
  const [activePlayground, setActivePlayground] = useState('car'); // 'shopease' | 'car' | 'chatbot'
  const canvasRef = useRef(null);

  // Chatbot States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi! I am Kaustubh's portfolio assistant. Ask me anything about his skills, projects, or education!", isUser: false }
  ]);

  const filters = ['All', 'Full Stack', 'AI & Embedded', 'Frontend'];

  const filteredProjects = activeFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === activeFilter);

  // --- ShopEase Logic ---
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const getTax = () => getSubtotal() * 0.08;
  const getTotal = () => getSubtotal() + getTax();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStatus('processing');
    setTimeout(() => {
      setCheckoutStatus('receipt');
      setAdminSales(prev => prev + getTotal());
      setCart([]);
    }, 2000);
  };

  // --- Autonomous Car Simulation Loop ---
  useEffect(() => {
    if (activePlayground !== 'car' || activeTab !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let offset = 0;
    
    // Draw wireframe path
    const draw = () => {
      ctx.fillStyle = '#0b0c10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Road borders
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(35, 0);
      ctx.lineTo(35, canvas.height);
      ctx.moveTo(canvas.width - 35, 0);
      ctx.lineTo(canvas.width - 35, canvas.height);
      ctx.stroke();
      
      // Central dashed lanes
      ctx.strokeStyle = '#8b5cf6';
      ctx.setLineDash([12, 12]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0 + offset);
      ctx.lineTo(canvas.width / 2, canvas.height + offset);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw simulated obstacle
      if (carObstacle < 60) {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(canvas.width / 2 - 12, 50, 24, 16);
        ctx.strokeStyle = '#f87171';
        ctx.strokeRect(canvas.width / 2 - 15, 47, 30, 22);
      }
      
      // Draw vehicle chassis
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.strokeRect(canvas.width / 2 - 16, canvas.height - 60, 32, 44);
      
      // Wheels
      ctx.fillStyle = '#374151';
      ctx.fillRect(canvas.width / 2 - 20, canvas.height - 52, 4, 10);
      ctx.fillRect(canvas.width / 2 + 16, canvas.height - 52, 4, 10);
      ctx.fillRect(canvas.width / 2 - 20, canvas.height - 28, 4, 10);
      ctx.fillRect(canvas.width / 2 + 16, canvas.height - 28, 4, 10);

      // Radar scan cone
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height - 60);
      ctx.lineTo(canvas.width / 2 - 40, canvas.height - 180);
      ctx.lineTo(canvas.width / 2 + 40, canvas.height - 180);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      offset = (offset + carSpeed * 0.12) % 24;
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [activePlayground, activeTab, carSpeed, carObstacle]);

  // Handle autonomous car CLI commands
  const handleCarCommand = (command) => {
    if (command === 'fast') {
      setCarSpeed(36);
      setCarLogs(prev => [...prev.slice(-4), "[CMD] Speed override: High. Outputting 36km/h.", "[GEMINI] Increasing throttle, maintaining steering angles."]);
    } else if (command === 'slow') {
      setCarSpeed(12);
      setCarLogs(prev => [...prev.slice(-4), "[CMD] Speed override: Low. Outputting 12km/h.", "[GEMINI] Reducing motor frequency."]);
    } else if (command === 'obstacle') {
      setCarObstacle(30);
      setCarSpeed(0);
      setCarLogs(prev => [...prev.slice(-4), "[SENSORS] Obstacle detected at 30cm!", "[ABS] Emergency braking triggered. Speed: 0km/h."]);
    } else if (command === 'clear') {
      setCarObstacle(85);
      setCarSpeed(22);
      setCarLogs(prev => [...prev.slice(-4), "[SENSORS] Obstacle range clear.", "[GEMINI] Resuming lane explorations at standard throttle."]);
    }
  };

  // --- Chatbot Logic ---
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    
    setChatMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    
    let reply = "I'm Kaustubh's portfolio chatbot. Try asking about his skills, projects, certifications, or how to contact him!";
    const q = userMsg.toLowerCase();
    
    if (q.includes('java') || q.includes('spring') || q.includes('backend') || q.includes('springboot')) {
      reply = "Kaustubh is highly skilled in Java development and the Spring Ecosystem (Spring Boot, Spring Data JPA, MVC). He uses them to construct secure, scalable RESTful APIs.";
    } else if (q.includes('react') || q.includes('frontend') || q.includes('tailwind') || q.includes('javascript')) {
      reply = "On the frontend, he codes reactive architectures using React, Vite, Framer Motion, and Tailwind CSS. The dashboard interfaces you're playing with are built directly in React!";
    } else if (q.includes('project') || q.includes('shopease') || q.includes('car') || q.includes('rc vehicle')) {
      reply = "His prime projects are ShopEase (Spring Boot/React e-commerce engine) and an AI Autonomous RC Vehicle powered by a Raspberry Pi 4, Flask, OpenCV, and Gemini APIs.";
    } else if (q.includes('gpa') || q.includes('education') || q.includes('college') || q.includes('degree')) {
      reply = "He earned his Bachelor of Engineering in Electronics & Telecommunication from Savitribai Phule Pune University. Term CGPAs: 7.59 (FY), 9.11 (SY), 8.80 (TY).";
    } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('social')) {
      reply = "You can email him at skaustubh652@gmail.com, call +91 95453 58514, or visit his GitHub (Kaustubhshinde17) and LinkedIn (kaustubh-shinde03).";
    } else if (q.includes('certification') || q.includes('verify')) {
      reply = "He holds certifications in: Java Masterclass (Udemy), React Developer (Meta), and SQL Advanced Database (HackerRank).";
    } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      reply = "Hello! I'm ready to answer any questions about Kaustubh's portfolio. What would you like to verify?";
    }

    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: reply, isUser: false }]);
    }, 500);
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Tabs */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white inline-block relative mb-4"
          >
            Featured Projects
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-600 rounded-full" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8"
          >
            Review my project sheets or enter the sandbox environments to execute live mock simulations.
          </motion.p>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 max-w-sm w-full">
            <button
              onClick={() => setActiveTab('grid')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              📋 Projects Sheet
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              🎮 4D Playgrounds
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'grid' ? (
            <motion.div
              key="grid-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              {/* Filters */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    whileHover={{ 
                      y: -8, 
                      rotateX: 3, 
                      rotateY: -3, 
                      boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
                    }}
                    onClick={() => setSelectedProject(project)}
                    className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between cursor-pointer h-full border border-violet-500/10"
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-violet-500 mb-3 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div>
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
                      <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1">
                        View Details &rarr;
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sandbox-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Playground Selector */}
              <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border border-violet-500/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white mb-3">
                    Playground Hub
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono">
                    Select an interactive workspace simulation corresponding to my engineering projects.
                  </p>

                  <div className="space-y-3">
                    {[
                      { id: 'shopease', label: 'ShopEase E-Commerce', icon: FiShoppingCart, desc: 'Simulate transactional logic and checkout sequences.' },
                      { id: 'car', label: 'Autonomous RC Car HUD', icon: FiCpu, desc: 'Evaluate telemetry dashboard streams and vector paths.' },
                      { id: 'chatbot', label: 'Portfolio AI Assistant', icon: FiMessageSquare, desc: 'Consult the trained chatbot regarding portfolio specs.' }
                    ].map((play) => {
                      const Icon = play.icon;
                      return (
                        <button
                          key={play.id}
                          onClick={() => setActivePlayground(play.id)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                            activePlayground === play.id
                              ? 'bg-violet-600/10 border-violet-600 text-violet-600 dark:text-violet-400'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-500/30'
                          }`}
                        >
                          <span className="text-xs font-bold font-display flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5" />
                            {play.label}
                          </span>
                          <span className="text-[10px] opacity-80 leading-normal">{play.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-900/60 text-[10px] font-mono text-slate-500">
                  Simulation: {activePlayground.toUpperCase()}_ACTIVE
                </div>
              </div>

              {/* Playground Main Screen */}
              <div className="lg:col-span-9 glass-panel rounded-3xl p-6 border border-violet-500/15 flex flex-col justify-between min-h-[420px]">
                
                {/* ShopEase E-commerce sandbox */}
                {activePlayground === 'shopease' && (
                  <div className="flex flex-col md:flex-row gap-6 h-full items-stretch">
                    {/* Left: Product Catalog */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold font-display text-slate-800 dark:text-white">ShopEase Dev Catalog</h4>
                        <button 
                          onClick={() => setShowAdminPanel(!showAdminPanel)}
                          className="text-[10px] font-mono font-bold text-violet-500 flex items-center gap-1"
                        >
                          {showAdminPanel ? <FiToggleRight className="w-4 h-4 text-violet-500" /> : <FiToggleLeft className="w-4 h-4 text-slate-500" />}
                          Admin Config View
                        </button>
                      </div>
                      
                      {showAdminPanel ? (
                        <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl font-mono text-xs text-slate-300 space-y-3">
                          <span className="text-violet-500 font-bold text-[10px]">ADMIN_DASHBOARD_ANALYTICS</span>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div>Total Revenue:</div>
                            <div className="text-emerald-400 text-right">${adminSales.toFixed(2)}</div>
                            <div>Merchant Status:</div>
                            <div className="text-right text-indigo-400">ACTIVE</div>
                            <div>Payment Gateway:</div>
                            <div className="text-right">Stripe Sandbox</div>
                          </div>
                          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                            Log: MySQL transaction mapping persistent.
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {shopProducts.map(p => (
                            <div key={p.id} className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                              <div>
                                <span className="text-[9px] uppercase font-mono font-bold text-violet-500">{p.category}</span>
                                <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-100">{p.name}</h5>
                                <span className="text-xs font-bold text-slate-500">${p.price}</span>
                              </div>
                              <button
                                onClick={() => addToCart(p)}
                                className="p-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <FiPlus className="w-3.5 h-3.5" /> Buy
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Checkout Sandbox */}
                    <div className="w-full md:w-80 bg-slate-950/60 border border-violet-500/10 p-5 rounded-2xl flex flex-col justify-between font-mono text-xs text-slate-400">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                          <span className="font-bold text-white text-[10px]">SHOPPING_CART</span>
                          <span className="text-violet-500 font-bold">{cart.reduce((s,i)=>s+i.qty, 0)} Items</span>
                        </div>

                        {checkoutStatus === 'idle' && (
                          <div className="space-y-2 max-h-[140px] overflow-y-auto no-scrollbar">
                            {cart.length === 0 ? (
                              <div className="text-center text-slate-600 py-6">Cart is empty. Add developer kits.</div>
                            ) : (
                              cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between text-[11px]">
                                  <span className="text-slate-300 truncate max-w-[120px]">{item.name} (x{item.qty})</span>
                                  <div className="flex items-center gap-2">
                                    <span>${(item.price * item.qty).toFixed(2)}</span>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 cursor-pointer">
                                      <FiTrash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}

                        {checkoutStatus === 'processing' && (
                          <div className="py-8 text-center text-slate-300 space-y-3">
                            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto" />
                            <div>Resolving credit token authorization via HTTP client...</div>
                          </div>
                        )}

                        {checkoutStatus === 'receipt' && (
                          <div className="space-y-2 text-[10px] text-emerald-400/90 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20">
                            <span className="font-bold text-[11px] block border-b border-emerald-500/10 pb-1">INVOICE PREVIEW</span>
                            <div>Order Hash: sha256_e83a...90</div>
                            <div>Transaction: AUTHORISED [Stripe]</div>
                            <div>Email: Notification triggered.</div>
                            <button onClick={() => setCheckoutStatus('idle')} className="mt-2 text-violet-400 font-bold underline block cursor-pointer">Shop again</button>
                          </div>
                        )}
                      </div>

                      {checkoutStatus === 'idle' && (
                        <div className="border-t border-slate-800 pt-3 mt-3">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span>Subtotal:</span>
                            <span>${getSubtotal().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-[11px] mb-2">
                            <span>Tax (8%):</span>
                            <span>${getTax().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-white text-xs border-t border-slate-800 pt-2 mb-4">
                            <span>TOTAL:</span>
                            <span>${getTotal().toFixed(2)}</span>
                          </div>
                          <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            className="w-full py-2.5 bg-violet-600 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Checkout Simulator
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Autonomous RC Car Simulator */}
                {activePlayground === 'car' && (
                  <div className="flex flex-col md:flex-row gap-6 h-full items-stretch">
                    {/* Simulator screen canvas */}
                    <div className="flex-grow flex flex-col items-center justify-center bg-[#07080d] border border-slate-800 p-2 rounded-2xl min-h-[220px]">
                      <canvas 
                        ref={canvasRef} 
                        width={280} 
                        height={240} 
                        className="rounded-xl border border-violet-500/10 shadow-inner w-full max-w-[280px]"
                      />
                    </div>

                    {/* Autopilot telemetry controller */}
                    <div className="w-full md:w-80 flex flex-col justify-between bg-slate-950/60 border border-violet-500/10 p-5 rounded-2xl font-mono text-xs text-slate-400">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                          <span className="font-bold text-white text-[10px]">VEHICLE TELEMETRY</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="grid grid-cols-2 gap-y-1.5 text-[11px] mb-4">
                          <div>Autopilot Status:</div>
                          <div className="text-emerald-400 text-right">ENGAGED</div>
                          <div>Velocity Stream:</div>
                          <div className="text-right text-slate-200">{carSpeed} km/h</div>
                          <div>Range Finder:</div>
                          <div className={`text-right font-bold ${carObstacle < 50 ? 'text-red-400 animate-pulse':'text-slate-200'}`}>{carObstacle} cm</div>
                          <div>Power Grid:</div>
                          <div className="text-right text-slate-200">{carBattery}%</div>
                        </div>

                        {/* Interactive triggers */}
                        <div className="border-t border-slate-800/80 pt-3">
                          <span className="text-[10px] font-bold text-violet-500 block mb-2">INJECT SIMULATOR EVENTS</span>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => handleCarCommand('fast')} className="py-1.5 rounded-lg bg-slate-800 text-white text-[10px] font-bold cursor-pointer">High Throttle</button>
                            <button onClick={() => handleCarCommand('slow')} className="py-1.5 rounded-lg bg-slate-800 text-white text-[10px] font-bold cursor-pointer">Low Throttle</button>
                            <button onClick={() => handleCarCommand('obstacle')} className="py-1.5 rounded-lg bg-red-950/50 border border-red-500/30 text-red-400 text-[10px] font-bold cursor-pointer">Inject Wall</button>
                            <button onClick={() => handleCarCommand('clear')} className="py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold cursor-pointer">Clear Path</button>
                          </div>
                        </div>
                      </div>

                      {/* Log output */}
                      <div className="border-t border-slate-800/80 pt-3 mt-4 bg-black/40 p-2.5 rounded-lg border border-slate-900">
                        <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1.5">Edge Logging Terminal</div>
                        <div className="space-y-1 text-[9px] leading-normal h-[60px] overflow-y-auto no-scrollbar">
                          {carLogs.map((log, idx) => (
                            <div key={idx} className={log.includes('SENSORS') || log.includes('ABS') ? 'text-red-400' : log.includes('CMD') ? 'text-indigo-400':'text-slate-400'}>
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Assistant Chatbot */}
                {activePlayground === 'chatbot' && (
                  <div className="flex flex-col h-[340px] justify-between border border-violet-500/10 rounded-2xl overflow-hidden bg-slate-950/40">
                    {/* Chat log body */}
                    <div className="flex-grow p-4 space-y-3 overflow-y-auto no-scrollbar">
                      {chatMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                              msg.isUser 
                                ? 'bg-violet-600 text-white rounded-br-none' 
                                : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none font-sans'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat input footer */}
                    <form 
                      onSubmit={handleChatSubmit}
                      className="border-t border-slate-100 dark:border-slate-900 p-3 flex gap-2 bg-slate-900/60"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about his Skills, Projects, GPA, or Contact..."
                        className="flex-grow px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:ring-1 focus:ring-violet-500 font-sans"
                      />
                      <button
                        type="submit"
                        className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white cursor-pointer"
                      >
                        <FiSend className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass-panel max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold uppercase tracking-wider text-violet-500 block mb-2">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-800 dark:text-white pr-10">
                {selectedProject.title}
              </h3>

              <div className="mt-6">
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

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                  {selectedProject.description}
                </p>

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
