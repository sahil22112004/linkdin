import { postApi } from './interceptor';

export const apiCommentPost = async (post_id: string, comment: any) => {
    console.log('working', post_id, "comment is ", comment);
    try {
        const response = await postApi.post(`/comment/${post_id}`, comment);
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
    offset: number = 0,
    limit: number = 10
) => {

    try {
        const response = await postApi.get(
            `/comment/${post_id}`,
            {
                params: {
                    parentId,
                    limit,
                    offset
                }
            }
        );

        console.log("fetch comment service", response.data);

        return response.data;

    } catch (error: any) {

        console.error("fetch comment error", error.response?.data || error.message);

        throw new Error(error.response?.data?.message || 'fetch comments failed');

    }
};