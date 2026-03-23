'use client'

import axios, { AxiosInstance } from "axios";
import { logoutUser } from "../redux/slices/authSlics";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};


const addInterceptor = (instance: AxiosInstance) => {

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log("401 detected. Value of store variable is:", store);
        if (store) {
          store.dispatch(logoutUser());
           window.location.href = "/auth/login";

        } else {
          console.error("Logout failed: store is still undefined.");
        }
      }
      return Promise.reject(error);
    }
  );
};

export const createAPI = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  addInterceptor(instance);
  return instance;
};

export const authApi = createAPI("http://localhost:4000");
export const postApi = createAPI("http://localhost:4001");
export const profileApi = createAPI("http://localhost:4003");
export const messageApi = createAPI("http://localhost:4004");
export const privateApi = createAPI(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000");