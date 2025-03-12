import { Component } from "react";
import React from "react";

import { Header } from "../../components/header";
import { MenuContent } from "../../components/menuContent";
import { Footer } from "../../components/footer";

export default class MenuPage extends Component {
  render() {
    return (
      <>
        <Header />
        <MenuContent />
        <Footer />
      </>
    );
  }
}
