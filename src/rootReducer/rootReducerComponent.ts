import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../rtk/authRtk";
import { postsApi } from "../rtk/postsRtk";
import authSlice from "../slices/authSlice";

const rootReducer = combineReducers({
  authReducer: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
});

export default rootReducer;
