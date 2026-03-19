import { postApi } from './interceptor';

export const apiLikePost = async (id: string) => {
    console.log('working', id);
    try {
        const response = await postApi.post(`/post/like/${id}`);
        console.log("service", response.data);
        return response.data;
    } catch (error: any) {
        console.error("service error", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'post failed');
    }
};

