import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticatedUser(state, action) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    clearAuthentication(state) {
      state.user = null;
      state.status = "unauthenticated";
    },
    setAuthenticationStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { clearAuthentication, setAuthenticatedUser, setAuthenticationStatus } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthenticationStatus = (state) => state.auth.status;
export default authSlice.reducer;
