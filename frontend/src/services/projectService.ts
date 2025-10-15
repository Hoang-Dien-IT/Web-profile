import api from './api';

export interface Project {
  _id?: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  status: 'planning' | 'development' | 'completed' | 'maintenance';
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  startDate?: Date;
  endDate?: Date;
  clientName?: string;
  teamSize?: number;
  myRole?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  tags?: string[];
  priority: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const projectService = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    return api.get('/projects');
  },

  // Get single project
  async getProject(id: string): Promise<Project> {
    return api.get(`/projects/${id}`);
  },

  // Get featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    return api.get('/projects/featured');
  },

  // Get projects by category
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return api.get(`/projects/category/${category}`);
  },

  // Create project
  async createProject(data: Partial<Project>): Promise<Project> {
    return api.post('/projects', data);
  },

  // Update project
  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    return api.put(`/projects/${id}`, data);
  },

  // Delete project
  async deleteProject(id: string): Promise<void> {
    return api.delete(`/projects/${id}`);
  },

  // Upload project images
  async uploadProjectImages(id: string, files: File[]): Promise<{ images: string[] }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    return api.post(`/projects/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};