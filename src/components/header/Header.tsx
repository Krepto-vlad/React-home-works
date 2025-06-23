import "./header.scss";
import imageLogo from "../../assets/logo.png";
import { PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, toggleMode } from "../../features/authorization/authSlice";
import { selectIsAuthenticated } from "../../features/authorization/selectors";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ children }: PropsWithChildren<{}>) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    dispatch(toggleMode());
    navigate("/login");
  };

  return (
    <header>
      <NavLink className="logo" to="/">
        <img src={imageLogo} alt="logo" />
      </NavLink>

      <div className="navigation_wrapper">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/company">Company</NavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </li>
          </ul>
        </nav>

        {children}
      </div>
    </header>
  );
}
