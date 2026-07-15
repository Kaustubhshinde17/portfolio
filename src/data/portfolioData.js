export const portfolioData = {
  personalInfo: {
    name: "Kaustubh Dattatray Shinde",
    title: "Electronics & Telecommunication Engineer | Java Full Stack Developer | React Developer | AI & Embedded Systems Enthusiast",
    headline: "Electronics & Telecommunication Engineer | Java Full Stack Developer | React Developer | AI & Embedded Systems Enthusiast",
    bio: "A passionate software developer with experience building full-stack web applications, AI-powered embedded systems, and scalable Java applications. I enjoy solving real-world problems using modern technologies and continuously learning new tools.",
    location: "Pune, Maharashtra, India",
    email: "kaustubh.shinde@example.com",
    phone: "+91 98765 43210",
    resumeUrl: "/Kaustubh_Shinde_Resume.pdf",
    socials: {
      github: "https://github.com/Kaustubhshinde17", // Corrected GitHub profile
      linkedin: "https://www.linkedin.com/in/kaustubh-shinde03",
      dockerhub: "https://hub.docker.com/u/kaustubhshinde03",
      email: "mailto:kaustubh.shinde@example.com" // Corrected Email link
    },
    aboutMe: [
      "Electronics & Telecommunication Engineering graduate from ISBM College of Engineering, Savitribai Phule Pune University.",
      "Based in Pune, India, with a deep interest in software engineering, startups, and building impactful products.",
      "Passionate about Java backend development (Spring Boot), modern frontends (React & Tailwind CSS), AI applications, and embedded systems.",
      "Highly motivated to solve real-world problems by bridging the gap between hardware systems and scalable, modern cloud software."
    ]
  },
  stats: [
    { label: "Projects Completed", value: "5+", color: "from-violet-500 to-indigo-500" },
    { label: "Technical Skills", value: "15+", color: "from-indigo-500 to-blue-500" },
    { label: "Research Publications", value: "2", color: "from-blue-500 to-cyan-500" },
    { label: "Certifications", value: "3", color: "from-cyan-500 to-emerald-500" }
  ],
  education: [
    {
      degree: "Bachelor of Engineering",
      major: "Electronics & Telecommunication Engineering",
      institution: "ISBM College of Engineering",
      university: "Savitribai Phule Pune University",
      period: "2022 - 2026",
      gpa: [
        { term: "FY CGPA", score: "7.59" },
        { term: "SY CGPA", score: "9.11" },
        { term: "TY CGPA", score: "8.80" },
        { term: "FINAL SGPA", score: "9.18" },
        { term: "OVERALL CGPA", score: "8.58" }
      ],
      description: "Rigorous coursework in core electronics, signal processing, CAN Bus automotive networking, IoT design, and telecommunication principles, complemented by engineering mathematics and object-oriented programming foundations."
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
      { name: "Spring Boot", level: 85, icon: "SiSpringboot" },
      { name: "Spring Data JPA", level: 80, icon: "SiSpring" },
      { name: "React", level: 85, icon: "DiReact" },
      { name: "Vite", level: 80, icon: "SiVite" }
    ],
    databases: [
      { name: "MySQL", level: 85, icon: "DiMysql" }
    ],
    developerTools: [
      { name: "Git", level: 90, icon: "DiGit" },
      { name: "GitHub", level: 90, icon: "DiGithubBadge" },
      { name: "Docker", level: 75, icon: "DiDocker" },
      { name: "Docker Hub", level: 75, icon: "SiDocker" },
      { name: "Linux", level: 80, icon: "DiLinux" },
      { name: "Raspberry Pi", level: 85, icon: "SiRaspberrypi" },
      { name: "VS Code", level: 95, icon: "VscVscode" }
    ],
    concepts: [
      { name: "Object-Oriented Programming (OOP)", level: 90, icon: "SiCodeforces" },
      { name: "Data Structures & Algorithms", level: 80, icon: "SiCodementor" },
      { name: "REST APIs", level: 88, icon: "SiPostman" },
      { name: "Responsive Web Design", level: 90, icon: "SiWebflow" }
    ]
  },
  projects: [
    {
      id: "shopease",
      title: "ShopEase – Full Stack E-Commerce Platform",
      category: "Full Stack",
      tech: ["Java", "Spring Boot", "Spring Data JPA", "React", "Vite", "MySQL", "Tailwind CSS"],
      description: "A robust and secure full-stack e-commerce solution offering an intuitive shopping experience, dynamic product catalogs, and administrator control mechanisms.",
      highlights: [
        "Dynamic Product Catalogue with searching, filtering, and categorization capabilities.",
        "Interactive Shopping Cart with persistent user sessions via local storage and state management.",
        "Secure Checkout simulation containing address validation and purchase confirmation.",
        "Order Tracking system to monitor package routing and shipping status updates.",
        "Rich Admin Dashboard to manage inventory listings, update statuses, and view user analytics.",
        "REST APIs built with Spring Boot, conforming to HTTP standards and secured endpoints.",
        "Automated Email Notifications triggered for account registration and successful order placement.",
        "Persistent cart integration linking user records to MySQL database states."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17", // Corrected GitHub link
        demo: "#"
      }
    },
    {
      id: "rc-vehicle",
      title: "AI-Powered Autonomous RC Vehicle",
      category: "AI & Embedded",
      tech: ["Raspberry Pi", "Python", "Flask", "OpenCV", "Gemini API", "GPIO", "Hardware Assembly"],
      description: "An advanced, self-navigating robotics project integrating speech-recognition, machine vision, and generative intelligence to achieve hands-free autonomous exploration.",
      highlights: [
        "Voice-controlled commands processed locally for directional routing (Forward, Stop, Turn).",
        "AI Navigation systems determining trajectory pathways and responding to situational queries.",
        "Live camera streaming over local web networks with ultra-low latency.",
        "Obstacle detection and collision avoidance using ultrasonic sensors and OpenCV image grids.",
        "Browser-based control dashboard detailing speed metrics, power stats, and live vision streams.",
        "Autonomous driving modes making smart navigational decisions powered by Google's Gemini API."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17", // Corrected GitHub link
        demo: "#"
      }
    },
    {
      id: "amazon-clone",
      title: "Amazon Clone",
      category: "Frontend",
      tech: ["JavaScript", "HTML", "CSS", "Jasmine", "Responsive Design"],
      description: "A pixel-perfect clone of the Amazon marketplace desktop layout featuring functional e-commerce calculations and unit testing validation.",
      highlights: [
        "Functional shopping cart maintaining item counts and calculating price/tax tallies dynamically.",
        "Order checkout validation flow ensuring inputs match user credentials.",
        "Order tracking overview rendering simulated shipping progress graphs.",
        "Jasmine unit test suite verifying checkout routines and tax math functions.",
        "Fully responsive interface adapts to mobile, tablet, and widescreen layouts."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17", // Corrected GitHub link
        demo: "#"
      }
    },
    {
      id: "youtube-clone",
      title: "Responsive YouTube Clone",
      category: "Frontend",
      tech: ["HTML5", "CSS3", "Responsive UI"],
      description: "A frontend clone of the YouTube homepage highlighting structural semantic layouts, css flex/grid constructs, and media query responsiveness.",
      highlights: [
        "Dynamic video thumbnail grid adapting cards across 1 to 4 columns depending on viewport.",
        "Collapsible sidebar layout mimicking modern desktop YouTube navigation styles.",
        "Polished search bar styling including hover states and icon alignment.",
        "Highly-optimized page weight for lightning-fast mock navigation."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17", // Corrected GitHub link
        demo: "#"
      }
    },
    {
      id: "chatbot",
      title: "React Chatbot",
      category: "Frontend",
      tech: ["React", "JavaScript", "Vite", "Framer Motion", "Tailwind CSS"],
      description: "A highly-interactive and clean conversational chatbot frontend engineered using reusable component patterns.",
      highlights: [
        "Conversational UI featuring typing indicators and responsive message-bubble templates.",
        "Functional components optimizing rendering behaviors using React Hooks (`useState`, `useEffect`, `useRef`).",
        "Modular architecture allowing easy integration of external NLP engines or LLM APIs.",
        "Smooth scroll tracking always locking the viewport to the latest incoming chat responses."
      ],
      links: {
        github: "https://github.com/Kaustubhshinde17", // Corrected GitHub link
        demo: "#"
      }
    }
  ],
  publications: [
    {
      title: "Advanced Safety System for Two-Wheeler Using PIC16F877A and CAN Bus",
      venue: "ICETT 2026 (International Conference on Emerging Trends in Technology)",
      role: "Co-author",
      badge: "International Conference",
      description: "Designed a secure distributed embedded framework inside a two-wheeler vehicle using Controller Area Network (CAN) bus protocols to coordinate crash sensors, helmet-detection mechanisms, and real-time ignition lock controllers for maximum operator safety."
    },
    {
      title: "AI-Powered Autonomous RC Vehicle",
      venue: "Savitribai Phule Pune University (SPPU) Capstone Project",
      role: "Lead Hardware & Software Developer",
      badge: "SPPU Project Exhibition",
      description: "Capstone development combining computer vision (OpenCV) and Gemini API intelligence on a physical vehicle platform.",
      details: {
        literatureSurvey: "Reviewed autonomous navigation literature, edge AI models (MobileNet, YOLO-nano), and CAN bus / GPIO micro-interactions for automotive safety configurations.",
        architecture: "Dual-layer system: Raspberry Pi 4 coordinates Flask server, vision feed, and motor controls via GPIO, with client frontend rendering dashboard telemetry.",
        aiIntegration: "Leveraged Gemini API to process situational descriptions, answering natural language driving cues and mapping obstacle lists to vector directions.",
        voiceRecognition: "Implemented local offline Speech-to-Text engine converting voice prompts into discrete digital control packets.",
        computerVision: "OpenCV processes webcam feeds to segment lanes, perform Edge detection (Canny), and identify red light/stop sign triggers."
      }
    }
  ],
  certifications: [
    { name: "Java Programming Masterclass", issuer: "Udemy", date: "2024", credentialId: "UC-JAVA-CLASS" },
    { name: "React Developer Certification", issuer: "Meta / Coursera", date: "2025", credentialId: "META-REACT-DEV" },
    { name: "SQL Advanced Database Specialist", issuer: "HackerRank", date: "2024", credentialId: "SQL-ADV-HR" }
  ]
};
