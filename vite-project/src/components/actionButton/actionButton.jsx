import { Component } from "react";

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }));
  };

  render() {
    const { buttonText } = this.props;
    const { isClicked } = this.state;

    return (
      <button
        onClick={this.handleClick}
        style={{
          backgroundColor: isClicked ? "#35B8BE" : "white",
          color: isClicked ? "white" : "black",
          padding: "16px 40px",
          borderRadius: "6px",
          borderColor: "#61728333",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        {buttonText}
      </button>
    );
  }
}
