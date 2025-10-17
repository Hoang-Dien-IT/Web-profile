import React from 'react';
import { motion } from 'framer-motion';
import { mockProfile } from '../../data/mockProfile';
import { mockSkills } from '../../data/mockSkills';

const About: React.FC = () => {
  // Get top skills from mock data
  const topSkills = mockSkills
    .filter(skill => skill.level >= 80)
    .slice(0, 5)
    .map(skill => ({
      name: skill.name,
      level: skill.level,
      color: getSkillColor(skill.category)
    }));

  function getSkillColor(category: string) {
    const colors: { [key: string]: string } = {
      'Frontend': 'from-blue-400 to-blue-600',
      'Backend': 'from-green-400 to-green-600',
      'Database': 'from-purple-400 to-purple-600',
      'AI/ML': 'from-orange-400 to-orange-600',
      'DevOps': 'from-red-400 to-red-600',
      'Cloud': 'from-indigo-400 to-indigo-600',
      'Tools': 'from-yellow-400 to-yellow-600'
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  }

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
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {mockProfile.bio}
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
              <h2 className="text-3xl font-bold mb-6 gradient-text">My Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with over 4 years of experience 
                  creating digital solutions that make a difference. My journey started 
                  with curiosity about how websites work, and it has evolved into a 
                  deep love for crafting beautiful, functional applications.
                </p>
                <p>
                  {mockProfile.bio}
                </p>
                <div className="mt-4">
                  <p><strong>Location:</strong> {mockProfile.location}</p>
                  <p><strong>Email:</strong> {mockProfile.email}</p>
                  <p><strong>Availability:</strong> {mockProfile.availability ? 'Available for projects' : 'Currently unavailable'}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { number: '50+', label: 'Projects' },
                  { number: '4+', label: 'Years' },
                  { number: '20+', label: 'Clients' },
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
              <h3 className="text-2xl font-bold mb-6 gradient-text">Skills</h3>
              <div className="space-y-6">
                {topSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Experience</h3>
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
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-8 gradient-text">Technologies I Love</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
                'Docker', 'AWS', 'Git', 'Figma', 'Tailwind CSS', 'Next.js'
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 hover:border-primary-500 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;