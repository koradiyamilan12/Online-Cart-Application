import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "@/lib/utils";
import authService from "@/features/auth/services/auth.service";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  status: "checking",
  error: null,
};

export const bootstrapAuth = createAsyncThunk(
  "auth/bootstrap",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to verify your session."),
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await authService.loginUser(credentials);
      return user;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to sign in. Please try again."),
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await authService.registerUser(credentials);
      return user;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to create your account."),
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logoutUser();
      return null;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to sign out. Please try again."),
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticatedUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.isLoading = false;
      state.status = action.payload ? "authenticated" : "unauthenticated";
      state.error = null;
    },
    clearAuthentication(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.status = "unauthenticated";
      state.error = null;
    },
    setAuthenticationStatus(state, action) {
      state.status = action.payload;
      state.isLoading = action.payload === "checking";
      if (state.status === "unauthenticated") {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.isLoading = true;
        state.status = "checking";
        state.error = null;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = Boolean(action.payload);
        state.isLoading = false;
        state.status = action.payload ? "authenticated" : "unauthenticated";
        state.error = null;
      })
      .addCase(bootstrapAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.status = "unauthenticated";
        state.error = action.payload || "Unable to verify your session.";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = false;
        state.status = "checking";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.status = "unauthenticated";
        state.error = action.payload || "Unable to sign in.";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = false;
        state.status = "checking";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.status = "unauthenticated";
        state.error = action.payload || "Unable to create your account.";
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = false;
        state.status = "checking";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.status = "unauthenticated";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = state.isAuthenticated
          ? "authenticated"
          : "unauthenticated";
        state.error = action.payload || "Unable to sign out.";
      });
  },
});

export const {
  clearAuthentication,
  setAuthenticatedUser,
  setAuthenticationStatus,
} = authSlice.actions;
export const selectAuthState = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthenticationStatus = (state) => state.auth.status;
export default authSlice.reducer;
