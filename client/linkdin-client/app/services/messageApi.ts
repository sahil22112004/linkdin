import { messageApi } from './interceptor';

export const apiCreateConversation = async (user1: string, user2: string) => {
  try {
    const response = await messageApi.post('/chat/conversation', {
      user1,
      user2,
    });
    return response.data;
  } catch (error: any) {
    console.error('service error', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'create conversation failed'
    );
  }
};

export const apiGetConversations = async (userId: string) => {
  try {
    const response = await messageApi.get(`/chat/conversations/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('service error', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'fetch conversations failed'
    );
  }
};

export const apiGetMessages = async (
  conversationId: string,
  page: number = 1
) => {
  try {
    const response = await messageApi.get(
      `/chat/messages/${conversationId}?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    console.error('service error', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'fetch messages failed'
    );
  }
};

export const apiSendMessage = async (data: {
  conversationId: string;
  senderId: string;
  content: string;
}) => {
  try {
    const response = await messageApi.post('/chat/message', data);
    return response.data;
  } catch (error: any) {
    console.error('service error', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'send message failed'
    );
  }
};

export const apiMarkAsRead = async (
  conversationId: string,
  userId: string
) => {
  try {
    const response = await messageApi.post('/chat/read', {
      conversationId,
      userId,
    });
    return response.data;
  } catch (error: any) {
    console.error('service error', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'mark as read failed'
    );
  }
};