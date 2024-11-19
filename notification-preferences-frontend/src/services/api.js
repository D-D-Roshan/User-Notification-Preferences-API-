import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

export const fetchPreferences = (userId) => axios.get(`${API_BASE_URL}/preferences/${userId}`);
export const createPreferences = (data) => axios.post(`${API_BASE_URL}/preferences`, data);
export const updatePreferences = (userId, data) => axios.patch(`${API_BASE_URL}/preferences/${userId}`, data);
export const deletePreferences = (userId) => axios.delete(`${API_BASE_URL}/preferences/${userId}`);

export const sendNotification = (data) => axios.post(`${API_BASE_URL}/notifications/send`, data);
export const fetchNotificationLogs = (userId) => axios.get(`${API_BASE_URL}/notifications/${userId}/logs`);
export const fetchStats = () => axios.get(`${API_BASE_URL}/notifications/stats`);
