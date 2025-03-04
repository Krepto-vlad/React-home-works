import { Component } from "react";
import "./ProductCards.scss";
import { Button } from "../Button/index";
import { ProductCard } from "../ProductCard/index";

const API_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";

export default class ProductCards extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      visibleCards: 6,
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

  handleLoadMore = () => {
    this.setState((prevState) => ({
      visibleCards: prevState.visibleCards + 6,
    }));
  };

  render() {
    const { products, visibleCards } = this.state;

    const visibleProducts = products.slice(0, visibleCards);

    return (
      <>
        <ul className="product_card_wrapper">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              updateCartCount={this.props.updateCartCount}
            />
          ))}
        </ul>

        {visibleCards < products.length && (
          <Button
            buttonText="See More"
            onClick={this.handleLoadMore}
          />
        )}
      </>
    );
  }
}
