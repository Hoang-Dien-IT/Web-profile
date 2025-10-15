import api from './api';

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  level: number;
  experience: string;
  description?: string;
  icon?: string;
  color?: string;
  featured: boolean;
  projects?: string[];
  certifications?: string[];
  lastUsed?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SkillStats {
  totalSkills: number;
  averageLevel: number;
  topCategories: { category: string; count: number }[];
  recentSkills: Skill[];
}

export const skillService = {
  // Get all skills
  async getSkills(): Promise<Skill[]> {
    return api.get('/skills');
  },

  // Get single skill
  async getSkill(id: string): Promise<Skill> {
    return api.get(`/skills/${id}`);
  },

  // Get skills by category
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return api.get(`/skills/category/${category}`);
  },

  // Get skill stats
  async getSkillStats(): Promise<SkillStats> {
    return api.get('/skills/stats');
  },

  // Create skill
  async createSkill(data: Partial<Skill>): Promise<Skill> {
    return api.post('/skills', data);
  },

  // Update skill
  async updateSkill(id: string, data: Partial<Skill>): Promise<Skill> {
    return api.put(`/skills/${id}`, data);
  },

  // Delete skill
  async deleteSkill(id: string): Promise<void> {
    return api.delete(`/skills/${id}`);
  },
};