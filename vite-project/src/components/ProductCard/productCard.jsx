import { Component } from "react";
import "./ProductCard.scss";
import { Button } from "../actionButton/index";

const API_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
export default class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      visibleCards: 6,
      cartCounts: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      const data = await response.json();

      const productsWithCount = data.map((product) => ({
        ...product,
        count: product.count ?? 0,
      }));

      this.setState({ products: productsWithCount, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      visibleCards: prevState.visibleCards + 6,
    }));
  };

  truncateText = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
  };

  handleIncrementProduct = (productId) => {
    this.setState((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      ),
    }));
  };

  handleDecrementProduct = (productId) => {
    this.setState((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === productId
          ? { ...product, count: Math.max(product.count - 1, 0) }
          : product
      ),
    }));
  };

  handleAddToCart = (productId) => {
    this.setState((prevState) => {
      const product = prevState.products.find((p) => p.id === productId);
      if (!product || product.count === 0) return null;

      this.props.updateCartCount(product.count);
      return {
        products: prevState.products.map((p) =>
          p.id === productId ? { ...p, count: 0 } : p
        ),
      };
    });
  };

  render() {
    const { products, visibleCards } = this.state;

    const visibleProducts = products.slice(0, visibleCards);

    return (
      <>
        <ul className="product_card_wrapper">
          {visibleProducts.map((product) => (
            <li key={product.id} className="product_card">
              <img src={product.img} alt={product.meal} />

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
                      onClick={() => this.handleDecrementProduct(product.id)}
                    >
                      −
                    </button>
                    <div className="product_qty">{product.count ?? 0}</div>
                    <button
                      className="plus_minus_btn"
                      onClick={() => this.handleIncrementProduct(product.id)}
                    >
                      +
                    </button>
                  </div>

                  <Button
                    buttonText="Add to cart"
                    onClick={() => this.handleAddToCart(product.id)}
                    isActive={false}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {visibleCards < products.length && (
          <Button
            buttonText="See More"
            onClick={this.handleLoadMore}
            isActive={false}
          />
        )}
      </>
    );
  }
}
