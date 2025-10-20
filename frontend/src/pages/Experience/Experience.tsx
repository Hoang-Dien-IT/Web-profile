import React from 'react';
import { motion } from 'framer-motion';
import { mockExperiences } from '../../data/mockExperience';
import { useLanguage } from '../../context/LanguageContext';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const experiences = mockExperiences;

  const formatPeriod = (startDate: string, endDate?: string, current?: boolean) => {
    const start = new Date(startDate).getFullYear();
    if (current) {
      return `${start} - Present`;
    }
    const end = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('experience.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-20 pb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-black"></div>

              <div className="glass rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.position}</h3>
                    <p className="text-primary-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                    {formatPeriod(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div>
                  <h4 className="text-lg font-semibold mb-3 gradient-text">{t('experience.keyAchievements')}:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;