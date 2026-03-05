import axios from 'axios';

const BASE_URL = 'http://localhost:4000'

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
