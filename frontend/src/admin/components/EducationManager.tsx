import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { educationService, Education } from '../../services/educationService';

const EducationManager: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: educationResponse, isLoading, error } = useQuery({
    queryKey: ['education'],
    queryFn: educationService.getEducation,
  });

  const createMutation = useMutation({
    mutationFn: educationService.createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Education> }) =>
      educationService.updateEducation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: educationService.deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
    },
  });

  const education = Array.isArray(educationResponse) 
    ? educationResponse 
    : (educationResponse as any)?.data || (educationResponse as any)?.education || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: new Date(),
    endDate: undefined,
    current: false,
    gpa: '',
    description: '',
    achievements: [],
    relevantCourses: [],
    degreeType: 'bachelor',
  });

  const [newAchievement, setNewAchievement] = useState('');
  const [newCourse, setNewCourse] = useState('');

  const degreeTypes: Education['degreeType'][] = [
    'associate',
    'bachelor',
    'master',
    'phd',
    'diploma',
    'certificate'
  ];

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: new Date(),
      endDate: undefined,
      current: false,
      gpa: '',
      description: '',
      achievements: [],
      relevantCourses: [],
      degreeType: 'bachelor',
    });
    setEditingEducation(null);
  };

  const openModal = (education?: Education) => {
    if (education) {
      setEditingEducation(education);
      setFormData({
        institution: education.institution || '',
        degree: education.degree || '',
        field: education.field || '',
        location: education.location || '',
        startDate: education.startDate ? new Date(education.startDate) : new Date(),
        endDate: education.endDate ? new Date(education.endDate) : undefined,
        current: education.current || false,
        gpa: education.gpa || '',
        description: education.description || '',
        achievements: education.achievements || [],
        relevantCourses: education.relevantCourses || [],
        degreeType: education.degreeType || 'bachelor',
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

  const addArrayItem = (field: keyof Education, item: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...((prev[field] as string[]) || []), item.trim()]
      }));
      setter('');
    }
  };

  const removeArrayItem = (field: keyof Education, itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: ((prev[field] as string[]) || []).filter(item => item !== itemToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEducation) {
        await updateMutation.mutateAsync({
          id: editingEducation._id!,
          data: formData
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to save education'}`);
    }
  };

  const handleDelete = async (educationId: string) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      try {
        await deleteMutation.mutateAsync(educationId);
      } catch (error: any) {
        alert(`Error: ${error.message || 'Failed to delete education'}`);
      }
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getDegreeIcon = (degreeType: string) => {
    const icons: { [key: string]: string } = {
      'associate': '📜',
      'bachelor': '🎓',
      'master': '🏆',
      'phd': '👑',
      'certificate': '📋',
      'diploma': '📜'
    };
    return icons[degreeType] || '🎓';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading education...</p>
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
          <h3 className="text-2xl font-bold text-white">Education ({education?.length || 0})</h3>
          <p className="text-gray-400">Manage your educational background</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add New Education
        </button>
      </div>

      {/* Education Timeline */}
      <div className="space-y-4">
        {education?.map((edu: any) => (
          <motion.div
            key={edu._id}
            className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-primary-500/50 transition-colors"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getDegreeIcon(edu.degreeType)}</span>
                  <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                  {edu.current && (
                    <span className="bg-success-500/20 text-success-300 px-2 py-1 rounded text-xs">
                      Current
                    </span>
                  )}
                  <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs capitalize">
                    {edu.degreeType?.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-lg text-primary-400 mb-1">{edu.institution}</p>
                {edu.field && (
                  <p className="text-gray-300 mb-1">Field: {edu.field}</p>
                )}
                {edu.location && (
                  <p className="text-gray-400 mb-2">📍 {edu.location}</p>
                )}
                
                <p className="text-gray-500 text-sm mb-3">
                  {formatDate(edu.startDate)} - {
                    edu.current ? 'Present' : 
                    edu.endDate ? formatDate(edu.endDate) : 'Present'
                  }
                  {edu.gpa && <span className="ml-4">GPA: {edu.gpa}</span>}
                </p>

                {edu.description && (
                  <p className="text-gray-300 mb-4">{edu.description}</p>
                )}

                {/* Relevant Courses */}
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Relevant Courses:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.slice(0, 6).map((course: string) => (
                        <span key={course} className="bg-secondary-500/20 text-secondary-300 px-2 py-1 rounded text-xs">
                          {course}
                        </span>
                      ))}
                      {edu.relevantCourses.length > 6 && (
                        <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded text-xs">
                          +{edu.relevantCourses.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Achievements:</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {edu.achievements.slice(0, 3).map((achievement: string, index: number) => (
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
                  onClick={() => openModal(edu)}
                  className="text-primary-400 hover:text-primary-300 text-sm px-3 py-1 border border-primary-500/50 rounded hover:bg-primary-500/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id!)}
                  className="text-red-400 hover:text-red-300 text-sm px-3 py-1 border border-red-500/50 rounded hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {(!education || education.length === 0) && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Education Added</h3>
            <p className="text-gray-500 mb-6">Start by adding your educational background</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add First Education
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
                  {editingEducation ? 'Edit Education' : 'Add New Education'}
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
                      Institution *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="University/School name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Degree *
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Bachelor of Science, Master of Arts, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      name="field"
                      value={formData.field}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Computer Science, Business Administration, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Degree Type
                    </label>
                    <select
                      name="degreeType"
                      value={formData.degreeType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    >
                      {degreeTypes.map(type => (
                        <option key={type} value={type} className="bg-dark-800">
                          {type.replace('-', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
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
                      GPA/Grade
                    </label>
                    <input
                      type="text"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="3.8/4.0, First Class, etc."
                    />
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

                {/* Current Education */}
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="current"
                      checked={formData.current}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-gray-300">I'm currently studying here</span>
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
                    placeholder="Describe your studies, thesis, special programs..."
                  />
                </div>

                {/* Relevant Courses */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Relevant Courses
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newCourse}
                      onChange={(e) => setNewCourse(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('relevantCourses', newCourse, setNewCourse))}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Add course..."
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem('relevantCourses', newCourse, setNewCourse)}
                      className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.relevantCourses || []).map((course: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-sm"
                      >
                        {course}
                        <button
                          type="button"
                          onClick={() => removeArrayItem('relevantCourses', course)}
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
                    Academic Achievements
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
                     editingEducation ? 'Update Education' : 'Create Education'}
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

export default EducationManager;