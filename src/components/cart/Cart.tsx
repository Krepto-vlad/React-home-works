import imageCart from "../../assets/cart.png";
import "./Cart.scss";

interface CartProps {
  cart: Record<string, number>;
}

export default function Cart({ cart }: CartProps) {
  const totalItems = Object.values(cart || {}).reduce((acc, val) => acc + val, 0);

  return (
    <div className="cart_button">
      <a className="cart" href="">
        <img src={imageCart} alt="cart" />
      </a>
      <div className="cart_items">{totalItems}</div>
    </div>
  );
}
