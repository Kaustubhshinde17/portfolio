import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaDocker } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-100 dark:border-slate-900 bg-white/50 dark:bg-[#06070a]/80 backdrop-blur-xs relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Credits */}
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} &bull; Designed & Developed by
          </p>
          <p className="text-base font-bold font-display text-slate-800 dark:text-white mt-0.5">
            {portfolioData.personalInfo.name}
          </p>
        </div>

        {/* Socials bar */}
        <div className="flex items-center space-x-4">
          <a
            href={portfolioData.personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.personalInfo.socials.dockerhub}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            aria-label="Docker Hub"
          >
            <FaDocker className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.personalInfo.socials.email}
            className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            aria-label="Email"
          >
            <FiMail className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}

