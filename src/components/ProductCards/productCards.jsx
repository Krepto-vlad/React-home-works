import { Component } from "react";
import "./ProductCards.scss";
import { products } from "../../mocks/products";
import { ProductCard } from "../ProductCard/index";

export default class ProductCards extends Component {
  render() {
    return (
      <ul className="product_card_wrapper">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    );
  }
}
