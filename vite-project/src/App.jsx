import { Component } from "react";
import { MenuPage } from "./pages/menuPage";

export default class MyApp extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     totalItems: 0,
  //   };
  // }

  // updateCartCount = (newCount) => {
  //   this.setState({ totalItems: newCount });
  // };

  render () {
    return (
      <>
        <MenuPage />
      </>
    );
  }
}
