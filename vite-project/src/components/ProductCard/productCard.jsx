import { Component } from "react";
import "./ProductCard.scss";


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
      this.setState({ products: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // handleAddToCart = (productId) => {
  //   this.setState((prevState) => ({
  //     cartCounts: {
  //       ...prevState.cartCounts,
  //       [productId]: (prevState.cartCounts[productId] || 0) + 1,
  //     },
  //   }));
  // };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      visibleCards: prevState.visibleCards + 6,
    }));
  };

  truncateText = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
  };
////////////////
  handleIncrement = (productId) => {
    this.setState((prevState) => {
      const updatedCounts = {
        ...prevState.cartCounts,
        [productId]: (prevState.cartCounts[productId] || 0) + 1,
      };
      this.props.updateCartCount(Object.values(updatedCounts).reduce((sum, count) => sum + count, 0));
      return { cartCounts: updatedCounts };
    });
  };

  handleDecrement = (productId) => {
    this.setState((prevState) => {
      if (!prevState.cartCounts[productId]) return null; 
      const updatedCounts = {
        ...prevState.cartCounts,
        [productId]: Math.max((prevState.cartCounts[productId] || 0) - 1, 0),
      };
      this.props.updateCartCount(Object.values(updatedCounts).reduce((sum, count) => sum + count, 0)); 
    });
  };
/////////////////

  render() {
    const { products, visibleCards, cartCounts} = this.state;

    const visibleProducts = products.slice(0, visibleCards);

    return (
      <>
        <div className="product_card_wrapper">
          {visibleProducts.map((product) => (
            <div key={product.id} className="product_card">
              <img src={product.img} alt={product.meal} />

              <div className="product_info">
                <div className="product_name_price">
                  <p className="productName">{product.meal}</p>
                  <p className="productPrice">${product.price} USD</p>
                </div>
                <p className="product_description">
                  {this.truncateText(product.instructions)}
                </p>

                <div>
                  {/* <div className="count_of_products">
                    {cartCounts[product.id] || 0}
                  </div> */}

                  <button className="decrement" onClick={() => this.handleDecrement(product.id)}>-</button>
                  <div className="count">{cartCounts[product.id] || 0}</div>
                  <button className="increment" onClick={() => this.handleIncrement(product.id)}>+</button>

                  <button onClick={() => this.handleAddToCart(product.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCards < products.length && (
            <button className="see_more" onClick={this.handleLoadMore}>
              See More
            </button>
          )}
      </>
    );
  }
}