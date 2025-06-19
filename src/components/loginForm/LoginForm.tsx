import "./loginForm.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setFormField,
  toggleMode,
  loginThunk,
  registerThunk,
} from "../../features/authorization/authSlice";
import { FormEvent } from "react";
import {
  selectAuthFormData,
  selectIsLogin,
  selectAuthError,
} from "../../features/authorization/selectors";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectAuthFormData);
  const isLogin = useAppSelector(selectIsLogin);
  const authError = useAppSelector(selectAuthError);

  const action = isLogin ? loginThunk : registerThunk;

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ): void => {
    dispatch(setFormField({ field, value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(action(formData));
  };

  const handleToggleMode = () => dispatch(toggleMode());

  return (
    <div className="loginWrapper">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          {!isLogin ? (
            <>
              <p className="title">Create your account</p>
              <label>
                First name
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </label>
              <label>
                Last name
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  required
                />
              </label>
            </>
          ) : (
            <>
              <p className="title">Login</p>
              <p className="sub-title">Login to platform to continue</p>
            </>
          )}

          <label>
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
          </label>

          {authError && <p className="error">{authError}</p>}

          <button type="submit" className="login-btn">
            {isLogin ? "Login" : "Create account"}
          </button>

          <div className="create-acc-wrapper">
            {isLogin ? (
              <>
                <p className="create-acc">Don't have an account?</p>
                <button type="button" onClick={handleToggleMode}>
                  Create a free account
                </button>
              </>
            ) : (
              <>
                <p className="create-acc">Already have an account?</p>
                <button type="button" onClick={handleToggleMode}>
                  Log in
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
