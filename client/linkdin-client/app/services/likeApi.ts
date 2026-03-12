import axios from 'axios';

const BASE_URL = 'http://localhost:4001'

export const apiLikePost = async (id: string) => {
    console.log('working', id);
    try {
        const response = await axios.post(`${BASE_URL}/post/like/${id}`,undefined, {
            withCredentials: true
        });
        console.log("service", response.data);
        return response.data;
    } catch (error: any) {
        console.error("service error", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'post failed');
    }
};
