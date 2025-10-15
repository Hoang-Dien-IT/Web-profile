import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService, ContactMessage } from '../services/contactService';

// Query keys
export const contactKeys = {
  all: ['contact'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
  stats: () => [...contactKeys.all, 'stats'] as const,
};

// Submit contact form (public)
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (data: Partial<ContactMessage>) => contactService.submitContact(data),
    onError: (error) => {
      console.error('Error submitting contact form:', error);
    },
  });
};

// Get all contacts (admin)
export const useContacts = () => {
  return useQuery({
    queryKey: contactKeys.lists(),
    queryFn: contactService.getContacts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get single contact (admin)
export const useContact = (id: string) => {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: () => contactService.getContact(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Get contact stats (admin)
export const useContactStats = () => {
  return useQuery({
    queryKey: contactKeys.stats(),
    queryFn: contactService.getContactStats,
    staleTime: 10 * 60 * 1000,
  });
};

// Update contact status (admin)
export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactMessage['status'] }) => 
      contactService.updateContactStatus(id, status),
    onSuccess: (updatedContact, variables) => {
      // Update specific contact in cache
      queryClient.setQueryData(contactKeys.detail(variables.id), updatedContact);
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
      queryClient.invalidateQueries({ queryKey: contactKeys.stats() });
    },
    onError: (error) => {
      console.error('Error updating contact status:', error);
    },
  });
};

// Reply to contact (admin)
export const useReplyToContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) => 
      contactService.replyToContact(id, message),
    onSuccess: (_, variables) => {
      // Invalidate contact detail to refetch with new reply
      queryClient.invalidateQueries({ queryKey: contactKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
    },
    onError: (error) => {
      console.error('Error replying to contact:', error);
    },
  });
};

// Mark as spam (admin)
export const useMarkAsSpam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => contactService.markAsSpam(id),
    onSuccess: (_, id) => {
      // Invalidate to refetch updated data
      queryClient.invalidateQueries({ queryKey: contactKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
      queryClient.invalidateQueries({ queryKey: contactKeys.stats() });
    },
    onError: (error) => {
      console.error('Error marking as spam:', error);
    },
  });
};