import api from './api';

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies: string[];
  projectsWorkedOn?: string[];
  teamSize?: number;
  reportingTo?: string;
  companyUrl?: string;
  companyLogo?: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  createdAt?: Date;
  updatedAt?: Date;
}

export const experienceService = {
  // Get all experiences
  async getExperiences(): Promise<Experience[]> {
    return api.get('/experience');
  },

  // Get single experience
  async getExperience(id: string): Promise<Experience> {
    return api.get(`/experience/${id}`);
  },

  // Create experience
  async createExperience(data: Partial<Experience>): Promise<Experience> {
    return api.post('/experience', data);
  },

  // Update experience
  async updateExperience(id: string, data: Partial<Experience>): Promise<Experience> {
    return api.put(`/experience/${id}`, data);
  },

  // Delete experience
  async deleteExperience(id: string): Promise<void> {
    return api.delete(`/experience/${id}`);
  },
};