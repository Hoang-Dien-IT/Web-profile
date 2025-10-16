import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProfile, useUpdateProfile } from '../../hooks/useProfile';
import { Profile } from '../../services/profileService';

const ProfileManager: React.FC = () => {
  const { data: profile, isLoading, error } = useProfile();
  const createOrUpdateMutation = useUpdateProfile();

  const [formData, setFormData] = useState<Partial<Profile>>({
    fullName: '',
    title: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
    },
    skills: [],
    interests: [],
    availability: true,
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        title: profile.title || '',
        bio: profile.bio || '',
        location: profile.location || '',
        email: profile.email || '',
        phone: profile.phone || '',
        website: profile.website || '',
        socialLinks: {
          github: profile.socialLinks?.github || '',
          linkedin: profile.socialLinks?.linkedin || '',
          twitter: profile.socialLinks?.twitter || '',
          facebook: profile.socialLinks?.facebook || '',
          instagram: profile.socialLinks?.instagram || '',
        },
        skills: profile.skills || [],
        interests: profile.interests || [],
        availability: profile.availability ?? true,
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like socialLinks
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((prev as any)[parent] || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(skill => skill !== skillToRemove)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: (prev.interests || []).filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName?.trim()) {
      alert('Vui lòng nhập họ tên');
      return;
    }
    if (!formData.title?.trim()) {
      alert('Vui lòng nhập chức danh');
      return;
    }
    if (!formData.bio?.trim()) {
      alert('Vui lòng nhập mô tả');
      return;
    }
    if (!formData.email?.trim()) {
      alert('Vui lòng nhập email');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Vui lòng nhập email hợp lệ');
      return;
    }
    
    // Check bio length
    if (formData.bio.length > 1000) {
      alert('Mô tả không được quá 1000 ký tự');
      return;
    }
    
    try {
      await createOrUpdateMutation.mutateAsync(formData);
      alert('Cập nhật hồ sơ thành công!');
    } catch (error: any) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.error?.message || error.message || 'Không thể cập nhật hồ sơ';
      alert(`Lỗi: ${errorMessage}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <motion.div 
          className="bg-white/5 rounded-lg p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Thông tin cơ bản</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                Chức danh *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                placeholder="VD: Full Stack Developer"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                Điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                placeholder="Ví dụ: +84 912 345 678"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                Địa điểm
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                placeholder="Thành phố, Quốc gia"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                placeholder="https://website-của-bạn.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio *
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
              placeholder="Write a brief bio about yourself..."
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-gray-300">Available for work</span>
            </label>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="bg-white/5 rounded-lg p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Mạng xã hội</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.socialLinks || {}).map(([platform, url]) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                  {platform}
                </label>
                  <input
                  type="url"
                  name={`socialLinks.${platform}`}
                  value={url || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder={`https://${platform}.com/tên`}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div 
          className="bg-white/5 rounded-lg p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Kỹ năng</h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
              placeholder="Thêm kỹ năng..."
            />
              <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Thêm
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(formData.skills || []).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-primary-400 hover:text-primary-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div 
          className="bg-white/5 rounded-lg p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Sở thích</h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
              placeholder="Thêm sở thích..."
            />
              <button
              type="button"
              onClick={addInterest}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Thêm
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(formData.interests || []).map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-sm"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="ml-2 text-secondary-400 hover:text-secondary-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="submit"
            disabled={createOrUpdateMutation.isPending}
            className={`px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg transition-all duration-300 ${
              createOrUpdateMutation.isPending
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:from-primary-600 hover:to-primary-700 hover:shadow-lg'
            }`}
          >
            {createOrUpdateMutation.isPending ? 'Đang lưu...' : 'Lưu Hồ Sơ'}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default ProfileManager;