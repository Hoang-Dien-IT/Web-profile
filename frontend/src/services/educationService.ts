import api from './api';

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: string;
  description?: string;
  achievements?: string[];
  relevantCourses?: string[];
  thesis?: string;
  honors?: string[];
  activities?: string[];
  institutionUrl?: string;
  institutionLogo?: string;
  degreeType: 'bachelor' | 'master' | 'phd' | 'associate' | 'diploma' | 'certificate';
  createdAt?: Date;
  updatedAt?: Date;
}

export const educationService = {
  // Get all education
  async getEducation(): Promise<Education[]> {
    return api.get('/education');
  },

  // Get single education
  async getSingleEducation(id: string): Promise<Education> {
    return api.get(`/education/${id}`);
  },

  // Create education
  async createEducation(data: Partial<Education>): Promise<Education> {
    return api.post('/education', data);
  },

  // Update education
  async updateEducation(id: string, data: Partial<Education>): Promise<Education> {
    return api.put(`/education/${id}`, data);
  },

  // Delete education
  async deleteEducation(id: string): Promise<void> {
    return api.delete(`/education/${id}`);
  },
};