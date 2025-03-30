import { PureComponent } from "react";
import "./ProductCard.scss";
import { Button } from "../Button/index";

export default class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleIncrementProduct = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  handleDecrementProduct = () => {
    this.setState((prevState) => ({
      count: Math.max(prevState.count - 1, 0),
    }));
  };

  handleAddToCart = () => {
    if (this.state.count === 0) return;
    this.props.updateCartCount(this.state.count);
    this.setState({ count: 0 });
  };

  truncateText = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
  };

  render() {
    const { product } = this.props;
    const { count } = this.state;

    return (
      <li className="product_card">
        <div className="image_wrapper">
          <img src={product.img} alt={product.meal} />
        </div>

        <div className="product_info">
          <div className="product_name_price">
            <p className="product_name">{product.meal}</p>
            <p className="product_price">${product.price} USD</p>
          </div>
          <p className="product_description">
            {this.truncateText(product.instructions)}
          </p>

          <div className="add_to_cart">
            <div className="product_count_wrapper">
              <button
                className="plus_minus_btn"
                onClick={this.handleDecrementProduct}
              >
                −
              </button>
              <div className="product_qty">{count}</div>
              <button
                className="plus_minus_btn"
                onClick={this.handleIncrementProduct}
              >
                +
              </button>
            </div>

            <Button buttonText="Add to cart" onClick={this.handleAddToCart} />
          </div>
        </div>
      </li>
    );
  }
}
