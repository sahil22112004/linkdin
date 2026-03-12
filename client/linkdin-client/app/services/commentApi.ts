import axios from 'axios';

const BASE_URL = 'http://localhost:4001'

export const apiCommentPost = async (post_id: string,comment_id: string) => {
    console.log('working', post_id);
    try {
        const response = await axios.post(`${BASE_URL}/comment/${post_id}`, { comment_id }, {
            withCredentials: true
        });
        console.log("service", response.data);
        return response.data;
    } catch (error: any) {
        console.error("service error", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'comment failed');
    }
};

export const apiFetchComments = async (
    post_id: string,
    parentId?: string | null,
    limit: number = 10,
    offset: number = 0
) => {

    try {

        const response = await axios.get(
            `${BASE_URL}/comment/${post_id}`,
            {
                params: {
                    parentId,
                    limit,
                    offset
                },
                withCredentials: true
            }
        );

        console.log("fetch comment service", response.data);

        return response.data;

    } catch (error: any) {

        console.error("fetch comment error", error.response?.data || error.message);

        throw new Error(error.response?.data?.message || 'fetch comments failed');

    }
};