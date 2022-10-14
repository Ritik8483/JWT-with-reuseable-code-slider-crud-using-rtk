import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: "",
};
export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    userToken: (state,action) => {
        // console.log('action',action.payload);
      state.userToken=action.payload;
    },
    logoutUser:(state)=>{
      state.userToken="";
    }
  },
});

export const {userToken,logoutUser}=authSlice.actions;
export default authSlice.reducer;


