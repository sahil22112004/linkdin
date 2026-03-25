import { apiLikePost } from '@/app/services/likeApi';
import { apiGetPost } from '@/app/services/postApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface post {
  id?: number | string;
  post: string;
  media_url: string;
  createdAt: Date;
  likeCount: number;
  isLiked: boolean;
}

interface PostState {
  posts: post[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  sortBy: 'recent' | 'likes';
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 1,
  sortBy: 'recent',
};

export const getPost = createAsyncThunk(
  'getPost',
  async (
    {
      page,
      limit,
      sortBy,
    }: { page: number; limit: number; sortBy: 'recent' | 'likes' },
    { rejectWithValue }
  ) => {
    try {
      return await apiGetPost(page, limit, sortBy);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const likePost = createAsyncThunk(
  'likePost',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiLikePost(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.posts = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;

        const { allPost, page, totalPages } = action.payload;

        if (page === 1) {
          state.posts = allPost;
        } else {
          state.posts = [...state.posts, ...allPost];
        }

        state.page = page;
        state.totalPages = totalPages;
      })
      .addCase(getPost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const id = action.payload;

        const post = state.posts.find((p) => p.id === id);

        if (post) {
          post.isLiked = !post.isLiked;

          if (post.isLiked) {
            post.likeCount += 1;
          } else {
            post.likeCount -= 1;
          }
        }
      })

      .addCase(likePost.rejected, (state, action: any) => {
        state.error = action.payload;
      });
  },
});

export const { resetPosts, setSortBy } = postSlice.actions;
export default postSlice.reducer;