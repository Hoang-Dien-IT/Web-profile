import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProjects, Project } from '../../data/mockProjects';
import { useLanguage } from '../../context/LanguageContext';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Helper function to get translated project data
  const getTranslatedProject = (project: Project) => {
    const projectKey = project._id.replace('project-', '').replace('001', 'drug-checker').replace('002', 'safeface').replace('003', 'football').replace('004', 'hrm').replace('005', 'lung').replace('006', 'portfolio');
    return {
      ...project,
      title: t(`project.${projectKey}.title`),
      description: t(`project.${projectKey}.description`),
      longDescription: t(`project.${projectKey}.longDescription`),
      category: t(`project.${projectKey}.category`)
    };
  };
  const [imageIndices, setImageIndices] = useState<{[key: string]: number}>({});

  const projects = mockProjects;

  // Handle modal functions
  const openModal = (project: Project) => {
    const translatedProject = getTranslatedProject(project);
    setSelectedProject(translatedProject);
    setModalImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Update selected project when language changes
  useEffect(() => {
    if (selectedProject && isModalOpen) {
      const originalProject = projects.find(p => p._id === selectedProject._id);
      if (originalProject) {
        const updatedProject = getTranslatedProject(originalProject);
        setSelectedProject(updatedProject);
      }
    }
  }, [language, selectedProject, isModalOpen, projects]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setModalImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setModalImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  // Reset filter to default when language changes
  useEffect(() => {
    setActiveFilter('All');
  }, [language]);

  // Update selected project when language changes
  useEffect(() => {
    if (selectedProject && isModalOpen) {
      const originalProject = projects.find(p => p._id === selectedProject._id);
      if (originalProject) {
        const updatedProject = getTranslatedProject(originalProject);
        setSelectedProject(updatedProject);
      }
    }
  }, [language, selectedProject, isModalOpen, projects]);

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

  const categories = ['All', 'AI-powered website', "AI Model", 'Frontend', 'Backend', 'System'];

  // Get translated projects
  const translatedProjects = projects.map(getTranslatedProject);

  const filteredProjects = activeFilter === 'All' 
    ? translatedProjects 
    : translatedProjects.filter(project => {
        const originalProject = projects.find(p => p._id === project._id);
        return originalProject?.category === activeFilter;
      });

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
            <span className="gradient-text">{t('projects.title')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('projects.subtitle')}
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
              {category === 'All' ? t('projects.filterAll') : category}
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
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => openModal(project)}
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
                    {t('projects.featured')}
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
                      {project.images.map((_: string, imgIndex: number) => (
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
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(project);
                      }}
                      className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {t('projects.viewDetails')}
                    </motion.button>
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-blue-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {t('projects.liveDemo')}
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900/90 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold shadow-lg border border-white/20 hover:bg-gray-800 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {t('projects.code')}
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
              {t('projects.ctaTitle')}
            </h3>
            <p className="text-gray-400 mb-6">
              {t('projects.ctaSubtitle')}
            </p>
            {/* <motion.button
              className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('projects.ctaButton')}
            </motion.button> */}
          </div>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative p-8 border-b border-white/10">
                  <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-3">
                        {selectedProject.title}
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
                          {selectedProject.category}
                        </span>
                        {selectedProject.featured && (
                          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            {t('projects.featured')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {selectedProject.demoUrl && (
                        <motion.a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {t('projects.liveDemo')}
                        </motion.a>
                      )}
                      {selectedProject.githubUrl && (
                        <motion.a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          {t('projects.code')}
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                      <div className="relative rounded-2xl overflow-hidden bg-black/20">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={modalImageIndex}
                            src={selectedProject.images[modalImageIndex]}
                            alt={selectedProject.title}
                            className="w-full h-64 lg:h-80 object-cover"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                          />
                        </AnimatePresence>
                        
                        {/* Navigation Arrows */}
                        {selectedProject.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300 group"
                            >
                              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300 group"
                            >
                              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}
                        
                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                          {modalImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      </div>
                      
                      {/* Thumbnail Gallery */}
                      {selectedProject.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {selectedProject.images.map((img, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setModalImageIndex(index)}
                              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                index === modalImageIndex ? 'border-primary-500' : 'border-white/20 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <img src={img} alt={`${selectedProject.title} ${index + 1}`} className="w-full h-full object-cover" />
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('projects.modal.description')}</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedProject.longDescription || selectedProject.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('projects.modal.technologies')}</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <motion.span
                              key={tech}
                              className="bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium border border-primary-500/30"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-gray-400 mb-1">{t('projects.modal.category')}</h4>
                          <p className="text-white">{selectedProject.category}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-gray-400 mb-1">{t('projects.modal.status')}</h4>
                          <p className="text-green-400">{t('projects.modal.completed')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;