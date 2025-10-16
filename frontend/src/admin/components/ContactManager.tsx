import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService, ContactMessage } from '../../services/contactService';

const ContactManager: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: contactsResponse, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactService.getContacts,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactMessage['status'] }) =>
      contactService.updateContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const replyMutation = useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      contactService.replyToContact(id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const spamMutation = useMutation({
    mutationFn: contactService.markAsSpam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const contacts = Array.isArray(contactsResponse) 
    ? contactsResponse 
    : (contactsResponse as any)?.data || (contactsResponse as any)?.contacts || [];

  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleMarkAsRead = async (contact: ContactMessage) => {
    if (contact.status === 'unread') {
      try {
        await updateMutation.mutateAsync({
          id: contact._id!,
          status: 'read'
        });
      } catch (error: any) {
        alert(`Error: ${error.message || 'Failed to mark as read'}`);
      }
    }
  };

  const handleMarkAsReplied = async (contactId: string) => {
    try {
      await updateMutation.mutateAsync({
        id: contactId,
        status: 'replied'
      });
      setSelectedContact(null);
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to mark as replied'}`);
    }
  };

  const handleMarkAsSpam = async (contactId: string) => {
    if (window.confirm('Are you sure you want to mark this message as spam?')) {
      try {
        await spamMutation.mutateAsync(contactId);
        if (selectedContact?._id === contactId) {
          setSelectedContact(null);
        }
      } catch (error: any) {
        alert(`Error: ${error.message || 'Failed to mark as spam'}`);
      }
    }
  };

  const filteredContacts = contacts?.filter((contact: ContactMessage) => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && contact.status === 'unread') ||
      (filter === 'read' && contact.status === 'read') ||
      (filter === 'replied' && contact.status === 'replied');

    const matchesSearch = 
      !searchTerm ||
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  }) || [];

  const getStatusBadge = (contact: ContactMessage) => {
    if (contact.status === 'replied') {
      return <span className="bg-success-500/20 text-success-300 px-2 py-1 rounded text-xs">Replied</span>;
    }
    if (contact.status === 'read') {
      return <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">Read</span>;
    }
    if (contact.status === 'spam') {
      return <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">Spam</span>;
    }
    return <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">Unread</span>;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilterCounts = () => {
    const all = contacts?.length || 0;
    const unread = contacts?.filter((c: ContactMessage) => c.status === 'unread').length || 0;
    const read = contacts?.filter((c: ContactMessage) => c.status === 'read').length || 0;
    const replied = contacts?.filter((c: ContactMessage) => c.status === 'replied').length || 0;
    return { all, unread, read, replied };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  const counts = getFilterCounts();

  return (
    <div className="flex h-full">
      {/* Sidebar - Contact List */}
      <div className="w-1/2 border-r border-white/10 pr-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300">Error: {(error as any).message}</p>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Contact Messages ({contacts?.length || 0})</h3>
              <p className="text-gray-400">Manage incoming messages</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
            {[
              { key: 'all', label: 'All', count: counts.all },
              { key: 'unread', label: 'Unread', count: counts.unread },
              { key: 'read', label: 'Read', count: counts.read },
              { key: 'replied', label: 'Replied', count: counts.replied },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {label} {count > 0 && <span className="ml-1">({count})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Contact List */}
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-400px)]">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No Messages</h3>
              <p className="text-gray-500">
                {searchTerm ? 'No messages match your search' : 'No messages in this category'}
              </p>
            </div>
          ) : (
            filteredContacts.map((contact: ContactMessage) => (
              <motion.div
                key={contact._id}
                onClick={() => {
                  setSelectedContact(contact);
                  handleMarkAsRead(contact);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedContact?._id === contact._id
                    ? 'bg-primary-500/20 border-primary-500/50'
                    : contact.status === 'read' || contact.status === 'replied'
                    ? 'bg-white/5 border-white/10 hover:border-primary-500/30'
                    : 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold ${contact.status === 'unread' ? 'text-white' : 'text-gray-300'}`}>
                      {contact.name}
                    </h4>
                    {getStatusBadge(contact)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(contact.createdAt || new Date())}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-2">{contact.email}</p>
                
                {contact.subject && (
                  <p className={`text-sm mb-2 ${contact.status === 'unread' ? 'text-gray-200' : 'text-gray-400'}`}>
                    Subject: {contact.subject}
                  </p>
                )}
                
                <p className="text-sm text-gray-500 truncate">
                  {contact.message}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Main Content - Message Detail */}
      <div className="flex-1 pl-6">
        {selectedContact ? (
          <motion.div
            key={selectedContact._id}
            className="h-full flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Message Header */}
            <div className="border-b border-white/10 pb-4 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{selectedContact.name}</h2>
                    {getStatusBadge(selectedContact)}
                  </div>
                  <p className="text-primary-400">{selectedContact.email}</p>
                  {selectedContact.phone && (
                    <p className="text-gray-400">📞 {selectedContact.phone}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  {selectedContact.status !== 'replied' && (
                    <button
                      onClick={() => handleMarkAsReplied(selectedContact._id!)}
                      className="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
                    >
                      Mark as Replied
                    </button>
                  )}
                  <button
                    onClick={() => handleMarkAsSpam(selectedContact._id!)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Mark as Spam
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                Received: {formatDate(selectedContact.createdAt || new Date())}
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1">
              {selectedContact.subject && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Subject:</h3>
                  <p className="text-gray-300">{selectedContact.subject}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Message:</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Quick Reply Actions */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Quick Actions:</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your message'}&body=Hi ${selectedContact.name},%0A%0AThank you for your message.%0A%0ABest regards`)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    📧 Reply via Email
                  </button>
                  
                  {selectedContact.phone && (
                    <button
                      onClick={() => window.open(`tel:${selectedContact.phone}`)}
                      className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      📞 Call
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedContact.email!);
                      alert('Email copied to clipboard');
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    📋 Copy Email
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a Message</h3>
              <p className="text-gray-500">Choose a message from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManager;