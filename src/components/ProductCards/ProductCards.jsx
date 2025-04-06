import { Component } from "react";
import "./ProductCards.scss";
import { Button } from "../Button/index";
import { ProductCard } from "../ProductCard/index";

export default class ProductCards extends Component {
  render() {
    const { products, updateCartCount, canLoadMore, handleLoadMore } =
      this.props;

    return (
      <>
        <ul className="product_card_wrapper">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              updateCartCount={updateCartCount}
            />
          ))}
        </ul>

        {canLoadMore && (
          <Button buttonText="See More" onClick={handleLoadMore} />
        )}
      </>
    );
  }
}
