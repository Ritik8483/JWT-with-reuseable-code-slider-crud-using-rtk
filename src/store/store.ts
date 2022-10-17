import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../rtk/authRtk";
import { postsApi } from "../rtk/postsRtk";
import authSlice from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]:authApi.reducer,
    [postsApi.reducerPath]:postsApi.reducer,
    authReducer:authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(postsApi.middleware),
});
export default store;
