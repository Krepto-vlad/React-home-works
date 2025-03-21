import { Component } from "react";

import { MenuContent } from "../../components/menuContent";
import { Layout } from "../../components/layout/index";
export default class MenuPage extends Component {
  constructor() {
    super();
    this.state = {
      totalItems: 0,
    };
  }

  updateCartCount = (count) => {
    this.setState((prevState) => ({
      totalItems: prevState.totalItems + count,
    }));
  };

  render() {
    return (
      <>
        <Layout totalItems={this.state.totalItems}>
          <MenuContent updateCartCount={this.updateCartCount} />
        </Layout>
      </>
    );
  }
}
