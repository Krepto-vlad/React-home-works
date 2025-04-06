import { Component } from "react";
import "./Tooltip.scss";

export default class Tooltip extends Component {
  render() {
    const { children, text } = this.props;

    return (
      <span className="tooltip" data-text={text}>
        {children}
      </span>
    );
  }
}
