import axios from 'axios';

const API_URL = 'http://localhost:5000';

axios.defaults.withCredentials = true;

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);

export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

export const logoutUser = () => axios.post(`${API_URL}/auth/logout`);

export const getCurrentUser = () => axios.get(`${API_URL}/auth/me`);
