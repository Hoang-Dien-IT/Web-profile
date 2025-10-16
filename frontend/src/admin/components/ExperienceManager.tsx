import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceService, Experience } from '../../services/experienceService';

const ExperienceManager: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: experiencesResponse, isLoading, error } = useQuery({
    queryKey: ['experiences'],
    queryFn: experienceService.getExperiences,
  });

  const createMutation = useMutation({
    mutationFn: experienceService.createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Experience> }) =>
      experienceService.updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: experienceService.deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
  });

  const experiences = Array.isArray(experiencesResponse) 
    ? experiencesResponse 
    : (experiencesResponse as any)?.data || (experiencesResponse as any)?.experiences || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    location: '',
    startDate: new Date(),
    endDate: undefined,
    current: false,
    description: '',
    responsibilities: [],
    achievements: [],
    technologies: [],
    employmentType: 'full-time',
  });

  const [newAchievement, setNewAchievement] = useState('');
  const [newTechnology, setNewTechnology] = useState('');

  const employmentTypes = ['full-time', 'part-time', 'contract', 'freelance', 'internship'];

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: new Date(),
      endDate: undefined,
      current: false,
      description: '',
      responsibilities: [],
      achievements: [],
      technologies: [],
      employmentType: 'full-time',
    });
    setEditingExperience(null);
  };

  const openModal = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        company: experience.company || '',
        position: experience.position || '',
        location: experience.location || '',
        startDate: experience.startDate ? new Date(experience.startDate) : new Date(),
        endDate: experience.endDate ? new Date(experience.endDate) : undefined,
        current: experience.current || false,
        description: experience.description || '',
        responsibilities: experience.responsibilities || [],
        achievements: experience.achievements || [],
        technologies: experience.technologies || [],
        employmentType: experience.employmentType || 'full-time',
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
               type === 'date' ? new Date(value) : value
    }));
  };

  const addArrayItem = (field: keyof Experience, item: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...((prev[field] as string[]) || []), item.trim()]
      }));
      setter('');
    }
  };

  const removeArrayItem = (field: keyof Experience, itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: ((prev[field] as string[]) || []).filter(item => item !== itemToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingExperience) {
        await updateMutation.mutateAsync({
          id: editingExperience._id!,
          data: formData
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to save experience'}`);
    }
  };

  const handleDelete = async (experienceId: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteMutation.mutateAsync(experienceId);
      } catch (error: any) {
        alert(`Error: ${error.message || 'Failed to delete experience'}`);
      }
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">Error: {(error as any).message}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Work Experience ({experiences?.length || 0})</h3>
          <p className="text-gray-400">Manage your professional experience</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add New Experience
        </button>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-4">
        {experiences?.map((experience: any) => (
          <motion.div
            key={experience._id}
            className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-primary-500/50 transition-colors"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-semibold text-white">{experience.position}</h4>
                  {experience.current && (
                    <span className="bg-success-500/20 text-success-300 px-2 py-1 rounded text-xs">
                      Current
                    </span>
                  )}
                  <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs capitalize">
                    {experience.employmentType?.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-lg text-primary-400 mb-1">{experience.company}</p>
                {experience.location && (
                  <p className="text-gray-400 mb-2">📍 {experience.location}</p>
                )}
                
                <p className="text-gray-500 text-sm mb-3">
                  {formatDate(experience.startDate)} - {
                    experience.current ? 'Present' : 
                    experience.endDate ? formatDate(experience.endDate) : 'Present'
                  }
                </p>

                {experience.description && (
                  <p className="text-gray-300 mb-4">{experience.description}</p>
                )}

                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Technologies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.slice(0, 6).map((tech: string) => (
                        <span key={tech} className="bg-secondary-500/20 text-secondary-300 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {experience.technologies.length > 6 && (
                        <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded text-xs">
                          +{experience.technologies.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Key Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Key Achievements:</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {experience.achievements.slice(0, 3).map((achievement: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-success-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => openModal(experience)}
                  className="text-primary-400 hover:text-primary-300 text-sm px-3 py-1 border border-primary-500/50 rounded hover:bg-primary-500/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(experience._id!)}
                  className="text-red-400 hover:text-red-300 text-sm px-3 py-1 border border-red-500/50 rounded hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {(!experiences || experiences.length === 0) && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Experience Added</h3>
            <p className="text-gray-500 mb-6">Start by adding your first work experience</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add First Experience
            </button>
          </div>
        )}
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
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
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
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Job title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Employment Type
                    </label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    >
                      {employmentTypes.map(type => (
                        <option key={type} value={type} className="bg-dark-800">
                          {type.replace('-', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                      onChange={handleInputChange}
                      disabled={formData.current}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-500 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Current Position */}
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="current"
                      checked={formData.current}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-gray-300">I currently work here</span>
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
                    placeholder="Describe your role and responsibilities..."
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies Used
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
                        className="inline-flex items-center px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeArrayItem('technologies', tech)}
                          className="ml-2 text-secondary-400 hover:text-secondary-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key Achievements
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('achievements', newAchievement, setNewAchievement))}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Add achievement..."
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem('achievements', newAchievement, setNewAchievement)}
                      className="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(formData.achievements || []).map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 bg-success-500/10 border border-success-500/20 rounded-lg"
                      >
                        <span className="text-success-300 text-sm">{achievement}</span>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('achievements', achievement)}
                          className="text-success-400 hover:text-success-200 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
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
                     editingExperience ? 'Update Experience' : 'Create Experience'}
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

export default ExperienceManager;