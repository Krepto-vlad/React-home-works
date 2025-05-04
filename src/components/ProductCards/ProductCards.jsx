import { useState, useEffect, useMemo } from "react";
import "./ProductCards.scss";
import { Button } from "../Button/index";
import { ProductCard } from "../ProductCard/index";
import { CARDS_PAGE_COUNT } from "../../constants/constants";

export default function ProductCards({
  products,
  activeCategory,
  updateCartCount,
  loading,
  error,
}) {
  const [visibleCards, setVisibleCards] = useState(CARDS_PAGE_COUNT);

  useEffect(() => {
    setVisibleCards(CARDS_PAGE_COUNT);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setVisibleCards((prevVisible) => prevVisible + CARDS_PAGE_COUNT);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCards);
  const loadMore = visibleCards < filteredProducts.length;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product_cards">
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
    </div>
  );
}
