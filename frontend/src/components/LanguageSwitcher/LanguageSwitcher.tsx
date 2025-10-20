import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Language } from '../../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="relative">
      <motion.div 
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* English Button */}
        <motion.button
          onClick={() => handleLanguageChange('en')}
          className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            language === 'en' 
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center space-x-1">
            <span className="text-lg">🇺🇸</span>
            <span>EN</span>
          </span>
          {language === 'en' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
              layoutId="activeLanguage"
              initial={false}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ zIndex: -1 }}
            />
          )}
        </motion.button>

        {/* Vietnamese Button */}
        <motion.button
          onClick={() => handleLanguageChange('vi')}
          className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            language === 'vi' 
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center space-x-1">
            <span className="text-lg">🇻🇳</span>
            <span>VI</span>
          </span>
          {language === 'vi' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
              layoutId="activeLanguage"
              initial={false}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ zIndex: -1 }}
            />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LanguageSwitcher;