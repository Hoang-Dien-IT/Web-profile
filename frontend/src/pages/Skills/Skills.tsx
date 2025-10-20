import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Track mouse position for advanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const technologies = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ultra Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pointer-events-none" />
      
      {/* Floating Geometric Shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-32 h-32 ${
            i % 3 === 0 ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' :
            i % 3 === 1 ? 'bg-gradient-to-br from-orange-500/10 to-red-500/10' :
            'bg-gradient-to-br from-green-500/10 to-blue-500/10'
          } rounded-full blur-xl backdrop-blur-3xl`}
          style={{
            left: `${15 + i * 12}%`,
            top: `${10 + (i * 15) % 80}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Dynamic Mouse Follower */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-radial from-orange-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.1))'
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {t('skills.title')}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t('skills.subtitle')}
          </motion.p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 h-36 flex flex-col items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/8 group-hover:shadow-xl group-hover:shadow-black/20">
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl blur-xl"
                  style={{ 
                    background: `radial-gradient(circle at center, ${tech.color}40, transparent 70%)`
                  }}
                />
                
                {/* Icon container */}
                <div className="relative z-10 mb-4 p-2 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-110 filter group-hover:brightness-110"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))'
                    }}
                  />
                </div>
                
                {/* Technology name */}
                <h3 className="text-sm md:text-base font-medium text-white/90 text-center transition-all duration-300 group-hover:text-white leading-tight">
                  {tech.name}
                </h3>

                {/* Subtle border highlight */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-all duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, transparent 0%, ${tech.color}20 50%, transparent 100%)`,
                    border: `1px solid ${tech.color}30`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-24"
        >
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Always learning and exploring new technologies to stay ahead of the curve
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl">
              {/* Premium Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/90 to-red-500/90 group-hover:from-orange-500 group-hover:to-red-500 transition-all duration-300" />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl" />
              
              {/* Content */}
              <div className="relative z-10 px-8 py-4 flex items-center gap-3">
                <span className="font-semibold text-white text-lg">Let's Build Something Together</span>
                <motion.svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5, rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </div>
              
              {/* Ultra Premium Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10"
                whileHover={{ scale: 1.2 }}
              />
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                  backgroundSize: '200% 200%'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;