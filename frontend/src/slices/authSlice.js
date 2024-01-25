// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = 'userInfo';  // Use a unique key for user

const initialState = {
  userInfo: localStorage.getItem(LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
    },
    // updateImage: (state, action) => {
    //   const updatedUserInfo = {
    //     ...state.userInfo,
    //     image: action.payload,
    //   };
    //   state.userInfo = updatedUserInfo;
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUserInfo));
    // },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
