

import api from './api';

export const adminService = {
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getRecentTickets: async () => {
    const response = await api.get('/admin/tickets/recent');
    return response.data;
  },

  // User Management
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  toggleUserStatus: async (userId) => {
    const response = await api.patch(`/admin/users/${userId}/status`);
    return response.data;
  },

  // Ticket Monitoring
  getAllTickets: async () => {
    const response = await api.get('/admin/tickets');
    return response.data;
  },

  reassignTicket: async (ticketId, agentId) => {
    const response = await api.patch(`/admin/tickets/${ticketId}/reassign`, { agentId });
    return response.data;
  },

  escalateTicket: async (ticketId) => {
    const response = await api.patch(`/admin/tickets/${ticketId}/escalate`);
    return response.data;
  },

  // Reports
  getReports: async (filters = {}) => {
    const response = await api.get('/admin/reports', { params: filters });
    return response.data;
  },

  // Knowledge Base
  getKnowledgeBaseArticles: async () => {
    const response = await api.get('/admin/knowledge-base');
    return response.data;
  },

  createKnowledgeBaseArticle: async (articleData) => {
    const response = await api.post('/admin/knowledge-base', articleData);
    return response.data;
  },

  updateKnowledgeBaseArticle: async (articleId, articleData) => {
    const response = await api.put(`/admin/knowledge-base/${articleId}`, articleData);
    return response.data;
  },

  deleteKnowledgeBaseArticle: async (articleId) => {
    const response = await api.delete(`/admin/knowledge-base/${articleId}`);
    return response.data;
  },

  // System Settings
  getSystemSettings: async () => {
    const response = await api.get('/admin/settings');
    return response.data;
  },

  updateSystemSettings: async (settingsData) => {
    const response = await api.put('/admin/settings', settingsData);
    return response.data;
  },

  // Profile
  getAdminProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data;
  },

  updateAdminProfile: async (profileData) => {
    const response = await api.put('/admin/profile', profileData);
    return response.data;
  },
};

export default adminService;