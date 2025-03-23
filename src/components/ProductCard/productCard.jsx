import { Component } from "react";
import "./ProductCard.scss";
import { Button } from "../actionButton/index";

export default class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      cartCounts: {},
    };
  }

  handleAddToCart = (productId) => {
    this.setState((prevState) => ({
      cartCounts: {
        ...prevState.cartCounts,
        [productId]: (prevState.cartCounts[productId] || 0) + 1,
      },
    }));
  };

  render() {
    const { cartCounts } = this.state;
    const { product } = this.props;

    return (
      <li key={product.id} className="product_card">
        <div className="image_wrapper">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product_info">
          <div className="product_name_price">
            <p className="product_name">{product.name}</p>
            <p className="product_price">${product.price} USD</p>
          </div>
          <p className="product_description">{product.description}</p>

          <div className="add_to_cart_wrapper">
            <div className="count_of_products">
              {cartCounts[product.id] || 0}
            </div>
            <Button
              buttonText="Add to cart"
              onClick={() => this.handleAddToCart(product.id)}
              isActive={false}
            />
          </div>
        </div>
      </li>
    );
  }
}
