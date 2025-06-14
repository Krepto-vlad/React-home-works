import { MenuContent } from "../../components/menuContent/index";
import { Layout } from "../../components/layout/index";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants/constants";
import { useFetch } from "../../Utils/customHooks";
import { type Product } from "../../../types/productTypes";

type CartItems = Record<string, number>;

export default function MenuPage() {
  const { data: products, loading, error } = useFetch<Product[]>(API_URL);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const uniqueCategories = [...new Set(products.map((item) => item.category))];
    setCategories(uniqueCategories);
    setActiveCategory(uniqueCategories[0]);
  }, [products]);

  const updateCartCount = ({ id, count }: { id: number; count: number }) => {
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
