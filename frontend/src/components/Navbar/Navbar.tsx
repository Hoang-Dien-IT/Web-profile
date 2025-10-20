import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

interface NavItem {
  key: string;
  href: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useLanguage();

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);

      // Detect active section
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-2xl shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      {/* Premium floating background effect */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-black/40 via-gray-900/30 to-black/40 backdrop-blur-2xl' 
          : 'bg-transparent'
      }`} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Premium Logo */}
          <motion.div
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center space-x-3 text-2xl font-bold gradient-text cursor-pointer relative z-10"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl relative mega-glow">
                <span className="text-white font-black text-lg">P</span>
                <span className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl blur opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              </div>
              <span className="hidden sm:block relative">
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
              </span>
            </button>
          </motion.div>

          {/* Premium Desktop Menu */}
          <div className="hidden md:block">
            <div className={`ml-10 flex items-center space-x-2 p-2 rounded-2xl transition-all duration-500 ${
              scrolled 
                ? 'glass-premium shadow-2xl' 
                : 'bg-white/5 backdrop-blur-sm'
            }`}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative group transform-3d ${
                      activeSection === item.href.replace('#', '')
                        ? 'text-orange-300 bg-gradient-to-r from-orange-500/20 to-red-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="relative z-10">{t(item.key)}</span>
                    
                    {/* Premium Active indicator */}
                    {activeSection === item.href.replace('#', '') && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-xl mega-glow"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover glow effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Language Switcher & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Resume Button - enhanced with glow and accessibility */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative"
            >
              <a
                href="https://drive.google.com/file/d/1QoWI4A9RuRBHf9OoMxEXfgF4CxGki0Bm/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume in Google Drive (opens in a new tab)"
                title="Download Resume"
                className="inline-flex items-center px-6 py-2 rounded-full font-semibold transition-all duration-300 text-primary-400 border border-primary-500 bg-white/3 backdrop-blur-sm hover:text-white hover:from-primary-600 hover:to-primary-700"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {t('nav.resume')}
                </span>
                {/* Glow */}
                <span className="absolute inset-0 rounded-full blur-lg opacity-0 transition-opacity duration-300 bg-primary-500/30 group-hover:opacity-100" aria-hidden />
              </a>
              {/* Subtle animated ring */}
              <span className="absolute -inset-1 rounded-full border border-primary-500 opacity-20 animate-pulse-slow pointer-events-none" aria-hidden />
            </motion.div>

            {/* Contact Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-primary-600 hover:to-primary-700"
              >
                {t('nav.letsTalk')}
              </button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="bg-white block h-0.5 w-6 rounded-sm transition-all duration-300"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="bg-white block h-0.5 w-6 rounded-sm mt-1 transition-all duration-300"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="bg-white block h-0.5 w-6 rounded-sm mt-1 transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-primary-400 bg-primary-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {t(item.key)}
                </button>
              </motion.div>
            ))}              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                className="pt-4"
              >
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="block w-full text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg"
                >
                  Let's Talk
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;