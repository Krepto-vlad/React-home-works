import imageCart from "../../assets/cart.png";
import "./Cart.scss";

export default function Cart({ cart }) {
  const totalItems = Object.values(cart).reduce((total, count) => total + count, 0);

  return (
    <div className="cart_button">
      <a className="cart" href="">
        <img src={imageCart} alt="cart" />
      </a>
      <div className="cart_items">{totalItems}</div>
    </div>
  );
}
