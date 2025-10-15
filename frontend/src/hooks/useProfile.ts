import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService, Profile, ProfileStats } from '../services/profileService';

// Query keys
export const profileKeys = {
  all: ['profile'] as const,
  profile: () => [...profileKeys.all, 'data'] as const,
  stats: () => [...profileKeys.all, 'stats'] as const,
};

// Get profile hook
export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.profile(),
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if profile doesn't exist (404)
      if (error?.status === 404) return false;
      return failureCount < 3;
    },
  });
};

// Get profile stats hook
export const useProfileStats = () => {
  return useQuery({
    queryKey: profileKeys.stats(),
    queryFn: profileService.getProfileStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create or update profile hook
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Profile>) => profileService.createOrUpdateProfile(data),
    onSuccess: (data) => {
      // Update the cached profile data
      queryClient.setQueryData(profileKeys.profile(), data);
      // Invalidate stats to refetch
      queryClient.invalidateQueries({ queryKey: profileKeys.stats() });
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    },
  });
};

// Upload avatar hook
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => profileService.uploadAvatar(file),
    onSuccess: (data) => {
      // Update the cached profile with new avatar
      queryClient.setQueryData(profileKeys.profile(), (oldData: Profile | undefined) => {
        if (oldData) {
          return { ...oldData, avatar: data.avatar };
        }
        return oldData;
      });
    },
    onError: (error) => {
      console.error('Error uploading avatar:', error);
    },
  });
};

// Upload resume hook
export const useUploadResume = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => profileService.uploadResume(file),
    onSuccess: (data) => {
      // Update the cached profile with new resume
      queryClient.setQueryData(profileKeys.profile(), (oldData: Profile | undefined) => {
        if (oldData) {
          return { ...oldData, resume: data.resume };
        }
        return oldData;
      });
    },
    onError: (error) => {
      console.error('Error uploading resume:', error);
    },
  });
};