import { MenuContent } from "../../components/menuContent/index";
import { Layout } from "../../components/layout/index";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants/constants";
import { useFetch } from "../../Utils/customHooks";

export default function MenuPage() {
  const { data: products, loading, error } = useFetch(API_URL);
  const [cartItems, setCartItems] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const uniqueCategories = [...new Set(products.map((item) => item.category))];
    setCategories(uniqueCategories);
    setActiveCategory(uniqueCategories[0]);
  }, [products]);

  const updateCartCount = ({ id, count }) => {
    setCartItems((prevCart) => {
      const prevCount = prevCart[id] || 0;
      return {
        ...prevCart,
        [id]: prevCount + count,
      };
    });
  };

  return (
    <Layout cart={cartItems}>
      <MenuContent
        updateCartCount={updateCartCount}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        products={products || []}
        loading={loading}
        error={error}
      />
    </Layout>
  );
}
