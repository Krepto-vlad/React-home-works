import "./header.scss";
import imageLogo from "../../assets/logo.png";
import { PropsWithChildren } from "react";


export default function Header({ children }: PropsWithChildren<{}>) {
  return (
    <header>
      <a className="logo" href="/">
        <img src={imageLogo} alt="logo" />
      </a>

      <div className="navigation_wrapper">
        <nav>
          <ul>
            <li>Home</li>
            <li>Menu</li>
            <li>Company</li>
            <li>Login</li>
          </ul>
        </nav>

        {children}
      </div>
    </header>
  );
}
