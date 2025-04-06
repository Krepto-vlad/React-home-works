import { Component } from "react";
import { MenuContent } from "../../components/menuContent/index";
import { Layout } from "../../components/layout/index";

const API_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
const VISIBLE_CARDS = 6;

export default class MenuPage extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      totalItems: 0,
      products: [],
      categories: [],
      visibleCards: VISIBLE_CARDS,
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

      const categories = [...new Set(data.map((item) => item.category))];

      this.setState({ products: data, categories, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      visibleCards: prevState.visibleCards + VISIBLE_CARDS,
    }));
  };

  updateCartCount = ({ id, count }) => {
    this.setState((prevState) => {
      const existingProduct = prevState.cart.find((item) => item.id === id);

      let updatedCart;
      if (existingProduct) {
        updatedCart = prevState.cart.map((item) =>
          item.id === id ? { ...item, count: item.count + count } : item
        );
      } else {
        updatedCart = [...prevState.cart, { id, count }];
      }

      const totalItems = updatedCart.reduce((sum, item) => sum + item.count, 0);

      return {
        cart: updatedCart,
        totalItems,
      };
    });
  };

  render() {
    const { products, visibleCards, loading, error, totalItems, categories } =
      this.state;
    const visibleProducts = products.slice(0, visibleCards);

    return (
      <Layout totalItems={totalItems}>
        <MenuContent
          categories={categories}
          products={visibleProducts}
          handleLoadMore={this.handleLoadMore}
          canLoadMore={visibleCards < products.length}
          updateCartCount={this.updateCartCount}
          loading={loading}
          error={error}
        />
      </Layout>
    );
  }
}
