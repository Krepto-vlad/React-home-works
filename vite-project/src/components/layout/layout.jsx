import React, { Component } from "react";
import { Header } from "../header/index";
import { Footer } from "../footer/index";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
}
