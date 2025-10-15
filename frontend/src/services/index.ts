// Export all services for easy importing
export { profileService } from './profileService';
export { projectService } from './projectService';
export { skillService } from './skillService';
export { experienceService } from './experienceService';
export { educationService } from './educationService';
export { contactService } from './contactService';

// Export types
export type { Profile, ProfileStats } from './profileService';
export type { Project } from './projectService';
export type { Skill, SkillStats } from './skillService';
export type { Experience } from './experienceService';
export type { Education } from './educationService';
export type { ContactMessage, ContactStats } from './contactService';

// Export API instance
export { default as api } from './api';