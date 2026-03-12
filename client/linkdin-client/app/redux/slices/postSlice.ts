import { apiGetPost } from '@/app/services/postApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface post {
  id?: number | string;
  post:string;
  media_url:string;
  createdAt:Date;
  likeCount:number;
  isLiked:boolean
}

interface AuthState {
  post: post[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  post: null,
  loading: false,
  error: null,
};

export const getPost = createAsyncThunk(
  'getPost',
  async (post: any, { rejectWithValue }) => {
    try {
      return await apiGetPost();
    } catch (err: any) {
      console.log("this block work in slice")
      return rejectWithValue(err.message);
    }
  }
);



const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        console.log("working login ",action.payload)
        state.loading = false;
        state.post = action.payload.allPost;
        state.error = null;
        
      })
      .addCase(getPost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const {  } = postSlice.actions;
export default postSlice.reducer;