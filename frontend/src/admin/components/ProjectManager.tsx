import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../../hooks/useProjects';
import { Project } from '../../services/projectService';

const ProjectManager: React.FC = () => {
  const { data: projectsResponse, isLoading, error } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  // Handle both array and object responses from API
  const projects = Array.isArray(projectsResponse) 
    ? projectsResponse 
    : (projectsResponse as any)?.data || (projectsResponse as any)?.projects || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    longDescription: '',
    technologies: [],
    category: 'web-development',
    featured: false,
    status: 'development',
    demoUrl: '',
    githubUrl: '',
    clientName: '',
    teamSize: 1,
    myRole: '',
    challenges: [],
    solutions: [],
    results: [],
    tags: [],
    priority: 1,
  });

  const [newTechnology, setNewTechnology] = useState('');

  const categories = [
    'web-development',
    'mobile-app',
    'desktop-app',
    'api',
    'database',
    'devops',
    'ai-ml',
    'other'
  ];

  const statusOptions = [
    'planning',
    'development', 
    'completed',
    'maintenance'
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      technologies: [],
      category: 'web-development',
      featured: false,
      status: 'development',
      demoUrl: '',
      githubUrl: '',
      clientName: '',
      teamSize: 1,
      myRole: '',
      challenges: [],
      solutions: [],
      results: [],
      tags: [],
      priority: 1,
    });
    setEditingProject(null);
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        longDescription: project.longDescription || '',
        technologies: project.technologies || [],
        category: project.category || 'web-development',
        featured: project.featured || false,
        status: project.status || 'development',
        demoUrl: project.demoUrl || '',
        githubUrl: project.githubUrl || '',
        clientName: project.clientName || '',
        teamSize: project.teamSize || 1,
        myRole: project.myRole || '',
        challenges: project.challenges || [],
        solutions: project.solutions || [],
        results: project.results || [],
        tags: project.tags || [],
        priority: project.priority || 1,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseInt(value) : value
    }));
  };

  const addArrayItem = (field: keyof Project, item: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...((prev[field] as string[]) || []), item.trim()]
      }));
      setter('');
    }
  };

  const removeArrayItem = (field: keyof Project, itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: ((prev[field] as string[]) || []).filter(item => item !== itemToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        await updateMutation.mutateAsync({
          id: editingProject._id!,
          data: formData
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      closeModal();
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to save project'}`);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteMutation.mutateAsync(projectId);
      } catch (error: any) {
        alert(`Error: ${error.message || 'Failed to delete project'}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">Error: {error.message}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Projects ({projects?.length || 0})</h3>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project: any) => (
          <motion.div
            key={project._id}
            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-primary-500/50 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-1">{project.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
              </div>
              
              {project.featured && (
                <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies?.slice(0, 3).map((tech: any) => (
                <span key={tech} className="bg-secondary-500/20 text-secondary-300 px-2 py-1 rounded text-xs">
                  {tech}
                </span>
              ))}
              {(project.technologies?.length || 0) > 3 && (
                <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded text-xs">
                  +{(project.technologies?.length || 0) - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${
                  project.status === 'completed' ? 'bg-green-500' :
                  project.status === 'development' ? 'bg-yellow-500' :
                  project.status === 'planning' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`}></span>
                <span className="text-xs text-gray-400 capitalize">{project.status}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(project)}
                  className="text-primary-400 hover:text-primary-300 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id!)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-dark-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    >
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-dark-800">
                          {category.replace('-', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status} className="bg-dark-800">
                          {status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Priority (1-10)
                    </label>
                    <input
                      type="number"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
                    placeholder="Brief project description"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('technologies', newTechnology, setNewTechnology))}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Add technology..."
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem('technologies', newTechnology, setNewTechnology)}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.technologies || []).map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeArrayItem('technologies', tech)}
                          className="ml-2 text-primary-400 hover:text-primary-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Featured Project</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className={`px-6 py-2 bg-primary-500 text-white rounded-lg transition-colors ${
                      (createMutation.isPending || updateMutation.isPending)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary-600'
                    }`}
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? 'Saving...' : 
                     editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManager;