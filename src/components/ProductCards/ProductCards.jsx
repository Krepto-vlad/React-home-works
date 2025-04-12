import { useState, useEffect } from "react";
import "./ProductCards.scss";
import { Button } from "../Button/index";
import { ProductCard } from "../ProductCard/index";
import { VISIBLE_CARDS } from "../../constants/constants";

export default function ProductCards({
  products,
  activeCategory,
  updateCartCount,
  loading,
  error,
}) {
  const [visibleCards, setVisibleCards] = useState(VISIBLE_CARDS);

  useEffect(() => {
    setVisibleCards(VISIBLE_CARDS);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setVisibleCards((prevVisible) => prevVisible + VISIBLE_CARDS);
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
