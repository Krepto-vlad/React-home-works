import { Component } from "react";
import "./ProductCard.scss";
import { products } from "../../mocks/products";

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

    return (
      <div className="product_card_wrapper">
        {products.map((product) => (
          <div key={product.id} className="product_card">
            <img src={product.image} alt={product.name} />

            <div className="product_info">
              <div className="product_name_price">
                <p className="productName">{product.name}</p>
                <p className="productPrice">${product.price} USD</p>
              </div>
              <p className="product_description">{product.description}</p>

              <div>
                <div className="count_of_products">
                  {cartCounts[product.id] || 0}
                </div>
                <button onClick={() => this.handleAddToCart(product.id)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
