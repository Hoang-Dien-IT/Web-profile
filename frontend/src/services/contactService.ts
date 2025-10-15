import api from './api';

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  additionalInfo?: string;
  status: 'unread' | 'read' | 'replied' | 'archived' | 'spam';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  replies?: Array<{
    message: string;
    sentAt: Date;
    sentBy: string;
  }>;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactStats {
  totalMessages: number;
  unreadCount: number;
  monthlyMessages: Array<{
    month: string;
    count: number;
  }>;
  topProjectTypes: Array<{
    type: string;
    count: number;
  }>;
}

export const contactService = {
  // Submit contact form (public)
  async submitContact(data: Partial<ContactMessage>): Promise<{ success: boolean; message: string }> {
    return api.post('/contact', data);
  },

  // Get all contact messages (admin)
  async getContacts(): Promise<ContactMessage[]> {
    return api.get('/contact');
  },

  // Get single contact message (admin)
  async getContact(id: string): Promise<ContactMessage> {
    return api.get(`/contact/${id}`);
  },

  // Get contact stats (admin)
  async getContactStats(): Promise<ContactStats> {
    return api.get('/contact/stats');
  },

  // Update contact status (admin)
  async updateContactStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage> {
    return api.put(`/contact/${id}`, { status });
  },

  // Reply to contact (admin)
  async replyToContact(id: string, message: string): Promise<{ success: boolean; message: string }> {
    return api.post(`/contact/${id}/reply`, { message });
  },

  // Mark as spam (admin)
  async markAsSpam(id: string): Promise<{ success: boolean; message: string }> {
    return api.post(`/contact/${id}/spam`);
  },
};