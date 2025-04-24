import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
  username: string;
}

interface UserState {
  userInfo: UserInfo | null;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: { payload: UserInfo }) => {
      state.userInfo = action.payload;
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.error = null;
    },
  },
});

export const { setUserInfo, setError, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;