import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export { ENDPOINTS, apiClient };

export const getDashboardData = () => {
  return apiClient.get(ENDPOINTS.DASHBOARD);
};

export const getDebtors = () => {
  return apiClient.get(ENDPOINTS.DEBTORS);
};

export const sendAiChat = (payload) => {
  return apiClient.post(ENDPOINTS.AI_CHAT, payload);
};

export const getCropAnalysis = (payload) => {
  return apiClient.post(ENDPOINTS.CROP_ANALYSIS, payload);
};

export const registerDealer = (payload) => {
  return apiClient.post(ENDPOINTS.DEALER_REGISTER, payload);
};

export const googleLogin = (payload) => {
  return apiClient.post(ENDPOINTS.GOOGLE_LOGIN, payload);
};

export const analyzeImage = (formData) => {
  return apiClient.post(ENDPOINTS.ANALYZE_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
