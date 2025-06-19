import imageCart from "../../assets/cart.png";
import "./Cart.scss";
import { Link } from "react-router-dom";
interface CartProps {
  cart: Record<string, number>;
}

export default function Cart({ cart }: CartProps) {
  const totalItems = Object.values(cart || {}).reduce(
    (acc, val) => acc + val,
    0
  );

  return (
    <div className="cart_button">
      <Link to="/order" className="cart">
        <img src={imageCart} alt="cart" />
      </Link>
      <div className="cart_items">{totalItems}</div>
    </div>
  );
}
