'use client';

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://147.45.127.127:9000/api/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const mainService = {
  setAuthHeader(token: string) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async register(data: { 
    password: string; 
    email: string; 
    phone: string; 
    username: string 
  }) {
    const response = await instance.post('register', data);
    if (response.status >= 400) {
      throw new Error(response.data?.detail?.ru || 'Ошибка регистрации');
    }
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    try {
      const response = await instance.post('login', data);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error; 
    }
  },

  async verifyEmail(data: { email: string; code: string }) {
    debugger
    if (!data.email) throw new Error("Email не найден");
  
    try {
      const response = await instance.post("verify", {
        email: data.email,
        code: data.code,
      });
      return response.data;
    } catch (error) {
      console.error("Error during email verification:", error);
      debugger
      throw error;
    }
  },
  

  async resetCode(data: { email: string }) {
    try {
      const response = await instance.post('reset-code', data);
      return response.data;
    } catch (error) {
      console.error('Error during reset code request:', error);
      throw error;
    }
  },

  async resetPassword(data: { email: string; code: string }) {
    try {
      const response = await instance.post('reset-pwd', { email: data.email, code: data.code });
      return response.data;
    } catch (error) {
      console.error('Error during code reset:', error);
      throw error;
    }
  },
};
