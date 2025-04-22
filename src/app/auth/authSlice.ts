import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../api/axios';

const initialState = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return rejectWithValue('No token found');

  try {
    const res = await loginApi.get('/users', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.data.length > 0) return res.data[0];
    else return rejectWithValue('Invalid token');
  } catch (error) {
    return rejectWithValue('Token verification failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => { state.isAuthenticated = true; },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state) => { state.isAuthenticated = true; })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;