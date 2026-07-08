import api from './api';

export const emailService = {
  sendNotification: async (payload) => {
    const response = await api.post('/email/notify', payload);
    return response.data;
  },
};
