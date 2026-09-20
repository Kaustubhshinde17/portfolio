
export const portfolioData = {
  personalInfo: {
    name: "Kaustubh Dattatray Shinde",
    title: "Electronics & Telecommunication Engineer | Java, React & SQL Developer | AI & Embedded Systems",
    headline: "Electronics & Telecommunication Engineer | Java, React & SQL Developer | AI & Embedded Systems",
    bio: "Electronics & Telecommunication Engineer with hands-on development experience in Java, React and SQL, alongside applied AI and embedded-systems project work. Built an AI-powered autonomous vehicle combining computer vision, NLP and real-time control. Comfortable working across the stack and quickly picking up new frameworks and tools to solve real problems.",
    location: "Pune, Maharashtra, India",
    email: "kdshinde175@gmail.com",
    phone: "+91 7385570673",
    resumeUrl: "/Kaustubh_Shinde_Resume.pdf",
    socials: {
      github: "https://github.com/Kaustubhshinde17",
      linkedin: "https://www.linkedin.com/in/kaustubh-shinde03",
      email: "mailto:kdshinde175@gmail.com"
    },
    aboutMe: [
      "Electronics & Telecommunication Engineering graduate from ISBM College of Engineering, Savitribai Phule Pune University (SPPU).",
      "Hands-on development experience in Java, React, SQL, applied AI, and embedded systems.",
      "Built an AI-powered autonomous vehicle combining computer vision, NLP, and real-time control.",
      "Comfortable working across the stack and quickly picking up new frameworks and tools to solve real-world problems."
    ]
  },
  stats: [
    { label: "Projects Completed", value: "4", color: "from-violet-500 to-indigo-500" },
    { label: "Technical Skills", value: "12+", color: "from-indigo-500 to-blue-500" },
    { label: "Research Publications", value: "2", color: "from-blue-500 to-cyan-500" },
    { label: "Certifications", value: "3", color: "from-cyan-500 to-emerald-500" }
  ],
  education: [
    {
      degree: "Bachelor of Engineering",
      major: "Electronics & Telecommunication Engineering",
      institution: "ISBM College of Engineering, Pune",
      university: "Savitribai Phule Pune University (SPPU)",
      period: "2022 – 2026",
      gpa: [
        { term: "FY CGPA", score: "7.59" },
        { term: "SY CGPA", score: "9.11" },
        { term: "TY CGPA", score: "8.80" },
        { term: "BE CGPA", score: "9.18" }
      ],
      description: "Rigorous coursework in core electronics, signal processing, CAN Bus automotive networking, embedded systems, and object-oriented programming foundations."
    }
  ],
  skills: {
    languages: [
      { name: "Java", level: 90, icon: "DiJava" },
      { name: "JavaScript", level: 85, icon: "DiJavascript1" },
      { name: "SQL", level: 80, icon: "DiDatabase" },
      { name: "HTML5", level: 95, icon: "DiHtml5" },
      { name: "CSS3", level: 85, icon: "DiCss3" }
    ],
    frameworks: [
      { name: "React", level: 85, icon: "DiReact" },
      { name: "Spring Boot", level: 85, icon: "SiSpringboot" }
    ],
    databases: [
      { name: "MySQL", level: 85, icon: "DiMysql" }
    ],
    developerTools: [
      { name: "Git", level: 90, icon: "DiGit" },
      { name: "GitHub", level: 90, icon: "DiGithubBadge" },
      { name: "VS Code", level: 95, icon: "VscVscode" }
    ],
    concepts: [
      { name: "Object-Oriented Programming (OOP)", level: 90, icon: "SiCodeforces" }
    ]
  },
  projects: [
    {
      id: "rc-vehicle",
      title: "AI-Powered Autonomous RC Car | Voice Control & Navigation",
      category: "AI & Embedded",
      tech: ["Raspberry Pi", "Python", "Flask", "OpenCV", "Gemini API", "GPIO"],
      description: "Built an autonomous RC vehicle on a Raspberry Pi 4 with a Flask backend, live OpenCV video streaming, and a Gemini vision-model agent that analyses the camera feed to make real-time driving decisions.",
      highlights: [
        "Built an autonomous RC vehicle on a Raspberry Pi 4 with a Flask backend, live OpenCV video streaming, and a Gemini vision-model agent that analyses the camera feed to make real-time driving decisions.",
        "Implemented a multithreaded GPIO motor-control module for the drive system, with an independent safety loop to manage obstacle response and emergency stop.",
        "Developed a voice-command pipeline that routes transcribed natural-language instructions through a Gemini-powered agent to executable drive commands (forward, backward, left, right, stop).",
        "Built a browser-based control dashboard serving a live MJPEG camera stream alongside manual drive controls and an autopilot toggle."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17",
        demo: "#"
      }
    },
    {
      id: "amazon-clone",
      title: "Amazon Clone | E-Commerce UI",
      category: "Frontend",
      tech: ["JavaScript (ES6 Modules)", "HTML5", "CSS3", "Jasmine"],
      description: "Built a responsive Amazon-style storefront in vanilla JavaScript, HTML and CSS with a cart, multi-step checkout, delivery-option selection and an order-tracking view, persisting cart state via local storage.",
      highlights: [
        "Built a responsive Amazon-style storefront in vanilla JavaScript, HTML and CSS with a cart, multi-step checkout, delivery-option selection and an order-tracking view, persisting cart state via local storage.",
        "Refactored the cart module into a class-based (OOP) design and wrote unit tests for cart and currency-formatting utilities using the Jasmine testing framework."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17",
        demo: "#"
      }
    },
    {
      id: "youtube-clone",
      title: "Responsive YouTube Clone | Front-End Layout",
      category: "Frontend",
      tech: ["HTML5", "CSS3 (Flexbox, Grid)"],
      description: "Built a fully responsive YouTube-style interface using semantic HTML5 and modern CSS, including a collapsible sidebar, search header and video-grid layout.",
      highlights: [
        "Built a fully responsive YouTube-style interface using semantic HTML5 and modern CSS, including a collapsible sidebar, search header and video-grid layout.",
        "Implemented adaptive, multi-breakpoint layouts using CSS Flexbox and Grid."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17",
        demo: "#"
      }
    },
    {
      id: "chatbot",
      title: "React Chatbot | Conversational UI",
      category: "Frontend",
      tech: ["React", "JavaScript", "Vite"],
      description: "Developed a chatbot interface in React using functional components and hooks to manage conversation state and render message history.",
      highlights: [
        "Developed a chatbot interface in React using functional components and hooks to manage conversation state and render message history.",
        "Structured the UI into reusable ChatInput, ChatMessage and ChatMessages components, bundled and built with Vite."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17",
        demo: "#"
      }
    }
  ],
  publications: [
    {
      title: "Advanced Safety System for Two-Wheeler Using PIC16F877A and CAN Bus",
      venue: "ICETT-2026 (International Conference on Emerging Trends in Technology)",
      role: "Co-author",
      badge: "International Conference",
      description: "Co-authored a research paper proposing a low-cost embedded safety system for two-wheelers built around a PIC16F877A microcontroller with CAN bus communication for reliable, fault-tolerant data exchange."
    },
    {
      title: "AI-Powered Autonomous RC Vehicle: Design and Performance",
      venue: "SPPU Stage-I Report (Final Year Project Report)",
      role: "Author",
      badge: "SPPU Final Year Report",
      description: "Authored the Phase-I project report covering literature survey, problem formulation, system architecture and proposed methodology for an AI-powered autonomous RC vehicle.",
      details: {
        literatureSurvey: "Authored the Phase-I project report covering literature survey, problem formulation, system architecture and proposed methodology for an AI-powered autonomous RC vehicle.",
        architecture: "Detailed the integration of voice-command recognition, conversational AI processing, motor control and computer-vision-based obstacle detection into a single Raspberry Pi platform.",
        aiIntegration: "Leveraged Gemini vision-model and conversational AI agents to process natural-language driving instructions and analyse video streams for real-time driving decisions.",
        voiceRecognition: "Developed a voice-command pipeline that routes transcribed natural-language instructions through a Gemini-powered agent to executable drive commands (forward, backward, left, right, stop).",
        computerVision: "Integrated live OpenCV video streaming to analyze camera feeds and execute real-time obstacle response and autonomous navigation."
      }
    }
  ],
  certifications: [
    { name: "Java Programming Masterclass", issuer: "Udemy", date: "2024", credentialId: "UC-JAVA-CLASS" },
    { name: "React Developer", issuer: "HackerRank", date: "2025", credentialId: "HR-REACT-DEV" },
    { name: "SQL Advanced", issuer: "HackerRank", date: "2024", credentialId: "SQL-ADV-HR" }
  ]
};
