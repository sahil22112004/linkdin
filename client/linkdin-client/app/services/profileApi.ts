import { profileApi } from './interceptor';

export type ImageType =
  | 'PROFILE'
  | 'COVERIMAGE';

export const apiUpdateProfile = async (id: any, user: any) => {
  try {
    const response = await profileApi.patch(`/updateProfile/${id}`, user);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};

export const apiUpdateImage = async (type: ImageType, url: string) => {
  try {
    const response = await profileApi.patch(`/updateImage/${type}`, url);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};

export const apiFetchUserProfile = async () => {
  try {
    const response = await profileApi.get(`/fetchUserProfile/`);
    console.log("service", response.data);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};


export const apiFetchAllProfile = async () => {
  try {
    const response = await profileApi.get(`/fetchAllProfile/`);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};


export const apiFollowProfile = async (id: string) => {
  try {
    const response = await profileApi.post(`/follow/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};

export const apiConnectProfile = async (id: string) => {
  try {
    const response = await profileApi.post(`/connection/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};

export const apiConnectionRequests = async () => {
  try {
    const response = await profileApi.get(`/connection/requests`);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};

export const apiConnectionStatus = async (id: string, status: string) => {
  try {
    const response = await profileApi.patch(`/connection/${id}/${status}`);
    return response.data;
  } catch (error: any) {
    console.error("service error", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'user fetch failed');
  }
};



