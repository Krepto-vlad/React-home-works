import React from "react";
import { Component } from "react";
import "./header.scss";

import ImageCart from "../../assets/cart.png";
import ImageLogo from "../../assets/Logo.png";

export default class Header extends Component {
  render() {
    return (
      <header>
        <a className="logo" href="/">
          <img src={ImageLogo} alt="logo" />
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
              <img src={ImageCart} alt="cart" />
            </a>
            <div className="cart_items">{this.props.totalItems}</div>
            {/* dljkdl */}
          </div>
        </div>
      </header>
    );
  }
}
