import { Component } from "react";
import "./button.scss"

export default class Button extends Component {

  render() {
    const { buttonText, onClick } = this.props;

    return (
      <button onClick={onClick}>
        {buttonText}
      </button>
    );
  }
}
