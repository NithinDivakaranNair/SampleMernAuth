// authSliceAdmin.js
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = 'adminInfo';  // Use a unique key for admin

const initialState = {
  adminInfo: localStorage.getItem(LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    : null,
};

const authSliceAdmin = createSlice({
  name: 'authAdmin',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
    },
    Adminlogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  },
});

export const { setCredentials, Adminlogout } = authSliceAdmin.actions;
export default authSliceAdmin.reducer;
