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
      company: 'TechVision Solutions',
      role: 'Senior Full Stack Developer',
      period: '2023 - Present',
      description: 'Leading development of enterprise-level web applications and AI-driven solutions.',
    },
    {
      company: 'DataFlow Analytics',
      role: 'Full Stack Developer',
      period: '2021 - 2022',
      description: 'Developed data analytics platforms and machine learning solutions for business intelligence.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Profile Image */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-500 shadow-lg"
            >
              <img
                src={mockProfile.avatar}
                alt={mockProfile.fullName}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 gradient-text">{t('about.story')}</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { number: '50+', label: t('about.projects') },
                  { number: '4+', label: t('about.years') },
                  { number: '20+', label: t('about.clients') },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold gradient-text">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Skills */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">{t('about.skills.title')}</h3>
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
            </div>

            {/* Experience */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">{t('about.experience.title')}</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="border-l-2 border-primary-500 pl-6 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                    <h4 className="font-semibold text-lg">{exp.role}</h4>
                    <p className="text-primary-400 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-400 mb-2">{exp.period}</p>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
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