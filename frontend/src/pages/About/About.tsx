import React from 'react';
import { motion } from 'framer-motion';
import { mockProfile } from '../../data/mockProfile';
import { useLanguage } from '../../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  // Note: topSkills removed — using categorized skills list below instead

  // getSkillColor removed — skills list below uses explicit categories

  const experiences = [
    {
      company: t('about.experience.techvision.company'),
      role: t('about.experience.techvision.role'),
      period: t('about.experience.techvision.period'),
      description: t('about.experience.techvision.description'),
    },
    {
      company: t('about.experience.dataflow.company'),
      role: t('about.experience.dataflow.role'),
      period: t('about.experience.dataflow.period'),
      description: t('about.experience.dataflow.description'),
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-teal-900/20 pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Premium Profile Image */}
          <div className="mb-8 relative">
            <motion.div
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.1, 
                rotateY: 10,
                transition: { duration: 0.3 }
              }}
              className="w-40 h-40 mx-auto relative group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-purple-500 to-cyan-500 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border border-gradient-to-r from-pink-500 to-orange-500 animate-spin-reverse" />
              
              {/* Profile Image */}
              <div className="absolute inset-3 rounded-full overflow-hidden shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500">
                <img
                  src={mockProfile.avatar}
                  alt={mockProfile.fullName}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                  style={{
                    left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 80}px`,
                    top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 80}px`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 25%, #3b82f6 50%, #06b6d4 75%, #10b981 100%)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 4s ease-in-out infinite',
              textShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
            }}
          >
            {t('about.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            {t('about.subtitle')}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            whileHover={{ 
              scale: 1.02, 
              rotateY: 2,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden group hover:bg-white/8 transition-all duration-500 border border-white/10 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/20">
              {/* Subtle Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Elegant Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-bl-3xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-tr-3xl" />
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-3xl font-bold mb-6 relative text-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">{t('about.story')}</span>
                  <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-24 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg" />
                </motion.h2>
              <div className="space-y-6 text-gray-200 leading-relaxed text-lg">
                <p>
                  {t('about.description1')}
                </p>
                <p>
                  {mockProfile.bio}
                </p>
                <div className="mt-4">
                  <p><strong>{t('about.location')}:</strong> {mockProfile.location}</p>
                  <p><strong>{t('about.email')}:</strong> {mockProfile.email}</p>
                  <p><strong>{t('about.availability')}:</strong> {mockProfile.availability ? t('about.availableText') : t('about.unavailableText')}</p>
                </div>
              </div>

              {/* Elegant Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                {[
                  { number: '50+', label: t('about.projects'), color: 'from-blue-400 to-cyan-400' },
                  { number: '4+', label: t('about.years'), color: 'from-purple-400 to-pink-400' },
                  { number: '20+', label: t('about.clients'), color: 'from-green-400 to-emerald-400' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                    <div className={`w-8 h-0.5 bg-gradient-to-r ${stat.color} mx-auto mt-2 rounded-full opacity-60 group-hover/stat:opacity-100 transition-opacity duration-300`} />
                  </motion.div>
                ))}
              </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="space-y-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Skills */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden group hover:bg-white/8 transition-all duration-300 border border-white/10 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10"
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Header with Icon */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">{t('about.skills.title')}</h3>
              </div>
              <div className="space-y-6 text-left text-gray-200">
                {[
                  {
                    title: t('about.skills.programming'),
                    items: ['Python', 'C/C++']
                  },
                  {
                    title: t('about.skills.framework'),
                    items: ['TensorFlow', 'YOLO']
                  },
                  {
                    title: t('about.skills.library'),
                    items: ['NumPy', 'Pandas', 'Matplotlib', 'OpenCV', 'Scikit-learn', 'Keras', 'Pillow']
                  },
                  {
                    title: t('about.skills.database'),
                    items: ['MySQL', 'SQLServer', 'MongoDB']
                  },
                  {
                    title: t('about.skills.tools'),
                    items: ['Git / GitHub']
                  }
                ].map((group, gIndex) => (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + gIndex * 0.08 }}
                    className=""
                  >
                    <h4 className="font-semibold text-lg text-primary-200 mb-2">{group.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((it, i) => (
                        <span
                          key={it}
                          className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/6"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden group hover:bg-white/8 transition-all duration-300 border border-white/10 hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10"
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Header with Icon */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">{t('about.experience.title')}</h3>
              </div>
              <div className="space-y-6 relative z-10">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-8 pb-6 border-l-2 border-gradient-to-b from-orange-400 to-red-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full border-2 border-gray-900 shadow-lg"></div>
                    
                    {/* Content Card */}
                    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/8 transition-colors duration-300">
                      <h4 className="font-bold text-lg text-white mb-1">{exp.role}</h4>
                      <p className="text-orange-400 font-medium mb-1">{exp.company}</p>
                      <p className="text-xs text-gray-400 mb-3 font-medium bg-gray-800/50 px-2 py-1 rounded-full inline-block">{exp.period}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
        </motion.div>
      </div>
    </div>
  );
};

export default About;