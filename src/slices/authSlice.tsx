import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: "",
  viewUserId: "",
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    userToken: (state, action) => {
      // console.log('action',action.payload);
      state.userToken = action.payload;
    },
    logoutUser: (state) => {
      state.userToken = "";
    },
    storeViewUserId: (state, { payload }) => {
      state.viewUserId = payload;
    },
  },
});

export const { userToken, logoutUser, storeViewUserId } = authSlice.actions;
export default authSlice.reducer;
// import AuthReducer from './'
