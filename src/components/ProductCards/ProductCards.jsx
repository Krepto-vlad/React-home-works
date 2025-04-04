import { useState, useEffect } from "react";
import "./ProductCards.scss";
import { Button } from "../Button/index";
import { ProductCard } from "../ProductCard/index";
import { API_URL } from "../../constants/constants";

export default function ProductCards({ activeCategory, updateCartCount }) {
  const [products, setProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setVisibleCards(6);
  }, [activeCategory]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCards((prevVisible) => prevVisible + 6);
  };

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );
  const visibleProducts = filteredProducts.slice(0, visibleCards);
  const loadMore = visibleCards < filteredProducts.length;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ul className="product_card_wrapper">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            updateCartCount={updateCartCount}
          />
        ))}
      </ul>

      {loadMore && (
        <Button
          buttonText="See More"
          onClick={handleLoadMore}
          variant="primary"
        />
      )}
    </>
  );
}
