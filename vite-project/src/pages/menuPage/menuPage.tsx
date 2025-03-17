import { Component } from "react";
import React from "react";

import { MenuContent } from "../../components/menuContent";
import { Layout } from "../../components/layout/index";

export default class MenuPage extends Component {
  render() {
    return (
      <>
        <Layout>
          <MenuContent />
        </Layout>
      </>
    );
  }
}
