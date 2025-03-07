import { Component } from "react";
import "./ProductCard.scss";

import BurgerA from "../../assets/BurgerA.png";
import BurgerB from "../../assets/BurgerB.png";
import BurgerC from "../../assets/BurgerC.png";
import BurgerD from "../../assets/BurgerD.png";
import BurgerE from "../../assets/BurgerE.png";
import BurgerF from "../../assets/BurgerF.png";

const products = [
  {
    id: 1,
    name: "Burger Dreams",
    price: 9.2,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: BurgerA,
  },
  {
    id: 2,
    name: "Burger Waldo",
    price: 10.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: BurgerB,
  },
  {
    id: 3,
    name: "Burger Cali",
    price: 8.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: BurgerC,
  },
  {
    id: 4,
    name: "Burger Bacon Buddy",
    price: 9.99,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: BurgerD,
  },
  {
    id: 5,
    name: "Burger Spicy",
    price: 9.2,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: BurgerE,
  },
  {
    id: 6,
    name: "Burger Classic",
    price: 8,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: BurgerF,
  },
];

export default class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      cartCounts: {},
    };
  }

  handleAddToCart = (productId) => {
    this.setState((prevState) => ({
      cartCounts: {
        ...prevState.cartCounts,
        [productId]: (prevState.cartCounts[productId] || 0) + 1,
      },
    }));
  };

  render() {
    const { cartCounts } = this.state;

    return (
      <div className="product_card_wrapper">
        {products.map((product) => (
          <div key={product.id} className="product_card">
            <img src={product.image} alt={product.name} />

            <div className="product_info">
              <div className="product_name_price">
                <p className="productName">{product.name}</p>
                <p className="productPrice">${product.price} USD</p>
              </div>
              <p className="product_description">{product.description}</p>

              <div>
                <div className="count_of_products">
                  {cartCounts[product.id] || 0}
                </div>
                <button onClick={() => this.handleAddToCart(product.id)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
