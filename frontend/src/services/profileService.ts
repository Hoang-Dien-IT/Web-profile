import api from './api';

export interface Profile {
  _id?: string;
  fullName: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  avatar?: string;
  resume?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  skills?: string[];
  interests?: string[];
  availability: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileStats {
  totalProjects: number;
  totalSkills: number;
  yearsOfExperience: number;
  completedProjects: number;
}

export const profileService = {
  // Get profile
  async getProfile(): Promise<Profile> {
    return api.get('/profile');
  },

  // Create or update profile
  async createOrUpdateProfile(data: Partial<Profile>): Promise<Profile> {
    return api.post('/profile', data);
  },

  // Get profile stats
  async getProfileStats(): Promise<ProfileStats> {
    return api.get('/profile/stats');
  },

  // Upload avatar
  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Upload resume
  async uploadResume(file: File): Promise<{ resume: string }> {
    const formData = new FormData();
    formData.append('resume', file);
    
    return api.post('/profile/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};