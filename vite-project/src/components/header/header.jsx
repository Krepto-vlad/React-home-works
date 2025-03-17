import React from "react";
import { Component } from "react";
import "./header.scss";

import imageCart from "../../assets/cart.png";
import imageLogo from "../../assets/logo.png";

export default class Header extends Component {
  render() {
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

          <div className="cartButton">
            <a className="cart" href="">
              <img src={imageCart} alt="cart" />
            </a>
            <div className="cart_items">0</div>
          </div>
        </div>
      </header>
    );
  }
}
