import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuthCredentials: (state,action)=>{
        state.userInfo = action.payload;
        localStorage.setItem('userInfo',JSON.stringify(action.payload));
    },
    logOut: (state,action)=>{
      state.userInfo = null;
      localStorage.clear();
      console.log('inside logout slice');
    }
  },
});

export const {setAuthCredentials,logOut} = authSlice.actions
export default authSlice.reducer;
