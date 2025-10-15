import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService, Project } from '../services/projectService';

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: string) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  featured: () => [...projectKeys.all, 'featured'] as const,
  category: (category: string) => [...projectKeys.all, 'category', category] as const,
};

// Get all projects
export const useProjects = () => {
  return useQuery({
    queryKey: projectKeys.list(),
    queryFn: projectService.getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single project
export const useProject = (id: string) => {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get featured projects
export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: projectKeys.featured(),
    queryFn: projectService.getFeaturedProjects,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get projects by category
export const useProjectsByCategory = (category: string) => {
  return useQuery({
    queryKey: projectKeys.category(category),
    queryFn: () => projectService.getProjectsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

// Create project
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Project>) => projectService.createProject(data),
    onSuccess: () => {
      // Invalidate all project queries
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: (error) => {
      console.error('Error creating project:', error);
    },
  });
};

// Update project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => 
      projectService.updateProject(id, data),
    onSuccess: (updatedProject, variables) => {
      // Update specific project in cache
      queryClient.setQueryData(projectKeys.detail(variables.id), updatedProject);
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      console.error('Error updating project:', error);
    },
  });
};

// Delete project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: projectKeys.detail(deletedId) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      console.error('Error deleting project:', error);
    },
  });
};

// Upload project images
export const useUploadProjectImages = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: File[] }) => 
      projectService.uploadProjectImages(id, files),
    onSuccess: (data, variables) => {
      // Update project with new images
      queryClient.setQueryData(
        projectKeys.detail(variables.id), 
        (oldData: Project | undefined) => {
          if (oldData) {
            return { ...oldData, images: data.images };
          }
          return oldData;
        }
      );
    },
    onError: (error) => {
      console.error('Error uploading project images:', error);
    },
  });
};