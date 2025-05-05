import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo, UserState } from '../../types/user';

const initialState: UserState = {
  userInfo: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
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