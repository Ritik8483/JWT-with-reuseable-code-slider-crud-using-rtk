import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../rtk/authRtk";
import { postsApi } from "../rtk/postsRtk";
import authSlice from "../slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import rootReducer from "../rootReducer/rootReducerComponent";
const persistConfig = {
  key: "root",
  storage,
};

// const rootReducer=combineReducers({
//   authReducer:authSlice,
//   [authApi.reducerPath]:authApi.reducer,
//     [postsApi.reducerPath]:postsApi.reducer,
// });
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(postsApi.middleware),
});
export default store;
