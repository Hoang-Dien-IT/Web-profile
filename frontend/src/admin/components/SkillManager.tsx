import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  _id?: string;
  name: string;
  level: number;
  category: string;
  description?: string;
  experience?: string;
  projects?: string[];
  tools?: string[];
  featured?: boolean;
  priority?: number;
  certifications?: string[];
  learningStatus?: string;
}

// Mock hooks - will be replaced with actual API hooks later
const useSkills = () => {
  const [skills] = useState<Skill[]>([
    {
      _id: '1',
      name: 'React',
      level: 90,
      category: 'frontend',
      description: 'Advanced React development with hooks and context',
      experience: '3+ years',
      featured: true,
      priority: 1
    },
    {
      _id: '2', 
      name: 'Node.js',
      level: 85,
      category: 'backend',
      description: 'Server-side development with Express.js',
      experience: '2+ years',
      featured: true,
      priority: 2
    }
  ]);

  return {
    data: skills,
    isLoading: false,
    error: null
  };
};

const useCreateSkill = () => ({
  mutateAsync: async (data: any) => {
    console.log('Creating skill:', data);
    // Mock success
  },
  isPending: false
});

const useUpdateSkill = () => ({
  mutateAsync: async ({ id, data }: { id: string; data: any }) => {
    console.log('Updating skill:', id, data);
    // Mock success
  },
  isPending: false
});

const useDeleteSkill = () => ({
  mutateAsync: async (id: string) => {
    console.log('Deleting skill:', id);
    // Mock success
  }
});

const SkillManager: React.FC = () => {
  const { data: skills, isLoading, error } = useSkills();
  const createMutation = useCreateSkill();
  const updateMutation = useUpdateSkill();
  const deleteMutation = useDeleteSkill();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    level: 50,
    category: 'frontend',
    description: '',
    experience: '',
    projects: [],
    tools: [],
    featured: false,
    priority: 1,
    certifications: [],
    learningStatus: 'proficient',
  });

  const [newTool, setNewTool] = useState('');

  const categories = [
    'frontend',
    'backend',
    'database',
    'devops',
    'mobile',
    'design',
    'tools',
    'soft-skills',
    'other'
  ];

  const learningStatuses = [
    'learning',
    'intermediate',
    'proficient',
    'expert'
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      level: 50,
      category: 'frontend',
      description: '',
      experience: '',
      projects: [],
      tools: [],
      featured: false,
      priority: 1,
      certifications: [],
      learningStatus: 'proficient',
    });
    setEditingSkill(null);
  };

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name || '',
        level: skill.level || 50,
        category: skill.category || 'frontend',
        description: skill.description || '',
        experience: skill.experience || '',
        projects: skill.projects || [],
        tools: skill.tools || [],
        featured: skill.featured || false,
        priority: skill.priority || 1,
        certifications: skill.certifications || [],
        learningStatus: skill.learningStatus || 'proficient',
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
               type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const addArrayItem = (field: keyof Skill, item: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...((prev[field] as string[]) || []), item.trim()]
      }));
      setter('');
    }
  };

  const removeArrayItem = (field: keyof Skill, itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: ((prev[field] as string[]) || []).filter(item => item !== itemToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSkill) {
        await updateMutation.mutateAsync({
          id: editingSkill._id!,
          data: formData
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      closeModal();
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to save skill'}`);
    }
  };

  const handleDelete = async (skillId: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteMutation.mutateAsync(skillId);
      } catch (error: any) {
        alert(`Error: ${error.message || 'Failed to delete skill'}`);
      }
    }
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-400 bg-green-500/20';
    if (level >= 70) return 'text-yellow-400 bg-yellow-500/20';
    if (level >= 50) return 'text-blue-400 bg-blue-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      frontend: '🎨',
      backend: '⚙️',
      database: '🗄️',
      devops: '🚀',
      mobile: '📱',
      design: '✨',
      tools: '🔧',
      'soft-skills': '🤝',
      other: '📊'
    };
    return icons[category] || '📊';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">Error loading skills</p>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Skills ({skills?.length || 0})</h3>
          <p className="text-gray-400">Manage your technical and soft skills</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add New Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills?.map((skill) => (
          <motion.div
            key={skill._id}
            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-primary-500/50 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(skill.category)}</span>
                <div>
                  <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                  <p className="text-sm text-gray-400 capitalize">{skill.category}</p>
                </div>
              </div>
              
              {skill.featured && (
                <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">
                  Featured
                </span>
              )}
            </div>

            {/* Skill Level Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">Proficiency</span>
                <span className={`text-sm px-2 py-1 rounded ${getSkillLevelColor(skill.level)}`}>
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>

            {skill.description && (
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{skill.description}</p>
            )}

            {skill.experience && (
              <div className="mb-3">
                <span className="bg-secondary-500/20 text-secondary-300 px-2 py-1 rounded text-xs">
                  {skill.experience}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${
                  skill.learningStatus === 'expert' ? 'bg-green-500' :
                  skill.learningStatus === 'proficient' ? 'bg-blue-500' :
                  skill.learningStatus === 'intermediate' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></span>
                <span className="text-xs text-gray-400 capitalize">{skill.learningStatus}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(skill)}
                  className="text-primary-400 hover:text-primary-300 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id!)}
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
              className="bg-dark-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
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
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="e.g. React, Node.js, Python"
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
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Proficiency Level ({formData.level}%)
                    </label>
                    <input
                      type="range"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Learning Status
                    </label>
                    <select
                      name="learningStatus"
                      value={formData.learningStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    >
                      {learningStatuses.map(status => (
                        <option key={status} value={status} className="bg-dark-800">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Experience Duration
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="e.g. 2+ years, 6 months"
                    />
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
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
                    placeholder="Describe your experience with this skill..."
                  />
                </div>

                {/* Tools */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Related Tools & Technologies
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTool}
                      onChange={(e) => setNewTool(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('tools', newTool, setNewTool))}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                      placeholder="Add tool..."
                    />
                    <button
                      type="button"
                      onClick={() => addArrayItem('tools', newTool, setNewTool)}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.tools || []).map((tool, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-sm"
                      >
                        {tool}
                        <button
                          type="button"
                          onClick={() => removeArrayItem('tools', tool)}
                          className="ml-2 text-secondary-400 hover:text-secondary-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Featured Skill</span>
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
                     editingSkill ? 'Update Skill' : 'Create Skill'}
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

export default SkillManager;