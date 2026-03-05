import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGoogleLogin, apiLogin, apiRegister } from '../../services/authApi';
import { current } from "@reduxjs/toolkit";

export interface User {
  id?: number | string;
  firebase_id:string;
  email: string;
  fullname?: string | null;
  image:string| null ;
  coverimage:string|null;
  description:string|null;
}

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};