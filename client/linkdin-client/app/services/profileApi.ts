import axios from 'axios';

const BASE_URL = 'http://localhost:4003'

export const apiUpdateProfile = async (id:any ,user: any) => {
  console.log('working');
  try {
    const response = await axios.patch(`${BASE_URL}/updateProfile/${id}`, user);
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};

export const apiFetchUserProfile = async () => {
  console.log('working');
  try {
    const response = await axios.get(`${BASE_URL}/fetchUserProfile/`,{
      withCredentials:true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};
