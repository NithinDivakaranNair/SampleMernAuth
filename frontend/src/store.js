import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import authAdminReducer from "./slices/authAdminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    authAdmin: authAdminReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTool: true,
});

export default store;
