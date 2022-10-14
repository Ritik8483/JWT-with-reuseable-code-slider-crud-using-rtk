import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../rtk/authRtk";
import authSlice from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]:authApi.reducer,
    authReducer:authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store;
