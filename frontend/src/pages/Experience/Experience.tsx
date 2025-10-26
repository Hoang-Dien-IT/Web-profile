import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockExperiences } from '../../data/mockExperience';
import { useLanguage } from '../../context/LanguageContext';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Get translated experience data
  const getTranslatedExperiences = () => {
    return mockExperiences.map(exp => ({
      ...exp,
      company: t(`exp.${exp._id.split('-')[1]}.company`),
      position: t(`exp.${exp._id.split('-')[1]}.position`),
      location: t(`exp.${exp._id.split('-')[1]}.location`),
      description: t(`exp.${exp._id.split('-')[1]}.description`),
      achievements: exp.achievements.map((_, index) => 
        t(`exp.${exp._id.split('-')[1]}.achievement${index + 1}`)
      )
    }));
  };
  
  const experiences = getTranslatedExperiences();

  // Track mouse for premium effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const formatPeriod = (startDate: string, endDate?: string, current?: boolean) => {
    const start = new Date(startDate).getFullYear();
    if (current) {
      return `${start} - Present`;
    }
    const end = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 ${
              i % 3 === 0 ? 'bg-blue-500/10' : 
              i % 3 === 1 ? 'bg-purple-500/10' : 'bg-orange-500/10'
            } rounded-full blur-xl`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i * 10) % 60}%`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Mouse Follower */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 25%, #a855f7 50%, #ec4899 75%, #f97316 100%)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {t('experience.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t('experience.subtitle')}
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Enhanced Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 rounded-full shadow-lg shadow-blue-500/30"></div>
          
          {/* Timeline glow effect */}
          <div className="absolute left-7 top-0 bottom-0 w-3 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-orange-500/20 rounded-full blur-sm"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-20 pb-12"
              whileHover={{ scale: 1.02 }}
            >
              {/* Enhanced Timeline dot */}
              <motion.div 
                className="absolute left-5 top-6 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white/20 shadow-lg"
                whileHover={{ 
                  scale: 1.3,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)"
                }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(59, 130, 246, 0.3)",
                    "0 0 20px rgba(59, 130, 246, 0.6)",
                    "0 0 0px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />

              <motion.div 
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
              >
                <motion.div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-1"
                      whileHover={{ color: "#60a5fa" }}
                    >
                      {exp.position}
                    </motion.h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <motion.span 
                    className="text-sm text-gray-300 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full mt-2 md:mt-0 w-fit border border-white/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {formatPeriod(exp.startDate, exp.endDate, exp.current)}
                  </motion.span>
                </motion.div>

                <motion.p 
                  className="text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {exp.description}
                </motion.p>

                <div>
                  <motion.h4 
                    className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    {t('experience.keyAchievements')}:
                  </motion.h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 + i * 0.1 }}
                        whileHover={{ x: 5, color: "#d1d5db" }}
                      >
                        <motion.span 
                          className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"
                          whileHover={{ scale: 1.5 }}
                        />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;