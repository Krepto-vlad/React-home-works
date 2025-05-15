import { useState } from "react";
import "./loginForm.scss";
import { loginUser, registerUser } from "../../api/authService";

const initialForm = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [authError, setAuthError] = useState("");

  const handleInputChange = (field, value) => {
    setAuthError("");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = async () => {
    try {
      const response = await registerUser(formData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", String(response.user.id));
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(formData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", String(response.user.id));
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="login-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isLogin ? handleLogin() : handleCreateAccount();
          }}
        >
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
                <button type="button" onClick={() => setIsLogin(false)}>
                  Create a free account
                </button>
              </>
            ) : (
              <>
                <p className="create-acc">Already have an account?</p>
                <button type="button" onClick={() => setIsLogin(true)}>
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
