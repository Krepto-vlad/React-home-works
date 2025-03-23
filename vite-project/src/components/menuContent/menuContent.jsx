import { Component } from "react";
import "./menuContent.scss";
import { Button } from "../actionButton/index";
import { ProductCards } from "../ProductCards/index";

export default class MenuContent extends Component {
  render() {
    return (
      <div className="background">
        <div className="menu_wrapper">
          <p className="title">Browse our menu</p>
          <p className="menu_description">
            Use our menu to place an order online, or
            <span
              style={{ color: "#35B8BE", cursor: "pointer" }}
              title="123-456-7890"
            >
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
          <ProductCards />
        </div>
        <Button buttonText="See more" />
      </div>
    );
  }
}
