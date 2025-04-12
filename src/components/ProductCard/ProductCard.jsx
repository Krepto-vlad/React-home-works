import { useState } from "react";
import "./ProductCard.scss";
import { Button } from "../Button/index";

export default function ProductCard({ product, updateCartCount }) {
  const [count, setCount] = useState(0);

  const handleIncrementProduct = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrementProduct = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const handleAddToCart = () => {
    if (count === 0) return;
    updateCartCount({ id: product.id, count });
    setCount(0);
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
  };
  return (
    <li className="product_card">
      <div className="image_wrapper">
        <img src={product.img} alt={product.meal} />
      </div>

      <div className="product_info">
        <div className="product_name_price">
          <p className="product_name">{product.meal}</p>
          <p className="product_price">${product.price}</p>
        </div>
        <p className="product_description">
          {truncateText(product.instructions)}
        </p>

        <div className="add_to_cart">
          <div className="product_count_wrapper">
            <button className="plus_minus_btn" onClick={handleDecrementProduct}>
              −
            </button>
            <div className="product_qty">{count}</div>
            <button className="plus_minus_btn" onClick={handleIncrementProduct}>
              +
            </button>
          </div>

          <Button
            buttonText="Add to cart"
            onClick={handleAddToCart}
            variant="primary"
          />
        </div>
      </div>
    </li>
  );
}
