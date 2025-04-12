import { MenuContent } from "../../components/menuContent/index";
import { Layout } from "../../components/layout/index";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants/constants";

export default function MenuPage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      const data = await response.json();
      setProducts(data);

      const uniqueCategories = [...new Set(data.map((item) => item.category))];
      setCategories(uniqueCategories);
      setActiveCategory(uniqueCategories[0]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateCartCount = ({ id, count }) => {
    setCartItems((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].count += count;
        return updatedCart;
      } else {
        return [...prevCart, { id, count }];
      }
    });
  };

  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <Layout totalItems={totalItems}>
      <MenuContent
        updateCartCount={updateCartCount}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        products={products}
        loading={loading}
        error={error}
      />
    </Layout>
  );
}
