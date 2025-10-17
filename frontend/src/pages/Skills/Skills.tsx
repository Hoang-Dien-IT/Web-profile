import React from 'react';
import { motion } from 'framer-motion';
import { mockSkills } from '../../data/mockSkills';

const Skills: React.FC = () => {
  // Group skills by category
  const skillCategories = [
    {
      title: 'Frontend',
      skills: mockSkills.filter(skill => skill.category === 'Frontend')
    },
    {
      title: 'Backend',
      skills: mockSkills.filter(skill => skill.category === 'Backend')
    },
    {
      title: 'Database',
      skills: mockSkills.filter(skill => skill.category === 'Database')
    },
    {
      title: 'AI/ML',
      skills: mockSkills.filter(skill => skill.category === 'AI/ML')
    },
    {
      title: 'DevOps',
      skills: mockSkills.filter(skill => skill.category === 'DevOps')
    }
  ].filter(category => category.skills.length > 0); // Only show categories with skills

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + categoryIndex * 0.2 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;