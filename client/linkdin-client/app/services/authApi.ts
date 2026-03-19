import axios from 'axios';

const BASE_URL = 'http://localhost:4000'

export const apiRegister = async (user: any) => {
  console.log('working');
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, user);
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};


export const apiGoogleLogin = async (user: any) => {
  console.log('working');
  try {
    const response = await axios.post(`${BASE_URL}/google-login`, user, {
      withCredentials: true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};

export const apiLogin = async (user: any) => {
  console.log('working');
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, user, {
      withCredentials: true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};

export const apiLogout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`, undefined, {
      withCredentials: true
    });
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};
