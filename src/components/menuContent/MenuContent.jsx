import { PureComponent } from "react";
import "./menuContent.scss";
import { Button } from "../Button/index";
import { ProductCards } from "../ProductCards/index";

export default class MenuContent extends PureComponent {
  render() {
    return (
      <div className="menu_wrapper">
        <p className="title">Browse our menu</p>
        <p className="menu_description">
          Use our menu to place an order online, or
          <span className="phone-tooltip">
            {" "}
            phone{" "}
          </span>
          our store to place a pickup order. Fast and fresh food.
        </p>
        <div className="button_wrapper">
          <Button buttonText="Desert" />
          <Button buttonText="Dinner" />
          <Button buttonText="Breakfast" />
        </div>
        <ProductCards updateCartCount={this.props.updateCartCount} />
      </div>
    );
  }
}
