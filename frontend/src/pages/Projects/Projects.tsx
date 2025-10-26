import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProjects } from '../../data/mockProjects';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [imageIndices, setImageIndices] = useState<{[key: string]: number}>({});

  const projects = mockProjects;

  // Auto-rotate images every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices(prevIndices => {
        const newIndices = { ...prevIndices };
        projects.forEach(project => {
          if (project.images.length > 1) {
            const currentIndex = newIndices[project._id] || 0;
            newIndices[project._id] = (currentIndex + 1) % project.images.length;
          }
        });
        return newIndices;
      });
    }, 3000); // Change image every 1 second

    return () => clearInterval(interval);
  }, [projects]);

  const categories = ['All', 'AI-powered website', "AI Model", 'Frontend', 'Backend'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                layout
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div 
                    className="absolute top-6 left-6 z-10 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    ⭐ Featured
                  </motion.div>
                )}

                {/* Premium Image Container with Slideshow */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${project._id}-${imageIndices[project._id] || 0}`}
                      src={project.images[imageIndices[project._id] || 0]}
                      alt={project.title}
                      className="w-full h-56 object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.08 }}
                    />
                  </AnimatePresence>

                  {/* Image Indicators */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {project.images.map((_, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (imageIndices[project._id] || 0) === imgIndex
                              ? 'bg-white shadow-lg scale-125'
                              : 'bg-white/50'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => setImageIndices(prev => ({
                            ...prev,
                            [project._id]: imgIndex
                          }))}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Premium Overlay Buttons */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        🚀 Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900/90 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold shadow-lg border border-white/20 hover:bg-gray-800 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        💻 Code
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Premium Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <motion.h3 
                      className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500"
                      whileHover={{ scale: 1.02 }}
                    >
                      {project.title}
                    </motion.h3>
                    <span className="text-xs text-gray-300 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Premium Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <motion.span
                        key={tech}
                        className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1.5 rounded-full border border-blue-500/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Interested in Working Together?
            </h3>
            <p className="text-gray-400 mb-6">
              I'm always excited to work on new projects and collaborate with amazing people.
            </p>
            <motion.button
              className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Discuss Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;