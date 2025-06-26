import { RootState } from "../../app/store";

export const selectAuthFormData = (state: RootState) => state.auth.formData;
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectAuthError = (state: RootState) => state.auth.authError;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
