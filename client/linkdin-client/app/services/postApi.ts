import { postApi } from './interceptor';

export const apipost = async (post: any) => {
  console.log('working', post);
  try {
    const response = await postApi.post(`/post`, post);
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
    const response = await postApi.get(`/get-post`);
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
    const response = await postApi.post(`/repost/${post_ID}`);
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'post failed');
  }
};


