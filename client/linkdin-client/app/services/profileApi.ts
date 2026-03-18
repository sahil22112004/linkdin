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


export const apiFetchAllProfile = async () => {
  console.log('working');
  try {
    const response = await axios.get(`${BASE_URL}/fetchAllProfile/`,{
      withCredentials:true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};


export const apiFollowProfile = async (id:string) => {
  console.log('working');
  try {
    const response = await axios.post(`${BASE_URL}/follow/${id}`,undefined,{
      withCredentials:true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};

export const apiConnectProfile = async (id:string) => {
  console.log('working');
  try {
    const response = await axios.post(`${BASE_URL}/connection/${id}`,undefined,{
      withCredentials:true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};

export const apiConnectionRequests = async () => {
  console.log('working');
  try {
    const response = await axios.get(`${BASE_URL}/connection/requests`,{
      withCredentials:true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};

export const apiConnectionStatus = async (id:string,status:string) => {
  console.log('working');
  try {
    const response = await axios.patch(`${BASE_URL}/connection/${id}/${status}`,undefined,{
      withCredentials:true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};


