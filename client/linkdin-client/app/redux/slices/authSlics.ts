import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGoogleLogin, apiLogin, apiLogout, apiRegister } from '../../services/authApi';
import { current } from "@reduxjs/toolkit";
import { apiFetchUserProfile } from '@/app/services/profileApi';


export interface education {
  id:string
  school : string,
  degree: string,
  fieldOfStudy: string,
  grade: string,
  startTime: string,
  endTime: string,
}

export interface experence {
  id:string
  title : string,
  employmentType: string,
  location: string,
  company: string,
  startTime: string,
  endTime: string,
}

export interface User {
  id?: string;
  firebase_id: string;
  email: string;
  fullname?: string | null;
  image: string | null;
  coverimage: string | null;
  description: string | null;
  state: string | null;
  country: string | null;
  connectionCount: number | null;
  education : education[]| null
  experence: experence[] | null;
}

interface AuthState {
  currentUser: User | null;
  loading: boolean;
  fetchProfileLoading: boolean
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  fetchProfileLoading: false,
  error: null,
  isLoggedIn: false,
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiLogin(user);
    } catch (err: any) {
      console.log("this block work in slice")
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (user: any, { rejectWithValue }) => {
    console.log(user)
    try {
      console.log("working")
      return await apiRegister(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'googleLogin',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiGoogleLogin(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'logoutUser',
  async (undefined, { rejectWithValue }) => {
    try {
      return await apiLogout();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'fetchUserProfile',
  async (undefined, { rejectWithValue }) => {
    try {
      return await apiFetchUserProfile();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },

    handleCurrentUser: (state, action) => {
      state.currentUser = action.payload

    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("working login ", action.payload)
        state.loading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
        state.error = null;

      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        console.log("data is in google payload", action.payload)
        state.loading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action: any) => {
        console.log("data is in google rejected", action.payload)
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = null
        state.isLoggedIn = false
      })
      .addCase(logoutUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(fetchUserProfile.pending, (state) => {
        state.fetchProfileLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log("working profile ", action.payload)
        state.fetchProfileLoading = false;
        state.currentUser = action.payload.user;
        state.error = null;

      })
      .addCase(fetchUserProfile.rejected, (state, action: any) => {
        state.fetchProfileLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;