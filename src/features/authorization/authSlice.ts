import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  RegisterData,
  LoginData,
  AuthResponse,
} from "../../../types/authTypes";
import { registerUser, loginUser } from "../../api/authService";

interface AuthState {
  formData: RegisterData;
  isLogin: boolean;
  authError: string;
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  formData: {
    name: "",
    surname: "",
    email: "",
    password: "",
  },
  isLogin: true,
  authError: "",
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
};

export const loginThunk = createAsyncThunk<AuthResponse, LoginData>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginUser(credentials);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerThunk = createAsyncThunk<AuthResponse, RegisterData>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormField(
      state,
      action: PayloadAction<{ field: keyof RegisterData; value: string }>
    ) {
      state.authError = "";
      state.formData[action.payload.field] = action.payload.value;
    },
    toggleMode(state) {
      state.isLogin = !state.isLogin;
      state.authError = "";
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.authError = "";
      state.formData = {
        name: "",
        surname: "",
        email: "",
        password: "",
      };
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = String(action.payload.user.id);
        localStorage.setItem("token", state.token);
        localStorage.setItem("userId", state.userId);
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = String(action.payload.user.id);
        localStorage.setItem("token", state.token);
        localStorage.setItem("userId", state.userId);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.authError = action.payload as string;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.authError = action.payload as string;
      });
  },
});

export const { setFormField, toggleMode, logout } = authSlice.actions;
export default authSlice.reducer;
