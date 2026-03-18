import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConnectionStatus, apiConnectProfile, apiFetchAllProfile, apiFollowProfile } from '@/app/services/profileApi';

export type ConnectionStatus =
  | 'NOT_EXISTED'
  | 'ACCEPTED'
  | 'REQUESTED'
  | 'PENDING'
  | 'REJECTED';

export interface Users {
  id: string;
  email: string;
  fullname: string | null;
  image: string | null;
  coverimage: string | null;
  description: string | null;
  state: string | null;
  country: string | null;
  followerCount: number;
  isFollowing: boolean;
  connectionStatus: ConnectionStatus;
}

interface AuthState {
  allUsers: Users[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  allUsers: [],
  loading: false,
  error: null,
};

export const fetchAllUserProfile = createAsyncThunk(
  'fetchAllUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await apiFetchAllProfile();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const FollowUserProfile = createAsyncThunk(
  'FollowUserProfile',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiFollowProfile(id);
      return { id, res };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const ConnectUserProfile = createAsyncThunk(
  'ConnectUserProfile',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiConnectProfile(id);
      return { id, res };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const ConnectionStatus = createAsyncThunk(
  'ConnectionStatus',
  async (statusinfo: any, { rejectWithValue }) => {
    const{id,status} = statusinfo
    try {
      const res = await apiConnectionStatus(id,status);
      return { id,status, res };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.allProfiles;
        state.error = null;
      })
      .addCase(fetchAllUserProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(FollowUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FollowUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { id } = action.payload;
        const user = state.allUsers.find((u) => u.id === id);

        if (user) {
          user.isFollowing = !user.isFollowing;

          if (user.isFollowing) {
            user.followerCount += 1;
          } else {
            user.followerCount -= 1;
          }
        }
      })
      .addCase(FollowUserProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(ConnectUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ConnectUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { id } = action.payload;
        const user = state.allUsers.find((u) => u.id === id);

        if (user) {
            if(user.connectionStatus=='NOT_EXISTED'){
                user.connectionStatus='PENDING'
            }else{
                user.connectionStatus='NOT_EXISTED'
            }
          
        }
      })
      .addCase(ConnectUserProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(ConnectionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ConnectionStatus.fulfilled, (state, action:any) => {
        state.loading = false;
        state.error = null;

        const { id ,status } = action.payload;
        const user = state.allUsers.find((u) => u.id === id);

        if (user) {  
            user.connectionStatus=status
          
        }
      })
      .addCase(ConnectionStatus.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });



      
  },
});

export default profileSlice.reducer;