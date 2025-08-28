import "./loginForm.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setFormField,
  toggleMode,
  loginThunk,
  registerThunk,
} from "../../features/authorization/authSlice";
import { FormEvent, useState } from "react";
import {
  selectAuthFormData,
  selectIsLogin,
  selectAuthError,
} from "../../features/authorization/selectors";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectAuthFormData);
  const isLogin = useAppSelector(selectIsLogin);
  const authError = useAppSelector(selectAuthError);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const action = isLogin ? loginThunk : registerThunk;

  const navigate = useNavigate();

  const isPasswordValid = (password: string): boolean => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /[0-9]/;
    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasNumber.test(password)
    );
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ): void => {
    dispatch(setFormField({ field, value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isPasswordValid(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain a capital letter and a number"
      );
      return;
    }

    setPasswordError(null);

    const resultAction = await dispatch(action(formData));

    if (
      loginThunk.fulfilled.match(resultAction) ||
      registerThunk.fulfilled.match(resultAction)
    ) {
      navigate("/");
    }
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
                  placeholder="Your name.."
                />
              </label>
              <label>
                Last name
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  required
                  placeholder="Your last name.."
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
              placeholder="Your email.."
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              placeholder="Your password.."
            />
          </label>
          {(passwordError || authError) && (
            <p className="error">{passwordError || authError}</p>
          )}
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
