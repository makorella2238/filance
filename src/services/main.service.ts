"use client";
import { AxiosError } from "axios";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://147.45.163.127:9000/api/",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const mainService = {
  setAuthHeader(token: string) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  async register(data: {
    password: string;
    email: string;
    phone: string;
    username: string;
  }) {
    try {
      const response = await instance.post("register", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // 👈 Проверяем, является ли ошибка axios-ошибкой
        throw new Error(
          error.response?.data?.detail?.ru || "Ошибка регистрации"
        );
      }
      throw new Error("Неизвестная ошибка");
    }
  },

  async login(data: { email: string; password: string }) {
    try {
      const response = await instance.post("/login", data);
      return response.data;
    } catch (error: any) {
      console.error("Error during login:", error);
      throw new Error(error.response?.data?.message || "Ошибка авторизации");
    }
  },

  async verifyEmail(data: { email: string; code: string }) {
    if (!data.email) throw new Error("Email не найден");

    try {
      const response = await instance.post("/verify", {
        email: data.email,
        code: data.code,
      });
      return response.data;
    } catch (error: any) {
      console.error("Error during email verification:", error);
      throw new Error(error.response?.data?.message || "Ошибка верификации");
    }
  },

  async resetCode(data: { email: string }) {
    try {
      const response = await instance.post("/reset-code", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Ошибка запроса");
    }
  },

  async resetPassword(data: { email: string; code: string }) {
    try {
      const response = await instance.post("reset-pwd", {
        email: data.email,
        code: data.code,
      });
      return response.data;
    } catch (error) {
      console.error("Error during password reset:", error);
      throw error;
    }
  },
};
