import axios from 'axios';

const BASE_URL = 'http://localhost:4001'

export const apipost = async (post: any) => {
  console.log('working', post);
  try {
    const response = await axios.post(`${BASE_URL}/post`, post, {
      withCredentials: true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'post failed');
  }
};


export const apiGetPost = async () => {
  console.log('working');
  try {
    const response = await axios.get(`${BASE_URL}/get-post`, {
      withCredentials: true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'post failed');
  }
};

export const apirepost = async (post_ID: string) => {
  console.log('working', post_ID);
  try {
    const response = await axios.post(`${BASE_URL}/repost/${post_ID}`, undefined, {
      withCredentials: true
    });
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'post failed');
  }
};

