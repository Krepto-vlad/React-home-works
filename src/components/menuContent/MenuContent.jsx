import "./menuContent.scss";
import { useState } from "react";
import { Button } from "../Button/index";
import { ProductCards } from "../ProductCards/index";

export default function MenuContent({ updateCartCount }) {
  const [activeCategory, setActiveCategory] = useState("Dessert");

  const categories = ["Dessert", "Dinner", "Breakfast"];

  return (
    <div className="menu_wrapper">
      <p className="title">Browse our menu</p>
      <p className="menu_description">
        Use our menu to place an order online, or
        <span className="phone-tooltip"> phone </span>
        our store to place a pickup order. Fast and fresh food.
      </p>
      <div className="button_wrapper">
        {categories.map((category) => (
          <Button
            key={category}
            buttonText={category}
            onClick={() => setActiveCategory(category)}
            isActive={activeCategory === category}
            variant="filter"
          />
        ))}
      </div>

      <ProductCards
        activeCategory={activeCategory}
        updateCartCount={updateCartCount}
      />
    </div>
  );
}
