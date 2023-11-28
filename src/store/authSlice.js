import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isLoading: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export default authSlice.reducer;
export const { loginUser, logoutUser, setLoading } = authSlice.actions;
